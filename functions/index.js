const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onRequest } = require("firebase-functions/v2/https");
const { info, error, warn } = require("firebase-functions/logger"); 
const admin = require("firebase-admin");

admin.initializeApp();
const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
    error("CRITICAL FAILURE: STRIPE_SECRET_KEY IS MISSING FROM ENVIRONMENT.");
    throw new Error("Missing STRIPE_SECRET_KEY");
}
const stripe = require("stripe")(secretKey); 

// ============================================================================
// DIRECTIVE 1: THE GOD MAKER (CUSTOM CLAIMS - UID LOCKED)
// ============================================================================
// NOTE: Once you run this and secure your COMMANDER status, we will delete this function.
exports.mintCommanderStatus = onCall(async (request) => {
    const bootstrapUIDs = [
        'YOUR_FIREBASE_UID_HERE' 
    ];
    
    if (!request.auth || !bootstrapUIDs.includes(request.auth.uid)) {
        warn(`UNAUTHORIZED ELEVATION ATTEMPT BY UID: ${request.auth ? request.auth.uid : 'UNAUTHENTICATED'}`);
        throw new HttpsError("permission-denied", "ACCESS DENIED: INSUFFICIENT CLEARANCE.");
    }

    const userRecord = await admin.auth().getUser(request.auth.uid);
    if (userRecord.customClaims && userRecord.customClaims.role === 'COMMANDER') {
        throw new HttpsError("already-exists", "COMMANDER ROLE ALREADY ASSIGNED.");
    }

    try {
        await admin.auth().setCustomUserClaims(request.auth.uid, { role: 'COMMANDER' });
        info(`COMMANDER CLAIM SECURED FOR UID: ${request.auth.uid}`);
        return { status: "SECURED", message: "COMMANDER cryptographic claim successfully attached." };
    } catch (err) {
        error("CRITICAL OVERRIDE FAILED.", err);
        throw new HttpsError("internal", "CRITICAL OVERRIDE FAILED.");
    }
});

// ============================================================================
// DIRECTIVE 2: THE FINANCIAL GATEWAY (PRE-REGISTRATION LOCKED)
// ============================================================================
exports.createEnterpriseCheckout = onCall(async (request) => {
    if (!request.auth) throw new HttpsError("unauthenticated", "IDENTITY VERIFICATION REQUIRED.");
    
    if (!request.auth.token.email_verified) {
        throw new HttpsError("failed-precondition", "EMAIL NOT VERIFIED. INTAKE ABORTED.");
    }

    // App Check Warning (Will become a hard reject once frontend App Check is fully live)
    if (request.app == undefined) {
        warn(`APP CHECK MISSING FOR UID: ${request.auth.uid}`);
    }

    const operativeUid = request.auth.uid;
    const db = admin.firestore();
    const userRef = db.collection('artifacts').doc('aice-6bd8e').collection('users').doc(operativeUid);

    const userDoc = await userRef.get();
    if (userDoc.exists && userDoc.data().lastCheckoutAttempt) {
        const lastAttempt = userDoc.data().lastCheckoutAttempt.toMillis();
        if (Date.now() - lastAttempt < 15000) { 
            warn(`RATE LIMIT TRIGGERED BY UID: ${operativeUid}`);
            throw new HttpsError("resource-exhausted", "RATE LIMIT ENFORCED. AWAIT COOLDOWN.");
        }
    }
    
    await userRef.set({ lastCheckoutAttempt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'us_bank_account'], 
            customer_email: request.auth.token.email,
            client_reference_id: operativeUid,
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'A.I.C.E. Post-Mortem Audit & Diagnostic',
                        description: 'Data analysis of failure logs, quantified loss breakdown, and executive ROI report.',
                    },
                    unit_amount: 300000, 
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'https://aice.network/secure-portal?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://aice.network/sales',
        });

        await db.collection("pending_sessions").doc(session.id).set({
            uid: operativeUid,
            expectedAmount: 300000,
            currency: 'usd',
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        info(`CHECKOUT GENERATED & PRE-REGISTERED FOR UID: ${operativeUid}`);
        return { url: session.url };
    } catch (err) {
        error("STRIPE GATEWAY FAILED.", err);
        throw new HttpsError("internal", "STRIPE GATEWAY OFFLINE.");
    }
});

