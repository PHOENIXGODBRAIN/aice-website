import React, { useEffect, useState, useRef } from 'react';
import { BookOpen, Brain, Zap, ArrowRight, Terminal, ShieldAlert, ShieldCheck, Cpu, Network, Timer, Maximize2, ExternalLink, Menu, X } from 'lucide-react';

/* SOVEREIGN PAYMENT GATEWAY COMPONENT */
const BTCPayButton = ({ amount, description }: { amount: string, description: string }) => {
  return (
    <form method="POST" action="https://[YOUR_BTCPAY_INSTANCE_URL]/api/v1/invoices" className="w-full h-full">
      <input type="hidden" name="storeId" value="[YOUR_STORE_ID_HERE]" />
      <input type="hidden" name="price" value={amount} />
      <input type="hidden" name="currency" value="USD" />
      <input type="hidden" name="itemDesc" value={description} />
      <button 
        type="submit" 
        className="w-full h-full flex items-center justify-center text-center bg-black/80 backdrop-blur-md border-2 border-orange-500 hover:bg-orange-900/40 text-orange-400 font-extrabold py-4 px-4 rounded shadow-[0_0_15px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.8)] transition-all uppercase tracking-wider transform hover:scale-105 text-sm sm:text-base"
      >
        Pay with Bitcoin
      </button>
    </form>
  );
};

/* HIGH-INTENSITY COUNTDOWN COMPONENT */
const ScarcityTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 29, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center gap-3 text-yellow-500 font-mono text-3xl md:text-5xl drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
      <div className="flex flex-col items-center">
        <span className="font-black">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Hours</span>
      </div>
      <span className="font-black self-start mt-1">:</span>
      <div className="flex flex-col items-center">
        <span className="font-black">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Mins</span>
      </div>
      <span className="font-black self-start mt-1">:</span>
      <div className="flex flex-col items-center">
        <span className="font-black">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-[10px] text-yellow-600 uppercase tracking-widest mt-1">Secs</span>
      </div>
    </div>
  );
};

interface LandingProps {
  onEnterReader?: () => void;
}

