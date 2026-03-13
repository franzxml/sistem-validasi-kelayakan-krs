"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Fitur", href: "/#fitur" },
    { name: "Cara Kerja", href: "/#cara-kerja" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
      scrolled || isMenuOpen ? "py-4 bg-white/90 backdrop-blur-2xl border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)]" : "py-8 bg-transparent border-transparent"
    }`}>
      <div className="mx-auto max-w-7xl px-6 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group cursor-pointer">
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black tracking-tighter leading-none">Sistem Validasi Kelayakan KRS</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="text-sm font-bold text-slate-500 hover:text-slate-950 transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-slate-950 rounded-full transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
          <Link 
            href="/sistem" 
            className="px-8 py-3 rounded-full bg-slate-950 text-white text-sm font-black shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:scale-95 transition-all"
          >
            MASUK SISTEM
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-950"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-[300px] border-t border-slate-100 bg-white" : "max-h-0"}`}>
        <div className="flex flex-col p-6 gap-6">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-bold text-slate-600 hover:text-slate-950 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link 
            href="/sistem" 
            onClick={() => setIsMenuOpen(false)}
            className="w-full py-4 text-center rounded-2xl bg-slate-950 text-white text-sm font-black shadow-lg"
          >
            MASUK SISTEM
          </Link>
        </div>
      </div>
    </nav>
  );
}
