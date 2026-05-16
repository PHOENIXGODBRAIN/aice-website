import React, { useEffect } from 'react';
import { AlertTriangle, Activity, Download } from 'lucide-react';

export const AcceptableUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative z-10 pt-28 pb-24 px-6 min-h-screen flex flex-col items-center w-full">
      {/* HEADER */}
      <div className="w-full max-w-5xl mx-auto mb-16 text-center animate-in zoom-in duration-700">
        <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black border-4 border-black mb-8 text-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.4)] animate-[pulse_4s_ease-in-out_infinite]">
          <AlertTriangle size={48} />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-2xl">
          Acceptable Use Policy
        </h1>

        <p className="text-orange-500 font-mono tracking-[0.3em] text-sm uppercase font-bold drop-shadow-md">
          A.I.C.E. PROTOCOL // SYSTEM BOUNDARIES
        </p>

        {/* DOWNLOAD BUTTON */}
        <a
          href="/assets/images/Acceptable use/A.I.C.E. Enterprise AUP.pdf"
          download
          className="mt-6 inline-flex items-center gap-3 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300"
        >
          <Download size={20} />
          Download PDF
        </a>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="w-full max-w-5xl bg-black/80 backdrop-blur-xl border border-orange-500/30 p-8 md:p-14 rounded-3xl text-gray-300 leading-relaxed relative shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-700">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute top-4 right-4 text-orange-500/20"><Activity size={80} /></div>

        <div className="space-y-12 relative z-10 mt-6">

          {/* 1. AUTHORIZED DEPLOYMENTS */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">
              <span className="text-orange-500">1.</span> Authorized Deployments & Purpose
            </h3>
            <p>
              The Deviance Viscosity Stabilizer and A.I.C.E. systems are designed exclusively for algorithmic
              risk mitigation, enterprise infrastructure stabilization, and advanced computational analytics.
              You agree to utilize these services only for lawful, authorized purposes, and strictly in accordance
              with the operational parameters defined in this Acceptable Use Policy (AUP).
            </p>
          </section>

          {/* 2. DEFINITIONS */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">
              <span className="text-orange-500">2.</span> Definitions
            </h3>
            <ul className="space-y-4 pl-6 border-l-2 border-orange-500/50">
              <li><strong className="text-white">Platform:</strong> The A.I.C.E. infrastructure, including all associated models, neural architectures, and interfaces.</li>
              <li><strong className="text-white">Services:</strong> All computational, analytical, and automated outputs provided by the Platform.</li>
              <li><strong className="text-white">User / Operative:</strong> Any individual, entity, or automated system accessing the Platform.</li>
              <li><strong className="text-white">API:</strong> The Application Programming Interface and associated uplink channels provided by A.I.C.E. Systems Corp.</li>
            </ul>
          </section>

          {/* 3. GENERAL PROHIBITED ACTIVITIES */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">
              <span className="text-orange-500">3.</span> General Prohibited Activities
            </h3>
            <ul className="space-y-4 pl-6 border-l-2 border-orange-500/50">
              <li><strong className="text-white">Scraping & Extraction:</strong> Bots, crawlers, or scripts used to extract data or architecture blueprints.</li>
              <li><strong className="text-white">Phishing & Malware:</strong> Deploying malicious code, viruses, or credential‑harvesting mechanisms.</li>
              <li><strong className="text-white">Unauthorized Access:</strong> Attempting to bypass security perimeters or access isolated data structures.</li>
            </ul>
          </section>

          {/* 4. AI & ALGORITHMIC RESTRICTIONS */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">
              <span className="text-orange-500">4.</span> Artificial Intelligence & Algorithmic Restrictions
            </h3>
            <ul className="space-y-4 pl-6 border-l-2 border-orange-500/50">
              <li><strong className="text-white">Reverse Engineering:</strong> No decompiling, deciphering, or extracting model weights or neural pathways.</li>
              <li><strong className="text-white">External Model Training:</strong> A.I.C.E. outputs may not be used to train or fine‑tune external AI systems.</li>
              <li><strong className="text-white">Harmful Automation:</strong> No unlawful content generation, cyber‑attack automation, or unauthorized market manipulation.</li>
            </ul>
          </section>

          {/* 5. API RULES */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">
              <span className="text-orange-500">5.</span> API & Infrastructure Usage Rules
            </h3>
            <ul className="space-y-4 pl-6 border-l-2 border-orange-500/50">
              <li><strong className="text-white">Rate Limiting:</strong> Strict adherence to assigned API limits is required.</li>
              <li><strong className="text-white">Key Integrity:</strong> API keys are non‑transferable and must not be exposed publicly.</li>
              <li><strong className="text-white">Unauthorized Integrations:</strong> No connecting APIs to unvetted or illegal applications.</li>
            </ul>
          </section>

          {/* 6. ILLEGAL FINANCIAL ACTIVITY */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">
              <span className="text-orange-500">6.</span> Prohibition of Illegal & Unauthorized Financial Activity
            </h3>
            <ul className="space-y-4 pl-6 border-l-2 border-orange-500/50">
              <li><strong className="text-white">Financial Intermediation:</strong> No constructing unlicensed money transmission networks.</li>
              <li><strong className="text-white">AML Violations:</strong> No money laundering, sanctions evasion, or obscuring illicit funds.</li>
              <li><strong className="text-white">Fraud:</strong> No identity theft, synthetic identity creation, or financial deception.</li>
            </ul>
          </section>

          {/* 7. CONTENT RESTRICTIONS */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">
              <span className="text-orange-500">7.</span> Content & Data Restrictions
            </h3>
            <ul className="space-y-4 pl-6 border-l-2 border-orange-500/50">
              <li>No uploading copyrighted or proprietary data without authorization.</li>
              <li>No generating material promoting illegal acts, terrorism, or systemic violence.</li>
            </ul>
          </section>

          {/* 8. NETWORK INTEGRITY */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">
              <span className="text-orange-500">8.</span> Network & Infrastructure Integrity
            </h3>
            <ul className="space-y-4 pl-6 border-l-2 border-orange-500/50">
              <li><strong className="text-white">Malicious Telemetry:</strong> No obscuring or facilitating DDoS attacks.</li>
              <li><strong className="text-white">Probing:</strong> No port scanning or unauthorized penetration testing.</li>
              <li><strong className="text-white">Platform Overload:</strong> No intentional load testing or infinite‑loop queries.</li>
            </ul>
          </section>

          {/* 9. SECURITY REQUIREMENTS */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">
              <span className="text-orange-500">9.</span> Security & Access Requirements
            </h3>
            <p>
              Operatives must secure their access nodes, enable MFA where available, use cryptographic‑standard
              passwords, and immediately report any suspected credential breach to A.I.C.E. Systems Corp.
            </p>
          </section>

          {/* 10. ENFORCEMENT */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">
              <span className="text-orange-500">10.</span> Enforcement & Veto
            </h3>
            <ul className="space-y-4 pl-6 border-l-2 border-orange-500/50">
              <li>Immediate severance of uplinks and API key revocation.</li>
              <li>Permanent suspension and termination of accounts.</li>
              <li>Forfeiture of licenses, credits, and refunds.</li>
              <li>Escalation to legal or regulatory authorities with telemetry preservation.</li>
            </ul>
          </section>

          {/* 11. REPORTING VIOLATIONS */}
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">
              <span className="text-orange-500">11.</span> Reporting Violations
            </h3>
            <p>
              To report violations of this AUP, contact: <strong className="text-white">admin@aice.network</strong>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AcceptableUse;
