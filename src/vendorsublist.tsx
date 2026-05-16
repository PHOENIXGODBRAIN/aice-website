import React, { useEffect } from 'react';
import { ShieldCheck, Server, Database, Globe, Lock, Code, Activity, AlertTriangle, Download, FileText } from 'lucide-react';
import { SectorHeader } from './App';

const VendorSubList: React.FC = () => {
    // Reset scroll on mount
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const vendors = [
        {
            name: "Amazon Web Services (AWS)",
            purpose: "Primary hosting, compute, storage, and networking architecture.",
            data: "Encrypted telemetry, system logs, infrastructure metadata.",
            notes: "Enforces AES-256 encryption at rest and TLS 1.2/1.3 in transit. Features Multi-AZ redundancy and physical data center security.",
            icon: <Server size={24} />
        },
        {
            name: "Cloudflare",
            purpose: "DDoS protection, CDN, WAF, and Zero Trust access gateway.",
            data: "IP metadata, request headers, security telemetry.",
            notes: "Cloudflare does not store customer content; it processes only edge-level metadata to neutralize threats before they reach the core network.",
            icon: <Globe size={24} />
        },
        {
            name: "Vercel",
            purpose: "Front-end application hosting, edge caching, and deployment.",
            data: "Website traffic metadata, public-facing interface content.",
            notes: "Zero sensitive or proprietary customer data is stored on Vercel infrastructure.",
            icon: <Code size={24} />
        },
        {
            name: "Stripe",
            purpose: "Payment processing, subscription billing, and automated invoicing.",
            data: "Payment details (Strictly PCI-compliant), billing information.",
            notes: "A.I.C.E. systems never touch or store raw card data. Stripe handles 100% of PCI compliance obligations.",
            icon: <Database size={24} />
        },
        {
            name: "Google Cloud (Gemini API)",
            purpose: "Platform-integrated natural language processing and interface assistance.",
            data: "Transient contextual queries submitted explicitly by users via interface endpoints.",
            notes: "Configured via strict enterprise API policies. Zero retention of customer data for foundation model training. Operational data remains entirely isolated.",
            icon: <Activity size={24} />
        },
        {
            name: "Logtail / BetterStack & Sentry",
            purpose: "Centralized logging, SIEM-style aggregation, and application monitoring.",
            data: "System logs, access logs, infrastructure telemetry, anonymized error logs.",
            notes: "All logs are heavily encrypted. All PII is aggressively stripped prior to transmission.",
            icon: <AlertTriangle size={24} />
        }
    ];

    const internalSystems = [
        "Deviance Viscosity Stabilizer (DVS)",
        "Entropic Drift Monitor",
        "Autonomous Stabilization Engine",
        "Internal Key Management Layer",
        "Zero-Trust Access Gateway"
    ];

    return (
        <div className="relative z-10 pt-28 pb-24 px-6 min-h-screen">
            <SectorHeader 
                title="Vendors & Subprocessors" 
                subtitle="Authorized Enterprise Supply Chain" 
                icon={<ShieldCheck size={48} />} 
            />

            <div className="max-w-6xl mx-auto mb-16 text-center">
                <p className="text-xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/5 shadow-2xl">
                    Below is the official, operational list of third-party vendors and subprocessors that process limited data on behalf of A.I.C.E. Systems Corp. This document reflects our verified operational footprint, engineered for maximum security, compliance, and performance.
                </p>
                
                {/* PDF DOWNLOAD BUTTON */}
                <div className="mt-8 flex justify-center">
                    <a 
                        href="/assets/images/Vendor and subprocessor list/A.I.C.E. Vendor Subprocessor List.pdf" 
                        download
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#00F3FF]/10 border border-[#00F3FF] text-[#00F3FF] font-black uppercase tracking-widest text-sm hover:bg-[#00F3FF] hover:text-black transition-all shadow-[0_0_20px_rgba(0,243,255,0.2)] rounded-lg"
                    >
                        <FileText size={18} />
                        Download Official Compliance PDF
                        <Download size={18} className="ml-2" />
                    </a>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                {vendors.map((vendor, i) => (
                    <div key={i} className="p-8 bg-[#050505] border border-white/10 rounded-2xl hover:border-[#00F3FF]/40 transition-all group shadow-2xl flex flex-col">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="text-[#00F3FF] p-3 bg-[#00F3FF]/10 rounded-lg border border-[#00F3FF]/30">
                                {vendor.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{vendor.name}</h3>
                        </div>
                        <div className="space-y-4 flex-grow">
                            <div>
                                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block mb-1">Purpose</span>
                                <p className="text-gray-300 text-sm">{vendor.purpose}</p>
                            </div>
                            <div>
                                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block mb-1">Data Processed</span>
                                <p className="text-gray-300 text-sm">{vendor.data}</p>
                            </div>
                            <div className="pt-4 border-t border-white/10 mt-auto">
                                <span className="text-[10px] text-[#00F3FF] font-mono uppercase tracking-widest block mb-1">Security Notes</span>
                                <p className="text-gray-400 text-xs italic">{vendor.notes}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="p-10 border-t-4 border-[#00F3FF] bg-black/80 rounded-2xl shadow-[0_0_50px_rgba(0,243,255,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Lock size={120} className="text-[#00F3FF]" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black text-white uppercase mb-6 flex items-center gap-4 tracking-tight">
                            <Lock size={28} className="text-[#00F3FF]" /> Internal Proprietary Systems
                        </h3>
                        <p className="text-gray-300 mb-8 max-w-3xl leading-relaxed">
                            The following critical infrastructure components are fully proprietary, internally hosted, and do not involve any third-party subprocessors. They remain 100% isolated:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {internalSystems.map((sys, i) => (
                                <div key={i} className="flex items-center gap-3 text-[#00F3FF] font-mono text-sm tracking-wider font-bold">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00F3FF] shadow-[0_0_5px_#00F3FF]"></div>
                                    {sys}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorSubList;