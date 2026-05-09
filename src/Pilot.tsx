import React, { useState, useEffect } from 'react';
import { 
  Activity, CheckCircle2, Server, Crosshair, 
  ShieldCheck, Upload, Zap, Brain, 
  X, TrendingUp, Lock, Terminal, Shield, ChevronRight, AlertTriangle
} from 'lucide-react';
import { SectorHeader } from './App';

// --- TYPES ---
type ViewState = string | any;
type DocType = string | any;

// ──────────────────────────────────────────────────────────────
// ENTERPRISE EVALUATION TERMINAL (THE $3K AUDIT FUNNEL)
// ──────────────────────────────────────────────────────────────
export const PilotDiagnosticModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onProceed?: () => void;
}> = ({ isOpen, onClose, onProceed }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [sector, setSector] = useState<'AI_CLUSTER' | 'HFT_ENGINE' | 'SCADA_GRID' | null>(null);
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState("INITIALIZING EVALUATION ENVIRONMENT...");

  // Simulated Audit Processing
  useEffect(() => {
    if (step === 3) {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 15;
        if (currentProgress >= 100) {
          clearInterval(interval);
          setStep(4);
        } else {
          setProgress(Math.min(currentProgress, 100));
          if (currentProgress < 30) setLogText("PARSING HISTORICAL TELEMETRY LOGS...");
          else if (currentProgress < 60) setLogText("COMPUTING VECTOR GRADIENTS & ENTROPY STATE...");
          else if (currentProgress < 85) setLogText("MAPPING D.V.S. STABILITY HORIZON...");
          else setLogText("CALCULATING A.I.C.E. INTERVENTION IMPACT...");
        }
      }, 400);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setSector(null);
        setProgress(0);
      }, 500);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Render content based on selected sector
  const getSectorData = () => {
    switch (sector) {
      case 'AI_CLUSTER':
        return {
          title: "GPU INFERENCE CLUSTER",
          failure: "Recursive Cognitive Drift (Hallucination)",
          rawLoss: "$14,240 / hr",
          aiceSaved: "$14,112 (99.1%)",
          intervention: "Impedance applied at t=14ms. Convergence forced before load cascade."
        };
      case 'HFT_ENGINE':
        return {
          title: "MATCHING ENGINE",
          failure: "Micro-structural Flash Crash (Liquidity Vacuum)",
          rawLoss: "$1.4M Slippage",
          aiceSaved: "$1.38M (98.5%)",
          intervention: "Dynamic latency injected at p=0.95. Predatory order flow suppressed."
        };
      case 'SCADA_GRID':
        return {
          title: "POWER SUBSTATION",
          failure: "Frequency Oscillation (Load Imbalance)",
          rawLoss: "Critical Hardware Fatigue",
          aiceSaved: "Oscillations Dampened 41%",
          intervention: "Synthetic inertia injected via inverter bridging. Laminar flow restored."
        };
      default:
        return { title: "", failure: "", rawLoss: "", aiceSaved: "", intervention: "" };
    }
  };

  const sData = getSectorData();

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10 animate-in fade-in duration-300">
      <div className="w-full max-w-6xl h-full max-h-[90vh] bg-[#050505] border border-[#00F3FF]/30 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,243,255,0.15)] flex flex-col relative font-sans">
        
        {/* HUD Scanline Effect */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
        
        {/* HEADER BAR */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#020202] relative z-10">
          <div className="flex items-center gap-4">
            <Terminal size={24} className="text-[#00F3FF]" />
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-gray-500 uppercase">A.I.C.E. Diagnostic Protocol</div>
              <div className="text-white font-bold text-xl tracking-wide uppercase">Historical Audit Evaluation</div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-[#00F3FF] transition-colors">
            <X size={28} />
          </button>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 overflow-auto p-8 relative z-10 flex flex-col justify-center">
          
          {/* STEP 1: SELECT INFRASTRUCTURE */}
          {step === 1 && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto w-full">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">Select Evaluation Environment</h2>
                <p className="text-gray-400 font-light text-lg">Choose a high-volatility infrastructure profile to simulate an A.I.C.E. post-mortem audit.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'AI_CLUSTER', label: 'GPU CLUSTER / LLM', icon: <Brain size={40} className="mb-4 text-white group-hover:text-[#00F3FF] transition-colors" /> },
                  { id: 'HFT_ENGINE', label: 'HIGH-VELOCITY TRANSACTIONS', icon: <TrendingUp size={40} className="mb-4 text-white group-hover:text-[#00F3FF] transition-colors" /> },
                  { id: 'SCADA_GRID', label: 'SCADA POWER GRID', icon: <Zap size={40} className="mb-4 text-white group-hover:text-[#00F3FF] transition-colors" /> }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setSector(item.id as any); setStep(2); }}
                    className="group bg-[#0a0a0a] border border-white/10 hover:border-[#00F3FF]/50 p-10 rounded-xl transition-all duration-300 text-left flex flex-col justify-between h-48"
                  >
                    {item.icon}
                    <div className="text-lg font-bold text-gray-300 group-hover:text-white transition-colors">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: UPLOAD LOGS */}
          {step === 2 && (
            <div className="animate-in fade-in duration-500 max-w-3xl mx-auto w-full text-center">
              <div className="inline-flex items-center gap-3 bg-black border border-[#00F3FF]/30 px-6 py-2 rounded-full mb-10">
                <span className="font-mono text-xs font-bold tracking-widest text-[#00F3FF] uppercase">TARGET ACQUIRED: {sData.title}</span>
              </div>
              
              <div 
                className="border-2 border-dashed border-white/20 bg-[#0a0a0a] rounded-2xl p-20 cursor-pointer hover:border-[#00F3FF]/50 hover:bg-[#00F3FF]/5 transition-all duration-300"
                onClick={() => setStep(3)}
              >
                <Upload size={48} className="mx-auto text-gray-500 mb-6" />
                <div className="text-2xl font-bold text-white mb-2">Upload Historical Failure Log</div>
                <div className="text-gray-500 font-mono text-sm uppercase tracking-widest mb-6">.JSON or .CSV format (Simulated)</div>
                <div className="text-xs text-[#00F3FF] font-mono bg-[#00F3FF]/10 inline-block px-4 py-2 rounded">CLICK ANYWHERE TO SIMULATE UPLOAD</div>
              </div>
            </div>
          )}

          {/* STEP 3: PROCESSING */}
          {step === 3 && (
            <div className="max-w-2xl mx-auto w-full text-center">
              <Activity size={64} className="mx-auto text-[#00F3FF] animate-pulse mb-10" />
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-[#00F3FF] transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-[#00F3FF] font-mono text-sm tracking-widest uppercase animate-pulse">{logText}</div>
            </div>
          )}

          {/* STEP 4: AUDIT RESULTS */}
          {step === 4 && (
            <div className="animate-in slide-in-from-bottom-8 duration-700 max-w-5xl mx-auto w-full">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-8 border-b border-white/10 pb-4 flex items-center gap-4">
                <ShieldCheck className="text-[#00FF66]" size={32} /> Audit Complete: A.I.C.E. Projection
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Unmitigated Reality */}
                <div className="bg-[#0a0a0a] border border-red-500/30 rounded-xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                  <div className="text-red-500 font-mono text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2"><AlertTriangle size={14}/> Raw Historical Log (Unmitigated)</div>
                  <div className="space-y-6">
                    <div>
                      <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Failure Mode</div>
                      <div className="text-white font-medium text-lg">{sData.failure}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Estimated Operational Loss</div>
                      <div className="text-red-500 font-black text-3xl">{sData.rawLoss}</div>
                    </div>
                  </div>
                </div>

                {/* AICE Projection */}
                <div className="bg-[#00151a] border border-[#00FF66]/40 rounded-xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(0,255,102,0.1)]">
                  <div className="absolute top-0 left-0 w-2 h-full bg-[#00FF66]"></div>
                  <div className="text-[#00FF66] font-mono text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2"><CheckCircle2 size={14}/> A.I.C.E. Deterministic Veto</div>
                  <div className="space-y-6">
                    <div>
                      <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">Mathematical Intervention</div>
                      <div className="text-white font-medium text-lg">{sData.intervention}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">Capital Preserved</div>
                      <div className="text-[#00FF66] font-black text-3xl">{sData.aiceSaved}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#050505] border border-[#00F3FF]/30 p-8 rounded-xl text-center">
                <p className="text-gray-300 font-light text-lg mb-8 max-w-3xl mx-auto">
                  This post-mortem analysis demonstrates the deterministic financial impact of the A.I.C.E. protocol. Deploy the active API to prevent these losses in real-time.
                </p>
                <button 
                  onClick={() => { onClose(); if (onProceed) onProceed(); }}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-[#00F3FF] text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-colors rounded shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                >
                  REQUEST Entropic Risk Valuation [E.R.V.] A.P.I. QUOTE <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────
// V8: PILOT SALES INTERFACE (THE $3,000 AUDIT TRAP)
// ──────────────────────────────────────────────────────────────
export const Pilot_Program: React.FC<{ onBuy: (product: string) => void }> = ({ onBuy }) => {
  const [showDiagnostic, setShowDiagnostic] = useState(false);

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-24 px-4 md:px-8 relative overflow-hidden flex flex-col items-center">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#00F3FF]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="text-center max-w-5xl mx-auto mb-20 z-10 relative mt-8">
        <div className="inline-flex items-center gap-3 border border-[#00F3FF]/50 bg-[#00F3FF]/10 px-6 py-2.5 rounded-full mb-10 shadow-[0_0_30px_rgba(0,243,255,0.2)]">
          <Activity size={20} className="text-[#00F3FF] animate-pulse" />
          <span className="text-sm md:text-base font-mono tracking-[0.25em] text-[#00F3FF] uppercase font-black">Zero-Risk System Verification</span>
        </div>

        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8 drop-shadow-2xl leading-none">
          The Entropic <span className="text-[#00F3FF] drop-shadow-[0_0_20px_rgba(0,243,255,0.4)]">Stress Test</span>
        </h2>

        <p className="text-gray-100 text-2xl md:text-3xl font-medium max-w-4xl mx-auto leading-relaxed border-l-4 border-[#00F3FF] pl-8 text-left bg-gradient-to-r from-[#00F3FF]/10 to-transparent py-6 shadow-inner">
          Catastrophic infrastructure failure is never spontaneous. It is preceded by microscopic fractures in algorithmic stability. We do not wait for the crash. We preempt it.
          <span className="block mt-8 text-white font-black text-3xl md:text-4xl leading-tight">
            <span className="text-[#00F3FF]">Identify the breaking point before it executes.</span> Submit your operational telemetry for a 14-day diagnostic cycle. We will isolate the exact structural vulnerabilities in your network and provide the mathematical roadmap to absolute stabilization.
          </span>
        </p>
      </div>

      <div className="bg-[#050505]/95 backdrop-blur-3xl border-2 border-[#00F3FF]/20 p-10 md:p-16 rounded-[3rem] w-full max-w-6xl relative z-10 shadow-[0_0_80px_rgba(0,0,0,1)] mb-24 group hover:border-[#00F3FF]/50 transition-all duration-700">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              
              <div className="space-y-12">
                  <div>
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-white mb-10 flex items-center gap-4 border-b border-white/10 pb-6">
                          <Terminal size={32} className="text-[#00F3FF]" /> What You Receive
                      </h3>
                      <ul className="space-y-8 font-sans text-lg md:text-xl text-gray-300">
                          <li className="flex items-start gap-6 group/item">
                              <Crosshair className="text-[#00F3FF] mt-1 shrink-0 group-hover/item:scale-125 transition-transform" size={28}/>
                              <div>
                                  <span className="text-white font-black block mb-2 text-2xl uppercase tracking-wide">Divergence Mapping</span>
                                  <span className="font-light leading-relaxed">Pinpointing the exact moment system stress broke operational parameters.</span>
                              </div>
                          </li>
                          <li className="flex items-start gap-6 group/item">
                              <Activity className="text-[#00F3FF] mt-1 shrink-0 group-hover/item:scale-125 transition-transform" size={28}/>
                              <div>
                                  <span className="text-white font-black block mb-2 text-2xl uppercase tracking-wide">Impedance Analysis</span>
                                  <span className="font-light leading-relaxed">Revealing exactly where A.I.C.E. would have intercepted the data to prevent collapse.</span>
                              </div>
                          </li>
                          <li className="flex items-start gap-6 group/item">
                              <ShieldCheck className="text-[#00F3FF] mt-1 shrink-0 group-hover/item:scale-125 transition-transform" size={28}/>
                              <div>
                                  <span className="text-white font-black block mb-2 text-2xl uppercase tracking-wide">Mitigation Roadmap</span>
                                  <span className="font-light leading-relaxed">Actionable, mathematical steps for applying predictive governance to your architecture.</span>
                              </div>
                          </li>
                      </ul>
                  </div>
              </div>

              <div className="flex flex-col justify-center lg:pl-16 lg:border-l-2 border-white/10 relative">
                  
                  {/* The Guarantee Box - Upscaled */}
                  <div className="mb-12 p-8 border-2 border-[#00FF66]/50 bg-[#00FF66]/5 rounded-3xl relative overflow-hidden shadow-[0_0_40px_rgba(0,255,102,0.15)] transform hover:scale-[1.02] transition-transform duration-500">
                      <div className="absolute top-0 left-0 w-3 h-full bg-[#00FF66]"></div>
                      <h4 className="text-[#00FF66] font-mono text-lg font-black tracking-widest uppercase mb-4 flex items-center gap-3">
                          <Lock size={24} /> Ironclad Guarantee
                      </h4>
                      <p className="text-white text-lg md:text-xl font-light leading-relaxed">
                          If we cannot identify a material instability signature in your submitted logs, your <span className="font-black text-[#00FF66] border-b-2 border-[#00FF66]">diagnostic baseline fee</span> is credited entirely toward any future API deployment.
                      </p>
                  </div>

                  <div className="text-center mb-10">
                      <div className="text-gray-400 font-mono text-sm font-bold tracking-[0.3em] uppercase mb-4">Starting Diagnostic Baseline</div>
                      <div className="text-6xl md:text-7xl font-black text-white drop-shadow-2xl tracking-tighter">$15,000+</div>
                  </div>
                  
                  <button 
                      onClick={() => setShowDiagnostic(true)}
                      className="w-full py-8 bg-[#00F3FF] text-black font-black uppercase tracking-[0.2em] text-xl hover:bg-white hover:scale-[1.03] transition-all rounded-2xl shadow-[0_0_50px_rgba(0,243,255,0.5)] flex items-center justify-center gap-4 relative overflow-hidden group"
                  >
                      <div className="absolute inset-0 w-full h-full bg-white/30 -translate-x-full group-hover:animate-[shimmer_1s_forwards]"></div>
                      <Upload size={28} className="text-black" /> SUBMIT FAILURE LOGS
                  </button>
                  <p className="text-center text-xs text-gray-500 font-mono mt-8 uppercase tracking-[0.3em] flex justify-center items-center gap-3 font-bold">
                      <ShieldCheck size={16} className="text-[#00F3FF]" /> Secure Terminal // ISO 27001 Compliant
                  </p>
              </div>
          </div>
      </div>

      <PilotDiagnosticModal 
        isOpen={showDiagnostic} 
        onClose={() => setShowDiagnostic(false)} 
        onProceed={() => {
          // This routes them from the terminal simulation to the actual purchase/sales screen
          onBuy('TIER_1'); 
        }} 
      />
    </div>
  );
};

// ──────────────────────────────────────────────────────────────
// ENTERPRISE SOLUTIONS (THE Entropic Risk Valuation [E.R.V.] PRICING LADDER)
// ──────────────────────────────────────────────────────────────
export const PilotProgramView: React.FC<{ onOpenDoc: (type: DocType) => void, setView: (v: ViewState) => void }> = ({ onOpenDoc, setView }) => (
  <div className="relative z-10 pt-28 pb-32 px-6 min-h-screen flex flex-col items-center">
    <SectorHeader title="Enterprise Solutions" subtitle="Deployment & Licensing Architecture" icon={<Server size={48} className="text-[#00F3FF]" />} />
    
    <div className="max-w-[95rem] w-full flex flex-col gap-12 mt-12">
        
        {/* TIER 1: The Freezer Burn Live Diagnostic (MASSIVE HERO CARD) */}
        <div className="bg-[#050505]/90 backdrop-blur-xl border-2 border-orange-500 rounded-[2rem] p-10 lg:p-16 flex flex-col lg:flex-row gap-12 relative group shadow-[0_0_50px_rgba(255,69,0,0.15)] hover:shadow-[0_0_80px_rgba(255,69,0,0.3)] transition-all duration-500 overflow-hidden z-20">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-50 pointer-events-none"></div>
            
            <div className="flex-1 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/20 border border-orange-500 text-orange-500 font-black tracking-widest uppercase rounded-full text-[10px] md:text-xs mb-6 shadow-[0_0_15px_rgba(255,69,0,0.4)]">
                    <Zap size={14} className="animate-pulse" /> Freezer Burn Live Diagnostic
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
                    The Entropic <br/><span className="text-orange-500 drop-shadow-[0_0_15px_rgba(255,69,0,0.5)]">Stress Test</span>
                </h3>
                <div className="text-3xl font-mono font-bold text-white mb-6">$15k+ <span className="text-sm text-gray-500 uppercase tracking-widest font-sans font-medium">Variable Base</span></div>
                <p className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed font-light border-l-4 border-orange-500 pl-6">
                    Step into the vanguard of 2026 infrastructure. The <strong className="text-white">Freezer Burn Protocol</strong> is a state-of-the-art diagnostic engine that physically isolates and neutralizes computational entropy. Watch your system's hidden vulnerabilities come to life, get diagnosed, and mathematically solved in real-time. This is the technology actively shaping the future of global stability.
                </p>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
                <ul className="space-y-6 mb-10 text-base text-gray-300 font-mono font-medium">
                    <li className="flex items-center gap-4"><CheckCircle2 className="text-orange-500 shrink-0" size={24} /> <span>Mandatory Baseline Requirement</span></li>
                    <li className="flex items-center gap-4"><CheckCircle2 className="text-orange-500 shrink-0" size={24} /> <span>Live Mathematical Divergence Mapping</span></li>
                    <li className="flex items-center gap-4"><CheckCircle2 className="text-orange-500 shrink-0" size={24} /> <span>Establishes Custom Entropic Risk Valuation (E.R.V.)</span></li>
                </ul>
                <button onClick={() => setView('FREEZER_BURN')} className="w-full py-6 bg-orange-500 text-black font-black uppercase tracking-[0.2em] text-sm md:text-base hover:bg-white transition-all rounded-xl shadow-[0_0_30px_rgba(255,69,0,0.4)] flex items-center justify-center gap-3 group/btn">
                    <Activity size={20} className="group-hover/btn:animate-ping" /> INITIATE FREEZER BURN AUDIT
                </button>
            </div>
        </div>
        
        {/* TIERS 2 & 3: (SIDE BY SIDE GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 z-10">
            {/* TIER 2: Enterprise SaaS */}
            <div className="bg-[#020202]/90 backdrop-blur-xl border-2 border-[#00F3FF] rounded-[2rem] p-10 flex flex-col relative group shadow-[0_0_50px_rgba(0,243,255,0.15)] hover:shadow-[0_0_80px_rgba(0,243,255,0.25)] transition-all duration-500">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00F3FF] text-black text-xs font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-[0_0_20px_rgba(0,243,255,0.5)]">Core B2B License</div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 mt-2">Enterprise API</h3>
                
                <div className="mb-8">
                    <div className="text-4xl md:text-5xl font-black text-[#00F3FF] tracking-tighter">Dynamic Base</div>
                    <div className="text-xs text-[#00F3FF]/70 font-mono tracking-widest uppercase mt-3 bg-[#00F3FF]/10 inline-block px-3 py-1 rounded">Calculated via Entropic Risk Valuation (E.R.V.)</div>
                </div>

                <p className="text-gray-300 text-base mb-10 leading-relaxed font-light">Active, closed-loop runtime guardrails deployed via API. Licensing is dynamically priced using the <strong className="text-white">Entropic Risk Valuation (E.R.V.) Matrix</strong> based on infrastructure liability and data volume.</p>
                <ul className="space-y-4 mb-12 flex-grow text-sm text-white font-mono">
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[#00F3FF] shrink-0 mt-1" size={18} /> <span>Requires Diagnostic Completion</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[#00F3FF] shrink-0 mt-1" size={18} /> <span>Live Telemetry API Proxies</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[#00F3FF] shrink-0 mt-1" size={18} /> <span>Automated System Throttling</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[#00F3FF] shrink-0 mt-1" size={18} /> <span>NIST RMF Compliance Logs</span></li>
                </ul>
                <div className="mt-auto">
                  <button onClick={() => setView('SALES')} className="w-full py-5 bg-[#00F3FF] text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all rounded-xl shadow-[0_0_30px_rgba(0,243,255,0.4)]">View API Architecture</button>
                </div>
            </div>
            
            {/* TIER 3: Sovereign */}
            <div className="bg-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 flex flex-col relative group hover:border-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <div className="absolute top-6 right-6 text-[10px] text-red-500 font-mono font-bold tracking-widest uppercase border border-red-500/30 px-3 py-1.5 rounded-full bg-red-500/10 flex items-center gap-1"><Lock size={12}/> Class S</div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Strategic Infra.</h3>
                <div className="text-5xl font-mono font-bold text-white mb-8">Custom</div>
                <p className="text-gray-400 text-base mb-10 leading-relaxed font-light">Air-gapped, compiled binary deployment for massive Sovereign-class networks. Built for maximum security and zero network latency.</p>
                <ul className="space-y-4 mb-12 flex-grow text-sm text-gray-300 font-mono">
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-white shrink-0" size={18} /> Air-Gapped / On-Premise</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-white shrink-0" size={18} /> Hardware Entropy Models</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-white shrink-0" size={18} /> Source Code Escrow Agreement</li>
                </ul>
                <div className="mt-auto">
                  <button onClick={() => setView('SALES')} className="w-full py-5 border border-white/20 text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all rounded-xl">Request Custom Entropic Risk Valuation (E.R.V.)</button>
                </div>
            </div>
        </div>
    </div>
  </div>
);