import React, { useState, useEffect, useRef } from 'react';
import { 
  ClipboardCheck, MoveDown, Globe, Flame, AlertTriangle, 
  ShieldCheck, Zap, CheckCircle2, ArrowRight, Activity, Database, Download
} from 'lucide-react';
import { SectorHeader } from './App';

// --- HIGH-PERFORMANCE SCROLL WRAPPER (KILLS STUTTERING) ---
const FadeInSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setVisible] = useState(true);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      style={{ willChange: 'transform, opacity' }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.98]'
      }`}
    >
      {children}
    </div>
  );
};

type ViewState = 'HOME' | 'ADAPTIVE' | 'INTELLIGENCE' | 'ENTROPY' | 'CONTROL' | 'SYSTEM' | 'SALES' | 'PROFILE' | 'HOW_IT_WORKS' | 'DEVELOPERS' | 'ADMIN' | 'PILOT_PROGRAMS' | 'BOOK' | 'INSTITUTIONAL' | 'FREEZER_BURN' | 'TERMS_OF_SERVICE'| 'REFUND_POLICY' | 'TELEMETRY' | 'CATASTROPHE' | 'MATRIX_PDF';

const SMALLER_HEADER_CLASS = "text-2xl md:text-4xl lg:text-7xl";

export const HowItWorksView: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => {
  const HOW_IT_WORKS_BG = "/assets/images/How it Works/How it works.png";
  const AICE_LOGO_IMG = "/assets/images/How it Works/AICE.jpg"; 

  const PROTOCOL_IMGS = {
    DIAGNOSTIC: "/assets/images/How it Works/How it Works 5.jpg",
    CALIBRATION: "/assets/images/How it Works/How it Works 7.jpg",
    INTEGRATION: "/assets/images/How it Works/How it Works 6.jpg", 
    ACTIVATION: "/assets/images/How it Works/How it Works 2.jpg"   
  };

  const INDUSTRIES = [
    { num: "01", name: "Generative AI", fixes: ["PREVENTS MODEL COLLAPSE", "DAMPENS HALLUCINATIONS", "STABILIZES COGNITIVE DRIFT"] },
    { num: "02", name: "Nuclear Fusion", fixes: ["STABILIZES PLASMA FLUX", "OPTIMIZES MAGNETIC VETO", "PREVENTS THERMAL OVERLOAD"] },
    { num: "03", name: "Power Grids", fixes: ["ABSORBS VOLTAGE SURGES", "SYNCS PHASE FREQUENCY", "INJECTS VIRTUAL INERTIA"] },
    { num: "04", name: "High-Velocity Tx", fixes: ["STOPS FLASH CRASHES", "GOVERNS ORDER DENSITY", "DAMPENS VOLATILITY FEEDBACK"] },
    { num: "05", name: "Blockchains", fixes: ["PREVENTS FORK DRIFT", "STABILIZES GAS FLUCTUATION", "SECURES CONSENSUS TIMING"] },
    { num: "06", name: "Autonomous Drones", fixes: ["BLOCKS SWARM COLLISION", "GOVERNS KINETIC JERK", "MAINTAINS FLIGHT ENVELOPE"] },
    { num: "07", name: "Smart Cities", fixes: ["BALANCES LOAD SPIKES", "STABILIZES TRAFFIC FLOW", "GOVERNS SENSOR ENTROPY"] },
    { num: "08", name: "Telecommunications", fixes: ["PREVENTS PACKET LOSS", "STABILIZES SIGNAL JITTER", "DAMPENS NETWORK NOISE"] },
    { num: "09", name: "6G Networks", fixes: ["REDUCES LATENCY JITTER", "STABILIZES BEAMFORMING", "GOVERNS MESH TOPOLOGY"] },
    { num: "10", name: "Cloud Compute", fixes: ["OPTIMIZES RESOURCE DISTRIBUTION", "PREVENTS RESOURCE HANGS", "STABILIZES VM MIGRATION"] },
    { num: "11", name: "Semiconductors", fixes: ["REDUCES LEAKAGE CURRENT", "STABILIZES CLOCK SKEW", "GOVERNS LOGIC THROTTLING"] },
    { num: "12", name: "Cybersecurity", fixes: ["DETECTS DDOS PATTERNS", "BLOCKS ENTROPY ATTACKS", "STABILIZES FIREWALL LOAD"] },
    { num: "13", name: "Aerospace", fixes: ["STABILIZES TURBULENCE", "GOVERNS FLIGHT PHYSICS", "PREVENTS SENSOR SINGULARITY"] },
    { num: "14", name: "Emergency Response", fixes: ["OPTIMIZES DISPATCH FLOW", "STABILIZES RESOURCE MESH", "GOVERNS CRISIS TELEMETRY"] },
    { num: "15", name: "Sustainable Energy", fixes: ["BALANCES GRID INTERMITTENCY", "STABILIZES STORAGE DISCHARGE", "GOVERNS SOURCE COHERENCE"] },
    { num: "16", name: "Biotechnology", fixes: ["STABILIZES PROTEIN FOLD", "GOVERNS GENE EXPRESSION", "REDUCES FOLDING NOISE"] },
    { num: "17", name: "Genomics", fixes: ["REDUCES SEQUENCING NOISE", "STABILIZES DATA READS", "GOVERNS VARIANT DETECTION"] },
    { num: "18", name: "Robotic Surgery", fixes: ["ELIMINATES MOTOR TREMOR", "STABILIZES KINEMATIC JERK", "GOVERNS TISSUE FEEDBACK"] },
    { num: "19", name: "Neuralink Ops", fixes: ["PREVENTS SEIZURE SPIKES", "STABILIZES BCI SIGNALS", "GOVERNS NEURAL FEEDBACK"] },
    { num: "20", name: "Quantum Error", fixes: ["CORRECTS QUBIT DECOHERENCE", "STABILIZES GATE TIMING", "GOVERNS QUANTUM ENTROPY"] },
    { num: "21", name: "Supply Chain", fixes: ["PREVENTS BULLWHIP EFFECT", "STABILIZES DEMAND FLUX", "GOVERNS VENDOR COHERENCE"] },
    { num: "22", name: "Logistics", fixes: ["OPTIMIZES ROUTE ENTROPY", "STABILIZES DELIVERY FLOW", "GOVERNS FREIGHT DENSITY"] },
    { num: "23", name: "Maritime Shipping", fixes: ["STABILIZES FUEL BURN", "GOVERNS VESSEL TRIM", "PREVENTS CARGO SHIFT"] },
    { num: "24", name: "Automotive", fixes: ["PREVENTS BRAKE FADE", "STABILIZES ABS LOGIC", "GOVERNS STEER-BY-WIRE"] },
    { num: "25", name: "EV Batteries", fixes: ["STOPS HEAT ESCALATION", "STABILIZES CHARGE RATE", "GOVERNS VOLTAGE DROP"] },
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

  return (
    <div className="relative z-10 pt-12 pb-24 px-4 min-h-screen">
      <div className="fixed inset-0 z-[-1] pointer-events-none transform-gpu will-change-transform">
         <img src={HOW_IT_WORKS_BG} alt="Chaos vs Security" className="w-full h-full object-cover opacity-100" />
         <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="max-w-[95rem] mx-auto text-center mb-16 relative animate-in zoom-in duration-1000">
        <div className="inline-flex items-center gap-3 border border-[#00F3FF]/50 bg-black/80 px-6 py-2 rounded-full mb-6 backdrop-blur-xl shadow-[0_0_20px_rgba(0,243,255,0.2)]">
            <div className="w-2 h-2 bg-[#00F3FF] rounded-full animate-ping"></div>
            <span className="text-[#00F3FF] font-mono text-xs md:text-sm tracking-[0.3em] uppercase font-black">A.I.C.E. PROTOCOL: ONLINE</span>
        </div>
        <div className="mb-12 space-y-4">
          <h1 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
             We Are Done Playing Defense.
          </h1>
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-[#00F3FF] uppercase tracking-tighter leading-none drop-shadow-[0_0_35px_rgba(0,243,255,0.6)]">
             The Purge of Chaos Begins Now.
          </h1>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-gray-400 uppercase tracking-widest leading-none mt-6">
             The Mechanics of Invulnerability.
          </h2>
        </div>

        <div className="max-w-5xl mx-auto bg-[#050505]/90 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden group hover:border-[#00F3FF]/40 transition-colors duration-500">
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#00F3FF]/50 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-orange-500/50 rounded-br-3xl"></div>
            
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-6 flex items-center gap-4">
                <ShieldCheck className="text-[#00F3FF] shrink-0" size={32} />
                How the Governor Eliminates Systemic Threats Worldwide
            </h3>
            
            <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
              We do not rely on probabilistic firewalls or reactive patches. The <span className="text-[#00F3FF] font-bold">Adaptive Governor</span> operates at the physics layer of your data flow. By mapping the distance to chaos in real-time, A.I.C.E. mathematically forces volatile systems to remain in a state of absolute operational equilibrium.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-32">
          <SectorHeader title="Operational Architecture" subtitle="The Four Pillars of Stability" icon={<ShieldCheck size={48} />} titleClass={SMALLER_HEADER_CLASS} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                  { step: "01", title: "THE THREAT // ENTROPY SPIKE", desc: "Systemic instability emerges. Be it recursive AI hallucinations, latency bottlenecks, or grid voltage anomalies, the architecture begins to fracture under chaotic load.", img: PROTOCOL_IMGS.DIAGNOSTIC },
                  { step: "02", title: "THE RADAR // AUTONOMOUS DETECTION", desc: "The Adaptive Governor maps the risk surface. Using multi-layer signal ingestion, A.I.C.E. measures the 'heat' and volatility of incoming data before it ever hits your critical logic gates.", img: PROTOCOL_IMGS.CALIBRATION },
                  { step: "03", title: "THE VETO // ALGORITHMIC INTERVENTION", desc: "We do not negotiate with deviance. A.I.C.E. executes a deterministic veto, applying precise mathematical impedance to dampen the anomaly and neutralize the divergence instantly.", img: PROTOCOL_IMGS.INTEGRATION },
                  { step: "04", title: "HOMEOSTASIS // ABSOLUTE STABILIZATION", desc: "The system returns to a safe operating state. Volatility is eliminated, compliance is validated, and absolute operational continuity is secured without manual human intervention.", img: PROTOCOL_IMGS.ACTIVATION }
              ].map((s, i) => (
                  <div key={i} className="bg-[#050505] border border-white/10 rounded-3xl overflow-hidden hover:border-[#00F3FF] transition-all duration-500 group relative flex flex-col h-full shadow-2xl">
                      <div className="h-64 overflow-hidden relative border-b border-white/10">
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                          <img src={s.img} alt={s.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-110" />
                          <div className="absolute top-4 left-4 z-20 text-6xl font-black text-white/10 group-hover:text-[#00F3FF]/20 transition-colors select-none">{s.step}</div>
                      </div>
                      <div className="p-8 flex flex-col flex-grow bg-gradient-to-b from-[#080808] to-black">
                          <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-wide group-hover:text-[#00F3FF] transition-colors">{s.title}</h3>
                          <p className="text-gray-300 text-lg leading-relaxed font-light border-l-2 border-white/20 pl-4 group-hover:border-[#00F3FF] transition-all">{s.desc}</p>
                      </div>
                  </div>
              ))}
          </div>
      </div>
{/* THE GUARDIAN PORTAL: SUPERHERO WINDOW */}
      <FadeInSection>
          <div className="max-w-6xl mx-auto my-32 relative group">
              {/* Holographic Glow Layer */}
              <div className="absolute inset-0 bg-[#00F3FF]/5 blur-[60px] rounded-full group-hover:bg-[#00F3FF]/10 transition-all duration-1000"></div>
              
              <div className="relative bg-black/80 backdrop-blur-3xl border-2 border-[#00F3FF]/30 rounded-[3rem] p-10 md:p-20 overflow-hidden shadow-[0_0_80px_rgba(0,243,255,0.15)] group-hover:border-[#00F3FF]/60 transition-all duration-700">
                  {/* Scanline Effect Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,243,255,0.05)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
                  
                  <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-24 h-24 bg-black border-2 border-[#00F3FF] rounded-full flex items-center justify-center mb-10 shadow-[0_0_30px_#00F3FF] animate-[pulse_3s_ease-in-out_infinite]">
                          <ShieldCheck size={48} className="text-[#00F3FF]" />
                      </div>
                      
                      <h4 className="text-[#00F3FF] font-mono text-sm tracking-[0.4em] uppercase font-bold mb-6">Identity Confirmed // System Protector</h4>
                      
                      <p className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[1.1]">
                          A.I.C.E. is the <span className="text-[#00F3FF] drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]">ultimate digital guardian</span>—engineered to save human infrastructure from catastrophic failure and secure the future of global data.
                      </p>
                      
                      <div className="mt-12 h-1 w-40 bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent"></div>
                  </div>
              </div>
          </div>
      </FadeInSection>
      <div className="mb-20">
        <div className="max-w-[95rem] mx-auto bg-[#050505]/90 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl transform-gpu" style={{ contain: 'content' }}>
            <div className="w-full text-center mb-16 animate-in zoom-in duration-700">
                <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black border-4 border-[#00F3FF]/20 mb-8 text-[#00F3FF] shadow-[0_0_50px_rgba(0,243,255,0.4)] animate-[pulse_4s_ease-in-out_infinite] relative z-10">
                    <Globe size={48} />
                </div>
                
                <h1 className={`${SMALLER_HEADER_CLASS} font-sans font-black text-white uppercase tracking-tighter mb-4 leading-none drop-shadow-2xl`} style={{ textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 4px 4px 0px rgba(0,0,0,0.5)' }}>
                    Universal Applicability
                </h1>

                <div className="max-w-4xl mx-auto bg-white/5 border-y border-white/10 py-6 mb-10 backdrop-blur-sm">
                    <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-widest">
                        TOP 50 INDUSTRIAL SECTORS BELOW
                    </h2>
                    <p className="text-[#00F3FF] font-mono text-sm md:text-xl mt-2 tracking-widest font-bold">
                        (A.I.C.E. PROTOCOL IS MISSION-CRITICAL TO 120 GLOBAL SECTORS)
                    </p>
                </div>

                <div className="inline-block bg-[#00F3FF]/10 border border-[#00F3FF]/30 px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(0,243,255,0.15)]">
                    <p className="text-[#00F3FF] font-mono tracking-[0.2em] md:tracking-[0.4em] text-xs md:text-sm uppercase font-bold" style={{ textShadow: '1px 1px 0px #000, 0 0 10px rgba(0,243,255,0.8)' }}>
                        Hover to Reveal Prevention Target
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
      </div>
      <div className="max-w-[90rem] mx-auto mb-32 relative">
          <SectorHeader title="Evolution of Control" subtitle="From Reactive to Predictive" icon={<Activity size={48} />} titleClass={SMALLER_HEADER_CLASS} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch relative">
              
              {/* Visual Bridge (Desktop Only) */}
              <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
                 <div className="bg-black border border-white/10 p-4 rounded-full shadow-[0_0_30px_rgba(0,0,0,1)]">
                    <ArrowRight size={40} className="text-gray-500 opacity-50" />
                 </div>
              </div>

              {/* THE OLD WAY: PID CONTROLLER */}
              <div className="p-10 md:p-14 bg-[#0a0a0a] border border-gray-800 rounded-3xl relative flex flex-col justify-center shadow-2xl transition-all duration-500 z-10">
                  <div className="text-gray-500 font-mono text-sm tracking-widest uppercase mb-6 font-bold border-b border-gray-800 pb-2 self-start">20th Century Standard</div>
                  <h3 className="text-4xl md:text-5xl font-black text-gray-300 uppercase mb-6 tracking-tight">The PID Controller</h3>
                  <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 font-light">
                      (Proportional-Integral-Derivative). The backbone of industrial automation for 100 years. It worked by measuring an error *after* it happened and trying to correct it.
                  </p>
                  <ul className="space-y-5 text-base md:text-lg text-red-400/80 font-mono font-medium">
                      <li className="flex items-start gap-4"><span className="text-red-500 font-bold mt-1 text-xl">✕</span> <span><strong className="text-gray-300">REACTIVE:</strong> Only fixes problems that already exist.</span></li>
                      <li className="flex items-start gap-4"><span className="text-red-500 font-bold mt-1 text-xl">✕</span> <span><strong className="text-gray-300">LINEAR:</strong> Fails in complex, chaotic systems.</span></li>
                      <li className="flex items-start gap-4"><span className="text-red-500 font-bold mt-1 text-xl">✕</span> <span><strong className="text-gray-300">SLOW:</strong> Too much latency for the speed of light.</span></li>
                  </ul>
              </div>

              {/* THE NEW WAY: A.I.C.E. CONTROLLER */}
              <div className="p-10 md:p-14 bg-black border-2 border-[#00F3FF] rounded-3xl relative shadow-[0_0_60px_rgba(0,243,255,0.2)] flex flex-col justify-center transform lg:scale-105 z-20 overflow-hidden">
                  {/* Subtle inner glow, strictly opaque */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00F3FF]/10 via-transparent to-transparent pointer-events-none"></div>
                  
                  <div className="absolute top-8 right-8 text-[#00F3FF] animate-pulse drop-shadow-[0_0_10px_#00F3FF]"><Zap size={32} /></div>
                  <div className="text-[#00F3FF] font-mono text-sm tracking-widest uppercase mb-6 font-bold border-b border-[#00F3FF]/30 pb-2 self-start relative z-10">21st Century Innovation</div>
                  <h3 className="text-4xl md:text-5xl font-black text-white uppercase mb-6 tracking-tight drop-shadow-lg relative z-10">The A.I.C.E. Controller</h3>
                  <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-10 font-light relative z-10">
                      A Predictive Impedance Governor. We do not wait for the error. We calculate the <span className="text-[#00F3FF] font-bold border-b border-[#00F3FF]/50">Distance to Chaos</span> and apply "Impedance" to the information flow *before* the crash occurs.
                  </p>
                  <ul className="space-y-5 text-base md:text-lg text-[#00F3FF] font-mono font-medium relative z-10">
                      <li className="flex items-start gap-4"><CheckCircle2 className="text-[#00F3FF] shrink-0 mt-1" size={24} /> <span><strong className="text-white">PREDICTIVE:</strong> Stiffens the system before the break.</span></li>
                      <li className="flex items-start gap-4"><CheckCircle2 className="text-[#00F3FF] shrink-0 mt-1" size={24} /> <span><strong className="text-white">NON-LINEAR:</strong> Thrives in high-entropy environments.</span></li>
                      <li className="flex items-start gap-4"><CheckCircle2 className="text-[#00F3FF] shrink-0 mt-1" size={24} /> <span><strong className="text-white">INSTANT:</strong> Zero-latency physics-based correction.</span></li>
                  </ul>
              </div>

          </div>
      </div>

      <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <div className="p-10 bg-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="flex items-center gap-4 text-orange-500 font-mono text-xs tracking-widest uppercase mb-6"><AlertTriangle size={16} /> The Executive Mandate</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-8">Eradicating <br/> <span className="text-[#00F3FF]">System Latency</span></h2>
              <p className="text-lg text-gray-300 font-light leading-relaxed">Enterprise decision-makers can no longer rely on human reaction times to patch catastrophic failures. A.I.C.E. transforms theoretical risk management into <span className="text-[#00F3FF] font-bold">conclusive evidence</span> of systemic stability, enforcing hardware-level governance without manual input.</p>
          </div>
          <div className="grid gap-6">
              <div className="p-8 bg-[#050505]/80 backdrop-blur-xl border-l-4 border-orange-500 rounded-r-2xl border-y border-r border-white/5 group hover:border-orange-500/50 transition-all">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white"><span className="text-orange-500">01 //</span> Eliminate Human Error</h3>
                    <Flame size={32} className="text-orange-500"/>
                  </div>
                  <p className="text-gray-300">Human-in-the-loop interventions are too slow for hypersonic data vectors. We automate the override.</p>
              </div>
              <div className="flex justify-center -my-3 z-10 relative"><div className="bg-black border border-white/20 p-2 rounded-full"><MoveDown className="text-white" /></div></div>
              <div className="p-8 bg-[#00151a]/90 backdrop-blur-xl border-l-4 border-[#00F3FF] rounded-r-2xl border-y border-r border-[#00F3FF]/30 shadow-[0_0_30px_rgba(0,243,255,0.1)]">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white"><span className="text-[#00F3FF]">02 //</span> Guaranteed Continuity</h3>
                    <ShieldCheck size={32} className="text-[#00F3FF]"/>
                  </div>
                  <p className="text-gray-300">The infrastructure is locked in a deterministic state. Financial, operational, and kinetic continuity is secured.</p>
              </div>
          </div>
      </div>

      <div className="text-center mt-20 pb-20 relative">
          <div className="w-full max-w-[100rem] mx-auto px-0 md:px-6 relative z-30 mt-12 mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          <div className="w-full bg-[#050505]/95 backdrop-blur-3xl border-y md:border border-white/10 md:rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] relative group transition-all duration-700 hover:border-[#00F3FF]/40 hover:shadow-[0_0_100px_rgba(0,243,255,0.15)] flex justify-center">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay pointer-events-none z-0"></div>
              <img 
                  src="/assets/images/How it Works/AICEfunction.png" 
                  alt="A.I.C.E. Function Infographic" 
                  className="w-full h-auto object-cover relative z-10"
              />
          </div>
      </div>

          <p className="text-white text-lg mb-8 font-mono uppercase tracking-widest relative z-20 -mt-12 md:-mt-20 bg-black/40 backdrop-blur-sm inline-block px-6 py-2 rounded-full border border-white/10">
              Civilization is ready for the upgrade. Are you?
          </p>
          
          <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto px-4">
            
            {/* MEGA CARD 1: INITIATE (THE SUPERHERO ACTION) */}
            <button 
              onClick={() => setView('SALES')}
              className="group relative flex flex-col items-center justify-center p-12 bg-gradient-to-b from-[#00F3FF]/10 to-black border-2 border-[#00F3FF]/50 hover:border-[#00F3FF] hover:bg-[#00F3FF]/20 transition-all duration-500 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,243,255,0.15)] hover:shadow-[0_0_80px_rgba(0,243,255,0.4)] overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="w-24 h-24 bg-[#00F3FF] rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_#00F3FF] group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <ShieldCheck size={48} className="text-black" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest mb-4 group-hover:text-[#00F3FF] transition-colors relative z-10 text-center drop-shadow-md">
                    Initiate A.I.C.E. Protocol
                </h3>
                <p className="text-gray-300 font-medium text-lg md:text-xl leading-relaxed text-center max-w-md relative z-10">
                    🐦‍🔥 Deploy the ultimate digital guardian. Secure your infrastructure from catastrophic entropy and save your network.
                </p>
                <div className="mt-10 flex items-center gap-3 text-black bg-[#00F3FF] group-hover:bg-white transition-colors px-8 py-4 rounded-full font-mono text-sm font-bold tracking-widest uppercase relative z-10 shadow-lg">
                    SECURE THE GRID <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </div>
            </button>
            
            {/* MEGA CARD 2: PROOFS (THE EVIDENCE) */}
            <button 
              onClick={() => setView('TELEMETRY')}
              className="group relative flex flex-col items-center justify-center p-12 bg-gradient-to-b from-white/5 to-black border-2 border-white/20 hover:border-white/60 transition-all duration-500 rounded-[2.5rem] shadow-2xl hover:shadow-[0_0_60px_rgba(255,255,255,0.1)] overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="w-24 h-24 bg-black border-4 border-white rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <Activity size={48} className="text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest mb-4 transition-colors relative z-10 text-center drop-shadow-md">
                    View Mathematical Proofs
                </h3>
                <p className="text-gray-400 font-medium text-lg md:text-xl leading-relaxed text-center max-w-md relative z-10 group-hover:text-gray-200 transition-colors">
                    Do not take our word for it. Enter the Telemetry Vault and witness the conclusive evidence of chaos eradicated.
                </p>
                <div className="mt-10 flex items-center gap-3 text-white border-2 border-white group-hover:bg-white group-hover:text-black transition-colors px-8 py-4 rounded-full font-mono text-sm font-bold tracking-widest uppercase relative z-10">
                    ENTER THE VAULT <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </div>
            </button>
            
          </div>
      </div>

      <div className="flex justify-center mt-20 mb-12 relative z-10">
          <div className="relative w-full max-w-2xl mx-auto p-2 bg-[#001a1f] border border-[#00F3FF]/40 rounded-2xl shadow-[0_0_40px_rgba(0,243,255,0.3)] group hover:shadow-[0_0_60px_rgba(0,243,255,0.5)] hover:border-[#00F3FF] transition-all duration-700">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-black border border-[#00F3FF] rounded-full flex items-center justify-center gap-2 shadow-[0_0_15px_#00F3FF] z-20">
                  <div className="w-1.5 h-1.5 bg-[#00F3FF] rounded-full animate-ping"></div>
                  <span className="text-[#00F3FF] font-mono text-[9px] font-bold tracking-[0.2em] uppercase">Architecture Blueprint</span>
              </div>
              <img 
                  src="/assets/images/How it Works/How it Works 3.png" 
                  alt="AICE SYSTEM ARCHITECTURE" 
                  className="w-full h-auto object-contain rounded-xl relative z-10 opacity-90 group-hover:opacity-100 filter brightness-110 contrast-125" 
              />
          </div>
      </div>

      {/* --- RE-ALIGNED 120 SECTOR MATRIX UPLINK --- */}
      <div className="w-full flex justify-center mt-8 mb-24 relative z-20 animate-in zoom-in duration-700">
          <button 
              onClick={() => setView('MATRIX_PDF')}
              className="group relative flex items-center gap-6 px-10 py-5 bg-[#050505] border-2 border-[#00F3FF]/40 hover:border-[#00F3FF] transition-all rounded-[1.5rem] shadow-[0_0_30px_rgba(0,243,255,0.1)] hover:shadow-[0_0_60px_rgba(0,243,255,0.3)] overflow-hidden"
          >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              <Database size={28} className="text-[#00F3FF] group-hover:scale-110 transition-transform relative z-10" />
              <div className="flex flex-col text-left relative z-10 border-l border-white/10 pl-6">
                  <span className="text-[#00F3FF] font-mono text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase mb-1">
                      View All 120 Supported Frameworks
                  </span>
                  <span className="text-white font-black tracking-widest uppercase text-sm md:text-lg">
                      Enter Global Infrastructure Matrix
                  </span>
              </div>
              <ArrowRight size={24} className="text-gray-500 group-hover:text-white group-hover:translate-x-2 transition-all ml-4 relative z-10" />
          </button>
      </div>

    </div>
  );
};