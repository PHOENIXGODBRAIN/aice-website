import React, { useState, useEffect, useRef } from 'react';
import { Send, Crosshair, Cpu, ShieldCheck, Activity, Terminal, ChevronRight, AlertTriangle, Clock, Zap, Download, Pause, Play, RotateCcw } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
// PHASE 5.5b: DEEP TELEMETRY VISUALIZATION IMPORTS
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// PHASE 6.0: EXTERNAL PDF FORGE IMPORT
import ExecutiveAuditPDF from './ExecutiveAuditPDF';

export default function FreezerBurnOps() {
  const [telemetry, setTelemetry] = useState({ ids: '--', p: '--', omega: '--', mode: 'INITIALIZING...' });
  const [connected, setConnected] = useState(false);
  
  // v4.2 Diagnostic Progress States
  const [diagnosticProgress, setDiagnosticProgress] = useState(0);
  const [packetsIngested, setPacketsIngested] = useState(0);
  const [anomaliesMitigated, setAnomaliesMitigated] = useState(0);
  const [timeLeft, setTimeLeft] = useState("07D 00H 00M 00S");

  // v4.3 Commander's Override States
  const [vetoClicks, setVetoClicks] = useState(0);
  const [commanderOverride, setCommanderOverride] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [overridePassword, setOverridePassword] = useState("");

  // v4.4 Audit Generation States
  const [topMitigations, setTopMitigations] = useState<any[]>([]);

  // v4.5 TACTICAL PAUSE (MID-CYCLE OVERRIDE)
  const [isFrozen, setIsFrozen] = useState(false);
  const [frozenAt, setFrozenAt] = useState<number | null>(null);

  // PHASE 5.0 LIVE TUNING STATES & WEBSOCKET REF
  const wsRef = useRef<WebSocket | null>(null);
  const [gainTarget, setGainTarget] = useState<number>(5.0);
  const [exponentTarget, setExponentTarget] = useState<number>(2.1);

  // PHASE 5.5b DEEP DATA VISUALIZATION STATE
  const [historyData, setHistoryData] = useState<any[]>([]);
  
  // PHASE 6.0 EXECUTIVE REPORT STATE
  const [execReport, setExecReport] = useState<any>(null);
  const [cpuUsage, setCpuUsage] = useState<number>(0);
  const [memUsage, setMemUsage] = useState<number>(0);

  const transmitTuningCommand = (newGain: number, newExp: number) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ action: "TUNE", nu_1: newGain, r: newExp }));
      }
  };

  // Form States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', sector: '', infrastructure: '' });

  // Countdown Calculator
  const calculateTimeLeft = (progress: number) => {
      const totalSeconds = 7 * 24 * 60 * 60; // 7 days in seconds
      const remainingSeconds = totalSeconds * (1 - (progress / 100));
      if (remainingSeconds <= 0) return "00D 00H 00M 00S";
      
      const d = Math.floor(remainingSeconds / (24 * 3600));
      const h = Math.floor((remainingSeconds % (24 * 3600)) / 3600);
      const m = Math.floor((remainingSeconds % 3600) / 60);
      const s = Math.floor(remainingSeconds % 60);
      return `${d.toString().padStart(2,'0')}D ${h.toString().padStart(2,'0')}H ${m.toString().padStart(2,'0')}M ${s.toString().padStart(2,'0')}S`;
  };

  /* =========================================================
     THE TACTICAL FREEZE / THAW LOGIC
     ========================================================= */
  const toggleFreeze = () => {
      if (isFrozen) {
          // THAW: Calculate how long we were paused and push the start time forward
          const pauseDuration = Date.now() - (frozenAt || Date.now());
          const currentStart = parseInt(localStorage.getItem('freezerBurnStartTime') || Date.now().toString());
          localStorage.setItem('freezerBurnStartTime', (currentStart + pauseDuration).toString());
          
          setIsFrozen(false);
          setFrozenAt(null);
      } else {
          // FREEZE: Record the exact millisecond we paused
          setIsFrozen(true);
          setFrozenAt(Date.now());
      }
  };

  /* =========================================================
     LIVE TELEMETRY POLLING ENGINE (ENVIRONMENT VARIABLE ROUTED)
     ========================================================= */
  useEffect(() => {
    if (isFrozen || diagnosticProgress >= 100) return;

    const fetchLedgerStats = async () => {
      try {
        const summaryRes = await fetch(`${import.meta.env.VITE_API_URL}/api/ledger/summary`);
        if (summaryRes.ok) {
          const data = await summaryRes.json();
          setPacketsIngested(data.total_ingested);
          setAnomaliesMitigated(data.anomalies_neutralized);
        }
        
        const mitigationsRes = await fetch(`${import.meta.env.VITE_API_URL}/api/ledger/mitigations`);
        if (mitigationsRes.ok) {
          const mitData = await mitigationsRes.json();
          setTopMitigations(mitData);
        }
        
        const historyRes = await fetch(`${import.meta.env.VITE_API_URL}/api/ledger/history`);
        if (historyRes.ok) {
          const histData = await historyRes.json();
          setHistoryData(histData);
        }
        
        const execRes = await fetch(`${import.meta.env.VITE_API_URL}/api/ledger/executive_report`);
        if (execRes.ok) {
          const execData = await execRes.json();
          setExecReport(execData);
        }
      } catch (error) {
        console.error("Ledger API Severed:", error);
      }
    };

    const intervalId = setInterval(fetchLedgerStats, 1000);
    return () => clearInterval(intervalId);
  }, [isFrozen, diagnosticProgress]); 

  // 1. The Permanent WSS Tether
  useEffect(() => {
    window.scrollTo(0, 0);
    wsRef.current = new WebSocket(import.meta.env.VITE_WSS_URL);
    wsRef.current.onopen = () => setConnected(true);
    wsRef.current.onclose = () => {
        setConnected(false);
        setTelemetry(prev => ({ ...prev, mode: 'SEVERED' }));
    };
    return () => { if (wsRef.current) wsRef.current.close(); };
  }, []);

  // 2. The 1-Second Telemetry Polling (Latest Pulse)
  useEffect(() => {
    const establishUplink = async () => {
        if (isFrozen || diagnosticProgress >= 100) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ledger/latest`);
            const data = await response.json();
            if (!data.error) {
                setTelemetry({ 
                    ids: data.ids_value ? data.ids_value.toFixed(1) + '%' : '--', 
                    omega: data.omega ? data.omega.toFixed(2) : '--', 
                    mode: data.mode || 'OBSERVE', 
                    p: data.p_value ? data.p_value.toFixed(3) : '--' 
                });
                setCpuUsage(data.cpu_utilization || 0);
                setMemUsage(data.mem_utilization || 0);
                setDiagnosticProgress((prev) => {
                    if (prev >= 100) return 100;
                    let startTime = localStorage.getItem('freezerBurnStartTime');
                    if (!startTime) {
                        startTime = Date.now().toString();
                        localStorage.setItem('freezerBurnStartTime', startTime);
                    }
                    const elapsedMilliseconds = Date.now() - parseInt(startTime);
                    const absoluteProgress = (elapsedMilliseconds / 1000 / (7 * 24 * 60 * 60)) * 100;
                    return absoluteProgress >= 100 ? 100 : absoluteProgress;
                });
            }
        } catch (error) {}
    };
    const interval = setInterval(establishUplink, 1000);
    return () => clearInterval(interval);
  }, [isFrozen, diagnosticProgress]); 

  // Update Countdown whenever progress changes
  useEffect(() => {
      setTimeLeft(calculateTimeLeft(diagnosticProgress));
  }, [diagnosticProgress]);

  // =========================================================
  // v6.0 EXECUTIVE MULTI-PAGE AUDIT GENERATION ENGINE
  // =========================================================
  const generateExecutiveAudit = async () => {
      setIsSubmitting(true);
      setSubmitStatus("COMPILING MULTI-PAGE DOSSIER...");

      try {
          const pdf = new jsPDF('portrait', 'pt', 'a4');
          
          // We will loop through the pages we build. Right now, we just have Page 1.
          const pages = ['audit-page-1', 'audit-page-2', 'audit-page-3', 'audit-page-4', 'audit-page-5', 'audit-page-6', 'audit-page-7']; 

          for (let i = 0; i < pages.length; i++) {
              const element = document.getElementById(pages[i]);
              if (!element) continue;

              const canvas = await html2canvas(element, {
                  background: '#050505',
                  scale: 2, // High fidelity print resolution
                  useCORS: true,
                  logging: false
              } as any);

              const imgData = canvas.toDataURL('image/jpeg', 1.0);
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

              if (i > 0) pdf.addPage();
              pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
          }

          pdf.save(`AICE_Executive_Audit_${new Date().getTime()}.pdf`);
          setSubmitStatus("AUDIT SECURED AND DOWNLOADED.");
          
      } catch (error) {
          console.error("CRITICAL ERROR: PDF Compilation Failed.", error);
          setSubmitStatus("COMPILATION FAILED.");
      }
      
      setTimeout(() => { setIsSubmitting(false); setSubmitStatus(""); }, 3000);
  };

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
          setSubmitStatus("CRITICAL ERROR: UPLINK SEVERED. (DISABLE ADBLOCKER/SHIELDS)");
      }
      setIsSubmitting(false);
  };

  // Cyber-Archaeology Mode Styling Logic
  let modeColor = 'text-[#00F3FF]';
  let borderColor = 'border-[#00F3FF]';
  let shadowGlow = 'shadow-[inset_0_0_15px_rgba(0,243,255,0.2)]';
  let pulseAnim = isFrozen ? '' : ''; // Disable pulse when frozen

  if (telemetry.mode === 'MITIGATE') {
    modeColor = 'text-[#ff4500]';
    borderColor = 'border-[#ff4500]';
    shadowGlow = 'shadow-[inset_0_0_30px_rgba(255,69,0,0.5)]';
    pulseAnim = isFrozen ? '' : 'animate-pulse';
  } else if (telemetry.mode === 'THAW') {
    modeColor = 'text-[#00ffaa]';
    borderColor = 'border-[#00ffaa]';
    shadowGlow = 'shadow-[inset_0_0_15px_rgba(0,255,170,0.2)]';
  }

  // Freeze Override Colors
  if (isFrozen) {
      modeColor = 'text-gray-400';
      borderColor = 'border-gray-600';
      shadowGlow = 'shadow-none';
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col text-white selection:bg-orange-500 selection:text-black bg-[#050505]">
        
        {/* BACKGROUND ARCHITECTURE */}
        <div className="absolute inset-0 z-0 pointer-events-none flex flex-col bg-[#050505]">
            <div className="absolute inset-0 bg-black/80 z-0"></div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-[800px] z-0 pointer-events-none"
             style={{
                 backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px)',
                 backgroundSize: '30px 30px',
                 maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
             }}>
        </div>

        {/* ZONE 1: THE CLINICAL DASHBOARD */}
        <div className="w-full flex flex-col items-center pt-24 pb-16 px-4 md:px-6 relative z-20">
            <div className="w-full max-w-5xl relative z-10">
                
                <div className="absolute top-12 left-0 md:left-4 w-16 md:w-24 opacity-100 z-20 hidden md:block">
                   <img src="/assets/images/pilot%20program/AICEPHOENIX.png" alt="AICE Phoenix" className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]" />
                </div>
                <div className="absolute top-12 right-0 md:right-4 w-16 md:w-24 opacity-100 z-20 hidden md:block">
                   <img src="/assets/images/pilot%20program/dvsSYNTROPY.png" alt="DVS Syntropy" className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]" />
                </div>

                <div className="text-center border-b-2 border-[#00F3FF]/30 pb-6 mb-8 w-full relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent opacity-50"></div>
                    
                    <div className="flex justify-center items-center mb-4 relative w-full pt-4 md:pt-0">
                        
                        {/* THE COMMANDER'S ENCRYPTED OVERRIDE TRIGGER */}
                        <div className="absolute -top-3 left-0 md:left-24 z-50">
                            <div 
                                className={`text-[10px] md:text-xs font-mono tracking-[0.2em] font-bold cursor-pointer select-none transition-colors ${commanderOverride ? 'text-[#ff4500] drop-shadow-[0_0_8px_rgba(255,69,0,0.8)] hover:text-white' : 'text-[#00e5ff] drop-shadow-[0_0_5px_#00e5ff] hover:text-white'}`}
                                onClick={() => {
                                    if (commanderOverride) {
                                        // Tactical Revert: Disengage override and resume native timeline
                                        setCommanderOverride(false);
                                        setVetoClicks(0);
                                        return;
                                    }
                                    const newClicks = vetoClicks + 1;
                                    setVetoClicks(newClicks);
                                    if (newClicks >= 3 && !showPasswordPrompt) {
                                        setShowPasswordPrompt(true);
                                    }
                                }}
                            >
                                [{commanderOverride ? "OVERRIDE ENGAGED (CLICK TO REVERT)" : "VETO ACTIVE"}]
                            </div>
                            
                            {showPasswordPrompt && !commanderOverride && (
                                <div className="absolute top-6 left-0 bg-black/95 border-l-2 border-[#ff4500] p-3 rounded-r-md shadow-[0_0_20px_rgba(255,69,0,0.6)]">
                                    <input 
                                        type="password" 
                                        placeholder="AUTHORIZATION KEY" 
                                        value={overridePassword}
                                        onChange={(e) => setOverridePassword(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                if (overridePassword === 'Mufasa') {
                                                    // Unlock the hidden command row, but do not alter the timeline
                                                    setCommanderOverride(true);
                                                    setShowPasswordPrompt(false);
                                                    setOverridePassword("");
                                                } else {
                                                    setVetoClicks(0);
                                                    setShowPasswordPrompt(false);
                                                    setOverridePassword("");
                                                }
                                            }
                                        }}
                                        className="bg-black text-[#ff4500] font-mono text-[10px] outline-none border-b border-[#ff4500] w-36 uppercase tracking-widest text-center pb-1"
                                        autoFocus
                                    />
                                </div>
                            )}
                        </div>

                        <div className="absolute -top-3 right-0 md:right-24 text-[10px] md:text-xs font-mono text-[#ff6f00] tracking-[0.2em] font-bold drop-shadow-[0_0_5px_#ff6f00]">[QUANTUM DRIFT LOCK: ON]</div>
                        
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter flex items-center gap-4 md:gap-6 leading-none mt-2">
                            <span style={{ color: 'transparent', WebkitTextStroke: '2px #00e5ff', textShadow: '0 0 15px rgba(0,229,255,0.6), 0 0 30px rgba(0,229,255,0.4)' }}>FREEZER</span>
                            <span style={{ color: 'transparent', WebkitTextStroke: '2px #ff6f00', backgroundImage: 'radial-gradient(circle, #ff9d00 10%, #ff6f00 60%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', textShadow: '0 0 20px rgba(255,111,0,0.6), 0 0 40px rgba(255,157,0,0.4)' }}>BURN</span>
                        </h1>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-[#eaeaea] mb-2 drop-shadow-md">A.I.C.E. Operations Center</h2>
                    <p className="text-gray-400 text-sm md:text-base tracking-[0.3em] uppercase font-mono">Mathematical Governor | Live Telemetry Stream</p>
                </div>

                {/* v4.2 DYNAMIC TELEMETRY INTAKE VISUALIZER */}
                <div className="w-full mx-auto mt-6 mb-10">
                    <div className="flex justify-between items-end mb-4">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-[#00F3FF] font-mono text-lg md:text-xl font-black tracking-widest uppercase drop-shadow-[0_0_8px_rgba(0,243,255,0.5)] flex items-center gap-3 mb-2">
                                <Clock size={20} /> [PHASE 1] 7-Day Cryptographic Burn Test
                            </h3>
                            <p className="text-[#00F3FF]/80 font-mono text-xs md:text-sm tracking-[0.2em] uppercase mt-1">
                                RAW TELEMETRY PACKETS INGESTED: <span className="text-[#00F3FF] font-black text-base md:text-lg ml-2 drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">{packetsIngested.toLocaleString()}</span>
                            </p>
                            <p className="text-[#ff4500]/80 font-mono text-xs md:text-sm tracking-[0.2em] uppercase mt-1">
                                ANOMALIES NEUTRALIZED: <span className="text-[#ff4500] font-black text-base md:text-lg ml-2 drop-shadow-[0_0_8px_rgba(255,69,0,0.8)]">{anomaliesMitigated.toLocaleString()}</span>
                            </p>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <div className={`font-mono text-xl md:text-2xl font-black tracking-widest mb-1 ${isFrozen ? 'text-[#00F3FF] animate-pulse drop-shadow-[0_0_10px_#00F3FF]' : 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]'}`}>
                                {isFrozen ? '[TACTICAL FREEZE]' : timeLeft}
                            </div>
                            <span className={`font-black text-3xl md:text-4xl tracking-tighter ${commanderOverride || diagnosticProgress >= 100 ? 'text-white drop-shadow-[0_0_15px_#ffffff]' : 'text-[#ff9d00] drop-shadow-[0_0_10px_rgba(255,157,0,0.8)]'}`}>
                                {diagnosticProgress.toFixed(2)}%
                            </span>
                        </div>
                    </div>

                    <div className="w-full h-4 bg-[#2a1100] border border-gray-800 rounded-sm relative overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,1)]">
                        <div 
                            className={`h-full transition-all duration-1000 ease-linear ${diagnosticProgress >= 100 ? 'bg-white shadow-[0_0_20px_#ffffff] animate-pulse' : (isFrozen ? 'bg-[#00F3FF] shadow-[0_0_20px_#00F3FF]' : 'bg-[#ff9d00] shadow-[0_0_20px_#ff9d00] border-r-4 border-white')}`}
                            style={{ width: `${diagnosticProgress}%` }}
                        ></div>
                        <div className="absolute inset-0 z-10 opacity-30 pointer-events-none" 
                             style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.2) 50%)', backgroundSize: '10px 10px' }}>
                        </div>
                    </div>
                    
                    {/* COMMANDER-ONLY SECURE TACTICAL ROW */}
                    {commanderOverride && (
                        <>
                        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4 w-full animate-fade-in bg-black/50 p-6 md:p-4 rounded-xl border border-[#ff4500]/30 shadow-[0_0_20px_rgba(255,69,0,0.1)] relative">
                            
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff4500] text-black text-[9px] font-black tracking-widest px-3 py-1 rounded-sm shadow-[0_0_10px_#ff4500] whitespace-nowrap">
                                COMMANDER ACCESS UNLOCKED
                            </div>

                            {/* Mid-Cycle Pause Button */}
                            {!isFrozen && diagnosticProgress < 100 && (
                                <button 
                                    onClick={toggleFreeze}
                                    className="px-6 py-4 bg-transparent border-2 border-[#00F3FF] text-[#00F3FF] font-black uppercase tracking-[0.2em] text-xs hover:bg-[#00F3FF] hover:text-black transition-all duration-300 rounded-xl shadow-[0_0_15px_rgba(0,243,255,0.2)] flex items-center justify-center gap-2"
                                >
                                    <Pause size={16} /> FREEZE TELEMETRY
                                </button>
                            )}

                            {/* Resume (Thaw) Button */}
                            {isFrozen && diagnosticProgress < 100 && (
                                <button 
                                    onClick={toggleFreeze}
                                    className="px-6 py-4 bg-transparent border-2 border-[#00FF66] text-[#00FF66] font-black uppercase tracking-[0.2em] text-xs hover:bg-[#00FF66] hover:text-black transition-all duration-300 rounded-xl shadow-[0_0_15px_rgba(0,255,102,0.2)] flex items-center justify-center gap-2"
                                >
                                    <Play size={16} /> RESUME INGESTION
                                </button>
                            )}

                            {/* Force 100% Override Button */}
                            {diagnosticProgress < 100 && (
                                <button 
                                    onClick={() => {
                                        setDiagnosticProgress(100);
                                        setIsFrozen(false);
                                    }}
                                    className="px-6 py-4 bg-transparent border-2 border-[#ff9d00] text-[#ff9d00] font-black uppercase tracking-[0.2em] text-xs hover:bg-[#ff9d00] hover:text-black transition-all duration-300 rounded-xl shadow-[0_0_15px_rgba(255,157,0,0.2)] flex items-center justify-center gap-2"
                                >
                                    <Zap size={16} /> FORCE 100% COMPLETION
                                </button>
                            )}

                            {/* Revert 100% Override (Resume Native Timeline) */}
                            {diagnosticProgress >= 100 && (
                                <button 
                                    onClick={() => {
                                        // Dropping progress below 100 forces the system to instantly recalculate the true timeline
                                        setDiagnosticProgress(99.9);
                                    }}
                                    className="px-6 py-4 bg-transparent border-2 border-gray-500 text-gray-400 font-black uppercase tracking-[0.2em] text-xs hover:border-white hover:text-white transition-all duration-300 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
                                >
                                    <Play size={16} /> RESUME NATIVE TIMELINE
                                </button>
                            )}

                            {/* Generate Executive Audit */}
                            {(isFrozen || diagnosticProgress >= 100) && (
                                <button 
                                    onClick={generateExecutiveAudit}
                                    className="px-8 py-4 bg-[#ff6f00] text-black font-black uppercase tracking-[0.2em] text-sm md:text-base hover:bg-white transition-all duration-300 rounded-xl shadow-[0_0_30px_rgba(255,111,0,0.6)] flex items-center justify-center gap-3 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                    <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                                    GENERATE EXECUTIVE AUDIT
                                </button>
                            )}
                        </div>
                        
                        {/* PHASE 5.0 LIVE TUNING MATRIX */}
                        <div className="w-full mt-4 bg-black/80 border border-[#00F3FF]/40 rounded-xl p-6 shadow-[inset_0_0_20px_rgba(0,243,255,0.1)] animate-fade-in relative">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                <h4 className="text-[#00F3FF] font-black uppercase tracking-[0.2em] text-sm md:text-base flex items-center gap-3">
                                    <Activity size={18} /> SOVEREIGN TUNING MATRIX
                                </h4>
                                
                                {/* v4.9 TACTICAL PRESETS & RESET */}
                                <div className="flex gap-2 w-full md:w-auto items-center">
                                    {/* Reset to Baseline Button */}
                                    <button 
                                        onClick={() => { setGainTarget(5.0); setExponentTarget(2.1); transmitTuningCommand(5.0, 2.1); }}
                                        className="px-2 py-1.5 border border-gray-500/50 bg-gray-500/10 text-gray-400 hover:bg-white hover:text-black transition-colors rounded flex items-center justify-center"
                                        title="Reset Baseline"
                                    >
                                        <RotateCcw size={14} />
                                    </button>
                                    
                                    <button 
                                        onClick={() => { setGainTarget(12.0); setExponentTarget(1.5); transmitTuningCommand(12.0, 1.5); }}
                                        className="flex-1 md:flex-none px-3 py-1.5 border border-[#00F3FF]/50 bg-[#00F3FF]/10 text-[#00F3FF] text-[9px] md:text-[10px] font-black tracking-widest uppercase hover:bg-[#00F3FF] hover:text-black transition-colors rounded"
                                    >
                                        HFT SCALPING
                                    </button>
                                    <button 
                                        onClick={() => { setGainTarget(2.5); setExponentTarget(4.0); transmitTuningCommand(2.5, 4.0); }}
                                        className="flex-1 md:flex-none px-3 py-1.5 border border-[#ff9d00]/50 bg-[#ff9d00]/10 text-[#ff9d00] text-[9px] md:text-[10px] font-black tracking-widest uppercase hover:bg-[#ff9d00] hover:text-black transition-colors rounded"
                                    >
                                        HEAVY RENDER
                                    </button>
                                    <button 
                                        onClick={() => { setGainTarget(20.0); setExponentTarget(5.0); transmitTuningCommand(20.0, 5.0); }}
                                        className="flex-1 md:flex-none px-3 py-1.5 border border-[#ff4500]/50 bg-[#ff4500]/10 text-[#ff4500] text-[9px] md:text-[10px] font-black tracking-widest uppercase hover:bg-[#ff4500] hover:text-black transition-colors rounded"
                                    >
                                        SURVIVAL
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Sensitivity Trigger Slider */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-end mb-2">
                                        <label className="text-gray-400 font-mono text-xs tracking-widest uppercase">Gain (ν₁): Sensitivity</label>
                                        <span className="text-[#00F3FF] font-black text-xl">{gainTarget.toFixed(1)}</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="1" max="20" step="0.1" 
                                        value={gainTarget}
                                        onChange={(e) => {
                                            const val = parseFloat(e.target.value);
                                            setGainTarget(val);
                                            transmitTuningCommand(val, exponentTarget);
                                        }}
                                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00F3FF]"
                                    />
                                </div>
                                {/* Thermodynamic Wall Slider */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-end mb-2">
                                        <label className="text-gray-400 font-mono text-xs tracking-widest uppercase">Exponent (r): The Wall</label>
                                        <span className="text-[#ff9d00] font-black text-xl">{exponentTarget.toFixed(2)}</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="1" max="5" step="0.1" 
                                        value={exponentTarget}
                                        onChange={(e) => {
                                            const val = parseFloat(e.target.value);
                                            setExponentTarget(val);
                                            transmitTuningCommand(gainTarget, val);
                                        }}
                                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#ff9d00]"
                                    />
                                </div>
                            </div>
                        </div>
                        </>
                    )}
                </div>

                {/* We wrap the metrics dashboard in an ID so the PDF engine knows exactly what to capture */}
                <div id="audit-capture-zone" className="w-full relative bg-[#050505] p-2 rounded-xl">

                {/* VIBRANT METRICS DASHBOARD */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
                    <div className={`bg-[#06151c]/95 border-t-2 border-b-2 ${borderColor} p-6 md:p-10 text-center transition-all duration-300 ${shadowGlow} ${pulseAnim}`}>
                        <div className="text-[#a0aec0] font-mono text-sm md:text-base uppercase tracking-[0.2em] mb-4">System Load</div>
                        <div className={`text-5xl md:text-7xl font-bold ${modeColor} drop-shadow-lg`}>{isFrozen ? '--' : telemetry.ids}</div>
                    </div>
                    
                    <div className={`bg-[#06151c]/95 border-t-2 border-b-2 ${borderColor} p-6 md:p-10 text-center transition-all duration-300 ${shadowGlow} ${pulseAnim}`}>
                        <div className="text-[#a0aec0] font-mono text-sm md:text-base uppercase tracking-[0.2em] mb-4">Threat Index</div>
                        <div className={`text-5xl md:text-7xl font-bold ${modeColor} drop-shadow-lg`}>{isFrozen ? '--' : telemetry.p}</div>
                    </div>
                    
                    <div className={`bg-[#06151c]/95 border-t-2 border-b-2 ${borderColor} p-6 md:p-10 text-center transition-all duration-300 ${shadowGlow} ${pulseAnim}`}>
                        <div className="text-[#a0aec0] font-mono text-sm md:text-base uppercase tracking-[0.2em] mb-4">System Impedance</div>
                        <div className={`text-5xl md:text-7xl font-bold ${modeColor} drop-shadow-lg`}>{isFrozen ? '--' : telemetry.omega}</div>
                    </div>
                </div>

                {/* =========================================================
                    PHASE 5.5b: DEEP TELEMETRY VISUALIZATION CHART (IP SECURED)
                    ========================================================= */}
                <div className="w-full bg-[#03080a]/95 border border-[#00F3FF]/30 p-6 md:p-8 rounded-xl shadow-[inset_0_0_20px_rgba(0,243,255,0.05)] mt-6 mb-8 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-[#00F3FF] font-black uppercase tracking-[0.2em] text-lg md:text-xl flex items-center gap-3">
                            <Activity size={24} /> STABILITY & ENTROPY OVER TIME
                        </h3>
                        <div className="text-xs md:text-sm font-mono text-gray-400 uppercase tracking-widest border border-gray-800 px-4 py-2 rounded bg-black/50 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                            <span className="text-[#00FF66] font-black drop-shadow-[0_0_8px_rgba(0,255,102,0.8)] animate-pulse">LIVE</span> FORENSIC LEDGER FEED
                        </div>
                    </div>
                    
                    <div className="w-full h-[350px] md:h-[450px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={historyData} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                                <defs>
                                    <linearGradient id="colorEntropy" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ff4500" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#ff4500" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorImpedance" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00F3FF" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#00F3FF" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" vertical={false} opacity={0.05} />
                                {/* Axes scaled up to 16px for boardroom visibility */}
                                <XAxis dataKey="timestamp" stroke="#a0aec0" fontSize={16} tickMargin={12} minTickGap={30} fontFamily="monospace" />
                                <YAxis stroke="#a0aec0" fontSize={16} fontFamily="monospace" tickFormatter={(val) => `${val}`} />
                                {/* Tooltip scaled up to 18px and bolded */}
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#000000', borderColor: '#00F3FF', borderRadius: '8px', fontFamily: 'monospace', fontSize: '18px', padding: '16px' }}
                                    itemStyle={{ color: '#ffffff', paddingBottom: '6px', fontWeight: '900' }}
                                />
                                {/* Legend scaled massively to 18px, made white, and max font weight */}
                                <Legend verticalAlign="top" height={50} iconType="plainline" wrapperStyle={{ fontSize: '18px', fontWeight: '900', fontFamily: 'monospace', color: '#ffffff', paddingBottom: '20px' }}/>
                                
                                <Area type="monotone" name="Systemic Entropy (%)" dataKey="entropy" stroke="#ff4500" strokeWidth={3} fillOpacity={1} fill="url(#colorEntropy)" isAnimationActive={false} />
                                <Area type="monotone" name="Applied Impedance (Ω)" dataKey="impedance" stroke="#00F3FF" strokeWidth={3} fillOpacity={1} fill="url(#colorImpedance)" isAnimationActive={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                
                {/* v4.4 CAPITAL PRESERVATION MATRIX (ERV) - Shown at 100% OR when Tactically Paused */}
                {((diagnosticProgress >= 100 || isFrozen) && topMitigations.length > 0) && (
                    <div className="w-full bg-[#03080a]/95 border-2 border-[#ff6f00]/50 p-8 rounded-xl shadow-[0_0_40px_rgba(255,111,0,0.2)] mt-8 mb-4">
                        <div className="flex justify-between items-end border-b border-[#ff6f00]/30 pb-4 mb-6">
                            <div>
                                <h3 className="text-[#ff9d00] font-black uppercase tracking-[0.2em] text-xl md:text-2xl flex items-center gap-3">
                                    <ShieldCheck size={24} /> Entropic Risk Valuation (E.R.V.)
                                </h3>
                                <div className="text-gray-400 font-mono text-xs tracking-widest mt-1">FORENSIC LEDGER: TOP 5 INTERCEPTED CATASTROPHES</div>
                            </div>
                            <div className="text-right">
                                <div className="text-gray-400 font-mono text-xs md:text-sm tracking-widest uppercase mb-2 drop-shadow-md">Total Prevented Capital Loss</div>
                                {/* ERV Formula: Scaled up to 6XL to dominate the visual hierarchy */}
                                <div className="text-5xl md:text-6xl font-black text-[#00FF66] drop-shadow-[0_0_25px_rgba(0,255,102,0.6)] tracking-tighter">
                                    ${(anomaliesMitigated * 1250).toLocaleString()} <span className="text-2xl md:text-3xl text-[#00FF66]/80 tracking-widest">USD</span>
                                </div>
                                <div className="text-[#00F3FF]/80 font-mono text-[9px] md:text-[10px] tracking-[0.2em] mt-3 max-w-[300px] ml-auto text-right border-t border-[#00F3FF]/30 pt-2 leading-relaxed">
                                    *BASELINE DERIVED FROM 2026 FINANCIAL SECTOR REPORTS: CALCULATION UTILIZES A PROVEN $1,250 USD EXPENDITURE RECOVERY METRIC PER UNMITIGATED SYSTEMIC SHOCK EVENT.
                                </div>
                            </div>
                        </div>

                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-left font-mono text-sm">
                                <thead>
                                    <tr className="text-[#00F3FF] border-b border-white/10 uppercase tracking-widest text-xs">
                                        <th className="pb-3 px-4">Time (UTC)</th>
                                        <th className="pb-3 px-4">Entropy State (IDS)</th>
                                        <th className="pb-3 px-4">Proximity (p)</th>
                                        <th className="pb-3 px-4">Impedance Applied (Ω)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topMitigations.map((mit, index) => (
                                        <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="py-3 px-4 text-gray-300">{mit.timestamp}</td>
                                            <td className="py-3 px-4 text-red-400 font-bold">{mit.ids_value}%</td>
                                            <td className="py-3 px-4 text-orange-400">{mit.p_value}</td>
                                            <td className="py-3 px-4 text-[#00F3FF] font-bold">{mit.omega} Ω</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                </div> {/* END OF AUDIT CAPTURE ZONE */}

                <div className="w-full p-6 md:p-8 bg-[#0a0a0a] border-l-8 border-[#00F3FF] flex flex-col md:flex-row justify-between items-center text-lg md:text-xl font-bold uppercase shadow-[0_0_30px_rgba(0,0,0,0.8)] mt-6">
                    <div className="text-white mb-2 md:mb-0">
                        SYSTEM STATUS: <span className={`${modeColor} ml-2 tracking-widest`}>{isFrozen ? 'TACTICAL PAUSE' : telemetry.mode}</span>
                    </div>
                    <div className={`${connected ? "text-[#00FF66]" : "text-red-500"} tracking-widest text-sm md:text-base`}>
                        {isFrozen ? "TELEMETRY INGESTION HALTED" : (connected ? "LINK ESTABLISHED: A.I.C.E. CLOUD" : "AWAITING TELEMETRY...")}
                    </div>
                </div>
            </div>
        </div>
{/* =========================================================
            v3.1 PHOENIX TALON DATA FLOW ARCHITECTURE
            ========================================================= */}
        <div className="w-full flex flex-col items-center px-4 md:px-6 relative z-20 mt-4 mb-8">
            <div className="w-full max-w-5xl bg-[#03080a]/90 backdrop-blur-md border border-[#00F3FF]/40 rounded-xl p-6 md:p-10 shadow-[0_0_40px_rgba(0,243,255,0.1)] relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#00F3FF 1px, transparent 1px), linear-gradient(90deg, #00F3FF 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8 border-b border-[#00F3FF]/20 pb-4">
                        <Activity className="text-[#00F3FF]" size={24} />
                        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-[0.2em] drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">v3.1 Live Telemetry Ingestion Flow</h3>
                        <span className="ml-auto text-[10px] md:text-xs font-mono text-gray-400 tracking-widest">[PHOENIX TALON: ARMED]</span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2">
                        <div className="flex flex-col items-center text-center w-full md:w-1/4">
                            <div className="w-16 h-16 rounded-full border-2 border-gray-600 bg-black flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(255,255,255,0.1)] relative">
                                <Cpu size={28} className="text-gray-300" />
                                <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
                            </div>
                            <div className="font-bold text-sm tracking-widest uppercase text-white mb-1">Local Hardware</div>
                            <div className="text-[10px] text-gray-400 font-mono tracking-wider">Raw Chaos Generation</div>
                        </div>

                        <div className="hidden md:flex flex-col items-center justify-center w-12 opacity-50">
                            <div className="h-px w-full bg-[#00F3FF] shadow-[0_0_5px_#00F3FF]"></div>
                            <ChevronRight size={16} className="text-[#00F3FF] absolute" />
                        </div>

                        <div className="flex flex-col items-center text-center w-full md:w-1/4">
                            <div className="w-16 h-16 rounded-lg border border-[#00F3FF] bg-[#00F3FF]/10 flex items-center justify-center mb-3 shadow-[inset_0_0_10px_rgba(0,243,255,0.2)]">
                                <Crosshair size={28} className="text-[#00F3FF]" />
                            </div>
                            <div className="font-bold text-sm tracking-widest uppercase text-[#00F3FF] mb-1">Phoenix Talon</div>
                            <div className="text-[10px] text-gray-400 font-mono tracking-wider">Blind Telemetry Extraction</div>
                        </div>

                        <div className="hidden md:flex flex-col items-center justify-center w-12">
                            <div className="h-px w-full bg-[#00FF66] shadow-[0_0_8px_#00FF66] animate-pulse"></div>
                            <ChevronRight size={16} className="text-[#00FF66] absolute" />
                        </div>

                        <div className="flex flex-col items-center text-center w-full md:w-1/4">
                            <div className="w-16 h-16 rounded-lg border border-[#00FF66] bg-black flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(0,255,102,0.2)]">
                                <ShieldCheck size={28} className="text-[#00FF66]" />
                            </div>
                            <div className="font-bold text-sm tracking-widest uppercase text-[#00FF66] mb-1">TLS 1.3 Uplink</div>
                            <div className="text-[10px] text-[#00FF66]/70 font-mono tracking-wider">Math-Free Secure Pipeline</div>
                        </div>

                        <div className="hidden md:flex flex-col items-center justify-center w-12">
                            <div className="h-px w-full bg-[#ff9d00] shadow-[0_0_8px_#ff9d00]"></div>
                            <ChevronRight size={16} className="text-[#ff9d00] absolute" />
                        </div>

                        <div className="flex flex-col items-center text-center w-full md:w-1/4">
                            <div className="w-20 h-20 rounded-md border-2 border-[#ff6f00] bg-gradient-to-br from-[#1a0b00] to-black flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(255,111,0,0.4)] relative overflow-hidden">
                                <div className="absolute inset-0 bg-[#ff6f00] opacity-10 animate-pulse"></div>
                                <Terminal size={32} className="text-[#ff9d00] relative z-10" />
                            </div>
                            <div className="font-black text-[15px] tracking-[0.2em] uppercase text-[#ff9d00] mb-1">A.I.C.E. Brain</div>
                            <div className="text-[10px] text-gray-300 font-mono tracking-wider">Sovereign Cloud Calc</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

	{/* =========================================================
            THE FREEZER BURN INITIATIVE (RESTRUCTURED)
            ========================================================= */}
        <div className="w-full flex flex-col items-center px-4 md:px-6 relative z-20 mt-16 mb-16">
            <div className="w-full max-w-6xl bg-[#03080a]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] flex flex-col group hover:border-[#00F3FF]/30 transition-colors duration-700">

                {/* 1. TOP HEADER: THE APPLICATION TAG */}
                <div className="w-full p-8 md:p-10 pb-6 flex justify-center bg-black/40">
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#00F3FF]/10 text-[#00F3FF] border border-[#00F3FF]/30 rounded-md font-mono text-sm md:text-base uppercase tracking-[0.2em] font-bold shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                        <Terminal size={18} className="animate-pulse"/> THE APPLICATION
                    </div>
                </div>

                {/* 2. THE CINEMATIC IMAGE */}
                <div className="w-full relative overflow-hidden bg-black h-[250px] md:h-[450px] lg:h-[550px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03080a] via-transparent to-transparent z-10 h-1/2 bottom-0 mt-auto"></div>
                    <img
                        src="/assets/images/Freezer%20burn/freezer_burn_spark.jpeg"
                        alt="Freezer Burn Protocol"
                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 relative z-0"
                    />
                </div>

                {/* 3. THE SUMMARY & FEATURES */}
                <div className="w-full px-8 pb-16 pt-4 md:px-16 md:pb-24 lg:px-24 flex flex-col justify-center relative z-20 text-center">

                    {/* High-Contrast, Solid Title */}
                    <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-[1.1] drop-shadow-2xl">
                        Algorithmic <br />
                        <span className="text-[#00F3FF] drop-shadow-[0_0_20px_rgba(0,243,255,0.5)]">Entropy Containment</span>
                    </h3>

                    {/* Enlarged Core Description */}
                    <p className="text-gray-200 font-light text-xl md:text-3xl leading-relaxed mb-16 max-w-5xl mx-auto">
                        The Freezer Burn application is an enterprise-grade diagnostic and actuation tool. It is engineered to identify, isolate, and mathematically neutralize systemic computational chaos before it triggers catastrophic hardware fatigue or software hallucination.
                    </p>

                    {/* Enlarged & Framed Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left mt-4">
                        
                        {/* Pipeline Card */}
                        <div className="bg-black/40 border border-white/5 p-8 md:p-10 rounded-3xl relative shadow-inner hover:border-[#00F3FF]/40 transition-colors group/card">
                            <div className="absolute -top-5 left-10 bg-[#00F3FF] w-10 h-10 flex items-center justify-center rounded-xl shadow-[0_0_20px_#00F3FF]">
                                <Activity size={20} className="text-black font-black" />
                            </div>
                            <h4 className="text-white font-black uppercase tracking-widest text-xl md:text-2xl mb-4 mt-4 group-hover/card:text-[#00F3FF] transition-colors">The Telemetry Pipeline</h4>
                            <p className="text-gray-300 font-mono text-sm md:text-lg leading-relaxed">
                                Utilizing a secure new "Hollow Edge" & "Phoenix Talon" architecture, the application extracts raw hardware variance without exposing proprietary logic. It streams this telemetry via an impenetrable TLS 1.3 uplink directly to the Sovereign Brain.
                            </p>
                        </div>

                        {/* Actuation Card */}
                        <div className="bg-black/40 border border-white/5 p-8 md:p-10 rounded-3xl relative shadow-inner hover:border-[#ff9d00]/40 transition-colors group/card">
                            <div className="absolute -top-5 left-10 bg-[#ff9d00] w-10 h-10 flex items-center justify-center rounded-xl shadow-[0_0_20px_#ff9d00]">
                                <Crosshair size={20} className="text-black font-black" />
                            </div>
                            <h4 className="text-white font-black uppercase tracking-widest text-xl md:text-2xl mb-4 mt-4 group-hover/card:text-[#ff9d00] transition-colors">Autonomous Actuation</h4>
                            <p className="text-gray-300 font-mono text-sm md:text-lg leading-relaxed">
                                Upon detecting volatility approaching critical limits, the protocol calculates the exact impedance required. It beams down a precise actuation command, applying digital friction to smoothly neutralize the threat.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        {/* =========================================================
            ZONE 2: COLLAGE CARDS
            ========================================================= */}
        <div className="w-full relative flex flex-col items-center px-4 md:px-6 pt-16 pb-24 z-10">
            <div className="w-full max-w-6xl relative z-10 mb-32 mt-12">
                <div className="text-center mb-24 relative z-10 flex flex-col items-center">
                    <div className="bg-[#050505]/70 backdrop-blur-xl border border-[#00F3FF]/30 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.9)] max-w-4xl w-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent"></div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-widest text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">The Physics of Stability</h2>
                        <p className="text-white font-light text-xl md:text-3xl leading-relaxed">How the Deviance Viscosity Stabilizer conquers computational chaos.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-12">
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
                            <p className="text-white leading-relaxed font-light text-lg md:text-xl drop-shadow-sm mb-8">
                                Entropy is a mathematical certainty. When data velocity exceeds infrastructure limits, systems generate "noise." Unchecked, this noise creates cascading shockwaves, leading to massive hallucinations, packet loss, and critical hardware fatigue.
                            </p>
                            <button 
                                onClick={(e) => { e.preventDefault(); window.location.href = '/catastrophe'; }} 
                                className="w-full md:w-max px-8 py-4 border-2 border-[#ff4500]/50 bg-[#ff4500]/10 text-[#ff4500] font-black uppercase tracking-widest text-xs hover:bg-[#ff4500] hover:text-black transition-all rounded-xl shadow-[0_0_20px_rgba(255,69,0,0.3)] flex items-center justify-center gap-3"
                            >
                                <AlertTriangle size={16} /> VIEW HUMANITIES HISTORICAL LOGS
                            </button>
                        </div>
                    </div>

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
                            <img src="/assets/images/pilot%20program/Patented.png" alt="Patented Technology" className="w-full h-40 md:h-56 object-contain bg-black rounded-bl-xl p-1 opacity-100" />
                            <img src="/assets/images/pilot%20program/aicelogo.png" alt="Governor 4" className="w-full h-40 md:h-56 object-contain bg-black rounded-br-xl p-1 opacity-100" />
                        </div>
                    </div>

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

            {/* =========================================================
                3. THE DIAGNOSTIC INTAKE FORM
                ========================================================= */}
            <div className="w-full max-w-4xl relative z-10 mb-10">
                <div className="bg-[#050505]/95 backdrop-blur-2xl border-2 border-[#00F3FF]/30 p-10 md:p-14 rounded-[2rem] shadow-[0_0_60px_rgba(0,243,255,0.15)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10"><Terminal size={100} className="text-[#00F3FF]" /></div>
                    
                    <div className="mb-10 text-center relative z-10 flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 bg-[#00F3FF]/10 text-[#00F3FF] px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-sm mb-4 border border-[#00F3FF]/30">
                            <Crosshair size={16}/> Entropic Risk Valuation (ERV)
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">Request An Audit</h2>
                        <p className="text-gray-300 font-mono text-base uppercase tracking-widest leading-relaxed mb-8 max-w-2xl">
                            Submit your infrastructure details below. A.I.C.E. engineering will initiate contact to schedule a secure telemetry ingestion and run your diagnostic simulation.
                        </p>
                    </div>

                    <form onSubmit={handleIntakeSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[#00F3FF] font-mono text-sm font-bold tracking-widest uppercase">Operator Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-black/80 border border-white/20 rounded-xl p-4 text-white font-bold text-lg outline-none focus:border-[#00F3FF] transition-colors"
                                    placeholder="E.g. John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[#00F3FF] font-mono text-sm font-bold tracking-widest uppercase">Secure Comms (Email)</label>
                                <input 
                                    type="email" 
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-black/80 border border-white/20 rounded-xl p-4 text-white font-bold text-lg outline-none focus:border-[#00F3FF] transition-colors"
                                    placeholder="executive@domain.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[#00F3FF] font-mono text-sm font-bold tracking-widest uppercase">Operational Sector</label>
                            <select 
                                required
                                value={formData.sector}
                                onChange={(e) => setFormData({...formData, sector: e.target.value})}
                                className="w-full bg-black/80 border border-white/20 rounded-xl p-4 text-white font-mono text-base outline-none focus:border-[#00F3FF] transition-colors appearance-none cursor-pointer"
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
                            <label className="text-[#00F3FF] font-mono text-sm font-bold tracking-widest uppercase">Topology Overview</label>
                            <textarea 
                                required
                                value={formData.infrastructure}
                                onChange={(e) => setFormData({...formData, infrastructure: e.target.value})}
                                className="w-full bg-black/80 border border-white/20 rounded-xl p-4 text-white font-mono text-base outline-none focus:border-[#00F3FF] transition-colors resize-none h-32"
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

            <div className="w-full max-w-4xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 mb-20">
                <button 
                    onClick={() => window.location.href = '/command-deck'} 
                    className="w-full py-5 border border-white/20 bg-black/60 backdrop-blur-md text-white font-black uppercase tracking-widest text-[10px] md:text-xs hover:border-[#00F3FF] hover:text-[#00F3FF] transition-all rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center gap-2"
                >
                    <Terminal size={14} /> COMMAND DECK
                </button>

                <button 
                    onClick={() => window.location.href = '/catastrophe'} 
                    className="w-full py-5 border border-red-500/30 bg-red-950/20 backdrop-blur-md text-red-500 font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-red-500 hover:text-black transition-all rounded-xl shadow-[0_0_20px_rgba(255,0,0,0.2)] flex items-center justify-center gap-2"
                >
                    <AlertTriangle size={14} /> Humanities Historical Losses
                </button>

                <button 
                    onClick={() => window.location.href = '/acquisition'} 
                    className="w-full py-5 bg-[#00F3FF] text-black font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-white transition-all rounded-xl shadow-[0_0_30px_rgba(0,243,255,0.4)] flex items-center justify-center gap-2 group"
                >
                    <ShieldCheck size={14} className="group-hover:animate-pulse" /> E.R.V. QUOTE
                </button>
            </div>

        </div>

        {/* =========================================================
            PHASE 6.0: MODULAR PDF GENERATOR INJECTION
            This calls the external ExecutiveAuditPDF file to build the 3 pages off-screen.
            ========================================================= */}
        <ExecutiveAuditPDF 
            execReport={execReport} 
            historyData={historyData} 
            topMitigations={topMitigations} 
            cpuUsage={cpuUsage} 
            memUsage={memUsage} 
        />

    </div>
  );
}