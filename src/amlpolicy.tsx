import React, { useEffect } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const AMLPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative z-10 pt-28 pb-24 px-6 min-h-screen flex flex-col items-center w-full">
      <div className="w-full max-w-5xl mx-auto mb-16 text-center animate-in zoom-in duration-700">
        <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black border-4 border-black mb-8 text-[#00F3FF] shadow-[0_0_50px_rgba(0,243,255,0.6)] animate-[pulse_4s_ease-in-out_infinite]">
          <ShieldCheck size={48} />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-2xl">
          AML Policy
        </h1>
        <p className="text-[#00F3FF] font-mono tracking-[0.3em] text-sm uppercase font-bold drop-shadow-md">
          A.I.C.E. PROTOCOL // ANTI-MONEY LAUNDERING
        </p>
      </div>

      <div className="w-full max-w-5xl bg-black/80 backdrop-blur-xl border border-[#00F3FF]/30 p-8 md:p-14 rounded-3xl text-gray-300 leading-relaxed relative shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-700">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F3FF]/10 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute top-4 right-4 text-[#00F3FF]/20"><Lock size={80} /></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/10 pb-4 gap-4 w-full relative z-20">
            <div className="text-[#00F3FF] font-mono text-xs tracking-widest uppercase inline-flex items-center gap-3">
                <div className="w-2 h-2 bg-[#00F3FF] rounded-full animate-pulse"></div>
                Effective Date: March 2026 // Status: REGULATORY ALIGNMENT
            </div>
        </div>

        <div className="space-y-12 relative z-10">
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">1.</span> Corporate Identity and Operations
            </h3>
            <p>A.I.C.E. Systems Corp operates aice.network as a dedicated Software-as-a-Service (SaaS) platform. We provide advanced CRM tools, artificial intelligence systems, and network infrastructure. We strictly adhere to global Anti-Money Laundering (AML) standards.</p>
          </section>

          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">2.</span> Financial Flow Isolation
            </h3>
            <div className="bg-white/5 border border-white/10 p-5 rounded-xl border-l-2 border-[#00F3FF]">
                <p className="text-white font-bold mb-2">A.I.C.E. Systems Corp is strictly a technology provider.</p>
                <ul className="space-y-2 text-sm font-mono">
                    <li>- We <strong className="text-[#00F3FF]">do not</strong> custody, hold, or maintain user funds.</li>
                    <li>- We <strong className="text-[#00F3FF]">do not</strong> process peer-to-peer (P2P) transfers within our ecosystem.</li>
                    <li>- We <strong className="text-[#00F3FF]">do not</strong> operate as a digital wallet or cryptocurrency exchange.</li>
                </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">3.</span> Regulated Processing Partners
            </h3>
            <p>To ensure the highest standard of global financial compliance, all monetary transactions—including subscriptions and software purchases—are processed exclusively through regulated, Tier-1 third-party payment gateways (including Stripe and Gumroad). These partners maintain independent adherence to global AML and Know Your Customer (KYC) regulations.</p>
          </section>

          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">4.</span> Zero-Tolerance Policy
            </h3>
            <p>A.I.C.E. Systems Corp maintains a zero-tolerance policy regarding illicit financial activities. Any account suspected of attempting to utilize our SaaS infrastructure to facilitate fraud, money laundering, or sanctions evasion will face immediate termination, and telemetry data will be reported to the appropriate authorities.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AMLPolicy;