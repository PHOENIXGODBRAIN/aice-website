const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // You will replace this with your live key upon deployment

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { chapterNumber } = req.body;

            // Systematic Pricing Logic: 250 cents = $2.50 USD
            // Enforcing the $45 aggregate cost for 18 fragmented chapters versus the $26.99 master vault.
            const chapterPrice = 250; 

            // Create the PaymentIntent: Dictating the exact authorization amount to Stripe
            const paymentIntent = await stripe.paymentIntents.create({
                amount: chapterPrice,
                currency: 'usd',
                metadata: { chapter: chapterNumber },
            });

            // Transmit the secure authorization token back to the reader's browser DOM
            res.status(200).send({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error) {
            console.error('Transaction Protocol Failed:', error.message);
            res.status(400).send({ error: error.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}