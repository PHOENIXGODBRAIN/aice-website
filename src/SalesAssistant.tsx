import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Terminal, Lock } from 'lucide-react';
import { getAICEResponse } from './aiService';

interface Message {
  id: string;
  sender: 'BOT' | 'USER';
  text: string;
}

interface LeadForm {
  name: string;
  company: string;
  email: string;
  phone: string;
}

// Sub-component for the mechanical printing effect
const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayed, setDisplayed] = useState("");
  
  useEffect(() => {
    let i = 0;
    setDisplayed(""); // Reset when text changes
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 15); // Adjust speed here. Lower = faster.
    return () => clearInterval(interval);
  }, [text]);

  return <>{displayed}</>;
};

export const SalesAssistant: React.FC<{ selectedSector: string }> = ({ selectedSector }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'BOT', 
      text: "A.I.C.E. Sales Uplink Active. I am here to facilitate your acquisition of Sovereign Advantage. Please ask any questions you have regarding your specific sector classification, and I will guide you smoothly through our deployment protocol." 
    }
  ]);

  const [input, setInput] = useState("");
  const [isFormActive, setIsFormActive] = useState(false);
  const [formStep, setFormStep] = useState<keyof LeadForm | 'DONE'>('name');
  const [leadData, setLeadData] = useState<LeadForm>({ name: '', company: '', email: '', phone: '' });
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isFormActive, isThinking]);

  useEffect(() => {
    if (selectedSector && selectedSector !== "") {
      addBotMessage(`I detect you are initiating clearance for the ${selectedSector.toUpperCase()} sector. I can pull the exact ROI projections and security parameters for this classification. How may I assist you in finalizing this?`);
    }
  }, [selectedSector]);

  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), sender: 'BOT', text }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userText = input;
    setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), sender: 'USER', text: userText }]);
    setInput("");
    
    // Reset textarea height
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
    }

    setIsThinking(true);

    if (userText.toLowerCase().includes("contact") || userText.toLowerCase().includes("human") || userText.toLowerCase().includes("representative")) {
      setIsThinking(false);
      addBotMessage("I can open a secure channel to an A.I.C.E. Architect immediately. First, I require identity verification.");
      setIsFormActive(true);
      return;
    }

    try {
        const contextStr = selectedSector ? `User is viewing the gateway for: ${selectedSector}. Ensure they feel confident and guided.` : "Direct Acquisition/Sales Channel";
        const aiResponse = await getAICEResponse(userText, contextStr);
        addBotMessage(aiResponse);
    } catch (e) {
        addBotMessage("A.I.C.E. ERROR: Signal lost. Please re-enter command.");
    } finally {
        setIsThinking(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep === 'name' && leadData.name) setFormStep('company');
    else if (formStep === 'company' && leadData.company) setFormStep('email');
    else if (formStep === 'email' && leadData.email.includes('@')) setFormStep('phone');
    else if (formStep === 'phone') {
        setFormStep('DONE');
        setIsFormActive(false);
        addBotMessage(`Identity Verified. A.I.C.E. has flagged ${leadData.company} for priority onboarding.\n\nI have transmitted your dossier to the Deployment Team. A Senior Architect will contact ${leadData.email} within 4 hours to finalize your protocol.`);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-[#050505] border-x border-t border-orange-500/30 rounded-t-3xl overflow-hidden flex flex-col h-[600px] shadow-[0_-20px_50px_rgba(234,88,12,0.1)] relative">
      
      {/* MAGMA ORANGE HEADER */}
      <div className="bg-orange-500/10 p-5 border-b border-orange-500/30 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-4">
            <Bot size={28} className="text-orange-500 animate-pulse" />
            <div>
                <div className="text-orange-500 font-black text-lg uppercase tracking-widest">A.I.C.E. Sales Assistant</div>
                <div className="text-xs text-orange-700 font-mono tracking-widest">NEURAL LINK: OPTIMAL</div>
            </div>
        </div>
        <Terminal size={24} className="text-orange-900" />
      </div>

      {/* CHAT AREA */}
      <div ref={scrollRef} className="flex-1 p-6 md:p-10 overflow-y-auto space-y-8 scrollbar-thin scrollbar-thumb-orange-500/20 scrollbar-track-black">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-4 ${m.sender === 'USER' ? 'flex-row-reverse' : ''}`}>
             <div className={`w-10 h-10 rounded-lg mt-1 flex items-center justify-center shrink-0 border ${m.sender === 'BOT' ? 'bg-orange-500/10 border-orange-500 text-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.2)]' : 'bg-gray-800 border-gray-600 text-gray-300'}`}>
                {m.sender === 'BOT' ? <Bot size={20} /> : <User size={20} />}
             </div>
             <div className={`p-5 rounded-2xl text-base md:text-lg font-mono leading-relaxed max-w-[85%] shadow-lg whitespace-pre-wrap ${m.sender === 'BOT' ? 'bg-orange-950/20 border border-orange-500/20 text-orange-100' : 'bg-gray-900 border border-gray-700 text-white'}`}>
                {m.sender === 'BOT' ? <TypewriterText text={m.text} /> : m.text}
             </div>
          </div>
        ))}
        
        {isThinking && (
            <div className="flex items-center gap-3 pl-16">
                <div className="flex gap-2 p-4 bg-orange-950/20 border border-orange-500/20 rounded-2xl">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        )}

        {/* LEAD GEN FORM */}
        {isFormActive && formStep !== 'DONE' && (
            <div className="mx-16 p-8 bg-orange-500/5 border border-orange-500 rounded-2xl animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center gap-2 mb-6 text-orange-500 font-bold uppercase tracking-widest text-sm">
                    <Lock size={16} /> Identity Verification // Step {formStep === 'name' ? '1' : formStep === 'company' ? '2' : formStep === 'email' ? '3' : '4'} of 4
                </div>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    {formStep === 'name' && (
                        <input autoFocus type="text" placeholder="ENTER FULL NAME *" className="w-full bg-black border border-orange-500/30 p-4 text-orange-100 focus:border-orange-500 outline-none rounded-xl font-mono text-lg"
                        value={leadData.name} onChange={e => setLeadData({...leadData, name: e.target.value})} />
                    )}
                    {formStep === 'company' && (
                        <input autoFocus type="text" placeholder="ENTER ORGANIZATION / COMPANY *" className="w-full bg-black border border-orange-500/30 p-4 text-orange-100 focus:border-orange-500 outline-none rounded-xl font-mono text-lg"
                        value={leadData.company} onChange={e => setLeadData({...leadData, company: e.target.value})} />
                    )}
                    {formStep === 'email' && (
                        <input autoFocus type="email" placeholder="ENTER WORK EMAIL *" className="w-full bg-black border border-orange-500/30 p-4 text-orange-100 focus:border-orange-500 outline-none rounded-xl font-mono text-lg"
                        value={leadData.email} onChange={e => setLeadData({...leadData, email: e.target.value})} />
                    )}
                    {formStep === 'phone' && (
                        <div className="space-y-2">
                            <input autoFocus type="tel" placeholder="PHONE NUMBER (OPTIONAL)" className="w-full bg-black border border-orange-500/30 p-4 text-orange-100 focus:border-orange-500 outline-none rounded-xl font-mono text-lg"
                            value={leadData.phone} onChange={e => setLeadData({...leadData, phone: e.target.value})} />
                        </div>
                    )}
                    <button type="submit" className="w-full py-4 bg-orange-500 text-black font-black uppercase tracking-widest hover:bg-orange-400 transition-colors rounded-xl text-lg mt-4">
                        {formStep === 'phone' ? 'COMPLETE VERIFICATION' : 'NEXT >>'}
                    </button>
                </form>
            </div>
        )}
      </div>

      {/* DYNAMIC INPUT AREA */}
      <div className="p-6 bg-[#0a0a0a] border-t border-orange-500/30 flex gap-4 items-end">
        <textarea
            ref={textareaRef}
            value={input}
            disabled={isFormActive || isThinking}
            onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            }}
            placeholder={isFormActive ? "COMPLETE FORM ABOVE..." : "Ask A.I.C.E. for guidance..."}
            rows={1}
            className="flex-1 bg-black border border-orange-900/50 rounded-xl px-4 py-4 text-orange-100 text-lg font-mono outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:opacity-50 resize-none overflow-hidden transition-all duration-200 shadow-inner"
            style={{ minHeight: '60px' }}
        />
        <button 
            onClick={() => handleSend()} 
            disabled={isFormActive || !input.trim() || isThinking} 
            className="p-4 bg-orange-500/10 text-orange-500 border border-orange-500/50 rounded-xl hover:bg-orange-500 hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed mb-1"
        >
            <Send size={24} />
        </button>
      </div>
    </div>
  );
};