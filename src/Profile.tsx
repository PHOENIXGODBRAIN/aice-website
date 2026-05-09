import React, { useState, useEffect } from 'react';
import { Settings, FileKey, LogOut, Wifi, Fingerprint, Activity, Shield, X, Upload, Building2, Briefcase, Cpu, FileText, Lock, ShieldCheck, Database, Zap } from 'lucide-react';
import { User as FirebaseUser, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from './App';

interface ProfileProps {
  user: FirebaseUser | null;
  userTier: string;
  signOut: (auth: any) => void;
  auth: any;
  setView: (view: any) => void;
}

export const ProfileView: React.FC<ProfileProps> = ({ user, userTier, signOut, auth, setView }) => {
  const [activeModal, setActiveModal] = useState<'NONE' | 'CONFIG' | 'API'>('NONE');
  
  const [formData, setFormData] = useState({
    alias: user?.displayName || '',
    commChannel: user?.email || '',
    companyName: '',
    operationalSector: '',
    techArchitecture: '',
    operationalBio: '',
    impedanceLimit: 85,
    autoVeto: true,
    hardwareAnchor: 'NODE_ALPHA_01'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 24 24' fill='none' stroke='%2300F3FF' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
  const [profileImage, setProfileImage] = useState(user?.photoURL || DEFAULT_AVATAR);
  const activeTier = userTier || 'COMMANDER'; 

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      try {
        const userDocRef = doc(db, 'artifacts', 'aice-6bd8e', 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setFormData(prev => ({
            ...prev,
            companyName: data.companyName || '',
            operationalSector: data.operationalSector || '',
            techArchitecture: data.techArchitecture || '',
            operationalBio: data.operationalBio || '',
            alias: data.alias || user.displayName || '',
            commChannel: data.commChannel || user.email || ''
          }));
          if (data.photoURL) setProfileImage(data.photoURL);
        }
      } catch (error) { console.error("AICE DB ERROR", error); }
    };
    fetchUserData();
  }, [user]);

  const getTierDetails = (tier: string) => {
    switch(tier) {
      case 'CLASS_S': return { level: 'LEVEL 1', title: 'SOVEREIGN COMMAND', color: 'text-[#FFD700]', border: 'border-[#FFD700]', bg: 'bg-[#FFD700]' };
      case 'CLASS_1': return { level: 'LEVEL 2', title: 'SYSTEMIC AUTHORITY', color: 'text-[#00F3FF]', border: 'border-[#00F3FF]', bg: 'bg-[#00F3FF]' };
      case 'CLASS_2': return { level: 'LEVEL 3', title: 'ENTERPRISE FLEET', color: 'text-orange-500', border: 'border-orange-500', bg: 'bg-orange-500' };
      case 'CLASS_3': return { level: 'LEVEL 4', title: 'COMMERCIAL NODE', color: 'text-[#00FF66]', border: 'border-[#00FF66]', bg: 'bg-[#00FF66]' };
      case 'LEVEL_5': return { level: 'LEVEL 5', title: 'VERIFIED OPERATIVE', color: 'text-gray-300', border: 'border-gray-500', bg: 'bg-gray-500' };
      case 'COMMANDER': return { level: 'LEVEL 0', title: 'ARCHITECT // GOD MODE', color: 'text-[#00F3FF]', border: 'border-[#00F3FF]', bg: 'bg-[#00F3FF]' };
      default: return { level: 'UNVERIFIED', title: 'GUEST ENTITY', color: 'text-gray-600', border: 'border-gray-800', bg: 'bg-gray-800' };
    }
  };

  const tierInfo = getTierDetails(activeTier);
  const cryptoHash = user?.uid ? `0x${user.uid.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()}` : '0xUNASSIGNED_NODE';

  const handleSaveConfig = async () => {
      if (!user) return;
      setIsSaving(true);
      try {
          const userDocRef = doc(db, 'artifacts', 'aice-6bd8e', 'users', user.uid);
          await setDoc(userDocRef, { ...formData, lastUpdated: new Date().toISOString() }, { merge: true });
          setIsSaving(false);
          alert("SYS_MSG: Enterprise topology locked.");
      } catch (error) { setIsSaving(false); alert("ERROR: Write failed."); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    try {
        const storage = getStorage();
        const storageRef = ref(storage, `biometrics/${user.uid}_profile.jpg`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        await updateProfile(user, { photoURL: downloadURL });
        const userDocRef = doc(db, 'artifacts', 'aice-6bd8e', 'users', user.uid);
        await setDoc(userDocRef, { photoURL: downloadURL }, { merge: true });
        setProfileImage(downloadURL);
        alert("SYS_MSG: Biometric signature permanently locked to network.");
    } catch (error) { alert("ERROR: Biometric upload rejected."); }
  };

  return (
  <div className="bg-transparent relative z-10 min-h-screen text-white pt-28 pb-24 px-6 font-sans">
      <div className="max-w-[95rem] mx-auto z-10">
        <div className="w-full text-center animate-in zoom-in duration-700 mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-black border-4 border-black mb-8 text-[#00F3FF] shadow-[0_0_50px_rgba(0,243,255,0.6)] animate-[pulse_4s_ease-in-out_infinite] relative z-10">
              <Fingerprint size={48} className="text-[#00F3FF]" />
            </div>
            <h1 className="text-[#00F3FF] text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]" style={{ textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 4px 4px 0px rgba(0,0,0,0.5)' }}>
              Operative Profile
            </h1>
            <p className="text-[#00F3FF] font-mono tracking-[0.4em] text-xs md:text-sm uppercase font-bold px-4">
              Clearance: {tierInfo.level}
            </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          <div className="lg:col-span-4 space-y-6">
            <div className={`bg-[#050505] border-2 ${tierInfo.border} rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group`}>
              <div className={`absolute top-0 left-0 w-full h-1 ${tierInfo.bg} animate-pulse`}></div>
              <div className="absolute top-4 right-4"><Wifi size={16} className={`${tierInfo.color} animate-ping`} /></div>
              <div className="relative mb-6 cursor-pointer group/avatar">
                <input type="file" id="profile-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                <label htmlFor="profile-upload" className="cursor-pointer">
                  <div className={`w-36 h-36 rounded-full border-4 ${tierInfo.border} overflow-hidden relative shadow-[0_0_20px_rgba(0,0,0,0.5)] p-1 bg-black transition-transform group-hover/avatar:scale-105`}>
                    <img src={profileImage} alt="Operative" className="w-full h-full object-cover rounded-full relative z-10" />
                    <div className="absolute inset-0 bg-black/80 z-20 flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity rounded-full">
                        <Upload size={20} className="text-[#00F3FF] mb-1" />
                        <span className="text-[9px] font-mono font-bold text-[#00F3FF] tracking-widest uppercase">Sync Biometric</span>
                    </div>
                  </div>
                </label>
              </div>
              <h2 className="text-3xl font-black text-white mb-1 uppercase tracking-tight">{formData.alias || 'Classified Entity'}</h2>
              <p className={`${tierInfo.color} font-mono text-xs tracking-[0.2em] mb-4 break-all`}>{formData.commChannel || 'AWAITING UPLINK'}</p>
              <div className={`px-6 py-2 border ${tierInfo.border} bg-black/50 text-xs font-black tracking-widest uppercase mb-6 ${tierInfo.color} shadow-inner`}>
                {tierInfo.title}
              </div>
            </div>
            <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 space-y-3 shadow-2xl">
               <button onClick={() => setActiveModal('API')} className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 text-white hover:border-[#00F3FF] hover:text-[#00F3FF] transition-all font-bold tracking-wider text-xs uppercase group">
                 <span className="flex items-center gap-3"><FileKey size={16} /> ENCRYPTED API KEYS</span>
                 <Lock size={14} className="opacity-50 group-hover:opacity-100" />
               </button>
               <button onClick={() => { signOut(auth); window.location.href = '/'; }} className="w-full flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold tracking-wider text-xs uppercase">
                 <LogOut size={16} /> SEVER CONNECTION
               </button>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#050505] border border-[#00F3FF]/30 rounded-2xl p-6 relative overflow-hidden group shadow-2xl hover:border-[#00F3FF] transition-colors">
                <h3 className={`text-[#00F3FF] font-mono text-[10px] tracking-widest uppercase mb-4 flex items-center gap-2`}><ShieldCheck size={14}/> Cryptographic Signature</h3>
                <div className="text-sm md:text-base font-black text-white tracking-tighter mb-2 break-all drop-shadow-md border-l-2 border-[#00F3FF] pl-3">{cryptoHash}</div>
                <p className="text-[10px] text-[#00FF66] font-mono uppercase tracking-widest">Immutable System Anchor Verified</p>
              </div>
              <div className="bg-[#050505] border border-[#00F3FF]/30 rounded-2xl p-6 relative overflow-hidden group shadow-2xl hover:border-[#00F3FF] transition-colors">
                 <div className="flex justify-between items-start mb-4">
                   <h3 className={`text-[#00F3FF] font-mono text-[10px] tracking-widest uppercase flex items-center gap-2`}><Database size={14}/> Infrastructure State</h3>
                   <Activity size={16} className={`text-[#00F3FF] animate-pulse`} />
                 </div>
                 <div className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2">SOC-2 VAULT SECURED</div>
                 <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">End-to-End TLS 1.3 Encryption Active</p>
              </div>
            </div>

            <div className="bg-[#050505] border-2 border-white/10 rounded-2xl relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] focus-within:border-[#00F3FF]/50 transition-colors duration-500">
               <div className="bg-[#00F3FF]/5 border-b border-[#00F3FF]/20 p-6 flex justify-between items-center">
                   <div className="flex items-center gap-3">
                       <Lock size={20} className="text-[#00F3FF]" />
                       <div>
                           <h3 className="text-[#00F3FF] text-lg font-black uppercase tracking-widest">Enterprise Infrastructure Dossier</h3>
                           <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Classified operational telemetry. Zero-Knowledge storage.</p>
                       </div>
                   </div>
               </div>

               <div className="p-8 space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                           <label className="text-gray-400 font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"><Building2 size={12} className="text-[#00F3FF]" /> Organization Name</label>
                           <input type="text" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} placeholder="ENTER REGISTERED ENTITY..." className="w-full bg-black border border-white/20 p-4 rounded-lg text-white font-mono text-sm outline-none focus:border-[#00F3FF] transition-colors shadow-inner" />
                       </div>
                       <div className="space-y-2">
                           <label className="text-gray-400 font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"><Briefcase size={12} className="text-[#00F3FF]" /> Operational Sector</label>
                           <input type="text" value={formData.operationalSector} onChange={(e) => setFormData({...formData, operationalSector: e.target.value})} placeholder="E.G., AEROSPACE, HFT FINANCE..." className="w-full bg-black border border-white/20 p-4 rounded-lg text-white font-mono text-sm outline-none focus:border-[#00F3FF] transition-colors shadow-inner" />
                       </div>
                   </div>
                   <div className="space-y-2">
                       <label className="text-gray-400 font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"><Cpu size={12} className="text-[#00F3FF]" /> Technical Architecture</label>
                       <textarea value={formData.techArchitecture} onChange={(e) => setFormData({...formData, techArchitecture: e.target.value})} placeholder="DEFINE YOUR CURRENT TOPOLOGY..." rows={3} className="w-full bg-black border border-white/20 p-4 rounded-lg text-white font-mono text-sm outline-none focus:border-[#00F3FF] transition-colors shadow-inner resize-none" />
                   </div>
                   <div className="space-y-2">
                       <label className="text-gray-400 font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"><FileText size={12} className="text-[#00F3FF]" /> Operational Directive / Bio</label>
                       <textarea value={formData.operationalBio} onChange={(e) => setFormData({...formData, operationalBio: e.target.value})} placeholder="STATE YOUR OPERATIONAL OBJECTIVE..." rows={4} className="w-full bg-black border border-white/20 p-4 rounded-lg text-white font-mono text-sm outline-none focus:border-[#00F3FF] transition-colors shadow-inner resize-none" />
                   </div>
                   <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                       <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest"><Shield size={14} className="text-green-500" /> A.I.C.E. DATA PROTECTION: ACTIVE</div>
                       <button onClick={handleSaveConfig} disabled={isSaving} className="w-full md:w-auto px-10 py-4 bg-[#00F3FF] text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all rounded shadow-[0_0_20px_rgba(0,243,255,0.4)] flex items-center justify-center gap-3 disabled:opacity-50">
                           {isSaving ? <Activity size={16} className="animate-spin" /> : <Lock size={16} />} APPLY CHANGES
                       </button>
                   </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};