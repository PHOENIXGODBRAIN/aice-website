import React, { useState, useMemo, useRef, useEffect } from "react";
import { FileText, ChevronDown, Search, Briefcase, User, Mail, Building, CheckCircle2, ShieldAlert } from "lucide-react";

// Exact mirrored intelligence matrix for uniform pricing
const TIER_GATEWAYS = {
  class3: { price: 15000 },
  class2: { price: 50000 },
  class1: { price: 150000 },
  classs: { price: 250000 }
};

// Unified Sector Array
const SECTORS = [
  { name: "Utility-Scale Energy & Grid Management", tier: "classs" },
  { name: "Global Telecommunications Infrastructure", tier: "classs" },
  { name: "Sovereign Wealth & Central Banking", tier: "classs" },
  { name: "Aerospace & Defense Networks", tier: "classs" },
  { name: "Government & Federal Contractors", tier: "classs" },
  { name: "Algorithmic Quantitative Systems", tier: "class1" },
  { name: "Multinational Pharmaceutical Manufacturing", tier: "class1" },
  { name: "Global Media & Broadcast Conglomerates", tier: "class1" },
  { name: "Tier-1 Artificial Intelligence Labs", tier: "class1" },
  { name: "International Maritime & Freight Logistics", tier: "class1" },
  { name: "Tier-1 Cloud Infrastructure Providers", tier: "class1" },
  { name: "Multinational Retail & FMCG", tier: "class1" },
  { name: "Automotive & Heavy Manufacturing", tier: "class1" },
  { name: "Global Commercial Real Estate", tier: "class1" },
  { name: "Semiconductor & Advanced Silicon", tier: "class1" },
  { name: "International Insurance Conglomerates", tier: "class1" },
  { name: "Global Investment Banking", tier: "class1" },
  { name: "Mid-Market SaaS Platforms", tier: "class2" },
  { name: "Regional Healthcare & Hospital Systems", tier: "class2" },
  { name: "FinTech & Payment Processors", tier: "class2" },
  { name: "Industrial Automation & Robotics", tier: "class2" },
  { name: "Supply Chain & Inventory Management", tier: "class2" },
  { name: "Advanced Agriculture & AgTech", tier: "class2" },
  { name: "Enterprise Cybersecurity & Threat Intel", tier: "class2" },
  { name: "Large-Scale Regional E-Commerce", tier: "class2" },
  { name: "Enterprise EdTech Platforms", tier: "class2" },
  { name: "Hospitality & Resort Chains", tier: "class2" },
  { name: "Biotech & Clinical Research", tier: "class2" },
  { name: "Architecture & Heavy Construction", tier: "class2" },
  { name: "Data Center & Colocation Services", tier: "class2" },
  { name: "Aviation & Fleet Management", tier: "class2" },
  { name: "Clean Energy & Renewables", tier: "class2" },
  { name: "Advanced Materials Engineering", tier: "class2" },
  { name: "Private Equity & Venture Capital", tier: "class2" },
  { name: "Mid-Market Corporate Legal Services", tier: "class2" },
  { name: "Regional Utility & Water Management", tier: "class2" },
  { name: "Mid-Market Manufacturing & Assembly", tier: "class2" },
  { name: "Web3 & Decentralized Protocols", tier: "class3" },
  { name: "Independent Game Studios", tier: "class3" },
  { name: "Boutique Marketing & Creative Agencies", tier: "class3" },
  { name: "Consumer Mobile Applications", tier: "class3" },
  { name: "Specialized Legal & Compliance Boutiques", tier: "class3" },
  { name: "Local Private Clinics & Healthcare", tier: "class3" },
  { name: "Niche D2C E-Commerce Brands", tier: "class3" },
  { name: "Boutique Private Wealth Management", tier: "class3" },
  { name: "Digital Media & Independent Publishing", tier: "class3" },
  { name: "Independent Architecture & Design Boutiques", tier: "class3" },
  { name: "Specialized Regional Logistics", tier: "class3" },
  { name: "Hardware Prototyping & Maker Labs", tier: "class3" },
  { name: "Human Optimization & Bio-Hacking Technologies", tier: "class3" },
  { name: "Independent Research & Data Analytics", tier: "class3" },
  { name: "Micro-SaaS & Bootstrapped Tools", tier: "class3" },
  { name: "Boutique Hospitality & Travel Boutiques", tier: "class3" },
  { name: "Independent Financial Advisory", tier: "class3" },
  { name: "Alternative Energy & Syntropic Systems", tier: "class3" },
  { name: "Other / Unlisted Sector...", tier: "class2" } 
];

