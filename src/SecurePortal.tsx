import React, { useEffect, useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { CheckCircle2, AlertTriangle, Loader2, ShieldCheck } from "lucide-react";

type VerifyResult = {
  verified: boolean;
  status: string;
};

export default function SecurePortal() {
  const [state, setState] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying cryptographic signature...");

  useEffect(() => {
    const run = async () => {
      const sessionId = new URLSearchParams(window.location.search).get("session_id");

      if (!sessionId) {
        setState("error");
        setMessage("Missing Stripe session ID.");
        return;
      }

      try {
        const verifySession = httpsCallable<{ sessionId: string }, VerifyResult>(
          getFunctions(),
          "verifySession"
        );

        const result = await verifySession({ sessionId });

        if (result.data?.verified) {
          setState("success");
          setMessage("Payment verified. Intake clearance granted.");
          return;
        }

        setState("error");
        setMessage("Payment could not be verified by the authoritative ledger.");
      } catch (err: any) {
        console.error("verifySession failed:", err);
        setState("error");
        setMessage(err?.message || "Session verification failed.");
      }
    };

    run();
  }, []);

  return (
    <div className="relative z-10 pt-28 pb-24 px-6 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full bg-[#050505] border border-[#00F3FF]/30 rounded-[2rem] p-10 md:p-16 text-center shadow-[0_0_50px_rgba(0,243,255,0.1)]">
        {state === "loading" && (
          <>
            <Loader2 className="mx-auto mb-8 animate-spin text-[#00F3FF]" size={64} />
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-widest mb-4 text-white">Secure Portal</h1>
            <p className="text-[#00F3FF] font-mono tracking-widest uppercase text-sm animate-pulse">{message}</p>
          </>
        )}

        {state === "success" && (
          <>
            <CheckCircle2 className="mx-auto mb-8 text-[#00FF66] drop-shadow-[0_0_15px_rgba(0,255,102,0.5)]" size={64} />
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-widest mb-4 text-white">Payment Verified</h1>
            <p className="text-gray-300 mb-8 font-light text-lg">{message}</p>
            <div className="inline-flex items-center gap-3 border border-[#00FF66]/50 bg-[#00FF66]/10 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(0,255,102,0.2)]">
              <ShieldCheck size={20} className="text-[#00FF66]" />
              <span className="text-sm font-mono uppercase tracking-[0.2em] font-bold text-[#00FF66]">
                CLEARED_FOR_INTAKE
              </span>
            </div>
          </>
        )}

        {state === "error" && (
          <>
            <AlertTriangle className="mx-auto mb-8 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" size={64} />
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-widest mb-4 text-white">Verification Failed</h1>
            <p className="text-gray-300 mb-8 font-light text-lg">{message}</p>
            <button
              onClick={() => (window.location.href = "/acquisition")}
              className="px-8 py-4 bg-white text-black rounded-xl font-black uppercase tracking-[0.2em] hover:bg-[#00F3FF] transition-colors"
            >
              Return To Sales
            </button>
          </>
        )}
      </div>
    </div>
  );
}