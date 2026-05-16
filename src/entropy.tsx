import React from 'react';
import { Aperture, Thermometer, Gauge, AlertTriangle, Activity } from 'lucide-react';
import { SectorHeader, TechSpecCard } from './App';
import type { ViewState } from './App';

const ENTROPY_DATA = [
  { 
    timestamp: "T-05000 ms", 
    title: "SYSTEM BREACH // ANOMALY DETECTED", 
    desc: "A massive influx of unstructured data violently breaches the outer containment sphere. The lithic capacitor registers aggressive thermal escalation. This is not a simulated threat; it is the raw force of cosmic variance attempting to overwhelm the planetary motherboard.", 
    img: "/assets/images/entropy/Gemini_Generated_Image_uvtn7zuvtn7zuvtn.png" 
  },
  { 
    timestamp: "T+00000 ms", 
    title: "OBELISK CORE // BASELINE", 
    desc: "System integrity at 100%. Systemic noise within nominal parameters.", 
    img: "/assets/images/entropy/download (1).jpg" 
  },
  { 
    timestamp: "T+15000 ms", 
    title: "THREAT DETECTED // BLOOM", 
    desc: "External data injection causing rapid decoherence.", 
    img: "/assets/images/entropy/download (2).jpg" 
  },
  { 
    timestamp: "T+30000 ms", 
    title: "AICE INTERVENTION // ENGAGED", 
    desc: "Entropic governor applying immediate impedance.", 
    img: "/assets/images/entropy/download (3).jpg" 
  },
  { 
    timestamp: "T+45000 ms", 
    title: "SHIELD HARMONICS // STABILIZING", 
    desc: "Instantly dissipating aggressive system anomalies to maintain deterministic homeostasis.", 
    img: "/assets/images/entropy/shield.jpg" 
  },
  { 
    timestamp: "T+60000 ms", 
    title: "CASCADE FAILURE // DIVERTED", 
    desc: "Isolating infected nodes. Grid frequency resynchronizing.", 
    img: "/assets/images/entropy/download (4).jpg" 
  },
  { 
    timestamp: "T+75000 ms", 
    title: "NEURAL RESYNC // IN PROGRESS", 
    desc: "Re-aligning logic gates to physics-based truth constraints.", 
    img: "/assets/images/entropy/download (5).jpg" 
  },
  { 
    timestamp: "T+90000 ms", 
    title: "SYSTEM HOMEOSTASIS // RESTORED", 
    desc: "Entropy levels returned to sub-critical limits.", 
    img: "/assets/images/entropy/download (6).jpg" 
  },
  { 
    timestamp: "T+105000 ms", 
    title: "PROTOCOL COMPLETE // SECURE", 
    desc: "The facility remains operational. No data loss detected.", 
    img: "/assets/images/entropy/image-2026-02-08T040614-536.jpg" 
  },
  { 
    timestamp: "T+120000 ms", 
    title: "ABSOLUTE GOVERNANCE // SECURED", 
    desc: "The Adaptive Governor finalizes the entropic purge. The Obelisk's containment field crystallizes, delivering incontrovertible proof of mathematical homeostasis. Uncompromising excellence is restored; the architecture remains unassailable.", 
    img: "/assets/images/entropy/Gemini_Generated_Image_il6dqnil6dqnil6d.png" 
  }
];

