export default function Features() {
  return (
    <section id="fitur" className="py-48 bg-slate-950 text-white relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent" />
      
      <div className="mx-auto max-w-7xl px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end mb-32">
          <h2 className="text-6xl font-black tracking-[-0.04em] leading-[0.9] sm:text-8xl">
            SISTEM <br /> <span className="text-blue-500 italic">YANG</span> <br /> MODERN.
          </h2>
          <p className="text-xl text-slate-400 font-medium max-w-md pb-4 border-l-4 border-blue-600 pl-8">
            Semua kebutuhan validasi akademik diintegrasikan dalam satu platform cerdas berbasis logika fuzzy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { 
              title: "Input IPK", 
              desc: "Parameter utama akademik diproses dengan presisi tinggi.", 
              icon: (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 20H4V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 16V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) 
            },
            { 
              title: "Rencana SKS", 
              desc: "Input jumlah pengambilan SKS semester berjalan.", 
              icon: (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L13 14L9 15L10 11L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )
            },
            { 
              title: "Fuzzy Logic", 
              desc: "Inti sistem menggunakan aturan keputusan cerdas.", 
              icon: (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.5 14C9.5 14 9 14 8.5 14C6.567 14 5 12.433 5 10.5C5 8.567 6.567 7 8.5 7C8.674 7 8.843 7.013 9.007 7.037C9.502 5.27 11.103 4 13 4C15.209 4 17 5.791 17 8C17 8.174 16.987 8.343 16.963 8.507C18.73 9.002 20 10.603 20 12.5C20 14.709 18.209 16.5 16 16.5C15.5 16.5 15 16.5 15 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12V20M12 20L9 17M12 20L15 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )
            },
            { 
              title: "Automatic Calculation", 
              desc: "Perhitungan otomatis status kelayakan instan.", 
              icon: (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.4 15C19.1 15.9 18.5 16.7 17.8 17.3L18.5 19.5L16.5 20.5L14.8 18.8C13.9 19.2 13 19.4 12 19.4C11 19.4 10.1 19.2 9.2 18.8L7.5 20.5L5.5 19.5L6.2 17.3C5.5 16.7 4.9 15.9 4.6 15L2.2 14.5V12.2L4.6 11.7C4.9 10.8 5.5 10 6.2 9.4L5.5 7.2L7.5 6.2L9.2 7.9C10.1 7.5 11 7.3 12 7.3C13 7.3 13.9 7.5 14.8 7.9L16.5 6.2L18.5 7.2L17.8 9.4C18.5 10 19.1 10.8 19.4 11.7L21.8 12.2V14.5L19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )
            },
            { 
              title: "Recommendation", 
              desc: "Hasil akhir Layak, Dipertimbangkan, atau Tidak.", 
              icon: (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )
            }
          ].map((f, i) => (
            <div 
              key={i} 
              className={`p-12 rounded-[4rem] border-2 border-white/5 bg-white/5 flex flex-col h-[400px] justify-between ${i === 2 ? "lg:col-span-1" : ""} ${i === 4 ? "lg:col-span-2" : ""}`}
            >
              <div className="text-6xl text-blue-500">{f.icon}</div>
              <div>
                <h3 className="text-3xl font-black mb-4 tracking-tighter">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