const TITLES = [
  { name: "Chief Executive Officer (CEO)" },
  { name: "Chief Technology Officer (CTO)" },
  { name: "Chief Operating Officer (COO)" },
  { name: "Chief Information Officer (CIO)" },
  { name: "Chief Financial Officer (CFO)" },
  { name: "Chief Information Security Officer (CISO)" },
  { name: "Chief Data Officer (CDO)" },
  { name: "Chief Architect" },
  { name: "Founder / Co-Founder" },
  { name: "Managing Partner" },
  { name: "President" },
  { name: "Vice President of Engineering" },
  { name: "Vice President of IT" },
  { name: "Director of Infrastructure" },
  { name: "Director of Operations" },
  { name: "Head of Engineering" },
  { name: "Head of Systems Architecture" },
  { name: "Lead Systems Engineer" },
  { name: "Principal Software Engineer" },
  { name: "Network Operations Commander" },
  { name: "Senior DevOps Engineer" },
  { name: "Quantitative Research Lead" },
  { name: "Head of Algorithmic Trading" },
  { name: "Procurement Officer" },
  { name: "Other / Unlisted Title..." }
];

export function WiseDispatchButton() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);

  // Sector State
  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const [sectorSearch, setSectorSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState<typeof SECTORS[0] | null>(null);
  const [customSector, setCustomSector] = useState("");
  
  // Title State
  const [isTitleOpen, setIsTitleOpen] = useState(false);
  const [titleSearch, setTitleSearch] = useState("");
  const [selectedTitle, setSelectedTitle] = useState<typeof TITLES[0] | null>(null);
  const [customTitle, setCustomTitle] = useState("");

  // Executive Credentials State
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  
  const sectorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sectorRef.current && !sectorRef.current.contains(event.target as Node)) setIsSectorOpen(false);
      if (titleRef.current && !titleRef.current.contains(event.target as Node)) setIsTitleOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSectors = useMemo(() => {
    return SECTORS.filter(s => s.name.toLowerCase().includes(sectorSearch.toLowerCase()));
  }, [sectorSearch]);

  const filteredTitles = useMemo(() => {
    return TITLES.filter(t => t.name.toLowerCase().includes(titleSearch.toLowerCase()));
  }, [titleSearch]);

  const handleDispatch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedSector || !selectedTitle) return;

    setIsProcessing(true);

    const finalSector = selectedSector.name === "Other / Unlisted Sector..." ? customSector : selectedSector.name;
    const finalTitle = selectedTitle.name === "Other / Unlisted Title..." ? customTitle : selectedTitle.name;
    const calculatedFee = TIER_GATEWAYS[selectedSector.tier as keyof typeof TIER_GATEWAYS].price.toLocaleString();

    const payload = {
      access_key: "3920a8a0-06ad-47f2-a6f7-f9bae987b7c0",
      subject: `WISE ROUTING REQUEST: ${company} [${selectedSector.tier.toUpperCase()}]`,
      from_name: "A.I.C.E. Institutional Matrix",
      Operator_Name: name,
      Email: email,
      Organization: company,
      Role: finalTitle,
      System_Class: selectedSector.tier,
      Sector: finalSector,
      Expected_Capital: `$${calculatedFee} USD`,
      Message_Log: "User requested official invoice and Wise routing instructions. Initiate verification protocol.",
    };

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      setIsDispatched(true);
    } catch (error) {
      console.error("Uplink Failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const isOtherSector = selectedSector?.name === "Other / Unlisted Sector...";
  const isOtherTitle = selectedTitle?.name === "Other / Unlisted Title...";
  
  const readyToExecute = 
    selectedSector && (!isOtherSector || customSector.trim() !== "") &&
    selectedTitle && (!isOtherTitle || customTitle.trim() !== "") &&
    name.trim() !== "" &&
    company.trim() !== "" &&
    email.trim() !== "";

  if (isDispatched) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#00F3FF]/10 border border-[#00F3FF]/50 rounded-2xl p-8 text-center shadow-[0_0_30px_rgba(0,243,255,0.2)]">
        <CheckCircle2 size={48} className="text-[#00F3FF] mx-auto mb-4" />
        <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-2">Request Secured</h3>
        <p className="text-gray-300 font-light leading-relaxed mb-6">
          A.I.C.E. Command has received your operational parameters. An official invoice and secure Wise routing instructions will be dispatched to <strong className="text-white">{email}</strong> pending entity verification.
        </p>
        <div className="inline-flex items-center gap-2 text-[#00F3FF] font-mono text-xs uppercase tracking-widest">
          <ShieldAlert size={14} /> Zero Public Exposure Maintained
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full mt-6 border-t border-white/10 pt-6">
      
      {/* 1. SECTOR PROFILING MATRIX */}
      <div className="relative" ref={sectorRef}>
        <div className="text-gray-400 font-mono text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
          <Briefcase size={12} /> Step 1: Identify Operational Sector
        </div>
        
        <div 
          onClick={() => setIsSectorOpen(!isSectorOpen)}
          className="w-full bg-black/60 border border-white/20 text-white font-bold uppercase tracking-widest text-xs p-4 rounded-xl cursor-text flex items-center justify-between hover:border-white/50 transition-colors"
        >
          {isSectorOpen ? (
            <div className="flex items-center w-full gap-3">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                autoFocus
                className="bg-transparent border-none outline-none w-full text-white placeholder-gray-500"
                placeholder="SEARCH 50+ SECTORS..."
                value={sectorSearch}
                onChange={(e) => setSectorSearch(e.target.value)}
              />
            </div>
          ) : (
            <span className={selectedSector ? "text-white" : "text-gray-500"}>
              {selectedSector ? selectedSector.name : "SEARCH OR SELECT SECTOR..."}
            </span>
          )}
          {!isSectorOpen && <ChevronDown size={16} className="text-gray-500" />}
        </div>

        {isSectorOpen && (
          <div className="absolute z-50 w-full mt-2 bg-[#050505] border border-white/20 rounded-xl max-h-56 overflow-y-auto shadow-[0_10px_40px_rgba(0,0,0,0.8)] custom-scrollbar">
            {filteredSectors.length > 0 ? (
              filteredSectors.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => { setSelectedSector(s); setIsSectorOpen(false); setSectorSearch(""); }}
                  className="p-4 hover:bg-white/10 hover:text-white text-gray-400 font-mono text-[10px] uppercase tracking-widest cursor-pointer border-b border-white/5 last:border-0 transition-colors"
                >
                  {s.name}
                </div>
              ))
            ) : (
              <div className="p-4 text-gray-600 font-mono text-[10px] uppercase tracking-widest">No exact match. Select "Other / Unlisted Sector..."</div>
            )}
          </div>
        )}
      </div>

      {isOtherSector && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <input
            type="text"
            className="w-full bg-black/40 border border-white/20 text-white font-mono text-xs p-4 rounded-xl outline-none focus:border-white/50 transition-colors placeholder-gray-600 uppercase"
            placeholder="DESCRIBE YOUR SPECIFIC SECTOR..."
            value={customSector}
            onChange={(e) => setCustomSector(e.target.value)}
          />
        </div>
      )}

      {/* 2. EXECUTIVE TITLE ACQUISITION */}
      {selectedSector && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 relative" ref={titleRef}>
          <div className="text-gray-400 font-mono text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <User size={12} /> Step 2: Authorizing Officer Title
          </div>
          
          <div 
            onClick={() => setIsTitleOpen(!isTitleOpen)}
            className="w-full bg-black/60 border border-white/20 text-white font-bold uppercase tracking-widest text-xs p-4 rounded-xl cursor-text flex items-center justify-between hover:border-white/50 transition-colors"
          >
            {isTitleOpen ? (
              <div className="flex items-center w-full gap-3">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  autoFocus
                  className="bg-transparent border-none outline-none w-full text-white placeholder-gray-500"
                  placeholder="SEARCH TITLES..."
                  value={titleSearch}
                  onChange={(e) => setTitleSearch(e.target.value)}
                />
              </div>
            ) : (
              <span className={selectedTitle ? "text-white" : "text-gray-500"}>
                {selectedTitle ? selectedTitle.name : "SEARCH OR SELECT TITLE..."}
              </span>
            )}
            {!isTitleOpen && <ChevronDown size={16} className="text-gray-500" />}
          </div>

          {isTitleOpen && (
            <div className="absolute z-50 w-full mt-2 bg-[#050505] border border-white/20 rounded-xl max-h-56 overflow-y-auto shadow-[0_10px_40px_rgba(0,0,0,0.8)] custom-scrollbar">
              {filteredTitles.length > 0 ? (
                filteredTitles.map((t, idx) => (
                  <div
                    key={idx}
                    onClick={() => { setSelectedTitle(t); setIsTitleOpen(false); setTitleSearch(""); }}
                    className="p-4 hover:bg-white/10 hover:text-white text-gray-400 font-mono text-[10px] uppercase tracking-widest cursor-pointer border-b border-white/5 last:border-0 transition-colors"
                  >
                    {t.name}
                  </div>
                ))
              ) : (
                 <div className="p-4 text-gray-600 font-mono text-[10px] uppercase tracking-widest">No exact match. Select "Other / Unlisted Title..."</div>
              )}
            </div>
          )}
        </div>
      )}

      {isOtherTitle && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <input
            type="text"
            className="w-full bg-black/40 border border-white/20 text-white font-mono text-xs p-4 rounded-xl outline-none focus:border-white/50 transition-colors placeholder-gray-600 uppercase"
            placeholder="ENTER YOUR EXACT JOB TITLE..."
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
          />
        </div>
      )}

      {/* 3. EXECUTIVE CREDENTIALS */}
      {selectedSector && selectedTitle && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="text-gray-400 font-mono text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
            <FileText size={12} /> Step 3: Dispatch Coordinates
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                className="w-full bg-black/40 border border-white/20 text-white font-mono text-xs p-3 pl-10 rounded-xl outline-none focus:border-white/50 transition-colors placeholder-gray-600"
                placeholder="FULL NAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Building size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                className="w-full bg-black/40 border border-white/20 text-white font-mono text-xs p-3 pl-10 rounded-xl outline-none focus:border-white/50 transition-colors placeholder-gray-600"
                placeholder="ORGANIZATION / COMPANY"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                className="w-full bg-black/40 border border-white/20 text-white font-mono text-xs p-3 pl-10 rounded-xl outline-none focus:border-white/50 transition-colors placeholder-gray-600"
                placeholder="CORPORATE EMAIL FOR INVOICE"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. THE DISPATCH GATEWAY */}
      {readyToExecute && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 pt-2 border-t border-white/10">
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleDispatch}
            className="w-full py-5 border-2 border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all rounded-xl flex items-center justify-center gap-4 shadow-[0_0_15px_rgba(255,255,255,0.05)] disabled:opacity-50"
          >
            <FileText size={20} />
            {isProcessing ? "TRANSMITTING..." : "DISPATCH ROUTING PROTOCOL"}
          </button>
        </div>
      )}
    </div>
  );
}