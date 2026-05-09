import React, { useState, useMemo, useRef, useEffect } from "react";
import { CreditCard, ChevronDown, Activity, Search, Briefcase, User, Mail, Phone, Building, Fingerprint, FileText, AlertTriangle } from "lucide-react";

// The Intelligence Matrix: Active routing protocols
const TIER_GATEWAYS = {
  class3: { price: 15000, link: "https://buy.stripe.com/9B67sE4yO19mazm6KBgrS00" },
  class2: { price: 50000, link: "https://buy.stripe.com/6oU5kw7L0f0c9vifh7grS01" },
  class1: { price: 150000, link: "https://buy.stripe.com/5kQ7sE4yOg4gbDq5GxgrS02" },
  classs: { price: 250000, link: "https://buy.stripe.com/4gM00ce9o6tGdLyed3grS03" }
};

// Sector Array (Stripped and Strictly Alphabetized)
const SECTORS = [
  { name: "Advanced Agriculture & AgTech", tier: "class2" },
  { name: "Advanced Materials Engineering", tier: "class2" },
  { name: "Aerospace & Defense Networks", tier: "classs" },
  { name: "Algorithmic Quantitative Systems", tier: "class1" },
  { name: "Alternative Energy & Syntropic Systems", tier: "class3" },
  { name: "Architecture & Heavy Construction", tier: "class2" },
  { name: "Artificial Intelligence Labs", tier: "class1" }, // Stripped Tier-1
  { name: "Automotive & Heavy Manufacturing", tier: "class1" },
  { name: "Aviation & Fleet Management", tier: "class2" },
  { name: "Biotech & Clinical Research", tier: "class2" },
  { name: "Boutique Hospitality & Travel Boutiques", tier: "class3" },
  { name: "Boutique Marketing & Creative Agencies", tier: "class3" },
  { name: "Boutique Private Wealth Management", tier: "class3" },
  { name: "Clean Energy & Renewables", tier: "class2" },
  { name: "Cloud Infrastructure Providers", tier: "class1" }, // Stripped Tier-1
  { name: "Consumer Mobile Applications", tier: "class3" },
  { name: "Data Center & Colocation Services", tier: "class2" },
  { name: "Digital Media & Independent Publishing", tier: "class3" },
  { name: "Enterprise Cybersecurity & Threat Intel", tier: "class2" },
  { name: "Enterprise EdTech Platforms", tier: "class2" },
  { name: "FinTech & Payment Processors", tier: "class2" },
  { name: "Global Commercial Real Estate", tier: "class1" },
  { name: "Global Investment Banking", tier: "class1" },
  { name: "Global Media & Broadcast Conglomerates", tier: "class1" },
  { name: "Global Telecommunications Infrastructure", tier: "classs" },
  { name: "Government & Federal Contractors", tier: "classs" },
  { name: "Hardware Prototyping & Maker Labs", tier: "class3" },
  { name: "Hospitality & Resort Chains", tier: "class2" },
  { name: "Human Optimization & Bio-Hacking Technologies", tier: "class3" },
  { name: "Independent Architecture & Design Boutiques", tier: "class3" },
  { name: "Independent Financial Advisory", tier: "class3" },
  { name: "Independent Game Studios", tier: "class3" },
  { name: "Independent Research & Data Analytics", tier: "class3" },
  { name: "Industrial Automation & Robotics", tier: "class2" },
  { name: "International Insurance Conglomerates", tier: "class1" },
  { name: "International Maritime & Freight Logistics", tier: "class1" },
  { name: "Large-Scale Regional E-Commerce", tier: "class2" },
  { name: "Local Private Clinics & Healthcare", tier: "class3" },
  { name: "Micro-SaaS & Bootstrapped Tools", tier: "class3" },
  { name: "Mid-Market Corporate Legal Services", tier: "class2" },
  { name: "Mid-Market Manufacturing & Assembly", tier: "class2" },
  { name: "Mid-Market SaaS Platforms", tier: "class2" },
  { name: "Multinational Pharmaceutical Manufacturing", tier: "class1" },
  { name: "Multinational Retail & FMCG", tier: "class1" },
  { name: "Niche D2C E-Commerce Brands", tier: "class3" },
  { name: "Private Equity & Venture Capital", tier: "class2" },
  { name: "Regional Healthcare & Hospital Systems", tier: "class2" },
  { name: "Regional Utility & Water Management", tier: "class2" },
  { name: "Semiconductor & Advanced Silicon", tier: "class1" },
  { name: "Sovereign Wealth & Central Banking", tier: "classs" },
  { name: "Specialized Legal & Compliance Boutiques", tier: "class3" },
  { name: "Specialized Regional Logistics", tier: "class3" },
  { name: "Supply Chain & Inventory Management", tier: "class2" },
  { name: "Utility-Scale Energy & Grid Management", tier: "classs" },
  { name: "Web3 & Decentralized Protocols", tier: "class3" }
];

