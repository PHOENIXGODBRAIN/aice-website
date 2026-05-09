import { buffer } from 'micro';
import Stripe from 'stripe';
import * as admin from 'firebase-admin';

// 1. Initialize Serverless Keys
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-03-25.dahlia', // Updated to match your exact Stripe SDK version
});

// 2. Prevent Multiple Firebase Instances in Serverless
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Handle Vercel's newline formatting for private keys
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();
const auth = admin.auth();

// 3. Force Vercel to accept the RAW payload (Required for Cryptographic Signature)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const rawBody = await buffer(req);
  const signature = req.headers['stripe-signature'];
  let event;

  try {
    // 4. Verify the ping is actually from Stripe and not an imposter
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error(`⚠️ Webhook Signature Verification Failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 5. Execution Protocol: Handle Successful Payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const customerEmail = session.customer_details?.email;
    const amountTotal = session.amount_total; // Calculated in cents

    if (!customerEmail) {
      return res.status(400).json({ error: 'No email provided in payload.' });
    }

    console.log(`✅ A.I.C.E. PAYMENT SECURED: $${(amountTotal / 100).toLocaleString()} USD from ${customerEmail}`);

    // Determine Architectural Tier based on capital deployed
    let newTier = 'LEVEL_5'; // Default fallback
    if (amountTotal === 1500000) newTier = 'CLASS_3';
    else if (amountTotal === 50000000) newTier = 'CLASS_2';
    else if (amountTotal === 150000000) newTier = 'CLASS_1';
    else if (amountTotal === 250000000) newTier = 'CLASS_S';

    try {
      // 6. Database Cross-Reference (Find the Operative)
      const userRecord = await auth.getUserByEmail(customerEmail);
      const uid = userRecord.uid;

      // 7. Execute Clearance Upgrade
      const userDocRef = db.doc(`artifacts/aice-6bd8e/users/${uid}`);
      
      await userDocRef.set({
        activeTier: newTier,
        clearance: newTier.replace('_', ' '),
        lastAuditPurchase: new Date().toISOString(),
        paymentStatus: 'VERIFIED_STRIPE'
      }, { merge: true });

      console.log(`🚀 OPERATIVE PROFILE UPGRADED: ${customerEmail} is now ${newTier}`);
      
    } catch (error: any) {
      // IF USER DOES NOT EXIST YET (Guest Checkout)
      if (error.code === 'auth/user-not-found') {
        console.log(`⚠️ Email ${customerEmail} not registered in Firebase yet. Storing clearance in Holding Matrix.`);
        await db.doc(`pending_clearances/${customerEmail}`).set({
          activeTier: newTier,
          amountPaid: amountTotal / 100,
          timestamp: new Date().toISOString()
        });
      } else {
        console.error('Database execution failed:', error);
      }
    }
  }

  // 8. Transmit success back to Stripe
  res.status(200).json({ received: true, status: 'A.I.C.E. Protocol Executed' });
}