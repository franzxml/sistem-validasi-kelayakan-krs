"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-950 selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* 
          ADVANCED BACKGROUND ARCHITECTURE 
          Combining grain, grid-lines, and deep-layer meshes 
      */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] brightness-100 contrast-150" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Colorful Soft Glows */}
        <div className="absolute top-[-10%] left-[-10%] h-[800px] w-[800px] rounded-full bg-blue-100/40 blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[-5%] h-[600px] w-[600px] rounded-full bg-violet-100/30 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] h-[700px] w-[700px] rounded-full bg-emerald-50/40 blur-[130px]" />
      </div>

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>

      <Footer />

      {/* 
          CUSTOM ANIMATIONS 
          Precise control over high-end movement
      */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-20px) rotate(-3deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
