from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
try:
    from .fuzzy_logic import get_fuzzy_status
except ImportError:
    from fuzzy_logic import get_fuzzy_status

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Izinkan semua origin agar frontend terpisah bisa akses
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class KRSInput(BaseModel):
    ipk: float
    sks: int

@app.get("/")
def read_root():
    return {"message": "Sistem Validasi KRS AI API is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/sistem")
def proses_sistem(krs_input: KRSInput):
    # Validasi: Pastikan input berada dalam rentang yang valid (IPK 0-4, SKS 0-24)
    if krs_input.ipk < 0.0 or krs_input.ipk > 4.0:
        raise HTTPException(status_code=400, detail="IPK harus antara 0.00 dan 4.00")
    if krs_input.sks < 0 or krs_input.sks > 24:
        raise HTTPException(status_code=400, detail="SKS harus antara 0 dan 24")
        
    hasil = get_fuzzy_status(krs_input.ipk, krs_input.sks)
    
    # Response: Kembalikan JSON yang berisi nilai numerik hasil perhitungan dan label status kelayakannya
    return {
        "ipk": krs_input.ipk,
        "sks": krs_input.sks,
        "nilai_kelayakan": hasil["score"],
        "status_kelayakan": hasil["label"]
    }
