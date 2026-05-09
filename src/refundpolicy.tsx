import React, { useEffect } from 'react';
import { 
  CreditCard, 
  ShieldAlert, 
  XCircle, 
  TrendingUp, 
  RefreshCcw, 
  ShieldCheck,
  AlertTriangle,
  Lock,
  History,
  UserX,
  Layers,
  Fingerprint,
  Download
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
                  href="/assets/images/Refund%20Policy/Refund_Policy.pdf" 
                  download 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:scale-105"
              >
                  <Download size={14} /> Download PDF
              </a>
          </div>

          <div className="space-y-12 relative z-10">
              
              {/* 1. DIGITAL GOODS */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-red-500">1.</span> Digital Assets & Enterprise Software
                  </h3>
                  <p>Due to the immediate and irreversible delivery of proprietary information and system architecture, all sales of software licenses and digital assets are strictly <strong className="text-white">FINAL</strong>. No refunds will be issued once the digital asset or license has been accessed, deployed, or delivered to the user's terminal.</p>
              </section>

              {/* 2. SOFTWARE */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-red-500">2.</span> Software Licensing & Execution Tools
                  </h3>
                  <p className="mb-6">Access to the A.I.C.E. software infrastructure is provided on a licensing basis. By activating a software instance, you acknowledge the following:</p>
                  <ul className="space-y-6 pl-6 border-l-2 border-red-500/30">
                      <li>
                          <strong className="text-white block mb-1 uppercase text-xs tracking-widest text-red-500"><XCircle size={14} className="inline mr-2"/>A. Cancellation Protocol</strong> 
                          <span>Users may terminate their subscription uplink at any time via the User Dashboard. Cancellation will prevent future billing cycles but does not trigger a refund for the current term.</span>
                      </li>
                      <li>
                          <strong className="text-white block mb-1 uppercase text-xs tracking-widest text-red-500"><RefreshCcw size={14} className="inline mr-2"/>B. Prorated Refunds</strong> 
                          <span>Because proprietary predictive models and software tools are deployed instantly upon payment, A.I.C.E. Systems Corp. does not offer prorated refunds for partial months or unused license time.</span>
                      </li>
                  </ul>
              </section>

              {/* 3. HARDWARE */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-red-500">3.</span> Hardware Infrastructure
                  </h3>
                  <p className="mb-4">Physical A.I.C.E. hardware units are built to rigorous engineering standards and tested prior to shipment.</p>
                  <ul className="space-y-3 pl-6 border-l-2 border-white/10 text-sm">
                      <li><strong className="text-white underline">Returns:</strong> Hardware may only be returned within 14 days if the unit is demonstrably defective upon arrival (DOA).</li>
                      <li><strong className="text-white underline">Custom Orders:</strong> Custom-configured hardware or air-gapped enclaves are non-refundable.</li>
                  </ul>
              </section>

              {/* 4. BILLING & CURRENCY */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-red-500">4.</span> Billing Discrepancies & Currency
                  </h3>
                  <p className="text-white font-bold mb-4">
                      If you detect an unauthorized transaction, gateway processing issue, or billing anomaly, you must immediately notify financial compliance at <span className="text-red-500">billing@aice.network</span>. 
                  </p>
                  <p className="text-red-400 font-mono text-xs uppercase tracking-widest border-l-2 border-red-500/50 pl-4">
                      * All monetary references, transactions, and liability caps are processed and calculated in USD (United States Dollars) unless explicitly stated otherwise.
                  </p>
              </section>

              {/* 5. CHARGEBACKS */}
              <section>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="text-red-500">5.</span> Chargebacks & Payment Disputes
                </h3>
                <p className="mb-4">
                  Initiating a chargeback or payment dispute through a bank, card network, or payment processor without first contacting A.I.C.E. Systems Corp. constitutes a breach of this Refund Policy.
                </p>
                <ul className="space-y-3 pl-6 border-l-2 border-red-500/30 text-sm font-mono uppercase tracking-wider">
                  <li>- Users must contact billing support before initiating any dispute.</li>
                  <li>- If a chargeback is initiated for a valid transaction, A.I.C.E. reserves the right to immediately suspend or permanently terminate access.</li>
                  <li>- Users remain liable for outstanding balances, chargeback penalties, and recovery costs associated with fraudulent disputes.</li>
                </ul>
              </section>

              {/* 6. DIGITAL DELIVERY */}
              <section>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="text-red-500">6.</span> Digital Delivery Acknowledgment
                </h3>
                <p>
                  By purchasing any digital product, dataset, or software license, the user acknowledges that the product is delivered electronically and becomes immediately accessible. Access to proprietary intellectual property is considered fully delivered and fulfilled at the moment access is granted. Digital purchases are not eligible for refunds once delivery or access has occurred.
                </p>
              </section>

              {/* 7. FRAUD PREVENTION */}
              <section>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="text-red-500">7.</span> Fraud Prevention & Abuse Protection
                </h3>
                <p className="mb-4 text-white font-bold">A.I.C.E. Systems Corp. actively monitors transactions for fraud and unauthorized use.</p>
                <ul className="space-y-3 pl-6 border-l-2 border-red-500/30 text-sm">
                  <li>- Coordinated chargeback attempts or use of stolen payment methods will result in immediate termination.</li>
                  <li>- We reserve the right to cooperate with payment processors, financial institutions, and law enforcement in cases of suspected fraud.</li>
                </ul>
              </section>

              {/* 8. SUBSCRIPTION */}
              <section>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="text-red-500">8.</span> Subscription Renewal
                </h3>
                <p>
                  Certain services operate on a recurring subscription basis. By activating a subscription, the user authorizes automatic renewal billing. Users may cancel renewal at any time via the account dashboard. Cancellation prevents future billing but does not retroactively refund payments for the active billing period.
                </p>
              </section>

              {/* 9. PROCESSOR COMPLIANCE */}
              <section>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="text-red-500">9.</span> Payment Processor Compliance
                </h3>
                <p>
                  Payments are handled by third-party processors including, but not limited to, Airwallex and affiliated providers. Users agree to comply with the terms of these providers when completing transactions. Disputes processed outside the A.I.C.E. support channel may result in service termination.
                </p>
              </section>

             {/* 10. POLICY UPDATES & LEGAL INTEGRATION */}
              <section>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="text-red-500">10.</span> Policy Updates & Legal Integration
                </h3>
                <p className="mb-4">
                  A.I.C.E. Systems Corp. reserves the right to modify this Refund Policy at any time to reflect operational or regulatory requirements. Continued use of the platform constitutes acceptance of the revised policy.
                </p>
                <p className="text-white font-bold bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  This Refund Policy forms an integral part of and is strictly incorporated into the master A.I.C.E. Terms of Service.
                </p>
              </section>
          </div>
      </div>
    </div>
  );
};

export default RefundPolicy;