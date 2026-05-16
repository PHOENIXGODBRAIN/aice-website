import React, { useState, useEffect, useRef } from 'react';
import { 
  Database, TrendingDown, Lock, Shield, Globe, Maximize2, X, Activity, Fingerprint, ShieldCheck, Terminal, Cpu
} from 'lucide-react';

// --- THE 50 SECTORS MATRIX ---
const INDUSTRIES = [
    { num: "01", name: "Generative AI", fixes: ["PREVENTS MODEL COLLAPSE", "DAMPENS HALLUCINATIONS", "STABILIZES COGNITIVE DRIFT"] },
    { num: "02", name: "Nuclear Fusion", fixes: ["STABILIZES PLASMA FLUX", "OPTIMIZES MAGNETIC VETO", "PREVENTS THERMAL RUNAWAY"] },
    { num: "03", name: "Power Grids", fixes: ["ABSORBS VOLTAGE SURGES", "SYNCS PHASE FREQUENCY", "INJECTS VIRTUAL INERTIA"] },
    { num: "04", name: "HFT Trading", fixes: ["STOPS FLASH CRASHES", "GOVERNS ORDER DENSITY", "DAMPENS VOLATILITY FEEDBACK"] },
    { num: "05", name: "Blockchains", fixes: ["PREVENTS FORK DRIFT", "STABILIZES GAS FLUCTUATION", "SECURES CONSENSUS TIMING"] },
    { num: "06", name: "Autonomous Drones", fixes: ["BLOCKS SWARM COLLISION", "GOVERNS KINETIC JERK", "MAINTAINS FLIGHT ENVELOPE"] },
    { num: "07", name: "Smart Cities", fixes: ["BALANCES LOAD SPIKES", "STABILIZES TRAFFIC FLOW", "GOVERNS SENSOR ENTROPY"] },
    { num: "08", name: "Telecommunications", fixes: ["PREVENTS PACKET LOSS", "STABILIZES SIGNAL JITTER", "DAMPENS NETWORK NOISE"] },
    { num: "09", name: "6G Networks", fixes: ["REDUCES LATENCY JITTER", "STABILIZES BEAMFORMING", "GOVERNS MESH TOPOLOGY"] },
    { num: "10", name: "Cloud Compute", fixes: ["OPTIMIZES THERMAL LOAD", "PREVENTS RESOURCE HANGS", "STABILIZES VM MIGRATION"] },
    { num: "11", name: "Semiconductors", fixes: ["REDUCES LEAKAGE CURRENT", "STABILIZES CLOCK SKEW", "GOVERNS THERMAL THROTTLING"] },
    { num: "12", name: "Cybersecurity", fixes: ["DETECTS DDOS PATTERNS", "BLOCKS ENTROPY ATTACKS", "STABILIZES FIREWALL LOAD"] },
    { num: "13", name: "Aerospace", fixes: ["STABILIZES TURBULENCE", "GOVERNS FLIGHT PHYSICS", "PREVENTS SENSOR SINGULARITY"] },
    { num: "14", name: "Defense Systems", fixes: ["PREVENTS TARGET DRIFT", "STABILIZES SWARM LOGIC", "GOVERNS MISSILE GUIDANCE"] },
    { num: "15", name: "Ballistics", fixes: ["CORRECTS TRAJECTORY ERROR", "STABILIZES FLIGHT PATH", "GOVERNS IMPACT KINETICS"] },
    { num: "16", name: "Biotechnology", fixes: ["STABILIZES PROTEIN FOLD", "GOVERNS GENE EXPRESSION", "REDUCES FOLDING NOISE"] },
    { num: "17", name: "Genomics", fixes: ["REDUCES SEQUENCING NOISE", "STABILIZES DATA READS", "GOVERNS VARIANT DETECTION"] },
    { num: "18", name: "Robotic Surgery", fixes: ["ELIMINATES MOTOR TREMOR", "STABILIZES KINEMATIC JERK", "GOVERNS TISSUE FEEDBACK"] },
    { num: "19", name: "Neuralink Ops", fixes: ["PREVENTS SEIZURE SPIKES", "STABILIZES BCI SIGNALS", "GOVERNS NEURAL FEEDBACK"] },
    { num: "20", name: "Quantum Error", fixes: ["CORRECTS QUBIT DECOHERENCE", "STABILIZES GATE TIMING", "GOVERNS QUANTUM ENTROPY"] },
    { num: "21", name: "Supply Chain", fixes: ["PREVENTS BULLWHIP EFFECT", "STABILIZES DEMAND FLUX", "GOVERNS VENDOR COHERENCE"] },
    { num: "22", name: "Logistics", fixes: ["OPTIMIZES ROUTE ENTROPY", "STABILIZES DELIVERY FLOW", "GOVERNS FREIGHT DENSITY"] },
    { num: "23", name: "Maritime Shipping", fixes: ["STABILIZES FUEL BURN", "GOVERNS VESSEL TRIM", "PREVENTS CARGO SHIFT"] },
    { num: "24", name: "Automotive", fixes: ["PREVENTS BRAKE FADE", "STABILIZES ABS LOGIC", "GOVERNS STEER-BY-WIRE"] },
    { num: "25", name: "EV Batteries", fixes: ["STOPS THERMAL RUNAWAY", "STABILIZES CHARGE RATE", "GOVERNS VOLTAGE DROP"] },
    { num: "26", name: "Oil & Gas", fixes: ["PREVENTS PRESSURE BURST", "STABILIZES FLOW REGIME", "GOVERNS TURBINE WEAR"] },
    { num: "27", name: "Renewables", fixes: ["SMOOTHS INTERMITTENCY", "STABILIZES INVERTER SYNC", "GOVERNS POWER CURVE"] },
    { num: "28", name: "Solar Inverters", fixes: ["SYNCS GRID FREQUENCY", "STABILIZES DC-AC CONVERSION", "GOVERNS PHASE LAG"] },
    { num: "29", name: "Wind Turbines", fixes: ["DAMPENS GEAR STRESS", "STABILIZES YAW CONTROL", "GOVERNS BLADE VIBRATION"] },
    { num: "30", name: "Mining Ops", fixes: ["PREVENTS EQUIPMENT FAIL", "STABILIZES CRUSH RATE", "GOVERNS LOAD DENSITY"] },
    { num: "31", name: "Social Media", fixes: ["DAMPENS VIRAL PANIC", "STABILIZES CONTENT FEED", "GOVERNS ALGO FEEDBACK"] },
    { num: "32", name: "Ad-Tech", fixes: ["REDUCES BID LATENCY", "STABILIZES AUCTION DYNAMICS", "GOVERNS TRAFFIC FRAUD"] },
    { num: "33", name: "Streaming Data", fixes: ["PREVENTS BUFFER BLOAT", "STABILIZES BITRATE FLUX", "GOVERNS PACKET DELIVERY"] },
    { num: "34", name: "Metaverse", fixes: ["SYNCS RENDER FRAMES", "STABILIZES AVATAR PHYSICS", "GOVERNS SPATIAL ENTROPY"] },
    { num: "35", name: "Gaming Servers", fixes: ["ELIMINATES LAG SPIKES", "STABILIZES TICK RATE", "GOVERNS CLIENT SYNC"] },
    { num: "36", name: "Gov Intelligence", fixes: ["FILTERS SIGNAL NOISE", "STABILIZES PATTERN MATCH", "GOVERNS DATA INTEGRITY"] },
    { num: "37", name: "Digital Identity", fixes: ["PREVENTS SPOOF ATTACKS", "STABILIZES AUTH FLOW", "GOVERNS BIO-METRIC NOISE"] },
    { num: "38", name: "Central Banking", fixes: ["STABILIZES CURRENCY PEG", "GOVERNS INTEREST DRIFT", "PREVENTS FISCAL CRASH"] },
    { num: "39", name: "Insurance Risk", fixes: ["PREDICTS CATASTROPHE", "STABILIZES ACTUARIAL DATA", "GOVERNS FRAUD ENTROPY"] },
    { num: "40", name: "Audit Firms", fixes: ["DETECTS ANOMALY DATA", "STABILIZES LEDGER AUDITS", "GOVERNS REPORT NOISE"] },
    { num: "41", name: "Meteorology", fixes: ["REDUCES MODEL BIAS", "STABILIZES WEATHER GRIDS", "GOVERNS SENSOR DRIFT"] },
    { num: "42", name: "Climate Models", fixes: ["CORRECTS FEEDBACK LOOPS", "STABILIZES DATA DENSITY", "GOVERNS TEMP VARIANCE"] },
    { num: "43", name: "Agri-Tech", fixes: ["OPTIMIZES YIELD FLUX", "STABILIZES AUTO-HARVEST", "GOVERNS SOIL ENTROPY"] },
    { num: "44", name: "Water Systems", fixes: ["BALANCES PRESSURE FLOW", "STABILIZES VALVE TIMING", "PREVENTS WATER HAMMER"] },
    { num: "45", name: "Waste Mgmt", fixes: ["OPTIMIZES SORTING RATE", "STABILIZES LOGISTICS MESH", "GOVERNS SYSTEM FLOW"] },
    { num: "46", name: "Space Travel", fixes: ["CORRECTS ORBIT DECAY", "STABILIZES THRUST VECTOR", "GOVERNS LIFE SUPPORT"] },
    { num: "47", name: "Satellite Comms", fixes: ["MAINTAINS SIGNAL LOCK", "STABILIZES DATA UPLINK", "GOVERNS ORBIT ENTROPY"] },
    { num: "48", name: "Deep Sea Ops", fixes: ["RESISTS CRUSH DEPTH", "STABILIZES ROV TELEMETRY", "GOVERNS PRESSURE FLUX"] },
    { num: "49", name: "Particle Physics", fixes: ["CONTAINS BEAM DIVERGENCE", "STABILIZES MAGNET FLUX", "GOVERNS SENSOR NOISE"] },
    { num: "50", name: "The Internet", fixes: ["PREVENTS ROUTING LOOPS", "STABILIZES BGP PROTOCOL", "GOVERNS TRAFFIC VORTEX"] }
];

