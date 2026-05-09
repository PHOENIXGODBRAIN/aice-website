import React from 'react';
import { Terminal, Code, Shield, Cpu, Lock, Server, ArrowRight } from 'lucide-react';

interface DeveloperProps {
  setView: (view: any) => void;
}

export const Developer: React.FC<DeveloperProps> = ({ setView }) => {
  return (
    /* 1. SECTOR ISOLATION: bg-transparent allows the master background layer to anchor the view */
    <div className="min-h-screen bg-transparent text-gray-300 font-sans pt-24 pb-20 px-4 sm:px-6 relative z-10 overflow-hidden">
      
      {/* 2. ATMOSPHERIC SHUTTER: High-density black gradient masks shards at the top for zero-drift focus */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#000000] via-[#000000]/95 to-transparent pointer-events-none h-full"></div>

      {/* 3. LATTICE ANCHOR: Cyber-Archaeology grid work remains visible for aesthetic coherence */}
      <div className="absolute inset-0 z-1 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#00F3FF 1px, transparent 1px), linear-gradient(90deg, #00F3FF 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER BLOCK: Sovereign Shadowing applied to kill flicker background interference */}
        <header className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border border-[#00F3FF]/40 text-[#00F3FF] text-xs font-bold tracking-[0.2em] uppercase mb-6 font-mono rounded shadow-[0_0_15px_rgba(0,243,255,0.4)]">
            <Terminal size={14} /> Developer Portal
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-2xl"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,1)' }}>
            A.I.C.E. Integration & <span className="text-[#00F3FF]" style={{ textShadow: '0 0 15px rgba(0,243,255,0.6)' }}>SDK Docs</span>
          </h1>
          
          {/* NEURAL SHIELD: Intro text wrapped in high-contrast glass for instant cognitive ingestion */}
          <div className="bg-black/70 backdrop-blur-xl p-6 rounded-xl border border-white/10 max-w-3xl shadow-2xl">
            <p className="text-xl text-white font-light leading-relaxed">
              Implement the Deviance Viscosity Stabilizer (DVS) middleware into your existing architecture. Secure autonomous systems and complex neural networks against finite-time singularities.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* PRIMARY ARCHITECTURE: Bumped to bg-black/95 to permanently isolate data from background noise */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Sector 01: Middleware Overview */}
            <section className="bg-black/95 backdrop-blur-2xl border border-white/10 rounded-xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] relative overflow-hidden group hover:border-[#00F3FF]/50 transition-all">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00F3FF] to-transparent"></div>
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-3"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}>
                <Server className="text-[#00F3FF]" /> Middleware Architecture
              </h2>
              <p className="text-gray-100 leading-relaxed mb-6 font-medium">
                The A.I.C.E. Protocol operates as a non-intrusive wrapper. It intercepts standard telemetry outputs and returns a dynamically calculated impedance coefficient to govern systemic flow. 
              </p>
              <div className="bg-black p-6 rounded border border-gray-800 font-mono text-xs md:text-sm text-gray-400 overflow-x-auto shadow-inner">
                <span className="text-orange-500 font-bold">Host_System</span> <ArrowRight className="inline mx-2" size={14}/> 
                <span className="text-[#00F3FF] font-bold">AICE_Telemetry_Adapter</span> <ArrowRight className="inline mx-2" size={14}/> 
                <span className="text-white font-bold">DVS_Governor (Air-Gapped)</span> <ArrowRight className="inline mx-2" size={14}/> 
                <span className="text-green-500 font-bold">Constrained_Output</span>
              </div>
            </section>

            {/* Sector 02: Python SDK Implementation */}
            <section className="bg-black/95 backdrop-blur-2xl border border-white/10 rounded-xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] relative overflow-hidden group hover:border-orange-500/50 transition-all">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-transparent"></div>
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-3"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}>
                <Code className="text-orange-500" /> Implementation: Python SDK
              </h2>
              <p className="text-gray-100 leading-relaxed mb-6 font-medium">
                Integration requires minimal code modification. Wrap your existing execution loop with the A.I.C.E. <code>SafetyGovernor</code> to activate asymptotic stabilization. 
              </p>
              <div className="bg-black rounded border border-gray-800 overflow-hidden shadow-inner">
                <div className="bg-gray-900 px-4 py-2 border-b border-gray-800 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">aice_integration.py</span>
                </div>
                <div className="p-6 font-mono text-xs md:text-sm overflow-x-auto leading-loose text-gray-100">
                  <span className="text-purple-400">import</span> <span className="text-white">aice_kernel</span><br/>
                  <span className="text-purple-400">from</span> <span className="text-white">your_system</span> <span className="text-purple-400">import</span> <span className="text-white">core_optimizer</span><br/><br/>
                  <span className="text-gray-500 italic"># Initialize the A.I.C.E. Sovereign Containment Shield</span><br/>
                  <span className="text-[#00F3FF]">governor</span> <span className="text-white">= aice_kernel.SafetyGovernor(</span><br/>
                  <span className="text-white">    target_optimizer=core_optimizer,</span><br/>
                  <span className="text-white">    mode=</span><span className="text-green-400">"strict_asymptote"</span><br/>
                  <span className="text-white">)</span><br/><br/>
                  <span className="text-gray-500 italic"># Execute with irrefutable proof of boundedness</span><br/>
                  <span className="text-[#00F3FF]">governor</span><span className="text-white">.execute_loop()</span>
                </div>
              </div>
            </section>

          </div>

          {/* SIDEBAR: SOLIDIFIED COMPLIANCE LOCK */}
          <div className="space-y-8">
            
            {/* Gated Access Terminal */}
            <section className="bg-black border border-gray-800 rounded-xl p-8 shadow-[0_0_60px_rgba(0,0,0,1)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Lock size={64} className="text-[#00F3FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide flex items-center gap-2">
                <Shield className="text-[#00F3FF]" size={20}/> SDK Access
              </h3>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                The compiled binaries and proprietary diagnostic matrices are legally restricted to verified enterprise partners. 
              </p>
              
              <div className="space-y-4">
                <div className="bg-black/50 border border-red-500/30 p-4 rounded text-center">
                  <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Authorization Status</span>
                  <span className="font-mono font-bold text-red-500 animate-pulse">RESTRICTED: NDA REQUIRED</span>
                </div>
                
                <button 
                  onClick={() => setView('PILOT_PROGRAMS')}
                  className="w-full py-4 bg-[#00F3FF] hover:bg-white text-black font-black uppercase tracking-[0.2em] text-xs transition-all rounded shadow-[0_0_20px_rgba(0,243,255,0.3)]"
                >
                  Initiate Pilot Request
                </button>
              </div>
            </section>

            {/* Telemetry Schema Vault */}
            <section className="bg-black border border-white/10 rounded-xl p-6 shadow-[0_0_40px_rgba(0,0,0,1)]">
              <h3 className="text-xs font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                <Cpu className="text-[#00F3FF]" size={16}/> Telemetry Schema v1.0
              </h3>
              <div className="bg-black/50 p-4 rounded border border-gray-800 font-mono text-[11px] text-gray-100 overflow-x-auto shadow-inner">
<pre>
{`{
  "system_id": "NODE_01",
  "metrics": {
    "ids_value": 0.87,
    "deviance_index": 0.04,
    "latency_ms": 12.4
  },
  "state": "active"
}`}
</pre>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};