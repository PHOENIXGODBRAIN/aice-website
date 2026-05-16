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
  LockKeyhole, Crosshair, Globe2, Cpu, Check, ShieldCheck, Briefcase, UserCheck
} from 'lucide-react';

// --- THE GLOBAL INFRASTRUCTURE MATRIX (119 Sectors) ---
const SECTOR_OPTIONS = [
  "ADDITIVE MANUFACTURING // MICRO-TOLERANCES",
  "AEROSPACE // COMMERCIAL AVIATION",
  "AEROSPACE // FLIGHT PHYSICS",
  "AEROSPACE // HYPERSONIC TELEMETRY",
  "AGRI-TECH // AUTOMATED HARVEST",
  "AGRI-TECH // SOIL ENTROPY",
  "AGRI-TECH // YIELD FLUX",
  "AI LABS // INFERENCE ENGINES",
  "AI LABS // LLM TRAINING",
  "AI LABS // NEURAL NETWORKS",
  "AQUACULTURE // MARINE AUTOMATION",
  "ARCHAEOMETRY // ISOTOPE DATING",
  "ASTROPHYSICS // COSMOLOGICAL SIMULATIONS",
  "ASTROPHYSICS // DEEP SPACE TELEMETRY",
  "AUTONOMOUS DRONES // SWARM COHERENCE",
  "AUTOMOTIVE // AUTONOMOUS FLEETS",
  "AUTOMOTIVE // EV BATTERIES",
  "AUTOMOTIVE // STEER-BY-WIRE",
  "AVIATION // AIR TRAFFIC CONTROL",
  "BEHAVIORAL SCIENCE // PREDICTIVE PSYCHOMETRICS",
  "BIOINFORMATICS // POPULATION GENOMICS",
  "BIOTECHNOLOGY // GENOMICS",
  "BIOTECHNOLOGY // PROTEIN FOLDING",
  "BLOCKCHAIN // CONSENSUS TIMING",
  "BLOCKCHAIN // CRYPTOGRAPHY",
  "BROADCASTING // LIVE EVENT SYNC",
  "CARBON CAPTURE // FLUID DYNAMICS",
  "CENTRAL BANKING // FISCAL STABILITY",
  "CLEAN ENERGY // GEOTHERMAL",
  "CLOUD COMPUTE // HYPERSCALE REGIONS",
  "CLOUD COMPUTE // VM MIGRATION",
  "CONSTRUCTION // BIM MODELING",
  "CYBERSECURITY // DDOS NEUTRALIZATION",
  "CYBERSECURITY // THREAT VECTORS",
  "CYBERSECURITY // ZERO-TRUST AUTH",
  "DATA CENTERS // HVAC GOVERNANCE",
  "DECENTRALIZED FINANCE // SMART CONTRACT SYNC",
  "DEEP SEA OPS // PRESSURE FLUX",
  "DIGITAL IDENTITY // BIOMETRIC AUTH",
  "DISTRIBUTED STORAGE // FRAGMENTATION SYNC",
  "E-COMMERCE // HIGH-LOAD TRANSACTIONS",
  "EDUCATION // ED-TECH PLATFORMS",
  "ENERGY // GRID STABILIZATION",
  "ENTERPRISE ERP // DB LOCK DAMPENING",
  "ENTERTAINMENT // CGI RENDER FARMS",
  "ENTERTAINMENT // MEDIA DISTRIBUTION",
  "EPIDEMIOLOGY // VIRAL SPREAD MODELS",
  "FINANCE // CLEARING HOUSES",
  "FINANCE // FOREX LEDGERS",
  "FINANCE // HIGH-VELOCITY LIQUIDITY",
  "FORESTRY // WILDFIRE PREDICTION",
  "GAMING SERVERS // TICK RATE SYNC",
  "GOV INTELLIGENCE // BORDER SEC MESH",
  "GOV INTELLIGENCE // SIGNAL FILTERING",
  "GOVERNMENT // CIVIL INFRASTRUCTURE",
  "HEALTHCARE // EMERGENCY DISPATCH",
  "HEALTHCARE // IMAGING DIAGNOSTICS",
  "HEALTHCARE // LIFE SUPPORT SYSTEMS",
  "HEALTHCARE // ROBOTIC SURGERY",
  "HFT TRADING // ORDER BOOK DAMPENING",
  "INDUSTRIAL // DIGITAL TWINS",
  "INDUSTRIAL // MANUFACTURING AUTOMATION",
  "INDUSTRIAL // SCADA AUTOMATION",
  "INSURANCE // ACTUARIAL RISK",
  "INTERNET // BGP ROUTING",
  "INTERNET // DNS REGISTRIES",
  "LAW ENFORCEMENT // PREDICTIVE POLICING",
  "LOGISTICS // GLOBAL SUPPLY CHAIN",
  "LOGISTICS // ROUTE ENTROPY",
  "MARITIME SHIPPING // PORT AUTOMATION",
  "MARITIME SHIPPING // VESSEL TRIM",
  "MASS TRANSIT // RAIL AUTOMATION",
  "MATERIALS SCIENCE // ALLOY SYNTHESIS",
  "METAVERSE // REAL-TIME RAY TRACING",
  "METAVERSE // SPATIAL ENTROPY",
  "METEOROLOGY // CLIMATE MODELS",
  "METEOROLOGY // SENSOR DRIFT",
  "MINING OPS // LOAD DENSITY",
  "NANOTECHNOLOGY // MOLECULAR ASSEMBLY",
  "NEURALINK OPS // BCI SIGNALS",
  "NEURO-PROSTHETICS // KINEMATIC SYNC",
  "NEUROSCIENCE // BRAIN MAPPING",
  "NUCLEAR FISSION // CONTAINMENT THERMALS",
  "NUCLEAR FUSION // REACTOR SAFETY",
  "OIL & GAS // PIPELINE TELEMETRY",
  "OIL & GAS // PRESSURE REGIMES",
  "PARTICLE PHYSICS // BEAM DIVERGENCE",
  "PHARMACEUTICALS // DRUG DISCOVERY",
  "POWER GRIDS // PHASE FREQUENCY",
  "PUBLIC SAFETY // EMERGENCY MESH",
  "QUANTUM COMPUTE // ERROR CORRECTION",
  "QUANTUM COMPUTE // QUBIT DECOHERENCE",
  "REAL ESTATE // PROPTECH PLATFORMS",
  "RENEWABLES // INVERTER SYNC",
  "RENEWABLES // SOLAR ARRAYS",
  "RENEWABLES // WIND TURBINES",
  "RETAIL // GLOBAL POS SYNC",
  "ROBOTICS // KINEMATIC JERK",
  "SATELLITE COMMS // CONSTELLATION SYNC",
  "SATELLITE COMMS // DATA UPLINK",
  "SEISMOLOGY // EARTHQUAKE PREDICTION",
  "SEMICONDUCTORS // FAB AUTOMATION",
  "SEMICONDUCTORS // THERMAL THROTTLING",
  "SMART CITIES // IOT INFRASTRUCTURE",
  "SMART CITIES // TRAFFIC GRID SYNC",
  "SMART GRIDS // MICROGRID DISTRIBUTION",
  "SMART WAREHOUSING // ROBOTIC PICKING",
  "SOCIAL MEDIA // ALGORITHMIC FEEDS",
  "SOCIAL MEDIA // VIRAL DAMPENING",
  "SPACE TRAVEL // LIFE SUPPORT",
  "SPACE TRAVEL // ORBIT DECAY",
  "SPORTS ANALYTICS // REAL-TIME KINEMATICS",
  "STREAMING DATA // BITRATE FLUX",
  "TELECOMMUNICATIONS // 6G NETWORKS",
  "TELECOMMUNICATIONS // FIBER OPTIC ROUTING",
  "TELECOMMUNICATIONS // NETWORK NOISE",
  "URBAN PLANNING // RESOURCE ALLOCATION",
  "VIRTUAL REALITY // HAPTIC FEEDBACK",
  "WASTE MGMT // LOGISTICS MESH",
  "WATER SYSTEMS // PRESSURE FLOW"
];

