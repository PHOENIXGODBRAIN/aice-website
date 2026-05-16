import React, { useEffect } from 'react';
import { ShieldCheck, Database, Zap, Crosshair } from 'lucide-react';

const CATEGORIES = [
  // --- PAGE 2 CHUNK ---
  {
    name: "AEROSPACE, SPACE & DEFENSE",
    sectors: [
      "AEROSPACE // COMMERCIAL AVIATION", "AEROSPACE // FLIGHT PHYSICS", "AEROSPACE // HYPERSONIC TELEMETRY", "AUTONOMOUS DRONES // SWARM COHERENCE", "AVIATION // AIR TRAFFIC CONTROL", "GOV INTELLIGENCE // BORDER SEC MESH", "GOV INTELLIGENCE // SIGNAL FILTERING", "SATELLITE COMMS // CONSTELLATION SYNC", "SATELLITE COMMS // DATA UPLINK", "SPACE TRAVEL // LIFE SUPPORT", "SPACE TRAVEL // ORBIT DECAY"
    ]
  },
  {
    name: "AI, COMPUTE & QUANTUM",
    sectors: [
      "AI LABS // INFERENCE ENGINES", "AI LABS // LLM TRAINING", "AI LABS // NEURAL NETWORKS", "CLOUD COMPUTE // HYPERSCALE REGIONS", "CLOUD COMPUTE // VM MIGRATION", "DATA CENTERS // HVAC GOVERNANCE", "DISTRIBUTED STORAGE // FRAGMENTATION SYNC", "QUANTUM COMPUTE // ERROR CORRECTION", "QUANTUM COMPUTE // QUBIT DECOHERENCE", "SEMICONDUCTORS // FAB AUTOMATION", "SEMICONDUCTORS // THERMAL THROTTLING", "STREAMING DATA // BITRATE FLUX"
    ]
  },
  {
    name: "FINANCE, CRYPTO & E-COMMERCE",
    sectors: [
      "BLOCKCHAIN // CONSENSUS TIMING", "BLOCKCHAIN // CRYPTOGRAPHY", "CENTRAL BANKING // FISCAL STABILITY", "DECENTRALIZED FINANCE // SMART CONTRACT SYNC", "E-COMMERCE // HIGH-LOAD TRANSACTIONS", "FINANCE // CLEARING HOUSES", "FINANCE // FOREX LEDGERS", "FINANCE // HIGH-VELOCITY LIQUIDITY", "HFT TRADING // ORDER BOOK DAMPENING", "INSURANCE // ACTUARIAL RISK"
    ]
  },
  {
    name: "CYBERSECURITY & NETWORK OPS",
    sectors: [
      "CYBERSECURITY // DDOS NEUTRALIZATION", "CYBERSECURITY // THREAT VECTORS", "CYBERSECURITY // ZERO-TRUST AUTH", "DIGITAL IDENTITY // BIOMETRIC AUTH", "INTERNET // BGP ROUTING", "INTERNET // DNS REGISTRIES", "TELECOMMUNICATIONS // 6G NETWORKS", "TELECOMMUNICATIONS // FIBER OPTIC ROUTING", "TELECOMMUNICATIONS // NETWORK NOISE"
    ]
  },
  // --- PAGE 3 CHUNK ---
  {
    name: "ENERGY, NUCLEAR & RENEWABLES",
    sectors: [
      "CARBON CAPTURE // FLUID DYNAMICS", "CLEAN ENERGY // GEOTHERMAL", "ENERGY // GRID STABILIZATION", "NUCLEAR FISSION // CONTAINMENT THERMALS", "NUCLEAR FUSION // REACTOR SAFETY", "OIL & GAS // PIPELINE TELEMETRY", "OIL & GAS // PRESSURE REGIMES", "POWER GRIDS // PHASE FREQUENCY", "RENEWABLES // INVERTER SYNC", "RENEWABLES // SOLAR ARRAYS", "RENEWABLES // WIND TURBINES", "SMART GRIDS // MICROGRID DISTRIBUTION"
    ]
  },
  {
    name: "BIOTECH, HEALTHCARE & NEURO",
    sectors: [
      "BEHAVIORAL SCIENCE // PREDICTIVE PSYCHOMETRICS", "BIOINFORMATICS // POPULATION GENOMICS", "BIOTECHNOLOGY // GENOMICS", "BIOTECHNOLOGY // PROTEIN FOLDING", "EPIDEMIOLOGY // VIRAL SPREAD MODELS", "HEALTHCARE // EMERGENCY DISPATCH", "HEALTHCARE // IMAGING DIAGNOSTICS", "HEALTHCARE // LIFE SUPPORT SYSTEMS", "HEALTHCARE // ROBOTIC SURGERY", "NEURALINK OPS // BCI SIGNALS", "NEURO-PROSTHETICS // KINEMATIC SYNC", "NEUROSCIENCE // BRAIN MAPPING", "PHARMACEUTICALS // DRUG DISCOVERY"
    ]
  },
  {
    name: "INDUSTRIAL, MANUFACTURING & ROBOTICS",
    sectors: [
      "ADDITIVE MANUFACTURING // MICRO-TOLERANCES", "ENTERPRISE ERP // DB LOCK DAMPENING", "INDUSTRIAL // DIGITAL TWINS", "INDUSTRIAL // MANUFACTURING AUTOMATION", "INDUSTRIAL // SCADA AUTOMATION", "MATERIALS SCIENCE // ALLOY SYNTHESIS", "MINING OPS // LOAD DENSITY", "NANOTECHNOLOGY // MOLECULAR ASSEMBLY", "ROBOTICS // KINEMATIC JERK"
    ]
  },
  // --- PAGE 4 CHUNK ---
  {
    name: "LOGISTICS, TRANSIT & CIVIL",
    sectors: [
      "AUTOMOTIVE // AUTONOMOUS FLEETS", "AUTOMOTIVE // EV BATTERIES", "AUTOMOTIVE // STEER-BY-WIRE", "CONSTRUCTION // BIM MODELING", "GOVERNMENT // CIVIL INFRASTRUCTURE", "LAW ENFORCEMENT // PREDICTIVE POLICING", "LOGISTICS // GLOBAL SUPPLY CHAIN", "LOGISTICS // ROUTE ENTROPY", "MARITIME SHIPPING // PORT AUTOMATION", "MARITIME SHIPPING // VESSEL TRIM", "MASS TRANSIT // RAIL AUTOMATION", "PUBLIC SAFETY // EMERGENCY MESH", "SMART CITIES // IOT INFRASTRUCTURE", "SMART CITIES // TRAFFIC GRID SYNC", "SMART WAREHOUSING // ROBOTIC PICKING", "URBAN PLANNING // RESOURCE ALLOCATION", "WASTE MGMT // LOGISTICS MESH", "WATER SYSTEMS // PRESSURE FLOW"
    ]
  },
  {
    name: "EARTH, MARINE & PHYSICAL SCIENCES",
    sectors: [
      "AGRI-TECH // AUTOMATED HARVEST", "AGRI-TECH // SOIL ENTROPY", "AGRI-TECH // YIELD FLUX", "AQUACULTURE // MARINE AUTOMATION", "ARCHAEOMETRY // ISOTOPE DATING", "ASTROPHYSICS // COSMOLOGICAL SIMULATIONS", "ASTROPHYSICS // DEEP SPACE TELEMETRY", "DEEP SEA OPS // PRESSURE FLUX", "FORESTRY // WILDFIRE PREDICTION", "METEOROLOGY // CLIMATE MODELS", "METEOROLOGY // SENSOR DRIFT", "PARTICLE PHYSICS // BEAM DIVERGENCE", "SEISMOLOGY // EARTHQUAKE PREDICTION"
    ]
  },
  {
    name: "MEDIA, ENTERTAINMENT & GAMING",
    sectors: [
      "BROADCASTING // LIVE EVENT SYNC", "EDUCATION // ED-TECH PLATFORMS", "ENTERTAINMENT // CGI RENDER FARMS", "ENTERTAINMENT // MEDIA DISTRIBUTION", "GAMING SERVERS // TICK RATE SYNC", "METAVERSE // REAL-TIME RAY TRACING", "METAVERSE // SPATIAL ENTROPY", "REAL ESTATE // PROPTECH PLATFORMS", "RETAIL // GLOBAL POS SYNC", "SOCIAL MEDIA // ALGORITHMIC FEEDS", "SOCIAL MEDIA // VIRAL DAMPENING", "SPORTS ANALYTICS // REAL-TIME KINEMATICS", "VIRTUAL REALITY // HAPTIC FEEDBACK"
    ]
  }
];