// ============================================================================
// DIRECTIVE 3: THE DETERMINISTIC WEBHOOK (ATOMIC & FULLY STATE LOGGED)
// ============================================================================
exports.stripeWebhook = onRequest(async (req, res) => {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
        error("WEBHOOK SIGNATURE FAILED.", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        
        if (session.payment_status !== 'paid') {
            error(`PAYMENT INCOMPLETE FOR SESSION: ${session.id}.`);
            return res.status(200).send({ received: true });
        }

        const operativeUid = session.client_reference_id;
        if (!operativeUid) return res.status(200).send({ received: true }); 

        const db = admin.firestore();
        const userRef = db.collection('artifacts').doc('aice-6bd8e').collection('users').doc(operativeUid);
        const eventRef = db.collection('system_events').doc(session.id); 
        const pendingRef = db.collection('pending_sessions').doc(session.id);
        const auditRef = db.collection('audit_logs').doc(); 
        const paymentRef = db.collection('payments').doc(session.id); // NEW: The State Ledger

        try {
            await db.runTransaction(async (t) => {
                const [eventDoc, pendingDoc] = await Promise.all([
                    t.get(eventRef),
                    t.get(pendingRef)
                ]);

                if (eventDoc.exists) {
                    info(`IDEMPOTENCY LOCK: Transaction ${session.id} already atomicized.`);
                    return; 
                }

                if (!pendingDoc.exists) {
                    throw new Error(`CRITICAL FRAUD ALERT: Session ${session.id} never pre-registered.`);
                }
                
                const pendingData = pendingDoc.data();
                if (pendingData.expectedAmount !== session.amount_total || pendingData.currency !== session.currency) {
                    throw new Error(`INTEGRITY FAILURE: Payload amount/currency tampered for Session ${session.id}.`);
                }

                t.set(eventRef, { 
                    processedAt: admin.firestore.FieldValue.serverTimestamp(),
                    type: event.type,
                    uid: operativeUid
                });

                t.set(userRef, {
                    auditStatus: 'CLEARED_FOR_INTAKE',
                    paymentVerified: true,
                    amountPaid: session.amount_total / 100,
                    transactionId: session.id,
                    clearanceTimestamp: admin.firestore.FieldValue.serverTimestamp()
                }, { merge: true });

                t.set(auditRef, {
                    type: "ENTERPRISE_AUDIT_PURCHASED",
                    uid: operativeUid,
                    transactionId: session.id,
                    amount: session.amount_total / 100,
                    timestamp: admin.firestore.FieldValue.serverTimestamp(),
                    status: "VERIFIED_AND_CLEARED"
                });

                // NEW: Layer 9 Business Protection - Payment State Object
                t.set(paymentRef, {
                    uid: operativeUid,
                    amount: session.amount_total / 100,
                    currency: session.currency,
                    status: "PAID",
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    stripeSessionId: session.id
                });
            });
            info(`🐦‍🔥 PAYMENT SECURED. AUDIT & STATE LOGGED. ATOMIC LOCK ENGAGED FOR UID: ${operativeUid}`);
        } catch (e) {
            error("TRANSACTION FAILED OR REJECTED BY INTEGRITY CHECK:", e);
            // VULNERABILITY PATCH: Alert Stripe to the internal failure so it can retry
            return res.status(500).send({ error: "INTERNAL TRANSACTION FAILURE." });
        }
    }

    res.status(200).send({ received: true });
});

// ============================================================================
// DIRECTIVE 4: SECURE PORTAL VERIFIER 
// ============================================================================
exports.verifySession = onCall(async (request) => {
    if (!request.auth) throw new HttpsError("unauthenticated", "ACCESS DENIED.");
    
    const sessionId = request.data.sessionId;
    if (!sessionId) throw new HttpsError("invalid-argument", "SESSION ID MISSING.");

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        if (session.client_reference_id !== request.auth.uid || session.payment_status !== 'paid') {
            throw new HttpsError("permission-denied", "SESSION MISMATCH OR UNPAID.");
        }

        if (session.expires_at * 1000 < Date.now()) {
            throw new HttpsError("permission-denied", "SESSION EXPIRED.");
        }

        return { verified: true, status: 'CLEARED_FOR_INTAKE' };
    } catch (err) {
        error("SESSION VERIFICATION FAILED.", err);
        throw new HttpsError("internal", "SESSION VERIFICATION ERROR.");
    }
});