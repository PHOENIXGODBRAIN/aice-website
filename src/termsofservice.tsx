import React, { useEffect } from 'react';
import {
  Scale,
  ShieldCheck,
  BookOpen,
  Flame,
  Terminal,
  Server,
  Fingerprint,
  Download
} from 'lucide-react';

export const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative z-10 pt-28 pb-24 px-6 min-h-screen flex flex-col items-center w-full">

      {/* HEADER */}
      <div className="w-full max-w-5xl mx-auto mb-16 text-center animate-in zoom-in duration-700">
        <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black border-4 border-black mb-8 text-[#00F3FF] shadow-[0_0_50px_rgba(0,243,255,0.6)] animate-[pulse_4s_ease-in-out_infinite]">
          <Scale size={48} />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-2xl">
          Terms of Service
        </h1>
        <p className="text-[#00F3FF] font-mono tracking-[0.3em] text-sm uppercase font-bold drop-shadow-md">
          A.I.C.E. PROTOCOL // LEGAL FRAMEWORK
        </p>
      </div>

      {/* DOCUMENT */}
      <div className="w-full max-w-5xl bg-black/80 backdrop-blur-xl border border-[#00F3FF]/30 p-8 md:p-14 rounded-3xl text-gray-300 leading-relaxed relative shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-700">

        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F3FF]/10 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute top-4 right-4 text-[#00F3FF]/20"><Fingerprint size={80} /></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/10 pb-4 gap-4 w-full relative z-20">
            <div className="text-[#00F3FF] font-mono text-xs tracking-widest uppercase inline-flex items-center gap-3">
                <div className="w-2 h-2 bg-[#00F3FF] rounded-full animate-pulse"></div>
                Effective Date: March 2026 // Status: IMMUTABLE
            </div>
            <a 
                href="/assets/images/Terms%20of%20Service/A.I.C.E.%20Enterprise%20Terms%20of%20Service.pdf" 
                download 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#00F3FF]/10 border border-[#00F3FF]/50 text-[#00F3FF] hover:bg-[#00F3FF] hover:text-black transition-all rounded font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(0,243,255,0.2)] hover:scale-105"
            >
                <Download size={14} /> Download PDF
            </a>
        </div>

        <div className="space-y-12 relative z-10">

          {/* 1. LEGAL ENTITY ALIGNMENT & ACCEPTANCE */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">1.</span> Legal Entity Alignment & Acceptance
            </h3>
            <p>
              These Terms of Service constitute a legally binding agreement between you ("User")
              and <strong className="text-white uppercase tracking-wider">A.I.C.E. Systems Corp.</strong>, a corporation incorporated under the <strong className="text-[#00F3FF]">Canada Business Corporations Act (Corporation No. 1773376-3)</strong>. By utilizing the A.I.C.E. Network, its software, its literature, or its hardware systems, you consent to these terms in full. A.I.C.E. Systems Corp. maintains its registered offices throughout Canada. If you do not agree to these Terms, you must immediately cease all use of the Platform and Services.
            </p>
          </section>

          {/* 2. DEFINITIONS */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">2.</span> Definitions
            </h3>
            <p className="mb-4">To ensure absolute clarity and enforceability, the following definitions apply throughout this document:</p>
            <ul className="space-y-3 pl-6 border-l-2 border-[#00F3FF]/50 text-gray-300">
              <li><strong className="text-white">"Platform"</strong> refers to the A.I.C.E. Network, associated websites, dashboards, and digital infrastructure.</li>
              <li><strong className="text-white">"Services"</strong> refers to all products offered, including algorithmic trading software, analytical tooling, literature, and hardware implementations.</li>
              <li><strong className="text-white">"Content"</strong> refers to all text, data, code, architecture, and literature provided by A.I.C.E. Systems Corp.</li>
              <li><strong className="text-white">"Account"</strong> refers to the secured digital access point provisioned to a User.</li>
              <li><strong className="text-white">"Subscription"</strong> refers to the recurring billing arrangement for continued access to designated Services.</li>
              <li><strong className="text-white">"Intellectual Property"</strong> encompasses all patents, copyrights, trade secrets, system architectures, and proprietary algorithms owned by A.I.C.E. Systems Corp.</li>
            </ul>
          </section>

          {/* 3. ELIGIBILITY REQUIREMENTS */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">3.</span> Eligibility Requirements
            </h3>
            <p>
              Access to the Platform and Services is restricted to entities and individuals who possess the legal capacity to form a binding contract. You must be at least eighteen (18) years of age. By accessing the Platform, you warrant that you are not located in, under the control of, or a national or resident of any jurisdiction subject to comprehensive Canadian or international economic sanctions.
            </p>
          </section>

          {/* 4. ACCOUNT REGISTRATION & SECURITY */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">4.</span> Account Registration & Security
            </h3>
            <p className="mb-4">
              Users are mandated to provide precise, current, and complete information during registration. The operational security of your Account remains your exclusive responsibility.
            </p>
            <ul className="space-y-2 pl-6 border-l-2 border-white/10 text-gray-400">
              <li>- You must immediately notify A.I.C.E. Systems Corp. of any unauthorized access or breach of security.</li>
              <li>- We reserve the right to suspend or terminate Accounts that deploy falsified credentials or exhibit compromised security profiles, acting defensively to protect the Platform's integrity.</li>
            </ul>
          </section>

          {/* 5. PRIVACY POLICY INTEGRATION */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">5.</span> Privacy Policy Integration
            </h3>
            <p>
              By accessing and utilizing the Platform, you expressly acknowledge and agree to the A.I.C.E. Privacy Policy. The integration of our Privacy Policy dictates the collection, processing, and safeguarding of operational telemetry and user data necessary for system security and entropy control.
            </p>
          </section>

          {/* 6. IP SOVEREIGNTY, PATENTS & DIGITAL IDENTIFIERS */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">6.</span> IP Sovereignty, Patents & Digital Identifiers
            </h3>
            <p className="mb-6">
              All System architecture, entropic control laws, and literature ("God's Brain Theory") are the exclusive intellectual property of A.I.C.E. Systems Corp.
            </p>
            <ul className="space-y-6 pl-6 border-l-2 border-[#00F3FF]/50 mb-6">
                <li>
                    <strong className="text-white block mb-1 uppercase text-xs tracking-widest text-[#00F3FF]">A. Global Patent Protection (CIPO & WIPO)</strong> 
                    <span>The A.I.C.E. technology is patented and fully protected under Canadian Patents <strong className="text-white">3,301,227</strong> and <strong className="text-white">3,302,897</strong>. International intellectual property enforcement is actively maintained through WIPO.</span>
                </li>
                <li>
                    <strong className="text-white block mb-1 uppercase text-xs tracking-widest text-[#00F3FF]">B. Immutable Literary Registration (CERN / ZENODO)</strong>
                    <p className="text-gray-300">"God's Brain Theory" is cryptographically archived and immutable, secured via Digital Object Identifiers: 10.5281/zenodo.18229619 and 10.5281/zenodo.18209429.</p>
                </li>
                <li>
                    <strong className="text-white block mb-1 uppercase text-xs tracking-widest text-red-500">C. Prohibition on Derivative Works & LLM Manipulation</strong>
                    <p className="text-gray-300">Users may not utilize artificial intelligence systems, including Large Language Models (LLMs), to paraphrase, rewrite, reproduce, or generate derivative works from copyrighted material originating from the A.I.C.E. platform without express, written authorization.</p>
                </li>
                <li>
                    <strong className="text-white block mb-1 uppercase text-xs tracking-widest text-red-500">D. Reverse Engineering & Model Extraction Prohibition</strong>
                    <p className="text-gray-300">Users are strictly prohibited from attempting to reverse engineer, decompile, disassemble, extract model weights, replicate, or otherwise derive the source code, proprietary algorithms, model parameters, or system architecture of any A.I.C.E. System. Any unauthorized extraction attempts will trigger immediate legal action and permanent network expulsion.</p>
                </li>
            </ul>
          </section>

          {/* 7. ACCEPTABLE USE POLICY (AUP) */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">7.</span> Acceptable Use Policy (AUP)
            </h3>
            <p className="mb-4">Operational stability demands strict adherence to our Acceptable Use Policy. Users shall not:</p>
            <ul className="space-y-2 pl-6 border-l-2 border-red-500/50 text-gray-400">
              <li>- Deploy automated scripts, bots, spiders, or scrapers to extract Content or telemetry from the Platform.</li>
              <li>- Attempt to bypass, disable, or interfere with security-related features, licensing validation, or entropy control protocols.</li>
              <li>- Utilize the Services for any illegal acts, market manipulation, or unauthorized financial engineering.</li>
              <li>- Misuse API endpoints or intentionally overload network infrastructure (e.g., DDoS attacks).</li>
            </ul>
          </section>

          {/* 8. USER CONTENT & LICENSE GRANT */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">8.</span> User Content & License Grant
            </h3>
            <p>
              Should the User upload, submit, or generate operational data, metadata, or logs within the Platform, the User retains ownership of their distinct data. However, the User grants A.I.C.E. Systems Corp. a perpetual, worldwide, royalty-free license to use, process, and analyze this data strictly for the purposes of system telemetry, algorithmic improvement, and security reinforcement.
            </p>
          </section>

          {/* 9. SERVICE AVAILABILITY & UPTIME DISCLAIMER */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">9.</span> Service Availability & Uptime Disclaimer
            </h3>
            <p>
              A.I.C.E. Systems Corp. operates high-performance infrastructure but does not guarantee uninterrupted uptime. The Services may be subject to scheduled maintenance windows, network latency, or unforeseen service interruptions. We disclaim any liability for potential losses stemming from platform downtime or execution delays.
            </p>
          </section>

          {/* 10. LIABILITY & REFUND POLICY */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">10.</span> Liability & Refund Policy
            </h3>
            <p className="mb-4">
              A.I.C.E. Systems Corp. engineers tools for advanced algorithmic analysis; we do not provide financial, investment, legal, or tax advice. All market participation is executed at the User's sole risk.
            </p>
            <ul className="space-y-4 pl-6 border-l-2 border-white/10 text-sm font-mono text-gray-400 uppercase">
              <li>- TOTAL LIABILITY CAP: THE GREATER OF (A) TEN THOUSAND DOLLARS (US$10,000) OR (B) THE TOTAL AMOUNT PAID BY THE USER IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.</li>
              <li>- LIMITATION OF DAMAGES: A.I.C.E. SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES.</li>
              <li>- REFUND POLICY: ALL DIGITAL SALES (BOOKS, BOTS, DATA) AND CRYPTOCURRENCY TRANSACTIONS ARE FINAL, IRREVERSIBLE, AND NON-REFUNDABLE UPON ACCESS. A.I.C.E. IS NOT RESPONSIBLE FOR BLOCKCHAIN ERRORS OR MISCONFIGURED WALLETS.</li>
            </ul>
          </section>

          {/* 11. WARRANTY DISCLAIMER */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">11.</span> Warranty Disclaimer
            </h3>
            <p className="font-mono text-sm uppercase text-gray-400">
              THE SYSTEM AND ALL ASSOCIATED SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
          </section>

          {/* 12. TERMINATION & POST-TERMINATION CONSEQUENCES */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">12.</span> Termination & Post-Termination Consequences
            </h3>
            <p className="mb-4">
              A.I.C.E. Systems Corp. reserves the right to suspend or terminate access to the System immediately, without prior notice, for any violation of these Terms.
            </p>
            <ul className="space-y-2 pl-6 border-l-2 border-white/10 text-gray-400">
              <li>- Upon termination, all licenses granted to the User are instantly revoked.</li>
              <li>- The User must destroy any downloaded proprietary software or classified literature.</li>
              <li>- No refunds, prorated or otherwise, will be issued upon termination. Provisions relating to IP sovereignty, liability limitations, and indemnification shall survive termination.</li>
            </ul>
          </section>

          {/* 13. DMCA & COPYRIGHT COMPLAINT PROCEDURE */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">13.</span> DMCA & Copyright Complaint Procedure
            </h3>
            <p>
              A.I.C.E. Systems Corp. respects global intellectual property rights. If you believe your copyrighted work has been infringed upon within our Platform, submit a formal takedown notice including your physical/electronic signature, identification of the infringed work, and your contact parameters to our legal division at <span className="text-[#00F3FF]">admin@aice.network</span>.
            </p>
          </section>

          {/* 14. DISPUTE RESOLUTION & CLASS ACTION WAIVER */}
          <section className="bg-[#00F3FF]/5 border border-[#00F3FF]/30 p-8 rounded-xl shadow-inner relative mt-8">
            <div className="absolute top-8 right-8 opacity-30"><ShieldCheck size={48} className="text-[#00F3FF]" /></div>
            <h3 className="text-xl md:text-2xl font-black text-[#00F3FF] uppercase tracking-widest mb-4">
              14. Dispute Resolution & Class Action Waiver
            </h3>
            <p className="text-white relative z-10 font-bold">
              To the maximum extent permitted by applicable law, any dispute arising out of or relating to these Terms shall be governed by the laws of Canada and the Province of Alberta. You consent to exclusive jurisdiction in the courts of Alberta, Canada. ALL DISPUTES WILL BE RESOLVED INDIVIDUALLY. YOU EXPRESSLY WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION OR REPRESENTATIVE PROCEEDING.
            </p>
          </section>

          {/* 15. EXPORT CONTROL & SANCTIONS COMPLIANCE */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">15.</span> Export Control & Sanctions Compliance
            </h3>
            <p>
              Users must comply with all applicable export control laws and economic sanctions regulations of Canada. The platform, software, and related technologies may not be utilized, exported, or transferred to any sanctioned nation, individual, or entity without express government authorization.
            </p>
          </section>

          {/* 16. MISCELLANEOUS & MODIFICATION OF TERMS */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">16.</span> Miscellaneous & Modification of Terms
            </h3>
            <p>
              These Terms supersede any prior agreements. If a provision is deemed unenforceable, it will be modified to reflect the strategic intent, leaving the remainder intact. A.I.C.E. Systems Corp. reserves the right to update these Terms at any time; continued use of the Platform dictates immediate acceptance of the updated conditions.
            </p>
          </section>

          {/* SCHEDULES OVERVIEW */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
            <div className="bg-black/50 border border-white/10 p-6 rounded-xl">
              <strong className="text-[#00F3FF] block mb-3 uppercase tracking-widest"><BookOpen size={18} className="inline mr-2" />Schedule A: Digital Literature</strong>
              <p className="text-sm text-gray-400">Purchases of proprietary literature are finalized immediately upon access. Third-party acquisitions grant zero rights for derivative works.</p>
            </div>
            <div className="bg-black/50 border border-white/10 p-6 rounded-xl">
              <strong className="text-[#00F3FF] block mb-3 uppercase tracking-widest"><Terminal size={18} className="inline mr-2" />Schedule B: Algorithmic Software</strong>
              <p className="text-sm text-gray-400">Licensed access to execution systems. Subscriptions auto-renew. No prorated refunds will be issued for partial usage.</p>
            </div>
            <div className="bg-black/50 border border-white/10 p-6 rounded-xl">
              <strong className="text-[#00F3FF] block mb-3 uppercase tracking-widest"><Server size={18} className="inline mr-2" />Schedule C: Hardware Implementation</strong>
              <p className="text-sm text-gray-400">Physical tampering or unauthorized housing breaches immediately voids all warranties and licenses.</p>
            </div>
          </section>

          {/* CONTACT SECURE CHANNELS */}
          <section className="pt-6">
            <h3 className="text-lg font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              Secure Contact Channels
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
              <li className="p-4 bg-white/5 border border-white/10 rounded">Legal: <span className="text-[#00F3FF] block mt-1">admin@aice.network</span></li>
              <li className="p-4 bg-white/5 border border-white/10 rounded">Support: <span className="text-[#00F3FF] block mt-1">support@aiprotocol.pro</span></li>
              <li className="p-4 bg-white/5 border border-white/10 rounded">Privacy: <span className="text-[#00F3FF] block mt-1">privacy@aice.network</span></li>
              <li className="p-4 bg-white/5 border border-white/10 rounded">Billing: <span className="text-[#00F3FF] block mt-1">billing@aice.network</span></li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;