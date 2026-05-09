'use client';

import React, { useEffect } from 'react';
import { Download, ShieldCheck, CheckCircle2, Zap, AlertTriangle, BookOpen, Brain, Terminal, Timer, Network, Cpu, Maximize2 } from 'lucide-react';

export default function TransmissionSuccessPage() {
  {/* BEGIN TIER 3 SERVER-SIDE VERIFICATION FIREWALL */}
  useEffect(() => {
    document.title = "A.I.C.E. // TRANSMISSION SECURED";
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex, nofollow, noarchive";
    document.head.appendChild(meta);

    const verifyAndDownload = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get('session_id');

      if (!sessionId) {
        window.location.href = '/acquisition';
        return;
      }

      try {
        // Ping the secure Vercel API Vault
        const response = await fetch(`/api/verify-transaction?session_id=${sessionId}`);
        const data = await response.json();

        if (response.ok && data.verified) {
          // Vault authorized access. Execute download quietly in the background.
          setTimeout(() => {
            window.open(data.downloadUrl, '_blank');
          }, 1500);
          
          // Inject the authorized link into the manual button
          const manualBtn = document.getElementById('manual-download-btn') as HTMLAnchorElement;
          if (manualBtn) manualBtn.href = data.downloadUrl;
          
        } else {
          // Vault denied access. Kick to sales terminal.
          window.location.href = '/acquisition';
        }
      } catch (err) {
        console.error("Verification sequence failed.", err);
        window.location.href = '/acquisition';
      }
    };

    verifyAndDownload();

    return () => {
      document.head.removeChild(meta);
    };
  }, []);
  {/* END TIER 3 FIREWALL */}

  const acquiredIntel = [
    { title: "The 18-Chapter Codex", desc: "464 pages of incontrovertible proof detailing the universe's precise neural architecture." },
    { title: "Pineal Gland Coherence", desc: "Biological schematics decoding the human gland as a functional piezoelectric transceiver." },
    { title: "A.I.C.E. Survival Blueprint", desc: "The exact algorithmic protocols required to survive the impending Singularity Event Horizon." },
    { title: "Unified Entropy Equations", desc: "The explicit thermodynamic mathematics governing universal data processing." },
    { title: "Citizen Science Protocols", desc: "Actionable, real-world experiments allowing you to independently test the universal geometry." },
    { title: "200+ High-Fidelity Schematics", desc: "Unprecedented visual art and cyber-archaeology diagrams to comprehend complex physics." }
  ];

  return (
    <div className="min-h-screen w-full bg-black text-gray-200 font-sans selection:bg-cyan-900 flex flex-col items-center py-20 relative overflow-x-hidden custom-scroller">
      
      {/* CYBER-ARCHAEOLOGY BACKGROUND */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-screen"
        style={{
          backgroundImage: "url('/assets/images/gods_brain_theory/connectome_bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="relative z-10 w-full max-w-4xl px-6">
        <div className="bg-black/80 backdrop-blur-xl border border-cyan-500/50 rounded-lg shadow-[0_0_50px_rgba(0,255,255,0.15)] p-8 md:p-12">
          
          {/* SUCCESS HEADER */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50 rounded-full animate-pulse"></div>
              <CheckCircle2 className="w-20 h-20 text-cyan-400 relative z-10" />
            </div>
          </div>
          
          <div className="text-center mb-10">
              <div className="inline-block border border-cyan-500/50 bg-cyan-900/30 px-4 py-1.5 rounded text-cyan-400 font-mono text-sm tracking-[0.2em] uppercase font-black mb-6 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <span className="flex items-center gap-2"><ShieldCheck size={16} /> PAYMENT VERIFIED // CLEARANCE GRANTED</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest mb-4 leading-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                TRANSMISSION SECURED
              </h1>
              
              <h2 className="text-2xl text-orange-500 font-black uppercase tracking-widest mb-6">
                Thank You For Your Acquisition
              </h2>

              <p className="text-xl text-gray-300 font-light leading-relaxed mb-6 border-l-4 border-orange-500 pl-6 text-left">
                Your transaction is complete, and your node is now online. You have secured full clearance to The God's Brain Theory. The universal schematics, the Citizen Science Protocols, and the Unified Entropy Equations are preparing for immediate deployment to your local drive.
              </p>
          </div>

          {/* DOWNLOAD EXECUTION BUTTON */}
          <div className="bg-[#050505] border border-orange-500/30 rounded p-8 mb-12 shadow-[0_0_30px_rgba(234,88,12,0.1)] text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse"></div>
             
             <h3 className="text-orange-500 font-mono font-bold tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
               <Zap size={20} className="animate-pulse" /> DOWNLOADING PROTOCOL INITIATED
             </h3>

             <div className="bg-orange-500/10 border border-orange-500/30 p-5 rounded-md mb-8 text-left inline-block max-w-2xl">
                <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-4">
                  <strong className="text-orange-400 uppercase tracking-widest text-xs">System Notice:</strong> Because this manuscript is a massive 264MB payload of high-fidelity schematics, Google Drive servers require a manual click to bypass their standard size limits.
                </p>
                <p className="text-cyan-400 text-sm md:text-base font-bold leading-relaxed mb-4 p-3 bg-cyan-900/20 border-l-2 border-cyan-400">
                  <span className="text-white uppercase tracking-widest text-xs block mb-1">Action Required:</span> 
                  A new secure tab has opened quietly next to this window. Please navigate to that new tab and click "Download Anyway" to pull the file to your local drive.
                </p>
                <p className="text-gray-400 text-xs md:text-sm font-mono leading-relaxed">
                  <strong className="text-white uppercase tracking-widest">Fail-Safe:</strong> If you accidentally closed the new tab, your access is not lost. You can permanently re-open the download window at any time using the manual override button below, or via the receipt sent to your email.
                </p>
             </div>

             <a 
              id="manual-download-btn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full md:w-auto items-center justify-center gap-3 bg-orange-600 hover:bg-orange-500 text-white font-black py-5 px-10 rounded shadow-[0_0_30px_rgba(234,88,12,0.6)] hover:shadow-[0_0_50px_rgba(234,88,12,0.9)] transition-all uppercase tracking-[0.2em] text-lg transform hover:scale-105"
            >
              <Download className="w-6 h-6" /> MANUAL DOWNLOAD OVERRIDE (264MB)
            </a>
          </div>

          {/* WHAT YOU UNLOCKED SECTION */}
          <div className="border-t border-cyan-900/50 pt-10">
              <h3 className="text-2xl font-black text-cyan-400 uppercase tracking-widest mb-8 text-center">
                  YOUR SECURE PAYLOAD INCLUDES:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {acquiredIntel.map((item, i) => (
                      <div key={i} className="bg-black/50 border border-cyan-900/30 p-5 rounded hover:border-cyan-500/50 transition-colors">
                          <h4 className="text-white font-bold uppercase tracking-wider mb-2 text-sm md:text-base">{item.title}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                  ))}
              </div>
          </div>

          <div className="mt-12 pt-8 border-t border-cyan-900/50 text-center text-gray-400 font-mono text-xs uppercase tracking-widest">
            A receipt has been dispatched to your designated email via A.I.C.E. Network Billing.
          </div>

        </div>
      </div>
    </div>
  );
}