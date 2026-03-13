"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
      scrolled ? "py-4 bg-white/70 backdrop-blur-2xl border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)]" : "py-8 bg-transparent border-transparent"
    }`}>
      <div className="mx-auto max-w-7xl px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none">Sistem Validasi Kelayakan KRS</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-12">
          {["Fitur", "Cara Kerja"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(" ", "-")}`} 
              className="text-sm font-bold text-slate-500 hover:text-slate-950 transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-slate-950 rounded-full transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
          <Link 
            href="/sistem" 
            className="px-8 py-3 rounded-full bg-slate-950 text-white text-sm font-black shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:scale-95 transition-all"
          >
            MASUK SISTEM
          </Link>
        </div>
      </div>
    </nav>
  );
}
