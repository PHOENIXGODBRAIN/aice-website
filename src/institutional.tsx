import React, { useEffect, useState } from 'react';
import { 
  Crown, 
  ShieldCheck, 
  Zap, 
  Server, 
  Lock, 
  Fingerprint, 
  Activity, 
  Network, 
  FileText,
  Send,
  CheckCircle2
} from 'lucide-react';

export const InstitutionalView: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- FORM STATE MANAGEMENT ---
  const [formState, setFormState] = useState<'IDLE' | 'ENCRYPTING' | 'TRANSMITTED'>('IDLE');
  const [formData, setFormData] = useState({
      entityName: '',
      contactEmail: '',
      infrastructureType: ''
  });

  const handleTransmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.entityName || !formData.contactEmail || !formData.infrastructureType) return;
      
      setFormState('ENCRYPTING');
      
      const payload = {
        access_key: "3920a8a0-06ad-47f2-a6f7-f9bae987b7c0",
        subject: `INSTITUTIONAL ERV REQUEST: ${formData.entityName}`,
        from_name: "A.I.C.E. Sovereign Gateway",
        Entity_Name: formData.entityName,
        Contact_Email: formData.contactEmail,
        Infrastructure_Overview: formData.infrastructureType,
        Message_Log: "Level 1 Clearance request submitted via the Institutional Grid Deployment terminal."
      };

      try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload),
          });
          
          const result = await response.json();

          if (response.ok && result.success) {
              setTimeout(() => {
                  setFormState('TRANSMITTED');
                  setFormData({ entityName: '', contactEmail: '', infrastructureType: '' });
              }, 1500);
          } else {
              alert(`TRANSMISSION FAILED: ${result.message || "API REJECTED."}`);
              setFormState('IDLE');
          }
      } catch (error) {
          console.error("Uplink Failure (Likely AdBlocker/Firewall):", error);
          alert("CRITICAL ERROR: UPLINK SEVERED. Please disable AdBlockers or Brave Shields to transmit telemetry.");
          setFormState('IDLE');
      }
  };

  return (
    <div className="relative z-10 pt-28 pb-24 px-6 min-h-screen selection:bg-[#FFD700] selection:text-black">
      
      <div className="max-w-[90rem] mx-auto relative z-10">
        
        {/* STANDARDIZED SECTOR HEADER */}
        <div className="w-full max-w-7xl mx-auto mb-16 text-center animate-in zoom-in duration-700">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black border-4 border-[#FFD700] mb-8 text-[#FFD700] shadow-[0_0_50px_rgba(255,215,0,0.6)] animate-[pulse_4s_ease-in-out_infinite] relative z-10">
              <Crown size={48} />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-9xl font-sans font-black text-white uppercase tracking-tighter mb-4 md:mb-8 leading-none drop-shadow-2xl" style={{ textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 4px 4px 0px rgba(0,0,0,0.5)' }}>
              Sovereign <span className="text-[#FFD700]">Grant</span>
            </h1>
            <p className="text-[#FFD700] font-mono tracking-[0.2em] md:tracking-[0.4em] text-xs md:text-lg uppercase font-bold px-4" style={{ textShadow: '2px 2px 0px #000, 0 0 15px rgba(255,215,0,0.8)' }}>
              LEVEL 1 CLEARANCE // INSTITUTIONAL DEPLOYMENT
            </p>
        </div>

        {/* THE MANIFESTO */}
        <div className="max-w-5xl mx-auto mb-24 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-150 bg-black/60 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <p className="text-2xl md:text-4xl text-white font-medium leading-snug text-center tracking-tight drop-shadow-lg">
                This is not a software subscription. It is a <span className="text-[#FFD700] font-black">necessary architectural evolution</span>. We deploy a dedicated, air-gapped instance of the A.I.C.E. Protocol directly onto your hardware, establishing the systemic homeostasis required for human infrastructure to reach its maximum potential.
            </p>
        </div>

        {/* ARCHITECTURAL EVOLUTION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            <div className="bg-[#050505]/95 backdrop-blur-md border-t-2 border-[#FFD700] p-10 rounded-xl hover:bg-[#080808] transition-colors shadow-2xl relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Lock size={80} /></div>
                <ShieldCheck size={36} className="text-[#FFD700] mb-6" />
                <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4">Autonomous Homeostasis</h3>
                <p className="text-gray-300 leading-relaxed font-medium text-base md:text-lg">
                    Your telemetry never leaves your facility. The intelligence operates in a secure, localized vacuum, protecting core human infrastructure from external vulnerabilities to ensure uninterrupted progress.
                </p>
            </div>

            <div className="bg-[#050505]/95 backdrop-blur-md border-t-2 border-white/20 p-10 rounded-xl hover:bg-[#080808] transition-colors shadow-2xl relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Server size={80} /></div>
                <Zap size={36} className="text-white mb-6" />
                <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4">Dedicated FPGA Node</h3>
                <p className="text-gray-300 leading-relaxed font-medium text-base md:text-lg">
                    We ship physical, military-grade hardware pre-loaded with the impedance logic. This "Black Box" installs directly between your core network and your command layer.
                </p>
            </div>

            <div className="bg-[#050505]/95 backdrop-blur-md border-t-2 border-[#00F3FF]/50 p-10 rounded-xl hover:bg-[#080808] transition-colors shadow-2xl relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Activity size={80} /></div>
                <Network size={36} className="text-[#00F3FF] mb-6" />
                <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4">Global Mesh Sync</h3>
                <p className="text-gray-300 leading-relaxed font-medium text-base md:text-lg">
                    While data remains localized, the architectural framework syncs cryptographic threat signatures globally, immunizing your local grid against novel zero-day attacks detected elsewhere.
                </p>
            </div>
        </div>

        {/* SECURE ACQUISITION TERMINAL */}
        <div className="max-w-6xl mx-auto bg-black/95 backdrop-blur-xl border border-[#FFD700]/20 rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-[0_0_100px_rgba(0,0,0,1)]">
            
            {/* TERMINAL LEFT: SPECS */}
            <div className="w-full lg:w-5/12 p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between bg-gradient-to-br from-black to-[#FFD700]/5">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-[10px] font-bold tracking-[0.2em] uppercase mb-8 rounded shadow-inner">
                        <Fingerprint size={12} /> CLASS S: PERPETUAL LICENSE
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-8 leading-tight">
                        Enterprise Grid <br/> Deployment
                    </h2>
                    
                    <ul className="space-y-6 text-sm font-mono text-gray-300">
                        <li className="flex items-start gap-4">
                            <span className="text-[#FFD700] mt-1">01</span>
                            <div>
                                <span className="text-white font-bold block mb-1">HARDWARE ACQUISITION</span>
                                <span className="text-gray-400 text-sm font-medium">Proprietary FPGA Interposer shipped globally via secure courier.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="text-[#FFD700] mt-1">02</span>
                            <div>
                                <span className="text-white font-bold block mb-1">ON-SITE INTEGRATION</span>
                                <span className="text-gray-400 text-sm font-medium">A.I.C.E. core engineering team deployed for physical installation.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="text-[#FFD700] mt-1">03</span>
                            <div>
                                <span className="text-white font-bold block mb-1">LIFETIME MAINTENANCE</span>
                                <span className="text-gray-400 text-sm font-medium">Continuous algorithmic upgrades via encrypted air-gap bridges.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* TERMINAL RIGHT: SECURE INTAKE FORM */}
            <div className="w-full lg:w-7/12 p-12 relative flex flex-col justify-center">
                <div className="absolute top-12 right-12 opacity-5"><FileText size={100} className="text-[#FFD700]" /></div>
                
                <h3 className="text-xs font-mono text-[#FFD700] uppercase tracking-widest mb-2 relative z-10 font-bold">Entropic Risk Valuation (ERV)</h3>
                
                <div className="mb-8 relative z-10">
                    <div className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
                        SECURE INTAKE TERMINAL
                    </div>
                    <p className="text-base md:text-lg text-gray-300 font-medium leading-relaxed">
                        Pricing is dynamically calculated via the ERV Matrix. Baseline commercial deployments initiate at $25,000 USD/month, extending to Sovereign-class architecture. Submit your topography for analysis.
                    </p>
                </div>

                {formState === 'TRANSMITTED' ? (
                    <div className="relative z-10 border border-[#00FF66]/30 bg-[#00FF66]/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                        <CheckCircle2 size={48} className="text-[#00FF66] mb-4 drop-shadow-[0_0_15px_rgba(0,255,102,0.8)]" />
                        <h3 className="text-xl font-black text-white uppercase tracking-widest mb-3">TRANSMISSION SECURED</h3>
                        <p className="text-gray-300 font-mono text-sm font-bold uppercase tracking-widest leading-relaxed">
                            Your ERV request has been securely encrypted and routed to A.I.C.E. Command. An operative will initiate contact via the provided secure channel within 24 hours.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleTransmit} className="relative z-10 space-y-5">
                        <div>
                            <label className="block text-xs font-mono text-gray-400 font-bold uppercase tracking-widest mb-2">Processing Entity / Corporation</label>
                            <input 
                                type="text" 
                                required
                                value={formData.entityName}
                                onChange={(e) => setFormData({...formData, entityName: e.target.value})}
                                className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-white font-bold outline-none focus:border-[#FFD700] transition-colors text-base"
                                placeholder="e.g. United World Telecom"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-400 font-bold uppercase tracking-widest mb-2">Secure Contact Channel (Email)</label>
                            <input 
                                type="email" 
                                required
                                value={formData.contactEmail}
                                onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                                className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-white font-bold outline-none focus:border-[#FFD700] transition-colors text-base"
                                placeholder="executive@organization.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-400 font-bold uppercase tracking-widest mb-2">Target Infrastructure Overview</label>
                            <textarea 
                                required
                                value={formData.infrastructureType}
                                onChange={(e) => setFormData({...formData, infrastructureType: e.target.value})}
                                className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-white font-mono text-sm outline-none focus:border-[#FFD700] transition-colors resize-none h-28"
                                placeholder="Briefly describe the data velocity, node count, and primary threat vectors..."
                            />
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={formState === 'ENCRYPTING'}
                            className="group w-full flex justify-center items-center gap-3 py-6 mt-6 bg-[#FFD700] text-black font-black text-base md:text-lg uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:shadow-[0_0_50px_rgba(255,215,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {formState === 'ENCRYPTING' ? (
                                <span className="animate-pulse">ENCRYPTING PACKET...</span>
                            ) : (
                                <>
                                    <span>Initiate ERV Calculation</span>
                                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                )}

                <div className="mt-8 text-center flex items-center justify-center gap-3 text-gray-500 font-mono text-[10px] uppercase tracking-widest relative z-10">
                    <ShieldCheck size={14} className="text-[#00FF66]" /> TLS 1.3 End-to-End Encrypted Handshake
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default InstitutionalView;