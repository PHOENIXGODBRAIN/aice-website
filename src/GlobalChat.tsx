import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Cpu, Lock, ShieldCheck, Maximize2, Minimize2 } from 'lucide-react';
import { getAICEResponse } from './aiService';

interface Message {
  id: string;
  sender: 'BOT' | 'USER';
  text: string;
  isTyping?: boolean;
}

// --- MECHANICAL TYPEWRITER COMPONENT ---
const TypewriterEffect: React.FC<{ text: string, onComplete: () => void, forceScroll: () => void }> = ({ text, onComplete, forceScroll }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i += 2; 
      
      // Aggressively force the scroll bar down on every single character paint
      forceScroll();

      if (i > text.length) {
        setDisplayed(text);
        clearInterval(interval);
        onComplete();
      }
    }, 15);
    return () => clearInterval(interval);
  }, [text, onComplete, forceScroll]);

  return (
    <span>
      {displayed}
      <span className="inline-block w-2 h-4 ml-1 bg-[#00F3FF] animate-pulse align-middle shadow-[0_0_8px_#00F3FF]"></span>
    </span>
  );
};

export const GlobalChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPillExpanded, setIsPillExpanded] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false); // NEW: Controls the 60vw width toggle
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const interactedRef = useRef(false);

  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '0', 
      sender: 'BOT', 
      text: "AICE Box Neural Link Online. Secure Uplink Established. Identity verified. How may I assist you with navigating the architecture?",
      isTyping: true
    }
  ]);
  const [input, setInput] = useState("");

  // --- THE PILLBOX TEASE (ONE-TIME AUTO EXPAND) ---
  useEffect(() => {
    // Smoothly slide out the "NEURAL LINK" text after 3 seconds
    const openTimer = setTimeout(() => {
      if (!interactedRef.current && !isOpen) setIsPillExpanded(true);
    }, 3000);

    // Smoothly collapse it back to just "AICE BOX" 12 seconds later
    const closeTimer = setTimeout(() => {
      if (!interactedRef.current && !isOpen) setIsPillExpanded(false);
    }, 15000);

    return () => { clearTimeout(openTimer); clearTimeout(closeTimer); };
  }, [isOpen]);

  // Aggressive Scroll Helper
  const scrollToBottom = () => {
      if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
  };

  const markInteraction = () => {
      interactedRef.current = true;
  };

  const toggleChat = () => {
      markInteraction();
      if (isOpen) {
          // Explicitly force the pillbox to retract the moment the chat is closed
          setIsPillExpanded(false);
          setIsOpen(false);
          // Optional: Reset expansion state when closed so it opens normal size next time
          setTimeout(() => setIsChatExpanded(false), 300);
      } else {
          setIsOpen(true);
          setTimeout(scrollToBottom, 50);
      }
  };

  // --- HARDCODED DIRECTORY (SECURE FORMAT) ---
  const DIRECTORY_MESSAGE = `
█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
   SECURE CHANNEL DIRECTORY
   STATUS: VERIFIED
█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█

> **DEPLOYMENT & PILOTS:**
> pilot@aice.network

> **TECHNICAL SUPPORT:**
> support@aice.network

> **BILLING & FINANCE:**
> finance@aice.network

> **EXECUTIVE OFFICE (DVS):**
> dvs@aice.network

> **LEGAL & PRIVACY:**
> privacy@aice.network

[ END OF TRANSMISSION ]
  `;

  const handleSend = async (textOverride?: string) => { 
    markInteraction();
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'USER', text: textToSend }]);
    setInput("");
    setTimeout(scrollToBottom, 10);

    const lowerText = textToSend.toLowerCase();
    if (lowerText.includes("directory") || lowerText.includes("contact") || lowerText.includes("email") || lowerText.includes("support")) {
        setMessages(prev => [...prev, { 
            id: Date.now().toString(), 
            sender: 'BOT', 
            text: DIRECTORY_MESSAGE.trim(),
            isTyping: true
        }]);
        return;
    }

    setIsThinking(true);
    setTimeout(scrollToBottom, 10);

    try {
        // Stripped the array payload. Feeding the exact string expected by aiService.ts to pass the build.
        const aiText = await getAICEResponse(textToSend);
        
        setMessages(prev => [...prev, { 
            id: Date.now().toString(), 
            sender: 'BOT', 
            text: aiText,
            isTyping: true
        }]);
    } catch (e) {
        setMessages(prev => [...prev, { 
            id: Date.now().toString(), 
            sender: 'BOT', 
            text: "ERROR: SIGNAL INTERFERENCE DETECTED. SECURITY PROTOCOLS ENGAGED. PLEASE RETRY.",
            isTyping: true
        }]);
    } finally {
        setIsThinking(false);
    }
  };

  const PROMPTS = [
    "Contact Directory",
    "Security Protocols",
    "Pricing Tiers"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      
      {isOpen && (
        <div className={`mb-4 h-[400px] max-h-[calc(100vh-120px)] bg-black/95 backdrop-blur-xl border border-[#00F3FF]/30 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300 transition-all ease-in-out ${isChatExpanded ? 'w-[90vw] md:w-[60vw]' : 'w-[340px] md:w-[380px]'}`}>
          
          {/* SECURE HEADER */}
          <div className="bg-[#050505] px-4 py-3 border-b border-[#00F3FF]/20 flex justify-between items-center shrink-0 transition-all">
            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-white">
                    <Bot size={18} className="text-[#00F3FF]" />
                    <span className="font-bold tracking-widest text-sm uppercase">AICE Box // Neural Link</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <Lock size={10} className="text-green-500" />
                    <span className="text-[9px] font-mono text-green-500 uppercase tracking-widest">TLS 1.3</span>
                    <span className="text-[9px] font-mono text-[#00F3FF] uppercase tracking-widest ml-1 pl-2 border-l border-[#00F3FF]/30 font-bold">AICE CUSTOM AI SUPPORT</span>
                </div>
            </div>
            
            {/* WINDOW CONTROLS (EXPAND & CLOSE) */}
            <div className="flex items-center gap-1.5">
                <button 
                    onClick={() => setIsChatExpanded(!isChatExpanded)} 
                    className="hover:bg-white/10 p-1.5 rounded transition-colors text-gray-400 hover:text-white"
                    title={isChatExpanded ? "Collapse Window" : "Expand Window"}
                >
                    {isChatExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button 
                    onClick={toggleChat} 
                    className="hover:bg-red-500/20 p-1.5 rounded transition-colors text-gray-400 hover:text-red-500"
                    title="Terminate Uplink"
                >
                    <X size={20} />
                </button>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-[#00F3FF]/20 scrollbar-track-black">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 ${m.sender === 'USER' ? 'flex-row-reverse' : ''}`}>
                 {m.sender === 'BOT' && (
                   <div className="w-8 h-8 rounded-full bg-[#00F3FF]/20 flex items-center justify-center text-[#00F3FF] shrink-0 mt-1"><Cpu size={16}/></div>
                 )}
                 <div className={`p-3 md:p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap font-sans ${m.sender === 'BOT' ? 'bg-white/5 border border-white/10 text-gray-200' : 'bg-[#00F3FF] text-black font-bold'}`}>
                   {m.sender === 'BOT' && m.isTyping ? (
                       <TypewriterEffect 
                           text={m.text} 
                           forceScroll={scrollToBottom}
                           onComplete={() => {
                               setMessages(prev => prev.map(msg => msg.id === m.id ? { ...msg, isTyping: false } : msg));
                           }} 
                       />
                   ) : (
                       m.text
                   )}
                 </div>
              </div>
            ))}
            
            {isThinking && (
                 <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-[#00F3FF]/20 flex items-center justify-center text-[#00F3FF] shrink-0"><Cpu size={16}/></div>
                   <div className="p-3 rounded-2xl bg-white/10 text-gray-200 text-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#00F3FF] rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-[#00F3FF] rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-[#00F3FF] rounded-full animate-bounce delay-200"></span>
                   </div>
                 </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-none border-t border-white/5 pt-3 shrink-0">
            {PROMPTS.map((p, i) => (
              <button key={i} onClick={() => handleSend(p)} className="whitespace-nowrap px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] md:text-xs text-gray-300 hover:bg-[#00F3FF]/20 hover:text-[#00F3FF] hover:border-[#00F3FF] transition-all font-mono font-bold">
                {p}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-black border-t border-[#00F3FF]/20 flex gap-2 items-end shrink-0">
            <textarea 
              className="flex-1 bg-transparent text-white text-sm outline-none px-2 font-mono resize-none h-auto max-h-24 py-2 scrollbar-none placeholder:text-white/30"
              placeholder="ASK AICE FOR ASSISTANCE..."
              rows={1}
              value={input}
              onChange={(e) => {
                markInteraction();
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isThinking}
            />
            <button 
              onClick={() => handleSend()} 
              disabled={isThinking || !input.trim()} 
              className="text-[#00F3FF] hover:scale-110 transition-transform disabled:opacity-50 p-2 bg-[#00F3FF]/10 rounded-xl border border-[#00F3FF]/30"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* FLOATING TOGGLE PILLBOX */}
      <button 
        /* The !isOpen check ensures hover state dictates the expansion as long as the chat window is closed */
        onMouseEnter={() => { if (!isOpen) setIsPillExpanded(true); }}
        onMouseLeave={() => { if (!isOpen) setIsPillExpanded(false); }}
        onClick={toggleChat} 
        className="group flex items-center gap-3 p-3 md:p-4 bg-black border border-[#00F3FF] text-[#00F3FF] rounded-full shadow-[0_0_15px_rgba(0,243,255,0.15)] hover:bg-[#00F3FF] hover:text-black transition-all duration-500 ease-in-out"
      >
        <div className={`transition-all duration-500 ease-in-out flex items-center ${isOpen ? 'hidden' : 'flex'}`}>
            <div className="flex items-center pr-2 border-r border-[#00F3FF]/30 group-hover:border-black/30">
                
                {/* ALWAYS VISIBLE BASE TEXT */}
                <span className="font-bold uppercase tracking-widest text-xs md:text-sm whitespace-nowrap">
                    AICE BOX
                </span>
                
                {/* FLUID SLIDING SECONDARY TEXT */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center ${isPillExpanded ? 'max-w-[150px] opacity-100 ml-1.5' : 'max-w-0 opacity-0 ml-0'}`}>
                    <span className="font-bold uppercase tracking-widest text-xs md:text-sm whitespace-nowrap">
                        NEURAL LINK
                    </span>
                </div>

            </div>
        </div>
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>
    </div>
  );
};