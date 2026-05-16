import React from 'react';

const SecurityCompliance: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 p-8 md:p-16 font-sans">
      <div className="max-w-5xl mx-auto bg-[#111] border border-gray-800 shadow-2xl rounded-lg overflow-hidden">
        
        {/* HEADER SECTION */}
        <div className="border-b border-gray-800 p-8 md:p-12 bg-gradient-to-b from-[#1a1a1a] to-[#111]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                Security & Compliance Overview
              </h1>
              <h2 className="text-xl text-[#00e5ff] font-medium tracking-wide">
                Enterprise Trust, Architecture, and Operational Readiness
              </h2>
              <p className="text-xs text-gray-500 mt-4 uppercase tracking-widest font-mono">
                Confidential & Proprietary | Enterprise Overview
              </p>
            </div>
            
            {/* DOWNLOAD BUTTON */}
            <a 
              href="/assets/images/Security Compliance/AICE_Security  Compliance Overview.pdf" 
              download="AICE_Security_Compliance_Overview.pdf"
              className="inline-flex items-center gap-2 bg-[#00e5ff] hover:bg-[#00b3cc] text-black font-bold py-3 px-6 rounded transition-all duration-300 uppercase text-sm tracking-wider shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="p-8 md:p-12 space-y-12">
          
          {/* Executive Commitment */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-[#ff6600] pl-4">Executive Commitment</h3>
            <p className="leading-relaxed text-gray-400">
              The protection of enterprise data, the resilience of our infrastructure, and the continuous execution of compliance mandates are the foundational pillars of our operations. We operate on a Zero Trust architecture, ensuring that every layer of our ecosystem—from data storage to network transit and access governance—is heavily fortified. This document serves as the definitive overview of our security posture, designed to provide enterprise procurement, IT, and risk management teams with incontrovertible proof of our systemic readiness and operational excellence.
            </p>
          </section>

          {/* 1. Infrastructure & Hosting */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-[#00e5ff] pl-4">1. Infrastructure & Hosting</h3>
            <p className="mb-4 text-gray-400">Our hosting environment is designed for absolute high availability, scalability, and physical security. We utilize top-tier, enterprise-grade cloud providers that maintain the highest global security standards.</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong className="text-gray-200">Isolated Environments:</strong> Production, staging, and development environments are strictly segregated. Data never crosses boundary lines between environments.</li>
              <li><strong className="text-gray-200">Data Localization:</strong> We support strict data residency requirements, ensuring telemetry, logs, and client data remain within designated geographical boundaries to satisfy regional sovereignty laws.</li>
              <li><strong className="text-gray-200">Physical Security:</strong> Our cloud infrastructure partners maintain physical data center security featuring biometric access controls, 24/7 armed security, and multi-factor authentication for all physical entry points.</li>
            </ul>
          </section>

          {/* 2. Data Security & Encryption Model */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-[#00e5ff] pl-4">2. Data Security & Encryption Model</h3>
            <p className="mb-4 text-gray-400">Cryptographic controls are embedded into the core of our platform, ensuring that client data remains inaccessible to unauthorized entities under all circumstances.</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong className="text-gray-200">Encryption at Rest:</strong> All databases, backups, and persistent storage volumes are encrypted using military-grade AES-256 encryption.</li>
              <li><strong className="text-gray-200">Encryption in Transit:</strong> All external and internal network communications are secured via TLS 1.2 and TLS 1.3, ensuring data cannot be intercepted or manipulated during transit.</li>
              <li><strong className="text-gray-200">Key Management:</strong> We employ a decentralized, automated Key Management Service (KMS) with strict, hardware-backed rotation policies. Cryptographic keys are mathematically separated from the data they protect.</li>
            </ul>
          </section>

          {/* 3. Compliance Posture & Certifications */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-[#00e5ff] pl-4">3. Compliance Posture & Certifications</h3>
            <p className="mb-4 text-gray-400">Our regulatory framework is continuously audited and mapped against the most stringent global standards, ensuring seamless integration into your compliance supply chain.</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong className="text-gray-200">Framework Alignment:</strong> Our internal controls are mapped to SOC 2 Type II and ISO 27001 standards, governing security, availability, and confidentiality.</li>
              <li><strong className="text-gray-200">Privacy by Design:</strong> We operate in strict adherence to global privacy mandates, including GDPR and CCPA. Our Data Processing Agreements (DPA) ensure absolute legal alignment for international data transfers.</li>
              <li><strong className="text-gray-200">Financial & AML Readiness:</strong> Where applicable, our systems are equipped to enforce Anti-Money Laundering (AML) checks and maintain the immutable audit trails required by banking and financial sector regulators.</li>
            </ul>
          </section>

          {/* 4. Continuous Monitoring & Telemetry */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-[#00e5ff] pl-4">4. Continuous Monitoring & Telemetry</h3>
            <p className="mb-4 text-gray-400">Security is not static; it requires relentless, real-time oversight. Our monitoring philosophy relies on proactive threat hunting rather than reactive analysis.</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong className="text-gray-200">Centralized SIEM:</strong> All system logs, application telemetry, and access records are aggregated into a secure Security Information and Event Management (SIEM) system.</li>
              <li><strong className="text-gray-200">Immutable Audit Trails:</strong> Every administrative action, API call, and data access request is logged with immutable timestamps. These logs cannot be altered or deleted.</li>
              <li><strong className="text-gray-200">Automated Threat Detection:</strong> Anomalous behavior, unauthorized access attempts, and abnormal data velocity trigger automated alerts and localized system lockdowns instantly.</li>
            </ul>
          </section>

          {/* 5. Incident Response & Threat Neutralization */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-[#00e5ff] pl-4">5. Incident Response & Threat Neutralization</h3>
            <p className="mb-4 text-gray-400">Our Information Security Policy (ISP) and Incident Response Plan (IRP) dictate a rapid, decisive response to any systemic anomaly.</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong className="text-gray-200">Detection & Containment:</strong> Automated systems isolate compromised nodes in milliseconds, preventing lateral movement across the network.</li>
              <li><strong className="text-gray-200">Communication SLAs:</strong> We maintain strict Service Level Agreements (SLAs) for enterprise client notification. In the event of a verified breach, dedicated liaisons provide continuous updates, impact assessments, and mitigation steps.</li>
              <li><strong className="text-gray-200">Post-Mortem Analysis:</strong> Following any critical event, a comprehensive forensic analysis is conducted to map the root cause and permanently engineer the vulnerability out of existence.</li>
            </ul>
          </section>

          {/* 6. Uptime, Reliability, & Disaster Recovery */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-[#00e5ff] pl-4">6. Uptime, Reliability, & Disaster Recovery</h3>
            <p className="mb-4 text-gray-400">Enterprise operations require zero friction and maximum availability. Our architecture is engineered to survive catastrophic hardware failures without degrading the client experience.</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong className="text-gray-200">High Availability (HA):</strong> Systems are deployed across multiple isolated Availability Zones (AZs). Traffic is intelligently routed to maintain a 99.99% Uptime SLA.</li>
              <li><strong className="text-gray-200">Redundancy & Failover:</strong> Core databases operate with real-time replication. In the event of a primary node failure, secondary nodes assume total control in a matter of seconds.</li>
              <li><strong className="text-gray-200">Disaster Recovery (DR):</strong> Automated, encrypted backups are taken continuously and stored in geographically redundant locations. Our Recovery Time Objective (RTO) and Recovery Point Objective (RPO) are aggressively optimized for zero data loss.</li>
            </ul>
          </section>

          {/* 7. Corporate Governance & Access Control */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-[#00e5ff] pl-4">7. Corporate Governance & Access Control</h3>
            <p className="mb-4 text-gray-400">The human element is heavily governed through strict access protocols and technological barriers, enforcing the Principle of Least Privilege.</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong className="text-gray-200">Role-Based Access Control (RBAC):</strong> Access to enterprise data and production environments is granted solely on a strict need-to-know and need-to-execute basis.</li>
              <li><strong className="text-gray-200">Zero Standing Privileges:</strong> Engineers and administrators do not possess permanent access to production environments. Access is granted via Just-In-Time (JIT) provisioning, requiring multi-factor authentication (MFA) and secondary approvals.</li>
              <li><strong className="text-gray-200">Vendor & Supply Chain Risk:</strong> All third-party tools, libraries, and vendors undergo rigorous security evaluations before integration, ensuring no external vector compromises our ecosystem.</li>
            </ul>
          </section>

        </div>

        {/* FOOTER SECTION */}
        <div className="bg-[#1a1a1a] p-8 text-center border-t border-gray-800">
          <p className="text-gray-400 italic max-w-3xl mx-auto">
            For detailed audit reports, penetration testing summaries, or to review our complete suite of compliance policies (ISP, IRP, AML, MSA), please contact our Enterprise Security & Governance Team.
          </p>
        </div>

      </div>
    </div>
  );
};

export default SecurityCompliance;