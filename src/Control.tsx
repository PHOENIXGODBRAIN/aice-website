import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Server, Activity, ShieldCheck, ChevronRight
} from 'lucide-react';
import { SectorHeader } from './App';

// Bulletproof animation variants with explicit Typescript 'Variants' declarations
const fluidFrameIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.0, ease: "easeOut" } 
  }
};

const syntropyGlow: Variants = {
  animate: {
    boxShadow: [
      "0 0 15px rgba(0, 243, 255, 0.2)",
      "0 0 30px rgba(0, 243, 255, 0.5)",
      "0 0 15px rgba(0, 243, 255, 0.2)"
    ],
    transition: { duration: 4, repeat: Infinity }
  }
};

export default function ControlView({ setView }: { setView?: (v: any) => void }) {
  return (
    <div className="relative z-10 min-h-screen w-full flex flex-col bg-black text-white selection:bg-[#00F3FF] selection:text-black">
        
        {/* HERO SECTOR - Z-Axis Decoupled Background */}
        <section className="relative w-full px-6 flex flex-col items-center text-center pt-20 pb-32 mb-8 border-b border-white/10 overflow-hidden">
            
            {/* ABSOLUTE BACKGROUND LAYER (z-0) */}
            <div className="absolute inset-0 z-0 bg-[#050505]">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute top-0 left-0 w-full h-[150%] md:h-[120%]"
                    style={{
                        backgroundImage: "url('/assets/images/control/Controlbg.png')",
                        backgroundSize: '100% auto', // Forces full width without aggressive zooming
                        backgroundPosition: 'top center',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
                {/* Gradient overlay to ensure text readability without fading the top of the image */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/70 to-[#050505]" />
            </div>

            {/* FOREGROUND CONTENT (z-10) */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0 }}
              className="relative z-10 w-full mt-4"
            >
                <SectorHeader title="Infrastructure Control" subtitle="Macro-System Stabilization" icon={<Server size={48} />} />
            </motion.div>
            
            <motion.div 
              variants={fluidFrameIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="max-w-6xl mx-auto mt-20 relative z-10 bg-black/50 backdrop-blur-xl border border-[#00F3FF]/30 p-8 md:p-10 rounded-3xl shadow-[0_0_40px_rgba(0,243,255,0.15)]"
            >
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00F3FF] via-white to-[#FF8C00]">
                    The Architecture of Tomorrow
                </h3>
                <div className="space-y-6 text-left">
                    <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed border-l-4 border-[#00F3FF] pl-6 drop-shadow-md">
                        The digital-physical bridge is expanding. Modern infrastructure—from global SCADA pipelines to interconnected smart cities—operates in a state of continuous data velocity. To maintain harmony, this flow requires perfect synchronization at the architectural level.
                    </p>
                    <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed border-l-4 border-[#FF8C00] pl-6 drop-shadow-md">
                        The A.I.C.E. Protocol is the universal governor. We deploy a deterministic impedance layer that clears out algorithmic entropy, ensuring your physical and digital architecture scales with absolute stability and perfect operational syntropy.
                    </p>
                </div>
            </motion.div>
        </section>

        {/* --- MAIN SECTOR CONTENT --- */}
        <div className="flex flex-col gap-20 px-6 items-center mb-24">

            {/* SECTOR 04-A: HEAVY INDUSTRY */}
            <motion.div 
              variants={fluidFrameIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
                <div className="relative group">
                    <motion.div 
                        variants={syntropyGlow}
                        animate="animate"
                        className="h-[350px] md:h-[450px] rounded-3xl border-2 border-[#00F3FF]/40 overflow-hidden relative shadow-xl"
                    >
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] group-hover:scale-105"
                          style={{ backgroundImage: "url('/assets/images/control/Control_1.png')" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/90 backdrop-blur-md px-5 py-2 rounded-full border border-[#00F3FF]/50">
                            <Activity className="text-[#00F3FF] animate-pulse" size={18} />
                            <span className="font-mono text-xs tracking-[0.2em] text-[#00F3FF]">SCADA SYNTROPY: ACTIVE</span>
                        </div>
                    </motion.div>
                </div>
                
                <div className="flex flex-col text-left">
                    <h4 className="text-sm md:text-base font-mono tracking-[0.3em] text-[#00F3FF] mb-3">SECTOR // 04-A</h4>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">SCADA SYSTEM INTEGRITY</h2>
                    <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed mb-8 border-l-2 border-[#00F3FF] pl-5">
                        Critical manufacturing and energy grids rely on absolute precision. A.I.C.E. applies dynamic impedance to the command pipeline, neutralizing entropic friction before it reaches the hardware.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-lg text-gray-200">
                            <ChevronRight className="text-[#00F3FF] shrink-0 mt-1" size={24} /> 
                            <span>Dynamic Command Pipeline Optimization.</span>
                        </li>
                        <li className="flex items-start gap-3 text-lg text-gray-200">
                            <ChevronRight className="text-[#00F3FF] shrink-0 mt-1" size={24} /> 
                            <span>Maintenance of physical hardware longevity.</span>
                        </li>
                    </ul>
                </div>
            </motion.div>

            {/* SECTOR 04-B: LOGISTICS */}
            <motion.div 
              variants={fluidFrameIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
                <div className="order-2 lg:order-1 flex flex-col text-left">
                    <h4 className="text-sm md:text-base font-mono tracking-[0.3em] text-[#00F3FF] mb-3">SECTOR // 04-B</h4>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">AUTONOMOUS TRANSIT COHERENCE</h2>
                    <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed mb-8 border-l-2 border-[#00F3FF] pl-5">
                        Global robotic supply chains require flawless harmony. A single microsecond of latency triggers entropic cascades across the grid. A.I.C.E. acts as the ultimate traffic controller, orchestrating moving nodes into a seamless flow.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-lg text-gray-200">
                            <ChevronRight className="text-[#00F3FF] shrink-0 mt-1" size={24} /> 
                            <span>Flawless synchronization of automated fleets.</span>
                        </li>
                        <li className="flex items-start gap-3 text-lg text-gray-200">
                            <ChevronRight className="text-[#00F3FF] shrink-0 mt-1" size={24} /> 
                            <span>Continuous optimization of global supply chains.</span>
                        </li>
                    </ul>
                </div>
                
                <div className="order-1 lg:order-2 relative group">
                    <motion.div 
                        variants={syntropyGlow}
                        animate="animate"
                        className="h-[350px] md:h-[450px] rounded-3xl border-2 border-[#FF8C00]/20 overflow-hidden relative shadow-xl"
                    >
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] group-hover:scale-105"
                          style={{ backgroundImage: "url('/assets/images/control/Control_2.png')" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent" />
                        <div className="absolute top-6 right-6 bg-black/90 border border-[#00F3FF] px-5 py-2 rounded-full font-mono text-xs text-[#00F3FF] tracking-widest shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                            SYNC_LATENCY: &lt; 1MS
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* SECTOR 04-C: HYPERSCALE */}
            <motion.div 
              variants={fluidFrameIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
                <div className="relative group">
                    <motion.div 
                        variants={syntropyGlow}
                        animate="animate"
                        className="h-[350px] md:h-[450px] rounded-3xl border-2 border-[#00F3FF]/40 overflow-hidden relative shadow-xl"
                    >
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] group-hover:scale-110"
                          style={{ backgroundImage: "url('/assets/images/control/Control_3.png')" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </motion.div>
                </div>
                
                <div className="flex flex-col text-left">
                    <h4 className="text-sm md:text-base font-mono tracking-[0.3em] text-[#00F3FF] mb-3">SECTOR // 04-C</h4>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">COMPUTATIONAL LOAD GOVERNANCE</h2>
                    <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed mb-8 border-l-2 border-[#00F3FF] pl-5">
                        Hyperscale data centers generate immense demands. A.I.C.E. intercepts dense data volumes, enforcing a protective cognitive compute cap. This ensures hardware runs at peak efficiency while maintaining incontrovertible stability.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-lg text-gray-200">
                            <ChevronRight className="text-[#00F3FF] shrink-0 mt-1" size={24} /> 
                            <span>Algorithmic load-balancing for peak efficiency.</span>
                        </li>
                        <li className="flex items-start gap-3 text-lg text-gray-200">
                            <ChevronRight className="text-[#00F3FF] shrink-0 mt-1" size={24} /> 
                            <span>Hardware-level cognitive compute regulation.</span>
                        </li>
                    </ul>
                </div>
            </motion.div>
        </div>

        {/* ENTERPRISE CALL TO ACTION */}
        <motion.section 
            variants={fluidFrameIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative w-full py-24 px-6 flex items-center justify-center text-center overflow-hidden border-y border-white/10 bg-[#020202]"
        >
            <div className="absolute inset-0 z-0 opacity-20">
               <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00F3FF] via-black to-black" />
            </div>
            
            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
                 
                 {/* DOCKED LOGOS */}
                 <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-24 mb-12">
                     <motion.img
                        src="/assets/images/control/aicelogo.png"
                        alt="A.I.C.E. Syntropy Core"
                        className="w-40 h-40 md:w-48 md:h-48 object-contain"
                        animate={{ filter: ["drop-shadow(0 0 15px rgba(0,243,255,0.4))", "drop-shadow(0 0 30px rgba(0,243,255,0.6))", "drop-shadow(0 0 15px rgba(0,243,255,0.4))"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                     />
                     <motion.img
                        src="/assets/images/control/LOGO.png"
                        alt="A.I.C.E. Prime"
                        className="w-40 h-40 md:w-48 md:h-48 object-contain"
                        animate={{ 
                            filter: [
                                "drop-shadow(0 0 15px rgba(255,140,0,0.5))", 
                                "drop-shadow(0 0 40px rgba(0,243,255,0.6))", 
                                "drop-shadow(0 0 15px rgba(255,140,0,0.5))"
                            ] 
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                     />
                 </div>

                 <motion.div 
                    animate={{ scale: [1, 1.05, 1], borderColor: ["#00F3FF", "#FF8C00", "#00F3FF"] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="inline-flex items-center gap-3 px-8 py-2 border-2 rounded-full text-[#00F3FF] mb-10 font-bold uppercase tracking-[0.4em] text-xs md:text-sm bg-black/80 shadow-[0_0_20px_rgba(0,243,255,0.2)]"
                 >
                    <ShieldCheck size={18} /> AICE_ENFORCEMENT_PROTOCOL
                 </motion.div>
                 
                 <h2 className="text-5xl md:text-7xl font-black mb-10 uppercase tracking-tighter text-white drop-shadow-xl">
                   INFRASTRUCTURE <span className="text-[#00F3FF]">SCALE</span>
                 </h2>
                 
                 <p className="text-gray-400 text-xl md:text-3xl leading-relaxed max-w-4xl mx-auto mb-16 font-light italic border-x-4 border-[#00F3FF]/60 px-8 py-4 bg-black/40">
                   "We do not just process data. We enforce the physical limits of the machine through absolute operational syntropy."
                 </p>
                 
                 <button 
    onClick={() => setView && setView('SALES')}
    className="group relative px-16 py-6 bg-transparent transition-all duration-700 overflow-hidden rounded-xl border-4 border-[#00F3FF] hover:bg-[#00F3FF]"
>
                    <div className="absolute -inset-2 bg-[#00F3FF] opacity-0 blur-2xl group-hover:opacity-40 transition-opacity duration-700" />
                    <span className="relative z-10 text-[#00F3FF] group-hover:text-black font-mono font-black tracking-[0.4em] uppercase text-lg md:text-xl flex items-center gap-4">
                        INITIALIZE DEPLOYMENT <ChevronRight size={28} className="group-hover:translate-x-4 transition-transform duration-700" />
                    </span>
                 </button>
            </div>
        </motion.section>
    </div>
  );
}