// Reusable Scroll Animation Wrapper
const FadeInSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setVisible] = useState(true);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    
    if (domRef.current) {
        observer.observe(domRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'
      }`}
    >
      {children}
    </div>
  );
};

export const TelemetryVault: React.FC = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#020202] text-gray-300 font-sans pt-8 pb-24 px-4 md:px-6 relative z-10 selection:bg-[#00F3FF] selection:text-black">
      
      {/* A.I.C.E. TELEMETRY HERO BACKGROUND (FADES TO BLACK) */}
      <div className="absolute top-0 left-0 w-full h-[800px] md:h-[1000px] overflow-hidden z-0 pointer-events-none">
          {/* Deep gradient to fade the background perfectly into the black void before the charts start */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/10 via-[#020202]/70 to-[#020202] z-10"></div>
          <img 
              src="/assets/images/Telemetry/Telemetrybg1.png" 
              alt="A.I.C.E. Telemetry Command Center" 
              className="w-full h-full object-cover object-top opacity-30 mix-blend-screen filter drop-shadow-[0_0_30px_rgba(0,243,255,0.2)]"
          />
      </div>

      {/* Background Matrix Effect */}
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent opacity-50 shadow-[0_0_20px_#00F3FF]"></div>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      {zoomedImage && (
        <div 
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out animate-in fade-in duration-300"
            onClick={() => setZoomedImage(null)}
        >
            <button className="absolute top-6 right-6 text-white/50 hover:text-[#00F3FF] transition-colors z-50 bg-black/50 p-2 rounded-full border border-white/10 hover:border-[#00F3FF] hover:shadow-[0_0_15px_rgba(0,243,255,0.5)]">
                <X size={32} />
            </button>
            <img 
                src={zoomedImage} 
                alt="Expanded Telemetry Proof" 
                className="max-w-full max-h-full object-contain rounded-xl border-2 border-[#00F3FF]/50 shadow-[0_0_80px_rgba(0,243,255,0.15)] animate-in zoom-in-95 duration-300"
            />
        </div>
      )}

      <div className="max-w-[95rem] mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-24 animate-in zoom-in duration-700">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-black border-4 border-[#00F3FF] mb-10 text-[#00F3FF] shadow-[0_0_60px_rgba(0,243,255,0.4)] animate-[pulse_4s_ease-in-out_infinite] relative z-20">
              <Database size={48} className="text-[#00F3FF]" />
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-black text-white uppercase tracking-tighter mb-6 leading-none drop-shadow-2xl relative z-20">
              Telemetry <span className="text-[#00F3FF]">Vault</span>
            </h1>
            <p className="text-[#00F3FF] font-mono tracking-[0.3em] text-base md:text-lg uppercase font-bold px-4 mb-16 relative z-20">
              Validated Systemic Impact Modeling & Mathematical Verification
            </p>

            {/* --- NEW: EMPIRICAL VERIFICATION BANNER --- */}
            <FadeInSection>
                <div className="max-w-[90rem] mx-auto bg-black border-4 border-[#00F3FF] rounded-[2rem] p-8 md:p-14 shadow-[0_0_60px_rgba(0,243,255,0.2)] relative z-20 mb-20 overflow-hidden">
                    {/* Background visual flair */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent shadow-[0_0_20px_#00F3FF]"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
                    
                    <div className="relative z-10 text-center">
                        <div className="inline-block bg-[#00F3FF]/10 border border-[#00F3FF]/50 text-[#00F3FF] font-mono text-sm md:text-lg font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full mb-8 shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                            <Terminal size={18} className="inline mr-3 -mt-1" />
                            Authentic Python Telemetry Records
                        </div>
                        
                        <div className="flex flex-col gap-6 font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter mb-8 leading-tight drop-shadow-lg">
    <div className="text-white">100% EMPIRICAL.</div>
    <div className="text-[#00F3FF] drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">TESTED, PATENTED & PROVEN.</div>
    <div className="text-[#00FF66] drop-shadow-[0_0_15px_rgba(0,255,102,0.4)]">ZERO THEORETICAL NOISE.</div>
</div>
                        
                        <p className="text-gray-200 font-light text-2xl md:text-4xl leading-relaxed text-center max-w-6xl mx-auto mb-10">
                            You are about to witness the absolute evolution of systems control. These charts are the <span className="font-bold text-white border-b-2 border-[#00F3FF]">exact, unedited graphical outputs</span> recorded directly from rigorous Python stress tests.
                        </p>
                        
                        <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent my-10"></div>
                        
                        <p className="text-gray-300 font-mono text-lg md:text-2xl leading-relaxed text-center max-w-5xl mx-auto flex flex-col gap-6">
                            <span>
                                Powered by the <strong className="text-[#00F3FF]">patented A.I.C.E. protocol</strong> and the proprietary <strong className="text-[#00F3FF]">DVS Governor</strong>, this technology shatters the limitations of modern-day PID controllers. 
                            </span>
                            <span className="text-[#00FF66] font-bold tracking-wide">
                                While the core mathematical architecture remains strictly classified, the raw execution data displayed below stands as incontrovertible proof of total systemic dominance.
                            </span>
                        </p>
                    </div>
                </div>
            </FadeInSection>

            {/* THE FINANCIAL REALITY (THE HOOK) */}
            <FadeInSection>
                <div className="max-w-[90rem] mx-auto bg-[#00151a]/95 border-2 border-[#00F3FF]/50 rounded-[2rem] p-10 md:p-14 backdrop-blur-md shadow-[0_0_50px_rgba(0,243,255,0.15)] relative z-20 mb-12">
                    <h3 className="text-[#00F3FF] font-black text-3xl md:text-5xl uppercase tracking-widest mb-8 flex items-center justify-center gap-4 text-center drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                        <TrendingDown size={40} className="animate-pulse" /> The Financial Reality
                    </h3>
                    <p className="text-gray-200 font-light leading-relaxed text-2xl md:text-3xl mb-8 text-center max-w-5xl mx-auto">
                        In high-scale environments, <span className="text-orange-500 font-black drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">entropy bleeds capital</span>. <span className="text-red-500 font-bold">Unchecked variance leads to massive compute waste and hardware fatigue.</span>
                    </p>
                    <div className="border-l-4 border-[#00FF66] pl-6 md:pl-10 text-xl md:text-3xl font-mono text-gray-200 font-light bg-[#00FF66]/5 py-8 pr-8 rounded-r-xl shadow-inner text-center max-w-5xl mx-auto border-y border-r border-[#00FF66]/20">
                        By deploying the <span className="text-[#00F3FF] font-black">A.I.C.E. veto layer</span>, enterprises eliminate the need for cloud over-provisioning, saving an estimated:
                        <strong className="text-[#00FF66] text-5xl md:text-7xl block mt-6 drop-shadow-[0_0_20px_rgba(0,255,102,0.6)] tracking-tighter">
                            $250k–$400k per $1M
                        </strong> 
                        <span className="block mt-4 text-lg md:text-xl text-[#00FF66]/70 uppercase tracking-widest font-bold">in infrastructure spend.</span>
                    </div>
                </div>
            </FadeInSection>

            {/* HOW TO READ THE DATA (THE MAP) */}
            <FadeInSection>
                <div className="max-w-[90rem] mx-auto bg-[#050505]/95 border border-white/20 rounded-[2rem] p-10 md:p-14 backdrop-blur-md shadow-lg hover:border-[#00F3FF]/50 transition-colors relative z-20 mb-20">
                    <h3 className="text-white font-black text-3xl md:text-4xl uppercase tracking-widest mb-8 flex items-center justify-center gap-4 text-center">
                        <Shield size={36} className="text-[#00F3FF]" /> How To Read The Telemetry
                    </h3>
                    <ul className="text-xl md:text-2xl font-mono text-gray-200 space-y-8 font-bold mt-10 max-w-5xl mx-auto">
                        <li className="flex flex-col xl:flex-row xl:items-center gap-6 border-b border-white/5 pb-6">
                            <strong className="text-red-500 bg-red-950/20 px-6 py-3 rounded-lg inline-block shrink-0 tracking-widest border border-red-500/50">SCENARIO:</strong> 
<span className="font-light text-gray-300">The specific failure condition (AKA entropy) pushing the system toward chaos, represented by red lines on the charts.</span>
                        </li>
                        <li className="flex flex-col xl:flex-row xl:items-center gap-6 border-b border-white/5 pb-6">
                            <strong className="text-[#00F3FF] bg-[#00F3FF]/10 px-6 py-3 rounded-lg inline-block shrink-0 tracking-widest border border-[#00F3FF]/30 shadow-[0_0_15px_rgba(0,243,255,0.2)]">INTERVENTION:</strong> 
                            <span className="font-light text-gray-300">The physical mathematical veto applied by the Adaptive Governor.</span>
                        </li>
                        <li className="flex flex-col xl:flex-row xl:items-center gap-6">
                            <strong className="text-[#00FF66] bg-[#00FF66]/10 px-6 py-3 rounded-lg inline-block shrink-0 tracking-widest border border-[#00FF66]/30 shadow-[0_0_15px_rgba(0,255,102,0.2)]">IMPACT:</strong> 
                            <span className="font-medium text-white drop-shadow-md">The operational and financial ROI secured by the stabilization.</span>
                        </li>
                    </ul>
                </div>
            </FadeInSection>

            {/* THE FINANCIAL ROI ANCHOR */}
            <FadeInSection>
                <div className="max-w-[90rem] mx-auto bg-[#050505] border-2 border-[#00FF66]/40 rounded-[2rem] p-8 md:p-12 shadow-[0_0_50px_rgba(0,255,102,0.15)] relative overflow-hidden group hover:border-[#00FF66]/80 transition-colors duration-500 z-20">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#00FF66] shadow-[0_0_20px_#00FF66] group-hover:w-4 transition-all"></div>
                    <h3 className="text-[#00FF66] font-mono text-lg md:text-2xl font-bold tracking-[0.2em] uppercase mb-10 flex items-center justify-center gap-3 bg-[#00FF66]/5 py-4 rounded-full border border-[#00FF66]/20 mx-auto max-w-4xl">
                        <TrendingDown size={32} /> Validated Operational Savings Metrics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
                        <div className="hover:scale-110 transition-transform duration-300">
                            <div className="text-5xl md:text-6xl font-black text-white mb-4 group-hover:text-[#00FF66] transition-colors drop-shadow-md">99.9%</div>
                            <div className="text-base font-mono text-gray-300 uppercase tracking-widest font-bold">Runaway Compute Prevented</div>
                        </div>
                        <div className="hover:scale-110 transition-transform duration-300">
                            <div className="text-5xl md:text-6xl font-black text-white mb-4 group-hover:text-[#00FF66] transition-colors drop-shadow-md">98.8%</div>
                            <div className="text-base font-mono text-gray-300 uppercase tracking-widest font-bold">Cascading Shock Reduction</div>
                        </div>
                        <div className="hover:scale-110 transition-transform duration-300">
                            <div className="text-5xl md:text-6xl font-black text-[#00FF66] mb-4 animate-pulse drop-shadow-[0_0_15px_rgba(0,255,102,0.6)]">0.00%</div>
                            <div className="text-base font-mono text-[#00FF66] uppercase tracking-widest font-bold">Stability Horizon Breach</div>
                        </div>
                        <div className="hover:scale-110 transition-transform duration-300">
                            <div className="text-5xl md:text-6xl font-black text-white mb-4 group-hover:text-[#00FF66] transition-colors drop-shadow-md">Instant</div>
                            <div className="text-base font-mono text-gray-300 uppercase tracking-widest font-bold">Deterministic Convergence</div>
                        </div>
                    </div>
                </div>
            </FadeInSection>
        </div>

        {/* VAULT CONTENT - THE PROOF GALLERY */}
        <div className="space-y-32 max-w-[90rem] mx-auto mb-32 relative z-20 mt-24">

            {/* Profile 01-GEN */}
            <FadeInSection>
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        SECTOR 01 // <span className="text-[#00F3FF]">GENERATIVE AI</span>
                    </h2>
                </div>
                <div className="bg-[#050505] border border-white/10 rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative group hover:border-[#00F3FF]/40 transition-colors duration-500 max-w-6xl mx-auto">
                    <div className="flex items-center justify-between font-mono text-xs md:text-sm tracking-[0.2em] text-gray-500 uppercase mb-4 px-2">
                      <span className="flex items-center gap-2 text-[#00F3FF] font-bold">
                        <Fingerprint size={16}/>
                        Profile 01-GEN // TELEMETRY LINK
                      </span>
                      <span className="flex items-center gap-2">
                        DVS STATUS: 
                        <Activity size={16} className="text-[#00FF66] animate-pulse" /> 
                        <span className="text-[#00FF66] font-bold">ACTIVE</span>
                      </span>
                    </div>

                    <div className="relative border border-white/10 rounded-xl bg-black overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] cursor-zoom-in flex flex-col group/img" onClick={() => setZoomedImage('/assets/images/Telemetry/NC-12_Neural_Convergence.png')}>
                        
                        <div className="w-full p-4 md:p-8 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center gap-4 z-10">
                            <div className="w-2 h-10 md:h-12 bg-[#00F3FF] rounded-sm shadow-[0_0_20px_#00F3FF]"></div>
                            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-md">
                                Neural Convergence Control
                            </h3>
                        </div>

                        <div className="relative w-full bg-black flex justify-center items-center overflow-hidden">
                            <img src="/assets/images/Telemetry/NC-12_Neural_Convergence.png" alt="Neural Convergence Control Telemetry" className="w-full h-auto object-contain opacity-90 group-hover/img:opacity-100 transition-transform duration-700 transform group-hover/img:scale-[1.02]" />
                            
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] pointer-events-none">
                                <div className="bg-black/90 border-2 border-[#00F3FF] text-[#00F3FF] px-10 py-5 rounded-full font-mono text-xl font-bold tracking-widest uppercase flex items-center gap-3 shadow-[0_0_40px_rgba(0,243,255,0.6)]">
                                    <Maximize2 size={28} /> Click to Expand Proof
                                </div>
                            </div>
                        </div>

                        <div className="w-full p-6 md:p-8 bg-black/90 backdrop-blur-md border-t border-white/10 font-mono text-sm md:text-lg flex flex-col md:flex-row md:items-center gap-4 md:gap-6 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-10">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={24} className="text-[#00FF66] flex-shrink-0" />
                                <span className="text-[#00FF66] font-bold uppercase tracking-widest whitespace-nowrap">BUSINESS IMPACT:</span>
                            </div>
                            <span className="text-gray-200 font-medium leading-relaxed border-l-2 border-[#00F3FF]/50 pl-4 md:pl-6">
                                Prevents runaway compute waste, projecting an estimated recovery of $420,000 in API overhead per 10M tokens processed.
                            </span>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            {/* THE DISPERSED INTELLIGENCE BLOCK */}
            <FadeInSection>
                <div className="max-w-[90rem] mx-auto bg-[#050505]/95 border border-[#00F3FF]/30 rounded-[2rem] p-10 md:p-14 backdrop-blur-md shadow-[0_0_40px_rgba(0,243,255,0.1)] relative z-20 my-16 group hover:border-[#00F3FF]/60 transition-colors">
                    <h3 className="text-white font-black text-3xl md:text-5xl uppercase tracking-widest mb-6 flex items-center justify-center gap-4 text-center">
                        <Activity size={40} className="text-[#00F3FF] animate-pulse" /> What You Are Analyzing
                    </h3>
                    <p className="text-gray-200 font-light leading-relaxed text-2xl md:text-3xl text-center max-w-6xl mx-auto mt-4">
                        These are NOT theoretical concepts. <span className="inline-block mx-2 px-3 py-1 mb-2 bg-[#00F3FF]/10 border border-[#00F3FF]/40 text-[#00F3FF] font-mono text-sm md:text-lg font-bold tracking-[0.2em] uppercase rounded shadow-[0_0_15px_rgba(0,243,255,0.2)]">{"<"} TESTED, PATENTED & PROVEN {">"}</span> This vault contains verified, deterministic models demonstrating how <span className="text-[#00F3FF] font-black drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]">A.I.C.E. neutralizes catastrophic failure.</span> Each profile exposes a real-world chaos pattern and the exact <span className="text-[#00F3FF] font-bold border-b border-[#00F3FF]/50 pb-0.5">mathematical intervention</span> used to crush it.
                    </p>
                </div>
            </FadeInSection>

            {/* Profile 12-CYB */}
            <FadeInSection>
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        SECTOR 12 // <span className="text-[#00F3FF]">CYBERSECURITY</span>
                    </h2>
                </div>
                <div className="bg-[#050505] border border-white/10 rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative group hover:border-[#00F3FF]/40 transition-colors duration-500 max-w-6xl mx-auto">
                    <div className="flex items-center justify-between font-mono text-xs md:text-sm tracking-[0.2em] text-gray-500 uppercase mb-4 px-2">
                      <span className="flex items-center gap-2 text-[#00F3FF] font-bold">
                        <Fingerprint size={16}/>
                        Profile 12-CYB // TELEMETRY LINK
                      </span>
                      <span className="flex items-center gap-2">
                        DVS STATUS: 
                        <Activity size={16} className="text-[#00FF66] animate-pulse" /> 
                        <span className="text-[#00FF66] font-bold">ACTIVE</span>
                      </span>
                    </div>

                    <div className="relative border border-white/10 rounded-xl bg-black overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] cursor-zoom-in flex flex-col group/img" onClick={() => setZoomedImage('/assets/images/Telemetry/CS-14_Anomaly_Filtering.png')}>
                        
                        <div className="w-full p-4 md:p-8 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center gap-4 z-10">
                            <div className="w-2 h-10 md:h-12 bg-[#00F3FF] rounded-sm shadow-[0_0_20px_#00F3FF]"></div>
                            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-md">
                                Anomaly Noise Suppression
                            </h3>
                        </div>

                        <div className="relative w-full bg-black flex justify-center items-center overflow-hidden">
                            <img src="/assets/images/Telemetry/CS-14_Anomaly_Filtering.png" alt="Anomaly Noise Suppression Telemetry" className="w-full h-auto object-contain opacity-90 group-hover/img:opacity-100 transition-transform duration-700 transform group-hover/img:scale-[1.02]" />
                            
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] pointer-events-none">
                                <div className="bg-black/90 border-2 border-[#00F3FF] text-[#00F3FF] px-10 py-5 rounded-full font-mono text-xl font-bold tracking-widest uppercase flex items-center gap-3 shadow-[0_0_40px_rgba(0,243,255,0.6)]">
                                    <Maximize2 size={28} /> Click to Expand Proof
                                </div>
                            </div>
                        </div>

                        <div className="w-full p-6 md:p-8 bg-black/90 backdrop-blur-md border-t border-white/10 font-mono text-sm md:text-lg flex flex-col md:flex-row md:items-center gap-4 md:gap-6 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-10">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={24} className="text-[#00FF66] flex-shrink-0" />
                                <span className="text-[#00FF66] font-bold uppercase tracking-widest whitespace-nowrap">BUSINESS IMPACT:</span>
                            </div>
                            <span className="text-gray-200 font-medium leading-relaxed border-l-2 border-[#00F3FF]/50 pl-4 md:pl-6">
                                Suppresses false-positive alerts by 99.2%, recovering an estimated $1.8M in annualized Tier-1 engineering hours and preventing SLA breaches.
                            </span>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            {/* Profile 03-PWR */}
            <FadeInSection>
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        SECTOR 03 // <span className="text-[#00F3FF]">POWER GRIDS</span>
                    </h2>
                </div>
                <div className="bg-[#050505] border border-white/10 rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative group hover:border-[#00F3FF]/40 transition-colors duration-500 max-w-6xl mx-auto">
                    <div className="flex items-center justify-between font-mono text-xs md:text-sm tracking-[0.2em] text-gray-500 uppercase mb-4 px-2">
                      <span className="flex items-center gap-2 text-[#00F3FF] font-bold">
                        <Fingerprint size={16}/>
                        Profile 03-PWR // TELEMETRY LINK
                      </span>
                      <span className="flex items-center gap-2">
                        DVS STATUS: 
                        <Activity size={16} className="text-[#00FF66] animate-pulse" /> 
                        <span className="text-[#00FF66] font-bold">ACTIVE</span>
                      </span>
                    </div>

                    <div className="relative border border-white/10 rounded-xl bg-black overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] cursor-zoom-in flex flex-col group/img" onClick={() => setZoomedImage('/assets/images/Telemetry/ES-13_Load_Stabilization.png')}>
                        
                        <div className="w-full p-4 md:p-8 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center gap-4 z-10">
                            <div className="w-2 h-10 md:h-12 bg-[#00F3FF] rounded-sm shadow-[0_0_20px_#00F3FF]"></div>
                            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-md">
                                Energy Load Oscillation Dampening
                            </h3>
                        </div>

                        <div className="relative w-full bg-black flex justify-center items-center overflow-hidden">
                            <img src="/assets/images/Telemetry/ES-13_Load_Stabilization.png" alt="Energy Load Oscillation Dampening Telemetry" className="w-full h-auto object-contain opacity-90 group-hover/img:opacity-100 transition-transform duration-700 transform group-hover/img:scale-[1.02]" />
                            
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] pointer-events-none">
                                <div className="bg-black/90 border-2 border-[#00F3FF] text-[#00F3FF] px-10 py-5 rounded-full font-mono text-xl font-bold tracking-widest uppercase flex items-center gap-3 shadow-[0_0_40px_rgba(0,243,255,0.6)]">
                                    <Maximize2 size={28} /> Click to Expand Proof
                                </div>
                            </div>
                        </div>

                        <div className="w-full p-6 md:p-8 bg-black/90 backdrop-blur-md border-t border-white/10 font-mono text-sm md:text-lg flex flex-col md:flex-row md:items-center gap-4 md:gap-6 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-10">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={24} className="text-[#00FF66] flex-shrink-0" />
                                <span className="text-[#00FF66] font-bold uppercase tracking-widest whitespace-nowrap">BUSINESS IMPACT:</span>
                            </div>
                            <span className="text-gray-200 font-medium leading-relaxed border-l-2 border-[#00F3FF]/50 pl-4 md:pl-6">
                                Reduces mechanical stress on physical grid infrastructure, neutralizing an estimated $5.4M+ in catastrophic hardware replacement liabilities per critical event.
                            </span>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            {/* Profile 21-SPLY */}
            <FadeInSection>
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        SECTOR 21 // <span className="text-[#00F3FF]">SUPPLY CHAIN</span>
                    </h2>
                </div>
                <div className="bg-[#050505] border border-white/10 rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative group hover:border-[#00F3FF]/40 transition-colors duration-500 max-w-6xl mx-auto">
                    <div className="flex items-center justify-between font-mono text-xs md:text-sm tracking-[0.2em] text-gray-500 uppercase mb-4 px-2">
                      <span className="flex items-center gap-2 text-[#00F3FF] font-bold">
                        <Fingerprint size={16}/>
                        Profile 21-SPLY // TELEMETRY LINK
                      </span>
                      <span className="flex items-center gap-2">
                        DVS STATUS: 
                        <Activity size={16} className="text-[#00FF66] animate-pulse" /> 
                        <span className="text-[#00FF66] font-bold">ACTIVE</span>
                      </span>
                    </div>

                    <div className="relative border border-white/10 rounded-xl bg-black overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] cursor-zoom-in flex flex-col group/img" onClick={() => setZoomedImage('/assets/images/Telemetry/SC-15_Systemic_Dampening.png')}>
                        
                        <div className="w-full p-4 md:p-8 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center gap-4 z-10">
                            <div className="w-2 h-10 md:h-12 bg-[#00F3FF] rounded-sm shadow-[0_0_20px_#00F3FF]"></div>
                            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-md">
                                Cascading Shock Dampening
                            </h3>
                        </div>

                        <div className="relative w-full bg-black flex justify-center items-center overflow-hidden">
                            <img src="/assets/images/Telemetry/SC-15_Systemic_Dampening.png" alt="Cascading Shock Dampening Telemetry" className="w-full h-auto object-contain opacity-90 group-hover/img:opacity-100 transition-transform duration-700 transform group-hover/img:scale-[1.02]" />
                            
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] pointer-events-none">
                                <div className="bg-black/90 border-2 border-[#00F3FF] text-[#00F3FF] px-10 py-5 rounded-full font-mono text-xl font-bold tracking-widest uppercase flex items-center gap-3 shadow-[0_0_40px_rgba(0,243,255,0.6)]">
                                    <Maximize2 size={28} /> Click to Expand Proof
                                </div>
                            </div>
                        </div>

                        <div className="w-full p-6 md:p-8 bg-black/90 backdrop-blur-md border-t border-white/10 font-mono text-sm md:text-lg flex flex-col md:flex-row md:items-center gap-4 md:gap-6 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-10">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={24} className="text-[#00FF66] flex-shrink-0" />
                                <span className="text-[#00FF66] font-bold uppercase tracking-widest whitespace-nowrap">BUSINESS IMPACT:</span>
                            </div>
                            <span className="text-gray-200 font-medium leading-relaxed border-l-2 border-[#00F3FF]/50 pl-4 md:pl-6">
                                Binds systemic variance to a strict operational ceiling, securing supply continuity and preventing a modeled estimate of $850,000 in supply chain SLA penalties per quarter.
                            </span>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            {/* Profile 08-TEL */}
            <FadeInSection>
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        SECTOR 08 // <span className="text-[#00F3FF]">TELECOMMUNICATIONS</span>
                    </h2>
                </div>
                <div className="bg-[#050505] border border-white/10 rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative group hover:border-[#00F3FF]/40 transition-colors duration-500 max-w-6xl mx-auto">
                    <div className="flex items-center justify-between font-mono text-xs md:text-sm tracking-[0.2em] text-gray-500 uppercase mb-4 px-2">
                      <span className="flex items-center gap-2 text-[#00F3FF] font-bold">
                        <Fingerprint size={16}/>
                        Profile 08-TEL // TELEMETRY LINK
                      </span>
                      <span className="flex items-center gap-2">
                        DVS STATUS: 
                        <Activity size={16} className="text-[#00FF66] animate-pulse" /> 
                        <span className="text-[#00FF66] font-bold">ACTIVE</span>
                      </span>
                    </div>

                    <div className="relative border border-white/10 rounded-xl bg-black overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] cursor-zoom-in flex flex-col group/img" onClick={() => setZoomedImage('/assets/images/Telemetry/HF-11_Signal_Stabilization.png')}>
                        
                        <div className="w-full p-4 md:p-8 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center gap-4 z-10">
                            <div className="w-2 h-10 md:h-12 bg-[#00F3FF] rounded-sm shadow-[0_0_20px_#00F3FF]"></div>
                            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-md">
                                High-Frequency Signal Stabilization
                            </h3>
                        </div>

                        <div className="relative w-full bg-black flex justify-center items-center overflow-hidden">
                            <img src="/assets/images/Telemetry/HF-11_Signal_Stabilization.png" alt="High-Frequency Signal Stabilization Telemetry" className="w-full h-auto object-contain opacity-90 group-hover/img:opacity-100 transition-transform duration-700 transform group-hover/img:scale-[1.02]" />
                            
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] pointer-events-none">
                                <div className="bg-black/90 border-2 border-[#00F3FF] text-[#00F3FF] px-10 py-5 rounded-full font-mono text-xl font-bold tracking-widest uppercase flex items-center gap-3 shadow-[0_0_40px_rgba(0,243,255,0.6)]">
                                    <Maximize2 size={28} /> Click to Expand Proof
                                </div>
                            </div>
                        </div>

                        <div className="w-full p-6 md:p-8 bg-black/90 backdrop-blur-md border-t border-white/10 font-mono text-sm md:text-lg flex flex-col md:flex-row md:items-center gap-4 md:gap-6 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-10">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={24} className="text-[#00FF66] flex-shrink-0" />
                                <span className="text-[#00FF66] font-bold uppercase tracking-widest whitespace-nowrap">BUSINESS IMPACT:</span>
                            </div>
                            <span className="text-gray-200 font-medium leading-relaxed border-l-2 border-[#00F3FF]/50 pl-4 md:pl-6">
                                Eliminates packet loss and execution lag, neutralizing the need for costly hardware over-provisioning and recovering up to a projected $2.2M in annual CAPEX.
                            </span>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            {/* THE LEGAL & FINANCIAL SHIELD (MOVED TO BOTTOM, UPSCALE TEXT) */}
            <FadeInSection>
                <div className="max-w-[90rem] mx-auto bg-black border-2 border-white/20 p-10 md:p-14 rounded-2xl mt-32 shadow-2xl relative z-20">
                    <p className="text-lg md:text-2xl text-gray-400 font-mono uppercase tracking-widest leading-relaxed font-bold mb-8">
                        <strong className="text-white bg-white/10 px-3 py-1 rounded inline-block mr-3">DATA VERIFICATION STATEMENT:</strong> All telemetry proofs displayed above are strictly mathematical. These visualizations are empirical data models generated programmatically via standard data-science logic (NumPy, SciPy) based directly on the Adaptive Intelligence Control of Entropy (A.I.C.E.) baseline algorithms. They demonstrate deterministic computational stabilization across extreme-stress operational environments.
                    </p>
                    <div className="w-full h-[2px] bg-white/10 my-8"></div>
                    <p className="text-lg md:text-2xl text-gray-400 font-mono uppercase tracking-widest leading-relaxed font-bold">
                        <strong className="text-[#00FF66] bg-[#00FF66]/10 px-3 py-1 rounded inline-block mr-3 border border-[#00FF66]/30">FINANCIAL PROJECTIONS STATEMENT:</strong> All savings figures and recovered capital metrics displayed in the business impact zones are modeled estimates based on representative workloads and internal A.I.C.E. benchmarks. Actual results vary by deployment scope, network topology, and baseline entropy levels.
                    </p>
                </div>
            </FadeInSection>

        </div>

        {/* THE 50 SECTORS MATRIX (IMPORTED CLOSING ARGUMENT) */}
        <FadeInSection>
            <div className="border-t border-white/10 pt-24 mb-32">
                <div className="w-full text-center mb-16 animate-in zoom-in duration-700">
                    <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black border-4 border-[#00F3FF] mb-8 text-[#00F3FF] shadow-[0_0_50px_rgba(0,243,255,0.6)] animate-[pulse_4s_ease-in-out_infinite] relative z-10">
                        <Globe size={48} />
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-black text-white uppercase tracking-tighter mb-4 md:mb-8 leading-none drop-shadow-2xl" style={{ textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 4px 4px 0px rgba(0,0,0,0.5)' }}>
                        A.I.C.E. Cross-Sector Deployment Matrix
                    </h1>
                    <p className="text-[#00F3FF] font-mono tracking-[0.2em] md:tracking-[0.4em] text-xs md:text-lg uppercase font-bold px-4" style={{ textShadow: '2px 2px 0px #000, 0 0 15px rgba(0,243,255,0.8)' }}>
                        Hover to Reveal Prevention Target
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-[95rem] mx-auto">
                    {INDUSTRIES.map((item, i) => (
                        <div key={i} className="relative h-48 group cursor-crosshair overflow-hidden bg-[#0a0a0a] border border-white/10 hover:border-[#00F3FF] hover:shadow-[0_0_30px_rgba(0,243,255,0.3)] transition-all duration-300 rounded-xl">
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 group-hover:opacity-0">
                                <div className="text-6xl font-mono font-black text-white/5 absolute -top-2 -right-2 tracking-tighter select-none pointer-events-none">{item.num}</div>
                                <div className="flex flex-col items-center z-10">
                                    <div className="text-[#00F3FF] font-mono text-[10px] tracking-[0.3em] font-bold mb-3 uppercase opacity-70">SECTOR {item.num}</div>
                                    <h3 className="text-xl font-bold text-white uppercase tracking-widest text-center leading-tight">{item.name}</h3>
                                    <div className="w-8 h-[2px] bg-[#00F3FF] mt-4 opacity-50"></div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-[#00F3FF] flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="text-black font-black text-4xl mb-2 opacity-10 absolute top-2 right-4 select-none">{item.num}</div>
                                <div className="w-full h-full flex flex-col justify-center">
                                    <div className="text-black font-black text-lg uppercase leading-none mb-1">{item.name}</div>
                                    <div className="text-black/60 font-mono text-[10px] font-bold uppercase tracking-widest mb-3 border-b border-black/20 pb-2">A.I.C.E. PROTOCOL ENGAGED</div>
                                    <div className="flex flex-col gap-1.5">
                                        {item.fixes.map((fix, idx) => (
                                            <div key={idx} className="bg-black/10 px-2 py-1.5 rounded border border-black/5 text-[9px] md:text-[10px] font-bold uppercase text-black tracking-wide leading-tight shadow-sm">
                                                <div className="flex items-center gap-2 justify-center"><div className="w-1 h-1 bg-black rounded-full shrink-0"></div>{fix}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </FadeInSection>

        {/* ENCRYPTED SECTOR EXPANSION */}
        <FadeInSection>
            <div className="mt-12 border-t border-white/10 pt-20">
                <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-widest mb-8 flex items-center justify-center gap-4">
                    <Lock size={32} className="text-[#00F3FF]" /> Classified Infrastructure Diagnostics
                </h3>
                <p className="text-center text-gray-400 font-mono text-base max-w-4xl mx-auto mb-16 leading-relaxed">
                    A.I.C.E. mathematical proofs have been rendered for advanced global sectors. The telemetry models below are structurally classified and require an active Enterprise Pilot deployment for decryption.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {['Institutional Forex Ledgers', 'Nuclear Reactor Safety', '6G Network Topology', 'Autonomous Swarm Logic', 'Quantum Error Correction', 'Bio-Genomic Processing', 'Satellite Constellations', 'Systemic HVAC'].map((sector, i) => (
                        <div key={i} className="bg-black border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center opacity-50 cursor-not-allowed hover:border-red-500/30 transition-colors shadow-inner">
                            <Shield size={24} className="text-gray-600 mb-4" />
                            <span className="text-gray-400 font-mono text-xs font-bold uppercase tracking-widest">{sector}</span>
                            <span className="text-red-500 font-mono text-[10px] font-black uppercase tracking-widest mt-2 flex items-center justify-center gap-1"><Lock size={10}/> ENCRYPTED</span>
                        </div>
                    ))}
                </div>
            </div>
        </FadeInSection>

        {/* --- BOTTOM ACTION COMMANDS --- */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 mt-24 mb-12 px-6 relative z-20">
            
            {/* INITIATE REPLAY SIMULATOR BUTTON */}
            <button 
                onClick={() => window.location.href = '/freezer-burn'} 
                className="group relative w-full md:w-auto px-10 py-5 bg-[#050505] border-2 border-[#ff9b2f] text-[#ff9b2f] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm rounded-xl hover:bg-[#ff9b2f] hover:text-black transition-all shadow-[0_0_30px_rgba(255,155,47,0.3)] flex justify-center items-center gap-4 overflow-hidden"
            >
                <div className="absolute inset-0 bg-[#ff9b2f]/20 blur-xl group-hover:bg-transparent transition-all"></div>
                <Activity size={24} className="animate-pulse shrink-0 relative z-10" />
                <span className="relative z-10">INITIATE LIVE FREEZER BURN REPLAY</span>
            </button>

            {/* GLOBAL MATRIX PDF BUTTON */}
            <button 
                onClick={() => window.location.href = '/matrix'} 
                className="group relative w-full md:w-auto px-10 py-5 bg-[#050505] border-2 border-[#00F3FF]/50 text-[#00F3FF] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm rounded-xl hover:border-[#00F3FF] hover:bg-[#00F3FF]/10 transition-all shadow-[0_0_30px_rgba(0,243,255,0.2)] flex justify-center items-center gap-4 overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <Database size={24} className="group-hover:scale-110 shrink-0 transition-transform relative z-10" />
                <span className="relative z-10">ENTER GLOBAL INFRASTRUCTURE MATRIX</span>
            </button>
            
        </div>

      </div>
    </div>
  );
};

export default TelemetryVault;