// Executive Title Array (Alphabetized, with Fallback anchored at the bottom)
const TITLES = [
  { name: "Chief Architect" },
  { name: "Chief Data Officer (CDO)" },
  { name: "Chief Executive Officer (CEO)" },
  { name: "Chief Financial Officer (CFO)" },
  { name: "Chief Information Officer (CIO)" },
  { name: "Chief Information Security Officer (CISO)" },
  { name: "Chief Operating Officer (COO)" },
  { name: "Chief Technology Officer (CTO)" },
  { name: "Director of Infrastructure" },
  { name: "Director of Operations" },
  { name: "Founder / Co-Founder" },
  { name: "Head of Algorithmic Trading" },
  { name: "Head of Engineering" },
  { name: "Head of Systems Architecture" },
  { name: "Lead Systems Engineer" },
  { name: "Managing Partner" },
  { name: "Network Operations Commander" },
  { name: "President" },
  { name: "Principal Software Engineer" },
  { name: "Procurement Officer" },
  { name: "Quantitative Research Lead" },
  { name: "Senior DevOps Engineer" },
  { name: "Vice President of Engineering" },
  { name: "Vice President of IT" },
  { name: "Other / Unlisted Title..." }
];

export function AuditCheckoutButton() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationWarning, setValidationWarning] = useState("");

  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const [sectorSearch, setSectorSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState<typeof SECTORS[0] | null>(null);
  
  const [isTitleOpen, setIsTitleOpen] = useState(false);
  const [titleSearch, setTitleSearch] = useState("");
  const [selectedTitle, setSelectedTitle] = useState<typeof TITLES[0] | null>(null);
  const [customTitle, setCustomTitle] = useState("");

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
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

  const isOtherTitle = selectedTitle?.name === "Other / Unlisted Title...";
  
  const readyToExecute = 
    selectedSector && 
    selectedTitle && (!isOtherTitle || customTitle.trim() !== "") &&
    name.trim() !== "" &&
    company.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "";

  // PATH 1: STRIPE GATEWAY
  const handleStripeCheckout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!readyToExecute) {
      setValidationWarning("OPERATIVE CREDENTIALS INCOMPLETE. FILL ALL FIELDS ABOVE.");
      return;
    }
    setValidationWarning("");
    setIsProcessing(true);

    const finalTitle = selectedTitle!.name === "Other / Unlisted Title..." ? customTitle : selectedTitle!.name;
    const payload = {
      access_key: "3920a8a0-06ad-47f2-a6f7-f9bae987b7c0",
      subject: `STRIPE CHECKOUT INITIATED: ${company} [${selectedSector!.tier.toUpperCase()}]`,
      from_name: "A.I.C.E. Sales Matrix",
      Operator_Name: name,
      Email: email,
      Phone: phone,
      Organization: company,
      Role: finalTitle,
      System_Class: selectedSector!.tier,
      Sector: selectedSector!.name,
      Message_Log: "User initiated the Stripe checkout flow. Lead data captured.",
    };

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) { console.error("Silent Uplink Failed."); }

    const tierData = TIER_GATEWAYS[selectedSector!.tier as keyof typeof TIER_GATEWAYS];
    if (tierData && tierData.link) window.location.assign(tierData.link);
    else setIsProcessing(false);
  };

  // PATH 2: WISE ROUTING GATEWAY
  const handleWiseRouting = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!readyToExecute) {
      setValidationWarning("ACCESS DENIED: OPERATIVE CREDENTIALS INCOMPLETE. FILL ALL FIELDS ABOVE.");
      return;
    }
    setValidationWarning("");
    setIsProcessing(true);

    const finalTitle = selectedTitle!.name === "Other / Unlisted Title..." ? customTitle : selectedTitle!.name;
    const payload = {
      access_key: "3920a8a0-06ad-47f2-a6f7-f9bae987b7c0",
      subject: `WISE ROUTING REQUEST: ${company} [${selectedSector!.tier.toUpperCase()}]`,
      from_name: "A.I.C.E. Financial Gateway",
      Operator_Name: name,
      Email: email,
      Phone: phone,
      Organization: company,
      Role: finalTitle,
      System_Class: selectedSector!.tier,
      Sector: selectedSector!.name,
      Message_Log: "User requested Institutional Wise routing instructions. Lead data securely captured."
    };

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) { console.error("Silent Uplink Failed."); }

    setIsProcessing(false);
    
    const mailtoLink = `mailto:finance@aice.network?subject=Institutional%20Wire%20Transfer%20Request:%20${encodeURIComponent(company)}&body=Please%20provide%20a%20formal%20invoice%20and%20direct%20SWIFT/ACH%20routing%20instructions%20for%20A.I.C.E.%20Systems%20Corp.%0A%0AProcessing%20Entity%20/%20Company:%20${encodeURIComponent(company)}%0APrimary%20Contact:%20${encodeURIComponent(name)}%0AOperational%20Sector:%20${encodeURIComponent(selectedSector!.name)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="space-y-6 w-full">
      {/* 1. SECTOR PROFILING MATRIX */}
      <div className="relative" ref={sectorRef}>
        <div className="text-[#00F3FF] font-mono text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
          <Briefcase size={14} /> Step 1: Identify Operational Sector
        </div>
        <div onClick={() => setIsSectorOpen(!isSectorOpen)} className="w-full bg-black/80 border-2 border-white/20 text-white font-bold uppercase tracking-widest text-sm p-4 rounded-xl cursor-text flex items-center justify-between hover:border-[#00F3FF]/50 transition-colors">
          {isSectorOpen ? (
            <div className="flex items-center w-full gap-3">
              <Search size={18} className="text-[#00F3FF]" />
              <input type="text" autoFocus className="bg-transparent border-none outline-none w-full text-white placeholder-gray-500" placeholder="SEARCH 50+ SECTORS..." value={sectorSearch} onChange={(e) => setSectorSearch(e.target.value)} />
            </div>
          ) : (
            <span className={selectedSector ? "text-[#00F3FF]" : "text-gray-400"}>{selectedSector ? selectedSector.name : "SEARCH OR SELECT SECTOR..."}</span>
          )}
          {!isSectorOpen && <ChevronDown size={20} className="text-[#00F3FF]" />}
        </div>
        {isSectorOpen && (
          <div className="absolute z-50 w-full mt-2 bg-[#050505] border border-white/20 rounded-xl max-h-56 overflow-y-auto shadow-[0_10px_40px_rgba(0,0,0,0.8)] custom-scrollbar">
            {filteredSectors.length > 0 ? (
              filteredSectors.map((s, idx) => (
                <div key={idx} onClick={() => { setSelectedSector(s); setIsSectorOpen(false); setSectorSearch(""); }} className="p-4 hover:bg-[#00F3FF]/10 hover:text-[#00F3FF] text-gray-300 font-mono text-xs uppercase tracking-widest cursor-pointer border-b border-white/5 last:border-0 transition-colors">{s.name}</div>
              ))
            ) : (
              <div className="p-4 text-gray-500 font-mono text-xs uppercase tracking-widest">No exact match. Select closest operational equivalent.</div>
            )}
          </div>
        )}
      </div>

      {/* 2. EXECUTIVE TITLE ACQUISITION */}
      {selectedSector && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 relative" ref={titleRef}>
          <div className="text-[#00F3FF] font-mono text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <User size={14} /> Step 2: Authorizing Officer Title
          </div>
          <div onClick={() => setIsTitleOpen(!isTitleOpen)} className="w-full bg-black/80 border-2 border-white/20 text-white font-bold uppercase tracking-widest text-sm p-4 rounded-xl cursor-text flex items-center justify-between hover:border-[#00F3FF]/50 transition-colors">
            {isTitleOpen ? (
              <div className="flex items-center w-full gap-3">
                <Search size={18} className="text-[#00F3FF]" />
                <input type="text" autoFocus className="bg-transparent border-none outline-none w-full text-white placeholder-gray-500" placeholder="SEARCH TITLES..." value={titleSearch} onChange={(e) => setTitleSearch(e.target.value)} />
              </div>
            ) : (
              <span className={selectedTitle ? "text-[#00F3FF]" : "text-gray-400"}>{selectedTitle ? selectedTitle.name : "SEARCH OR SELECT TITLE..."}</span>
            )}
            {!isTitleOpen && <ChevronDown size={20} className="text-[#00F3FF]" />}
          </div>
          {isTitleOpen && (
            <div className="absolute z-50 w-full mt-2 bg-[#050505] border border-white/20 rounded-xl max-h-56 overflow-y-auto shadow-[0_10px_40px_rgba(0,0,0,0.8)] custom-scrollbar">
              {filteredTitles.length > 0 ? (
                filteredTitles.map((t, idx) => (
                  <div key={idx} onClick={() => { setSelectedTitle(t); setIsTitleOpen(false); setTitleSearch(""); }} className="p-4 hover:bg-[#00F3FF]/10 hover:text-[#00F3FF] text-gray-300 font-mono text-xs uppercase tracking-widest cursor-pointer border-b border-white/5 last:border-0 transition-colors">{t.name}</div>
                ))
              ) : (
                 <div className="p-4 text-gray-500 font-mono text-xs uppercase tracking-widest">No exact match. Select "Other / Unlisted Title..."</div>
              )}
            </div>
          )}
        </div>
      )}

      {isOtherTitle && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <input type="text" className="w-full bg-black/50 border border-white/20 text-white font-mono text-sm p-4 rounded-xl outline-none focus:border-orange-500 transition-colors placeholder-gray-600 uppercase" placeholder="ENTER YOUR EXACT JOB TITLE..." value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} />
        </div>
      )}

      {/* 3. EXECUTIVE CREDENTIALS (MANUAL ENTRY) */}
      {selectedSector && selectedTitle && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="text-[#00F3FF] font-mono text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
            <Fingerprint size={14} /> Step 3: Executive Credentials
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" required className="w-full bg-black/50 border border-white/20 text-white font-mono text-sm p-3 pl-10 rounded-xl outline-none focus:border-[#00F3FF] transition-colors placeholder-gray-600" placeholder="FULL NAME" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="relative">
              <Building size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" required className="w-full bg-black/50 border border-white/20 text-white font-mono text-sm p-3 pl-10 rounded-xl outline-none focus:border-[#00F3FF] transition-colors placeholder-gray-600" placeholder="ORGANIZATION / COMPANY" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="email" required className="w-full bg-black/50 border border-white/20 text-white font-mono text-sm p-3 pl-10 rounded-xl outline-none focus:border-[#00F3FF] transition-colors placeholder-gray-600" placeholder="CORPORATE EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="tel" required className="w-full bg-black/50 border border-white/20 text-white font-mono text-sm p-3 pl-10 rounded-xl outline-none focus:border-[#00F3FF] transition-colors placeholder-gray-600" placeholder="DIRECT PHONE" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* 4. THE CALCULATED GATEWAY (ALWAYS VISIBLE, LOCKED UNTIL SECURE) */}
      <div className="space-y-6 pt-6 border-t border-white/10 mt-6">
        <div className="bg-[#00F3FF]/10 border border-[#00F3FF]/30 rounded-xl p-6 text-center shadow-[0_0_20px_rgba(0,243,255,0.1)]">
          <div className="text-[#00F3FF] font-mono text-xs font-bold uppercase tracking-[0.2em] mb-2 flex items-center justify-center gap-2">
            <Activity size={14} className="animate-pulse" />
            Calculated Diagnostic Fee
          </div>
          <div className="text-4xl font-black text-white tracking-tighter">
            {selectedSector ? (
              <>
                ${TIER_GATEWAYS[selectedSector.tier as keyof typeof TIER_GATEWAYS].price.toLocaleString()} <span className="text-lg text-gray-400 font-medium tracking-normal">USD</span>
              </>
            ) : (
              <span className="text-2xl text-gray-500 uppercase tracking-widest">AWAITING PARAMETERS</span>
            )}
          </div>
        </div>

        {validationWarning && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
            <AlertTriangle size={18} className="shrink-0" /> {validationWarning}
          </div>
        )}

        <div className="space-y-4">
            <button type="button" disabled={isProcessing} onClick={handleStripeCheckout} className="w-full py-5 bg-[#00F3FF] text-black font-black uppercase tracking-widest text-lg hover:bg-white transition-all rounded-xl flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(0,243,255,0.4)] disabled:opacity-70">
              <CreditCard size={24} />
              {isProcessing ? "SECURING UPLINK..." : `PAY VIA STRIPE SECURE`}
            </button>

            <div className="flex items-center gap-6 py-2">
                <div className="h-[1px] flex-1 bg-white/20"></div>
                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em] font-bold">Or Bypass Gateway Fees</div>
                <div className="h-[1px] flex-1 bg-white/20"></div>
            </div>

            <button type="button" disabled={isProcessing} onClick={handleWiseRouting} className="w-full py-5 border-2 border-white/20 text-white font-bold uppercase tracking-widest text-sm md:text-base hover:border-white hover:bg-white hover:text-black transition-all rounded-xl flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(255,255,255,0.05)] disabled:opacity-70">
               <FileText size={20} /> Request Corporate Wise Routing
            </button>
        </div>
      </div>
    </div>
  );
}