// --- THE EXHAUSTIVE EXECUTIVE ROLES (A-Z) ---
const ROLE_OPTIONS = [
  "ADMINISTRATOR",
  "CHIEF ARTIFICIAL INTELLIGENCE OFFICER (CAIO)",
  "CHIEF DATA OFFICER (CDO)",
  "CHIEF EXECUTIVE OFFICER (CEO)",
  "CHIEF FINANCIAL OFFICER (CFO)",
  "CHIEF INFORMATION OFFICER (CIO)",
  "CHIEF INFORMATION SECURITY OFFICER (CISO)",
  "CHIEF OPERATING OFFICER (COO)",
  "CHIEF RISK OFFICER (CRO)",
  "CHIEF TECHNOLOGY OFFICER (CTO)",
  "DATA SCIENTIST",
  "DIRECTOR OF ENGINEERING",
  "DIRECTOR OF INFRASTRUCTURE",
  "DIRECTOR OF IT",
  "DIRECTOR OF OPERATIONS",
  "DIRECTOR OF SECURITY",
  "ENGINEERING MANAGER",
  "FOUNDER",
  "HEAD OF AI / MACHINE LEARNING",
  "HEAD OF CYBERSECURITY",
  "HEAD OF INNOVATION",
  "HEAD OF RESEARCH AND DEVELOPMENT (R&D)",
  "INFRASTRUCTURE ARCHITECT",
  "LEAD DEVELOPER",
  "NETWORK ENGINEER",
  "PRINCIPAL ENGINEER",
  "PRODUCT MANAGER",
  "QUANTITATIVE ANALYST (QUANT)",
  "SECURITY ARCHITECT",
  "SENIOR SOFTWARE ENGINEER",
  "SYSTEMS ADMINISTRATOR",
  "SYSTEMS ENGINEER",
  "VP OF ENGINEERING",
  "VP OF IT",
  "VP OF OPERATIONS",
  "VP OF TECHNOLOGY"
];

