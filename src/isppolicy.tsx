import React, { useEffect } from 'react';
import { 
  ShieldCheck, Lock, Database, Server, Code, Activity, 
  Users, UserCheck, RefreshCw, Scale, AlertTriangle, 
  FileClock, Network, Crosshair 
} from 'lucide-react';

export const ISPPolicy: React.FC = () => {
  // Enforce zero-scroll deviation on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative z-10 pt-28 pb-24 px-6 min-h-screen bg-[#000000] text-white selection:bg-[#00F3FF] selection:text-black">
      
      {/* HEADER COMPONENT */}
      <div className="w-full max-w-5xl mx-auto mb-16 text-center animate-in slide-in-from-top-4 duration-700">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-black border border-[#00F3FF]/50 mb-8 text-[#00F3FF] shadow-[0_0_30px_rgba(0,243,255,0.3)]">
          <ShieldCheck size={40} className="animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-lg">
          A.I.C.E. SYSTEMS CORP. <br />
          <span className="text-[#00F3FF]">INFORMATION SECURITY POLICY v1.0</span>
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-[#00F3FF] font-mono text-xs md:text-sm font-bold uppercase tracking-widest mt-6">
          <span className="bg-[#00F3FF]/10 px-4 py-2 rounded border border-[#00F3FF]/30">
            Effective Date: May 13, 2026
          </span>
          <span className="bg-orange-500/10 text-orange-500 px-4 py-2 rounded border border-orange-500/30">
            Classification: INTERNAL / CONFIDENTIAL
          </span>
        </div>
      </div>

      {/* DOCUMENT ARCHITECTURE */}
      <div className="w-full max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-700 delay-200">
        
        {/* 1. Purpose */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <Crosshair className="text-[#00F3FF]" size={24} /> 1. Purpose
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
            This Information Security Policy (ISP) defines the corporate commitment of A.I.C.E. Systems Corp. to maintaining the highest standards of cybersecurity governance. The purpose of this framework is to safeguard the confidentiality, integrity, and availability (the CIA triad) of all corporate assets.
          </p>
          <p className="text-gray-300 font-mono text-sm leading-relaxed">
            This document establishes the mandatory baseline for the protection of client systems, proprietary algorithms, patented intellectual property, and secure infrastructure management. It ensures operational resilience, continuous risk reduction, and alignment with prevailing legal and regulatory frameworks.
          </p>
        </div>

        {/* 2. Scope */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <Network className="text-[#00F3FF]" size={24} /> 2. Scope
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-6">
            This policy applies universally to all entities, systems, and personnel interacting with A.I.C.E. Systems Corp. assets. The scope encompasses:
          </p>
          <ul className="space-y-3 font-mono text-sm text-gray-300">
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> Employees, contractors, and subprocessors.</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> Cloud infrastructure systems (including but not limited to AWS, Cloudflare, and Google Workspace).</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> Application Programming Interfaces (APIs) and telemetry systems.</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> Endpoints, company-issued devices, and development environments (including GitHub).</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> Third-party providers and payment processing systems (e.g., Stripe).</li>
          </ul>
        </div>

        {/* 3. Security Principles */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <ShieldCheck className="text-[#00F3FF]" size={24} /> 3. Security Principles
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-6">
            The security posture of A.I.C.E. Systems Corp. is governed by the following core doctrines:
          </p>
          <ul className="space-y-4 font-mono text-sm text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <li><strong className="text-white">Least Privilege:</strong> Access rights are restricted to the minimum permissions required.</li>
            <li><strong className="text-white">Need-to-Know:</strong> Information is disclosed only to personnel requiring it.</li>
            <li><strong className="text-white">Zero Trust Architecture:</strong> No user, system, or network is trusted by default.</li>
            <li><strong className="text-white">Defense in Depth:</strong> Multiple, redundant defensive mechanisms are deployed.</li>
            <li><strong className="text-white">Encryption by Default:</strong> Data is cryptographically protected across all states.</li>
            <li><strong className="text-white">Secure-by-Design:</strong> Controls are embedded natively within the SDLC.</li>
            <li><strong className="text-white">Continuous Monitoring:</strong> Real-time oversight to detect anomalous activity.</li>
            <li><strong className="text-white">Incident Preparedness:</strong> Proactive readiness to detect, mitigate, and recover.</li>
          </ul>
        </div>

        {/* 4. Access Control Policy */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <Lock className="text-[#00F3FF]" size={24} /> 4. Access Control Policy
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-6">
            Strict access controls are enforced across all corporate systems to prevent unauthorized access.
          </p>
          <ul className="space-y-4 font-mono text-sm text-gray-300">
            <li><strong className="text-white">Multi-Factor Authentication (MFA):</strong> Mandatory for all internal, external, and administrative access points.</li>
            <li><strong className="text-white">Role-Based Access Control (RBAC):</strong> Permissions are granted strictly based on organizational roles.</li>
            <li><strong className="text-white">Credential Management:</strong> Regular credential rotation is enforced. The use of approved enterprise password managers is mandatory.</li>
            <li><strong className="text-white">Shared Credentials:</strong> The sharing of account credentials is strictly prohibited.</li>
            <li><strong className="text-white">Administrative Access:</strong> Privileged access is heavily restricted, logged in its entirety, and subject to continuous audit.</li>
            <li><strong className="text-white">Session Management:</strong> Strict session timeout standards are enforced.</li>
            <li><strong className="text-white">Access Revocation:</strong> Immediate revocation executed upon personnel termination.</li>
          </ul>
        </div>

        {/* 5. Data Protection Standards */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <Database className="text-[#00F3FF]" size={24} /> 5. Data Protection Standards
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-6">
            A.I.C.E. Systems Corp. mandates rigorous data protection standards aligning with applicable DPAs and SOWs.
          </p>
          <ul className="space-y-4 font-mono text-sm text-gray-300">
            <li><strong className="text-[#00F3FF]">Encryption in Transit:</strong> All data must utilize TLS 1.3 or higher.</li>
            <li><strong className="text-[#00F3FF]">Encryption at Rest:</strong> All stored data must be encrypted utilizing AES-256 standards.</li>
            <li><strong className="text-[#00F3FF]">Data Segmentation:</strong> Client data and corporate environments are strictly segmented. Zero tolerance for unauthorized co-mingling.</li>
            <li><strong className="text-[#00F3FF]">Data Lifecycle:</strong> Strict adherence to retention, backups, and secure deletion.</li>
            <li><strong className="text-[#00F3FF]">Access Limitation:</strong> Personnel are granted minimum necessary access.</li>
          </ul>
        </div>

        {/* 6. Infrastructure Security */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <Server className="text-[#00F3FF]" size={24} /> 6. Infrastructure Security
          </h2>
          <ul className="space-y-4 font-mono text-sm text-gray-300">
            <li><strong className="text-white">Network Defense:</strong> Cloud firewalling and automated DDoS mitigation protocols.</li>
            <li><strong className="text-white">Server Configuration:</strong> Hardened according to stringent enterprise baselines.</li>
            <li><strong className="text-white">Endpoint Security:</strong> Continuous endpoint monitoring and threat detection.</li>
            <li><strong className="text-white">API Security:</strong> Strict authentication, authorization, and rate-limiting.</li>
            <li><strong className="text-white">Environment Separation:</strong> Production, staging, and development are physically/logically isolated.</li>
            <li><strong className="text-white">Vulnerability Management:</strong> Continuous scanning and automated patch lifecycles.</li>
          </ul>
        </div>

        {/* 7. Secure Development Lifecycle */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <Code className="text-[#00F3FF]" size={24} /> 7. Secure Development Lifecycle (SDLC)
          </h2>
          <ul className="space-y-3 font-mono text-sm text-gray-300">
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> Mandatory use of Git version control with protected branches.</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> Mandatory peer code review and security testing prior to deployment.</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> Automated scanning and management of all third-party code dependencies.</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> Staging validation, formal change approvals, and rollback procedures.</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF]" /> Comprehensive logging and monitoring integrated natively.</li>
          </ul>
        </div>

        {/* 8. Incident Response Plan */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <Activity className="text-[#00F3FF]" size={24} /> 8. Incident Response Plan
          </h2>
          <ul className="space-y-4 font-mono text-sm text-gray-300">
            <li><strong className="text-white">Phases of Response:</strong> Structured protocols for Detection, Containment, Mitigation, and Recovery.</li>
            <li><strong className="text-white">Analysis:</strong> Mandatory post-incident root cause analysis.</li>
            <li><strong className="text-white">Escalation:</strong> Clearly defined security escalation paths for leadership involvement.</li>
            <li><strong className="text-white">Evidence & Notification:</strong> Strict procedures for evidence preservation and regulatory/client notification timelines.</li>
          </ul>
        </div>

        {/* 9 & 10. Vendors & Employees */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
              <Users className="text-[#00F3FF]" size={20} /> 9. Subprocessors
            </h2>
            <ul className="space-y-3 font-mono text-sm text-gray-300">
              <li>Rigorous security evaluation prior to onboarding.</li>
              <li>Maintenance of an exclusive, approved provider list.</li>
              <li>Binding contractual security obligations.</li>
              <li>Continuous monitoring of subprocessor compliance.</li>
            </ul>
          </div>
          <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
              <UserCheck className="text-[#00F3FF]" size={20} /> 10. Personnel
            </h2>
            <ul className="space-y-3 font-mono text-sm text-gray-300">
              <li>Mandatory phishing and security awareness training.</li>
              <li>Absolute adherence to data confidentiality.</li>
              <li>Strict clean desk/device practices and reporting.</li>
              <li>Prohibition against bypassing controls or unauthorized software.</li>
            </ul>
          </div>
        </div>

        {/* 11 & 12. BCDR & Compliance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
              <RefreshCw className="text-[#00F3FF]" size={20} /> 11. BCDR
            </h2>
            <ul className="space-y-3 font-mono text-sm text-gray-300">
              <li>High-availability redundancy and load distribution.</li>
              <li>Automated, immutable, encrypted backups tested regularly.</li>
              <li>Service restoration protocols designed to minimize MTTR.</li>
            </ul>
          </div>
          <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
              <Scale className="text-[#00F3FF]" size={20} /> 12. Compliance
            </h2>
            <ul className="space-y-3 font-mono text-sm text-gray-300">
              <li>Alignment with GDPR, PIPEDA, and Canadian privacy laws.</li>
              <li>Adherence to relevant AML obligations.</li>
              <li>Strict compliance with client MSAs and DPAs.</li>
            </ul>
          </div>
        </div>

        {/* 13. Enforcement & Exceptions */}
        <div className="bg-gradient-to-br from-[#050505] to-red-950/20 border border-red-500/30 rounded-2xl p-8 md:p-10 hover:border-red-500/60 transition-colors shadow-[0_0_30px_rgba(255,0,0,0.1)]">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={24} /> 13. Enforcement & Exceptions
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-6 border-l-2 border-red-500 pl-4">
            Adherence to this policy is mandatory. Violations will be treated with maximum severity.
          </p>
          <ul className="space-y-4 font-mono text-sm text-gray-300">
            <li><strong className="text-red-500">Immediate Action:</strong> Revocation of all system access.</li>
            <li><strong className="text-red-500">Disciplinary:</strong> Formal action up to and including termination.</li>
            <li><strong className="text-red-500">Legal:</strong> Escalation and potential civil or criminal prosecution.</li>
            <li className="pt-4 border-t border-red-500/20"><strong className="text-white">Exceptions:</strong> Must be formally documented, risk-assessed, and explicitly approved by the Office of the Director prior to execution.</li>
          </ul>
        </div>

        {/* 14. Policy Review */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00F3FF]/40 transition-colors shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-3">
              <FileClock className="text-[#00F3FF]" size={20} /> 14. Policy Lifecycle
            </h2>
            <p className="text-gray-400 font-mono text-sm">
              Reviewed annually. Out-of-cycle reviews mandated post-incident. All iterations are version-controlled and require executive approval.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};