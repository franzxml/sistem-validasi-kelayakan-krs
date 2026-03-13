"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [ipk, setIpk] = useState<string>("");
  const [sks, setSks] = useState<string>("");
  const [result, setResult] = useState<{ nilai_kelayakan: number; status_kelayakan: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [thinkingText, setThinkingText] = useState("MENGANALISIS...");
  const [showIpkError, setShowIpkError] = useState(false);
  const [showSksError, setShowSksError] = useState(false);

  useEffect(() => {
    const texts = ["MENGANALISIS...", "MENGHITUNG...", "MEMPROSES...", "MEMVALIDASI...", "MENGOPTIMALKAN..."];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setThinkingText(texts[i]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    if (isNaN(ipkNum) || isNaN(sksNum)) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/sistem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ipk: ipkNum, sks: sksNum }),
      });
      const data = await response.json();
      if (response.ok) setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-64 lg:pb-48 px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 rounded-full px-5 py-2 text-[10px] md:text-xs font-black tracking-widest uppercase text-blue-600 border-2 border-blue-600/10 bg-blue-50/50 backdrop-blur-sm mb-8 md:mb-12 shadow-inner">
              Sistem Validasi Cerdas
            </div>
            
            <h1 className="text-5xl font-[1000] tracking-[-0.04em] leading-[0.9] sm:text-7xl md:text-8xl lg:text-9xl mb-8 md:mb-12">
              Validasi <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700">KRS</span> <br /> 
              <span className="relative inline-block mt-2">
                Lebih Cepat
              </span>
            </h1>
            
            <p className="max-w-xl text-lg md:text-xl leading-relaxed text-slate-500 font-medium mb-10 md:mb-16 px-4 lg:px-0">
              Platform validasi kelayakan KRS otomatis menggunakan Logika Fuzzy Mamdani untuk memastikan rencana studi Anda optimal.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 justify-center lg:justify-start">
              <Link href="/sistem" className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-3xl bg-blue-600 text-white font-black text-lg md:text-xl shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:shadow-[0_30px_70px_rgba(37,99,235,0.5)] hover:-translate-y-2 transition-all duration-500 text-center">
                Mulai Validasi
              </Link>
              <Link href="#fitur" className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-3xl bg-white text-slate-950 font-black text-lg md:text-xl border-2 md:border-4 border-slate-50 hover:bg-slate-50 transition-all duration-500 text-center shadow-sm">
                Pelajari Fitur
              </Link>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-lg lg:max-w-2xl mt-12 lg:mt-0">
            <div className="relative aspect-square">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-[60px] md:blur-[100px] animate-pulse" />
              
              {/* Glass Card - Form / Result */}
              <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[4rem] border border-white/40 bg-white/20 backdrop-blur-3xl shadow-2xl p-4 md:p-8 rotate-3 animate-float overflow-hidden">
                {!result && !loading ? (
                  <div className="h-full w-full flex flex-col justify-center p-4 md:p-8 space-y-6">
                    <h3 className="text-xl md:text-2xl font-black tracking-tighter text-slate-950">CEK CEPAT</h3>
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                      <div className="relative group">
                        <input 
                          type="number" 
                          placeholder="IPK (e.g. 3.50)" 
                          value={ipk}
                          onChange={(e) => {
                            setIpk(e.target.value);
                            if (e.target.value) setShowIpkError(false);
                          }}
                          className={`w-full p-4 rounded-2xl bg-white/50 border text-slate-950 font-bold outline-none transition-all ${
                            showIpkError ? 'border-red-500 animate-shake bg-white' : 'border-white/60 focus:bg-white'
                          }`}
                          required
                        />
                        <div className={`absolute -top-10 left-0 text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-xl transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-2xl z-20 whitespace-nowrap uppercase ${
                          showIpkError ? 'bg-red-600 opacity-100 translate-y-0' : 'bg-slate-950 opacity-0 group-hover:opacity-100'
                        }`}>
                          {showIpkError ? 'WAJIB DIISI!' : 'ISI IPK ANDA'}
                          <div className={`absolute -bottom-1 left-4 w-2 h-2 rotate-45 ${showIpkError ? 'bg-red-600' : 'bg-slate-950'}`} />
                        </div>
                      </div>
                      <div className="relative group">
                        <input 
                          type="number" 
                          placeholder="SKS (e.g. 20)" 
                          value={sks}
                          onChange={(e) => {
                            setSks(e.target.value);
                            if (e.target.value) setShowSksError(false);
                          }}
                          className={`w-full p-4 rounded-2xl bg-white/50 border text-slate-950 font-bold outline-none transition-all ${
                            showSksError ? 'border-red-500 animate-shake bg-white' : 'border-white/60 focus:bg-white'
                          }`}
                          required
                        />
                        <div className={`absolute -top-10 left-0 text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-xl transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-2xl z-20 whitespace-nowrap uppercase ${
                          showSksError ? 'bg-red-600 opacity-100 translate-y-0' : 'bg-slate-950 opacity-0 group-hover:opacity-100'
                        }`}>
                          {showSksError ? 'WAJIB DIISI!' : 'ISI JUMLAH SKS'}
                          <div className={`absolute -bottom-1 left-4 w-2 h-2 rotate-45 ${showSksError ? 'bg-red-600' : 'bg-slate-950'}`} />
                        </div>
                      </div>
                      <button className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black shadow-lg hover:bg-blue-700 transition-all">
                        VALIDASI
                      </button>
                    </form>
                  </div>
                ) : loading ? (
                  <div className="h-full w-full rounded-[2rem] md:rounded-[3rem] bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="relative z-10 text-center scale-75 md:scale-100">
                      <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-8 border-white/5 border-t-blue-500 animate-spin mb-6 md:mb-8 mx-auto shadow-[0_0_50px_rgba(59,130,246,0.5)]" />
                      <p className="font-mono text-blue-400 font-bold tracking-widest text-base md:text-lg animate-pulse">{thinkingText}</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center p-8 space-y-6 text-center">
                    <p className="text-xs font-black tracking-widest uppercase text-slate-400">Hasil Analisis</p>
                    <div className="text-7xl md:text-9xl font-[1000] tracking-tighter text-blue-600 drop-shadow-2xl">
                      {result.nilai_kelayakan}
                    </div>
                    <div className={`px-8 py-3 rounded-full font-black text-white tracking-widest uppercase shadow-lg ${
                      result.status_kelayakan === 'Layak' ? 'bg-emerald-500' : 
                      result.status_kelayakan === 'Dipertimbangkan' ? 'bg-amber-500' : 'bg-rose-500'
                    }`}>
                      {result.status_kelayakan}
                    </div>
                    <button onClick={() => setResult(null)} className="text-xs font-bold text-slate-400 hover:text-slate-950 transition-colors uppercase tracking-widest">
                      Cek Ulang
                    </button>
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="hidden sm:block absolute -top-8 -left-8 md:-top-12 md:-left-12 p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-white/60 bg-white/40 backdrop-blur-2xl shadow-2xl -rotate-6 animate-float-delayed">
                <div className="mb-2 md:mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-12 md:h-12">
                    <path d="M20 20H4V4" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 16V12" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V8" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 16V10" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="font-black text-blue-600 tracking-tighter text-xs md:text-base">FUZZY LOGIC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
