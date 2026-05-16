import React, { useEffect } from 'react';
import { ShieldCheck, Activity, Scale, Server, Fingerprint, Eye, FileText, AlertTriangle, Database, Lock } from 'lucide-react';

export const AMLPolicy: React.FC = () => {
  // Scroll to top on mount for absolute precision
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative z-10 pt-28 pb-24 px-6 min-h-screen bg-[#000000] text-white selection:bg-[#00F3FF] selection:text-black">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-5xl mx-auto mb-16 text-center animate-in slide-in-from-top-4 duration-700">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-black border border-[#00F3FF]/50 mb-8 text-[#00F3FF] shadow-[0_0_30px_rgba(0,243,255,0.3)]">
          <ShieldCheck size={40} className="animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-lg">
          A.I.C.E. PROTOCOL <br />
          <span className="text-[#00F3FF]">ΑΝΤΙ-MONEY LAUNDERING (AML) POLICY</span>
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-[#00F3FF] font-mono text-xs md:text-sm font-bold uppercase tracking-widest mt-6">
          <span className="bg-[#00F3FF]/10 px-4 py-2 rounded border border-[#00F3FF]/30">
            Effective Date: March 2026
          </span>
          <span className="bg-green-500/10 text-green-500 px-4 py-2 rounded border border-green-500/30">
            Status: REGULATORY ALIGNMENT
          </span>
        </div>
      </div>

      {/* DOCUMENT BODY */}
      <div className="w-full max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-700 delay-200">
        
        {/* SECTION 1: Corporate Identity */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <Server className="text-[#00F3FF]" size={24} /> 1. Corporate Identity and Operations
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
            A.I.C.E. Systems Corp operates aice.network as a dedicated Software-as-a-Service (SaaS) platform. We provide advanced CRM tools, artificial intelligence systems, and network infrastructure. We strictly adhere to global Anti-Money Laundering (AML) standards and prioritize uncompromising compliance across all operational tiers.
          </p>
        </div>

        {/* SECTION 2: Definitions */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <FileText className="text-[#00F3FF]" size={24} /> 2. Definitions
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-6">
            To ensure absolute clarity in our compliance framework, the following terms are defined:
          </p>
          <ul className="space-y-4 font-mono text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00F3FF] mt-1.5 shrink-0" />
              <span><strong className="text-white">Money Laundering:</strong> The process of making illegally-gained proceeds appear legal.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00F3FF] mt-1.5 shrink-0" />
              <span><strong className="text-white">Terrorist Financing:</strong> The provision or collection of funds with the intention that they should be used to carry out acts of terrorism.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00F3FF] mt-1.5 shrink-0" />
              <span><strong className="text-white">Suspicious Activity:</strong> Any transaction, interaction, or platform usage pattern that deviates from normal operational parameters and suggests potential illicit intent.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00F3FF] mt-1.5 shrink-0" />
              <span><strong className="text-white">Client:</strong> Any individual or corporate entity utilizing A.I.C.E. SaaS infrastructure.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00F3FF] mt-1.5 shrink-0" />
              <span><strong className="text-white">Transaction:</strong> The exchange of fiat currency for access to our software, facilitated via third-party gateways.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00F3FF] mt-1.5 shrink-0" />
              <span><strong className="text-white">Reporting Authority:</strong> The relevant national or international financial intelligence and regulatory enforcement bodies.</span>
            </li>
          </ul>
        </div>

        {/* SECTION 3: Financial Flow Isolation */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <Lock className="text-[#00F3FF]" size={24} /> 3. Financial Flow Isolation
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
            A.I.C.E. Systems Corp is strictly a technology provider. To entirely neutralize direct financial risk:
          </p>
          <ul className="space-y-3 font-mono text-sm text-gray-300">
            <li className="flex items-center gap-3"><Lock size={14} className="text-[#00F3FF]" /> We do not custody, hold, or maintain user funds.</li>
            <li className="flex items-center gap-3"><Lock size={14} className="text-[#00F3FF]" /> We do not process peer-to-peer (P2P) transfers within our ecosystem.</li>
            <li className="flex items-center gap-3"><Lock size={14} className="text-[#00F3FF]" /> We do not operate as a digital wallet, cryptocurrency exchange, or financial institution.</li>
          </ul>
        </div>

        {/* SECTION 4: AML Risk Assessment */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <Activity className="text-[#00F3FF]" size={24} /> 4. AML Risk Assessment
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
            Because A.I.C.E. Systems Corp does not hold or process funds directly, our baseline financial AML risk is classified as Low. However, risk exists through the potential misuse of our SaaS platform. We have identified and continuously monitor for the following risk categories:
          </p>
          <ul className="space-y-3 font-mono text-sm text-gray-300">
            <li className="flex items-center gap-3"><AlertTriangle size={14} className="text-orange-500" /> Utilization of AI/CRM infrastructure to facilitate external fraud.</li>
            <li className="flex items-center gap-3"><AlertTriangle size={14} className="text-orange-500" /> Attempted sanctions evasion via masked access to our network.</li>
            <li className="flex items-center gap-3"><AlertTriangle size={14} className="text-orange-500" /> Synthetic identity misuse to bypass geographic restrictions.</li>
          </ul>
        </div>

        {/* SECTION 5: Regulated Processing Partners */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <Scale className="text-[#00F3FF]" size={24} /> 5. Regulated Processing Partners
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed">
            To ensure the highest standard of global financial compliance, all monetary transactions—including subscriptions and software purchases—are processed exclusively through regulated, Tier-1 third-party payment gateways (including Stripe and Gumroad). These partners maintain independent, rigorous adherence to global AML and Know Your Customer (KYC) regulations.
          </p>
        </div>

        {/* SECTION 6: Customer Due Diligence */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <Fingerprint className="text-[#00F3FF]" size={24} /> 6. Customer Due Diligence (CDD)
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed">
            While A.I.C.E. Systems Corp relies on its regulated payment processing partners (e.g., Stripe, Gumroad) to perform primary KYC verifications during the transaction phase, we maintain ultimate authority over our network infrastructure. If suspicious activity is detected within our platform, A.I.C.E. Systems Corp reserves the immediate right to request additional identification or corporate verification from the Client to ensure compliance.
          </p>
        </div>

        {/* SECTION 7: Ongoing Monitoring */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <Eye className="text-[#00F3FF]" size={24} /> 7. Ongoing Monitoring
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
            We employ a continuous, multi-layered approach to detect anomalies and unauthorized activities:
          </p>
          <ul className="space-y-4 font-mono text-sm text-gray-300">
            <li><strong className="text-white">Telemetry Monitoring:</strong> Continuous analysis of user origin, velocity, and session data.</li>
            <li><strong className="text-white">API Usage Anomalies:</strong> Tracking abnormal data requests that may indicate systemic abuse.</li>
            <li><strong className="text-white">Automated Flags:</strong> Algorithmic detection of high-risk IP addresses or VPN configurations known for illicit activities.</li>
            <li><strong className="text-white">Manual Review:</strong> Escalation of automated flags to our compliance team for deep analytical review.</li>
          </ul>
        </div>

        {/* SECTION 8: Sanctions Screening */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <ShieldCheck className="text-[#00F3FF]" size={24} /> 8. Sanctions Screening
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed">
            A.I.C.E. Systems Corp does not conduct business with sanctioned individuals, entities, or jurisdictions. Primary sanctions screening against global lists (OFAC, UN, EU) is executed flawlessly by our payment processors. Should A.I.C.E. Systems Corp discover that an active account is linked to a sanctioned entity through independent network telemetry, the account will be immediately terminated without right of appeal.
          </p>
        </div>

        {/* SECTION 9: Reporting Obligations */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <Activity className="text-[#00F3FF]" size={24} /> 9. Reporting Obligations
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
            We are committed to full transparency with regulatory bodies. In the event of confirmed illicit utilization of our infrastructure:
          </p>
          <ul className="space-y-3 font-mono text-sm text-gray-300">
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> A.I.C.E. Systems Corp will report suspicious activity directly to the relevant authorities.</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> We will fully cooperate with domestic and international law enforcement investigations.</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> We will preserve and isolate all relevant network logs and account data to provide incontrovertible proof to investigative bodies.</li>
          </ul>
        </div>

        {/* SECTION 10: Record-Keeping */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <Database className="text-[#00F3FF]" size={24} /> 10. Record-Keeping
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
            In strict alignment with AML frameworks, A.I.C.E. Systems Corp mandates comprehensive data retention, separate from direct financial ledgers. We securely retain:
          </p>
          <ul className="space-y-3 font-mono text-sm text-gray-300">
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> Network access logs and telemetry data for a minimum of five (5) years.</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> Records of internal suspicious activity reports and investigation outcomes.</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> Associated account metadata and communication logs.</li>
          </ul>
        </div>

        {/* SECTION 11: Employee Training */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <ShieldCheck className="text-[#00F3FF]" size={24} /> 11. Employee Training
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
            The integrity of our network relies on human awareness. All internal personnel, regardless of corporate size, are subjected to:
          </p>
          <ul className="space-y-3 font-mono text-sm text-gray-300">
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> Mandatory annual AML and sanctions evasion training.</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> Briefings on recognizing operational "red flags" within SaaS environments.</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> Clear, direct escalation protocols for immediately reporting suspicious network activity.</li>
          </ul>
        </div>

        {/* SECTION 12: Zero-Tolerance Policy & Enforcement */}
        <div className="bg-gradient-to-br from-[#050505] to-red-950/20 border border-red-500/30 rounded-2xl p-8 md:p-10 hover:border-red-500/60 transition-colors shadow-[0_0_30px_rgba(255,0,0,0.1)]">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={24} /> 12. Zero-Tolerance Policy & Enforcement
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-6 border-l-2 border-red-500 pl-4">
            A.I.C.E. Systems Corp maintains an absolute, zero-tolerance policy regarding illicit financial activities and platform abuse.
          </p>
          <ul className="space-y-6 font-mono text-sm text-gray-300">
            <li>
              <strong className="text-red-500 block mb-1">External Violations:</strong> 
              Any Client account suspected of attempting to utilize our infrastructure to facilitate fraud, money laundering, or sanctions evasion will face immediate, permanent termination.
            </li>
            <li>
              <strong className="text-red-500 block mb-1">Internal Violations:</strong> 
              Any internal personnel found circumventing compliance protocols will face severe disciplinary action, up to and including termination.
            </li>
            <li>
              <strong className="text-red-500 block mb-1">Law Enforcement:</strong> 
              All violations will be meticulously packaged with conclusive evidence and reported to the proper authorities.
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};