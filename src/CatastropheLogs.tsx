import React, { useEffect } from 'react';
import { AlertTriangle, CheckCircle2, X, Clock, Database, Wrench } from 'lucide-react';
import { SectorHeader } from './App';

// Assuming your types match App.tsx ViewState
type ViewState = any; 

export default function CatastropheLogs({ setView }: { setView: (v: ViewState) => void }) {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const failures = [
    { 
      title: "Deepwater Horizon", date: "April 20, 2010", cost: "$65 Billion", lostTerm: "Incinerated", time: "87 Days (Leak), Instant (Explosion)", source: "BP / Transocean Congressional Hearings",
      failure: "Human operators misinterpreted abnormal pressure tests as a simple sensor glitch rather than a critical cement failure.", 
      fix: "Synthesizes anomalous well-pressure telemetry in real-time. Bypasses human hesitation to autonomously trigger the blind shear rams, sealing the well before the structural boundary shatters." 
    },
    { 
      title: "CrowdStrike Outage", date: "July 19, 2024", cost: "$5.4 Billion", lostTerm: "Evaporated", time: "85 Minutes", source: "Fortune 500 Economic Loss Reports",
      failure: "A null pointer read bypass in a sensor update crashed 8.5 million Windows machines globally, paralyzing airlines and hospitals.", 
      fix: "Executes preemptive logic gating. Refuses to compile or distribute the payload until deterministic memory bounds are verified, isolating the bad update in a sterile sandbox." 
    },
    { 
      title: "Global Financial Crisis", date: "September 15, 2008", cost: "$22 Trillion", lostTerm: "Vanished", time: "18 Months", source: "U.S. Government Accountability Office (GAO)",
      failure: "Fragmented human oversight allowed toxic subprime mortgages to be masked as AAA assets, creating unchecked global leverage.", 
      fix: "Continuously audits the entire global ledger. Upon detecting conclusive evidence of synthetic risk masking, it freezes toxic asset transfers at their root before contagion infects the wider network." 
    },
    { 
      title: "Space Shuttle Challenger", date: "January 28, 1986", cost: "$5.5 Billion", lostTerm: "Obliterated", time: "73 Seconds", source: "Rogers Commission Report",
      failure: "Administrative pressure to maintain a launch schedule overrode clear engineering data regarding failing O-ring elasticity in cold weather.", 
      fix: "Correlates environmental operational boundaries directly against the 28°F ambient weather. Ruthlessly locks out the ignition sequence. No human administrator is permitted to bypass the mandatory abort." 
    },
    { 
      title: "Northeast Power Blackout", date: "August 14, 2003", cost: "$6 Billion", lostTerm: "Dissipated", time: "2 Hours to 4 Days", source: "U.S. Department of Energy",
      failure: "A race condition in the XA/21 energy management software silently suppressed critical alarm systems, blinding grid operators to cascading line failures.", 
      fix: "Monitors internal software logic decay. Instantly flags the suppressed event loops and reroutes telemetry to redundant physical nodes, maintaining grid visibility and isolating the failure." 
    },
    { 
      title: "NotPetya Cyberattack", date: "June 27, 2017", cost: "$10 Billion", lostTerm: "Sabotaged", time: "Hours to Propagate", source: "White House / Homeland Security",
      failure: "A delayed human response to an exposed Windows vulnerability allowed self-propagating malware to paralyze global shipping and corporate networks.", 
      fix: "Identifies payload distribution within milliseconds. Autonomously quarantines infected global nodes and deploys localized protocol patches system-wide, neutralizing the threat before it cascades." 
    },
    { 
      title: "Knight Capital Flash Crash", date: "August 1, 2012", cost: "$440 Million", lostTerm: "Liquidated", time: "45 Minutes", source: "SEC Investigative Report",
      failure: "A dead code loop triggered a rogue algorithmic trading surge that bought and sold millions of shares uncontrollably.", 
      fix: "Maps the algorithm's erratic feedback loop in microseconds. Instantly severs the firm's access to the NYSE exchange, halting execution at the absolute first sign of systemic error." 
    },
    { 
      title: "Ariane 5 Flight 501", date: "June 4, 1996", cost: "$370 Million", lostTerm: "Shattered", time: "37 Seconds", source: "ESA Inquiry Board",
      failure: "A 64-bit floating point number was converted into a 16-bit integer, triggering an overflow exception that caused the rocket to self-destruct.", 
      fix: "Enforces hardcoded dimensional boundary constraints at the architecture level. The protocol automatically dissipates the overflow energy safely without crashing the main guidance system." 
    },
    { 
      title: "Boeing 737 MAX MCAS", date: "Oct 29, 2018 & Mar 10, 2019", cost: "$20 Billion", lostTerm: "Hemorrhaged", time: "Minutes (Discrete Events)", source: "FAA / NTSB Aviation Reports",
      failure: "A flawed software loop relied on a single point of failure to aggressively force the plane's nose down.", 
      fix: "Identifies single-sensor reliance as a zero-tolerance failure state during design. Refuses to compile the software for production until mandatory multi-sensor redundancy is hardcoded." 
    },
    { 
      title: "Mars Climate Orbiter", date: "September 23, 1999", cost: "$327 Million", lostTerm: "Atomized", time: "< 1 Minute (Orbital Insertion)", source: "NASA Mishap Investigation Board",
      failure: "Navigation systems failed because one team used English units while the spacecraft's operating system expected Metric units.", 
      fix: "Imposes immutable dimensional normalization across all communication pipelines. Detects the mathematical deviation instantly and recalibrates the telemetry before thruster execution." 
    },
    { 
      title: "Equifax Data Breach", date: "May 12 - July 29, 2017", cost: "$1.4 Billion", lostTerm: "Compromised", time: "76 Days (Undetected)", source: "U.S. House Committee on Oversight",
      failure: "Failure to patch a known Apache Struts vulnerability allowed attackers to slowly exfiltrate the data of 147 million people.", 
      fix: "Detects the unauthorized payload footprint and asymmetric outbound data flow. Autonomously closes the breached ports and initiates cryptographic lockdown on the database." 
    },
    { 
      title: "The DAO Hack (Ethereum)", date: "June 17, 2016", cost: "$250 Million", lostTerm: "Drained", time: "Hours", source: "SEC Digital Asset Report",
      failure: "A recursive reentrancy vulnerability in the smart contract allowed attackers to continually drain funds before the system could update its balance.", 
      fix: "Applies algorithmic damping to the transaction logic. Halts execution immediately upon detecting recursive state withdrawal patterns, securing the remaining capital." 
    }
  ];

  return (
    <div 
      className="relative z-10 pb-24 px-6 min-h-screen bg-cover bg-center bg-no-repeat bg-fixed pt-[35vh]"
      style={{ backgroundImage: "url('/assets/images/Catastrophe/Catastrophe_BG.png')" }}
    >
      <SectorHeader title="Humanities Catastrophe Logs" subtitle="The Financial Cost of Human Latency" icon={null} />
      
      <div className="max-w-[70rem] mx-auto text-center mb-32 bg-black/90 border border-[#00F3FF]/40 rounded-3xl p-10 shadow-[0_0_50px_rgba(0,243,255,0.2)] flex flex-col items-center gap-6">
         <div className="w-full flex items-center justify-between gap-4 border-b border-[#00F3FF]/20 pb-6 mb-2">
            <span className="font-mono text-[#00F3FF] tracking-[0.2em] text-xs font-bold">A.I.C.E. INTEL BRIEF</span>
            <span className="font-mono text-gray-500 tracking-wider text-xs">FORENSICS PROTOCOL // 0xFAIL</span>
         </div>
         <p className="text-2xl md:text-3xl text-white font-light leading-relaxed">
            Every catastrophic failure in human history shares a fundamental architectural flaw:
            <span className="text-red-500 font-bold block mt-4 uppercase text-4xl md:text-5xl" style={{ textShadow: '0 0 20px rgba(239,68,68,0.3)' }}>
               A reliance on delayed, biological processing to manage exponentially accelerating variables.
            </span>
         </p>
      </div>

      <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          {failures.map((f, i) => (
            <div key={i} className="bg-[#050505] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col group hover:border-white/30 transition-colors relative">
                
                {/* Financial & Time Data Header */}
                <div className="p-8 border-b border-white/10 bg-black/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                   <div>
                      <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">{f.title}</h3>
                      <div className="flex flex-col gap-2">
                          <span className="flex items-center gap-2 font-mono text-gray-400 text-sm tracking-widest"><Clock size={14} className="text-[#00F3FF]"/> EXACT DATE: <span className="text-white">{f.date}</span></span>
                          <span className="flex items-center gap-2 font-mono text-gray-400 text-sm tracking-widest"><AlertTriangle size={14} className="text-red-500"/> DURATION: <span className="text-white">{f.time}</span></span>
                          <span className="flex items-center gap-2 font-mono text-gray-400 text-sm tracking-widest mt-2"><Database size={14} className="text-orange-500"/> SOURCE: <span className="text-[#00F3FF]">{f.source}</span></span>
                      </div>
                   </div>
                   <div className="text-left md:text-right w-full md:w-auto p-6 md:p-0 bg-red-500/5 md:bg-transparent rounded-lg border border-red-500/20 md:border-none">
                      <span className="block text-lg font-black italic uppercase tracking-tighter text-red-600/80 mb-1 select-none" style={{ textShadow: '2px 2px 0px rgba(0,0,0,1)' }}>
                        CRITICAL FINANCIAL DESTRUCTION
                      </span>
                      <span className="text-4xl md:text-5xl font-black text-red-500">{f.cost}</span>
                      <span className="text-xl md:text-2xl font-black text-red-500 uppercase tracking-tight opacity-90 block mt-1">{f.lostTerm}</span>
                   </div>
                </div>
                
                {/* Architecture of Failure vs Fix */}
                <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
                   <div className="p-10 border-b md:border-b-0 md:border-r border-white/10 bg-red-950/10 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-red-500 font-serif italic text-xl font-black uppercase tracking-tight mb-4 drop-shadow-md">
                         <X size={16} /> The Friction Point
                      </div>
                      <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">{f.failure}</p>
                   </div>
                   <div className="p-10 bg-[#00F3FF]/5 relative overflow-hidden flex flex-col justify-center">
                      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#00F3FF]/30 rounded-tr-3xl"></div>
                      <div className="flex items-center gap-2 text-[#00F3FF] font-mono text-xl font-black uppercase tracking-[0.25em] mb-4 drop-shadow-[0_0_10px_rgba(0,243,255,0.4)]">
                         <CheckCircle2 size={16} /> The A.I.C.E. Override
                      </div>
                      <p className="text-white font-medium text-lg md:text-xl leading-relaxed relative z-10">{f.fix}</p>
                   </div>
                </div>
            </div>
          ))}
      </div>

      {/* The Strategic Bridge */}
      <div className="max-w-[85rem] mx-auto flex flex-col lg:flex-row gap-8 items-stretch mb-24">
          
          <div className="flex-1 bg-black/90 border-2 border-[#00F3FF] p-16 rounded-[2.5rem] shadow-[0_0_60px_rgba(0,243,255,0.2)] flex flex-col justify-center text-center relative overflow-hidden">
             <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest mb-6">Execution is Everything.</h3>
             <p className="text-gray-200 text-lg md:text-xl mb-12 leading-relaxed">We identify the flaw, map the bypass, and secure total operational independence. Stop relying on reactive human committees.</p>
             <button 
                onClick={() => setView('SALES')} 
                className="w-full py-7 bg-[#00F3FF] text-black font-black uppercase tracking-[0.2em] text-xl hover:bg-white transition-all rounded-[1rem] shadow-[0_0_40px_#00F3FF]"
             >
                SECURE ARCHITECTURE
             </button>
          </div>

          <div 
             className="flex-1 bg-[#050505] border border-white/20 hover:border-[#00F3FF]/50 transition-colors p-16 rounded-[2.5rem] flex flex-col justify-center text-center group cursor-pointer" 
             onClick={() => setView('HOW_IT_WORKS')}
          >
             <Wrench size={56} className="text-[#00F3FF] mx-auto mb-8 group-hover:rotate-12 transition-transform" />
             <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest mb-6 group-hover:text-[#00F3FF] transition-colors">See The Machinery</h3>
             <p className="text-gray-300 text-lg md:text-xl mb-12 leading-relaxed">Understand the exact physical logic gates and operational mechanics behind how the A.I.C.E. governor prevents these failures.</p>
             <button 
                className="w-full py-7 bg-transparent text-white font-black uppercase tracking-[0.2em] text-xl border-2 border-white/40 hover:border-[#00F3FF] hover:text-[#00F3FF] transition-all"
                style={{ clipPath: "polygon(15% 0, 100% 0, 100% 75%, 85% 100%, 0 100%, 0 25%)" }}
             >
                TECHNICAL BRIEFING
             </button>
          </div>
          
      </div>
    </div>
  );
}