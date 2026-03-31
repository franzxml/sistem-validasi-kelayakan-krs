"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

interface RuleResult {
  rule: string;
  antecedent: string;
  consequent: string;
  ipk_value: number;
  sks_value: number;
  alpha: number;
}

interface FuzzyDetail {
  fuzzifikasi: {
    ipk: Record<string, number>;
    sks: Record<string, number>;
  };
  inferensi: RuleResult[];
  aggregasi: Record<string, number>;
  defuzzifikasi: {
    metode: string;
    titik_tengah: Record<string, number>;
    pembilang: number;
    penyebut: number;
    hasil: number;
  };
}

interface Result {
  nilai_kelayakan: number;
  status_kelayakan: string;
  detail: FuzzyDetail;
}

export default function SistemPage() {
  const [ipk, setIpk] = useState<string>("");
  const [sks, setSks] = useState<string>("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showIpkError, setShowIpkError] = useState(false);
  const [showSksError, setShowSksError] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ipkParam = params.get("ipk");
    const sksParam = params.get("sks");
    if (ipkParam) setIpk(ipkParam);
    if (sksParam) setSks(sksParam);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setShowDetail(false);
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

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/sistem`, {
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
    } catch {
      setError("Gagal terhubung ke server backend. Pastikan server FastAPI sedang berjalan di port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const consequentColor = (label: string) => {
    if (label === "Layak") return "bg-emerald-100 text-emerald-700";
    if (label === "Dipertimbangkan") return "bg-amber-100 text-amber-700";
    return "bg-rose-100 text-rose-700";
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
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
            <div className="flex-1 text-center lg:text-left lg:sticky lg:top-48">
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
                      {/* Score Card */}
                      <div className="p-8 rounded-[2rem] md:rounded-[3rem] bg-slate-950 text-white text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600/20 blur-2xl" />
                        <div className="relative z-10">
                          <p className="text-xs font-black tracking-widest uppercase text-slate-400 mb-2">Skor Kelayakan</p>
                          <p className="text-6xl md:text-8xl font-[1000] tracking-tighter text-blue-400">{result.nilai_kelayakan}</p>

                          <div className={`mt-6 inline-block px-8 py-3 rounded-full font-black text-sm md:text-base tracking-widest uppercase ${
                            result.status_kelayakan === 'Layak' ? 'bg-emerald-500 text-white' :
                            result.status_kelayakan === 'Dipertimbangkan' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                          }`}>
                            {result.status_kelayakan}
                          </div>
                        </div>
                      </div>

                      {/* Detail Toggle */}
                      <button
                        onClick={() => setShowDetail(!showDetail)}
                        className="w-full py-4 rounded-2xl border-2 border-slate-100 text-slate-500 font-bold text-sm tracking-wider uppercase hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-2"
                      >
                        <span>{showDetail ? "Sembunyikan Detail" : "Lihat Detail Perhitungan"}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${showDetail ? "rotate-180" : ""}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Detail Sections */}
                      {showDetail && result.detail && (
                        <div className="space-y-5 animate-fade-in">

                          {/* 1. Fuzzifikasi */}
                          <div className="p-5 md:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                            <h3 className="text-xs font-black tracking-widest uppercase text-blue-600 mb-5">
                              1. Fuzzifikasi
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              {/* IPK */}
                              <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                  IPK = {ipk}
                                </p>
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b-2 border-slate-100">
                                      <th className="py-2 text-left font-bold text-slate-500">Himpunan</th>
                                      <th className="py-2 text-right font-bold text-slate-500">Derajat (&#956;)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Object.entries(result.detail.fuzzifikasi.ipk).map(([key, val]) => (
                                      <tr key={key} className="border-b border-slate-50">
                                        <td className="py-2 font-medium">{key}</td>
                                        <td className={`py-2 text-right font-mono font-bold ${val > 0 ? "text-blue-600" : "text-slate-300"}`}>
                                          {val}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              {/* SKS */}
                              <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                  SKS = {sks}
                                </p>
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b-2 border-slate-100">
                                      <th className="py-2 text-left font-bold text-slate-500">Himpunan</th>
                                      <th className="py-2 text-right font-bold text-slate-500">Derajat (&#956;)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Object.entries(result.detail.fuzzifikasi.sks).map(([key, val]) => (
                                      <tr key={key} className="border-b border-slate-50">
                                        <td className="py-2 font-medium">{key}</td>
                                        <td className={`py-2 text-right font-mono font-bold ${val > 0 ? "text-blue-600" : "text-slate-300"}`}>
                                          {val}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>

                          {/* 2. Inferensi */}
                          <div className="p-5 md:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                            <h3 className="text-xs font-black tracking-widest uppercase text-blue-600 mb-1">
                              2. Inferensi (Rule Base)
                            </h3>
                            <p className="text-[11px] text-slate-400 mb-4">
                              Metode: MIN (operator AND) &bull; Agregasi: MAX
                            </p>
                            <div className="overflow-x-auto -mx-2">
                              <table className="w-full text-sm min-w-[480px]">
                                <thead>
                                  <tr className="border-b-2 border-slate-100">
                                    <th className="py-2 px-2 text-left font-bold text-slate-500">Rule</th>
                                    <th className="py-2 px-2 text-left font-bold text-slate-500">Kondisi</th>
                                    <th className="py-2 px-2 text-left font-bold text-slate-500">Hasil</th>
                                    <th className="py-2 px-2 text-right font-bold text-slate-500">&#945;</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {result.detail.inferensi.map((rule) => (
                                    <tr key={rule.rule} className={`border-b border-slate-50 ${rule.alpha > 0 ? "bg-blue-50/60" : ""}`}>
                                      <td className="py-2 px-2 font-bold text-xs">{rule.rule}</td>
                                      <td className="py-2 px-2 text-xs">
                                        {rule.antecedent.replace("IF ", "")}
                                      </td>
                                      <td className="py-2 px-2">
                                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${consequentColor(rule.consequent)}`}>
                                          {rule.consequent}
                                        </span>
                                      </td>
                                      <td className={`py-2 px-2 text-right font-mono font-bold text-xs ${rule.alpha > 0 ? "text-blue-600" : "text-slate-300"}`}>
                                        {rule.alpha}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            {/* Agregasi */}
                            <div className="mt-4 pt-4 border-t border-slate-100">
                              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Agregasi (MAX)</p>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(result.detail.aggregasi).map(([key, val]) => (
                                  <span
                                    key={key}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                                      val > 0 ? consequentColor(key) : "bg-slate-50 text-slate-300"
                                    }`}
                                  >
                                    {key} = {val}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* 3. Defuzzifikasi */}
                          <div className="p-5 md:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                            <h3 className="text-xs font-black tracking-widest uppercase text-blue-600 mb-1">
                              3. Defuzzifikasi
                            </h3>
                            <p className="text-[11px] text-slate-400 mb-4">
                              Metode: {result.detail.defuzzifikasi.metode}
                            </p>

                            {/* Titik Tengah */}
                            <div className="mb-4">
                              <p className="text-[11px] font-bold text-slate-400 mb-2">Titik Tengah Domain:</p>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(result.detail.defuzzifikasi.titik_tengah).map(([key, val]) => (
                                  <span key={key} className="px-3 py-1 rounded-lg bg-slate-100 text-xs font-mono font-bold text-slate-600">
                                    {key} = {val}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Rumus */}
                            <div className="p-4 rounded-xl bg-slate-950 text-white font-mono text-xs md:text-sm space-y-2 overflow-x-auto">
                              {result.detail.defuzzifikasi.penyebut > 0 ? (() => {
                                const active = Object.entries(result.detail.aggregasi).filter(([, v]) => v > 0);
                                const centers = result.detail.defuzzifikasi.titik_tengah;
                                return (
                                  <>
                                    <p className="text-slate-400">Z = &Sigma;(&alpha;i &times; zi) / &Sigma;(&alpha;i)</p>
                                    <p>
                                      {"Z = "}
                                      {active.map(([key, val], i) => (
                                        <span key={key}>
                                          ({val} &times; {centers[key]}){i < active.length - 1 ? " + " : ""}
                                        </span>
                                      ))}
                                    </p>
                                    <p className="text-slate-300">
                                      {"    / ("}
                                      {active.map(([, val], i) => (
                                        <span key={i}>{val}{i < active.length - 1 ? " + " : ""}</span>
                                      ))}
                                      {")"}
                                    </p>
                                    <p>Z = {result.detail.defuzzifikasi.pembilang} / {result.detail.defuzzifikasi.penyebut}</p>
                                    <p className="text-blue-400 font-bold text-base md:text-lg pt-1">
                                      Z = {result.detail.defuzzifikasi.hasil}
                                    </p>
                                  </>
                                );
                              })() : (
                                <p className="text-slate-400">Semua derajat keanggotaan bernilai 0, skor = 0</p>
                              )}
                            </div>
                          </div>

                          {/* Kesimpulan */}
                          <div className={`p-5 md:p-6 rounded-2xl border-2 shadow-sm ${
                            result.status_kelayakan === "Layak"
                              ? "bg-emerald-50 border-emerald-200"
                              : result.status_kelayakan === "Dipertimbangkan"
                              ? "bg-amber-50 border-amber-200"
                              : "bg-rose-50 border-rose-200"
                          }`}>
                            <h3 className="text-xs font-black tracking-widest uppercase text-slate-500 mb-2">
                              Kesimpulan
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-700">
                              Berdasarkan hasil perhitungan Logika Fuzzy Mamdani, diperoleh nilai akhir sebesar{" "}
                              <strong className="text-slate-950">{result.nilai_kelayakan}</strong> yang berada pada kategori{" "}
                              <strong className={
                                result.status_kelayakan === "Layak"
                                  ? "text-emerald-700"
                                  : result.status_kelayakan === "Dipertimbangkan"
                                  ? "text-amber-700"
                                  : "text-rose-700"
                              }>
                                {result.status_kelayakan}
                              </strong>.
                              {result.status_kelayakan === "Layak" &&
                                " Mahasiswa dinyatakan layak untuk mengambil KRS sesuai rencana."}
                              {result.status_kelayakan === "Dipertimbangkan" &&
                                " Mahasiswa masih cukup layak mengambil KRS, namun perlu mempertimbangkan kembali jumlah SKS yang diambil."}
                              {result.status_kelayakan === "Tidak Layak" &&
                                " Mahasiswa disarankan untuk mengurangi jumlah SKS yang diambil agar sesuai dengan kemampuan akademik."}
                            </p>
                          </div>
                        </div>
                      )}
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
