import React, { useEffect } from 'react';
import { 
  CreditCard, 
  XCircle, 
  RefreshCcw, 
  Fingerprint,
  Download,
  Terminal,
  ShieldAlert,
  Server,
  Lock,
  Globe,
  Building2
} from 'lucide-react';

export const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative z-10 pt-28 pb-24 px-6 min-h-screen flex flex-col items-center w-full">
      
      {/* HEADER */}
      <div className="w-full max-w-5xl mx-auto mb-16 text-center animate-in zoom-in duration-700">
        <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black border-4 border-black mb-8 text-red-500 shadow-[0_0_50px_rgba(239,68,68,0.4)] animate-[pulse_4s_ease-in-out_infinite]">
          <CreditCard size={48} />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-2xl">
          Refund Policy
        </h1>
        <p className="text-red-500 font-mono tracking-[0.3em] text-sm uppercase font-bold">
          A.I.C.E. SYSTEMS CORP. // FINANCIAL COMPLIANCE MATRIX
        </p>
      </div>

      {/* DOCUMENT BODY */}
      <div className="w-full max-w-5xl bg-black/80 backdrop-blur-xl border border-red-500/30 p-8 md:p-14 rounded-3xl text-gray-300 leading-relaxed relative shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-700">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute top-4 right-4 text-red-500/20"><Fingerprint size={80} /></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/10 pb-4 gap-4 w-full relative z-20">
              <div className="text-red-500 font-mono text-xs tracking-widest uppercase inline-flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  Last Updated: March 2026 // Status: STRICT FINANCIAL GOVERNANCE
              </div>
              <a 
                  href="/assets/images/Refund%20Policy/A.I.C.E.%20Enterprise%20Refund%20Policy.pdf" 
                  download 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:scale-105"
              >
                  <Download size={14} /> Download PDF
              </a>
          </div>

          <div className="space-y-12 relative z-10">
              
              {/* 1. DEFINITIONS */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-red-500">1.</span> Definitions
                  </h3>
                  <p className="mb-4">For the purposes of this Policy, the following terms are defined as follows:</p>
                  <ul className="space-y-3 pl-6 border-l-2 border-red-500/30 text-sm">
                      <li><strong className="text-white">"Digital Goods":</strong> Proprietary literature (including "God's Brain Theory"), datasets, documentation, and any non-tangible data provided by A.I.C.E. Systems Corp.</li>
                      <li><strong className="text-white">"Software License":</strong> The authorized, revocable access granted to the User for A.I.C.E. software infrastructure, including the patented Phoenix DV$ Bot.</li>
                      <li><strong className="text-white">"Subscription":</strong> A recurring billing agreement for continuous access to A.I.C.E. services or updates.</li>
                      <li><strong className="text-white">"Hardware Unit":</strong> Any physical engineering component or air-gapped enclave shipped to the User.</li>
                      <li><strong className="text-white">"User Account":</strong> The digital terminal and dashboard through which the User accesses A.I.C.E. systems.</li>
                  </ul>
              </section>

              {/* 2. DIGITAL GOODS & INTELLECTUAL LITERATURE */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-red-500">2.</span> Digital Goods & Intellectual Literature
                  </h3>
                  <div className="space-y-4">
                      <p>
                          <strong className="text-white uppercase text-sm tracking-widest block mb-1">A. Delivery & Fulfillment:</strong> 
                          Due to the immediate and irreversible delivery of our patented digital knowledge and proprietary information, all sales of Digital Goods are strictly <strong className="text-white">FINAL</strong>. Digital delivery is considered legally complete and fulfilled the exact moment access credentials, download links, or viewing permissions are issued to the User Account.
                      </p>
                      <p>
                          <strong className="text-white uppercase text-sm tracking-widest block mb-1">B. Deemed Acceptance:</strong> 
                          By accessing, downloading, or activating any digital product, the User acknowledges full satisfaction with the product and irrevocably waives any right to request a refund. No refunds will be issued once the digital asset has been accessed.
                      </p>
                  </div>
              </section>

              {/* 3. SOFTWARE LICENSING, EXECUTION TOOLS & PERFORMANCE */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-red-500">3.</span> Software Licensing, Execution Tools & Performance
                  </h3>
                  <p className="mb-6">Access to the Phoenix DV$ Bot and A.I.C.E. software infrastructure is provided on a strict licensing basis. By activating a software instance, you acknowledge and agree to the following terms:</p>
                  <ul className="space-y-6 pl-6 border-l-2 border-red-500/30">
                      <li>
                          <strong className="text-white block mb-1 uppercase text-xs tracking-widest text-red-500"><XCircle size={14} className="inline mr-2"/>A. Cancellation Protocol</strong> 
                          <span>Users may terminate their subscription uplink at any time via the User Dashboard. Cancellation will prevent future billing cycles but does not trigger a refund for the current, active term.</span>
                      </li>
                      <li>
                          <strong className="text-white block mb-1 uppercase text-xs tracking-widest text-red-500"><RefreshCcw size={14} className="inline mr-2"/>B. Prorated Refunds</strong> 
                          <span>Because algorithmic trading tools, patented technologies, and predictive models are deployed instantly upon payment, A.I.C.E. Systems Corp. does not offer prorated refunds for partial months or unused license time.</span>
                      </li>
                      <li>
                          <strong className="text-white block mb-1 uppercase text-xs tracking-widest text-red-500"><Terminal size={14} className="inline mr-2"/>C. No Performance Guarantees</strong> 
                          <span>A.I.C.E. Systems Corp. provides advanced analytical tools but does not guarantee specific market performance, profitability, or financial outcomes. Dissatisfaction with algorithmic trading results does not constitute valid grounds for a refund.</span>
                      </li>
                  </ul>
              </section>

              {/* 4. HARDWARE INFRASTRUCTURE */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-red-500">4.</span> Hardware Infrastructure
                  </h3>
                  <p className="mb-4">Physical A.I.C.E. hardware units are built to rigorous engineering standards and extensively tested prior to shipment.</p>
                  <ul className="space-y-3 pl-6 border-l-2 border-white/10 text-sm">
                      <li><strong className="text-white">A. Returns:</strong> Hardware may only be returned within fourteen (14) days of receipt if the unit is demonstrably defective upon arrival (DOA).</li>
                      <li><strong className="text-white">B. Custom Orders:</strong> Custom-configured hardware, proprietary server builds, or air-gapped enclaves are strictly non-refundable under any circumstances.</li>
                  </ul>
              </section>

              {/* 5. SUBSCRIPTION RENEWAL */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-red-500">5.</span> Subscription Renewal
                  </h3>
                  <p>
                      Certain services operate on a recurring subscription basis. By activating a subscription, the User authorizes automatic renewal billing. Users may cancel renewal at any time via their User Account dashboard. Cancellation prevents future billing but does not retroactively refund payments for the active billing period.
                  </p>
              </section>

              {/* 6. BILLING DISCREPANCIES & AUTHORIZED EXCEPTIONS */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-red-500">6.</span> Billing Discrepancies & Authorized Exceptions
                  </h3>
                  <p className="mb-4">While our no-refund policy is strictly enforced, A.I.C.E. Systems Corp. recognizes the following operational exceptions:</p>
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-sm pl-4">
                      <li>Verified duplicate charges for a single transaction.</li>
                      <li>Accidental double-billing errors caused by the payment processor.</li>
                      <li>Legally verified fraudulent transactions originating outside the User's control.</li>
                  </ol>
                  <p className="text-white font-bold bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                      If you detect an anomaly, you must immediately notify financial compliance at <span className="text-red-500">billing@aice.network</span>. 
                  </p>
              </section>

              {/* 7. CHARGEBACKS, PAYMENT DISPUTES & PROCESSOR COMPLIANCE */}
              <section>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="text-red-500">7.</span> Chargebacks, Payment Disputes & Processor Compliance
                </h3>
                <p className="mb-4">
                  Payments are handled by enterprise third-party processors including, but not limited to, Airwallex. Users agree to comply with the terms of these providers.
                </p>
                <ul className="space-y-4 pl-6 border-l-2 border-red-500/30">
                  <li>
                      <strong className="text-white uppercase text-xs tracking-widest block mb-1 text-red-500">A. Dispute Procedure</strong>
                      Users <strong className="text-white">must</strong> resolve billing concerns directly with A.I.C.E. Systems Corp. support before initiating any dispute with a bank, card network, or payment processor.
                  </li>
                  <li>
                      <strong className="text-white uppercase text-xs tracking-widest block mb-1 text-red-500">B. Penalty for Breach</strong>
                      Initiating a chargeback or payment dispute without first contacting A.I.C.E. constitutes a material breach of this Policy. If a chargeback is initiated for a valid, delivered transaction, A.I.C.E. reserves the right to immediately suspend or permanently terminate access.
                  </li>
                  <li>
                      <strong className="text-white uppercase text-xs tracking-widest block mb-1 text-red-500">C. Liability</strong>
                      Users remain financially liable for outstanding balances, chargeback penalties, processor fees, and legal recovery costs associated with fraudulent or bad-faith disputes. A.I.C.E. Systems Corp. provides comprehensive access logs and delivery verification to payment processors to dispute all invalid chargebacks.
                  </li>
                </ul>
              </section>

              {/* 8. CRYPTOCURRENCY PAYMENTS */}
              <section>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="text-red-500">8.</span> Cryptocurrency Payments
                </h3>
                <div className="space-y-4 text-sm">
                    <p><strong className="text-white">A. Finality:</strong> Cryptocurrency transactions are processed on decentralized blockchain networks and are inherently irreversible. All cryptocurrency payments are considered final once confirmed on the blockchain.</p>
                    <p><strong className="text-white">B. Volatility & Accuracy:</strong> Price volatility of digital assets does not constitute grounds for refunds. Users bear sole responsibility for ensuring correct wallet addresses and network selections. Transactions sent to incorrect addresses cannot be recovered or refunded by A.I.C.E. Systems Corp.</p>
                </div>
              </section>

              {/* 9. FRAUD PREVENTION & UNAUTHORIZED USE */}
              <section>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="text-red-500">9.</span> Fraud Prevention & Unauthorized Use
                </h3>
                <p className="mb-4 font-bold text-white">A.I.C.E. Systems Corp. actively monitors all transactions and system telemetry for fraud.</p>
                <div className="space-y-4 pl-6 border-l-2 border-red-500/30 text-sm">
                    <p><strong className="text-white block uppercase tracking-widest text-xs text-red-500 mb-1"><ShieldAlert size={14} className="inline mr-2"/>A. Unauthorized Use</strong> Any violation of the A.I.C.E. Terms of Service—including unauthorized sharing of access credentials, intellectual property leakage, or attempts to reverse-engineer patented infrastructure—immediately and permanently voids any eligibility for refunds or financial disputes.</p>
                    <p><strong className="text-white block uppercase tracking-widest text-xs text-red-500 mb-1"><Lock size={14} className="inline mr-2"/>B. Cooperation</strong> We reserve the right to fully cooperate with payment processors, financial institutions, and law enforcement in cases of suspected fraud or coordinated chargeback manipulation.</p>
                </div>
              </section>

              {/* 10. CONSUMER PROTECTION & REGULATORY COMPLIANCE */}
              <section>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="text-red-500">10.</span> Consumer Protection & Regulatory Compliance
                </h3>
                <p className="mb-4">
                  This policy complies with applicable digital-goods and e-commerce regulations for enterprise software.
                </p>
                <div className="bg-red-500/5 border border-red-500/20 p-5 rounded text-sm italic">
                    <strong className="text-white not-italic">EU/UK Consumer Rights Disclaimer:</strong> By purchasing and instantly accessing A.I.C.E. Digital Goods and Software Licenses, the User explicitly consents to immediate execution of the contract. Consequently, the User acknowledges that standard EU/UK 14-day "cooling-off" periods do not apply, and the right of withdrawal is forfeited the moment access is granted.
                </div>
              </section>

              {/* 11. JURISDICTION & GOVERNING LAW */}
              <section>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="text-red-500">11.</span> Jurisdiction & Governing Law
                </h3>
                <p>
                  This Refund Policy forms an integral part of, and is strictly incorporated into, the master A.I.C.E. Terms of Service. All financial disputes, chargeback evaluations, and interpretations of this Refund Policy are governed exclusively by the laws of the Province of Alberta, Canada.
                </p>
              </section>

              {/* 12. CORPORATE CONTACT INFORMATION */}
              <section>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="text-red-500">12.</span> Corporate Contact Information
                </h3>
                <p className="mb-4">For all compliance inquiries, formal dispute resolutions, and billing communications:</p>
                <div className="bg-black/60 border border-white/10 p-6 rounded-lg space-y-2 font-mono text-sm">
                    <p className="text-white font-bold text-lg"><Building2 size={18} className="inline mr-2 text-red-500"/> A.I.C.E. Systems Corp.</p>
                    <p>[Insert Legal Corporate Mailing Address]</p>
                    <p>Alberta, Canada</p>
                    <p className="pt-2 mt-2 border-t border-white/10">
                        <strong className="text-red-500">Financial Compliance:</strong> <a href="mailto:billing@aice.network" className="text-white hover:text-red-400 underline">billing@aice.network</a>
                    </p>
                </div>
              </section>

              <div className="mt-16 pt-8 border-t border-red-500/30 text-center">
                  <p className="text-red-500/80 font-mono text-xs uppercase tracking-[0.2em]">
                      Continued use of the platform and initiation of any transaction constitutes absolute acceptance of this binding financial policy.
                  </p>
              </div>

          </div>
      </div>
    </div>
  );
};

export default RefundPolicy;