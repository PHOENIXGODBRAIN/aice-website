import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './App';
import { AuditCheckoutButton } from "./components/AuditCheckoutButton";
import { WiseDispatchButton } from "./components/WiseDispatchButton";
import { DIAGNOSTIC_MIN_LABEL, DIAGNOSTIC_LABEL } from "./pricing";
import { SalesAssistant } from './SalesAssistant';
import { 
  CheckCircle2, Shield, Activity, Lock, Building, Globe,
  FileBarChart, AlertTriangle, Database, Bot,
  LockKeyhole, Crosshair, Globe2, Cpu, Check, ShieldCheck, Briefcase
} from 'lucide-react';

const SECTOR_OPTIONS = [
  "AI LABS // LLM TRAINING", "FINANCE // HIGH-VELOCITY LIQUIDITY", "ENERGY // GRID STABILIZATION",
  "DEFENSE // AUTONOMOUS SYSTEMS", "AEROSPACE // TELEMETRY", "NUCLEAR // REACTOR SAFETY",
  "BIO-TECH // GENOMIC SEQUENCING", "TELECOM // 6G MESH NETWORKS", "QUANTUM // ERROR CORRECTION",
  "LOGISTICS // GLOBAL SUPPLY CHAIN", "MARITIME // AUTONOMOUS SHIPPING", "AUTOMOTIVE // SELF-DRIVING FLEETS",
  "INDUSTRIAL // SCADA AUTOMATION", "SMART CITIES // IOT INFRASTRUCTURE", "CRYPTOGRAPHY // BLOCKCHAIN VALIDATION",
  "METEOROLOGY // CLIMATE MODELING", "CYBERSECURITY // THREAT VECTORS", "SOCIAL // ALGORITHMIC FEEDS",
  "GAMING // SERVER MESHING", "GOV // DIGITAL ID SYSTEMS", "SPACE // ORBITAL MECHANICS",
  "AGRI-TECH // AUTOMATED FARMING", "HEALTHCARE // ROBOTIC SURGERY", "E-COMMERCE // HIGH-LOAD TRANSACTIONS",
  "RESEARCH // PARTICLE PHYSICS"
];

interface SalesViewProps {
  openLogin?: () => void;
  user?: any;
}