// MASSIVE SCREEN UPGRADE: Abandoned A4 dimensions for full-width 110rem container
const A4_PAGE_STYLE = "w-full max-w-[110rem] min-h-screen h-auto bg-[#050505] relative overflow-hidden flex flex-col mx-auto my-16 shadow-[0_0_100px_rgba(0,243,255,0.15)] rounded-[2rem] border border-[#00F3FF]/30 print:m-0 print:shadow-none print:break-after-page print:border-none print:rounded-none";

const PageHeader = () => (
    <div className="w-full flex justify-between items-center border-b-2 border-[#00F3FF]/20 pb-6 mb-12 relative z-10 pt-16 px-16">
        <div className="flex items-center gap-5">
            <img src="/assets/images/aicelogo.png" alt="AICE" className="w-14 h-14 object-contain" />
            <span className="text-white font-black tracking-widest text-2xl md:text-3xl uppercase">AICE<span className="text-[#00F3FF]">PROTOCOL</span></span>
        </div>
        <span className="text-[#00F3FF] font-mono text-base tracking-widest uppercase font-bold">Global Infrastructure Matrix // 120 Sectors</span>
    </div>
);

const PageFooter = ({ pageNum }: { pageNum: number }) => (
    <div className="w-full flex justify-between items-center border-t-2 border-[#00F3FF]/20 pt-6 mt-auto relative z-10 pb-12 px-16 bg-[#050505]">
        <span className="text-gray-500 font-mono text-sm tracking-widest uppercase font-bold">© 2026 A.I.C.E. SYSTEMS CORP. // CONFIDENTIAL</span>
        <span className="text-[#00F3FF] font-mono text-lg font-black tracking-[0.2em]">PAGE {pageNum} // 04</span>
    </div>
);