// --- DYNAMIC ERV PRICING LOGIC ---
const calculateERV = (target: string) => {
    const t = target.toUpperCase();
    
    // CLASS S ($250k+) - Life Critical / Sovereign Scale / High Liability
    if (["NUCLEAR", "POWER GRID", "SMART GRIDS", "AEROSPACE", "SPACE", "HEALTHCARE", "NEURALINK", "NEURO-PROSTHETICS", "WATER", "DEEP SEA", "AVIATION", "MASS TRANSIT", "ENERGY", "PUBLIC SAFETY", "EPIDEMIOLOGY", "CENTRAL BANKING", "GOVERNMENT", "GOV INTELLIGENCE"].some(k => t.includes(k))) return 'CLASS_S';
    
    // CLASS 1 ($150k) - Systemic / High Velocity / Hyperscalers
    if (["HFT", "FINANCE", "DECENTRALIZED FINANCE", "QUANTUM", "TELECOM", "6G", "SATELLITE", "INTERNET", "CYBERSECURITY", "FOREX", "CLEARING", "CRYPTOGRAPHY", "BLOCKCHAIN", "NEUROSCIENCE", "SEISMOLOGY", "ASTROPHYSICS", "AI LABS", "CLOUD COMPUTE", "DISTRIBUTED STORAGE", "DATA CENTERS", "SEMICONDUCTOR", "ENTERPRISE"].some(k => t.includes(k))) return 'CLASS_1';
    
    // CLASS 2 ($50k) - Enterprise Scale / Physical Logistics / Massive Data
    if (["LOGISTICS", "SMART CITIES", "SOCIAL", "BIOTECHNOLOGY", "BIOINFORMATICS", "BEHAVIORAL SCIENCE", "AQUACULTURE", "MARITIME", "AUTOMOTIVE", "AUTONOMOUS DRONES", "OIL", "RENEWABLE", "CARBON CAPTURE", "MINING", "PARTICLE", "E-COMMERCE", "AGRI", "WASTE", "INSURANCE", "METEOROLOGY", "METAVERSE", "GAMING", "INDUSTRIAL", "ADDITIVE MANUFACTURING", "ROBOTICS", "SMART WAREHOUSING", "PHARMACEUTICALS", "NANOTECHNOLOGY", "FORESTRY", "MATERIALS", "RETAIL", "BROADCASTING", "DIGITAL IDENTITY", "LAW ENFORCEMENT", "ARCHAEOMETRY"].some(k => t.includes(k))) return 'CLASS_2';
    
    // CLASS 3 ($15k) - Commercial Edge / Localized Architecture
    // Catches: CONSTRUCTION, EDUCATION, REAL ESTATE, URBAN PLANNING, VIRTUAL REALITY, ENTERTAINMENT
    return 'CLASS_3';
};

