import React, { useEffect } from 'react';
import { ShieldCheck, Building2, Briefcase, FileSignature, Activity, FileLock2, Scale, Database, Link as LinkIcon } from 'lucide-react';

export const ComplianceView: React.FC = () => {
  // Ensure the page loads at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans pt-32 pb-24 px-6 relative z-10 selection:bg-[#00F3FF] selection:text-black">
      <div className="max-w-5xl mx-auto bg-[#0a0a0a] border border-gray-800 rounded-lg p-10 md:p-16 shadow-[0_0_50px_rgba(0,243,255,0.05)]">
        
        {/* HEADER & TIMESTAMP */}
        <div className="border-b border-[#00F3FF]/20 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck size={28} className="text-[#00F3FF]" />
              <span className="font-mono text-sm font-bold tracking-[0.2em] uppercase text-[#00F3FF]">
                Regulatory Overview // KYB Data Sheet
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-2">
              A.I.C.E. Systems Corp.
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <h2 className="text-2xl text-gray-400 font-medium">Compliance Briefing</h2>
              <span className="bg-[#00F3FF]/10 text-[#00F3FF] border border-[#00F3FF]/30 px-3 py-1 rounded text-xs font-mono tracking-widest font-bold">
                LAST UPDATED: APRIL 2026
              </span>
            </div>
          </div>
          
          {/* THE PHOENIX LOGO */}
          <div className="hidden md:block shrink-0">
             <img src="/assets/images/aicelogo.png" alt="A.I.C.E. Phoenix Logo" className="w-32 h-auto object-contain opacity-90 transition-all duration-500 hover:opacity-100" />
          </div>
        </div>

        {/* 1. CORPORATE INFORMATION */}
        <section className="mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-[#00F3FF] pl-4 mb-8 flex items-center gap-3">
            <Building2 size={24} className="text-[#00F3FF]" /> 1. Corporate Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-base md:text-lg">
            <div className="bg-black p-6 border border-gray-800 rounded hover:border-[#00F3FF]/30 transition-colors">
              <span className="block text-[#00F3FF]/70 text-xs md:text-sm uppercase tracking-widest mb-2">Legal Entity Name</span>
              <span className="text-white font-bold">A.I.C.E. Systems Corp.</span>
            </div>
            <div className="bg-black p-6 border border-gray-800 rounded hover:border-[#00F3FF]/30 transition-colors">
              <span className="block text-[#00F3FF]/70 text-xs md:text-sm uppercase tracking-widest mb-2">Entity Type & Jurisdiction</span>
              <span className="text-white font-bold">Federal Canadian Corporation</span>
            </div>
            <div className="bg-black p-6 border border-gray-800 rounded hover:border-[#00F3FF]/30 transition-colors">
              <span className="block text-[#00F3FF]/70 text-xs md:text-sm uppercase tracking-widest mb-2">Federal Corp. Number</span>
              <span className="text-white font-bold">1773376-3</span>
              <a href="https://ised-isde.canada.ca/cc/ccc/eng/corp/corporationRegistry" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] text-[#00F3FF] mt-2 hover:text-white transition-colors">
                <LinkIcon size={10} /> Verify via Corporations Canada
              </a>
            </div>
            <div className="bg-black p-6 border border-gray-800 rounded hover:border-[#00F3FF]/30 transition-colors">
              <span className="block text-[#00F3FF]/70 text-xs md:text-sm uppercase tracking-widest mb-2">Director</span>
              <span className="text-white font-bold">Shaun Randal Deeves</span>
            </div>
            <div className="bg-black p-6 border border-gray-800 rounded md:col-span-2 hover:border-[#00F3FF]/30 transition-colors">
              <span className="block text-[#00F3FF]/70 text-xs md:text-sm uppercase tracking-widest mb-2">Registered Office</span>
              <span className="text-white font-bold">200 Edgar Ln, Sherwood Park, Alberta, Canada, T8H 2X6</span>
            </div>
            <div className="bg-black p-6 border border-gray-800 rounded md:col-span-2 hover:border-[#00F3FF]/30 transition-colors flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <span className="block text-[#00F3FF]/70 text-xs md:text-sm uppercase tracking-widest mb-2">Primary Compliance Contact</span>
                <span className="text-[#00F3FF] font-bold">finance@aicesystems.pro</span>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="block text-gray-500 text-[10px] md:text-xs uppercase tracking-widest mb-1">Technical Support</span>
                <span className="text-gray-300">support@aice.network</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. BUSINESS ACTIVITY OVERVIEW */}
        <section className="mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-[#00F3FF] pl-4 mb-6 flex items-center gap-3">
            <Briefcase size={24} className="text-[#00F3FF]" /> 2. Business Activity Overview
          </h3>
          <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-300">
            A.I.C.E. Systems Corp. develops and licenses enterprise software designed to improve the stability, reliability, and operational safety of high-velocity digital systems. The company provides algorithmic tools that monitor data flow, detect anomalies, and mitigate system instability in real time.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-300">
            Our software is used by organizations globally that operate complex digital infrastructure, including enterprise IT, AI model operators, industrial networks, and cybersecurity monitoring. <strong className="text-white bg-[#00F3FF]/10 px-2 py-1 rounded">The company does not provide consumer services and does not operate in retail financial markets.</strong>
          </p>
        </section>

        {/* 3. PRODUCT DESCRIPTION */}
        <section className="mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-[#00F3FF] pl-4 mb-6 flex items-center gap-3">
            <Activity size={24} className="text-[#00F3FF]" /> 3. Product Description
          </h3>
          <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-300">
            A.I.C.E. offers a proprietary enterprise software suite focused on system stability and risk mitigation. The platform includes:
          </p>
          <ul className="list-none space-y-3 text-base md:text-lg text-gray-300 mb-6">
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#00F3FF] rounded-full"></div> Real-time anomaly detection for high-velocity data environments</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#00F3FF] rounded-full"></div> Algorithmic stability controls that reduce operational volatility</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#00F3FF] rounded-full"></div> Enterprise monitoring tools for AI inference systems and automated processes</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#00F3FF] rounded-full"></div> API-based integration for corporate infrastructure and digital networks</li>
          </ul>
        </section>

        {/* 4. REVENUE MODEL & 5. TRANSACTION PROFILE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <section>
            <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-[#00F3FF] pl-4 mb-6">
              4. Revenue Model
            </h3>
            <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-300">
              A.I.C.E. Systems Corp. generates revenue exclusively through business-to-business transactions:
            </p>
            <ul className="list-none space-y-3 text-base md:text-lg text-gray-300 mb-6">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#00F3FF] rounded-full"></div> B2B software licensing agreements</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#00F3FF] rounded-full"></div> API access fees</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#00F3FF] rounded-full"></div> Enterprise deployment contracts</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#00F3FF] rounded-full"></div> Technical integration support</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-[#00F3FF] pl-4 mb-6">
              5. Transaction Profile
            </h3>
            <div className="space-y-6 text-base md:text-lg text-gray-300">
              <div className="bg-black p-4 border border-gray-800 rounded">
                <strong className="text-[#00F3FF] block mb-2 text-sm uppercase tracking-widest font-mono">Business Classification:</strong>
                Enterprise Software / System Stability Tools.
              </div>
              <div className="bg-black p-4 border border-gray-800 rounded">
                <strong className="text-[#00F3FF] block mb-2 text-sm uppercase tracking-widest font-mono">Expected Transaction Types:</strong>
                Enterprise invoicing, B2B wire transfers, and corporate card payments. Low-volume, high-value.
              </div>
            </div>
          </section>
        </div>

        {/* 6. DATA SECURITY & INTELLECTUAL PROPERTY */}
        <section className="mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-[#00F3FF] pl-4 mb-6 flex items-center gap-3">
            <Database size={24} className="text-[#00F3FF]" /> 6. Data Security & IP
          </h3>
          <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-300">
            A.I.C.E. Systems Corp. develops proprietary algorithms and software modules. The company maintains active intellectual property filings, including patent applications related to system stability algorithms and data-flow control mechanisms.
          </p>
          <ul className="list-none space-y-3 text-base md:text-lg text-gray-300 mb-6">
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-[#00F3FF] rounded-full mt-2 shrink-0"></div> All operational data is encrypted in transit and at rest.</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-[#00F3FF] rounded-full mt-2 shrink-0"></div> We do not store customer financial data.</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-[#00F3FF] rounded-full mt-2 shrink-0"></div> Access to core systems is strictly restricted to authorized personnel via secure uplink.</li>
          </ul>
        </section>

        {/* 7. COMPLIANCE AND RISK STATEMENT */}
        <section className="mb-8 bg-[#00F3FF]/5 p-8 rounded-lg border border-[#00F3FF]/20 shadow-inner">
          <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-[#00F3FF] pl-4 mb-6 flex items-center gap-3">
            <Scale size={24} className="text-[#00F3FF]" /> 7. Compliance and Risk Statement
          </h3>
          <p className="text-base md:text-lg leading-relaxed mb-6 text-white font-medium">
            A.I.C.E. Systems Corp. explicitly asserts the following:
          </p>
          <ul className="space-y-5 text-base md:text-lg text-gray-300 font-mono text-sm md:text-base">
            <li className="flex items-start gap-3"><FileLock2 size={20} className="text-[#00F3FF] shrink-0 mt-1" /> A.I.C.E. Systems Corp. does not engage in any regulated financial activity.</li>
            <li className="flex items-start gap-3"><FileLock2 size={20} className="text-[#00F3FF] shrink-0 mt-1" /> We do not hold, transfer, or manage funds on behalf of clients.</li>
            <li className="flex items-start gap-3"><FileLock2 size={20} className="text-[#00F3FF] shrink-0 mt-1" /> Does not provide consumer financial services, marketplaces, or exchanges.</li>
            <li className="flex items-start gap-3"><FileLock2 size={20} className="text-[#00F3FF] shrink-0 mt-1" /> Does not engage in retail cryptocurrency activity or token issuance.</li>
            <li className="flex items-start gap-3"><FileLock2 size={20} className="text-[#00F3FF] shrink-0 mt-1" /> Does not provide lending, remittance, or payment processing services.</li>
          </ul>
          <p className="text-base md:text-lg mt-8 pt-6 border-t border-[#00F3FF]/20 text-white font-bold tracking-wide">
            The company operates exclusively as a B2B enterprise software provider.
          </p>
        </section>

        {/* FINANCIAL COMPLIANCE DECLARATION (THE MASTER ANCHOR) */}
        <div className="w-full mt-8 p-6 border border-[#00F3FF]/30 bg-[#00F3FF]/10 rounded-xl text-[10px] md:text-xs text-gray-300 font-mono leading-relaxed shadow-inner">
            <strong className="text-[#00F3FF] text-sm mb-2 block">FINANCIAL COMPLIANCE DECLARATION:</strong> A.I.C.E. Systems Corp. is exclusively an enterprise Software-as-a-Service (SaaS) provider. We provide autonomous system monitoring and stabilization within defined computational environments. <strong className="text-white">We do not execute trades, move funds, act as a custodian, or interact directly with client financial ledgers.</strong> All licensing transactions are strictly B2B and processed via regulated, third-party Tier-1 payment gateways.
        </div>

      </div>
    </div>
  );
};