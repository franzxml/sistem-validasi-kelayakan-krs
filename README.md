# Sistem Validasi Kelayakan KRS

## Deskripsi
Proyek ini adalah aplikasi berbasis web yang dirancang untuk membantu mahasiswa dalam memvalidasi kelayakan pengambilan SKS (Kartu Rencana Studi) menggunakan metode **Logika Fuzzy**. Aplikasi ini memberikan rekomendasi beban SKS yang optimal berdasarkan parameter seperti Indeks Prestasi Kumulatif (IPK) dan beban SKS pada semester sebelumnya, dengan antarmuka yang modern dan responsif.

## Teknologi
- Next.js 16 sebagai *framework* React untuk performa tinggi dan optimasi SEO
- React 19 untuk manajemen *state* dan pengembangan komponen UI yang deklaratif
- Tailwind CSS 4 untuk gaya dan tata letak yang modern dengan pendekatan *utility-first*
- TypeScript untuk pengembangan kode yang lebih aman, terstruktur, dan mudah dikelola
- FastAPI (Python) untuk *backend* yang cepat dalam memproses logika fuzzy

## Struktur Folder
```
root/
├── backend/             # Server API Python (FastAPI)
│   ├── main.py          # Entry point aplikasi backend
│   └── fuzzy_logic.py   # Implementasi perhitungan logika fuzzy
├── frontend/            # Aplikasi Client (Next.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── sistem/  # Halaman utama sistem validasi
│   │   └── components/  # Komponen UI (Hero, Navbar, Footer, dll)
│   └── public/
└── README.md
```

## Cara Menjalankan
### Backend
1. Masuk ke folder `backend`
2. Jalankan `pip install -r requirements.txt`
3. Jalankan `python main.py` untuk memulai server backend

### Frontend
1. Masuk ke folder `frontend`
2. Jalankan `npm install` untuk menginstal dependensi
3. Jalankan `npm run dev` untuk memulai server pengembangan
4. Buka `http://localhost:3000` di browser Anda

## Domain
Website dapat diakses melalui:
https://sv-kelayakan-krs.vercel.app/

---
Dikembangkan oleh: @franzxml
