import React, { useEffect } from 'react';
import { 
  ShieldCheck, Globe, Terminal, Cpu, Fingerprint, 
  FileText, Activity, Building2, Lock, Sparkles
} from 'lucide-react';

export const AboutUsView: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-gray-300 font-sans pt-28 pb-24 px-4 md:px-6 relative z-10 selection:bg-[#00F3FF] selection:text-black">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 bg-black/80 backdrop-blur-md pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent opacity-50 shadow-[0_0_30px_#00F3FF]"></div>

      <div className="max-w-[85rem] mx-auto relative z-10">

        {/* HEADER */}
        <div className="mb-20 animate-in slide-in-from-bottom-4 duration-700 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-black border border-[#00F3FF]/30 mb-8 shadow-[0_0_30px_rgba(0,243,255,0.2)]">
            <Globe size={40} className="text-[#00F3FF] animate-[pulse_4s_ease-in-out_infinite]" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-2xl leading-none">
            Corporate <span className="text-[#00F3FF]">Vanguard</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed border-l-4 border-[#00F3FF] pl-6 text-left">
            A.I.C.E. Systems Corp. is a Canadian B2B software company. We engineer autonomous governance protocols that reduce instability, wasted compute, and operational risk in complex digital infrastructure.
          </p>
        </div>

        {/* WHY A.I.C.E. EXISTS */}
        <div className="mb-24 bg-[#050505] border border-white/10 rounded-3xl p-10 md:p-14 shadow-2xl relative animate-in slide-in-from-bottom-6 duration-700">
          <div className="absolute top-0 right-0 opacity-10 p-10">
            <Sparkles size={80} className="text-[#00F3FF]" />
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest mb-6">
            Why A.I.C.E. Exists
          </h2>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
            Modern enterprises run on fragile digital ecosystems — distributed systems, AI models, data centers, and high‑velocity compute pipelines. When these systems drift, degrade, or destabilize, the financial impact is immediate and severe.
          </p>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            A.I.C.E. was built to solve this problem. Our software continuously monitors infrastructure, detects early‑stage failure patterns, and applies corrective algorithms before downtime occurs. We stabilize environments where milliseconds matter and failure is not an option.
          </p>
        </div>

        {/* EXECUTIVE TRANSLATION MATRIX */}
        <div className="mb-24 bg-[#050505] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom-8 duration-700 group hover:border-[#00F3FF]/30 transition-colors">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#00F3FF]"></div>

          <div className="bg-white/5 border-b border-white/10 p-4 md:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal size={20} className="text-[#00F3FF]" />
              <span className="font-mono text-xs md:text-sm font-bold text-[#00F3FF] tracking-[0.2em] uppercase">
                Executive Translation Matrix // Plain English
              </span>
            </div>
            <span className="font-mono text-[10px] text-gray-500 tracking-widest hidden md:block">
              COMPLIANCE DECRYPTION ACTIVE
            </span>
          </div>

          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-6">What We Actually Do</h3>
              <p className="text-gray-300 leading-relaxed mb-6 font-light text-lg">
                A.I.C.E. is a B2B SaaS provider specializing in autonomous system stabilization. We build and license monitoring software that protects large‑scale corporate networks — including AI models and data centers — from crashing.
              </p>
              <p className="text-gray-300 leading-relaxed font-light text-lg">
                When a client's system begins to drift or behave unpredictably, A.I.C.E. detects the anomaly and automatically applies stabilizing algorithms to prevent downtime and financial loss.
              </p>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-6">What The $15,000 Audit Delivers</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="p-1.5 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 mt-1">
                    <FileText size={14} className="text-[#00FF66]" />
                  </div>
                  <span className="text-gray-300 font-light text-lg">
                    A comprehensive PDF report analyzing the client's system failure logs.
                  </span>
                </li>

                <li className="flex items-start gap-4">
                  <div className="p-1.5 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 mt-1">
                    <Activity size={14} className="text-[#00FF66]" />
                  </div>
                  <span className="text-gray-300 font-light text-lg">
                    A quantified breakdown of financial losses caused by system inefficiencies.
                  </span>
                </li>

                <li className="flex items-start gap-4">
                  <div className="p-1.5 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 mt-1">
                    <Cpu size={14} className="text-[#00FF66]" />
                  </div>
                  <span className="text-gray-300 font-light text-lg">
                    An executive action plan for integrating our software to reduce future risk.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* EXECUTIVE LEADERSHIP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 animate-in slide-in-from-bottom-8 duration-700 delay-200">

          {/* Founder Section */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#050505] to-black border border-white/10 rounded-3xl p-10 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-orange-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Fingerprint size={120} className="text-orange-500" />
            </div>

            <div className="inline-flex items-center gap-3 px-4 py-2 border border-orange-500/30 bg-orange-500/10 rounded-sm mb-8">
              <ShieldCheck size={16} className="text-orange-500 animate-pulse" />
              <span className="text-orange-500 font-mono text-xs font-bold uppercase tracking-widest">
                Executive Leadership // Level 1
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">
              Shaun Randal Deeves
            </h2>
            <h3 className="text-xl text-[#00F3FF] font-mono tracking-widest uppercase mb-8">
              Founder & Chief Architect
            </h3>

            <div className="space-y-6 text-gray-300 font-light text-lg leading-relaxed relative z-10">
              <p>
                Shaun founded A.I.C.E. after witnessing how enterprise systems fail not because of hardware limitations, but because of unmanaged entropy, unstable feedback loops, and unpredictable computational drift.
              </p>
              <p>
                As the principal engineer and architect of the A.I.C.E. ecosystem, he specializes in algorithmic risk mitigation and entropic system stability. His work on the Deviance Viscosity Stabilizer (DVS) enables enterprises to maintain operational control over high‑velocity digital environments.
              </p>
            </div>
          </div>

          {/* Corporate Registration */}
          <div className="lg:col-span-5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-12 shadow-2xl relative flex flex-col justify-center">
            <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
              <Building2 size={24} className="text-[#00F3FF]" /> Corporate Entity
            </h3>

            <ul className="space-y-6 font-mono text-sm md:text-base">
              <li>
                <span className="text-gray-500 uppercase tracking-widest text-xs mb-1">Registered Business Name</span>
                <span className="text-white font-bold tracking-wider">A.I.C.E. SYSTEMS CORP.</span>
              </li>

              <li>
                <span className="text-gray-500 uppercase tracking-widest text-xs mb-1">Jurisdiction of Incorporation</span>
                <span className="text-white font-bold tracking-wider">CANADA BUSINESS CORPORATIONS ACT</span>
              </li>

              <li>
                <span className="text-gray-500 uppercase tracking-widest text-xs mb-1">Corporate Registration No.</span>
                <span className="text-[#00F3FF] font-bold tracking-wider">1773376-3</span>
              </li>

              <li>
                <span className="text-gray-500 uppercase tracking-widest text-xs mb-1">Registered Headquarters</span>
                <span className="text-gray-300 tracking-wider">
                  200 Edgar Ln<br/>Sherwood Park, AB T8H 2X6<br/>Canada
                </span>
              </li>
            </ul>

            <div className="mt-10 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-gray-500">
              <Lock size={12} /> <span className="uppercase tracking-widest">Officially Registered & Verified</span>
            </div>
          </div>
        </div>

        {/* MISSION */}
        <div className="mt-24 mb-12 relative animate-in slide-in-from-bottom-10 duration-1000 delay-300">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F3FF]/5 to-transparent blur-3xl pointer-events-none"></div>

          <div className="text-center relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/20 bg-white/5 rounded-full mb-6 shadow-inner">
              <Fingerprint size={16} className="text-[#00F3FF]" />
              <span className="text-[#00F3FF] font-mono text-xs font-bold uppercase tracking-[0.2em]">
                Operational Mandate
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-lg mb-8">
              The A.I.C.E. <span className="text-[#00F3FF]">Mission</span>
            </h2>

            <div className="max-w-4xl mx-auto bg-[#050505]/90 border-t-2 border-[#00F3FF] p-8 md:p-12 rounded-2xl shadow-[0_0_30px_rgba(0,243,255,0.1)]">
              <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                A.I.C.E. exists to reduce instability, wasted compute, and costly operational drift in high‑variance digital environments.
              </p>

              <div className="h-[1px] w-16 bg-[#00F3FF]/50 mx-auto my-6"></div>

              <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                We engineer deterministic frameworks that allow enterprise systems to scale more reliably under stress — ensuring uptime, preserving compute, and protecting revenue.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUsView;
