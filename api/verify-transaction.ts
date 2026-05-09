import Stripe from 'stripe';

// Initialize Stripe with your restricted server-side secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16', // Uses latest stable API version
});

export default async function handler(req: any, res: any) {
  // 1. Extract the session ID sent by your front-end
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'SYSTEM ALERT: Missing Session ID.' });
  }

  try {
    // 2. Cross-reference the ID directly with Stripe's secure servers
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // 3. Verify the payment is actually complete
    if (session.payment_status === 'paid') {
      
      // 4. AUTHORIZED: Deliver the hidden payload link
      const securePayloadLink = "https://drive.google.com/uc?export=download&id=1z842IIjXNedERcntZrwbEE-4qDXtHKXN";
      
      return res.status(200).json({ 
        verified: true, 
        downloadUrl: securePayloadLink 
      });
    } else {
      // UNAUTHORIZED: Payment failed or is pending
      return res.status(403).json({ error: 'SYSTEM ALERT: Payment not verified.' });
    }
  } catch (error) {
    // FAILED: The session ID was fake, expired, or invalid
    return res.status(500).json({ error: 'SYSTEM ALERT: Invalid Cryptographic Token.' });
  }
}