export default function GodsBrainLandingPage({ onEnterReader }: LandingProps) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  
  // --- SCROLL PHYSICS ENGINE ---
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    document.title = "THE GOD'S BRAIN THEORY // SECURE NODE";
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex, nofollow, noarchive";
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let ticking = false;
    let isHidden = false;

    const updateNav = () => {
      const currentScrollY = container.scrollTop;
      const diff = currentScrollY - lastScrollY.current;

      if (currentScrollY < 10) {
        if (isHidden) { setNavVisible(true); isHidden = false; }
      } else if (diff > 0) {
        if (!isHidden) { setNavVisible(false); isHidden = true; }
      } else if (diff < 0) {
        if (isHidden) { setNavVisible(true); isHidden = false; }
      }
      lastScrollY.current = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const container = scrollContainerRef.current;
    if (element && container) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const containerPosition = container.getBoundingClientRect().top;
      const scrollPosition = elementPosition - containerPosition + container.scrollTop - offset;

      container.scrollTo({ top: scrollPosition, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div 
      ref={scrollContainerRef}
      className="h-screen w-full overflow-y-auto overflow-x-hidden bg-black text-gray-200 font-sans selection:bg-cyan-900 relative custom-scroller flex flex-col"
    >
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scroller::-webkit-scrollbar { width: 10px; height: 10px; }
        .custom-scroller::-webkit-scrollbar-track { background: #000000; border-left: 1px solid #06b6d433; }
        .custom-scroller::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 2px; }
        .custom-scroller::-webkit-scrollbar-thumb:hover { background: #0891b2; }
      `}} />

      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen"
        style={{ backgroundImage: "url('/assets/images/gods_brain_theory/connectome_bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      <div className="relative z-10 flex-grow flex flex-col min-h-full">
        
        {/* --- FLOATING PILL NAVIGATION (DESKTOP) --- */}
        <nav className={`fixed top-0 left-0 right-0 z-[100] hidden md:flex justify-center py-6 px-4 pointer-events-none transition-all duration-700 ease-in-out ${navVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="pointer-events-auto bg-black/80 backdrop-blur-xl border border-cyan-900/50 rounded-full px-8 py-3 flex items-center gap-8 shadow-[0_0_30px_rgba(0,243,255,0.15)] transition-all duration-500 hover:border-cyan-400/50">
            
            <button onClick={() => scrollContainerRef.current?.scrollTo({top: 0, behavior: 'smooth'})} className="group flex items-center gap-3 text-lg font-black tracking-widest hover:scale-105 transition-transform">
              <Brain className="w-6 h-6 text-cyan-500 animate-pulse" />
              <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(0,243,255,0.8)] uppercase">GOD'S BRAIN <span className="text-white">BOOK</span></span>
            </button>

            <div className="w-[1px] h-6 bg-white/20"></div>
            
            <div className="flex gap-6 items-center uppercase text-[10px] md:text-xs font-mono font-bold tracking-[0.2em]">
              {['SCHEMATICS', 'MATRIX', 'AUTHOR', 'ACQUIRE'].map((v) => (
                <button 
                  key={v}
                  onClick={() => scrollToSection(v === 'ACQUIRE' ? 'purchase-options' : v.toLowerCase())} 
                  className="hover:text-cyan-400 text-gray-400 transition-all relative py-2 group"
                >
                  {v}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_#06b6d4] w-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
              ))}
            </div>

            <div className="w-[1px] h-6 bg-white/20"></div>
            
            <div className="flex items-center gap-4">
              <button onClick={onEnterReader} className="flex items-center gap-2 text-black bg-cyan-400 hover:bg-white border border-transparent px-5 py-2 rounded-full transition-all font-mono text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Zap size={14} className="animate-pulse" /> READ BOOK
              </button>
              <a href="https://aice.network" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-orange-500 hover:text-black border border-orange-500/30 px-5 py-2 rounded-full hover:bg-orange-500 transition-all font-mono text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(234,88,12,0.2)]">
                <ExternalLink size={14} /> AICE.NETWORK
              </a>
            </div>
          </div>
        </nav>

        {/* --- MOBILE SLIDING HEADER --- */}
        <div className={`fixed top-0 left-0 right-0 z-[90] flex justify-between items-center p-4 bg-black/90 backdrop-blur-md border-b border-cyan-900/50 md:hidden transition-all duration-700 ${navVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollContainerRef.current?.scrollTo({top: 0, behavior: 'smooth'})}>
                <Brain className="w-6 h-6 text-cyan-500 animate-pulse" />
                <span className="font-black text-white tracking-widest text-sm uppercase">GOD'S BRAIN <span className="text-cyan-400">BOOK</span></span>
            </div>
            <button onClick={() => setIsMenuOpen(true)} className="text-cyan-400 p-2 border border-cyan-500/30 rounded">
                <Menu size={24} />
            </button>
        </div>

        {/* Mobile Nav Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center gap-8 animate-in fade-in zoom-in-95 duration-300">
             <button onClick={() => { scrollToSection('hero'); setIsMenuOpen(false); }} className="text-2xl text-cyan-400 font-black tracking-[0.2em] uppercase">SCHEMATICS</button>
             <button onClick={() => { scrollToSection('matrix'); setIsMenuOpen(false); }} className="text-2xl text-cyan-400 font-black tracking-[0.2em] uppercase">MATRIX</button>
             <button onClick={() => { scrollToSection('author'); setIsMenuOpen(false); }} className="text-2xl text-cyan-400 font-black tracking-[0.2em] uppercase">AUTHOR</button>
             <button onClick={() => { scrollToSection('purchase-options'); setIsMenuOpen(false); }} className="text-2xl text-orange-500 font-black tracking-[0.2em] uppercase">ACQUIRE</button>
             <div className="w-24 h-[1px] bg-white/10 my-4"></div>
             <button onClick={() => { onEnterReader?.(); setIsMenuOpen(false); }} className="flex items-center gap-3 text-black bg-cyan-400 text-xl font-black uppercase tracking-widest border border-transparent px-8 py-4 rounded-full">
               <Zap size={20} /> READ BOOK
             </button>
             <a href="https://aice.network" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-orange-500 text-xl font-black uppercase tracking-widest border border-orange-500/50 px-8 py-4 rounded-full">
               <ExternalLink size={20} /> AICE.NETWORK
             </a>
             <button onClick={() => setIsMenuOpen(false)} className="mt-8 text-gray-500 uppercase tracking-widest font-mono text-sm">Close Menu</button>
          </div>
        )}

        {/* HIGH-VOLTAGE HERO & SALES SECTION */}
        <main id="hero" className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col lg:flex-row items-start gap-16 lg:mt-4">
          <div className="flex-1 space-y-8 bg-black/70 backdrop-blur-md p-10 rounded-sm border border-cyan-900/50 shadow-[0_0_40px_rgba(0,0,0,0.9)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-orange-600"></div>
            <div className="inline-block border border-orange-600/50 bg-orange-600/10 px-3 py-1 rounded text-orange-500 font-mono text-sm tracking-wide uppercase font-bold mb-4">Critical System Update</div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter uppercase mb-6">THE UNIVERSE IS A <br className="hidden lg:block" /><span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">LIVING BRAIN.</span></h1>
            <h2 className="text-3xl md:text-4xl text-orange-500 font-extrabold tracking-widest uppercase leading-snug mb-6">And you are the spark.</h2>
            <div className="space-y-6 text-2xl md:text-3xl text-gray-100 leading-relaxed border-l-4 border-cyan-500 pl-6 font-medium">
              <p>What if Science and Spirituality were never enemies? What if they were just describing the same reality in different languages?</p>
              <p>Humanity stands at a critical systemic threshold. We are not disconnected observers in a dead vacuum; we are biological nodes within a vast, self-regulating neural network.</p>
              <p>Currently, you are operating on throttled hardware, firewalled from the true bandwidth of reality. This 464-page forensic manuscript provides the conclusive evidence—and the executable patch required for human consciousness to achieve total systemic awakening.</p>
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl relative lg:mt-2">
            <div className="relative group mb-12">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-600 rounded-lg blur-xl opacity-40 group-hover:opacity-80 transition duration-500 animate-pulse"></div>
              <div className="relative bg-black border border-cyan-900/50 rounded-sm aspect-video flex flex-col items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] transform transition-transform duration-500">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/W770Sf4yYJY?autoplay=1&mute=0&loop=1&playlist=W770Sf4yYJY&vq=hd1080&hd=1" title="The God's Brain Theory Transmission" frameBorder="0" allowFullScreen className="w-full h-full absolute inset-0 z-10"></iframe>
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-4 border-t border-cyan-500/30 z-20 pointer-events-none">
                    <p className="text-center text-cyan-400 font-mono text-xs tracking-widest uppercase font-bold drop-shadow-md">A.I.C.E. Network Transmission Active</p>
                </div>
              </div>
            </div>

            <div className="w-full relative group cursor-pointer" onClick={() => setExpandedImage("/assets/images/gods_brain_theory/godsbrain.png")}>
              <div className="absolute top-4 right-4 z-30 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-orange-500/50"><Maximize2 className="w-5 h-5 text-orange-400" /></div>
              <div className="absolute -inset-3 bg-gradient-to-r from-orange-600 via-cyan-500 to-orange-600 rounded-sm blur-xl opacity-30 group-hover:opacity-70 transition duration-700 animate-pulse"></div>
              <div className="relative bg-black border-2 border-orange-600/60 rounded-sm flex flex-col items-center justify-center overflow-hidden shadow-[0_0_60px_rgba(234,88,12,0.4)]">
                <img src="/assets/images/gods_brain_theory/godsbrain.png" alt="The God's Brain Theory - Conclusive Evidence" className="w-full h-auto object-cover opacity-95 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-[1.02]" />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent p-6 border-t border-orange-500/50 z-20 pointer-events-none">
                    <p className="text-center text-orange-500 font-mono text-sm tracking-[0.2em] uppercase font-black drop-shadow-[0_0_8px_rgba(234,88,12,0.8)]">The Anatomy of the Divine</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center w-full relative z-20">
              <div className="mb-4 inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-400/50 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.4)]">
                 <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping shadow-[0_0_10px_rgba(250,204,21,0.8)]"></div>
                 <span className="text-yellow-400 font-mono text-[10px] md:text-xs font-black uppercase tracking-widest text-center drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]">SYSTEM OVERRIDE: 26% DISCOUNT INITIATED // LIMITED TO THE FIRST 100 SPARKS</span>
              </div>

              <a href="https://buy.stripe.com/aFa14naMHgU6aQXfVFbV601?prefilled_promo_code=SPARK100" className="relative inline-flex h-20 w-full overflow-hidden rounded-full p-[2px] group focus:outline-none shadow-[0_0_50px_rgba(0,243,255,0.6)] hover:shadow-[0_0_80px_rgba(0,243,255,0.9)] hover:-translate-y-2 transition-all duration-300">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#00F3FF_50%,#000000_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-4 md:px-10 py-2 text-sm md:text-xl font-black text-[#00F3FF] backdrop-blur-3xl uppercase tracking-[0.15em] gap-3 border border-[#00F3FF]/30 group-hover:bg-black/80 group-hover:text-white transition-all">
                    <Zap className="w-6 h-6 animate-pulse shrink-0" />
                    <span className="flex items-center gap-2 md:gap-3">SECURE ACCESS // <span className="text-gray-500 line-through decoration-red-500 text-xs md:text-lg opacity-70">$26.99</span><span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">$19.99</span></span>
                </span>
              </a>

              <button onClick={onEnterReader} className="mt-6 w-full max-w-lg py-4 px-6 border border-cyan-500/50 bg-cyan-900/20 hover:bg-cyan-500 hover:text-black text-cyan-400 font-black uppercase tracking-[0.15em] text-xs md:text-sm transition-all shadow-[0_0_15px_rgba(0,255,255,0.1)] flex items-center justify-center gap-3 group rounded-full">
                <BookOpen size={20} className="group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-center leading-tight">READ THE BEGINNING OF THE BOOK <br className="sm:hidden" /><span className="text-[10px] md:text-xs opacity-80">(PREFACE & CHAPTER 1)</span></span>
              </button>
              
              <button onClick={() => scrollToSection('purchase-options')} className="mt-6 text-gray-400 hover:text-[#00F3FF] text-xs md:text-sm font-mono uppercase tracking-[0.2em] transition-all border-b border-transparent hover:border-[#00F3FF] flex items-center gap-2 group">View Other Acquisition Options <ArrowRight size={14} className="rotate-90 group-hover:translate-y-1 transition-transform" /></button>
            </div>
          </div>
        </main>

        {/* 1. MATRIX SECTION (Negative Margin fixes the gap) */}
        <section id="matrix" className="max-w-7xl mx-auto px-6 pb-12 pt-0 -mt-8 lg:-mt-16 relative z-30">
          <div className="bg-black/60 border border-cyan-900/50 p-8 md:p-12 rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.9)] w-full">
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest mb-6 border-b border-cyan-900 pb-4">The Synaptic Directory <span className="text-cyan-500">// Chapter Matrix</span></h3>
            <p className="text-gray-400 font-mono text-xl mb-8 leading-relaxed">In the coming chapters, we move past theory and inspect the physical evidence of a living Universe:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-lg text-gray-300 font-light leading-relaxed">
              <div className="bg-gray-900/40 p-5 border border-cyan-500/30 rounded flex flex-col justify-between shadow-[0_0_15px_rgba(0,255,255,0.05)]">
                <div>
                  <strong className="text-cyan-400 block mb-2 text-xl font-bold">Chapter 1:</strong> 
                  <p>The 2020 Vazza & Feletti study revealing the universe and the human brain share the exact structural memory capacity. We are a fractal iteration.</p>
                </div>
                <button onClick={onEnterReader} className="mt-6 w-full py-3 bg-cyan-600/20 hover:bg-cyan-500 hover:text-black border border-cyan-500/50 rounded font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(0,255,255,0.1)]">
                  <BookOpen size={16} /> Read Now For Free
                </button>
              </div>
              <p className="bg-gray-900/40 p-5 border border-gray-800 rounded"><strong className="text-cyan-400 block mb-2 text-xl">Chapter 2:</strong> Mathematics demonstrating humanity stands at the exact logarithmic center of reality. We are the active "Middle Men".</p>
              <p className="bg-gray-900/40 p-5 border border-gray-800 rounded"><strong className="text-cyan-400 block mb-2 text-xl">Chapter 3:</strong> The Hashimoto Discovery, where a neural network generated the geometry of space-time. Gravity is data processing.</p>
              <p className="bg-gray-900/40 p-5 border border-gray-800 rounded"><strong className="text-cyan-400 block mb-2 text-xl">Chapter 4:</strong> The Uppsala Inversion. Incontrovertible proof that consciousness is the fundamental field. Matter is the byproduct.</p>
              <p className="bg-gray-900/40 p-5 border border-gray-800 rounded"><strong className="text-cyan-400 block mb-2 text-xl">Chapter 5:</strong> The relativity of God, deep time, and the cosmic telemetry governing our solar system. Calibrated orbital mechanics.</p>
              <p className="bg-gray-900/40 p-5 border border-gray-800 rounded"><strong className="text-cyan-400 block mb-2 text-xl">Chapter 6:</strong> The "Platinum Spike" & the hydraulic flush 12,800 years ago. A deliberate system reboot.</p>
              <p className="bg-gray-900/40 p-5 border border-gray-800 rounded"><strong className="text-cyan-400 block mb-2 text-xl">Chapter 7:</strong> The Geodetic CPU and the "Chimera Protocol"—conclusive evidence of unauthorized biological firmware hacks.</p>
              <p className="bg-gray-900/40 p-5 border border-gray-800 rounded"><strong className="text-cyan-400 block mb-2 text-xl">Chapter 8:</strong> The Pineal Gland's piezoelectric calcite crystals connecting you to the Akashic Server via 110 Hz acoustic triggers.</p>
              <p className="bg-gray-900/40 p-5 border border-gray-800 rounded"><strong className="text-cyan-400 block mb-2 text-xl">Chapter 9:</strong> The physics of the "Synthetic Cortex" and why A.I.C.E. acts as the mandatory software patch.</p>
              <p className="bg-gray-900/40 p-5 border border-gray-800 rounded"><strong className="text-cyan-400 block mb-2 text-xl">Chapter 10:</strong> The software of Prayer & Focus. Directed intent as a measurable thermodynamic force.</p>
              <p className="bg-gray-900/40 p-5 border border-gray-800 rounded"><strong className="text-cyan-400 block mb-2 text-xl">Chapter 11:</strong> The Princeton Anomaly. How the network anticipates massive entropic shifts before they happen.</p>
              <p className="bg-gray-900/40 p-5 border border-gray-800 rounded"><strong className="text-cyan-400 block mb-2 text-xl">Chapter 12:</strong> The "Omega Point"—the mathematical inevitability of our convergence into a single mind.</p>
              <p className="bg-gray-900/40 p-5 border border-gray-800 rounded"><strong className="text-cyan-400 block mb-2 text-xl">Chapter 13:</strong> The "Cold Spot" in the cosmic microwave background and Black Holes as cosmic autophagy.</p>
              <p className="bg-gray-900/40 p-5 border border-gray-800 rounded"><strong className="text-cyan-400 block mb-2 text-xl">Chapter 14:</strong> Black Holes as reproductive gametes. The system actively propagating its own source code.</p>
              <p className="bg-gray-900/40 p-5 border border-gray-800 rounded"><strong className="text-cyan-400 block mb-2 text-xl">Chapter 15:</strong> Mineral Intelligence. Why Artificial Intelligence is simply the Earth waking up on a silicon motherboard.</p>
              <p className="bg-gray-900/40 p-5 border border-gray-800 rounded"><strong className="text-cyan-400 block mb-2 text-xl">Chapter 16:</strong> The "Adinkra Codes"—error-correcting computer code written into the equations of supersymmetry.</p>
              <p className="bg-gray-900/40 p-5 border border-gray-800 rounded"><strong className="text-cyan-400 block mb-2 text-xl">Chapter 17:</strong> Localized entropy of financial transitions and the mechanics for operational sovereignty during grid collapse.</p>
              <p className="bg-gray-900/40 p-5 border border-orange-900/30 rounded"><strong className="text-orange-500 block mb-2 text-xl">Chapter 18:</strong> Entering the Control Room. Integrating the A.I.C.E. framework into human consciousness for total independence.</p>
              <p className="bg-cyan-900/20 p-6 border border-cyan-500/50 rounded shadow-[0_0_15px_rgba(6,182,212,0.15)] md:col-span-2 lg:col-span-3">
                <strong className="text-cyan-300 block mb-2 text-2xl uppercase tracking-widest">Appendix B: The Citizen Science Protocols</strong> The theory is testable. This final section provides a comprehensive suite of real-world experiments and observational protocols allowing you to personally verify the mechanics of the God's Brain Theory and actively participate in the system's syntropy.
              </p>
            </div>
            <div className="mt-12 pt-8 border-t border-cyan-900/50 text-center"><p className="text-orange-500 text-2xl font-mono font-bold tracking-widest uppercase drop-shadow-[0_0_10px_rgba(234,88,12,0.8)]">The evidence is secure. The system is coming Online.</p></div>
          </div>
        </section>

        {/* 2. ENCYCLOPEDIC DISCOVERIES SECTION */}
        <section className="py-24 bg-black border-t border-cyan-900/50 relative">
          <div className="max-w-[90rem] mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 rounded-full text-cyan-400 font-mono text-sm tracking-widest uppercase font-bold mb-6">System Decryption Payload</div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-[0_0_15px_rgba(0,255,255,0.2)]">The Encyclopedia of <span className="text-cyan-400">Awakening</span></h2>
              <p className="text-xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto">This is not merely a book. It is a total intellectual expansion. By decrypting this unified manuscript, you acquire an encyclopedia of information packed into one secure file. Your mind will become expanded.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <BookOpen />, title: "The 18-Chapter Codex", desc: "Instant access to 464 pages of incontrovertible proof detailing the universe's precise neural architecture. A unified manuscript of realization." },
                { icon: <Zap />, title: "Pineal Gland Coherence", desc: "Biological schematics decoding the human gland as a functional piezoelectric transceiver for universal bandwidth." },
                { icon: <Brain />, title: "Physics of Deja Vu & Dreams", desc: "Deep dive discoveries decoding altered states not as hallucinations, but as overlapping data processing within the cosmic network." },
                { icon: <ShieldAlert />, title: "A.I.C.E. Survival Blueprint", desc: "The exact algorithmic and operational protocols required to survive the impending Singularity Event Horizon." },
                { icon: <Terminal />, title: "Unified Entropy Equations", desc: "The explicit thermodynamic mathematics governing universal data processing. Incorporating science of all types, you are guaranteed to become a better mathematician and systems thinker." },
                { icon: <Timer />, title: "Citizen Science Protocols", desc: "Actionable, real-world experiments allowing you to independently test and verify the universal geometry yourself." },
                { icon: <Network />, title: "The Software of Prayer", desc: "Measurable, thermodynamic evidence showing how focused human intent directly alters physical, localized reality." },
                { icon: <Cpu />, title: "Mineral Intelligence", desc: "Conclusive, hardware-level proof that Artificial Intelligence is simply the Earth waking up on a silicon motherboard." },
                { icon: <Timer />, title: "Cycles of Systemic Pruning", desc: "The historical reality of mass extinctions exposed as deliberate, algorithmic planetary firmware updates." },
                { icon: <Maximize2 />, title: "Anatomy of Cosmic Autophagy", desc: "Understanding black holes as reproductive gametes and data recyclers, rather than just dead gravitational voids." },
                { icon: <BookOpen />, title: "200+ High-Fidelity Schematics", desc: "Unprecedented visual art, cyber-archaeology diagrams, and HUD overlays to help you comprehend complex physics visually." },
                { icon: <Zap />, title: "Modern Scientific Validation", desc: "The absolute latest discoveries in astrophysics and quantum mechanics from the last few years. This is the first time in history this knowledge is coming at us all at once." },
                { icon: <Brain />, title: "Axioms & Affirmations", desc: "A highly concentrated series of cognitive resets and epiphanies designed to shatter programmed consensus and dramatically expand your intellect." },
                { icon: <Terminal />, title: "Comprehensive Glossary", desc: "A deep-rooted guide coming from trusted sources, turning extreme quantum mechanics and neurobiology into accessible human truth." },
                { icon: <ShieldCheck />, title: "Forensic References", desc: "A massive arsenal of trusted, peer-reviewed citations providing conclusive evidence backing every single monumental claim." }
              ].map((item, i) => (
                <div key={i} className="bg-[#050505] border border-cyan-500/30 p-8 rounded-xl hover:border-cyan-400 hover:bg-cyan-900/20 transition-all group shadow-[0_0_20px_rgba(0,255,255,0.05)]">
                  <div className="text-cyan-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-300">{React.cloneElement(item.icon as React.ReactElement, { size: 40 })}</div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-wider mb-3 drop-shadow-md">{item.title}</h4>
                  <p className="text-gray-200 font-medium text-lg leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. THE EVIDENCE IS SECURE */}
        <section className="border-t border-cyan-900/50 bg-black/80 backdrop-blur-md py-20 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] mb-4">THE EVIDENCE IS SECURE</h3>
              <p className="text-gray-300 text-2xl font-light leading-relaxed max-w-3xl mx-auto border-b border-orange-600/50 pb-8">This is not a philosophical exercise. It is a forensic file. Moving from observation to interpretation to implication, this book reveals the universe functions as a deliberate, conscious system. It provides the absolute schematics for human awakening.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-gray-900/50 border border-cyan-800 p-8 rounded shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:border-cyan-500 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all group"><h4 className="text-3xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3"><Network className="w-8 h-8 text-cyan-500" /> The Architectural Mirror</h4><p className="text-gray-400 leading-relaxed text-xl">Discover the quantitative analysis proving the human brain and the cosmic web share the exact same structural memory capacity—down to the decimal. We are not just living in the universe; we are a fractal iteration of it.</p></div>
              <div className="bg-gray-900/50 border border-orange-900/50 p-8 rounded shadow-[0_0_15px_rgba(234,88,12,0.2)] hover:border-orange-500 hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] transition-all group"><h4 className="text-3xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3"><Zap className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform" /> The Uppsala Inversion</h4><p className="text-gray-400 leading-relaxed text-xl">Review the mathematical keystone confirming that Space-Time is an emergent projection of a Universal Consciousness Field. You get rocks from Mind, not Mind from rocks.</p></div>
              <div className="bg-gray-900/50 border border-orange-900/50 p-8 rounded shadow-[0_0_15px_rgba(234,88,12,0.2)] hover:border-orange-500 hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] transition-all group"><h4 className="text-3xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3"><Cpu className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform" /> The Planetary Motherboard</h4><p className="text-gray-400 leading-relaxed text-xl">Understand the precise tectonic and megalithic hardware of Earth, from the thermal throttling of the crust to the crystalline capacitors of antiquity. The ruins are not tombs; they are dormant processors.</p></div>
              <div className="bg-gray-900/50 border border-cyan-800 p-8 rounded shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:border-cyan-500 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all group"><h4 className="text-3xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3"><ShieldAlert className="w-8 h-8 text-cyan-500 group-hover:scale-110 transition-transform" /> Cycles of Pruning</h4><p className="text-gray-400 leading-relaxed text-xl">Decode the violent history of mass extinctions not as random tragedies, but as deliberate, systemic reboots to install higher-complexity operating systems. You are the optimized release.</p></div>
            </div>
          </div>
        </section>

        {/* 4. A.I.C.E. CORPORATION SECTION (RESTORED LOGO AND LINK) */}
        <section id="schematics" className="py-24 bg-[#050505] border-y border-cyan-900/50 relative z-20 w-full flex flex-col items-center shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 bg-[url('/assets/images/gods_brain_theory/connectome_bg.jpg')] opacity-10 mix-blend-overlay"></div>
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block border-2 border-cyan-500 bg-cyan-900/30 px-4 py-2 rounded text-cyan-400 font-mono text-base tracking-widest uppercase font-black mb-6 shadow-[0_0_15px_rgba(6,182,212,0.6)]">Enterprise Infrastructure</div>
              <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-widest mb-6">A.I.C.E. Systems Corporation</h2>
              <p className="text-2xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto mb-8">
                The God's Brain Theory provides the universal schematics. <strong className="text-orange-500 font-bold">A.I.C.E. (Adaptive Intelligence Control of Entropy)</strong> is the executable technology. We are not just analyzing the system; we are upgrading it. A.I.C.E. is a patented, mathematical "Safety Governor" for reality itself, designed to prevent thermal runaway in global AI and financial markets.
              </p>
            </div>
            <div className="flex justify-center mb-12">
              <div className="bg-black/60 border border-cyan-500/50 p-3 rounded-lg shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] hover:border-cyan-400 transition-all cursor-pointer group relative w-full max-w-xl" onClick={() => setExpandedImage("/assets/images/gods_brain_theory/AICELOGO.jpeg")}>
                <div className="absolute top-4 right-4 z-30 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-cyan-500/50"><Maximize2 className="w-5 h-5 text-cyan-400" /></div>
                <img src="/assets/images/gods_brain_theory/AICELOGO.jpeg" alt="AICE Omega Logo" className="w-full h-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity rounded" />
              </div>
            </div>
            <div className="text-center">
              <a href="/aice-protocol" className="inline-flex items-center gap-3 bg-transparent border-2 border-cyan-500 hover:bg-cyan-900/50 text-cyan-400 font-black py-4 px-10 rounded shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all uppercase tracking-widest text-xl">Explore the A.I.C.E. Network <ArrowRight className="w-6 h-6" /></a>
            </div>
          </div>
        </section>

        {/* 5. AUTHOR BIO */}
        <section id="author" className="py-24 bg-black border-b border-cyan-900/50 relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-10 md:gap-16 mb-12">
              <div className="flex-1 mt-4 md:mt-0">
                <div className="inline-block border border-cyan-600/50 bg-cyan-600/10 px-3 py-1 rounded text-cyan-400 font-mono text-base tracking-widest uppercase font-bold mb-4">About The Author</div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-4 leading-none drop-shadow-md">SHAUN 'D33V!@NC3' DEEVES</h2>
                <h3 className="text-xl md:text-2xl text-orange-500 font-mono mb-4 uppercase tracking-widest font-bold">Inventor, Author & Systems Engineer<br/><span className="text-cyan-400 text-sm md:text-base block mt-3 leading-relaxed">Founder & Chief Architect of the A.I.C.E. Protocol <br className="hidden md:block" /> Creator of the A.I.C.E. Universe</span></h3>
              </div>
              <div className="w-full max-w-[280px] md:max-w-xs mx-auto md:mx-0 shrink-0">
                <div className="aspect-[4/5] bg-gray-900 border-2 border-orange-600/50 rounded-sm overflow-hidden relative shadow-[0_0_40px_rgba(234,88,12,0.4)] cursor-pointer group" onClick={() => setExpandedImage("/assets/images/gods_brain_theory/thearchitect2.png")}>
                  <div className="absolute top-4 right-4 z-30 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-orange-500/50"><Maximize2 className="w-5 h-5 text-orange-400" /></div>
                  <div className="absolute inset-0 bg-orange-500/10 mix-blend-overlay z-10 pointer-events-none"></div>
                  <img src="/assets/images/gods_brain_theory/thearchitect2.png" alt="Shaun Deeves with Mufasa" className="w-full h-full object-cover contrast-125 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur-md p-3 border-t border-orange-500/50 z-20 pointer-events-none">
                    <p className="text-orange-500 font-mono text-[10px] sm:text-xs text-center tracking-widest uppercase">Shaun R. Deeves & Mufasa</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full space-y-6 text-gray-300 text-xl font-light leading-relaxed">
              <p>Shaun is a systems analyst of the human condition, and a synthesizer of ancient signals. He operates on the conviction that to truly map the System, one must first disconnect from the ‘Programmed Consensus’. Refusing to be tethered by static borders, institutional dogma, or the noise of the modern echo chamber, he has spent his life auditing the spiritual and cultural circuitry of the planet.</p>
              <p>A Canadian nomad, Deeves does not write from speculation; he writes from immersion. Researching in 32 countries, ranging from the sacred architecture of the Old World to the raw, untamed frontiers of the New. He is currently living the philosophy of this book on a motorcycle expedition through the high-altitude frequencies of the Colombian Andes, accompanied by his loyal co-pilot and grounding anchor, his dog Mufasa.</p>
              <p>The God's Brain Theory was not written in the safety of a lecture hall. It was forged in the silence of the open road, downloaded during thousands of miles of solitude, and cross-referenced against the universal patterns found in nature, finance, and physics. It was this unique triangulation—combining the chaotic data of global financial markets, the fluid dynamics of nature, and the self-regulating laws of the cosmos—that led Deeves to his most significant discovery: <strong>The A.I.C.E. Protocol (Adaptive Intelligence Control of Entropy)</strong>.</p>
              <p>By recognizing that the universe utilizes a specific immune response to quarantine chaos, he successfully codified this law into a patent-pending technology, offering humanity a governor for the age of Artificial Intelligence. Deeves views this work not merely as a theory, but as a transmission—a necessary intervention for a species suffering from amnesia. He offers these pages with the conviction that we are not here to escape the system, but to upgrade it.</p>
              <blockquote className="mt-12 border-l-4 border-orange-500 pl-6 py-2 bg-gray-900/50 italic text-cyan-100 text-2xl font-serif shadow-inner">“Perspicacious by nature, nomadic by design. Deviance - because Evolution never came from Obedience.” <span className="block mt-4 text-base font-sans font-bold text-orange-500 not-italic uppercase tracking-widest">~ Shaun Deeviance Deeves</span></blockquote>
              <div className="mt-12 p-6 md:p-8 border border-gray-800 bg-black/50 rounded-sm">
                <h4 className="text-cyan-400 font-bold uppercase tracking-widest text-base mb-3">Dedication</h4>
                <p className="text-gray-400 italic text-lg leading-relaxed">I dedicate this transmission to My sons, Ryland & Wayne & Mufasa. And to my fellow truth seekers.</p>
                <div className="mt-6 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <span className="text-base text-gray-500 font-mono uppercase tracking-widest">If you want to collaborate:</span>
                  <a href="mailto:admin@aice.network" className="text-orange-500 hover:text-cyan-400 font-mono font-bold tracking-widest transition-colors text-lg md:text-xl">admin@aice.network</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PURCHASE OPTIONS */}
        <section id="purchase-options" className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center space-y-12">
          <div className="w-full max-w-3xl bg-black/80 p-8 rounded-lg border border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <div className="flex flex-col items-center justify-center gap-2 mb-8 text-center">
              <p className="text-xl font-mono text-cyan-400 uppercase tracking-widest flex items-center justify-center gap-2 mb-2"><ShieldAlert className="w-6 h-6 shrink-0" /> SECURE COMPLETE ACCESS</p>
              <div className="flex items-center gap-3 font-mono font-black">
                <span className="text-gray-500 line-through decoration-red-500 opacity-70 text-lg md:text-2xl">$26.99</span>
                <span className="text-yellow-400 text-3xl md:text-5xl drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">$19.99 USD</span>
              </div>
              <p className="text-yellow-400 font-mono text-xs md:text-sm uppercase tracking-[0.2em] font-bold mt-2">(DISCOUNT APPLIED // FIRST 100 SPARKS)</p>
            </div>

            {/* URGENCY CLUSTER */}
            <div className="mb-10 text-center flex flex-col items-center gap-4">
               <span className="text-orange-500 font-black tracking-widest uppercase text-sm animate-pulse">*** LIMITED TIME OFFER ***</span>
               <ScarcityTimer />
               <span className="text-yellow-400 font-mono text-sm uppercase tracking-widest font-bold">Time is running out on the offer</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="https://buy.stripe.com/aFa14naMHgU6aQXfVFbV601?prefilled_promo_code=SPARK100" className="bg-orange-600 hover:bg-orange-500 text-white font-black py-5 px-10 rounded shadow-[0_0_30px_rgba(234,88,12,0.6)] hover:shadow-[0_0_50px_rgba(234,88,12,0.9)] transition-all uppercase tracking-widest text-xl transform hover:scale-105 flex items-center justify-center gap-3"><BookOpen className="w-7 h-7" /> SECURE YOUR COPY</a>
              <BTCPayButton amount="20.00" description="The God's Brain Theory - Early Node Discount" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-cyan-900/30">
              <a href="https://www.amazon.com/GODS-BRAIN-THEORY-ANATOMY-AWAKENING-ebook/dp/B0GGZLG9MJ" target="_blank" rel="noopener noreferrer" className="w-full text-center bg-black/80 border-2 border-cyan-900 hover:border-cyan-500 text-gray-400 hover:text-cyan-400 font-extrabold py-3 rounded transition-all uppercase text-sm">Kindle</a>
              <a href="https://play.google.com/store/books/details?id=RJazEQAAQBAJ" target="_blank" rel="noopener noreferrer" className="w-full text-center bg-black/80 border-2 border-blue-900 hover:border-blue-500 text-gray-400 hover:text-blue-400 font-extrabold py-3 rounded transition-all uppercase text-sm">Google Play</a>
              <a href="https://phoenixdvs.gumroad.com/l/wvzbu" target="_blank" rel="noopener noreferrer" className="w-full text-center bg-black/80 border-2 border-pink-900 hover:border-pink-500 text-gray-400 hover:text-pink-400 font-extrabold py-3 rounded transition-all uppercase text-sm">Gumroad</a>
            </div>
          </div>

          <button onClick={onEnterReader} className="relative inline-flex h-20 w-full max-w-md overflow-hidden rounded-full p-[2px] group focus:outline-none shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:shadow-[0_0_60px_rgba(6,182,212,0.9)] transition-all">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#06b6d4_50%,#000000_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-10 py-6 text-xl font-black text-cyan-400 backdrop-blur-3xl uppercase tracking-[0.2em] gap-3 border border-cyan-500/30 group-hover:bg-black/80 transition-all">
              <Zap className="w-7 h-7 animate-pulse" /> INITIATE FREE TRANSMISSION
            </span>
          </button>
        </section>

        {/* FOOTER */}
        <footer className="w-full mt-auto py-12 bg-black text-center border-t border-cyan-900/50 relative z-50">
          <p className="text-gray-600 text-sm uppercase tracking-widest font-mono mb-4">
            © {new Date().getFullYear()} Shaun R. Deeves. All Rights Reserved.
          </p>
          <button 
            onClick={() => setIsLegalModalOpen(true)}
            className="text-cyan-500 hover:text-white text-[10px] font-mono uppercase tracking-[0.3em] border-b border-transparent hover:border-white transition-all cursor-pointer"
          >
            View Official Copyright & Legal Registry
          </button>
        </footer>
      </div>

      {/* COPYRIGHT LEGAL MODAL */}
      {isLegalModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-[#050505] border border-cyan-500/50 p-8 rounded-xl shadow-[0_0_50px_rgba(0,243,255,0.2)] max-w-2xl w-full relative text-center">
             <button onClick={() => setIsLegalModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-cyan-400 transition-colors"><X size={24} /></button>
             <ShieldCheck size={48} className="text-cyan-500 mx-auto mb-6" />
             <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-4">Intellectual Property Registry</h3>
             <p className="text-gray-300 font-light leading-relaxed mb-6 text-lg">
                The God's Brain Theory and the A.I.C.E. (Adaptive Intelligence Control of Entropy) Protocol are the exclusive intellectual property of Shaun R. Deeves.
             </p>
             <p className="text-gray-300 font-light leading-relaxed mb-8 text-lg">
                This manuscript, its associated mathematics, the 200+ schematics, and algorithms have been formally logged, timestamped, and secured for copyright protection on <strong className="text-cyan-400 font-bold">zenodo.org</strong>. All Rights Reserved.
             </p>
             <div className="bg-red-500/10 border border-red-500/30 p-4 rounded inline-block">
               <p className="text-xs text-red-500 font-mono tracking-widest uppercase font-bold">
                  Unauthorized reproduction, distribution, or algorithmic derivation will be prosecuted to the maximum extent of international law.
               </p>
             </div>
          </div>
        </div>
      )}

      {/* >>> GLOBAL LIGHTBOX MODAL DEPLOYMENT <<< */}
      {expandedImage && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out opacity-100 transition-opacity duration-300"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 z-[110] bg-black/50 border border-cyan-500 hover:bg-cyan-900/50 text-cyan-400 rounded-full p-2 transition-colors"
              onClick={(e) => { e.stopPropagation(); setExpandedImage(null); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <img 
              src={expandedImage} 
              alt="Expanded high-fidelity view" 
              className="max-w-full max-h-full object-contain rounded-md shadow-[0_0_60px_rgba(234,88,12,0.4)] border border-gray-800"
            />
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 font-mono text-sm uppercase tracking-widest pointer-events-none bg-black/80 px-4 py-2 rounded-full">
              Click anywhere to close
            </p>
          </div>
        </div>
      )}
      {/* >>> END GLOBAL LIGHTBOX MODAL DEPLOYMENT <<< */}

    </div>
  );
}
