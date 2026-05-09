import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Terminal, ClipboardCheck, ShieldCheck, Activity, ArrowRight } from 'lucide-react';

// ============================================================
// Asset helpers
// ============================================================
const asset = (path: string) => encodeURI(path);

const TELEMETRY_URL = 'http://localhost:8080';

// ============================================================
// Types
// ============================================================
type Telemetry = {
  ids: number;
  p: number;
  omega: number;
  mode: 'OBSERVE' | 'MITIGATE';
  timestamp: string;
  cycle: number;
};

type ChartProps = { p: number };

// ============================================================
// Utility
// ============================================================
function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function formatTime(date = new Date()) {
  return date.toTimeString().slice(0, 8);
}

// ============================================================
// Fire Chart
// ============================================================
const FireChart: React.FC<ChartProps> = ({ p }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<number[]>(Array.from({ length: 160 }, () => Math.random()));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#020508';
      ctx.fillRect(0, 0, w, h);

      // grid
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const intensity = clamp(0.15 + p * 1.1, 0.1, 1.35);
      const volatility = 90 + p * 180;

      t += 0.012 + p * 0.025;
      const pts = pointsRef.current;

      ctx.beginPath();
      ctx.moveTo(0, h);

      for (let i = 0; i < pts.length; i++) {
        const x = (i / (pts.length - 1)) * w;
        const drift = (Math.random() - 0.5) * 0.09 * intensity;
        pts[i] = clamp(pts[i] + drift, 0, 1);

        const ripple = Math.sin(i * 0.18 + t * 5) * (8 + p * 22);
        const y = h - 26 - pts[i] * volatility - ripple * p;
        ctx.lineTo(x, y);

        if (Math.random() < 0.08 * intensity) {
          const sparkY = y - Math.random() * (45 + p * 60);
          const sparkR = 1 + Math.random() * (2 + p * 4);
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, ${120 + Math.random() * 135}, 0, ${0.2 + Math.random() * 0.8})`;
          ctx.shadowColor = '#ff4500';
          ctx.shadowBlur = 18;
          ctx.arc(x, sparkY, sparkR, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // main line
      ctx.strokeStyle = 'rgba(255, 95, 0, 0.95)';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#ff4500';
      ctx.shadowBlur = 24;
      ctx.stroke();

      // fill
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      const grad = ctx.createLinearGradient(0, h - 250, 0, h);
      grad.addColorStop(0, `rgba(255, 69, 0, ${0.5 * intensity})`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fill();

      // glow haze
      ctx.globalCompositeOperation = 'screen';
      const haze = ctx.createRadialGradient(w * 0.55, h * 0.3, 20, w * 0.5, h * 0.5, w * 0.7);
      haze.addColorStop(0, `rgba(255, 120, 0, ${0.12 * intensity})`);
      haze.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [p]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
};

// ============================================================
// FlowState Chart
// ============================================================
const FlowStateChart: React.FC<ChartProps> = ({ p }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawWave = (w: number, h: number, offset: number, amplitude: number, color: string, glow: string, speedScale: number) => {
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 5) {
        const base = h - 82;
        const wave = Math.sin(x * 0.008 + t * speedScale + offset) * amplitude;
        const wobble = Math.cos(x * 0.013 + t * 0.55 + offset) * (amplitude * 0.22);
        ctx.lineTo(x, base + wave + wobble);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.shadowColor = glow;
      ctx.shadowBlur = 28;
      ctx.stroke();

      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      const grad = ctx.createLinearGradient(0, h - 170, 0, h);
      grad.addColorStop(0, color.replace('1)', '0.38)'));
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fill();
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#020508';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      t += 0.008 + p * 0.04;
      const motion = 1 + p * 1.6;

      drawWave(w, h, 0.0, 18 + p * 10, 'rgba(0, 243, 255, 1)', '#00F3FF', 0.9 * motion);
      drawWave(w, h, 1.9, 30 + p * 15, 'rgba(0, 150, 255, 0.65)', '#0096FF', 0.75 * motion);
      drawWave(w, h, 3.6, 12 + p * 6, 'rgba(255, 255, 255, 0.35)', '#FFFFFF', 1.05 * motion);

      // subtle ice glaze
      ctx.globalCompositeOperation = 'screen';
      const haze = ctx.createRadialGradient(w * 0.35, h * 0.35, 20, w * 0.5, h * 0.5, w * 0.7);
      haze.addColorStop(0, `rgba(0, 243, 255, ${0.14 + p * 0.08})`);
      haze.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [p]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
};

// ============================================================
// Holo Engine Card (kept INSIDE the right-side box)
// ============================================================
const HoloEngineCard: React.FC<{ p: number }> = ({ p }) => {
  const fireOpacity = clamp((p - 0.25) * 1.6, 0, 1);
  const iceOpacity = 1 - fireOpacity;

  return (
    <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-[#00F3FF]/20 bg-black/70 flex flex-col justify-between">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/40 to-[#00F3FF]/10 pointer-events-none" />
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="relative w-[78%] max-w-[420px] aspect-square">
          <div
            className="absolute inset-0 rounded-full blur-[55px] mix-blend-screen transition-opacity duration-700"
            style={{ opacity: iceOpacity, background: 'rgba(0,243,255,0.22)' }}
          />
          <div
            className="absolute inset-0 rounded-full blur-[55px] mix-blend-screen transition-opacity duration-700"
            style={{ opacity: fireOpacity, background: 'rgba(255,69,0,0.2)' }}
          />

          {/* blue / frozen state (Syntropy) */}
          <img
            src={asset('/assets/images/Command Deck/aicefreezelogo.png')}
            alt="Frozen Phoenix State"
            className="absolute inset-0 h-full w-full object-contain mix-blend-screen transition-opacity duration-700 drop-shadow-[0_0_18px_#00F3FF]"
            style={{ opacity: iceOpacity }}
          />

          {/* orange / burn state (Entropy) */}
          <img
            src={asset('/assets/images/Command Deck/aiceburnlogo.png')}
            alt="Burn Phoenix State"
            className="absolute inset-0 h-full w-full object-contain mix-blend-screen transition-opacity duration-700 drop-shadow-[0_0_18px_#ff4500]"
            style={{ opacity: fireOpacity }}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Main Component
// ============================================================
const CommandDeck: React.FC = () => {
  const [telemetry, setTelemetry] = useState<Telemetry>({
    ids: 0,
    p: 0.5,
    omega: 0.5,
    mode: 'OBSERVE',
    timestamp: formatTime(),
    cycle: 0,
  });

  const [statusSource, setStatusSource] = useState<'simulated' | 'local'>('simulated');
  const simRef = useRef(0);

  useEffect(() => {
    let mounted = true;
    let intervalId = 0;

    const simulateStep = () => {
      simRef.current += 1;
      const cycle = simRef.current;
      const p = clamp(0.18 + 0.72 * (0.5 + 0.5 * Math.sin(cycle * 0.22)) + (Math.random() - 0.5) * 0.08, 0, 1);
      const omega = clamp((1 - p) * 18 + 1.5 * Math.sin(cycle * 0.11) + (Math.random() - 0.5), 0, 22);
      const mode = p >= 0.68 ? 'MITIGATE' : 'OBSERVE';

      setTelemetry({
        ids: Math.round(p * 10000),
        p,
        omega,
        mode,
        timestamp: formatTime(),
        cycle,
      });
    };

    const tryFetch = async () => {
      try {
        if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
          const response = await fetch(TELEMETRY_URL, { cache: 'no-store' });
          if (!response.ok) throw new Error('bad response');
          const data = await response.json();

          if (mounted && typeof data?.p === 'number') {
            setStatusSource('local');
            setTelemetry({
              ids: Number(data.ids ?? 0),
              p: clamp(Number(data.p), 0, 1),
              omega: Number(data.omega ?? 0.5),
              mode: data.mode === 'MITIGATE' ? 'MITIGATE' : 'OBSERVE',
              timestamp: String(data.timestamp ?? formatTime()),
              cycle: Number(data.cycle ?? 0),
            });
            return;
          }
        }
      } catch {
        // ignore and fall back to simulated runtime
      }
      if (mounted) {
        setStatusSource('simulated');
        simulateStep();
      }
    };

    tryFetch();
    intervalId = window.setInterval(tryFetch, 1800);

    return () => {
      mounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const needleRotation = useMemo(() => {
    return clamp(telemetry.p * 180, 0, 180) - 90;
  }, [telemetry.p]);

  const coherenceColor =
    telemetry.p >= 0.7 ? 'text-orange-500' : telemetry.p >= 0.5 ? 'text-yellow-400' : 'text-[#00F3FF]';

  const coherenceStatus =
    telemetry.p >= 0.7 ? 'CRITICAL ENTROPY' : telemetry.p >= 0.5 ? 'MITIGATING' : 'SYNTROPY LOCKED';

  const fireOpacity = clamp((telemetry.p - 0.3) * 3, 0, 1);
  const iceOpacity = 1 - fireOpacity;

  return (
    <div className="min-h-screen bg-[#020305] text-[#00F3FF] font-mono p-4 md:p-8 flex flex-col relative overflow-hidden selection:bg-[#00F3FF] selection:text-black">
      {/* Atmospheric background layers */}
      <div className="absolute inset-x-0 top-0 z-0 pointer-events-none flex flex-col opacity-30 mix-blend-screen overflow-hidden">
        <div
          className="relative w-full z-10"
          style={{
            maskImage: 'linear-gradient(to bottom, black 75%, transparent 95%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 95%)',
          }}
        >
          <img
            src={asset('/assets/images/Command Deck/AICEDVS.jpeg')}
            alt="Command Deck Upper Sector"
            className="w-full h-auto object-top pb-12"
          />
        </div>
        <div
          className="relative w-full z-0 -mt-24 md:-mt-48"
          style={{
            maskImage: 'linear-gradient(to top, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 80%, transparent 100%)',
          }}
        >
          <img
            src={asset('/assets/images/Command Deck/Commanddeck2.png')}
            alt="Command Deck Lower Sector"
            className="w-full h-auto object-top"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] pointer-events-none mix-blend-overlay z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#020305]/80 to-black z-0 pointer-events-none" />

      {/* Header */}
      <div className="w-full text-center relative z-10 pt-8 pb-10 animate-in slide-in-from-top-4 duration-700">
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-black border-2 border-[#00F3FF]/50 mb-6 text-[#00F3FF] shadow-[0_0_30px_rgba(0,243,255,0.3)]">
          <Terminal size={36} className="animate-pulse" />
        </div>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-sans font-black text-white uppercase tracking-tighter mb-4 leading-none drop-shadow-2xl"
          style={{ textShadow: '0 4px 20px rgba(0,0,0,1)' }}
        >
          COMMAND <span className="text-[#00F3FF]">DECK</span>
        </h1>

        <p className="text-[#00F3FF] font-mono tracking-[0.4em] text-sm md:text-base uppercase font-bold mb-8" style={{ textShadow: '0 0 10px rgba(0,243,255,0.5)' }}>
          D.V.S. Operations Center // Live Simulation
        </p>

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-black/80 border border-[#00F3FF]/40 p-6 md:p-8 rounded-2xl backdrop-blur-xl shadow-[0_0_40px_rgba(0,243,255,0.15)]">
            <h2 className="text-[#00F3FF] font-black uppercase tracking-widest mb-4 flex items-center justify-center gap-3 text-xl md:text-2xl">
              <ShieldCheck size={24} /> SIMULATION: FREEZER BURN v3.0
            </h2>
            <p className="text-gray-300 font-mono text-base leading-relaxed mb-4">
              Welcome to the operational proving ground. This interface simulates a catastrophic high-entropy event{' '}
              <span className="text-[#ff4500] font-bold tracking-widest">(ENTROPIC THERMAL BURN)</span> colliding with the deterministic A.I.C.E. protocol{' '}
              <span className="text-[#00F3FF] font-bold tracking-widest">(SYNTROPIC FLOWSTATE)</span>.
            </p>
            <div className="border-t border-white/10 pt-6 mt-2">
  <p className="text-[#00F3FF] font-sans text-lg md:text-xl leading-relaxed font-black tracking-widest uppercase italic border-l-4 border-[#00F3FF] pl-5 py-2 drop-shadow-[0_0_8px_rgba(0,243,255,0.4)]">
    "Entropy is not a destiny to be suffered; it is a variable to be governed. We do not merely observe the chaos—we control it with syntropy. This is Humanities Path Forward in the modern technological era."
  </p>
</div>
          </div>
        </div>
      </div>

      {/* Top row: executive panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 relative z-10 max-w-7xl mx-auto w-full">
        {/* System Coherence */}
        <div className="bg-black/60 border border-[#00F3FF]/20 p-6 rounded-xl shadow-[0_0_40px_rgba(0,243,255,0.05)] flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
          <div className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4 font-bold flex items-center gap-2">
            <Activity size={14} className={telemetry.p >= 0.7 ? 'text-orange-500' : 'text-[#00F3FF]'} />
            System Coherence Profile
          </div>

          <div className="relative w-full h-32 flex items-end justify-center overflow-hidden">
            <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
              <path d="M 20 90 A 70 70 0 0 1 60 40" fill="none" stroke="#ff4500" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
              <path d="M 75 30 A 70 70 0 0 1 125 30" fill="none" stroke="#F59E0B" strokeWidth="12" strokeLinecap="round" opacity="0.8" />
              <path d="M 140 40 A 70 70 0 0 1 180 90" fill="none" stroke="#00F3FF" strokeWidth="12" strokeLinecap="round" opacity="0.8" />
              <circle cx="100" cy="90" r="6" fill="#ffffff" className="drop-shadow-[0_0_8px_#fff]" />

              <g style={{ transform: `rotate(${needleRotation}deg)`, transformOrigin: '100px 90px', transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                <line x1="100" y1="90" x2="100" y2="35" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" className="drop-shadow-[0_0_8px_#fff]" />
              </g>
            </svg>
            <div className="absolute top-12 left-2 text-[10px] text-[#ff4500] text-center font-bold">
              CRITICAL<br />
              BURN
            </div>
            <div className="absolute top-12 right-2 text-[10px] text-[#00F3FF] text-center font-bold">
              FROZEN<br />
              STABILITY
            </div>
          </div>

          <div className="text-center mt-4 border-t border-white/10 pt-3 flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-1 font-bold">DEVIANCE INDEX: {telemetry.p.toFixed(4)}</span>
            <span className="text-sm tracking-widest font-black text-gray-200">
              STATE: <span className={coherenceColor}>{coherenceStatus}</span>
            </span>
          </div>
        </div>

        {/* Governance Vector */}
        <div className="bg-black/60 border border-[#00F3FF]/20 p-6 rounded-xl shadow-[0_0_40px_rgba(0,243,255,0.05)] flex flex-col justify-between backdrop-blur-md">
          <div className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4 font-bold flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#00F3FF]" />
            Governance Impedance Vector
          </div>

          <div className="flex-1 relative flex items-center justify-center py-4">
            <svg viewBox="0 0 200 100" className="w-full h-full ml-4">
              <line x1="0" y1="50" x2="200" y2="50" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.1" />
              <line x1="100" y1="0" x2="100" y2="100" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.1" />
              <line x1="0" y1="0" x2="0" y2="100" stroke="#00F3FF" strokeWidth="1.5" opacity="0.5" />
              <line x1="0" y1="100" x2="200" y2="100" stroke="#00F3FF" strokeWidth="1.5" opacity="0.5" />

              <line
                x1="0"
                y1="90"
                x2="180"
                y2={telemetry.omega > 10 ? 10 : 70}
                stroke={telemetry.omega > 10 ? '#ff4500' : '#00F3FF'}
                strokeWidth="3"
                className="drop-shadow-[0_0_8px_currentColor] transition-all duration-700"
              />
              <polygon
                points={`180,${telemetry.omega > 10 ? 10 : 70} 170,${telemetry.omega > 10 ? 6 : 66} 175,${telemetry.omega > 10 ? 16 : 76}`}
                fill={telemetry.omega > 10 ? '#ff4500' : '#00F3FF'}
                className="transition-all duration-700"
              />
            </svg>
          </div>

          <div className="text-center mt-2 border-t border-white/10 pt-3 flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-1 font-bold">D.V.S. IMPEDANCE (Ω)</span>
            <span className="text-sm tracking-widest font-black text-gray-200">
              FORCE: <span className={telemetry.omega > 10 ? 'text-[#ff4500]' : 'text-[#00F3FF]'}>{telemetry.omega.toFixed(2)}</span>
            </span>
          </div>
        </div>

        {/* Operational State */}
        <div className="bg-black/60 border border-[#00F3FF]/20 p-6 rounded-xl shadow-[0_0_40px_rgba(0,243,255,0.05)] flex flex-col justify-between backdrop-blur-md">
          <div className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4 font-bold flex items-center gap-2">
            <Terminal size={14} className="text-[#00F3FF]" />
            Operational Protocol State
          </div>

          <div className="flex-1 flex items-center justify-between px-2">
            <div className="flex flex-col whitespace-pre-line">
              <span className={`text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-tight drop-shadow-[0_0_10px_currentColor] ${telemetry.mode === 'MITIGATE' ? 'text-[#ff4500]' : 'text-[#00F3FF]'}`}>
                {telemetry.mode === 'MITIGATE' ? 'THREAT\nLOCKED' : 'ACTIVE\nGOVERNANCE'}
              </span>
            </div>
            <div
              className={`w-16 h-16 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-500 ${telemetry.mode === 'MITIGATE' ? 'bg-[#ff4500]/10 border-[#ff4500] shadow-[0_0_20px_#ff4500]' : 'bg-[#00F3FF]/10 border-[#00F3FF] shadow-[0_0_20px_#00F3FF]'}`}
            >
              <ShieldCheck size={32} className={telemetry.mode === 'MITIGATE' ? 'text-[#ff4500]' : 'text-[#00F3FF]'} />
            </div>
          </div>

          <div className="mt-4 border-t border-white/10 pt-3 flex justify-between items-center">
            <span className="text-xs tracking-widest font-bold uppercase text-gray-300 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full animate-pulse ${telemetry.mode === 'MITIGATE' ? 'bg-[#ff4500]' : 'bg-[#00F3FF]'}`} />
              STATUS: {telemetry.mode}
            </span>
            <span className="text-xs text-gray-500 font-mono font-bold">CYCLE: {telemetry.cycle}</span>
          </div>
        </div>
      </div>

      {/* Main chamber */}
      <div className="flex-1 relative z-10 w-full mt-4 flex flex-col md:flex-row items-stretch justify-center gap-4 min-h-[450px] max-w-[100rem] mx-auto pb-12">
        {/* LEFT CHAMBER */}
        <div
          className="w-full md:w-1/2 h-full bg-black/80 border-2 border-white/10 rounded-2xl relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col transition-colors duration-700"
          style={{ borderColor: `rgba(255, 69, 0, ${fireOpacity * 0.5 + 0.1})` }}
        >
          {/* Dynamic Volatility HUD Bar */}
          <div className="absolute top-0 left-0 w-full bg-[#ff4500]/10 border-b border-[#ff4500]/20 px-4 py-1.5 z-30 flex justify-between items-center backdrop-blur-sm">
            <span className="text-[#ff4500] text-[10px] font-bold tracking-[0.3em] uppercase drop-shadow-[0_0_5px_#ff4500]">Thermal Volatility</span>
            <span className="text-[#ff4500] text-xs font-black tracking-[0.2em] transition-all duration-300">{(telemetry.p * 100).toFixed(1)}%</span>
          </div>

          <div className="absolute top-10 left-6 z-20">
            <h3 className="text-[#ff4500] font-black text-base md:text-2xl tracking-[0.3em] uppercase drop-shadow-[0_0_8px_#000]">
              ENTROPY <span className="text-white/80 font-light">// THERMAL BURN</span>
            </h3>
          </div>
          <div className="flex-1 relative w-full h-full min-h-[360px] mt-8">
            <FireChart p={telemetry.p} />
          </div>
        </div>

        <div className="hidden md:flex z-20 px-2 items-center justify-center">
          <ArrowRight size={48} className="text-white/30 animate-pulse drop-shadow-[0_0_10px_#fff]" />
        </div>

        {/* RIGHT CHAMBER */}
        <div
          className="w-full md:w-1/2 h-full bg-black/80 border-2 border-white/10 rounded-2xl relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col transition-colors duration-700"
          style={{ borderColor: `rgba(0, 243, 255, ${iceOpacity * 0.5 + 0.1})` }}
        >
          {/* Freezer Burn Title & Impedance HUD Bar */}
          <div className="absolute top-0 left-0 w-full bg-[#00F3FF]/10 border-b border-[#00F3FF]/20 px-4 py-1.5 z-30 flex justify-between items-center backdrop-blur-sm">
            <span className="text-[#00F3FF] text-[10px] font-bold tracking-[0.3em] uppercase drop-shadow-[0_0_5px_#00F3FF]">Freezer Burn Active v3.0</span>
            <span className="text-[#00F3FF] text-xs font-black tracking-[0.2em] transition-all duration-300">D.V.S. Ω: {telemetry.omega.toFixed(2)}</span>
          </div>

          <div className="absolute top-10 right-6 z-20 text-right">
            <h3 className="text-[#00F3FF] font-black text-base md:text-2xl tracking-[0.3em] uppercase drop-shadow-[0_0_8px_#000]">
  SYNTROPY <span className="text-white/80 font-light">// FLOWSTATE FREEZER CORE</span>
</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-0 flex-1 min-h-[360px] mt-8">
            <div className="relative w-full h-full min-h-[360px]">
              <FlowStateChart p={telemetry.p} />
            </div>

            {/* Image box on the right side, inside the panel */}
            <div className="relative w-full h-full min-h-[360px] border-t lg:border-t-0 lg:border-l border-white/10">
              <HoloEngineCard p={telemetry.p} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom anchor */}
      <div className="relative z-10 w-full max-w-[100rem] mx-auto mt-12 pb-24 px-4 md:px-0">
        <div className="bg-black/80 border-t-2 border-[#00F3FF]/50 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.15)] flex flex-col md:flex-row relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />

          <div className="relative z-20 p-10 md:p-16 flex-1 flex flex-col justify-center">
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest mb-4 drop-shadow-lg">
              Live Network <span className="text-[#00F3FF]">Overwatch</span>
            </h3>
            
            <div className="flex flex-col xl:flex-row xl:items-center gap-8 mb-8">
                <p className="text-gray-300 font-mono text-base md:text-lg leading-relaxed max-w-lg">
                  A.I.C.E. operatives monitor global systemic entropy 24/7. When the D.V.S. governor intercepts algorithmic deviation, it is routed through heavily encrypted sovereign nodes, ensuring deterministic execution across all enterprise layers.
                </p>
                
                {/* MOVED FREEZER BURN BUTTON */}
                <button 
                    onClick={() => window.location.href = '/freezer-burn'} 
                    className="w-full xl:w-auto px-8 py-5 bg-black/80 backdrop-blur-md border border-[#ff4500] text-[#ff4500] font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-[#ff4500] hover:text-black transition-all rounded shadow-[0_0_20px_rgba(255,69,0,0.3)] flex items-center justify-center gap-2 group shrink-0"
                >
                    <Activity size={16} className="group-hover:animate-ping" /> INITIATE FREEZER BURN DIAGNOSTIC
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[#00FF66] font-mono text-sm font-bold tracking-widest uppercase">
              <span className="inline-flex items-center gap-2 bg-[#00FF66]/10 border border-[#00FF66]/30 px-4 py-2 rounded-full w-fit">
                <span className="w-2 h-2 bg-[#00FF66] rounded-full animate-ping" /> Global Grid Secured
              </span>
              <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-fit text-gray-300">
                <ClipboardCheck size={14} /> {statusSource === 'local' ? 'LOCAL TELEMETRY' : 'SIMULATED TELEMETRY'}
              </span>
            </div>
          </div>

          <div className="w-full md:w-1/2 min-h-[400px] md:min-h-[450px] relative z-20">
            <img
              src={asset('/assets/images/Command Deck/AICEDVS.jpeg')}
              alt="A.I.C.E. Holographic Engine"
              className="absolute inset-0 w-full h-full object-contain object-right filter brightness-90 contrast-125 py-4 pr-4"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00F3FF]/30 bg-black/60 px-3 py-1 text-xs font-bold uppercase tracking-[0.28em] text-[#00F3FF] backdrop-blur-md">
                <Activity size={12} /> Governor Status: Locked Onto Target Sector
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- INJECTED ACQUISITION FUNNEL BUTTON --- */}
      <div className="relative z-10 w-full max-w-[100rem] mx-auto mt-8 mb-24 px-4 md:px-0 flex justify-center">
          <button 
              onClick={() => window.location.href = '/acquisition'} 
              className="group relative px-12 py-6 bg-[#00F3FF] text-black font-black uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all shadow-[0_0_40px_rgba(0,243,255,0.4)] flex items-center gap-4 overflow-hidden"
          >
              <Activity size={24} className="animate-pulse relative z-10" />
              <span className="relative z-10">ACQUIRE ENTERPRISE API LICENSE</span>
          </button>
      </div>

    </div>
  );
};

export default CommandDeck;