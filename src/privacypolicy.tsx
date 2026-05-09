import React, { useEffect } from 'react';
import { 
  ShieldAlert, 
  EyeOff, 
  Lock, 
  Database, 
  Fingerprint, 
  Download,
  Network,
  FileKey,
  Server,
  Scale
} from 'lucide-react';

export const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative z-10 pt-28 pb-24 px-6 min-h-screen flex flex-col items-center w-full">
      
      {/* HEADER */}
      <div className="w-full max-w-5xl mx-auto mb-16 text-center animate-in zoom-in duration-700">
        <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black border-4 border-black mb-8 text-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.4)] animate-[pulse_4s_ease-in-out_infinite]">
          <EyeOff size={48} />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-2xl">
          Privacy Policy
        </h1>
        <p className="text-purple-500 font-mono tracking-[0.3em] text-sm uppercase font-bold drop-shadow-md">
          A.I.C.E. PROTOCOL // DATA ENCRYPTION & SOVEREIGNTY
        </p>
      </div>

      {/* DOCUMENT BODY */}
      <div className="w-full max-w-5xl bg-black/80 backdrop-blur-xl border border-purple-500/30 p-8 md:p-14 rounded-3xl text-gray-300 leading-relaxed relative shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-700">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute top-4 right-4 text-purple-500/20"><Lock size={80} /></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/10 pb-4 gap-4 w-full relative z-20">
              <div className="text-purple-500 font-mono text-xs tracking-widest uppercase inline-flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  Last Updated: March 2026 // Status: ZERO-KNOWLEDGE PRINCIPLES APPLIED
              </div>
              <a 
                  href="/assets/images/Privacy%20Policy/A.I.C.E._Privacy_Policy.pdf" 
                  download 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-purple-500/10 border border-purple-500/50 text-purple-500 hover:bg-purple-500 hover:text-white transition-all rounded font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:scale-105"
              >
                  <Download size={14} /> Download PDF
              </a>
          </div>

          <div className="space-y-12 relative z-10">
              
              {/* 1. ARCHITECTURE */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">1.</span> Information Sovereignty 
                  </h3>
                  <p>A.I.C.E. Systems Corp. operates under a strict principle of data minimization. We do not mine your personal data; we encrypt your operational footprint. Our architecture is designed to monitor system entropy and hardware telemetry, not personal identities. Any personal information collected is strictly for authentication, licensing, and secure communication protocols.</p>
              </section>

              {/* 2. TELEMETRY VS IDENTITY */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">2.</span> Telemetry vs. Personal Identity
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 border border-white/10 p-5 rounded-xl border-l-2 border-purple-500">
                          <strong className="text-white block mb-2 uppercase text-xs tracking-widest"><Database size={14} className="inline mr-2 text-purple-500"/>Operational Telemetry</strong>
                          <p className="text-sm">We collect machine-level data: latency metrics, entropy spikes, and execution speeds. This data is anonymized and used exclusively to calculate impedance parameters and prevent system crashes.</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-5 rounded-xl border-l-2 border-white/30">
                          <strong className="text-white block mb-2 uppercase text-xs tracking-widest"><Fingerprint size={14} className="inline mr-2 text-gray-400"/>Identity Markers</strong>
                          <p className="text-sm">We collect email addresses, encrypted access codes, and secure transaction receipts purely to maintain access control to the A.I.C.E. network and verify active licenses.</p>
                      </div>
                  </div>
              </section>

              {/* 3. SHARING PROTOCOLS */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">3.</span> Zero-Distribution Protocol
                  </h3>
                  <p className="mb-4">
                      A.I.C.E. Systems Corp. <strong className="text-white underline">does not and will never sell your data</strong> to third-party data brokers, marketing agencies, or external analytical firms. Your operational metrics and identity remain classified within our encrypted infrastructure. 
                  </p>
                  <p>
                      Data transmission to external nodes only occurs when required to process secure payments (e.g., via Airwallex or secure enterprise gateways) or when explicitly demanded by a verified legal subpoena from a competent judicial authority.
                  </p>
              </section>

              {/* 4. COOKIES & TRACKING */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">4.</span> Session State & Local Storage
                  </h3>
                  <p>
                      We utilize highly restricted local storage and encrypted session tokens (cookies) solely to maintain your authentication state across the grid. We do not deploy third-party advertising trackers or cross-site surveillance scripts. Your movement outside of the A.I.C.E. ecosystem is entirely your own.
                  </p>
              </section>

              {/* 5. USER RIGHTS */}
              <section className="bg-purple-500/5 border border-purple-500/30 p-8 rounded-xl shadow-inner relative">
                  <div className="absolute top-8 right-8 opacity-30"><FileKey size={48} className="text-purple-500" /></div>
                  <h3 className="text-xl md:text-2xl font-black text-purple-500 uppercase tracking-widest mb-4">
                      5. Operative Rights & Erasure
                  </h3>
                  <p className="text-white mb-4 relative z-10">
                      You retain absolute sovereignty over your identity markers. As a registered operative, you have the right to:
                  </p>
                  <ul className="space-y-3 pl-6 border-l-2 border-purple-500/30 text-sm font-mono relative z-10">
                      <li>- Demand a full export of your associated data matrix.</li>
                      <li>- Request immediate termination and cryptographic erasure of your profile.</li>
                      <li>- Opt-out of non-critical system transmissions.</li>
                  </ul>
                  <p className="mt-6 text-xs text-gray-400 font-mono uppercase">
                      * Note: Erasure requests will instantly sever your connection to the A.I.C.E. grid and void active software licenses without refund.
                  </p>
              </section>

              {/* 6. CONTACT */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">6.</span> Secure Compliance Channels
                  </h3>
                  <p className="mb-4">
                      For inquiries regarding data sovereignty, cryptographic erasure, or to report an operational privacy breach, transmit your request directly to our compliance infrastructure:
                  </p>
                  <ul className="space-y-3 text-sm font-mono bg-black/50 p-6 rounded-xl border border-white/10">
                      <li className="flex items-center gap-3"><Network size={16} className="text-purple-500"/> <a href="mailto:privacy@aice.network" className="hover:text-purple-400 transition-colors">privacy@aice.network</a></li>
                  </ul>
              </section>

              {/* 7. LEGAL INTEGRATION & JURISDICTION (NEW) */}
              <section className="bg-[#050505] border-t-2 border-purple-500/50 pt-8 mt-12 relative">
                  <div className="absolute top-8 right-0 opacity-10"><Scale size={64} className="text-purple-500" /></div>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3 relative z-10">
                      <span className="text-purple-500">7.</span> Legal Integration & Jurisdiction
                  </h3>
                  <p className="mb-4 relative z-10">
                      This Privacy Policy is governed by the laws of Canada and the Province of Alberta. It forms an integral part of, and is strictly incorporated into, the master <strong className="text-white cursor-pointer hover:text-purple-500 transition-colors">A.I.C.E. Terms of Service</strong>.
                  </p>
              </section>

          </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;