const TIER_DATA: Record<string, { price: string, title: string, desc: string, color: string, border: string }> = {
    'CLASS_S': { price: "$250,000+", title: "CLASS S: SOVEREIGN ERV", desc: "Extreme liability, life-critical infrastructure. Maximum diagnostic scope required.", color: "text-[#00F3FF]", border: "border-[#00F3FF]" },
    'CLASS_1': { price: "$150,000", title: "CLASS 1: SYSTEMIC ERV", desc: "High-velocity networks and Tier-1 liquidity infrastructure profiling.", color: "text-white", border: "border-white" },
    'CLASS_2': { price: "$50,000", title: "CLASS 2: ENTERPRISE ERV", desc: "Massive commercial networks and autonomous fleet orchestration.", color: "text-gray-300", border: "border-gray-500" },
    'CLASS_3': { price: "$15,000", title: "CLASS 3: COMMERCIAL ERV", desc: "Localized or non-lethal data architectures and edge computing analysis.", color: "text-gray-400", border: "border-gray-600" }
};

interface SalesViewProps {
  openLogin?: () => void;
  user?: any;
}

export const SalesView: React.FC<SalesViewProps> = ({ openLogin, user }) => {
  // Operational Data States
  const [sector, setSector] = useState<string>("");
  const [companyRole, setCompanyRole] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  
  // Execution States
  const [calculatedERV, setCalculatedERV] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation Logic (All fields mandatory)
  const isFormComplete = sector !== "" && companyRole !== "" && companyName.trim().length > 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // STAGE 1: Calculate ERV, Lock Parameters & Send First Email
  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isFormComplete) return;
    setIsSubmitting(true);

    const erv = calculateERV(sector);
    setCalculatedERV(erv);
    const calculatedPrice = TIER_DATA[erv].price;

    const payload = {
        access_key: "3920a8a0-06ad-47f2-a6f7-f9bae987b7c0",
        subject: `[A.I.C.E. ACQUISITION] NEW LEAD: ${user.email} [${erv}]`,
        from_name: "A.I.C.E. COMMAND DECK",
        Message: "Prospect locked parameters, triggered ERV valuation, and revealed diagnostic pricing.",
        Operative: user.displayName || 'Classified',
        Email: user.email,
        Sector: sector,
        Company: companyName,
        Role: companyRole,
        ERV_Classification: erv,
        Quoted_Diagnostic_Fee: calculatedPrice
    };

    try {
        await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload),
        });

        // Sync to Firebase
        await updateDoc(doc(db, 'artifacts', 'aice-6bd8e', 'users', user.uid), {
            target_sector: sector,
            company_name: companyName,
            company_role: companyRole,
            erv_tier: erv,
            acquisitionFormCompleted: true
        });
    } catch (error) {
        console.error("Silent lead capture failed:", error);
    }

    setIsSubmitting(false);
    setIsLocked(true); // Reveals the calculated checkout
  };

  // STAGE 2: Track Checkout Click (Stripe/Wise) & Send Second Email
  const trackCheckoutClick = (method: string) => {
    if (!user) return;
    
    const payload = {
        access_key: "3920a8a0-06ad-47f2-a6f7-f9bae987b7c0",
        subject: `[FINANCIAL DISPATCH] CHECKOUT INITIATED (${method}): ${user.email}`,
        from_name: "A.I.C.E. COMMAND DECK",
        Message: `Prospect clicked the ${method} payment button and is entering the checkout flow.`,
        Operative: user.displayName || 'Classified',
        Email: user.email,
        Sector: sector,
        Company: companyName,
        Role: companyRole,
        Calculated_Tier: calculatedERV,
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
    <div className="min-h-screen bg-transparent text-gray-300 font-sans pt-4 pb-24 px-4 md:px-6 relative z-10 selection:bg-[#00F3FF] selection:text-black overflow-hidden">
      
      {/* --- PAGE VOID BACKGROUND --- */}
      <div className="absolute inset-0 bg-black z-[-3]"></div>

      {/* --- A.I.C.E. CINEMATIC BACKGROUND INJECTION (SCALED UP) --- */}
      <div className="absolute top-0 left-0 w-full h-[1000px] md:h-[1200px] z-[-2] flex justify-center overflow-hidden pt-4">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full max-w-[120rem] h-full object-contain opacity-80"
        >
          <source src="/assets/images/buy now/Acquisition_bg.mp4" type="video/mp4" />
        </video>
        {/* Expanded gradient fade to merge the video cleanly into the black void */}
        <div className="absolute bottom-0 left-0 w-full h-64 md:h-80 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none"></div>
      </div>

      {/* --- GLASS BLUR OVERLAY (HEADER ONLY) --- */}
      <div className="absolute top-0 left-0 w-full h-[1000px] md:h-[1200px] z-[-1] bg-black/40 backdrop-blur-[2px] pointer-events-none"></div>
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
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-2xl md:text-3xl text-gray-200 font-light leading-relaxed drop-shadow-md">
                Isolate architectural failure points and quantify recoverable compute capital within a 14-day controlled diagnostic window.
              </p>
              <div className="border-t border-white/10 pt-6 mt-6">
                <p className="text-[#00F3FF] font-mono text-sm md:text-base lg:text-lg uppercase tracking-[0.2em] font-bold leading-relaxed drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                  Pricing engagements are slotted and classed dynamically based on your specific infrastructure sector.
                </p>
              </div>
            </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start mt-12">
            
            {/* LEFT COLUMN: THE VALUE FUNNEL */}
            <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700 delay-100">
                
                {/* 1. A.I.C.E. DEPLOYMENT ROADMAP */}
                <div className="bg-black/50 backdrop-blur-md border-2 border-[#00F3FF]/20 p-10 rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.05)] transition-all">
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
                      Base engagements originate at {DIAGNOSTIC_MIN_LABEL}
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
                                {calculatedERV ? TIER_DATA[calculatedERV].price : "Awaiting Sector Classification"}
                            </div>
                        </div>
                    </div>
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
                    /* THE ERV CALCULATION FORM (SINGLE FLOW) */
                    <div className="bg-black/80 backdrop-blur-xl border-2 border-[#00F3FF]/50 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(0,243,255,0.15)] relative overflow-hidden group hover:border-[#00F3FF] transition-colors h-full min-h-[500px] flex flex-col justify-center">
                        <div className="absolute top-0 right-0 bg-[#00F3FF] text-black text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">Pre-Deployment</div>
                        
                        <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">System Parameters</h3>
                        <p className="text-gray-400 text-sm mb-8 leading-relaxed">Confirm your operational details below to calculate your specific ERV diagnostic tier and reveal the deployment fee.</p>

                        {/* Operative Identity Display (Verified) */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8 shadow-inner">
                            <div className="flex items-center gap-2 text-[#00FF66] font-mono text-xs font-bold uppercase tracking-widest mb-3">
                                <ShieldCheck size={16} /> IDENTITY SECURED
                            </div>
                            <div className="text-white font-bold text-lg">{user.displayName || 'CLASSIFIED OPERATIVE'}</div>
                            <div className="text-gray-400 text-sm font-mono">{user.email}</div>
                        </div>

                        <form onSubmit={handleSaveDetails} className="space-y-6 relative flex-grow flex flex-col">
                            
                            <div className="space-y-2">
                                <label className="text-[#00F3FF] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"><Crosshair size={14} /> 01. Target Sector</label>
                                <select 
                                     value={sector} 
                                     onChange={(e) => setSector(e.target.value)}
                                     className="bg-black text-[#00F3FF] text-sm font-bold uppercase tracking-wider p-4 rounded-xl border border-white/20 focus:border-[#00F3FF] outline-none cursor-pointer w-full appearance-none hover:bg-white/5 transition-colors font-mono"
                                     required
                                >
                                   <option value="" disabled className="text-gray-600">-- SELECT INFRASTRUCTURE SECTOR --</option>
                                   {SECTOR_OPTIONS.map((opt, i) => (<option key={i} value={opt} className="bg-black text-[#00F3FF] font-mono font-bold py-2">{opt}</option>))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[#00F3FF] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"><UserCheck size={14} /> 02. Executive Role</label>
                                <select 
                                     value={companyRole} 
                                     onChange={(e) => setCompanyRole(e.target.value)}
                                     className="bg-black text-white text-sm font-bold uppercase tracking-wider p-4 rounded-xl border border-white/20 focus:border-[#00F3FF] outline-none cursor-pointer w-full appearance-none hover:bg-white/5 transition-colors font-mono"
                                     required
                                >
                                   <option value="" disabled className="text-gray-600">-- SELECT OPERATIVE TITLE --</option>
                                   {ROLE_OPTIONS.map((opt, i) => (<option key={i} value={opt} className="bg-black text-white font-mono font-bold py-2">{opt}</option>))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[#00F3FF] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"><Briefcase size={14} /> 03. Organization Name</label>
                                <input type="text" placeholder="ENTER COMPANY / ENTITY NAME" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="bg-black text-white placeholder-gray-600 text-sm font-bold uppercase tracking-wider p-4 rounded-xl border border-white/20 focus:border-[#00F3FF] outline-none w-full hover:bg-white/5 transition-colors font-mono" required />
                            </div>

                            <div className="mt-auto pt-8">
                                <button 
                                    type="submit"
                                    disabled={!isFormComplete || isSubmitting}
                                    className={`group w-full py-5 bg-[#00F3FF] text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-all rounded-xl shadow-[0_0_30px_rgba(0,243,255,0.3)] flex items-center justify-center gap-3 ${!isFormComplete ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:scale-[1.02]'}`}
                                >
                                    {isSubmitting ? <Cpu className="animate-spin" size={20} /> : <Check size={20} />} 
                                    CALCULATE ERV & REVEAL PRICING
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    /* THE REVEALED ERV EXECUTION ZONE */
                    <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
                        
                        {/* DYNAMIC ERV PRICING REVEAL */}
                        {calculatedERV && (
                            <div className={`bg-black/90 backdrop-blur-xl border-2 ${TIER_DATA[calculatedERV].border} p-10 rounded-3xl text-center shadow-[0_0_60px_rgba(0,243,255,0.15)] relative overflow-hidden group`}>
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
                                <CheckCircle2 size={40} className={`${TIER_DATA[calculatedERV].color} mx-auto mb-6`} />
                                
                                <p className="text-gray-400 font-mono text-sm tracking-[0.2em] uppercase font-bold mb-2">
                                    Target Acquired: {sector}
                                </p>
                                <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-widest mb-6 ${TIER_DATA[calculatedERV].color}`}>
                                    {TIER_DATA[calculatedERV].title}
                                </h2>
                                
                                <div className="text-6xl md:text-7xl font-black text-white drop-shadow-lg mb-6">
                                    {TIER_DATA[calculatedERV].price}
                                </div>
                                
                                <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed border-t border-white/10 pt-6">
                                    {TIER_DATA[calculatedERV].desc}
                                </p>
                                
                                <button onClick={() => setIsLocked(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white text-[10px] uppercase tracking-widest underline decoration-dotted font-mono">Recalculate</button>
                            </div>
                        )}

                        {/* Lane 1: Fast Entry (Card) */}
                        <div className="bg-black/80 backdrop-blur-xl border-2 border-[#00FF66]/50 rounded-3xl p-10 shadow-[0_0_50px_rgba(0,255,102,0.15)] relative overflow-visible group hover:border-[#00FF66] transition-colors">
                            <div className="absolute top-0 right-0 bg-[#00FF66] text-black text-xs font-black px-6 py-2 rounded-bl-2xl uppercase tracking-widest">Execute</div>
                            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Instant Allocation</h3>
                            <p className="text-gray-400 text-sm md:text-base mb-10 leading-relaxed">Fastest path to execution. Pay securely via corporate card or ACH to immediately trigger the NDA protocol. Acquire the Strongest Governance Software known to man.</p>
                            
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
                            <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">Bypass gateway fees. Request a formal invoice and direct SWIFT/ACH routing instructions for our institutional Wise account.</p>
                            
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
                <div className="mt-8 bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:border-white/30 transition-colors shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <h4 className="text-white font-black uppercase tracking-widest text-xl mb-3">Require Direct Interfacing?</h4>
                    <p className="text-gray-400 font-light mb-6 text-sm md:text-base px-4">
                        Complex architectures occasionally require manual parameter assessment before deployment. Initiate contact with A.I.C.E. engineering command.
                    </p>
                    <a href="https://www.aice.network/contact_us" className="inline-flex items-center justify-center gap-3 border-2 border-[#00F3FF] text-[#00F3FF] font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-[#00F3FF] hover:text-black transition-all shadow-[0_0_15px_rgba(0,243,255,0.15)]">
                        <Globe size={18} /> Contact Command Deck
                    </a>
                </div>

                {/* 3. DIAGNOSTIC ASSURANCE (RELOCATED TO RIGHT EXECUTION LANE) */}
                <div className="mt-8 p-8 border border-[#00FF66]/30 bg-[#00FF66]/10 backdrop-blur-xl rounded-3xl flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 shadow-[0_0_30px_rgba(0,255,102,0.1)] hover:border-[#00FF66]/60 transition-colors">
                    <Shield className="text-[#00FF66] shrink-0" size={36} />
                    <p className="text-gray-200 text-lg leading-relaxed">
                        <strong className="text-[#00FF66] font-bold text-xl tracking-wide block mb-2">Diagnostic Assurance</strong> 
                        If our analysis yields no material instability signature within your submitted logs, the initial diagnostic fee is credited entirely toward future governance deployment.
                    </p>
                </div>

                {/* Corporate Reality Trust Layer (NOW BOXED WITH GLASS EFFECT) */}
                <div className="mt-8 bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <div className="inline-flex items-center gap-3 text-white font-mono text-sm uppercase tracking-[0.2em] font-bold opacity-80">
                        <Globe size={16} className="text-[#00F3FF]" /> A.I.C.E. Systems Corp.
                    </div>
                    <div className="text-gray-400 font-mono text-xs mt-2 tracking-widest">
                        Registered Canadian Corporation | Corp No. 1773376-3
                    </div>
                    <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-white/10 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Lock size={12} className="text-gray-500"/> AES-256 ENCRYPTED</span>
                        <span className="flex items-center gap-2"><ShieldCheck size={12} className="text-gray-500"/> ZERO-TRUST ARCHITECTURE</span>
                    </div>
                </div>

           </div>
        </div>

        {/* FINANCIAL COMPLIANCE DECLARATION (ISOLATED TO SALES) */}
        <div className="w-full mt-12 p-6 border border-[#00F3FF]/20 bg-[#00F3FF]/5 rounded-xl text-[10px] md:text-xs text-gray-400 font-mono leading-relaxed shadow-inner">
            <strong className="text-[#00F3FF]">FINANCIAL COMPLIANCE DECLARATION:</strong> A.I.C.E. Systems Corp. is exclusively an enterprise Software-as-a-Service (SaaS) provider. We provide autonomous system monitoring and stabilization within defined computational environments. <strong className="text-white">We do not execute trades, move funds, act as a custodian, or interact directly with client financial ledgers.</strong> All licensing transactions are strictly B2B and processed via regulated, third-party Tier-1 payment gateways.
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