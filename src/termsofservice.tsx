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
                href="/assets/images/Terms%20of%20Service/A.I.C.E._TERMS_OF_SERVICE.pdf" 
                download 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#00F3FF]/10 border border-[#00F3FF]/50 text-[#00F3FF] hover:bg-[#00F3FF] hover:text-black transition-all rounded font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(0,243,255,0.2)] hover:scale-105"
            >
                <Download size={14} /> Download PDF
            </a>
        </div>

        <div className="space-y-12 relative z-10">

          {/* 1. LEGAL ENTITY ALIGNMENT */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">1.</span> Legal Entity Alignment
            </h3>
            <p>
              These Terms of Service constitute a legally binding agreement between you ("User")
              and <strong className="text-white uppercase tracking-wider">A.I.C.E. Systems Corp.</strong>, a corporation incorporated under the <strong className="text-[#00F3FF]">Canada Business Corporations Act (Corporation No. 1773376-3)</strong>. By utilizing the A.I.C.E. Network, its software, or its literature, you consent to these terms in full. A.I.C.E. Systems Corp. is registered under Corporation No. 1773376-3 and maintains its registered offices throughout Canada. 
            </p>
          </section>

          {/* 2 */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">2.</span> Operational Assets & Commercial Scope
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                <strong className="text-white block mb-2"><Terminal size={16} className="inline mr-2 text-[#00F3FF]" />Software Implementations</strong>
                Adaptive intelligence and entropy control systems.
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                <strong className="text-white block mb-2"><Server size={16} className="inline mr-2 text-[#00F3FF]" />Hardware Implementations</strong>
                Physical and air-gapped processing units.
              </div>
            </div>
          </section>

          {/* 3. IP SOVEREIGNTY & PATENTS */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">3.</span> IP Sovereignty & Patents
            </h3>
            <p className="mb-6">
              All System architecture and entropic control laws are the exclusive intellectual property of A.I.C.E. Systems Corp.
            </p>
            <ul className="space-y-6 pl-6 border-l-2 border-[#00F3FF]/50 mb-6">
                <li>
                    <strong className="text-white block mb-1 uppercase text-xs tracking-widest text-[#00F3FF]">A. Global Patent Pending Status (CIPO)</strong> 
                    <span>Technology is protected under Patent Pending status, including Canadian Patent Applications <strong className="text-white">3,301,227</strong> and <strong className="text-white">3,302,897</strong>. International protection is being pursued through WIPO.</span>
                </li>
                <li>
                    <strong className="text-white block mb-1 uppercase text-xs tracking-widest text-red-500">B. Prohibition on Derivative Works & LLM Manipulation</strong>
                    <p className="text-gray-300">
                      Users may not use artificial intelligence systems, including large language models (LLMs), to paraphrase, rewrite, reproduce, or create derivative works from copyrighted material originating from the A.I.C.E. platform without express written authorization.
                    </p>
                </li>
                <li>
                    <strong className="text-white block mb-1 uppercase text-xs tracking-widest text-[#00F3FF]">C. Third-Party Distributors</strong>
                    <p className="text-gray-300">
                      Copies of software acquired through external distributors (including but not limited to digital storefronts or publishing platforms) remain subject to the distribution terms of those platforms as well as these Terms. Such third-party acquisitions do not grant additional rights to create derivative works or redistribute the materials.
                    </p>
                </li>
                <li>
                    <strong className="text-white block mb-1 uppercase text-xs tracking-widest text-[#00F3FF]">D. Reverse Engineering & Model Extraction Prohibition</strong>
                    <p className="text-gray-300">
                      Users may not reverse engineer, decompile, disassemble, extract model weights, attempt to replicate, or otherwise derive the source code, proprietary algorithms, model parameters, or system architecture of any A.I.C.E. System without express written permission. Any unauthorized attempt to reproduce or extract intellectual property will be treated as a material breach of these Terms and may result in legal action.
                    </p>
                </li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">4.</span> System Telemetry & Safety Controls
            </h3>
            <p>
              Use of the System may involve collection of operational telemetry strictly necessary for
              stability, security, and performance monitoring to prevent system runaways. No personal data is sold or shared with third parties except where required by law.
            </p>
          </section>

        {/* 5. GOVERNING LAW: THE CANADIAN ANCHOR */}
          <section className="bg-[#00F3FF]/5 border border-[#00F3FF]/30 p-8 rounded-xl shadow-inner relative">
            <div className="absolute top-8 right-8 opacity-30"><ShieldCheck size={48} className="text-[#00F3FF]" /></div>
            <h3 className="text-xl md:text-2xl font-black text-[#00F3FF] uppercase tracking-widest mb-4">
              5. Governing Law & Jurisdiction
            </h3>
            <p className="text-white relative z-10 font-bold">
              These Terms and any disputes arising from the use of the System shall be governed by and construed in accordance with the laws of Canada and the Province of Alberta. You consent to the exclusive jurisdiction of the competent courts of Canada and Alberta for the resolution of any dispute relating to these Terms or the System. Nothing in this section limits additional protections, liability limitations, dispute procedures, or class‑action waivers described elsewhere in these Terms.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">6.</span> Secure Contact Channels
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
              <li className="p-4 bg-black/50 border border-white/10 rounded">Legal: <span className="text-[#00F3FF]">admin@aice.network</span></li>
              <li className="p-4 bg-black/50 border border-white/10 rounded">Support: <span className="text-[#00F3FF]">support@aice.network</span></li>
              <li className="p-4 bg-black/50 border border-white/10 rounded">Privacy: <span className="text-[#00F3FF]">privacy@aice.network</span></li>
              <li className="p-4 bg-black/50 border border-white/10 rounded">Billing: <span className="text-[#00F3FF]">finance@aice.network</span></li>
            </ul>
          </section>

          {/* 7. FINANCIAL LIABILITY & REFUND SHIELD */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">7.</span> Liability & Refund Policy
            </h3>
            <p className="mb-4">
              A.I.C.E. Systems Corp. provides advanced tools for system governance and entropy analysis. All operational deployments are executed at the User's sole risk.
            </p>
            <ul className="space-y-4 pl-6 border-l-2 border-white/10 text-sm font-mono text-gray-400">
              <li>- TOTAL LIABILITY CAP: THE GREATER OF (A) TEN THOUSAND (US$10,000) OR (B) THE TOTAL AMOUNT PAID BY THE USER IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.</li>
              <li>- A.I.C.E. SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF DATA, LOSS OF BUSINESS OPPORTUNITY, OR SERVICE INTERRUPTION, TO THE MAXIMUM EXTENT PERMITTED BY LAW.</li>
              <li>- ALL DIGITAL SALES (SOFTWARE, LICENSES, DATA) ARE IRREVERSIBLE AND NON-REFUNDABLE UPON ACCESS.</li>
              <li>- SUBSCRIPTIONS MAY BE TERMINATED AT ANY TIME VIA DASHBOARD; NO PRORATED REFUNDS ISSUED.</li>
            </ul>
          </section>

          {/* 8. WARRANTY DISCLAIMER */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">8.</span> Warranty Disclaimer
            </h3>
            <p>
              THE SYSTEM AND ALL ASSOCIATED SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. A.I.C.E. DOES NOT WARRANT THAT THE SYSTEM WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">9.</span> No Financial Advice
            </h3>
            <p>
              The System does not provide financial, investment, legal, or tax advice. All infrastructural and operational decisions are made solely at the User's risk.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">10.</span> Termination & Access Control
            </h3>
            <p>
              A.I.C.E. Systems Corp. reserves the right to suspend or terminate access to the System at
              any time for violations of these Terms or applicable law.
            </p>
          </section>

          {/* 11. INDEMNIFICATION */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">11.</span> Indemnification
            </h3>
            <p>
              You agree to defend, indemnify and hold harmless A.I.C.E. Systems Corp., its officers, directors, employees and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees and costs, arising out of or in any way connected with your access to or use of the System, your violation of these Terms, or your breach of any rights of a third party.
            </p>
          </section>

          {/* 12. DISPUTE RESOLUTION & CLASS ACTION WAIVER */}
          <section className="bg-[#00F3FF]/5 border border-[#00F3FF]/30 p-8 rounded-xl shadow-inner relative">
            <div className="absolute top-8 right-8 opacity-30"><ShieldCheck size={48} className="text-[#00F3FF]" /></div>
            <h3 className="text-xl md:text-2xl font-black text-[#00F3FF] uppercase tracking-widest mb-4">
              12. Dispute Resolution & Class Action Waiver
            </h3>
            <p className="text-white relative z-10">
              To the maximum extent permitted by applicable law, any dispute arising out of or relating to these Terms shall be brought exclusively in the courts located in Alberta, Canada. YOU AND A.I.C.E. AGREE THAT ALL DISPUTES WILL BE RESOLVED INDIVIDUALLY, AND, TO THE MAXIMUM EXTENT PERMITTED BY LAW, YOU WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION OR REPRESENTATIVE PROCEEDING.
            </p>
          </section>

          {/* 13. MISCELLANEOUS */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">13.</span> Miscellaneous
            </h3>
            <p>
              These Terms constitute the entire agreement between you and A.I.C.E. regarding the subject matter herein and supersede any prior agreements. If any provision of these Terms is found to be unenforceable, that provision will be modified to reflect the parties' intention and the remaining provisions will remain in full force and effect.
              Users may not train, fine-tune, or otherwise use content from this website or the A.I.C.E. platform to create or improve external machine learning models without express written permission. Bulk scraping, crawling, or automated extraction of content for model training is strictly prohibited.
            </p>
          </section>

          {/* 14. EXPORT CONTROL */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">14.</span> Export Control & Sanctions Compliance
            </h3>
            <p>
              Users agree to comply with all applicable export control laws and economic sanctions regulations of Canada and other relevant jurisdictions. The A.I.C.E. platform, software, and related technologies may not be used, exported, re-exported, or transferred to any country, individual, or entity subject to government embargoes or sanctions without proper authorization.
            </p>
          </section>

          {/* 15. MODIFICATION OF TERMS */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="text-[#00F3FF]">15.</span> Modification of Terms
            </h3>
            <p>
              A.I.C.E. Systems Corp. reserves the right to modify or update these Terms of Service at any time. Updated versions will be posted on this page with a revised effective date. Continued use of the website, platform, or associated services after such modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