export const EntropyView: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => (
  <div className="relative z-10 pt-28 pb-24 px-6 min-h-screen">
      <SectorHeader title="Entropy Core" subtitle="The Physics of Information" icon={<Aperture size={48} />} />
      
      <TechSpecCard 
        title="NEUTRALIZATION GRID"
        subtitle="SECTOR // 03"
        description="Chaos is not a bug; it is a feature of complex systems. The goal is to channel it, not suppress it. Our 'Containment Grids' for data centers absorb volatility spikes. When a flash crash or DDoS attack hits, the AICE Protocol instantly dissipates the aggressive system anomalies to maintain impenetrable, deterministic system homeostasis."
        points={[
          "Instantly neutralize and dissipate volumetric data attacks.",
          "Isolate infected nodes without shutting down the grid.",
          "Maintain homeostasis under 400% load variance."
        ]}
        onDeploy={() => setView('SALES')}
      />

      <div className="max-w-5xl mx-auto mb-32 relative group animate-in slide-in-from-bottom-10 duration-1000 mt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00F3FF]/20 via-black/50 to-orange-600/20 blur-3xl rounded-full opacity-60"></div>
          <div className="relative bg-black/30 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center bg-white/5 p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                      <Thermometer size={16} className="text-[#00F3FF] animate-pulse"/>
                      <span className="font-mono text-xs text-[#00F3FF] tracking-[0.2em] uppercase">Reactor Core // 01</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-mono text-orange-500 uppercase tracking-widest font-bold">
                      <span className="flex items-center gap-2"><Gauge size={12}/> Pressure: 101.3 kPa</span>
                      <span className="flex items-center gap-2 text-red-500 animate-pulse"><AlertTriangle size={12} /> Heat: CRITICAL</span>
                  </div>
              </div>
              <div className="p-10 md:p-20 text-center relative">
                  <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#00F3FF]"></div>
                  <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-orange-500"></div>
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#00F3FF]"></div>
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-orange-500"></div>
                  <h3 className="text-4xl md:text-6xl font-sans font-black text-white uppercase tracking-tighter mb-8 drop-shadow-2xl">
                      System <span className="text-[#00F3FF]" style={{ textShadow: '0 0 25px rgba(0,243,255,0.8)' }}>Homeostasis</span>
                  </h3>
                  <p className="text-xl md:text-3xl font-light text-white/90 leading-relaxed drop-shadow-md mb-12 max-w-4xl mx-auto">
                    "In a closed system, entropy always increases." Information behaves like energy. Too much unchecked data creates <span className="text-orange-500 font-bold border-b-2 border-orange-500">"Noise,"</span> which is the informational equivalent of heat death.
                  </p>
                  <div className="inline-flex items-center gap-4 px-8 py-4 border border-[#00F3FF]/30 bg-[#00F3FF]/5 rounded-sm hover:bg-[#00F3FF]/10 transition-colors cursor-default">
                      <div className="w-2 h-2 rounded-full bg-[#00F3FF] animate-ping"></div>
                      <span className="text-[#00F3FF] font-mono tracking-widest uppercase text-xs font-bold">
                        Obelisk Protocol // Engaging Veto
                      </span>
                  </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-[#00F3FF] via-black to-orange-500"></div>
          </div>
      </div>
      <div className="max-w-[90rem] mx-auto space-y-32">
          {ENTROPY_DATA.map((item, idx) => {
            const [prefix, suffix] = item.title.split('//');
            return (
              <div key={idx} className={`flex flex-col md:flex-row items-center gap-16 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 relative group w-full">
                    <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
                        <img src={item.img} alt={item.title} className={`w-full transform transition-transform duration-700 group-hover:scale-105 ${idx === 8 ? 'h-auto' : 'h-[700px] object-cover object-center'}`} />
                    </div>
                  </div>
                  <div className="flex-1 w-full">
                    <div className="relative bg-black/30 border border-white/10 rounded-xl overflow-hidden shadow-2xl p-8 md:p-12 transition-all duration-500 hover:border-[#00F3FF]/30 group">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00F3FF]/50 rounded-tl-lg"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/50 rounded-tr-lg"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#00F3FF]/50 rounded-bl-lg"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-orange-500/50 rounded-br-lg"></div>
                        <div className="flex items-center gap-4 text-[#FFD700] font-mono text-xs md:text-sm tracking-widest font-bold border-b border-[#FFD700]/20 pb-4 mb-6">
                            <Activity size={18} /> <span>TIMESTAMP: {item.timestamp}</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-sans font-bold text-white uppercase leading-tight mb-6">
                            {prefix} //{suffix && <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-[#00F3FF]">{suffix}</span>}
                        </h3>
                        <p className="text-gray-200 text-lg leading-relaxed pl-6 border-l-4 border-[#00F3FF] font-light">
                           {item.desc}
                        </p>
                    </div>
                  </div>
              </div>
            );
          })}
      </div>

      <div className="max-w-[90rem] mx-auto mt-24">
          <div 
              onClick={() => setView('CATASTROPHE')}
              className="w-full bg-red-950/20 border border-red-500/30 rounded-3xl p-10 md:p-16 text-center flex flex-col items-center shadow-[0_0_40px_rgba(255,0,0,0.1)] group hover:border-red-500/60 transition-colors cursor-pointer"
          >
              <AlertTriangle size={48} className="text-red-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest mb-6">Observe The Fallout</h3>
              <p className="text-lg text-gray-300 font-light max-w-3xl mb-10">
                 Theoretical entropy is harmless until it breaches the threshold of infrastructure tolerance. View the conclusive evidence of human latency and the resulting multi-billion dollar casualties.
              </p>
          </div>
      </div>

  </div>
);