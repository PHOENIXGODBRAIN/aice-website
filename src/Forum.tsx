import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, Lock, ShieldCheck, Cpu, Flame, Users, 
  BookOpen, Plus, X, Send, Globe, Zap, Crown, 
  Fingerprint, Server, ArrowLeft, Trash2, Edit3, Activity, History, Pin,
  Settings, ImagePlus, ChevronDown, ChevronRight, Wrench
} from 'lucide-react';
import { 
  collection, addDoc, query, where, orderBy, onSnapshot, 
  serverTimestamp, doc, getDoc, setDoc, updateDoc, increment, deleteDoc
} from 'firebase/firestore';
import { db } from './App'; 

interface ForumProps {
  userTier: string;
  user: any; 
  openLogin?: (mode: 'login' | 'register') => void;
}

type ForumPhase = 'AUTHENTICATING' | 'SETUP' | 'SECTORS' | 'THREAD_VIEW' | 'DASHBOARD';

export const ForumView: React.FC<ForumProps> = ({ userTier, user, openLogin }) => {
  const [phase, setPhase] = useState<ForumPhase>('AUTHENTICATING');
  const [activeCategory, setActiveCategory] = useState<string>('PUBLIC_NEXUS');
  const [liveThreads, setLiveThreads] = useState<any[]>([]);
  const [myThreads, setMyThreads] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  
  // Post/Reply States
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedThread, setSelectedThread] = useState<any>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [replyContent, setReplyContent] = useState('');

  // Editing States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState(''); // COMMANDER OVERRIDE STATE

  // Operative Optics & Payload States
  const [userFont, setUserFont] = useState(() => localStorage.getItem('nexus_font') || 'font-mono');
  const [fontScale, setFontScale] = useState(() => parseFloat(localStorage.getItem('nexus_scale') || '1'));
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  // Automatically save preferences to the operative's local machine
  useEffect(() => { localStorage.setItem('nexus_font', userFont); }, [userFont]);
  useEffect(() => { localStorage.setItem('nexus_scale', fontScale.toString()); }, [fontScale]);

  // Security/Identity States
  const [forumProfile, setForumProfile] = useState<any>(null);
  const [aliasInput, setAliasInput] = useState('');
  const [authError, setAuthError] = useState('');

  const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 24 24' fill='none' stroke='%2300F3FF' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
  const operativeAvatar = user?.photoURL || DEFAULT_AVATAR;

  // Hierarchy Mapping
  const accessLevels: Record<string, number> = {
    'PUBLIC': 6, 'GUEST': 6, 'LEVEL_5': 5, 'CLASS_3': 4, 
    'CLASS_2': 3, 'CLASS_1': 2, 'CLASS_S': 1, 'COMMANDER': 0
  };
  const currentLevel = accessLevels[userTier] ?? 6;
  const isCommander = userTier === 'COMMANDER';

  const categories = [
    { id: 'PUBLIC_NEXUS', name: 'Public Intelligence', icon: <Globe size={18} />, reqLevel: 6, desc: "Open terminal for general inquiries." },
    { id: 'OPERATIVE_COMMS', name: 'Operative Comms', icon: <Users size={18} />, reqLevel: 5, desc: "Verified deployment strategies." },
    { id: 'TROUBLESHOOTING', name: 'Troubleshooting', icon: <Wrench size={18} />, reqLevel: 6, desc: "Diagnostic support and system fixes." },
    { id: 'CLASS_3_COMMERCIAL', name: 'Commercial & Edge AI', icon: <Cpu size={18} />, reqLevel: 4, desc: "Class 3 Clearance. Thermal throttling data." },
    { id: 'CLASS_2_ENTERPRISE', name: 'Enterprise Grid', icon: <Server size={18} />, reqLevel: 3, desc: "Class 2 Clearance. Multi-node orchestration." },
    { id: 'CLASS_1_SYSTEMIC', name: 'Systemic & Financial', icon: <Flame size={18} />, reqLevel: 2, desc: "Class 1 Clearance. Yearly Contracts and Investors" },
    { id: 'CLASS_S_SOVEREIGN', name: 'Sovereign Infrastructure', icon: <Zap size={18} />, reqLevel: 1, desc: "Class S Clearance. EMP-hardening integration." },
    { id: 'COMMANDER_DESK', name: "The Architect's Desk", icon: <Crown size={18} />, reqLevel: 0, desc: "Level 0 Clearance. Protocol overrides." },
  ];

  // 1. Initial Authentication & Identity Check
  useEffect(() => {
    if (!user || user.isAnonymous) return;
    const checkProfile = async () => {
      try {
        const ref = doc(db, 'forum_profiles', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setForumProfile(snap.data());
          setPhase('SECTORS'); 
        } else {
          setPhase('SETUP'); 
        }
      } catch (error: any) {
        console.error("NEXUS ACCESS DENIED", error);
        setAuthError(`UPLINK REJECTED: ${error.message}`);
        setPhase('SETUP'); 
      }
    };
    checkProfile();
  }, [user]);

  // 2. Live Database Listener for Sector Threads
  useEffect(() => {
    if (phase !== 'SECTORS' && phase !== 'THREAD_VIEW') return;
    const q = query(
      collection(db, 'forum_threads'),
      where('category', '==', activeCategory),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort client-side to bypass complex Firebase indexing requirements
      fetched.sort((a: any, b: any) => {
          if (a.isMasterPinned && !b.isMasterPinned) return -1;
          if (!a.isMasterPinned && b.isMasterPinned) return 1;
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return 0; // Fallback to timestamp sort
      });
      setLiveThreads(fetched);
    });
    return () => unsubscribe();
  }, [activeCategory, phase]);

  // 3. Live Database Listener for Thread Replies (INDEX BYPASS ACTIVE)
  useEffect(() => {
    if (!selectedThread) return;
    const q = query(
      collection(db, 'forum_replies'),
      where('threadId', '==', selectedThread.id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReplies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      fetchedReplies.sort((a: any, b: any) => {
         const timeA = a.createdAt?.toMillis() || Date.now();
         const timeB = b.createdAt?.toMillis() || Date.now();
         return timeA - timeB;
      });
      setReplies(fetchedReplies);
    });
    return () => unsubscribe();
  }, [selectedThread]);

  // 4. Fetch User Dashboard Threads (INDEX BYPASS ACTIVE)
  useEffect(() => {
    if (phase !== 'DASHBOARD') return;
    const q = query(
      collection(db, 'forum_threads'),
      where('authorUid', '==', user.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      fetched.sort((a: any, b: any) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
      setMyThreads(fetched);
    });
    return () => unsubscribe();
  }, [phase, user]);

  // --- ACTIONS & EXECUTIONS ---
  
  const handleCreateProfile = async () => {
    if (!aliasInput.trim()) { setAuthError("OPERATIVE ALIAS REQUIRED FOR ENCRYPTION."); return; }
    setIsSubmitting(true);
    try {
      const finalAlias = aliasInput.trim();
      const forumRef = doc(db, 'forum_profiles', user.uid);
      const profileData = { alias: finalAlias, createdAt: serverTimestamp() };
      await setDoc(forumRef, profileData);
      
      const globalRef = doc(db, 'artifacts', 'aice-6bd8e', 'users', user.uid);
      await setDoc(globalRef, { alias: finalAlias }, { merge: true });

      setForumProfile(profileData);
      setPhase('SECTORS');
      setAuthError('');
    } catch (error: any) { 
      console.error("UPLINK FAILURE DETAILS:", error);
      // Expose the specific Firebase error code if available, otherwise fallback
      const exactError = error?.code || error?.message || "UNKNOWN REJECTION";
      setAuthError(`DATABASE ERROR: ${exactError}. Check console for full diagnostics.`); 
    } finally { 
      setIsSubmitting(false); 
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (attachments.length + files.length > 2) {
          alert("MAXIMUM OVERRIDE: Only 2 images permitted per transmission.");
          return;
      }
      const validFiles = files.filter(f => {
          if (f.size > 2 * 1024 * 1024) { // 2MB restriction
              alert(`PAYLOAD REJECTED: ${f.name} exceeds 2MB limit.`);
              return false;
          }
          return true;
      });
      setAttachments([...attachments, ...validFiles]);
  };

  const handleCreateThread = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'forum_threads'), {
        category: activeCategory,
        title: newTitle,
        content: newContent,
        authorUid: user.uid,
        authorName: forumProfile.alias,
        authorPhoto: operativeAvatar,
        authorTier: userTier,
        createdAt: serverTimestamp(),
        replies: 0,
        isPinned: false,
        isMasterPinned: false,
        isLocked: false
      });
      setNewTitle(''); setNewContent(''); setAttachments([]); setIsCreating(false);
    } catch (error) {
      alert("Error: Database Access Denied.");
    } finally { setIsSubmitting(false); }
  };

  const handlePostReply = async () => {
    if (!replyContent.trim() || !selectedThread) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'forum_replies'), {
        threadId: selectedThread.id,
        content: replyContent,
        authorUid: user.uid,
        authorName: forumProfile.alias,
        authorPhoto: operativeAvatar,
        authorTier: userTier,
        createdAt: serverTimestamp()
      });
      await updateDoc(doc(db, 'forum_threads', selectedThread.id), { replies: increment(1) });
      setReplyContent('');
    } catch(e) {
      alert("Error: Transmission failed.");
    } finally { setIsSubmitting(false); }
  };

  // --- CRUD TACTICS (EDIT / DELETE / COMMANDER OVERRIDES) ---

  const handleTogglePin = async (thread: any, e: React.MouseEvent) => {
      e.stopPropagation();
      try {
          const newState = !thread.isPinned;
          await updateDoc(doc(db, 'forum_threads', thread.id), { isPinned: newState });
          if (selectedThread?.id === thread.id) setSelectedThread({ ...selectedThread, isPinned: newState });
      } catch (error) { alert("PIN OVERRIDE REJECTED."); }
  };

  const handleToggleLock = async (thread: any, e: React.MouseEvent) => {
      e.stopPropagation();
      try {
          const newState = !thread.isLocked;
          await updateDoc(doc(db, 'forum_threads', thread.id), { isLocked: newState });
          if (selectedThread?.id === thread.id) setSelectedThread({ ...selectedThread, isLocked: newState });
      } catch (error) { alert("LOCK OVERRIDE REJECTED."); }
  };

  const handleToggleMasterPin = async (thread: any, e: React.MouseEvent) => {
      e.stopPropagation();
      try {
          const newState = !thread.isMasterPinned;
          await updateDoc(doc(db, 'forum_threads', thread.id), { isMasterPinned: newState });
          if (selectedThread?.id === thread.id) setSelectedThread({ ...selectedThread, isMasterPinned: newState });
      } catch (error) { alert("MASTER PIN OVERRIDE REJECTED."); }
  };

  const handleDeleteThread = async (threadId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (!window.confirm("TERMINATE TRANSMISSION? This action is irreversible.")) return;
      try {
          await deleteDoc(doc(db, 'forum_threads', threadId));
          if (selectedThread?.id === threadId) { setPhase('SECTORS'); setSelectedThread(null); }
      } catch (error) { alert("TERMINATION REJECTED. Check clearance."); }
  };

  const handleDeleteReply = async (replyId: string, threadId: string) => {
      if (!window.confirm("TERMINATE REPLY?")) return;
      try {
          await deleteDoc(doc(db, 'forum_replies', replyId));
          await updateDoc(doc(db, 'forum_threads', threadId), { replies: increment(-1) });
      } catch (error) { alert("TERMINATION REJECTED."); }
  };

  const handleEditSubmit = async (collectionName: string, docId: string) => {
      if (!editContent.trim()) return;
      try {
          const payload: any = { content: editContent, editedAt: serverTimestamp() };
          
          if (collectionName === 'forum_threads' && isCommander && editCategory) {
              payload.category = editCategory;
          }

          await updateDoc(doc(db, collectionName, docId), payload);
          setEditingId(null);
          setEditContent('');
          
          if (collectionName === 'forum_threads' && selectedThread?.id === docId) {
              setSelectedThread({ 
                ...selectedThread, 
                content: editContent,
                category: (isCommander && editCategory) ? editCategory : selectedThread.category 
              });
          }
      } catch (error) { alert("UPDATE REJECTED. Check Commander Clearance Rules."); }
  };

  const openThread = (thread: any) => {
    setSelectedThread(thread);
    setPhase('THREAD_VIEW');
  };
