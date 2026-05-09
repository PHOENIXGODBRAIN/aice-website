import React, { useState, useEffect } from 'react';
import { Calculator, ShieldCheck, Activity, ChevronRight, BarChart3, Shield } from 'lucide-react';
import { DIAGNOSTIC_PRICING, DIAGNOSTIC_LABEL, DIAGNOSTIC_MIN_LABEL } from '../pricing';

const colors = {
  deepViolet: '#1A0B2E',
  phoenixAzure: '#00FFFF',
  starkWhite: '#FFFFFF',
  interfaceGrey: '#DEDEDE',
  warningCrimson: '#FF4500',
  nominalGreen: '#00FF66'
};

const readableFont = '"Google Sans", "Inter", "Segoe UI", Roboto, Arial, sans-serif';

interface ErvMatrixProps {
  routeToIntake: () => void;
}

const ErvMatrix: React.FC<ErvMatrixProps> = ({ routeToIntake }) => {
  const [systemClass, setSystemClass] = useState<number>(1.5);
  const [telemetryVolumeGB, setTelemetryVolumeGB] = useState<number>(500);
  const [errorRate, setErrorRate] = useState<number>(2.5);

  const [riskScore, setRiskScore] = useState<number>(0);
  const [tier, setTier] = useState<string>("CALCULATING...");
  const [fee, setFee] = useState<number>(DIAGNOSTIC_PRICING.CLASS_3);
  const [tierColor, setTierColor] = useState<string>(colors.phoenixAzure);

  useEffect(() => {
    const rawScore = (telemetryVolumeGB / 100) * errorRate * systemClass;
    setRiskScore(parseFloat(rawScore.toFixed(2)));

    if (rawScore >= 120) {
      setTier("CRITICAL FRACTURE");
      setTierColor(colors.warningCrimson);
      setFee(DIAGNOSTIC_PRICING.CLASS_1);
    } else if (rawScore >= 60) {
      setTier("SEVERE ENTROPY");
      setTierColor('#FF8C00');
      setFee(DIAGNOSTIC_PRICING.CLASS_2);
    } else if (rawScore >= 25) {
      setTier("ELEVATED RISK");
      setTierColor('#FFD700');
      setFee(DIAGNOSTIC_PRICING.CLASS_3);
    } else {
      setTier("NOMINAL VARIANCE");
      setTierColor(colors.nominalGreen);
      setFee(DIAGNOSTIC_PRICING.CLASS_3);
    }
  }, [systemClass, telemetryVolumeGB, errorRate]);

  return (
    <div
      style={{ fontFamily: readableFont }}
      className="w-full max-w-5xl mx-auto my-16 bg-[#020202] border border-[#00F3FF]/30 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,243,255,0.1)] relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-3 border border-[#00F3FF]/50 bg-[#00F3FF]/10 px-6 py-2 rounded-full mb-6">
          <Calculator size={18} className="text-[#00F3FF]" />
          <span className="text-xs font-mono tracking-widest text-[#00F3FF] uppercase font-bold">
            Entropic Risk Valuation (ERV)
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
          Calculate Your <span className="text-[#00F3FF]">System Vulnerability</span>
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          Input your infrastructure parameters below. The matrix will determine your risk tier and the mandatory one-time diagnostic fee required to begin the 14-Day audit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        <div className="space-y-8 bg-black/50 p-8 rounded-2xl border border-white/5">
          <div className="flex flex-col">
            <label className="text-[#00F3FF] font-mono text-[10px] font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
              <Shield size={14} /> 01 // System Classification
            </label>
            <select
              value={systemClass}
              onChange={(e) => setSystemClass(parseFloat(e.target.value))}
              className="w-full bg-[#050505] text-white border border-gray-700 p-4 rounded-lg outline-none focus:border-[#00F3FF] font-mono text-sm cursor-pointer transition-colors"
            >
              <option value={1.0}>Class 3: Commercial / Edge [1.0x Multiplier]</option>
              <option value={1.5}>Class 2: Enterprise Operations [1.5x Multiplier]</option>
              <option value={3.0}>Class 1: Systemic / Financial [3.0x Multiplier]</option>
              <option value={5.0}>Class S: Sovereign / Life-Critical [5.0x Multiplier]</option>
            </select>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-end mb-3">
              <label className="text-[#00F3FF] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                <BarChart3 size={14} /> 02 // Telemetry Volume (GB)
              </label>
              <span className="text-white font-mono font-bold">{telemetryVolumeGB.toLocaleString()} GB</span>
            </div>
            <input
              type="range"
              min="10"
              max="10000"
              step="10"
              value={telemetryVolumeGB}
              onChange={(e) => setTelemetryVolumeGB(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00F3FF]"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-end mb-3">
              <label className="text-[#00F3FF] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                <Activity size={14} /> 03 // Current Deviance / Error Rate
              </label>
              <span className="text-white font-mono font-bold">{errorRate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="15"
              step="0.1"
              value={errorRate}
              onChange={(e) => setErrorRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00F3FF]"
            />
          </div>
        </div>

        <div
          className="flex flex-col justify-center bg-gradient-to-br from-[#050505] to-[#111] p-8 rounded-2xl border-l-4 shadow-2xl relative overflow-hidden transition-colors duration-500"
          style={{ borderLeftColor: tierColor }}
        >
          <div className="absolute top-4 right-4 opacity-10">
            <ShieldCheck size={100} style={{ color: tierColor }} />
          </div>

          <div className="mb-2 text-gray-500 font-mono text-[10px] uppercase tracking-widest">Calculated Risk Index</div>
          <div 
  className="text-8xl md:text-9xl font-black mb-8 tracking-tight drop-shadow-[0_0_25px_rgba(0,243,255,0.35)]"
  style={{ color: tierColor }}
>
  {riskScore}
</div>


          <div className="mb-8">
            <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-1">Diagnosed Infrastructure State</div>
            <div 
  className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest drop-shadow-[0_0_15px_rgba(0,243,255,0.25)]"
  style={{ color: tierColor }}
>
  {tier}
</div>
          </div>

          <div className="border-t border-white/10 pt-6 mb-8">
            <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-2">One-Time Diagnostic Fee</div>
            <div className="text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
  ${fee.toLocaleString()}
  <span className="block text-base md:text-lg text-gray-400 font-medium tracking-widest mt-2">
    One-Time Diagnostic Fee
  </span>
</div>

            <div className="text-xs text-gray-400 mt-2">{DIAGNOSTIC_LABEL}</div>
            <div className="text-xs text-gray-500 mt-1">{DIAGNOSTIC_MIN_LABEL}</div>
          </div>

          <button
            onClick={routeToIntake}
            className="w-full py-5 text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-all rounded-xl shadow-lg flex items-center justify-center gap-3"
            style={{ backgroundColor: tierColor }}
          >
            Initiate 14-Day Diagnostic Audit <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErvMatrix;