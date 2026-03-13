import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-48 px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-[5rem] bg-slate-950 p-20 lg:p-32 text-center shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-blue-600/10 blur-[100px] animate-pulse" />
          <div className="relative z-10 space-y-12">
            <h2 className="text-6xl font-black tracking-tighter text-white sm:text-8xl lg:leading-[1]">
              SIAP CEK <br /> <span className="text-blue-500">KELAYAKAN?</span>
            </h2>
            <p className="text-2xl text-slate-400 font-bold max-w-2xl mx-auto">
              Pastikan rencana studi Anda sesuai dengan standar akademik secara otomatis.
            </p>
            <Link href="/sistem" className="inline-block px-16 py-8 rounded-full bg-white text-slate-950 font-black text-2xl shadow-[0_20px_60px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all duration-300">
              COBA SEKARANG
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
