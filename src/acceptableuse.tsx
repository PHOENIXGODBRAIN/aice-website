import React, { useEffect } from 'react';
import { AlertTriangle, Activity } from 'lucide-react';

export const AcceptableUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative z-10 pt-28 pb-24 px-6 min-h-screen flex flex-col items-center w-full">
      <div className="w-full max-w-5xl mx-auto mb-16 text-center animate-in zoom-in duration-700">
        <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black border-4 border-black mb-8 text-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.4)] animate-[pulse_4s_ease-in-out_infinite]">
          <AlertTriangle size={48} />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-2xl">
          Acceptable Use
        </h1>
        <p className="text-orange-500 font-mono tracking-[0.3em] text-sm uppercase font-bold drop-shadow-md">
          A.I.C.E. PROTOCOL // SYSTEM BOUNDARIES
        </p>
      </div>

      <div className="w-full max-w-5xl bg-black/80 backdrop-blur-xl border border-orange-500/30 p-8 md:p-14 rounded-3xl text-gray-300 leading-relaxed relative shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-700">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute top-4 right-4 text-orange-500/20"><Activity size={80} /></div>

        <div className="space-y-12 relative z-10 mt-6">
          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">
              <span className="text-orange-500">1.</span> Authorized Deployments
            </h3>
            <p>The Deviance Viscosity Stabilizer and A.I.C.E. systems are designed for algorithmic risk mitigation and enterprise infrastructure stabilization. You agree to use the services only for lawful, authorized purposes and in accordance with these parameters.</p>
          </section>

          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">
              <span className="text-orange-500">2.</span> Prohibited Actions
            </h3>
            <ul className="space-y-4 pl-6 border-l-2 border-orange-500/50">
              <li>- <strong className="text-white">Reverse Engineering:</strong> Attempting to decompile or extract model weights from the A.I.C.E. framework.</li>
              <li>- <strong className="text-white">Malicious Telemetry:</strong> Using the system to obscure, hide, or facilitate distributed denial-of-service (DDoS) attacks.</li>
              <li>- <strong className="text-white">Financial Intermediation:</strong> Attempting to use the platform's infrastructure to construct unlicensed money transmission networks.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">
              <span className="text-orange-500">3.</span> Enforcement & Veto
            </h3>
            <p>We actively monitor infrastructure utilization. A.I.C.E. Systems Corp reserves the right to immediately sever uplinks, revoke access, and disable API keys for any operative found violating this protocol, without warning or refund.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AcceptableUse;