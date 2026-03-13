export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="py-48 px-8 relative scroll-mt-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-40">
          <div className="h-24 w-px bg-gradient-to-b from-blue-600 to-transparent mb-12" />
          <h2 className="text-6xl font-black tracking-tight sm:text-8xl mb-8">ALUR SISTEM</h2>
          <p className="text-2xl text-slate-500 font-bold tracking-tighter">PROSES VALIDASI FUZZY</p>
        </div>

        <div className="space-y-32">
          {[
            { step: "01", title: "INPUT DATA", desc: "Mahasiswa memasukkan nilai IPK semester sebelumnya dan jumlah SKS yang ingin diambil." },
            { step: "02", title: "FUZZIFIKASI", desc: "Data numerik IPK & SKS diubah menjadi nilai linguistik berdasarkan himpunan fuzzy." },
            { step: "03", title: "INFERENSI", desc: "Sistem memproses input menggunakan 9 aturan keputusan untuk menentukan status kelayakan." },
            { step: "04", title: "DEFUZZIFIKASI", desc: "Mengubah hasil aturan menjadi nilai keputusan akhir untuk kategori rekomendasi." }
          ].map((item, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-16 lg:gap-32`}>
              <div className="flex-1 flex justify-center items-center">
                <span className="text-[12rem] lg:text-[18rem] font-black leading-none text-slate-200 selection:text-slate-300 transition-colors duration-500 hover:text-blue-100">
                  {item.step}
                </span>
              </div>
              <div className="flex-1 text-center lg:text-left space-y-6">
                <h3 className="text-4xl lg:text-5xl font-black tracking-tighter">{item.title}</h3>
                <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {item.desc}
                </p>
                <div className="h-1 w-24 bg-blue-600 mx-auto lg:mx-0 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
