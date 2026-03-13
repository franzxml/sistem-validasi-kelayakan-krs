"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [thinkingText, setThinkingText] = useState("MENGANALISIS...");

  useEffect(() => {
    const texts = ["MENGANALISIS...", "MENGHITUNG...", "MEMPROSES...", "MEMVALIDASI...", "MENGOPTIMALKAN..."];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setThinkingText(texts[i]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-48 pb-32 lg:pt-64 lg:pb-48 px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 rounded-full px-5 py-2 text-xs font-black tracking-widest uppercase text-blue-600 border-2 border-blue-600/10 bg-blue-50/50 backdrop-blur-sm mb-12 shadow-inner">
              Sistem Validasi Cerdas
            </div>
            
            <h1 className="text-7xl font-[1000] tracking-[-0.04em] leading-[0.9] sm:text-9xl mb-12">
              Validasi <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700">KRS</span> <br /> 
              <span className="relative inline-block mt-2">
                Lebih Cepat
              </span>
            </h1>
            
            <p className="max-w-xl text-xl leading-relaxed text-slate-500 font-medium mb-16 px-4 lg:px-0">
              Platform validasi kelayakan KRS otomatis yang memastikan kesesuaian pengambilan mata kuliah secara real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <Link href="/sistem" className="w-full sm:w-auto px-12 py-6 rounded-3xl bg-blue-600 text-white font-black text-xl shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:shadow-[0_30px_70px_rgba(37,99,235,0.5)] hover:-translate-y-2 transition-all duration-500 text-center">
                Cek Kelayakan
              </Link>
              <Link href="#fitur" className="w-full sm:w-auto px-12 py-6 rounded-3xl bg-white text-slate-950 font-black text-xl border-4 border-slate-50 hover:bg-slate-50 transition-all duration-500 text-center shadow-sm">
                Fitur
              </Link>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-2xl">
            {/* HIGH-FIDELITY GLASS VISUAL */}
            <div className="relative aspect-square">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-[100px] animate-pulse" />
              
              {/* Glass Card Main */}
              <div className="absolute inset-0 rounded-[4rem] border border-white/40 bg-white/20 backdrop-blur-3xl shadow-2xl p-4 rotate-3 animate-float">
                <div className="h-full w-full rounded-[3rem] bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                  <div className="relative z-10 text-center">
                    <div className="h-32 w-32 rounded-full border-8 border-white/5 border-t-blue-500 animate-spin mb-8 mx-auto shadow-[0_0_50px_rgba(59,130,246,0.5)]" />
                    <p className="font-mono text-blue-400 font-bold tracking-widest text-lg animate-pulse min-h-[1.5rem]">{thinkingText}</p>
                  </div>
                </div>
              </div>

              {/* Secondary Glass Elements */}
              <div className="absolute -top-12 -left-12 p-8 rounded-[3rem] border border-white/60 bg-white/40 backdrop-blur-2xl shadow-2xl -rotate-6 animate-float-delayed">
                <div className="mb-4">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 20H4V4" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 16V12" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V8" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 16V10" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="font-black text-blue-600 tracking-tighter">IPK 3.85</div>
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Parameter Valid</div>
              </div>

              <div className="absolute -bottom-10 -right-10 p-10 rounded-[4rem] border border-white/60 bg-white/60 backdrop-blur-2xl shadow-2xl rotate-12 animate-float">
                <div className="mb-4">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 14C9.5 14 9 14 8.5 14C6.567 14 5 12.433 5 10.5C5 8.567 6.567 7 8.5 7C8.674 7 8.843 7.013 9.007 7.037C9.502 5.27 11.103 4 13 4C15.209 4 17 5.791 17 8C17 8.174 16.987 8.343 16.963 8.507C18.73 9.002 20 10.603 20 12.5C20 14.709 18.209 16.5 16 16.5C15.5 16.5 15 16.5 15 16.5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12V20M12 20L9 17M12 20L15 17" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="font-black text-blue-600 tracking-tighter">FUZZY LOGIC</div>
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Result: LAYAK</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