// --- RENDER PIPELINE ---

  if (phase === 'AUTHENTICATING') {
      return <div className="min-h-screen pt-40 text-center text-[#00F3FF] font-mono tracking-widest uppercase animate-pulse">Establishing Secure Nexus Handshake...</div>;
  }

  if (phase === 'SETUP') {
      return (
          <div className="min-h-screen bg-black pt-32 px-6 flex justify-center items-start relative z-10">
              <div className="w-full max-w-xl bg-[#050505] border-2 border-[#00F3FF]/30 p-10 rounded-3xl shadow-[0_0_50px_rgba(0,243,255,0.15)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#00F3FF]"></div>
                  <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-[#00F3FF]/10 rounded-xl border border-[#00F3FF]/30"><Fingerprint size={28} className="text-[#00F3FF]" /></div>
                      <div>
                          <h2 className="text-2xl font-black text-white uppercase tracking-widest">NEXUS IDENTITY REGISTRY</h2>
                          <p className="text-xs font-mono text-[#00F3FF] tracking-widest uppercase">Clearance Verified // Action Required</p>
                      </div>
                  </div>

                  {authError && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-500 font-mono text-xs uppercase font-bold">{authError}</div>}

                  <div className="space-y-6 animate-in fade-in">
                      <div className="bg-orange-500/10 border-l-2 border-orange-500 p-4 mb-6">
                          <p className="text-xs font-mono text-orange-500 font-bold uppercase tracking-wider leading-relaxed">
                              WARNING: You have exactly ONE CHANCE to set your permanent Operative Alias. Choose wisely. This designation will be globally synchronized to your primary A.I.C.E. profile.
                          </p>
                      </div>
                      <div>
                          <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">Permanent Identity (Alias)</label>
                          <input type="text" value={aliasInput} onChange={(e) => setAliasInput(e.target.value.replace(/[^a-zA-Z0-9_.-]/g, ''))} maxLength={20} placeholder="E.g., Architect_01" className="w-full bg-black border border-white/20 rounded-xl p-4 text-white font-mono font-bold outline-none focus:border-[#00F3FF] transition-colors shadow-inner" />
                      </div>
                      <button onClick={handleCreateProfile} disabled={isSubmitting} className="w-full py-5 mt-4 bg-[#00F3FF] text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)] disabled:opacity-50">
                          {isSubmitting ? 'MINTING IDENTIFIER...' : 'MINT ALIAS & ENTER NEXUS'}
                      </button>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="relative z-10 pt-28 pb-24 px-6 min-h-screen bg-black">
      
      {/* HEADER */}
      <div className="w-full max-w-7xl mx-auto mb-16 text-center animate-in zoom-in duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-black border-4 border-[#00F3FF] mb-8 text-[#00F3FF] shadow-[0_0_50px_rgba(0,243,255,0.4)] animate-[pulse_4s_ease-in-out_infinite] relative z-10">
            <MessageSquare size={40} className="text-[#00F3FF]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-sans font-black text-white uppercase tracking-tighter mb-4 leading-none">
            Intelligence <span className="text-[#00F3FF] drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">Nexus</span>
          </h1>
          <p className="text-[#00F3FF] font-mono tracking-[0.2em] text-xs uppercase font-bold px-4">
            Encrypted Operative Network // SECURE UPLINK ESTABLISHED
          </p>
      </div>

      <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: SIDEBAR EXPLORER TREE */}
        <div className="md:col-span-4 h-[calc(100vh-8rem)] sticky top-28 overflow-y-auto pr-4 space-y-4 pb-12 scrollbar-thin scrollbar-thumb-[#00F3FF]/30 scrollbar-track-transparent">
          
          {/* Identity & Optic Controls */}
          <div className="bg-[#050505] border-2 border-[#00F3FF]/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,243,255,0.1)] mb-6 relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
             <div className="relative z-10 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                     <img src={operativeAvatar} alt="Avatar" onError={(e) => { e.currentTarget.src = DEFAULT_AVATAR; }} className="w-14 h-14 rounded-full border-2 border-[#00F3FF] object-cover bg-black" />
                     <div>
                         <div className="font-mono text-[10px] text-[#00F3FF] uppercase tracking-widest font-bold mb-1 flex items-center gap-2">OPERATIVE <ShieldCheck size={12}/></div>
                         <div className="text-lg font-black text-white tracking-widest uppercase truncate">{forumProfile?.alias}</div>
                     </div>
                 </div>
                 <button onClick={() => setShowSettings(!showSettings)} className="p-2 bg-white/5 hover:bg-[#00F3FF]/20 rounded-lg border border-white/10 hover:border-[#00F3FF] transition-all text-white hover:text-[#00F3FF]">
                    <Settings size={20} />
                 </button>
             </div>

             {/* Optic Preferences Expandable */}
             {showSettings && (
                 <div className="mt-4 pt-4 border-t border-white/10 space-y-4 animate-in fade-in slide-in-from-top-2">
                     <div>
                         <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2">Select Font Style (Typography Matrix)</label>
                         <select value={userFont} onChange={(e) => setUserFont(e.target.value)} className="w-full bg-black border border-white/20 text-white text-xs p-2 rounded-lg outline-none">
                             <option value="font-mono">System Mono (Standard)</option>
                             <option value="font-sans">Clean Sans (Modern)</option>
                             <option value="font-serif">Literary Serif (Classic)</option>
                         </select>
                     </div>
                     <div>
                         <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2"> Font Size (Optical Zoom) [Scale: {Math.round(fontScale * 100)}%]</label>
                         <input type="range" min="0.8" max="1.5" step="0.1" value={fontScale} onChange={(e) => setFontScale(parseFloat(e.target.value))} className="w-full accent-[#00F3FF]" />
                     </div>
                 </div>
             )}
          </div>
          
          <button 
             onClick={() => { setPhase('DASHBOARD'); setIsCreating(false); setSelectedThread(null); }}
             className={`w-full text-left p-4 rounded-xl border-2 mb-2 flex items-center justify-between transition-all group ${phase === 'DASHBOARD' ? 'bg-[#FFD700]/10 border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.2)]' : 'bg-[#050505] border-white/10 hover:border-[#FFD700]/50'}`}
          >
             <div className={`flex items-center gap-3 font-black tracking-widest uppercase text-sm ${phase === 'DASHBOARD' ? 'text-[#FFD700]' : 'text-gray-300'}`}>
                <Activity size={18} /> OPERATIVE DASHBOARD
             </div>
          </button>

          {/* Dynamic Navigation Tree */}
          <div className="space-y-2">
            {categories.map((cat) => {
              const hasAccess = currentLevel <= cat.reqLevel;
              const isActiveSector = activeCategory === cat.id && phase !== 'DASHBOARD';

              return (
                <div key={cat.id} className="flex flex-col">
                  <button 
                    disabled={!hasAccess}
                    onClick={() => { setActiveCategory(cat.id); setIsCreating(false); setPhase('SECTORS'); setSelectedThread(null); }}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center justify-between group ${!hasAccess ? 'bg-black border-red-500/10 opacity-40 cursor-not-allowed' : isActiveSector ? 'bg-[#00F3FF]/10 border-[#00F3FF] shadow-[0_0_20px_rgba(0,243,255,0.15)] z-10' : 'bg-[#050505] border-white/5 hover:border-[#00F3FF]/30 hover:bg-white/5'}`}
                  >
                    <div className="flex flex-col gap-1">
                      <div className={`flex items-center gap-3 font-black tracking-widest uppercase text-sm md:text-base ${isActiveSector ? 'text-[#00F3FF]' : 'text-white'}`}>
                        {cat.icon} {cat.name}
                      </div>
                      <div className="text-xs font-mono text-gray-500 pl-8">{cat.desc}</div>
                    </div>
                    {hasAccess ? (isActiveSector ? <ChevronDown size={18} className="text-[#00F3FF] shrink-0" /> : <ChevronRight size={18} className="text-gray-600 group-hover:text-[#00F3FF] shrink-0" />) : <Lock size={16} className="text-red-500 shrink-0" />}
                  </button>

                  {/* SUB-THREAD EXPLORER LIST */}
                  {isActiveSector && hasAccess && (
                    <div className="pl-6 pt-2 pb-4 space-y-2 animate-in slide-in-from-top-2 border-l-2 border-[#00F3FF]/20 ml-6">
                       {liveThreads.length === 0 ? (
                          <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest pl-2">No active transmissions.</div>
                       ) : (
                          liveThreads.map(thread => (
                             <button 
                               key={thread.id} 
                               onClick={() => openThread(thread)}
                               className={`w-full text-left py-2 px-3 rounded-lg text-sm transition-all truncate border-l-2 ${selectedThread?.id === thread.id ? 'bg-[#00F3FF]/5 border-[#00F3FF] text-[#00F3FF] font-bold shadow-inner' : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5 font-medium'}`}
                             >
                               {thread.isMasterPinned && <Crown size={12} className="inline text-[#00F3FF] mr-2" />}
                               {thread.title}
                             </button>
                          ))
                       )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: MAIN FORUM AREA */}
        <div className="md:col-span-8">
          <div className="bg-[#050505] border-2 border-[#00F3FF]/20 rounded-3xl p-6 md:p-10 min-h-[700px] shadow-[0_0_50px_rgba(0,243,255,0.05)] relative overflow-hidden">
             
             {/* HEADER BAR */}
             {phase !== 'THREAD_VIEW' && (
                 <div className="flex justify-between items-center border-b-2 border-white/10 pb-8 mb-8">
                    <h3 className={`text-2xl font-black uppercase tracking-widest flex items-center gap-4 ${phase === 'DASHBOARD' ? 'text-[#FFD700]' : 'text-white'}`}>
                       {phase === 'DASHBOARD' ? <><Activity size={24} /> MISSION HISTORY</> : <><ShieldCheck size={24} className="text-[#00F3FF]" /> {categories.find(c => c.id === activeCategory)?.name}</>}
                    </h3>
                    {phase !== 'DASHBOARD' && !isCreating && (
                        <button onClick={() => setIsCreating(true)} className="px-8 py-4 bg-[#00F3FF] text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white hover:scale-105 transition-all flex items-center gap-3 shadow-lg">
                          <Plus size={18} /> Initialize Thread
                        </button>
                    )}
                    {isCreating && (
                        <button onClick={() => setIsCreating(false)} className="px-6 py-3 border border-white/20 text-gray-400 font-bold text-xs uppercase tracking-widest rounded-xl hover:text-white hover:border-white transition-all flex items-center gap-2">
                          <X size={16} /> Abort
                        </button>
                    )}
                 </div>
             )}

             {/* CREATE THREAD */}
             {isCreating && phase === 'SECTORS' ? (
                 <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                     <div>
                         <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">Transmission Designation (Title)</label>
                         <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter subject parameters..." className="w-full bg-black border-2 border-white/10 rounded-2xl p-5 text-white font-bold outline-none focus:border-[#00F3FF] transition-colors text-lg shadow-inner" />
                     </div>
                     <div>
                         <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">Data Payload (Message)</label>
                         <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="Input intelligence data here..." rows={8} style={{ fontSize: `${0.875 * fontScale}rem` }} className={`w-full bg-black border-2 border-white/10 rounded-2xl p-5 text-gray-300 ${userFont} outline-none focus:border-[#00F3FF] transition-colors resize-none shadow-inner`} />
                         
                         {/* Attachment UI */}
                         <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                             <div className="flex items-center gap-4">
                                 <label className="cursor-pointer px-4 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2 hover:bg-[#00F3FF]/20 hover:border-[#00F3FF] transition-colors text-xs font-mono uppercase text-gray-300 hover:text-[#00F3FF]">
                                     <ImagePlus size={16} /> Attach Photos
                                     <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageSelect} />
                                 </label>
                                 <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{attachments.length}/2 Uplinked (Max 2MB)</span>
                             </div>
                             <div className="flex gap-2">
                                 {attachments.map((file, i) => (
                                     <span key={i} className="text-[10px] px-2 py-1 bg-gray-800 rounded text-gray-300 truncate max-w-[100px]">{file.name}</span>
                                 ))}
                             </div>
                         </div>
                     </div>
                     <button onClick={handleCreateThread} disabled={isSubmitting || !newTitle.trim() || !newContent.trim()} className={`w-full py-6 font-black uppercase tracking-[0.2em] text-sm rounded-xl flex items-center justify-center gap-3 transition-all duration-300 ${(!newTitle.trim() || !newContent.trim()) ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-[#00F3FF] text-black hover:bg-white shadow-[0_0_40px_rgba(0,243,255,0.4)] hover:scale-[1.02]'}`}>
                         {isSubmitting ? 'ENCRYPTING & TRANSMITTING...' : <><Send size={20} /> SECURE DEPLOYMENT</>}
                     </button>
                 </div>
             ) : phase === 'SECTORS' || phase === 'DASHBOARD' ? (
                 
                 // THREAD LIST (SECTORS OR DASHBOARD)
                 <div className="space-y-5 animate-in fade-in">
                    {(phase === 'DASHBOARD' ? myThreads : liveThreads).length === 0 ? (
                      <div className="text-center py-24 text-gray-500 font-mono text-sm uppercase tracking-widest border-2 border-dashed border-white/10 rounded-3xl bg-black/50">
                        No active transmissions found.
                      </div>
                    ) : (
                      (phase === 'DASHBOARD' ? myThreads : liveThreads).map((thread) => (
                        <div key={thread.id} onClick={() => openThread(thread)} className="p-6 border rounded-2xl transition-all duration-300 flex justify-between items-center group cursor-pointer shadow-md bg-black border-white/20 hover:border-[#00F3FF]/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)] relative">
                           <div className="flex-1 pr-6">
                             <div className="flex items-center gap-3 mb-3">
                                {thread.isMasterPinned && <Crown size={18} className="text-[#00F3FF] shrink-0 drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" />}
                                {thread.isPinned && !thread.isMasterPinned && <Pin size={18} className="text-[#FFD700] fill-[#FFD700] shrink-0 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" />}
                                {thread.isLocked && <Lock size={18} className="text-red-500 shrink-0" />}
                                <h4 className={`font-bold text-lg md:text-xl transition-colors leading-tight ${phase === 'DASHBOARD' ? 'text-[#FFD700]' : 'text-white group-hover:text-[#00F3FF]'}`}>{thread.title}</h4>
                             </div>
                             <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono uppercase tracking-widest">
                                 <img src={operativeAvatar} alt="Avatar" onError={(e) => { e.currentTarget.src = DEFAULT_AVATAR; }} className="w-14 h-14 rounded-full border-2 border-[#00F3FF] object-cover bg-black" />
                                 <span className="text-gray-400 flex items-center gap-2"><span className="text-white font-bold">{thread.authorName}</span></span>
                                 <span className="text-gray-700">|</span>
                                 <span className="px-3 py-1 rounded font-bold bg-[#00F3FF]/10 text-[#00F3FF] border border-[#00F3FF]/30">{thread.authorTier}</span>
                                 {phase === 'DASHBOARD' && <span className="text-gray-600">| {thread.category}</span>}
                             </div>
                           </div>
                           
                           {/* Master Terminate Control */}
                           {(phase === 'DASHBOARD' || isCommander) && (
                             <button onClick={(e) => handleDeleteThread(thread.id, e)} className="absolute top-4 right-4 p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors z-20">
                               <Trash2 size={16} />
                             </button>
                           )}

                           <div className="text-center pl-6 border-l border-white/10 shrink-0 min-w-[100px]">
                             <div className="text-3xl font-black text-white group-hover:text-[#00F3FF] transition-colors">{thread.replies || 0}</div>
                             <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">Replies</div>
                           </div>
                        </div>
                      ))
                    )}
                 </div>
             ) : phase === 'THREAD_VIEW' && selectedThread ? (
                 
                 // ACTIVE THREAD DETAIL
                 <div className="animate-in slide-in-from-right-4 duration-300">
                    <button onClick={() => { setPhase(myThreads.some(t => t.id === selectedThread.id) ? 'DASHBOARD' : 'SECTORS'); setSelectedThread(null); setEditingId(null); }} className="flex items-center gap-2 text-[#00F3FF] hover:text-white font-mono text-xs uppercase tracking-widest transition-colors mb-6 font-bold">
                       <ArrowLeft size={16} /> Return
                    </button>

                    {/* Original Post */}
                    <div className="bg-black border border-[#00F3FF]/30 p-8 rounded-2xl shadow-[0_0_30px_rgba(0,243,255,0.1)] relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><ShieldCheck size={120} /></div>
                       
                       {/* God Mode Edit/Delete Controls - HOVER FRICTION REMOVED */}
                       {(selectedThread.authorUid === user.uid || isCommander) && (
                           <div className="absolute top-4 right-4 flex gap-2 z-20">
                               {isCommander && (
                                  <>
                                    <span className="text-[9px] font-mono text-red-500 font-bold tracking-widest uppercase mr-2 self-center animate-pulse">OVERRIDE ACTIVE</span>
                                    <button onClick={(e) => handleToggleMasterPin(selectedThread, e)} className={`p-2 rounded transition-colors ${selectedThread.isMasterPinned ? 'bg-[#00F3FF]/20 text-[#00F3FF]' : 'bg-white/10 text-white hover:text-[#00F3FF]'}`} title="Toggle Master Priority"><Crown size={16}/></button>
                                    <button onClick={(e) => handleTogglePin(selectedThread, e)} className={`p-2 rounded transition-colors ${selectedThread.isPinned ? 'bg-[#FFD700]/20 text-[#FFD700]' : 'bg-white/10 text-white hover:text-[#FFD700]'}`} title="Toggle Pin"><Pin size={16}/></button>
                                    <button onClick={(e) => handleToggleLock(selectedThread, e)} className={`p-2 rounded transition-colors ${selectedThread.isLocked ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-white hover:text-red-500'}`} title="Toggle Lock"><Lock size={16}/></button>
                                  </>
                               )}
                               <button onClick={() => { setEditingId(selectedThread.id); setEditContent(selectedThread.content); setEditCategory(selectedThread.category); }} className="p-2 bg-white/10 text-white hover:text-[#00F3FF] rounded" title="Edit Thread"><Edit3 size={16}/></button>
                               <button onClick={(e) => handleDeleteThread(selectedThread.id, e as any)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded" title="Terminate Thread"><Trash2 size={16}/></button>
                           </div>
                       )}

                       <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest mb-4 relative z-10 leading-tight pr-16">{selectedThread.title}</h2>
                       <div className="flex flex-wrap items-center gap-4 text-[10px] md:text-xs font-mono text-gray-400 mb-8 border-b border-white/10 pb-6 relative z-10">
                         <img src={selectedThread.authorPhoto || DEFAULT_AVATAR} alt="OP" onError={(e) => { e.currentTarget.src = DEFAULT_AVATAR; }} className="w-8 h-8 rounded-full border border-[#00F3FF] bg-black" />
                         <span className="text-[#00F3FF] font-bold">OP: {selectedThread.authorName}</span>
                         <span className="hidden md:inline">|</span>
                         <span className="bg-white/10 px-2 py-1 rounded text-white border border-white/20">TIER: {selectedThread.authorTier}</span>
                         <span className="hidden md:inline">|</span>
                         <span>{selectedThread.createdAt?.toDate().toLocaleString() || 'TRANSMITTING...'}</span>
                       </div>
                       
                       {editingId === selectedThread.id ? (
                           <div className="relative z-10 space-y-4">
                               {isCommander && (
                                   <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)} className="w-full bg-black border border-red-500 text-red-500 p-3 rounded font-mono text-xs font-bold tracking-widest uppercase outline-none mb-2">
                                       {categories.map(c => <option key={c.id} value={c.id}>SHIFT SECTOR: {c.name}</option>)}
                                   </select>
                               )}
                               <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={6} className="w-full bg-[#020202] border border-[#00F3FF] rounded p-4 text-white font-mono text-sm outline-none focus:ring-2 focus:ring-[#00F3FF]/50 resize-none" />
                               <div className="flex gap-3">
                                   <button onClick={() => handleEditSubmit('forum_threads', selectedThread.id)} className="px-4 py-2 bg-[#00F3FF] text-black font-bold uppercase text-xs rounded hover:bg-white">SAVE UPDATE</button>
                                   <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-gray-800 text-gray-300 font-bold uppercase text-xs rounded hover:bg-gray-700">CANCEL</button>
                               </div>
                           </div>
                       ) : (
                           <p style={{ fontSize: `${1 * fontScale}rem` }} className={`text-gray-100 ${userFont} leading-loose whitespace-pre-wrap relative z-10`}>{selectedThread.content}</p>
                       )}
                    </div>

                    {/* Replies Feed */}
                    <div className="space-y-4 mt-8">
                       <h3 className="text-sm font-bold text-[#00F3FF] uppercase tracking-widest border-l-2 border-[#00F3FF] pl-4 mb-6">Encrypted Replies ({replies.length})</h3>
                       {replies.map(reply => (
                         <div key={reply.id} className="bg-[#050505] border border-white/10 p-6 rounded-xl relative group hover:border-white/30 transition-colors">
                            
                            {(reply.authorUid === user.uid || isCommander) && (
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                    <button onClick={() => { setEditingId(reply.id); setEditContent(reply.content); }} className="p-1.5 bg-white/10 text-white hover:text-[#00F3FF] rounded"><Edit3 size={14}/></button>
                                    <button onClick={() => handleDeleteReply(reply.id, selectedThread.id)} className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded"><Trash2 size={14}/></button>
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-4 pr-12">
                               <div className="flex items-center gap-3">
                                 <img src={reply.authorPhoto || DEFAULT_AVATAR} alt="OP" onError={(e) => { e.currentTarget.src = DEFAULT_AVATAR; }} className="w-6 h-6 rounded-full border border-gray-600 bg-black" />
                                 <span className="text-white font-mono text-xs font-bold uppercase tracking-widest">{reply.authorName}</span>
                                 <span className="text-[#00F3FF] font-mono text-[9px] uppercase bg-[#00F3FF]/10 border border-[#00F3FF]/30 px-2 py-0.5 rounded">{reply.authorTier}</span>
                               </div>
                               <span className="text-gray-600 text-[10px] font-mono">{reply.createdAt?.toDate().toLocaleString() || 'NOW'}</span>
                            </div>
                            
                            {editingId === reply.id ? (
                                <div className="space-y-3 mt-2">
                                    <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={3} className="w-full bg-[#020202] border border-[#00F3FF] rounded p-3 text-white font-mono text-sm outline-none resize-none" />
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEditSubmit('forum_replies', reply.id)} className="px-3 py-1.5 bg-[#00F3FF] text-black font-bold uppercase text-[10px] rounded hover:bg-white">SAVE UPDATE</button>
                                        <button onClick={() => setEditingId(null)} className="px-3 py-1.5 bg-gray-800 text-gray-300 font-bold uppercase text-[10px] rounded hover:bg-gray-700">CANCEL</button>
                                    </div>
                                </div>
                            ) : (
                                <p style={{ fontSize: `${0.95 * fontScale}rem` }} className={`text-gray-200 ${userFont} leading-relaxed whitespace-pre-wrap mt-3`}>{reply.content}</p>
                            )}
                         </div>
                       ))}
                    </div>

                    {/* Reply Input */}
                    {selectedThread.isLocked && !isCommander ? (
                       <div className="mt-10 p-8 border-2 border-red-500/30 bg-red-500/5 rounded-xl flex flex-col items-center justify-center text-center">
                           <Lock size={32} className="text-red-500 mb-4" />
                           <h3 className="text-xl font-black text-red-500 uppercase tracking-widest mb-2">THREAD LOCKED</h3>
                           <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">The Architect has sealed this transmission. No further intelligence may be appended.</p>
                       </div>
                    ) : (
                       <div className="mt-10 bg-black/50 border border-white/20 p-6 rounded-xl relative">
                          {selectedThread.isLocked && isCommander && (
                              <div className="absolute -top-3 left-6 bg-red-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-black shadow-[0_0_10px_rgba(255,0,0,0.5)]">COMMANDER OVERRIDE: REPLYING TO LOCKED THREAD</div>
                          )}
                          <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Transmit intelligence reply..."
                            rows={4}
                            style={{ fontSize: `${0.875 * fontScale}rem` }}
                            className={`w-full bg-[#020202] border border-white/10 rounded-xl p-5 text-white ${userFont} outline-none focus:border-[#00F3FF] transition-colors resize-none mb-4 shadow-inner`}
                          />
                          <button
                            onClick={handlePostReply}
                            disabled={isSubmitting || !replyContent.trim()}
                            className={`px-8 py-4 font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-3 transition-all w-full md:w-auto ${!replyContent.trim() ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-[#00F3FF] text-black hover:bg-white shadow-[0_0_30px_rgba(0,243,255,0.4)] hover:scale-105'}`}
                          >
                            {isSubmitting ? 'ENCRYPTING...' : <><Send size={18}/> TRANSMIT REPLY</>}
                          </button>
                       </div>
                    )}
                 </div>
             ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};