export default function Footer() {
  return (
    <footer className="py-24 md:py-48 px-6 md:px-8 border-t border-slate-100 bg-white relative z-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="space-y-8 md:space-y-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] text-slate-950 text-center md:text-left">
              Sistem Validasi <br className="hidden md:block" /> Kelayakan KRS
            </h2>
            
            <div className="space-y-4 text-center md:text-left">
              <p className="text-xs font-black tracking-[0.2em] uppercase text-slate-400">Dikembangkan oleh:</p>
              <div className="text-lg md:text-xl lg:text-2xl font-black text-slate-950 space-y-2">
                <p>1. Kharizma Rizkiah</p>
                <p>2. Tesa Firna Ananta</p>
                <p>3. Frans Maylandgo Saragih</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <a 
              href="https://github.com/franzxml/sistem-validasi-kelayakan-krs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center lg:items-end text-center lg:text-right"
            >
              <span className="text-5xl sm:text-7xl lg:text-[10rem] font-[1000] tracking-[-0.05em] leading-[0.8] text-slate-950 underline decoration-[8px] md:decoration-[12px] lg:decoration-[20px] decoration-transparent group-hover:decoration-slate-100 transition-all underline-offset-[8px]">
                SOURCE
              </span>
              <span className="text-5xl sm:text-7xl lg:text-[10rem] font-[1000] tracking-[-0.05em] leading-[0.8] text-slate-950 underline decoration-[8px] md:decoration-[12px] lg:decoration-[20px] decoration-transparent group-hover:decoration-slate-100 transition-all underline-offset-[8px]">
                CODE
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
