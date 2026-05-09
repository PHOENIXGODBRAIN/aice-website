import React from 'react';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { SectorHeader, TechSpecCard } from './App';

export default function PhoenixPage() {
  return (
    <div className="bg-black text-white min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('/assets/images/phoenix/control.png')" }}>
      <div className="relative z-10 min-h-screen w-full pt-28 flex flex-col gap-32">
          <div className="relative w-full px-6 flex flex-col items-center">
              <SectorHeader title="Market Control" subtitle="High-Frequency Stabilization" icon={<TrendingUp size={48} />} />
              
              <TechSpecCard 
                title="FINANCIAL CONTROL THEORY"
                subtitle="SECTOR // 04"
                description="High-Frequency Trading (HFT) algorithms are susceptible to positive feedback loops that cause 'Flash Crashes'. We deploy a 'Circuit Breaker 2.0'. Instead of stopping trade, we apply Viscous Damping to the order book. Liquidity becomes 'thicker' as volatility increases, slowing the crash naturally."
                points={[
                  "Dynamic Order Book Viscosity.",
                  "Prevent algorithmic positive feedback loops.",
                  "Anti-Fragile liquidity provisioning."
                ]}
              />

              <div className="max-w-4xl w-full bg-[#050505] border border-white/10 p-14 rounded-3xl font-mono text-base md:text-lg text-green-500 overflow-hidden shadow-2xl mt-12">
                  <div className="opacity-50 mb-8 border-b border-white/10 pb-6 flex justify-between uppercase">
                      <span>AICE MONITORING</span>
                      <span className="animate-pulse">● REC</span>
                  </div>
                  <div className="space-y-4">
                      <div>[10:42:01] ORDER FLOW: NORMAL</div>
                      <div className="text-red-500 font-bold">[10:42:05] VOLATILITY SPIKE (ENTROPY &gt; 85%)</div>
                      <div className="text-[#00F3FF] font-bold">[10:42:05] VETO: TRADING PAUSED (300ms)</div>
                      <div>[10:42:07] STABILITY RESTORED.</div>
                  </div>
              </div>
          </div>
          
          <div className="relative w-full py-48 px-6 flex items-center justify-center text-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                 {/* Updated image path for the inner section background */}
                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/phoenix/phoenix.png')" }}></div>
                 <div className="absolute inset-0 bg-black/40"></div>
              </div>
              <div className="relative z-10 w-full max-w-6xl mx-auto">
                   <div className="inline-block px-4 py-1 border border-[#FF4500] rounded-full text-[#FF4500] mb-6 font-bold uppercase tracking-widest text-xs bg-black/80">CLASSIFIED PROTOTYPE</div>
                   <h2 className="text-5xl md:text-8xl font-sans font-black mb-8 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-orange-500 via-red-500 to-red-700 drop-shadow-[0_4px_10px_rgba(255,69,0,0.5)]">
                     PROJECT PHOENIX
                   </h2>
                   <p className="text-gray-100 text-xl md:text-3xl leading-relaxed max-w-4xl mx-auto mb-12 font-light italic drop-shadow-lg">
                     "We didn't just write the math; we built the machine."
                   </p>
                   <button className="px-12 py-6 bg-black/80 border border-[#FF4500] text-[#FF4500] font-mono font-bold tracking-widest uppercase hover:bg-[#FF4500] hover:text-black transition-all shadow-[0_0_30px_rgba(255,69,0,0.3)] text-sm">
                      REQUEST PERFORMANCE DATA <ChevronRight size={18} className="inline ml-2" />
                   </button>
              </div>
          </div>
      </div>
    </div>
  );
}