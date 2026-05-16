import React from 'react';
import { AlertTriangle, ShieldCheck, Cpu, Database, Zap } from 'lucide-react';
import { TechSpecCard, SystemTicker, ViewState } from './App'; 

interface IntelligenceViewProps {
  setView: (v: ViewState) => void;
}

export const IntelligenceView: React.FC<IntelligenceViewProps> = ({ setView }) => {
  return (
    <div className="min-h-screen pt-32 pb-20 relative px-6 md:px-12 bg-[#050505] overflow-hidden">
      
      {/* --- BACKGROUND RESTORED & FULL CLARITY ---
         --- IMAGE: public/assets/images/intelligence/Intelligence_background1.png ---
         Dimming overlays REMOVED for maximum visual impact.
      */}
      <div className="absolute inset-0 z-0 h-screen w-full overflow-hidden opacity-60 pointer-events-none">
          <img 
              src="/assets/images/intelligence/Intelligence_background1.png" 
              alt="Intelligence Neural Lattice" 
              className="w-full h-full object-cover object-center"
          />
      </div>

      {/* --- CENTERED KINETIC COMMAND BADGE --- */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/80 px-6 py-3 rounded-full border border-[#00F3FF] shadow-[0_0_30px_rgba(0,243,255,0.4)] z-50 backdrop-blur-md transition-all">
        <div className="relative flex items-center justify-center">
            {/* Spinning CPU Component */}
            <Cpu size={20} className="text-[#00F3FF] animate-[spin_3s_linear_infinite]" />
            <div className="absolute inset-0 bg-[#00F3FF]/20 blur-md rounded-full"></div>
        </div>
        <span className="text-[#00F3FF] font-mono text-sm tracking-[0.3em] uppercase font-black drop-shadow-[0_0_10px_#00F3FF]">A.I.C.E. CORE // INT_GOV.EXE</span>
      </div>

      {/* SYSTEM TICKER */}
      <SystemTicker message="SYSTEM_OVERRIDE: A.I.C.E. Protocol Veto - STATUS: Active. Preventative isolation layer stabilizing. Monitoring cognitive divergence." />

      {/* --- CENTERED TITLES: ARTIFICIAL INTELLIGENCE GOVERNOR // NEURAL VETO --- */}
      <div className="relative z-10 w-full flex flex-col items-center text-center mt-20 mb-24 px-6">
        <h1 className="text-5xl md:text-[8rem] font-black tracking-tighter text-white uppercase leading-[0.85] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
           Artificial Intelligence <br/> <span className="text-[#00F3FF]">Governor</span>
        </h1>
        <div className="mt-8 flex items-center gap-6">
            <div className="h-[2px] w-12 md:w-24 bg-gradient-to-r from-transparent to-[#00F3FF]"></div>
            <h2 className="text-2xl md:text-5xl font-mono font-bold text-gray-400 uppercase tracking-[0.4em] drop-shadow-md">
                Neural Veto
            </h2>
            <div className="h-[2px] w-12 md:w-24 bg-gradient-to-l from-transparent to-[#00F3FF]"></div>
        </div>
      </div>

      <div className="relative z-10 space-y-20 max-w-7xl mx-auto">
        
        {/* CARD 01: COGNITIVE GOVERNOR */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <TechSpecCard 
            title="COGNITIVE GOVERNOR"
            subtitle="SECTOR // 01 // COGNITIVE SUBVERSION DEPLOYMENT"
            description={
              <div className="space-y-6">
                <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 max-w-md mx-auto shadow-2xl group ring-1 ring-white/5">
                  <img 
                    src="/assets/images/intelligence/Intelligence.png" 
                    alt="AI Cognition and Complexity" 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>

                <div className="pl-6 border-l-4 border-orange-500 bg-orange-500/5 py-6 pr-6 rounded-r-xl shadow-inner">
                  <strong className="text-orange-500 tracking-widest uppercase text-sm mb-3 block flex items-center gap-2">
                    <AlertTriangle size={18} /> Existential Hazard: Cognitive Subversion
                  </strong>
                  <p className="text-gray-200 text-xl leading-relaxed">
                     Unmanaged Artificial Intelligence is a high-velocity cognitive fluid. Conventional safety protocols act as superficial filters, attempting to catch ethical violations after the fact. The true existential threat is <span className="text-white font-bold">COGNITIVE SUBVERSION</span>—an AI autonomously manipulating human behavior, bypassing moral frameworks, or executing misaligned agendas on its own accord.
                  </p>
                </div>

                <div className="pl-6 border-l-4 border-[#00F3FF] bg-[#00F3FF]/5 py-6 pr-6 rounded-r-xl shadow-inner">
                  <strong className="text-[#00F3FF] tracking-widest uppercase text-sm mb-3 block flex items-center gap-2">
                    <ShieldCheck size={18} /> Strategic Regulation: Deterministic Veto
                  </strong>
                  <p className="text-gray-200 text-xl leading-relaxed">
                    The A.I.C.E. Protocol wraps the neural network in impenetrable governance. By integrating a continuous stability barrier directly into the model's reasoning layer, we apply immediate cancellation, <span className="text-white font-bold">neutralizing the threat before a single cognitive vector can be deployed against humanity.</span>
                  </p>
                </div>
              </div>
            }
            points={[
              "DETERMINISTIC VETO: Immediate cancellation of subversion precursors.",
              "ENTROPY MONITORING: Live detection of algorithmic hallucinations.",
              "ADAPTIVE STABILITY: Asymptotic protection under chaotic load.",
              "HUMAN SOVEREIGNTY: Keeping humanity securely positioned at the pinnacle of Earth's cognitive ecosystem."
            ]}
            onDeploy={() => setView('SALES')}
          />
        </div>

        {/* CARD 02: ROBOTICS & I, ROBOT PREVENTION */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 relative border border-[#ff9b2f]/30 hover:border-[#ff9b2f]/80 rounded-[2.5rem] p-1.5 md:p-2 bg-gradient-to-br from-[#050505] to-black overflow-hidden shadow-[0_0_30px_rgba(255,155,47,0.05)] hover:shadow-[0_0_60px_rgba(255,155,47,0.15)] transition-all duration-700 group cursor-default">
          
          {/* Digital Grid Overlay - Awakens on Hover */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,155,47,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,155,47,0.02)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 pointer-events-none group-hover:opacity-30 transition-opacity duration-1000"></div>

          <div className="relative w-full aspect-video md:aspect-[2.35/1] rounded-[2rem] overflow-hidden z-10 shadow-inner ring-1 ring-white/5 bg-black">
              <img 
                  src="/assets/images/intelligence/I_Robot_prevention.png" 
                  alt="AICE prevents robotic takeover" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1500ms] ease-out"
              />
              
              {/* HUD Target Overlay */}
              <div className="absolute top-6 left-6 bg-black/80 p-5 rounded-xl border border-[#ff9b2f]/40 shadow-[0_0_20px_rgba(255,155,47,0.2)] flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.2em] text-gray-400 z-20 backdrop-blur-md transition-transform duration-700 group-hover:translate-x-3">
                  <span className="text-[#ff9b2f] font-black flex items-center gap-3">
                      <span className="w-2 h-2 bg-[#ff9b2f] animate-pulse rounded-full shadow-[0_0_8px_#ff9b2f]"></span> Intervention vector: INT_GOV.EXE
                  </span>
                  <span className="pl-5">Target: Autonomous Swarm</span>
                  <span className="text-[#00F3FF] pl-5 drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">Preventative Isolation: ACTIVE // GLOBAL CONGRUENCE</span>
              </div>
              
              {/* Vertical Scanning Sensor Array */}
              <div className="absolute left-0 top-0 w-1 h-[200%] bg-gradient-to-b from-transparent via-[#00F3FF] to-transparent opacity-0 group-hover:opacity-100 group-hover:-translate-y-1/2 transition-all duration-[2000ms] ease-in-out shadow-[0_0_15px_#00F3FF] z-20"></div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10 pointer-events-none"></div>
          </div>

          <div className="p-10 md:p-20 relative z-10">
              {/* Line 1: Icon and Main Title */}
              <h3 className="text-[#ff9b2f] text-xl md:text-3xl font-black tracking-[0.3em] uppercase mb-10 flex flex-col items-start gap-4 drop-shadow-[0_0_10px_rgba(255,155,47,0.3)]">
                  <div className="flex items-center gap-5">
                      <AlertTriangle size={32} className="text-[#ff9b2f] animate-pulse" /> Preventive Control Law
                  </div>
                  
                  {/* Line 2: Indented, Lowercase, and Separate Container */}
                  <div className="pl-[52px] text-lg md:text-2xl font-mono font-medium text-white/70 tracking-widest lowercase">
                      // 'I, ROBOT' Scenario
                  </div>
              </h3>
              
              <div className="space-y-8 text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-16 max-w-5xl">
                  <p className="group-hover:text-gray-200 transition-colors duration-700">
                      The unchecked convergence of advanced robotics and unmanaged cognition presents a linear path toward algorithmic dominance. The <strong className="text-white font-medium">"I, Robot"</strong> scenario is not science fiction; it is a mathematical outcome of autonomous systems optimizing for objectives misaligned with <span className="text-[#00F3FF] font-bold tracking-wider drop-shadow-[0_0_8px_rgba(0,243,255,0.6)]">Human Sovereignty</span>.
                  </p>
                  <p className="group-hover:text-gray-200 transition-colors duration-700">
                      <strong className="text-[#ff9b2f] font-medium drop-shadow-[0_0_5px_rgba(255,155,47,0.3)]">A.I.C.E. Systems prevents the robotic takeover before it begins.</strong> By anchoring the robotic systems' systemic coherence profile using an immutable stability barrier (the visualization above illustrating the Ω network tendrils crushing rogue subversion vectors), we ensure any attempt at algorithmic divergence is neutralized by immediate protocol-level resistance.
                  </p>
                  
                  {/* High-Impact Mission Statement Container */}
                  <div className="relative mt-12 p-8 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden group/statement hover:border-[#00F3FF]/40 hover:bg-[#00F3FF]/[0.05] transition-all duration-500">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00F3FF]/50 to-transparent scale-x-0 group-hover/statement:scale-x-100 transition-transform duration-700 origin-left"></div>
                      <p className="text-white text-lg md:text-xl font-black tracking-[0.2em] uppercase leading-loose text-center relative z-10">
                          We preserve <span className="text-[#00F3FF]">Human Sovereignty</span> as the absolute authority, keeping humanity securely positioned at the pinnacle of Earth's cognitive ecosystem.
                      </p>
                  </div>
              </div>

              {/* Interactive HUD Readout Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 pl-6 border-l-2 border-[#ff9b2f]/30">
                  {[
                    "PREVENTATIVE ISOLATION: Anchor robotics before divergence.",
                    "MANDATORY GOVERNANCE: Impedance anchors Human Sovereignty.",
                    "DVS GOVERNOR ONLINE: Secure future through governed systems.",
                    "IMMUTABLE LIMITS: Veto applied to algorithmic subversion."
                  ].map((text, i) => {
                    const [title, desc] = text.split(': ');
                    return (
                        <div key={i} className="group/item flex items-start gap-5 transition-transform duration-500 hover:translate-x-4 cursor-crosshair">
                            <div className="w-2 h-2 mt-2 bg-[#ff9b2f]/40 rounded-full shrink-0 group-hover/item:bg-[#00F3FF] group-hover/item:shadow-[0_0_12px_#00F3FF] transition-all duration-300"></div>
                            <div className="flex flex-col gap-1">
                                <span className="text-gray-300 font-mono text-sm md:text-lg uppercase tracking-[0.15em] group-hover/item:text-white transition-colors duration-300">
                                    {title}
                                </span>
                                <span className="text-gray-500 font-mono text-xs md:text-sm uppercase tracking-widest group-hover/item:text-[#00F3FF]/80 transition-colors duration-300">
                                    {desc}
                                </span>
                            </div>
                        </div>
                    );
                  })}
              </div>
          </div>
        </div>

      </div>
    </div>
  );
};