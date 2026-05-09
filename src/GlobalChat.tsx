import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Cpu, Mail, Lock, ShieldCheck } from 'lucide-react';
import { getAICEResponse } from './aiService';

interface Message {
  id: string;
  sender: 'BOT' | 'USER';
  text: string;
}

export const GlobalChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '0', 
      sender: 'BOT', 
      text: "AICE Box Neural Link Online. Secure Uplink Established. Identity verified. How may I assist?" 
    }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen, isThinking]);

  const toggleChat = () => setIsOpen(!isOpen);

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
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    // 1. User Message
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'USER', text: textToSend }]);
    setInput("");

    // 2. CHECK FOR DIRECTORY COMMANDS (Manual Override)
    const lowerText = textToSend.toLowerCase();
    if (lowerText.includes("directory") || lowerText.includes("contact") || lowerText.includes("email") || lowerText.includes("support")) {
        setMessages(prev => [...prev, { 
            id: Date.now().toString(), 
            sender: 'BOT', 
            text: DIRECTORY_MESSAGE.trim() 
        }]);
        return;
    }

    // 3. AI RESPONSE
    setIsThinking(true);
    try {
        const aiText = await getAICEResponse(textToSend);
        setMessages(prev => [...prev, { 
            id: Date.now().toString(), 
            sender: 'BOT', 
            text: aiText 
        }]);
    } catch (e) {
        setMessages(prev => [...prev, { 
            id: Date.now().toString(), 
            sender: 'BOT', 
            text: "ERROR: A.I.C.E. SIGNAL LOST. RETRY COMMAND." 
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
        <div className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-black/95 backdrop-blur-xl border border-[#00F3FF]/30 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          
          {/* SECURE HEADER */}
          <div className="bg-[#050505] p-4 border-b border-[#00F3FF]/20 flex justify-between items-center">
            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-white">
                    <ShieldCheck size={16} className="text-[#00F3FF]" />
                    <span className="font-bold tracking-widest text-sm uppercase">AICE Box // Neural Link</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <Lock size={10} className="text-green-500" />
                    <span className="text-[9px] font-mono text-green-500 uppercase tracking-widest">ENCRYPTED UPLINK // TLS 1.3</span>
                </div>
            </div>
            <button onClick={toggleChat} className="hover:bg-white/10 p-1 rounded transition-colors"><X size={18} className="text-white"/></button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-[#00F3FF]/20 scrollbar-track-black">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.sender === 'USER' ? 'flex-row-reverse' : ''}`}>
                 {m.sender === 'BOT' && (
                   <div className="w-6 h-6 rounded-full bg-[#00F3FF]/20 flex items-center justify-center text-[#00F3FF] shrink-0 mt-2"><Cpu size={14}/></div>
                 )}
                 <div className={`p-3 rounded-xl text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${m.sender === 'BOT' ? 'bg-white/5 border border-white/10 text-gray-200' : 'bg-[#00F3FF] text-black font-bold'}`}>
                   {m.text}
                 </div>
              </div>
            ))}
            
            {isThinking && (
                 <div className="flex gap-3">
                   <div className="w-6 h-6 rounded-full bg-[#00F3FF]/20 flex items-center justify-center text-[#00F3FF] shrink-0"><Cpu size={14}/></div>
                   <div className="p-3 rounded-xl bg-white/10 text-gray-200 text-xs flex items-center gap-1">
                      <span className="w-1 h-1 bg-[#00F3FF] rounded-full animate-bounce"></span>
                      <span className="w-1 h-1 bg-[#00F3FF] rounded-full animate-bounce delay-100"></span>
                      <span className="w-1 h-1 bg-[#00F3FF] rounded-full animate-bounce delay-200"></span>
                   </div>
                 </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
            {PROMPTS.map((p, i) => (
              <button key={i} onClick={() => handleSend(p)} className="whitespace-nowrap px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] text-gray-300 hover:bg-[#00F3FF]/20 hover:text-[#00F3FF] hover:border-[#00F3FF] transition-all font-mono">
                {p}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-black border-t border-white/10 flex gap-2 items-end">
            <textarea 
              className="flex-1 bg-transparent text-white text-sm outline-none px-2 font-mono resize-none h-auto max-h-32 py-3 scrollbar-none"
              placeholder="Enter command..."
              rows={1}
              value={input}
              onChange={(e) => {
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
              className="text-[#00F3FF] hover:scale-110 transition-transform disabled:opacity-50 mb-2 p-2"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {/* FLOATING TOGGLE BUTTON */}
      <button 
        onClick={toggleChat} 
        className="group flex items-center gap-3 px-5 py-4 bg-black border border-[#00F3FF] text-[#00F3FF] rounded-full shadow-[0_0_30px_rgba(0,243,255,0.3)] hover:bg-[#00F3FF] hover:text-black transition-all duration-300"
      >
        <span className={`${isOpen ? 'hidden' : 'block'} font-bold uppercase tracking-widest text-xs pr-2 border-r border-[#00F3FF]/30 group-hover:border-black/30`}>
          AICE Box Neural Link
        </span>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};