const Watermark = () => (
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-0">
        <img src="/assets/images/aicelogo.png" className="w-[1000px] h-[1000px] grayscale" alt="Watermark" />
    </div>
);

const RenderSector = ({ text }: { text: string }) => {
    const parts = text.split(' // ');
    return (
        <div className="flex flex-col mb-6 bg-black/40 p-6 border border-white/10 rounded-xl backdrop-blur-sm hover:border-[#00F3FF]/40 transition-colors shadow-inner group">
            <span className="text-gray-100 font-sans font-black text-xl md:text-2xl uppercase tracking-widest leading-tight group-hover:text-white transition-colors">{parts[0]}</span>
            <span className="text-[#00F3FF] font-mono text-base md:text-lg uppercase tracking-widest font-bold mt-2 flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-[#00F3FF] rounded-full shrink-0 shadow-[0_0_10px_#00F3FF]"></div> {parts[1]}
            </span>
        </div>
    );
};

export default function GlobalMatrixPDF() {
  
  useEffect(() => {
      const style = document.createElement('style');
      style.innerHTML = `
        @media print {
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background: #050505 !important; }
          @page { size: landscape; margin: 0; }
          .print-hide { display: none !important; }
        }
      `;
      document.head.appendChild(style);
      return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 py-10 print:py-0 font-sans">

      {/* --- PAGE 1: COVER --- */}
      <div className={A4_PAGE_STYLE}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          
          <div className="absolute top-16 left-16 w-16 h-16 border-t-4 border-l-4 border-[#00F3FF]/40"></div>
          <div className="absolute top-16 right-16 w-16 h-16 border-t-4 border-r-4 border-[#00F3FF]/40"></div>
          <div className="absolute bottom-16 left-16 w-16 h-16 border-b-4 border-l-4 border-[#00F3FF]/40"></div>
          <div className="absolute bottom-16 right-16 w-16 h-16 border-b-4 border-r-4 border-[#00F3FF]/40"></div>

          <div className="flex-1 flex flex-col items-center justify-center p-24 z-10">
              <img src="/assets/images/aicelogo.png" alt="AICE Logo" className="w-[400px] h-[400px] object-contain mb-20 drop-shadow-[0_0_80px_rgba(0,243,255,0.8)]" />
              
              <h1 className="text-[5rem] md:text-[6rem] font-black text-white uppercase tracking-tighter text-center leading-[1.1] mb-12" style={{ textShadow: '0 8px 30px rgba(0,0,0,1)' }}>
                  Global Infrastructure <br/> <span className="text-[#00F3FF]" style={{ textShadow: '0 0 30px rgba(0,243,255,0.6)' }}>Matrix</span>
              </h1>
              
              <div className="h-[3px] w-64 bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent mb-16 shadow-[0_0_20px_#00F3FF]"></div>
              
              <p className="text-3xl font-mono text-gray-300 tracking-[0.3em] uppercase font-bold text-center leading-relaxed">
                  120 Mission-Critical <br/> Deployment Vectors
              </p>
              
              <div className="mt-32 p-8 border border-[#00F3FF]/30 bg-[#00F3FF]/5 rounded-2xl flex items-center gap-8 shadow-[0_0_40px_rgba(0,243,255,0.15)]">
                  <ShieldCheck size={56} className="text-[#00F3FF]" />
                  <div className="text-left border-l-2 border-[#00F3FF]/30 pl-8">
                      <div className="text-[#00F3FF] font-mono text-base tracking-[0.2em] font-bold mb-2">CLASSIFICATION LEVEL S</div>
                      <div className="text-white font-mono text-xl tracking-widest font-bold">A.I.C.E. COMMAND DECK AUTHORIZED</div>
                  </div>
              </div>
          </div>
      </div>

      {/* --- PAGE 2: CATEGORIES 0-3 --- */}
      <div className={A4_PAGE_STYLE}>
          <Watermark />
          <PageHeader />
          <div className="flex-1 px-16 relative z-10">
              {CATEGORIES.slice(0, 4).map(cat => (
                  <div className="mb-10" key={cat.name}>
                      <h3 className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-4 border-b-2 border-[#00F3FF]/30 pb-4 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                          <Zap size={28} className="text-[#00F3FF] animate-pulse" /> {cat.name}
                      </h3>
                      <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                          {cat.sectors.map(sector => <RenderSector key={sector} text={sector} />)}
                      </div>
                  </div>
              ))}
          </div>
          <PageFooter pageNum={2} />
      </div>

      {/* --- PAGE 3: CATEGORIES 4-6 --- */}
      <div className={A4_PAGE_STYLE}>
          <Watermark />
          <PageHeader />
          <div className="flex-1 px-16 relative z-10">
              {CATEGORIES.slice(4, 7).map(cat => (
                  <div className="mb-10" key={cat.name}>
                      <h3 className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-4 border-b-2 border-[#00F3FF]/30 pb-4 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                          <Database size={28} className="text-[#00F3FF] animate-pulse" /> {cat.name}
                      </h3>
                      <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                          {cat.sectors.map(sector => <RenderSector key={sector} text={sector} />)}
                      </div>
                  </div>
              ))}
          </div>
          <PageFooter pageNum={3} />
      </div>

      {/* --- PAGE 4: CATEGORIES 7-9 --- */}
      <div className={A4_PAGE_STYLE}>
          <Watermark />
          <PageHeader />
          <div className="flex-1 px-16 relative z-10">
              {CATEGORIES.slice(7, 10).map(cat => (
                  <div className="mb-10" key={cat.name}>
                      <h3 className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-4 border-b-2 border-[#00F3FF]/30 pb-4 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                          <Crosshair size={28} className="text-[#00F3FF] animate-pulse" /> {cat.name}
                      </h3>
                      <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                          {cat.sectors.map(sector => <RenderSector key={sector} text={sector} />)}
                      </div>
                  </div>
              ))}
              
              {/* THE SIGNATURE LOCK */}
              <div className="mt-16 pt-8 border-t-2 border-[#00F3FF]/30 flex justify-between items-end">
                  <div>
                      <div className="text-[#00F3FF] font-mono text-sm uppercase tracking-widest mb-2">Authorization Matrix</div>
                      <div className="text-white font-black text-3xl tracking-widest drop-shadow-md">PHOENIX_DVS</div>
                  </div>
                  <img src="/assets/images/aicelogo.png" className="w-20 h-20 opacity-50 grayscale hover:grayscale-0 transition-all" alt="Signature Seal" />
              </div>

          </div>
          <PageFooter pageNum={4} />
      </div>

    </div>
  );
}