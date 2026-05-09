import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock, Zap } from 'lucide-react';

// CRITICAL: Replace with your actual Stripe Publishable Key
const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

const CheckoutTerminal = ({ chapterNum }: { chapterNum: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const executeTransaction = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);
        setError(null);

        try {
            // 1. Contact your Vercel API Node
            const response = await fetch('/api/unlock_chapter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chapterNumber: chapterNum })
            });
            const data = await response.json();

            // 2. Execute Financial Transfer
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) return;

            const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(
                data.clientSecret,
                { payment_method: { card: cardElement } }
            );

            if (stripeError) {
                setError(stripeError.message || 'Transaction failed.');
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                alert('TRANSACTION CLEARED. DECRYPTING NODE...');
                // The decryption trigger will go here in the next phase
            }
        } catch (err) {
            setError('Network communication error. Maintain connection and retry.');
        }
        setProcessing(false);
    };

    return (
        <form onSubmit={executeTransaction} className="mt-6 border border-[#444] p-6 bg-[#0a0a0a]">
            <div className="p-4 border border-[#333] bg-black mb-6">
                <CardElement options={{
                    style: { base: { color: '#00FFFF', fontFamily: 'monospace', fontSize: '16px', '::placeholder': { color: '#444' } } }
                }}/>
            </div>
            {error && <div className="text-[#ff3333] text-sm mb-4">{error}</div>}
            <button 
                disabled={!stripe || processing} 
                className="w-full bg-[#00FFFF] text-black font-bold uppercase py-4 hover:bg-white transition-colors disabled:opacity-50"
            >
                {processing ? 'Processing Transfer...' : 'Authorize Transfer & Decrypt'}
            </button>
        </form>
    );
};

export const BookReader = () => {
    const [showTerminal, setShowTerminal] = useState(false);

    return (
        <div className="max-w-4xl mx-auto p-8 font-mono text-white">
            <h1 className="text-3xl text-[#00FFFF] mb-8 font-bold tracking-widest border-b border-[#00FFFF] pb-4">
                THE GOD'S BRAIN THEORY: TRANSMISSION LOG
            </h1>
            
            {/* INGEST RAW TEXT HERE LATER */}
            <div className="prose prose-invert mb-12 text-gray-300 leading-relaxed">
                <h2>CHAPTER 1: THE EVIDENCE IN THE ARCHITECTURE</h2>
                <p>This book did not begin in a laboratory, nor did it begin in a seminary. It began with a feeling I couldn't shake: that there is a far deeper meaning and connection to our reality than most people realize...</p>
                <p>[End of Chapter 1 free transmission]</p>
            </div>

            {/* THE IMPEDANCE MATRIX (PAYWALL) */}
            <div className="border-2 border-[#00FFFF] bg-black p-8 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                <div className="flex items-center gap-3 mb-4">
                    <Lock className="text-[#FFA500]" size={28} />
                    <h3 className="text-xl text-[#00FFFF] font-bold">[RESTRICTED DATA NODE: CHAPTER 2]</h3>
                </div>
                <p className="text-sm text-gray-400 mb-8">
                    Cryptographic lock engaged. Select transaction protocol to decrypt the conclusive evidence.
                </p>

                <div className="flex gap-4">
                    <button 
                        onClick={() => setShowTerminal(true)}
                        className="flex-1 border border-[#FFA500] text-[#FFA500] bg-[#111] py-3 font-bold hover:bg-[#FFA500] hover:text-black transition-colors flex items-center justify-center gap-2"
                    >
                        <Zap size={18} /> Unlock Single Node ($2.50)
                    </button>
                    <button 
                        onClick={() => window.location.href='/master-vault'}
                        className="flex-1 border border-[#00FFFF] text-[#00FFFF] bg-[#111] py-3 font-bold hover:bg-[#00FFFF] hover:text-black transition-colors"
                    >
                        Acquire Master Key ($26.99)
                    </button>
                </div>

                {showTerminal && (
                    <Elements stripe={stripePromise}>
                        <CheckoutTerminal chapterNum={2} />
                    </Elements>
                )}
            </div>
        </div>
    );
};