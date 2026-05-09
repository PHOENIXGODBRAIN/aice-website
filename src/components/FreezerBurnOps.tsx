import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../App';
import { Send, Crosshair, Cpu, ShieldCheck, Activity, Terminal } from 'lucide-react';

export default function FreezerBurnOps() {
  const [telemetry, setTelemetry] = useState({ ids: '--', p: '--', omega: '--', mode: 'INITIALIZING...' });
  const [connected, setConnected] = useState(false);

  // Form States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      sector: '',
      infrastructure: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const unsub = onSnapshot(doc(db, "aice_telemetry", "live_feed"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTelemetry({
          ids: data.ids ? data.ids.toFixed(1) + '%' : '--',
          p: data.p ? data.p.toFixed(3) : '--',
          omega: data.omega ? data.omega.toFixed(2) : '--',
          mode: data.mode || 'OBSERVE'
        });
        setConnected(true);
      } else {
        setConnected(false);
      }
    }, (error) => {
      console.error("Firebase Uplink Severed:", error);
      setConnected(false);
    });

    return () => unsub();
  }, []);

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("TRANSMITTING DEVIANCE PACKET...");

    const payload = {
      access_key: "3920a8a0-06ad-47f2-a6f7-f9bae987b7c0",
      subject: `FREEZER BURN AUDIT REQUEST: ${formData.sector}`,
      from_name: formData.name,
      Email: formData.email,
      Sector: formData.sector,
      Infrastructure: formData.infrastructure,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitStatus("TRANSMISSION SECURED. A.I.C.E. WILL REVIEW.");
        setFormData({ name: '', email: '', sector: '', infrastructure: '' });
      } else {
        setSubmitStatus(`TRANSMISSION FAILED: ${result.message || "API REJECTED."}`);
      }
    } catch (error) {
      console.error("Uplink Failure (Likely AdBlocker/Firewall):", error);
      setSubmitStatus("CRITICAL ERROR: UPLINK SEVERED. (DISABLE ADBLOCKER/SHIELDS)");
    }
    setIsSubmitting(false);
  };

  // Cyber-Archaeology Mode Styling Logic
  let modeColor = 'text-[#00F3FF]';
  let borderColor = 'border-[#00F3FF]';
  let shadowGlow = 'shadow-[inset_0_0_15px_rgba(0,243,255,0.2)]';
  let pulseAnim = '';

  if (telemetry.mode === 'MITIGATE') {
    modeColor = 'text-[#ff4500]';
    borderColor = 'border-[#ff4500]';
    shadowGlow = 'shadow-[inset_0_0_30px_rgba(255,69,0,0.5)]';
    pulseAnim = 'animate-pulse';
  } else if (telemetry.mode === 'THAW') {
    modeColor = 'text-[#00ffaa]';
    borderColor = 'border-[#00ffaa]';
    shadowGlow = 'shadow-[inset_0_0_15px_rgba(0,255,170,0.2)]';
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col text-white selection:bg-orange-500 selection:text-black bg-[#050505]">
        
        {/* =========================================================
            MASTER BACKGROUND ARCHITECTURE (ABSOLUTE SCROLLING)
            ========================================================= */}
        <div className="absolute inset-0 z-0 pointer-events-none flex flex-col">
            {/* Top Void for Dashboard */}
            <div className="h-[550px] w-full bg-[#050505] shrink-0"></div>
            
            {/* Phoenix Image Section */}
            <div className="flex-1 w-full relative">
                <div className="absolute inset-0 bg-[url('/assets/images/pilot%20program/pilot_phoenix1.png')] bg-cover bg-top bg-no-repeat"></div>
                {/* The Seamless Blend from Black to Image */}
                <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-[#050505] to-transparent z-10"></div>
                {/* General darkening to make text readable */}
                <div className="absolute inset-0 bg-black/60 z-0"></div>
            </div>
        </div>

        {/* --- CYBER GRID OVERLAY (Fades out smoothly into the black void) --- */}
        <div className="absolute top-0 left-0 right-0 h-[800px] z-0 pointer-events-none"
             style={{
                 backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px)',
                 backgroundSize: '30px 30px',
                 WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                 maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
             }}>
        </div>

        {/* =========================================================
            ZONE 1: THE CLINICAL DASHBOARD
            ========================================================= */}
        <div className="w-full flex flex-col items-center pt-24 pb-16 px-4 md:px-6 relative z-20">
            <div className="w-full max-w-5xl relative z-10">
                
                {/* INJECTED LOGOS */}
                <div className="absolute top-12 left-0 md:left-4 w-16 md:w-24 opacity-100 z-20 hidden md:block">
                   <img src="/assets/images/pilot%20program/AICEPHOENIX.png" alt="AICE Phoenix" className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]" />
                </div>
                <div className="absolute top-12 right-0 md:right-4 w-16 md:w-24 opacity-100 z-20 hidden md:block">
                   <img src="/assets/images/pilot%20program/dvsSYNTROPY.png" alt="DVS Syntropy" className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]" />
                </div>

                <div className="text-center border-b-2 border-[#00F3FF]/30 pb-6 mb-8 w-full relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent opacity-50"></div>
                    
                    <div className="flex justify-center items-center mb-4 relative w-full pt-4 md:pt-0">
                        <div className="absolute -top-3 left-0 md:left-24 text-[9px] md:text-[10px] font-mono text-[#00e5ff] tracking-[0.2em] font-bold drop-shadow-[0_0_5px_#00e5ff]">[VETO ACTIVE]</div>
                        <div className="absolute -top-3 right-0 md:right-24 text-[9px] md:text-[10px] font-mono text-[#ff6f00] tracking-[0.2em] font-bold drop-shadow-[0_0_5px_#ff6f00]">[QUANTUM DRIFT LOCK: ON]</div>
                        
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter flex items-center gap-4 md:gap-6 leading-none mt-2">
                            <span style={{ color: 'transparent', WebkitTextStroke: '2px #00e5ff', textShadow: '0 0 15px rgba(0,229,255,0.6), 0 0 30px rgba(0,229,255,0.4)' }}>FREEZER</span>
                            <span style={{ color: 'transparent', WebkitTextStroke: '2px #ff6f00', backgroundImage: 'radial-gradient(circle, #ff9d00 10%, #ff6f00 60%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', textShadow: '0 0 20px rgba(255,111,0,0.6), 0 0 40px rgba(255,157,0,0.4)' }}>BURN</span>
                        </h1>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-[#eaeaea] mb-2 drop-shadow-md">A.I.C.E. Operations Center</h2>
                    <p className="text-gray-400 text-xs md:text-sm tracking-[0.3em] uppercase font-mono">Mathematical Governor | Live Telemetry Stream</p>
                </div>

                {/* VIBRANT METRICS DASHBOARD */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
                    <div className={`bg-[#06151c]/95 border-t-2 border-b-2 ${borderColor} p-6 md:p-8 text-center transition-all duration-300 ${shadowGlow} ${pulseAnim}`}>
                        <div className="text-[#a0aec0] font-mono text-xs md:text-sm uppercase tracking-[0.2em] mb-3">System Load</div>
                        <div className={`text-4xl md:text-6xl font-bold ${modeColor} drop-shadow-lg`}>{telemetry.ids}</div>
                    </div>
                    
                    <div className={`bg-[#06151c]/95 border-t-2 border-b-2 ${borderColor} p-6 md:p-8 text-center transition-all duration-300 ${shadowGlow} ${pulseAnim}`}>
                        <div className="text-[#a0aec0] font-mono text-xs md:text-sm uppercase tracking-[0.2em] mb-3">Threat Index</div>
                        <div className={`text-4xl md:text-6xl font-bold ${modeColor} drop-shadow-lg`}>{telemetry.p}</div>
                    </div>
                    
                    <div className={`bg-[#06151c]/95 border-t-2 border-b-2 ${borderColor} p-6 md:p-8 text-center transition-all duration-300 ${shadowGlow} ${pulseAnim}`}>
                        <div className="text-[#a0aec0] font-mono text-xs md:text-sm uppercase tracking-[0.2em] mb-3">System Impedance</div>
                        <div className={`text-4xl md:text-6xl font-bold ${modeColor} drop-shadow-lg`}>{telemetry.omega}</div>
                    </div>
                </div>

                <div className="w-full p-6 md:p-8 bg-[#0a0a0a] border-l-8 border-[#00F3FF] flex flex-col md:flex-row justify-between items-center text-lg md:text-xl font-bold uppercase shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                    <div className="text-white mb-2 md:mb-0">
                        SYSTEM STATUS: <span className={`${modeColor} ml-2 tracking-widest`}>{telemetry.mode}</span>
                    </div>
                    <div className={`${connected ? "text-[#00FF66]" : "text-red-500"} tracking-widest text-sm md:text-base`}>
                        {connected ? "LINK ESTABLISHED: A.I.C.E. CLOUD" : "AWAITING TELEMETRY..."}
                    </div>
                </div>
            </div>
        </div>

        {/* =========================================================
            ZONE 2: COLLAGE CARDS (Floating gracefully over background)
            ========================================================= */}
        <div className="w-full relative flex flex-col items-center px-4 md:px-6 pt-16 pb-24 z-10">

            <div className="w-full max-w-6xl relative z-10 mb-32 mt-12">
                
                {/* HIGHLIGHTED, HIGH-CONTRAST TITLE */}
                <div className="text-center mb-24 relative z-10 flex flex-col items-center">
                    <div className="bg-[#050505]/70 backdrop-blur-xl border border-[#00F3FF]/30 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.9)] max-w-4xl w-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent"></div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-widest text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">The Physics of Stability</h2>
                        <p className="text-white font-light text-xl md:text-3xl leading-relaxed">How the Deviance Viscosity Stabilizer conquers computational chaos.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-12">
                    
                    {/* Context 1: The Threat (Orange) */}
                    <div className="bg-[#050505]/85 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 grid grid-cols-2 grid-rows-2 gap-1 p-2 bg-black">
                            <img src="/assets/images/pilot%20program/download (7).jpg" alt="Threat 1" className="w-full h-40 md:h-56 object-contain bg-black rounded-tl-xl p-1 opacity-100" />
                            <img src="/assets/images/pilot%20program/download (8).jpg" alt="Threat 2" className="w-full h-40 md:h-56 object-contain bg-black rounded-tr-xl p-1 opacity-100" />
                            <img src="/assets/images/pilot%20program/download (9).jpg" alt="Threat 3" className="w-full h-40 md:h-56 object-contain bg-black rounded-bl-xl p-1 opacity-100" />
                            <img src="/assets/images/pilot%20program/download (11).jpg" alt="Threat 4" className="w-full h-40 md:h-56 object-contain bg-black rounded-br-xl p-1 opacity-100" />
                        </div>
                        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center relative">
                            <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-[#ff4500] text-black w-12 h-12 flex items-center justify-center rounded-full font-black text-xl shadow-[0_0_15px_#ff4500]">1</div>
                            <h3 className="text-3xl md:text-4xl font-black text-[#ff4500] uppercase tracking-widest mb-6">The Threat</h3>
                            <p className="text-white leading-relaxed font-light text-lg md:text-xl drop-shadow-sm">
                                Entropy is a mathematical certainty. When data velocity exceeds infrastructure limits, systems generate "noise." Unchecked, this noise creates cascading shockwaves, leading to massive hallucinations, packet loss, and critical hardware fatigue.
                            </p>
                        </div>
                    </div>

                    {/* Context 2: The Governor (Teal / REPLACED IMAGE BOTTOM LEFT) */}
                    <div className="bg-[#050505]/85 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col-reverse md:flex-row">
                        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center relative">
                            <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-[#00F3FF] text-black w-12 h-12 flex items-center justify-center rounded-full font-black text-xl shadow-[0_0_15px_#00F3FF]">2</div>
                            <h3 className="text-3xl md:text-4xl font-black text-[#00F3FF] uppercase tracking-widest mb-6">The Governor</h3>
                            <p className="text-white leading-relaxed font-light text-lg md:text-xl drop-shadow-sm">
                                The A.I.C.E. protocol continuously monitors the 'System Load'. When the Threat Index approaches critical limits, the governor instantly calculates and applies <strong className="text-[#00F3FF]">adaptive computational impedance</strong>—dynamic friction designed to effortlessly absorb the shock.
                                <br/><br/>
                                <span className="text-[#00F3FF] font-medium text-base">As a newly released, patented state-of-the-art technology, this framework represents the absolute highest standard in algorithmic risk regulation globally.</span>
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 grid grid-cols-2 grid-rows-2 gap-1 p-2 bg-black">
                            <img src="/assets/images/pilot%20program/aicelab.png" alt="Governor 1" className="w-full h-40 md:h-56 object-contain bg-black rounded-tl-xl p-1 opacity-100" />
                            <img src="/assets/images/pilot%20program/aice.jpeg" alt="Governor 2" className="w-full h-40 md:h-56 object-contain bg-black rounded-tr-xl p-1 opacity-100" />
                            {/* REPLACED IMAGE HERE */}
                            <img src="/assets/images/pilot%20program/Patented.png" alt="Patented Technology" className="w-full h-40 md:h-56 object-contain bg-black rounded-bl-xl p-1 opacity-100" />
                            <img src="/assets/images/pilot%20program/aicelogo.png" alt="Governor 4" className="w-full h-40 md:h-56 object-contain bg-black rounded-br-xl p-1 opacity-100" />
                        </div>
                    </div>

                    {/* Context 3: The Syntropy (Neon Blue) */}
                    <div className="bg-[#050505]/85 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 grid grid-cols-2 grid-rows-2 gap-1 p-2 bg-black">
                            <img src="/assets/images/pilot%20program/syntropy1.png" alt="Syntropy 1" className="w-full h-40 md:h-56 object-contain bg-black rounded-tl-xl p-1 opacity-100" />
                            <img src="/assets/images/pilot%20program/syntropy2.png" alt="Syntropy 2" className="w-full h-40 md:h-56 object-contain bg-black rounded-tr-xl p-1 opacity-100" />
                            <img src="/assets/images/pilot%20program/Intelligence.png" alt="Syntropy 3" className="w-full h-40 md:h-56 object-contain bg-black rounded-bl-xl p-1 opacity-100" />
                            <img src="/assets/images/pilot%20program/GlobalMesh.png" alt="Syntropy 4" className="w-full h-40 md:h-56 object-contain bg-black rounded-br-xl p-1 opacity-100" />
                        </div>
                        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center relative">
                            <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-[#0088ff] text-white w-12 h-12 flex items-center justify-center rounded-full font-black text-xl shadow-[0_0_15px_#0088ff]">3</div>
                            <h3 className="text-3xl md:text-4xl font-black text-[#0088ff] uppercase tracking-widest mb-6">The Syntropy</h3>
                            <p className="text-white leading-relaxed font-light text-lg md:text-xl drop-shadow-sm">
                                By preemptively throttling the flow of chaotic data, the system achieves homeostasis. The threat is neutralized before execution, ensuring absolute operational stability and saving millions in recovered compute capital.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. THE DIAGNOSTIC INTAKE FORM */}
            <div className="w-full max-w-4xl relative z-10 mb-10">
                <div className="bg-[#050505]/95 backdrop-blur-2xl border-2 border-[#00F3FF]/30 p-10 md:p-14 rounded-[2rem] shadow-[0_0_60px_rgba(0,243,255,0.15)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10"><Terminal size={100} className="text-[#00F3FF]" /></div>
                    
                    <div className="mb-10 text-center relative z-10">
                        <div className="inline-flex items-center gap-2 bg-[#00F3FF]/10 text-[#00F3FF] px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-xs mb-4 border border-[#00F3FF]/30">
                            <Crosshair size={14}/> Entropic Risk Valuation (ERV)
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Request An Audit</h2>
                        <p className="text-gray-300 font-mono text-sm uppercase tracking-widest leading-relaxed">
                            Submit your infrastructure details below. A.I.C.E. engineering will initiate contact to schedule a secure telemetry ingestion and run your diagnostic simulation.
                        </p>
                    </div>

                    <form onSubmit={handleIntakeSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[#00F3FF] font-mono text-xs font-bold tracking-widest uppercase">Operator Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-black/80 border border-white/20 rounded-xl p-4 text-white font-bold outline-none focus:border-[#00F3FF] transition-colors"
                                    placeholder="E.g. John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[#00F3FF] font-mono text-xs font-bold tracking-widest uppercase">Secure Comms (Email)</label>
                                <input 
                                    type="email" 
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-black/80 border border-white/20 rounded-xl p-4 text-white font-bold outline-none focus:border-[#00F3FF] transition-colors"
                                    placeholder="executive@domain.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[#00F3FF] font-mono text-xs font-bold tracking-widest uppercase">Operational Sector</label>
                            <select 
                                required
                                value={formData.sector}
                                onChange={(e) => setFormData({...formData, sector: e.target.value})}
                                className="w-full bg-black/80 border border-white/20 rounded-xl p-4 text-white font-mono text-sm outline-none focus:border-[#00F3FF] transition-colors appearance-none cursor-pointer"
                            >
                                <option value="" disabled>-- SELECT INFRASTRUCTURE DOMAIN --</option>
                                <option value="Generative AI / LLM">Generative AI / LLM</option>
                                <option value="Financial / HFT">Financial / HFT Trading</option>
                                <option value="Power Grid / SCADA">Power Grid / Energy SCADA</option>
                                <option value="Aerospace / Defense">Aerospace / Autonomous Defense</option>
                                <option value="Cloud Compute / Telecom">Cloud Compute / Telecom</option>
                                <option value="Other">Other (Specify in overview)</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[#00F3FF] font-mono text-xs font-bold tracking-widest uppercase">Topology Overview</label>
                            <textarea 
                                required
                                value={formData.infrastructure}
                                onChange={(e) => setFormData({...formData, infrastructure: e.target.value})}
                                className="w-full bg-black/80 border border-white/20 rounded-xl p-4 text-white font-mono text-sm outline-none focus:border-[#00F3FF] transition-colors resize-none h-32"
                                placeholder="Briefly describe your data velocity, node count, and primary entropy vectors..."
                            />
                        </div>

                        {submitStatus && (
                            <div className={`p-4 rounded border text-center font-mono font-bold tracking-widest text-xs uppercase ${submitStatus.includes('SECURED') ? 'bg-[#00FF66]/10 border-[#00FF66] text-[#00FF66]' : 'bg-orange-500/10 border-orange-500 text-orange-500'}`}>
                                {submitStatus}
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-6 bg-[#00F3FF] text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all rounded-xl shadow-[0_0_30px_rgba(0,243,255,0.3)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group/submit"
                        >
                            {isSubmitting ? 'ENCRYPTING PACKET...' : <><Cpu className="group-hover/submit:animate-spin"/> SUBMIT TELEMETRY FOR AUDIT</>}
                        </button>
                        
                        <div className="text-center flex justify-center items-center gap-2 mt-4 text-gray-500 font-mono text-[10px] uppercase tracking-widest">
                            <ShieldCheck size={14} className="text-[#00FF66]" /> TLS 1.3 End-to-End Encrypted Handshake
                        </div>
                    </form>
                </div>
            </div>

            {/* --- INJECTED FUNNEL NAVIGATION BUTTONS --- */}
            <div className="w-full max-w-4xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-20">
                <button 
                    onClick={() => window.location.href = '/command-deck'} 
                    className="w-full py-5 border border-white/20 bg-black/60 backdrop-blur-md text-white font-black uppercase tracking-widest text-xs hover:border-[#00F3FF] hover:text-[#00F3FF] transition-all rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center gap-3"
                >
                    <Terminal size={16} /> RETURN TO COMMAND DECK
                </button>

                <button 
                    onClick={() => window.location.href = '/acquisition'} 
                    className="w-full py-5 bg-[#00F3FF] text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all rounded-xl shadow-[0_0_30px_rgba(0,243,255,0.4)] flex items-center justify-center gap-3 group"
                >
                    <ShieldCheck size={16} className="group-hover:animate-pulse" /> INITIATE E.R.V. DEPLOYMENT QUOTE
                </button>
            </div>

        </div>
    </div>
  );
}