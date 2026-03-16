"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function SistemPage() {
  const [ipk, setIpk] = useState<string>("");
  const [sks, setSks] = useState<string>("");
  const [result, setResult] = useState<{ nilai_kelayakan: number; status_kelayakan: string } | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showIpkError, setShowIpkError] = useState(false);
  const [showSksError, setShowSksError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setShowIpkError(false);
    setShowSksError(false);

    if (!ipk) {
      setShowIpkError(true);
      return;
    }
    if (!sks) {
      setShowSksError(true);
      return;
    }

    const ipkNum = parseFloat(ipk);
    const sksNum = parseInt(sks, 10);

    if (isNaN(ipkNum) || ipkNum < 0 || ipkNum > 4) {
      setError("IPK harus berupa angka antara 0.00 dan 4.00");
      return;
    }
    if (isNaN(sksNum) || sksNum < 0 || sksNum > 24) {
      setError("SKS harus berupa angka antara 0 dan 24");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/sistem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ipk: ipkNum, sks: sksNum }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Terjadi kesalahan saat memproses data");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Gagal terhubung ke server backend. Pastikan server FastAPI sedang berjalan di port 8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950 selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Background Architecture */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] brightness-100 contrast-150" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Colorful Soft Glows */}
        <div className="absolute top-[-10%] left-[-10%] h-[800px] w-[800px] rounded-full bg-blue-100/40 blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[-5%] h-[600px] w-[600px] rounded-full bg-violet-100/30 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] h-[700px] w-[700px] rounded-full bg-emerald-50/40 blur-[130px]" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-48 pb-20 px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 rounded-full px-5 py-2 text-[10px] md:text-xs font-black tracking-widest uppercase text-blue-600 border-2 border-blue-600/10 bg-blue-50/50 backdrop-blur-sm mb-8 shadow-inner">
                VALIDASI BERBASIS AI
              </div>
              
              <h1 className="text-5xl font-[1000] tracking-[-0.04em] leading-[0.9] sm:text-7xl md:text-8xl lg:text-9xl mb-8">
                Sistem <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700">Validasi</span> <br /> 
                <span className="relative inline-block mt-2">
                  Mandiri
                </span>
              </h1>
              
              <p className="max-w-xl text-lg md:text-xl leading-relaxed text-slate-500 font-medium mb-10 px-4 lg:px-0">
                Masukkan parameter IPK dan rencana SKS Anda untuk mendapatkan rekomendasi kelayakan berbasis Logika Fuzzy Mamdani secara instan.
              </p>
            </div>

            <div className="flex-1 relative w-full max-w-lg lg:max-w-2xl">
              {/* Glass Card Container */}
              <div className="relative p-1 md:p-2">
                <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full animate-pulse" />
                
                <div className="relative rounded-[2.5rem] md:rounded-[4rem] border border-white/60 bg-white/40 backdrop-blur-3xl shadow-2xl p-8 md:p-12">
                  <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-slate-950 mb-8 border-b-4 border-slate-950/5 pb-6">
                    FORM <span className="text-blue-600">VALIDASI</span>
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                    <div className="space-y-3 relative group">
                      <label htmlFor="ipk" className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                        IPK Saat Ini (0.00 - 4.00)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        id="ipk"
                        value={ipk}
                        onChange={(e) => {
                          setIpk(e.target.value);
                          if (e.target.value) setShowIpkError(false);
                        }}
                        className={`w-full px-6 py-5 rounded-2xl md:rounded-3xl bg-white border-2 text-slate-950 font-bold text-lg md:text-xl focus:outline-none transition-all placeholder:text-slate-200 ${
                          showIpkError ? 'border-red-500 animate-shake' : 'border-slate-100 focus:border-blue-600'
                        }`}
                        placeholder="Misal: 3.50"
                        required
                      />
                      {/* Custom Tooltip */}
                      <div className={`absolute -top-2 right-0 text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-xl transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-2xl z-20 uppercase ${
                        showIpkError ? 'bg-red-600 opacity-100 translate-y-0' : 'bg-slate-950 opacity-0 group-hover:opacity-100'
                      }`}>
                        {showIpkError ? 'Wajib diisi!' : 'Input Nilai IPK Anda'}
                        <div className={`absolute -bottom-1 right-6 w-2 h-2 rotate-45 ${showIpkError ? 'bg-red-600' : 'bg-slate-950'}`} />
                      </div>
                    </div>

                    <div className="space-y-3 relative group">
                      <label htmlFor="sks" className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                        Rencana Jumlah SKS (0 - 24)
                      </label>
                      <input
                        type="number"
                        id="sks"
                        value={sks}
                        onChange={(e) => {
                          setSks(e.target.value);
                          if (e.target.value) setShowSksError(false);
                        }}
                        className={`w-full px-6 py-5 rounded-2xl md:rounded-3xl bg-white border-2 text-slate-950 font-bold text-lg md:text-xl focus:outline-none transition-all placeholder:text-slate-200 ${
                          showSksError ? 'border-red-500 animate-shake' : 'border-slate-100 focus:border-blue-600'
                        }`}
                        placeholder="Misal: 20"
                        required
                      />
                      {/* Custom Tooltip */}
                      <div className={`absolute -top-2 right-0 text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-xl transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-2xl z-20 uppercase ${
                        showSksError ? 'bg-red-600 opacity-100 translate-y-0' : 'bg-slate-950 opacity-0 group-hover:opacity-100'
                      }`}>
                        {showSksError ? 'Wajib diisi!' : 'Input Rencana SKS'}
                        <div className={`absolute -bottom-1 right-6 w-2 h-2 rotate-45 ${showSksError ? 'bg-red-600' : 'bg-slate-950'}`} />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-5 md:py-8 rounded-2xl md:rounded-3xl bg-slate-950 text-white font-black text-xl md:text-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all disabled:bg-slate-400 disabled:translate-y-0"
                    >
                      {loading ? "MEMPROSES..." : "VALIDASI SEKARANG"}
                    </button>
                  </form>

                  {error && (
                    <div className="mt-8 p-6 rounded-2xl md:rounded-3xl bg-red-50 border-2 border-red-100 text-red-600 font-bold text-center">
                      {error}
                    </div>
                  )}

                  {result && (
                    <div className="mt-8 space-y-6 animate-fade-in">
                      <div className="p-8 rounded-[2rem] md:rounded-[3rem] bg-slate-950 text-white text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600/20 blur-2xl" />
                        <div className="relative z-10">
                          <p className="text-xs font-black tracking-widest uppercase text-slate-400 mb-2">Skor Kelayakan</p>
                          <p className="text-6xl md:text-8xl font-[1000] tracking-tighter text-blue-400">{result?.nilai_kelayakan}</p>
                          
                          <div className={`mt-6 inline-block px-8 py-3 rounded-full font-black text-sm md:text-base tracking-widest uppercase ${
                            result?.status_kelayakan === 'Layak' ? 'bg-emerald-500 text-white' : 
                            result?.status_kelayakan === 'Dipertimbangkan' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                          }`}>
                            {result?.status_kelayakan}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .animate-fade-in { animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
}
