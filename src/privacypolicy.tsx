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
                  href="/assets/images/Privacy%20Policy/A.I.C.E.%20Enterprise%20Privacy%20Policy.pdf" 
                  download 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-purple-500/10 border border-purple-500/50 text-purple-500 hover:bg-purple-500 hover:text-white transition-all rounded font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:scale-105"
              >
                  <Download size={14} /> Download PDF
              </a>
          </div>

          <div className="space-y-12 relative z-10">
              
              {/* 1. INTRODUCTION & SCOPE */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">1.</span> Introduction & Scope 
                  </h3>
                  <p className="mb-4">A.I.C.E. Systems Corp. ("A.I.C.E.", "we", "us", or "our") operates under a strict principle of data minimization and information sovereignty. Our architecture is designed to monitor system entropy and hardware telemetry, not personal identities.</p>
                  <p className="mb-4">However, to facilitate secure access, maintain active software licenses, and comply with global privacy frameworks, we collect and process specific categories of data. This Privacy Policy outlines our procedures regarding the collection, use, processing, and protection of your Personal Data in compliance with the General Data Protection Regulation (GDPR), the Personal Information Protection and Electronic Documents Act (PIPEDA), and the California Privacy Rights Act (CPRA).</p>
                  <p>This policy applies to all operatives, enterprise clients, and visitors utilizing the A.I.C.E. network, software interfaces, and associated infrastructure.</p>
              </section>

              {/* 2. DATA CONTROLLER INFO */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">2.</span> Data Controller Information
                  </h3>
                  <div className="bg-white/5 border border-white/10 p-5 rounded-xl border-l-2 border-purple-500 mb-4">
                      <p className="text-sm font-mono text-gray-300">
                          <strong className="text-white block uppercase text-xs tracking-widest mb-2">A.I.C.E. Systems Corp.</strong>
                          Jurisdiction: Province of Alberta, Canada<br/>
                          Compliance Contact: privacy@aicesystems.pro (cc: privacy@aice.network)
                      </p>
                  </div>
                  <p className="text-xs text-purple-400 font-mono uppercase tracking-widest">
                      * Note: For inquiries requiring formal legal correspondence, requests must be routed through the secure compliance channels listed in Section 19.
                  </p>
              </section>

              {/* 3. CATEGORIES OF DATA */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">3.</span> Categories of Personal Data Collected
                  </h3>
                  <p className="mb-4">We collect the minimum data necessary to authenticate access and ensure system stability. Categories of Personal Data include:</p>
                  <ul className="space-y-4 text-sm">
                      <li className="bg-black/40 p-4 rounded border border-white/5"><strong className="text-purple-500 uppercase tracking-wider block mb-1">Account & Authentication Data</strong> Email addresses, encrypted passwords, cryptographic access codes, and multi-factor authentication (MFA) tokens.</li>
                      <li className="bg-black/40 p-4 rounded border border-white/5"><strong className="text-purple-500 uppercase tracking-wider block mb-1">Payment & Financial Metadata</strong> Billing addresses, transaction receipts, and payment gateway identifiers. *Full credit card numbers are processed by our PCI-compliant third-party providers and never touch A.I.C.E. servers.*</li>
                      <li className="bg-black/40 p-4 rounded border border-white/5"><strong className="text-purple-500 uppercase tracking-wider block mb-1">Operational Telemetry & Device Info</strong> Hardware signatures, latency metrics, entropy spikes, execution speeds, and anonymized IP addresses utilized for rate-limiting and DDoS prevention.</li>
                      <li className="bg-black/40 p-4 rounded border border-white/5"><strong className="text-purple-500 uppercase tracking-wider block mb-1">Communication Data</strong> Records of compliance requests, support tickets, and legal inquiries sent to our official channels.</li>
                  </ul>
              </section>

              {/* 4. HOW DATA IS COLLECTED */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">4.</span> How Data Is Collected
                  </h3>
                  <ul className="space-y-3 pl-6 border-l-2 border-purple-500/30 text-sm">
                      <li><strong className="text-white">Direct Input:</strong> Information provided directly by you during registration, license acquisition, or support requests.</li>
                      <li><strong className="text-white">Automated Telemetry:</strong> System-level data collected automatically via operational protocols when interacting with the A.I.C.E. grid.</li>
                      <li><strong className="text-white">Third-Party Processors:</strong> Transaction confirmations securely transmitted from payment processors (e.g., Stripe, Airwallex, Blockchain gateways).</li>
                  </ul>
              </section>

              {/* 5. LEGAL BASES */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">5.</span> Purposes & Legal Bases for Processing
                  </h3>
                  <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                          <thead>
                              <tr className="border-b border-purple-500/30 text-purple-500 uppercase tracking-wider text-xs">
                                  <th className="py-3 px-4">Purpose of Processing</th>
                                  <th className="py-3 px-4">Category of Data</th>
                                  <th className="py-3 px-4">Legal Basis</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10 bg-white/5">
                              <tr>
                                  <td className="py-3 px-4 font-bold text-white">Account Creation & Licensing</td>
                                  <td className="py-3 px-4 text-gray-300">Authentication Data</td>
                                  <td className="py-3 px-4 text-gray-400 font-mono">Contract Performance</td>
                              </tr>
                              <tr>
                                  <td className="py-3 px-4 font-bold text-white">Payment Processing</td>
                                  <td className="py-3 px-4 text-gray-300">Payment Metadata</td>
                                  <td className="py-3 px-4 text-gray-400 font-mono">Contract Performance</td>
                              </tr>
                              <tr>
                                  <td className="py-3 px-4 font-bold text-white">Security & Threat Mitigation</td>
                                  <td className="py-3 px-4 text-gray-300">Telemetry, IP Addresses</td>
                                  <td className="py-3 px-4 text-gray-400 font-mono">Legitimate Interest</td>
                              </tr>
                              <tr>
                                  <td className="py-3 px-4 font-bold text-white">Operational Audits & Bugs</td>
                                  <td className="py-3 px-4 text-gray-300">Telemetry, Device Info</td>
                                  <td className="py-3 px-4 text-gray-400 font-mono">Legitimate Interest</td>
                              </tr>
                              <tr>
                                  <td className="py-3 px-4 font-bold text-white">Compliance & Subpoenas</td>
                                  <td className="py-3 px-4 text-gray-300">All applicable categories</td>
                                  <td className="py-3 px-4 text-gray-400 font-mono">Legal Obligation</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </section>

              {/* 6. COOKIES */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">6.</span> Cookies & Local Storage
                  </h3>
                  <p className="mb-6">We utilize highly restricted local storage and encrypted session tokens to maintain authentication states across the grid. We do not deploy third-party advertising trackers or cross-site surveillance scripts.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-black/50 border border-white/10 p-4 rounded text-sm">
                          <strong className="text-purple-500 block mb-1">Authentication</strong>
                          <p className="text-gray-400 text-xs mb-2">Session management & grid access</p>
                          <span className="text-white font-mono text-xs bg-white/10 px-2 py-1 rounded">24 Hours / Session</span>
                      </div>
                      <div className="bg-black/50 border border-white/10 p-4 rounded text-sm">
                          <strong className="text-purple-500 block mb-1">Security</strong>
                          <p className="text-gray-400 text-xs mb-2">Rate-limiting & fraud prevention</p>
                          <span className="text-white font-mono text-xs bg-white/10 px-2 py-1 rounded">30 Days</span>
                      </div>
                      <div className="bg-black/50 border border-white/10 p-4 rounded text-sm">
                          <strong className="text-purple-500 block mb-1">Preferences</strong>
                          <p className="text-gray-400 text-xs mb-2">User interface configurations</p>
                          <span className="text-white font-mono text-xs bg-white/10 px-2 py-1 rounded">90 Days</span>
                      </div>
                  </div>
                  <p className="text-xs text-gray-500 font-mono uppercase">
                      * Do Not Track (DNT): The A.I.C.E. platform does not respond to browser DNT signals, as internal tracking is strictly limited to essential security.
                  </p>
              </section>

              {/* 7. ANALYTICS & TELEMETRY */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">7.</span> Analytics & Telemetry
                  </h3>
                  <p>Operational telemetry is collected exclusively to calculate impedance parameters, optimize routing, and prevent system crashes. This machine-level data is anonymized at the point of ingestion and decoupled from identity markers wherever technically feasible.</p>
              </section>

              {/* 8. SUBPROCESSORS */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">8.</span> Subprocessors & Vendors
                  </h3>
                  <p className="mb-4">A.I.C.E. does not and will never sell your data. Data transmission to external nodes only occurs to facilitate enterprise operations. We utilize the following categories of verified subprocessors:</p>
                  <ul className="space-y-2 pl-6 list-disc list-outside text-sm text-gray-300">
                      <li><strong className="text-white">Cloud Infrastructure:</strong> AWS / Cloudflare (Hosting, CDN, DDoS protection).</li>
                      <li><strong className="text-white">Payment Gateways:</strong> Stripe, Airwallex, Blockchain nodes (Transaction clearing).</li>
                      <li><strong className="text-white">Communication Infrastructure:</strong> Encrypted email routing providers.</li>
                  </ul>
              </section>

              {/* 9. INTERNATIONAL TRANSFERS */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">9.</span> International Data Transfers
                  </h3>
                  <p>A.I.C.E. operates globally. Your data may be transferred to, and processed in, jurisdictions outside of your country of residence (including Canada and the United States). For transfers originating from the EU/EEA or the UK, we implement Standard Contractual Clauses (SCCs) and enforce end-to-end encryption to ensure a level of protection equivalent to GDPR mandates.</p>
              </section>

              {/* 10. RETENTION */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">10.</span> Data Retention
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <li className="bg-white/5 p-4 rounded border-l-2 border-purple-500"><strong className="text-white block mb-1">Active Accounts</strong>Retained for the duration of the active license or operational state.</li>
                      <li className="bg-white/5 p-4 rounded border-l-2 border-purple-500"><strong className="text-white block mb-1">Telemetry Logs</strong>Routinely overwritten or cryptographically destroyed after 90 days.</li>
                      <li className="bg-white/5 p-4 rounded border-l-2 border-purple-500"><strong className="text-white block mb-1">Financial Records</strong>Retained for 7 years to comply with international tax obligations.</li>
                      <li className="bg-white/5 p-4 rounded border-l-2 border-purple-500"><strong className="text-white block mb-1">Deleted Accounts</strong>Erased within 30 days of a valid termination request (excluding legal holds).</li>
                  </ul>
              </section>

              {/* 11. SECURITY */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">11.</span> Security Measures
                  </h3>
                  <p className="mb-4">Our infrastructure employs military-grade cryptographic safeguards to protect your operational footprint:</p>
                  <div className="flex flex-wrap gap-3 text-xs font-mono">
                      <span className="bg-purple-500/20 text-purple-400 px-3 py-2 rounded border border-purple-500/30">TLS 1.3 IN-TRANSIT</span>
                      <span className="bg-purple-500/20 text-purple-400 px-3 py-2 rounded border border-purple-500/30">AES-256 AT REST</span>
                      <span className="bg-purple-500/20 text-purple-400 px-3 py-2 rounded border border-purple-500/30">ZERO-TRUST ARCHITECTURE</span>
                      <span className="bg-purple-500/20 text-purple-400 px-3 py-2 rounded border border-purple-500/30">MFA ENFORCED</span>
                  </div>
              </section>

              {/* 12. AUTOMATED DECISIONS */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">12.</span> Automated Decision-Making
                  </h3>
                  <p>A.I.C.E. Systems Corp. does not subject operatives to decisions based solely on automated processing—including profiling—that produces legal effects or similarly significant impacts without human oversight.</p>
              </section>

              {/* 13. BREACH NOTIFICATION */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">13.</span> Breach Notification
                  </h3>
                  <p>In the event of an operational privacy breach compromising Personal Data, A.I.C.E. will initiate our Incident Response Plan. We will notify the applicable regulatory authorities within 72 hours of discovering the breach and notify affected operatives without undue delay, providing mitigation steps and risk assessments.</p>
              </section>

              {/* 14. DATA SUBJECT RIGHTS */}
              <section className="bg-purple-500/5 border border-purple-500/30 p-8 rounded-xl shadow-inner relative">
                  <div className="absolute top-8 right-8 opacity-30"><FileKey size={48} className="text-purple-500" /></div>
                  <h3 className="text-xl md:text-2xl font-black text-purple-500 uppercase tracking-widest mb-4">
                      14. Data Subject Rights
                  </h3>
                  <p className="text-white mb-6 relative z-10">As a registered operative, you maintain absolute sovereignty over your identity markers. Subject to identity verification, you possess the right to:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm font-mono relative z-10 text-gray-300">
                      <li className="flex items-start gap-2"><span className="text-purple-500">►</span> <span><strong className="text-white">Access:</strong> Demand a full export of your matrix.</span></li>
                      <li className="flex items-start gap-2"><span className="text-purple-500">►</span> <span><strong className="text-white">Rectification:</strong> Correct inaccurate data.</span></li>
                      <li className="flex items-start gap-2"><span className="text-purple-500">►</span> <span><strong className="text-white">Erasure:</strong> Cryptographic erasure of your profile.</span></li>
                      <li className="flex items-start gap-2"><span className="text-purple-500">►</span> <span><strong className="text-white">Restriction:</strong> Halt data processing.</span></li>
                      <li className="flex items-start gap-2"><span className="text-purple-500">►</span> <span><strong className="text-white">Portability:</strong> Receive machine-readable data.</span></li>
                      <li className="flex items-start gap-2"><span className="text-purple-500">►</span> <span><strong className="text-white">Objection:</strong> Opt-out of non-critical comms.</span></li>
                  </ul>
              </section>

              {/* 15. JURISDICTION RIGHTS */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">15.</span> Jurisdiction-Specific Rights
                  </h3>
                  <div className="space-y-4 text-sm text-gray-300">
                      <div className="bg-white/5 p-4 rounded border border-white/10">
                          <strong className="text-white block mb-1">A. European Union (GDPR) / UK</strong>
                          Residents of the EEA and UK have the right to lodge a formal complaint with their respective supervisory authority if they believe A.I.C.E. has violated data protection laws.
                      </div>
                      <div className="bg-white/5 p-4 rounded border border-white/10">
                          <strong className="text-white block mb-1">B. California Privacy Rights Act (CPRA)</strong>
                          California residents have the right to know what personal information is collected, request deletion, and opt-out of the sale/sharing of personal info. *A.I.C.E. does not sell or share personal info for behavioral advertising.*
                      </div>
                      <div className="bg-white/5 p-4 rounded border border-white/10">
                          <strong className="text-white block mb-1">C. Canada (PIPEDA)</strong>
                          Canadian residents have the right to request access to their personal information and request corrections. This policy is governed by the laws of Canada and the Province of Alberta.
                      </div>
                  </div>
              </section>

              {/* 16. LEGAL REQUESTS */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">16.</span> Government & Legal Requests
                  </h3>
                  <p>A.I.C.E. adheres to a strict protocol regarding external legal inquiries. We will only disclose information when explicitly demanded by a verified, legally binding subpoena or court order from a competent judicial authority. We evaluate all requests for validity and will challenge overbroad requests. Disclosure will be limited to the absolute minimum necessary.</p>
              </section>

              {/* 17. CHILDREN'S PRIVACY */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">17.</span> Children's Privacy
                  </h3>
                  <p>A.I.C.E. infrastructure is built for enterprise and advanced operational use. We do not knowingly collect or solicit data from individuals under the age of 16. If we detect that a minor has provisioned an account, the data matrix will be instantly and permanently deleted.</p>
              </section>

              {/* 18. CHANGES TO POLICY */}
              <section>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                      <span className="text-purple-500">18.</span> Changes to This Policy
                  </h3>
                  <p>As system architecture evolves, we may update this Privacy Policy. Any material changes will be communicated via your registered encrypted email channel or via a direct network broadcast upon authentication. The "Effective Date" at the top of this document reflects the latest revision.</p>
              </section>

              {/* 19. CONTACT */}
              <section className="bg-[#050505] border-t-2 border-purple-500/50 pt-8 mt-12 relative">
                  <div className="absolute top-8 right-0 opacity-10"><Scale size={64} className="text-purple-500" /></div>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3 relative z-10">
                      <span className="text-purple-500">19.</span> Contact & Compliance Execution
                  </h3>
                  <p className="mb-4 relative z-10">
                      To exercise your rights, demand cryptographic erasure, or report an anomaly, transmit your request to the Compliance Infrastructure. Identity verification will be required prior to execution.
                  </p>
                  <ul className="space-y-3 text-sm font-mono bg-black/50 p-6 rounded-xl border border-white/10 relative z-10">
                      <li className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4"><strong className="text-purple-500">Primary Node:</strong> <a href="mailto:privacy@aicesystems.pro" className="hover:text-white transition-colors text-gray-300">privacy@aicesystems.pro</a></li>
                      <li className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4"><strong className="text-purple-500">Secondary Routing:</strong> <span className="text-gray-300">privacy@aice.network / privacy@aiprotocol.pro</span></li>
                      <li className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-4 border-t border-white/10 pt-4"><strong className="text-purple-500">Corporate Entity:</strong> <span className="text-gray-300">A.I.C.E. Systems Corp.</span></li>
                      <li className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4"><strong className="text-purple-500">Jurisdiction:</strong> <span className="text-gray-300">Province of Alberta, Canada</span></li>
                  </ul>
              </section>

          </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;