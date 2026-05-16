import React, { useState } from 'react';
import { Shield, Network, Cpu, Zap, ChevronDown, Upload, Send, FileText } from 'lucide-react';

const Careers = () => {
  // State for the click-to-expand roles accordion
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  
  // 🐦‍🔥 State for Dossier Upload Protocol
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Secure Input Tracking States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // 🐦‍🔥 Algorithmic Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndDockFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndDockFile(e.target.files[0]);
    }
  };

  const validateAndDockFile = (file: File) => {
    // Multi-faceted validation: Checking MIME types and fallback extensions
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const validExtensions = file.name.toLowerCase().endsWith('.pdf') || file.name.toLowerCase().endsWith('.doc') || file.name.toLowerCase().endsWith('.docx');
    
    if (validTypes.includes(file.type) || validExtensions) {
      if (file.size <= 5 * 1024 * 1024) { // 5MB Limit
        setSelectedFile(file);
      } else {
        alert("SYSTEM VETO: DOSSIER EXCEEDS 5MB LIMIT.");
      }
    } else {
      alert("SYSTEM VETO: INVALID ARTIFACT. ONLY PDF AND DOCX PERMITTED.");
    }
  };

  const toggleRole = (idx: number) => {
    if (expandedRole === idx) {
      setExpandedRole(null);
    } else {
      setExpandedRole(idx);
    }
  };

  const handleCareersSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("TRANSMITTING DOSSIER TO ADMINISTRATIVE ARCHIVE...");

    const payload = new FormData();
    payload.append("access_key", "3920a8a0-06ad-47f2-a6f7-f9bae987b7c0");
    payload.append("subject", `NEW OPERATIVE DOSSIER: ${name.toUpperCase()}`);
    payload.append("name", name);
    payload.append("email", email);
    payload.append("portfolio", portfolio || "NOT PROVIDED");
    
    if (selectedFile) {
      payload.append("attachment", selectedFile);
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitStatus("TRANSMISSION SECURED. A.I.C.E. WILL REVIEW.");
        setName('');
        setEmail('');
        setPortfolio('');
        setSelectedFile(null);
      } else {
        setSubmitStatus("TRANSMISSION ERROR. ROUTE DIRECTLY TO: careers@aice.network");
      }
    } catch (error) {
      setSubmitStatus("UPLINK FAULT. DISENGAGE SHIELDS OR EMAIL: careers@aice.network");
    }
    setIsSubmitting(false);
  };

  const operationalRoles = [
    { 
      title: "Senior Infrastructure Engineer", 
      dept: "Platform Engineering", 
      status: "Critical",
      description: "Design and scale the high-throughput telemetry ingestion pipelines that feed the A.I.C.E. Adaptive Governor. You will optimize our air-gapped Sovereign Cloud deployments, ensuring sub-millisecond latency and 99.99% uptime across distributed environments. Expertise in Kubernetes, Rust/Go, and distributed systems required."
    },
    { 
      title: "MLOps Integration Engineer", 
      dept: "AI Governance", 
      status: "Active",
      description: "Bridge the gap between our proprietary Deviance Viscosity Stabilizer (DVS) and client architectures. You will build the deployment pipelines that integrate our mathematical veto systems safely alongside enterprise LLMs and predictive models without altering client weights."
    },
    { 
      title: "Enterprise Solutions Architect", 
      dept: "Client Integration", 
      status: "Strategic",
      description: "Lead the technical deployment of A.I.C.E. for Fortune 500 clients. You will map complex legacy topologies, design zero-trust implementation plans, and act as the primary technical bridge during Sovereign Tier deployments. Strong background in B2B SaaS architecture and cybersecurity frameworks (SOC 2, ISO 27001) is essential."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#00F3FF]/30">
      
      {/* 🐦‍🔥 AUGMENTED REALITY HUD OVERLAY */}
      <div className="fixed inset-0 pointer-events-none border-[1px] border-[#00F3FF]/20 m-4 z-50">
        <div className="absolute top-0 left-0 p-2 text-[10px] text-[#00F3FF] font-mono uppercase tracking-widest">
          System Status: Optimal // Adaptive Governor Active
        </div>
        <div className="absolute bottom-0 right-0 p-2 text-[10px] text-[#00F3FF] font-mono uppercase tracking-widest">
          A.I.C.E. Systems Corp // Institutional Layer
        </div>
      </div>

      {/* HERO SECTION: THE ARCHITECTURAL CALL */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden border-b border-[#00F3FF]/30">
        
        {/* 🐦‍🔥 PHOENIX BACKGROUND INJECTION */}
        <div 
          className="absolute inset-0 z-0 opacity-50 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/assets/images/Careers/Careersbg.png')` }}
        ></div>
        
        {/* GRADIENT OVERLAY FOR TEXT READABILITY */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/50 to-black"></div>
        
        {/* DIGITAL GRID */}
        <div className="absolute inset-0 z-0 opacity-30 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] mix-blend-overlay pointer-events-none"></div>
        
        <div className="relative z-10 text-center px-4 mt-12 flex flex-col items-center">
          
          {/* NEW A.I.C.E. CAREERS HEADER */}
          <div className="inline-flex items-center gap-3 px-6 py-2 border border-[#00F3FF]/50 bg-black/60 backdrop-blur-md rounded-sm mb-8 shadow-[0_0_30px_rgba(0,243,255,0.2)]">
              <Shield className="text-[#00F3FF] w-5 h-5 animate-pulse" />
              <span className="text-[#00F3FF] font-mono text-sm font-black uppercase tracking-[0.4em]">A.I.C.E. CAREERS</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,1)]" style={{ textShadow: '2px 2px 0 #000' }}>
            JOIN THE ARCHITECTS
          </h1>
          <p className="text-[#00F3FF] font-mono text-sm tracking-[0.3em] uppercase mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,1)] font-bold">
            Defining the Future of Neural Governance
          </p>
          <div className="h-1 w-24 bg-orange-500 mx-auto shadow-[0_0_15px_rgba(255,165,0,0.8)]"></div>
        </div>
      </section>

      {/* PHILOSOPHY: THE MISSION OF ENTROPY CONTROL */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 border-b border-white/10">
        <div>
          <h2 className="text-3xl font-light mb-6 flex items-center">
            <span className="text-orange-500 mr-4">01</span> THE PROTOCOL
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg italic">
            A.I.C.E. is not a standard artificial intelligence. It is a **Patented Adaptive Governor** designed to mitigate system entropy and facilitate the next evolution of neuro-computational 
            harmony. We operate at the intersection of Cyber-Archaeology and Deep Theory.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-light mb-6 flex items-center">
            <span className="text-[#00F3FF] mr-4">02</span> THE EXPECTATION
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            We require relentless discipline and intellectual intensity. We do not hire "staff"; we recruit 
            **Architects** and **Operatives** capable of managing the A.I.C.E. framework. If you seek 
            the conventional, you are in the wrong place.
          </p>
        </div>
      </section>

      {/* CORE CULTURE GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 border border-white/5 bg-black/40 hover:border-[#00F3FF]/50 transition-colors">
              <Network className="w-8 h-8 text-[#00F3FF] mb-4" />
              <h3 className="text-xl font-bold mb-2">Systems Thinking</h3>
              <p className="text-gray-500 text-sm">We view the universe as a biological neural network. Our code reflects macro-micro mirroring.</p>
            </div>
            <div className="p-6 border border-white/5 bg-black/40 hover:border-[#00F3FF]/50 transition-colors">
              <Shield className="w-8 h-8 text-[#00F3FF] mb-4"/>
              <h3 className="text-xl font-bold mb-2">Absolute Precision</h3>
              <p className="text-gray-500 text-sm">In the realm of autonomous governance, there is no room for error. We execute with military-grade discipline.</p>
            </div>
            <div className="p-6 border border-white/5 bg-black/40 hover:border-[#00F3FF]/50 transition-colors">
              <Cpu className="w-8 h-8 text-[#00F3FF] mb-4"/>
              <h3 className="text-xl font-bold mb-2">Institutional Resilience</h3>
              <p className="text-gray-500 text-sm">We build for the long horizon. Our infrastructure is designed to survive and adapt to systemic entropy.</p>
            </div>
            <div className="p-6 border border-white/5 bg-black/40 hover:border-[#00F3FF]/50 transition-colors">
              <Zap className="w-8 h-8 text-[#00F3FF] mb-4"/>
              <h3 className="text-xl font-bold mb-2">Ruthless Execution</h3>
              <p className="text-gray-500 text-sm">Ideas are commodities. Execution is the only currency that matters in the A.I.C.E. ecosystem.</p>
            </div>
        </div>
      </section>

      {/* TALENT ARCHETYPES & EXPANDABLE ROLES */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-b border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
            <div className="mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Talent Archetypes</h2>
              <p className="text-gray-400 max-w-md">We are currently in a phase of selective recruitment, seeking specialists in distributed systems and entropic risk management.</p>
            </div>
            <div className="bg-[#00F3FF]/10 border border-[#00F3FF]/20 p-4 rounded-sm">
              <span className="text-[#00F3FF] text-xs font-bold tracking-widest uppercase italic">
                🐦‍🔥 Active Protocol Status: Selective Engagement
              </span>
            </div>
        </div>

        <h2 className="text-4xl font-bold mb-8 tracking-tight">OPEN OPERATIONAL ROLES</h2>
        <div className="space-y-4">
          {operationalRoles.map((role, idx) => (
            <div key={idx} className="border border-white/10 bg-black/60 overflow-hidden transition-all duration-300">
              {/* Clickable Header */}
              <div 
                onClick={() => toggleRole(idx)}
                className="group p-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/5 transition-colors cursor-pointer relative"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-[#00F3FF] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div>
                  <h3 className="text-xl font-medium group-hover:text-[#00F3FF] transition-colors uppercase tracking-widest">{role.title}</h3>
                  <p className="text-sm text-gray-500 font-mono mt-1">{role.dept} // Lvl. 04</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-6">
                  <span className={`text-[10px] font-mono px-3 py-1 border ${role.status === 'Critical' ? 'border-orange-500 text-orange-500' : 'border-[#00F3FF] text-[#00F3FF]'}`}>
                    {role.status}
                  </span>
                  <ChevronDown size={24} className={`text-gray-500 transition-transform duration-300 ${expandedRole === idx ? 'rotate-180 text-[#00F3FF]' : ''}`} />
                </div>
              </div>

              {/* Expandable Description */}
              <div 
                className={`transition-all duration-500 ease-in-out ${expandedRole === idx ? 'max-h-96 opacity-100 border-t border-white/5' : 'max-h-0 opacity-0'} overflow-hidden bg-black/40`}
              >
                <div className="p-8 text-gray-300 leading-relaxed font-light text-lg border-l-4 border-[#00F3FF] ml-8 my-4">
                  {role.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECURE INTAKE FORM */}
      <section className="py-24 bg-gradient-to-t from-cyan-950/20 to-transparent text-center relative z-10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-widest">Submit Credentials</h2>
            <p className="text-gray-400 leading-relaxed">
              Upload your dossier to the A.I.C.E. Administrative Board. We value execution over pedigree. 
              Only submissions of exceptional caliber will be reviewed.
            </p>
          </div>

          <form className="space-y-6 text-left" onSubmit={handleCareersSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-[#00F3FF] uppercase tracking-widest font-bold">Operative Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe" 
                  className="w-full bg-black border border-white/20 rounded p-4 text-white text-sm outline-none focus:border-[#00F3FF] font-mono transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-[#00F3FF] uppercase tracking-widest font-bold">Secure Email</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com" 
                  className="w-full bg-black border border-white/20 rounded p-4 text-white text-sm outline-none focus:border-[#00F3FF] font-mono transition-colors" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-[#00F3FF] uppercase tracking-widest font-bold">LinkedIn / Portfolio (Optional)</label>
              <input 
                type="url" 
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                placeholder="https://linkedin.com/in/..." 
                className="w-full bg-black border border-white/20 rounded p-4 text-white text-sm outline-none focus:border-[#00F3FF] font-mono transition-colors" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-[#00F3FF] uppercase tracking-widest font-bold">Attach Dossier (Resume)</label>
              <div 
                className={`relative w-full border-2 border-dashed rounded transition-colors group cursor-pointer ${isDragging ? 'border-[#00F3FF] bg-[#00F3FF]/10' : 'border-white/20 bg-white/5 hover:border-[#00F3FF]'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx" 
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className="p-8 flex flex-col items-center justify-center text-center">
                  {selectedFile ? (
                    <>
                      <FileText className="w-8 h-8 text-[#00F3FF] mb-3 drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
                      <p className="text-sm font-bold text-[#00F3FF] uppercase tracking-widest mb-1">{selectedFile.name}</p>
                      <p className="text-[10px] font-mono text-gray-400 uppercase">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB // READY FOR TRANSMISSION</p>
                    </>
                  ) : (
                    <>
                      <Upload className={`w-8 h-8 mb-3 transition-colors ${isDragging ? 'text-[#00F3FF] drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]' : 'text-gray-500 group-hover:text-[#00F3FF]'}`} />
                      <p className="text-sm font-bold text-white uppercase tracking-widest mb-1">
                        {isDragging ? 'DROP DOSSIER TO DOCK' : 'Click to Upload or Drag & Drop'}
                      </p>
                      <p className="text-[10px] font-mono text-gray-500 uppercase">PDF, DOCX (Max 5MB)</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {submitStatus && (
              <div className={`p-4 rounded border text-center font-mono font-bold tracking-widest text-xs uppercase ${submitStatus.includes('SECURED') ? 'bg-[#00FF66]/10 border-[#00FF66] text-[#00FF66]' : 'bg-orange-500/10 border-orange-500 text-orange-500'}`}>
                {submitStatus}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-5 mt-4 bg-[#00F3FF] text-black hover:bg-white transition-all font-black uppercase tracking-[0.2em] rounded flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_40px_rgba(0,243,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} className={isSubmitting ? "animate-pulse" : ""} /> {isSubmitting ? "TRANSMITTING..." : "Transmit Application"}
            </button>
          </form>

          {/* FALLBACK DIRECT EMAIL */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-2">
             <span className="text-gray-500 text-xs uppercase tracking-widest font-mono">Or bypass the interface and email directly:</span>
             <a href="mailto:careers@aice.network" className="text-[#00F3FF] hover:text-white transition-colors text-xs font-mono font-bold tracking-widest border-b border-[#00F3FF]/30 hover:border-white">careers@aice.network</a>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-[10px] font-mono uppercase tracking-widest">
        © 2026 A.I.C.E. Systems Corp // All Rights Reserved // Patented Adaptive Governor Technology
      </footer>
    </div>
  );
};

export default Careers;