export const SalesView: React.FC<SalesViewProps> = ({ openLogin, user }) => {
  // Operational Data States
  const [sector, setSector] = useState<string>("");
  const [isOtherSector, setIsOtherSector] = useState(false);
  const [customSector, setCustomSector] = useState("");
  const [companyRole, setCompanyRole] = useState("");
  
  // Execution States
  const [isLocked, setIsLocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalSector = isOtherSector ? customSector : sector;
  const isSectorValid = isOtherSector ? customSector.trim().length > 0 : sector !== "";
  const isFormComplete = isSectorValid && companyRole.trim().length > 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // STAGE 1: Lock Parameters & Send First Email
  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isFormComplete) return;
    setIsSubmitting(true);

    const payload = {
        access_key: "3920a8a0-06ad-47f2-a6f7-f9bae987b7c0",
        subject: `[STAGE 1] ACQUISITION LEAD: ${user.email}`,
        from_name: "A.I.C.E. COMMAND DECK",
        Message: "Prospect locked parameters and revealed diagnostic pricing.",
        Operative: user.displayName || 'Classified',
        Email: user.email,
        Sector: finalSector,
        Title_Company: companyRole
    };

    try {
        await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload),
        });

        // Sync to Firebase
        await updateDoc(doc(db, 'artifacts', 'aice-6bd8e', 'users', user.uid), {
            target_sector: finalSector,
            company_role: companyRole,
            acquisitionFormCompleted: true
        });
    } catch (error) {
        console.error("Silent lead capture failed:", error);
    }

    setIsSubmitting(false);
    setIsLocked(true); // Reveals the checkout buttons
  };

  // STAGE 2: Track Checkout Click (Stripe/Wise) & Send Second Email
  const trackCheckoutClick = (method: string) => {
    if (!user) return;
    
    const payload = {
        access_key: "3920a8a0-06ad-47f2-a6f7-f9bae987b7c0",
        subject: `[STAGE 2] CHECKOUT INITIATED (${method}): ${user.email}`,
        from_name: "A.I.C.E. COMMAND DECK",
        Message: `Prospect clicked the ${method} payment button and is entering the checkout flow.`,
        Operative: user.displayName || 'Classified',
        Email: user.email,
        Sector: finalSector,
        Method: method
    };
    
    // Using keepalive: true ensures the fetch completes even as Stripe redirects the browser
    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        keepalive: true
    }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-300 font-sans pt-4 pb-24 px-4 md:px-6 relative z-10 selection:bg-[#00F3FF] selection:text-black">
      
      <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-[2px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent opacity-50 shadow-[0_0_20px_#00F3FF]"></div>

      <div className="max-w-[85rem] mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="mb-12 animate-in slide-in-from-bottom-4 duration-700 flex flex-col items-center text-center pt-8">
            <div className="inline-flex items-center gap-2 border border-orange-500/50 bg-orange-500/10 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(255,165,0,0.15)]">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-mono tracking-widest text-orange-500 uppercase font-bold">Active Queue: 2 Deployment Slots Remaining</span>
            </div>

            <div className="inline-flex items-center gap-3 border border-[#00F3FF]/30 bg-[#00F3FF]/10 px-5 py-2.5 rounded-full mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(0,243,255,0.2)]">
              <Lock size={18} className="text-[#00F3FF]" />
              <span className="text-sm font-mono tracking-widest text-[#00F3FF] uppercase font-bold">Secure Checkout Gateway</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-2xl flex flex-col items-center leading-[0.9]">
              <span>Diagnostic</span>
              <span className="text-[#00F3FF]">Engagement</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed drop-shadow-md">
              Isolate architectural failure points and quantify recoverable compute capital within a 14-day controlled diagnostic window. <strong className="text-white font-bold">Pricing engagements are slotted and classed dynamically based on your specific infrastructure sector.</strong>
            </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start mt-12">
            
            {/* LEFT COLUMN: THE VALUE FUNNEL */}
            <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700 delay-100">
                
                {/* 1. A.I.C.E. DEPLOYMENT ROADMAP */}
                <div className="bg-gradient-to-br from-[#050505] to-[#0A0A0A] border-2 border-[#00F3FF]/20 p-10 rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.05)]">
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#00F3FF] to-[#00FF66]"></div>
                    <h4 className="text-white font-black uppercase tracking-[0.2em] text-2xl mb-10 flex items-center gap-4">
                        <Activity size={28} className="text-[#00F3FF] animate-pulse" /> Your Path to Absolute Operational Smoothness:
                    </h4>
                    
                    <div className="space-y-10">
                        <div className="flex gap-6 items-center group">
                            <div className="p-4 rounded-2xl bg-[#00F3FF]/10 border border-[#00F3FF]/30 group-hover:bg-[#00F3FF]/20 transition-all">
                                <Shield size={28} className="text-[#00F3FF]" />
                            </div>
                            <div>
                                <span className="block text-[#00F3FF] font-mono text-xs font-bold uppercase tracking-widest mb-1">Instant Security</span>
                                <p className="text-white text-xl font-bold leading-tight">Mutual NDA issued immediately to protect your architecture.</p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-center group">
                            <div className="p-4 rounded-2xl bg-[#00FF66]/10 border border-[#00FF66]/30 group-hover:bg-[#00FF66]/20 transition-all">
                                <Lock size={28} className="text-[#00FF66]" />
                            </div>
                            <div>
                                <span className="block text-[#00FF66] font-mono text-xs font-bold uppercase tracking-widest mb-1">Rapid Onboarding</span>
                                <p className="text-white text-xl font-bold leading-tight">Secure telemetry access granted for log submission within 24h.</p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-center group">
                            <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 group-hover:bg-orange-500/20 transition-all">
                                <Activity size={28} className="text-orange-500" />
                            </div>
                            <div>
                                <span className="block text-orange-500 font-mono text-xs font-bold uppercase tracking-widest mb-1">Deep Analysis</span>
                                <p className="text-white text-xl font-bold leading-tight">A.I.C.E. engineering initiates surgical system optimization.</p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-center group">
                            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 group-hover:bg-purple-500/20 transition-all">
                                <CheckCircle2 size={28} className="text-purple-500" />
                            </div>
                            <div>
                                <span className="block text-purple-500 font-mono text-xs font-bold uppercase tracking-widest mb-1">Freedom From Friction</span>
                                <p className="text-white text-xl font-bold leading-tight">Full ROI Report delivered. Achieve a permanent smooth operating state.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. DIAGNOSTIC AUDIT DETAILS */}
                <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-10 border-b border-white/10 pb-6">
                      {DIAGNOSTIC_LABEL}
                    </h3>
                    <p className="text-[#00F3FF] font-mono text-xs uppercase tracking-widest mb-4">
                      Engagements begin at {DIAGNOSTIC_MIN_LABEL}
                    </p>

                    <ul className="space-y-8 mb-12">
                        <li className="flex items-start gap-6">
                            <div className="p-3 rounded-full bg-[#00F3FF]/10 border border-[#00F3FF]/30 shrink-0 shadow-inner">
                                <Database className="text-[#00F3FF]" size={28} />
                            </div>
                            <div>
                                <div className="text-white font-bold text-xl md:text-2xl mb-2">Data Analysis of Failure Logs</div>
                                <div className="text-gray-400 font-light leading-relaxed text-base md:text-lg">We map your historical failure data to isolate the exact millisecond your infrastructure breaks operational parameters.</div>
                            </div>
                        </li>
                        <li className="flex items-start gap-6">
                            <div className="p-3 rounded-full bg-red-500/10 border border-red-500/30 shrink-0 shadow-inner">
                                <AlertTriangle className="text-red-500" size={28} />
                            </div>
                            <div>
                                <div className="text-white font-bold text-xl md:text-2xl mb-2">Quantified Loss Breakdown</div>
                                <div className="text-gray-400 font-light leading-relaxed text-base md:text-lg">Mathematical calculation of exact capital bled through unchecked system variance and compute waste.</div>
                            </div>
                        </li>
                        <li className="flex items-start gap-6">
                            <div className="p-3 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 shrink-0 shadow-inner">
                                <FileBarChart className="text-[#00FF66]" size={28} />
                            </div>
                            <div>
                                <div className="text-white font-bold text-xl md:text-2xl mb-2">Executive PDF Report & ROI Projection</div>
                                <div className="text-gray-400 font-light leading-relaxed text-base md:text-lg">A board-ready breakdown of the A.I.C.E. intervention simulation, deployment roadmap, and API pricing tier.</div>
                            </div>
                        </li>
                    </ul>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 bg-black/60 p-8 rounded-2xl border border-white/5">
                        <div>
                            <div className="text-gray-500 font-mono text-sm font-bold uppercase tracking-widest mb-2">Turnaround Time</div>
                            <div className="text-white text-xl font-medium">14 Days</div>
                        </div>
                        <div>
                            <div className="text-gray-500 font-mono text-sm font-bold uppercase tracking-widest mb-2">Engagement Capital</div>
                            <div className="text-xl md:text-2xl font-black text-[#00F3FF] tracking-tighter uppercase">
                                Awaiting Sector Classification
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. DIAGNOSTIC ASSURANCE */}
                <div className="p-8 border border-[#00FF66]/30 bg-[#00FF66]/10 backdrop-blur-md rounded-2xl flex gap-6 shadow-[0_0_30px_rgba(0,255,102,0.1)] hover:border-[#00FF66]/60 transition-colors">
                    <Shield className="text-[#00FF66] shrink-0" size={36} />
                    <p className="text-gray-200 text-lg leading-relaxed">
                        <strong className="text-[#00FF66] font-bold text-xl tracking-wide block mb-2">Diagnostic Assurance</strong> 
                        If our analysis yields no material instability signature within your submitted logs, the initial diagnostic fee is credited entirely toward future governance deployment.
                    </p>
                </div>
            </div>

            {/* RIGHT COLUMN: THE EXECUTION ZONE */}
            <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700 delay-200">
                
                {/* STRICT AUTHENTICATION GATE */}
                {!user ? (
                    <div className="bg-black/80 backdrop-blur-xl border-2 border-red-500/50 rounded-3xl p-10 md:p-14 text-center shadow-[0_0_50px_rgba(239,68,68,0.15)] flex flex-col items-center justify-center h-full min-h-[500px]">
                        <LockKeyhole size={64} className="mx-auto text-red-500 mb-6 animate-pulse" />
                        <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-4">Uplink Severed</h3>
                        <p className="text-gray-400 mb-10 text-lg leading-relaxed max-w-sm">
                            You must be authenticated with an Operative Profile to access the Deployment Gateway and calculate parameters.
                        </p>
                        <button onClick={openLogin} className="w-full py-6 bg-red-500/10 border-2 border-red-500 text-red-500 font-black uppercase tracking-[0.2em] rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                            AUTHENTICATE IDENTITY
                        </button>
                    </div>
                ) : !isLocked ? (
                    /* THE SIMPLIFIED PARAMETER FORM */
                    <div className="bg-black/80 backdrop-blur-xl border-2 border-[#00F3FF]/50 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(0,243,255,0.15)] relative overflow-hidden group hover:border-[#00F3FF] transition-colors">
                        <div className="absolute top-0 right-0 bg-[#00F3FF] text-black text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">Step 01: Telemetry</div>
                        
                        <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">System Parameters</h3>
                        <p className="text-gray-400 text-sm mb-8 leading-relaxed">Confirm your operational details below to calculate the diagnostic deployment fee.</p>

                        {/* Operative Identity Display (Verified) */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8 shadow-inner">
                            <div className="flex items-center gap-2 text-[#00FF66] font-mono text-xs font-bold uppercase tracking-widest mb-3">
                                <ShieldCheck size={16} /> OPERATIVE IDENTITY VERIFIED
                            </div>
                            <div className="text-white font-bold text-lg">{user.displayName || 'CLASSIFIED OPERATIVE'}</div>
                            <div className="text-gray-400 text-sm font-mono">{user.email}</div>
                        </div>

                        <form onSubmit={handleSaveDetails} className="space-y-6 relative">
                            
                            <div className="space-y-2">
                                <label className="text-[#00F3FF] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"><Crosshair size={14} /> Target Sector</label>
                                <select 
                                     value={isOtherSector ? "OTHER" : sector} 
                                     onChange={(e) => {
                                         const val = e.target.value;
                                         if (val === "OTHER") { setIsOtherSector(true); setSector(""); } 
                                         else { setIsOtherSector(false); setSector(val); }
                                     }}
                                     className="bg-black text-[#00F3FF] text-sm font-bold uppercase tracking-wider p-4 rounded-xl border border-white/20 focus:border-[#00F3FF] outline-none cursor-pointer w-full appearance-none hover:bg-white/5 transition-colors font-mono"
                                     required
                                >
                                   <option value="" disabled className="text-gray-600">-- SELECT INFRASTRUCTURE --</option>
                                   {SECTOR_OPTIONS.map((opt, i) => (<option key={i} value={opt} className="bg-black text-[#00F3FF] font-mono font-bold py-2">{opt}</option>))}
                                   <option value="OTHER" className="bg-black text-white font-mono font-bold py-2 border-t border-white/20">-- OTHER (MANUAL ENTRY) --</option>
                                </select>
                                {isOtherSector && (
                                    <input type="text" placeholder="ENTER SPECIFIC INFRASTRUCTURE TYPE..." value={customSector} onChange={(e) => setCustomSector(e.target.value)} required className="w-full bg-[#00F3FF]/5 border-l-4 border-[#00F3FF] text-white p-4 rounded-r-xl font-mono text-sm outline-none mt-2 animate-in fade-in" />
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[#00F3FF] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"><Briefcase size={14} /> Company & Role</label>
                                <input type="text" placeholder="e.g. CTO at Horizon Energy" value={companyRole} onChange={(e) => setCompanyRole(e.target.value)} className="bg-black text-white placeholder-gray-600 text-sm font-bold uppercase tracking-wider p-4 rounded-xl border border-white/20 focus:border-[#00F3FF] outline-none w-full hover:bg-white/5 transition-colors font-mono" required />
                            </div>

                            <button 
                                type="submit"
                                disabled={!isFormComplete || isSubmitting}
                                className={`group w-full py-5 mt-4 bg-[#00F3FF] text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-all rounded-xl shadow-[0_0_30px_rgba(0,243,255,0.3)] flex items-center justify-center gap-3 ${!isFormComplete ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:scale-[1.02]'}`}
                            >
                                {isSubmitting ? <Cpu className="animate-spin" size={20} /> : <Check size={20} />} 
                                SAVE DETAILS & CALCULATE DIAGNOSTIC FEE
                            </button>
                        </form>
                    </div>
                ) : (
                    /* THE REVEALED EXECUTION ZONE */
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-6">
                        
                        {/* THE ERV REVEAL HEADER */}
                        <div className="bg-[#00F3FF]/10 border-2 border-[#00F3FF] p-6 rounded-2xl text-center shadow-[0_0_30px_rgba(0,243,255,0.2)] relative">
                            <CheckCircle2 size={24} className="text-[#00F3FF] absolute top-6 left-6 hidden md:block" />
                            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest">
                                Calculated Diagnostics Fee For Current Sector ERV
                            </h2>
                            <p className="text-[#00F3FF] font-mono text-sm tracking-[0.2em] uppercase mt-2 font-bold">
                                Sector: {finalSector}
                            </p>
                            <button onClick={() => setIsLocked(false)} className="mt-4 text-gray-400 hover:text-white text-[10px] uppercase tracking-widest underline decoration-dotted font-mono">Edit Parameters</button>
                        </div>

                        {/* Lane 1: Fast Entry (Card) */}
                        <div className="bg-black/80 backdrop-blur-xl border-2 border-[#00FF66]/50 rounded-3xl p-10 shadow-[0_0_50px_rgba(0,255,102,0.15)] relative overflow-visible group hover:border-[#00FF66] transition-colors">
                            <div className="absolute top-0 right-0 bg-[#00FF66] text-black text-xs font-black px-6 py-2 rounded-bl-2xl uppercase tracking-widest">Step 02: Execution</div>
                            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Instant Allocation</h3>
                            <p className="text-gray-400 text-lg mb-10 leading-relaxed">Fastest path to execution. Pay securely via corporate card or ACH to immediately trigger the NDA protocol. Acquire the Strongest Governance Software known to man.</p>
                            
                            {/* WRAPPING THE BUTTON TO CAPTURE THE STRIKE 2 EMAIL */}
                            <div onMouseDown={() => trackCheckoutClick('STRIPE')} className="w-full">
                                <AuditCheckoutButton />
                            </div>
                            
                            <div className="text-center mt-6 text-sm text-gray-500 font-mono tracking-widest flex items-center justify-center gap-2">
                                <Lock size={14} className="text-[#00FF66]" /> Encrypted via Stripe (Card / ACH)
                            </div>
                        </div>

                        <div className="flex items-center gap-6 py-4">
                            <div className="h-[1px] flex-1 bg-white/20"></div>
                            <div className="text-sm font-mono text-gray-400 uppercase tracking-[0.3em] font-bold">Or</div>
                            <div className="h-[1px] flex-1 bg-white/20"></div>
                        </div>

                        {/* Lane 2: Institutional (Invoice & Direct Wire) */}
                        <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-10 hover:border-white/50 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-white tracking-tight">Corporate Wire Transfer</h3>
                                <div className="bg-[#00F3FF]/20 text-[#00F3FF] border border-[#00F3FF]/30 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase">Zero Fees</div>
                            </div>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">Bypass gateway fees. Request a formal invoice and direct SWIFT/ACH routing instructions for our institutional Wise account.</p>
                            
                            {/* WRAPPING THE BUTTON TO CAPTURE THE STRIKE 2 EMAIL */}
                            <div onMouseDown={() => trackCheckoutClick('WISE_INVOICE')} className="w-full">
                                <WiseDispatchButton />
                            </div>
                            
                            <div className="text-center mt-6 text-sm text-gray-500 font-mono tracking-widest flex items-center justify-center gap-2">
                                <Building size={14} /> Direct to Wise | SWIFT / ACH / SEPA
                            </div>
                        </div>
                    </div>
                )}

                {/* Direct Command Interfacing (Contact Us) */}
                <div className="mt-8 bg-black/40 border border-white/10 rounded-2xl p-8 text-center hover:border-white/30 transition-colors">
                    <h4 className="text-white font-black uppercase tracking-widest text-xl mb-3">Require Direct Interfacing?</h4>
                    <p className="text-gray-400 font-light mb-6 text-sm md:text-base px-4">
                        Complex architectures occasionally require manual parameter assessment before deployment. Initiate contact with A.I.C.E. engineering command.
                    </p>
                    <a href="https://www.aice.network/contact_us" className="inline-flex items-center justify-center gap-3 border-2 border-[#00F3FF] text-[#00F3FF] font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-[#00F3FF] hover:text-black transition-all shadow-[0_0_15px_rgba(0,243,255,0.15)]">
                        <Globe size={18} /> Contact Command Deck
                    </a>
                </div>

                {/* Corporate Reality Trust Layer */}
                <div className="pt-8 text-center bg-transparent p-6 mt-4">
                    <div className="inline-flex items-center gap-3 text-white font-mono text-sm uppercase tracking-[0.2em] font-bold opacity-50">
                        <Globe size={16} className="text-[#00F3FF]" /> A.I.C.E. Systems Corp.
                    </div>
                    <div className="text-gray-400 font-mono text-xs mt-2 tracking-widest">
                        Registered Canadian Corporation | Corp No. 1773376-3
                    </div>
                    <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-white/10 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        <span>AES-256 ENCRYPTED</span>
                        <span>ZERO-TRUST ARCHITECTURE</span>
                    </div>
                </div>

           </div>
        </div>

      </div>

      {/* FULL WIDTH A.I.C.E. NEURAL LINK MOUNT */}
      <div className="w-full bg-[#050505] border-t-2 border-orange-500/50 mt-20 pt-16 pb-0 relative z-20 shadow-[0_-30px_60px_rgba(234,88,12,0.1)]">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-3">Initialize Deployment Support</h2>
            <p className="text-orange-500 font-mono text-sm tracking-[0.2em] uppercase">The A.I.C.E. Protocol is ready to guide you.</p>
        </div>
        <SalesAssistant selectedSector={""} /> 
      </div>

    </div>
  );
};

export default SalesView;