import React, { useState } from 'react';
import { 
  Activity, Shield, Zap, Server, Lock, Globe, 
  Cpu, Database, Layers, CheckCircle, Maximize2, ShieldCheck, Search 
} from 'lucide-react';

export default function EnterpriseFeaturesPage() {
  // Tactical state for Click-and-Hold Precision Zoom
  const [zoomState, setZoomState] = useState<{ index: number | null, x: number, y: number }>({ index: null, x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (zoomState.index !== index) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // Calculate raw mathematical position
    const rawX = ((e.clientX - left) / width) * 100;
    const rawY = ((e.clientY - top) / height) * 100;
    
    // Apply a 1.8x sensitivity multiplier from the dead center
    const sensitivity = 1.8;
    let x = 50 + (rawX - 50) * sensitivity;
    let y = 50 + (rawY - 50) * sensitivity;
    
    // Clamp the values between 0 and 100 to prevent the image from panning into the void
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));
    
    setZoomState({ index, x, y });
  };

  return (
    <div 
      className="min-h-screen text-gray-300 font-sans selection:bg-cyan-900 selection:text-cyan-100 bg-black"
      style={{ 
        backgroundImage: "url('/assets/images/features/featuresbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat"
      }}
    >
      
      {/* 1. EXECUTIVE SUMMARY HERO SECTION */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden border-b border-cyan-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800 text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-6">
            <Zap className="w-5 h-5 text-orange-500" /> Patented Protocol
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Autonomous Stabilization & <br className="hidden md:block" />
            <span className="text-teal-400 drop-shadow-[0_0_18px_rgba(45,212,191,0.9)] tracking-wide">
              Governance Engine
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A.I.C.E. ingests high-frequency telemetry, detects entropic drift, and applies corrective stabilization vectors in real time—ensuring absolute operational continuity, system integrity, and zero-trust compliance across complex enterprise environments.
          </p>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES */}
      <section className="px-6 py-24 border-b border-cyan-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center bg-black/80 backdrop-blur-md border border-cyan-900/50 p-8 md:p-14 rounded-3xl max-w-5xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden group">
            {/* Ambient Sub-Surface Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/40 via-transparent to-transparent pointer-events-none"></div>
            
            {/* 3D Extruded Title */}
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-800 drop-shadow-[0_8px_8px_rgba(0,0,0,1)] uppercase tracking-tighter mb-6 relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
              Core System <br className="hidden md:block" /> 
              <span className="text-cyan-400 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">Capabilities</span>
            </h2>
            
            {/* Hardened Subtitle */}
            <p className="text-xl md:text-2xl text-cyan-50 font-mono tracking-widest max-w-3xl mx-auto drop-shadow-[0_4px_4px_rgba(0,0,0,1)] relative z-10 border-t border-cyan-900/50 pt-6">
              The Architectural Foundation of Humanities NEW Autonomous Equilibrium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/50 transition-colors duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity className="w-24 h-24 text-cyan-500" />
              </div>
              <Activity className="w-12 h-12 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Real-Time Telemetry Ingestion</h3>
              <ul className="space-y-3 text-base text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> High-frequency data ingestion</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> Sanitization & normalization</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> Secure TLS 1.3 uplink</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> Multi-source integration</li>
              </ul>
              <p className="mt-6 text-sm text-gray-400 italic border-l-2 border-cyan-900 pl-4 leading-relaxed">
                "A high-throughput conduit capable of securely receiving millions of data points per second."
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/50 transition-colors duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity className="w-24 h-24 text-cyan-500" />
              </div>
              <Activity className="w-12 h-12 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Anomaly Detection Engine</h3>
              <ul className="space-y-3 text-base text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> Baseline modeling</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> Drift detection</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> Noise isolation</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> Predictive instability alerts</li>
              </ul>
              <p className="mt-6 text-sm text-gray-400 italic border-l-2 border-cyan-900 pl-4 leading-relaxed">
                "Flags deviations that precede systemic instability, isolating noise from genuine threats."
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-cyan-950/90 to-black backdrop-blur-md border border-cyan-600/60 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
              <Cpu className="w-12 h-12 text-orange-500 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Deviance Viscosity Stabilizer (DVS)</h3>
              <ul className="space-y-3 text-base text-gray-200">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> Measures anomaly severity</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> Calculates stabilization vectors</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> Applies proportional corrections</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> Maintains equilibrium seamlessly</li>
              </ul>
              <p className="mt-6 text-sm text-cyan-200/80 italic border-l-2 border-orange-500 pl-4 leading-relaxed">
                "Formulates precise, proportionate counter-measures to restore system equilibrium."
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/50 transition-colors duration-300">
              <Server className="w-12 h-12 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Autonomous Response Layer</h3>
              <ul className="space-y-3 text-base text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> Executes stabilization vectors</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> Secure programmatic pathways</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> Ensures continuity during events</li>
              </ul>
              <p className="mt-6 text-sm text-gray-400 italic border-l-2 border-cyan-900 pl-4 leading-relaxed">
                "Securely deploys DVS-calculated stabilization vectors back into the client ecosystem."
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/50 transition-colors duration-300">
              <Lock className="w-12 h-12 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Zero-Trust Access Gateway</h3>
              <ul className="space-y-3 text-base text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> Role-Based Access Control (RBAC)</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> Just-In-Time (JIT) access</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> Cryptographic validation & MFA</li>
              </ul>
              <p className="mt-6 text-sm text-gray-400 italic border-l-2 border-cyan-900 pl-4 leading-relaxed">
                "No component, user, or data packet moves laterally without cryptographic authorization."
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/50 transition-colors duration-300">
              <Layers className="w-12 h-12 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Enterprise Integration Layer</h3>
              <ul className="space-y-3 text-base text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> REST APIs & SDKs</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> Agent-based ingestion</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" /> Webhooks & SSO support</li>
              </ul>
              <p className="mt-6 text-sm text-gray-400 italic border-l-2 border-cyan-900 pl-4 leading-relaxed">
                "Designed to be frictionless, secure, and highly adaptable to existing enterprise topologies."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 & 4. INFRASTRUCTURE & SECURITY */}
      <section className="px-6 py-24 border-b border-cyan-900/40 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Globe className="w-10 h-10 text-cyan-400" />
              <h2 className="text-3xl font-bold text-white">High-Availability & Redundancy</h2>
            </div>
            <p className="text-lg text-gray-400 mb-8">Engineered for absolute persistence under the most demanding enterprise conditions.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-5 bg-black border border-zinc-800 rounded-lg text-lg"><span className="text-white font-medium">Multi-AZ</span> deployment</div>
              <div className="p-5 bg-black border border-zinc-800 rounded-lg text-lg"><span className="text-white font-medium">Global</span> load balancing</div>
              <div className="p-5 bg-black border border-zinc-800 rounded-lg text-lg"><span className="text-white font-medium">Instant</span> failover</div>
              <div className="p-5 bg-black border border-zinc-800 rounded-lg text-lg"><span className="text-white font-medium">Continuous</span> replication</div>
              <div className="p-6 bg-black border border-zinc-800 rounded-lg sm:col-span-2 text-center text-cyan-400 font-bold border-cyan-900/50 text-xl tracking-wide">99.99% Uptime Target</div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-10 h-10 text-cyan-400" />
              <h2 className="text-3xl font-bold text-white">Security & Compliance</h2>
            </div>
            <p className="text-lg text-gray-400 mb-8">Every system interaction is permanently recorded in immutable audit logs.</p>
            <div className="flex flex-wrap gap-4">
              <span className="px-5 py-3 bg-black border border-zinc-800 rounded-full text-base text-gray-300 font-medium">Zero-Trust Architecture</span>
              <span className="px-5 py-3 bg-black border border-zinc-800 rounded-full text-base text-gray-300 font-medium">AES-256 Encryption</span>
              <span className="px-5 py-3 bg-black border border-zinc-800 rounded-full text-base text-gray-300 font-medium">TLS 1.2 / 1.3</span>
              <span className="px-5 py-3 bg-black border border-zinc-800 rounded-full text-base text-gray-300 font-medium">Immutable Audit Logs</span>
              <span className="px-5 py-3 bg-black border border-zinc-800 rounded-full text-base text-gray-300 font-medium">KMS Key Rotation</span>
              <span className="px-5 py-3 bg-black border border-zinc-800 rounded-full text-base text-gray-300 font-medium">SIEM Integration</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5 & 6. OUTCOMES & ISOLATION */}
      <section className="px-6 py-24 border-b border-cyan-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-1 bg-black/80 backdrop-blur-md border border-cyan-900/50 p-8 md:p-10 rounded-2xl shadow-2xl">
              <Database className="w-12 h-12 text-orange-500 mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Isolation & Data Residency</h2>
              <p className="text-lg text-gray-400 mb-8">Preventing any mathematical possibility of data crossover.</p>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-2 w-3 h-3 rounded-full bg-orange-500 flex-shrink-0"></div>
                  <div>
                    <strong className="text-white block text-lg mb-1">Tenant Isolation</strong>
                    <span className="text-base text-gray-400">Strict cryptographically enforced boundaries.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-2 w-3 h-3 rounded-full bg-orange-500 flex-shrink-0"></div>
                  <div>
                    <strong className="text-white block text-lg mb-1">Region-Locked Deployments</strong>
                    <span className="text-base text-gray-400">Data never leaves its designated geographical zone.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-2 w-3 h-3 rounded-full bg-orange-500 flex-shrink-0"></div>
                  <div>
                    <strong className="text-white block text-lg mb-1">Sovereign Data Guarantees</strong>
                    <span className="text-base text-gray-400">Absolute compliance with localized data protection laws.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 bg-black/90 backdrop-blur-md border border-cyan-900/50 p-8 md:p-12 rounded-2xl relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-900/10 rounded-full blur-3xl"></div>
              <h2 className="text-3xl font-bold text-white mb-10">Targeted Stabilization Outcomes</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-lg bg-cyan-950/50 border border-cyan-800 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-7 h-7 text-cyan-400" />
                  </div>
                  <span className="text-xl font-medium text-gray-200">Reduced Downtime</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-lg bg-cyan-950/50 border border-cyan-800 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-7 h-7 text-cyan-400" />
                  </div>
                  <span className="text-xl font-medium text-gray-200">Autonomous Correction</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-lg bg-cyan-950/50 border border-cyan-800 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-7 h-7 text-cyan-400" />
                  </div>
                  <span className="text-xl font-medium text-gray-200">Stabilized High-Variance Systems</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-lg bg-cyan-950/50 border border-cyan-800 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-7 h-7 text-cyan-400" />
                  </div>
                  <span className="text-xl font-medium text-gray-200">Reduced Operational Risk</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-lg bg-cyan-950/50 border border-cyan-800 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-7 h-7 text-cyan-400" />
                  </div>
                  <span className="text-xl font-medium text-gray-200">Predictive Anomaly Prevention</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-lg bg-cyan-950/50 border border-cyan-800 flex items-center justify-center flex-shrink-0">
                    <Server className="w-7 h-7 text-cyan-400" />
                  </div>
                  <span className="text-xl font-medium text-gray-200">Continuous Governance</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7 & 8. ENVIRONMENTS & DEPLOYMENT */}
      <section className="px-6 py-24 border-b border-cyan-900/20 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-16">Universal Topological Integration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="p-10 border border-cyan-900/50 rounded-2xl bg-black/80 backdrop-blur-md shadow-2xl">
              <h3 className="text-2xl font-bold text-cyan-400 mb-8 uppercase tracking-wider">Supported Environments</h3>
              <div className="grid grid-cols-2 gap-5">
                <div className="text-gray-200 font-medium bg-black border border-zinc-900 p-4 rounded-lg text-center text-lg">Cloud Infrastructure</div>
                <div className="text-gray-200 font-medium bg-black border border-zinc-900 p-4 rounded-lg text-center text-lg">On-Prem Servers</div>
                <div className="text-gray-200 font-medium bg-black border border-zinc-900 p-4 rounded-lg text-center text-lg">Hybrid Environments</div>
                <div className="text-gray-200 font-medium bg-black border border-zinc-900 p-4 rounded-lg text-center text-lg">Compute Clusters</div>
                <div className="text-gray-200 font-medium bg-black border border-zinc-900 p-4 rounded-lg text-center text-lg">Industrial Automation</div>
                <div className="text-gray-200 font-medium bg-black border border-zinc-900 p-4 rounded-lg text-center text-lg">Enterprise Networks</div>
              </div>
            </div>

            <div className="p-10 border border-zinc-800 rounded-2xl bg-zinc-950/50">
              <h3 className="text-2xl font-bold text-orange-500 mb-8 uppercase tracking-wider">Deployment Models</h3>
              <ul className="space-y-6">
                <li className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <span className="text-white font-medium text-xl">SaaS Integration</span>
                  <span className="text-sm text-cyan-400 bg-cyan-950/40 border border-cyan-900 px-3 py-1.5 rounded uppercase tracking-wide font-bold">Rapid</span>
                </li>
                <li className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <span className="text-white font-medium text-xl">Private Cloud</span>
                  <span className="text-sm text-cyan-400 bg-cyan-950/40 border border-cyan-900 px-3 py-1.5 rounded uppercase tracking-wide font-bold">Dedicated</span>
                </li>
                <li className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <span className="text-white font-medium text-xl">On-Prem Enterprise Deployment</span>
                  <span className="text-sm text-orange-400 bg-orange-950/40 border border-orange-900 px-3 py-1.5 rounded uppercase tracking-wide font-bold">Maximum Control</span>
                </li>
                <li className="flex items-center justify-between pb-4">
                  <span className="text-white font-medium text-xl">Air-Gapped (Optional)</span>
                  <span className="text-sm text-zinc-400 bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded uppercase tracking-wide font-bold">Isolated</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW: ARCHITECTURE VISUALIZER MODULE --- */}
      <section className="py-32 px-6 max-w-[100rem] mx-auto relative z-20 border-b border-cyan-900/20">
        <div className="text-center mb-24 bg-black/80 backdrop-blur-md border border-cyan-900/50 p-8 md:p-12 rounded-3xl max-w-5xl mx-auto shadow-2xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-cyan-500/30 bg-cyan-500/10 rounded-sm mb-6 shadow-[0_0_15px_rgba(8,145,178,0.2)]">
              <ShieldCheck size={16} className="text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">Whitepaper Documentation</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter drop-shadow-lg mb-6">
            System <span className="text-cyan-400">Architecture</span>
          </h2>
          <p className="text-gray-400 font-mono max-w-3xl mx-auto text-sm md:text-base">
            Declassified schematics detailing the A.I.C.E. deployment vectors, telemetry integration, and deterministic threat modeling.
          </p>
        </div>

        <div className="flex flex-col gap-24">
         
          {[
            {
              src: "/assets/images/features/Figure_1.png",
              title: "Conceptual Control Loop",
              desc: "The continuous stability governance cycle. This loop ensures bounded control actions that drive the infrastructure toward stability without altering the underlying client architecture.",
            },
            {
              src: "/assets/images/features/Figure_2.png",
              title: "Deployment Architecture",
              desc: "Strict demarcation between the Client Environment and the A.I.C.E. Sovereign Infrastructure. All intelligence, telemetry ingestion, and the DVS Core Engine remain completely air-gapped and secured via TLS 1.3.",
            },
            {
              src: "/assets/images/features/Figure_3.png",
              title: "Telemetry Dashboard",
              desc: "The visual interface for proximity scoring and entropic load. Provides absolute operational transparency, allowing operators to monitor the exact variance and response latency of the protocol in real-time.",
            },
            {
              src: "/assets/images/features/Figure_4.png",
              title: "Safety & Threat Model",
              desc: "The failsafe architecture designed for resilient stability. Outlines mitigation strategies against false positives, telemetry degradation, and adversarial manipulation, ensuring the Adaptive Governor never acts out of bounds.",
            }
          ].map((fig, idx) => (
// --- CODING ENDS: REPLACE WITH ---
            <div key={idx} className="flex flex-col bg-black/80 backdrop-blur-md border border-cyan-900/50 rounded-3xl p-6 md:p-10 hover:border-cyan-400/80 transition-colors shadow-2xl">
              
              <div className="mb-8 text-center max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white uppercase tracking-tight mb-4">{fig.title}</h3>
            <p className="text-gray-400 text-lg leading-relaxed">{fig.desc}</p>
            {/* Subtle, isolated instruction matrix */}
            <div className="flex items-center gap-2 text-cyan-600 mt-5 justify-center text-sm font-mono uppercase tracking-widest bg-cyan-950/20 py-2 px-4 rounded-full border border-cyan-900/30 inline-flex">
              <Search size={14} /> Click and hold to magnify schematic
            </div>
          </div>
          
          <div 
            className="w-full relative cursor-crosshair border border-white/5 rounded-xl overflow-hidden bg-black shadow-2xl group"
            onMouseDown={(e) => {
              const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
              
              const rawX = ((e.clientX - left) / width) * 100;
              const rawY = ((e.clientY - top) / height) * 100;
              
              const sensitivity = 1.8;
              const x = Math.max(0, Math.min(100, 50 + (rawX - 50) * sensitivity));
              const y = Math.max(0, Math.min(100, 50 + (rawY - 50) * sensitivity));
              
              setZoomState({ index: idx, x, y });
            }}
            onMouseUp={() => setZoomState({ index: null, x: 50, y: 50 })}
            onMouseLeave={() => setZoomState({ index: null, x: 50, y: 50 })}
            onMouseMove={(e) => handleMouseMove(e, idx)}
          >
            {/* Visual HUD Hover Effect */}
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none mix-blend-overlay"></div>
            
            {/* Primary Schematic Image with Dynamic Zoom Matrix */}
            <img 
              src={fig.src} 
              alt={fig.title} 
              className="w-full h-auto object-cover transition-transform duration-200 ease-out"
              style={{
                transform: zoomState.index === idx ? 'scale(2.5)' : 'scale(1)',
                transformOrigin: zoomState.index === idx ? `${zoomState.x}% ${zoomState.y}%` : 'center center'
              }}
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>
          ))}
        </div>
      </section>

      {/* 9. WHY ENTERPRISES CHOOSE A.I.C.E. (CTA) */}
      <section className="px-6 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-950/20 blur-[100px] rounded-full w-3/4 h-3/4 mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">The Logical Conclusion for Enterprise Security</h2>
          <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
            We develop and license proprietary risk-mitigation and system-governance software. A.I.C.E. represents the apex of structural equilibrium. No custody of funds. No consumer exposure. Pure B2B SaaS.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-base font-medium text-cyan-300 mb-14">
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Autonomous Stabilization</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Zero-Trust Governance</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Real-Time Drift Correction</span>
          </div>

          <button 
            onClick={() => window.location.href = '/diagnostics'}
            className="px-10 py-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-black text-xl uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(8,145,178,0.5)] hover:shadow-[0_0_40px_rgba(8,145,178,0.7)]"
          >
            Freeze The Entropy (See Diagnostics Live)
          </button>
        </div>
      </section>

      </div>
  );
}