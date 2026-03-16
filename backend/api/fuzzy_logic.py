def triangle(x, a, b, c):
    if x <= a or x >= c:
        return 0.0
    elif a < x <= b:
        return (x - a) / (b - a) if b != a else 1.0
    elif b < x < c:
        return (c - x) / (c - b) if c != b else 1.0
    return 0.0

def fuzzify_ipk(x):
    # Rendah: 0 - 2.5
    rendah = triangle(x, -1, 0, 2.5) if x < 0 else (1.0 if x == 0 else triangle(x, 0, 0, 2.5))
    if x <= 0: rendah = 1.0
    elif x >= 2.5: rendah = 0.0
    else: rendah = (2.5 - x) / 2.5

    # Sedang: 2.0 - 3.5
    sedang = triangle(x, 2.0, 2.75, 3.5)

    # Tinggi: 3.0 - 4.0
    if x <= 3.0: tinggi = 0.0
    elif x >= 4.0: tinggi = 1.0
    else: tinggi = (x - 3.0) / 1.0

    return {"Rendah": rendah, "Sedang": sedang, "Tinggi": tinggi}

def fuzzify_sks(x):
    # Sedikit: 0 - 12
    if x <= 0: sedikit = 1.0
    elif x >= 12: sedikit = 0.0
    else: sedikit = (12 - x) / 12.0

    # Normal: 10 - 20
    normal = triangle(x, 10, 15, 20)

    # Banyak: 18 - 24
    if x <= 18: banyak = 0.0
    elif x >= 24: banyak = 1.0
    else: banyak = (x - 18) / 6.0

    return {"Sedikit": sedikit, "Normal": normal, "Banyak": banyak}

def evaluate_rules(ipk_fuzz, sks_fuzz):
    # Output: Tidak Layak, Dipertimbangkan, Layak
    rules = []
    
    # 1. IF IPK Tinggi AND SKS Banyak THEN Layak
    rules.append(("Layak", min(ipk_fuzz["Tinggi"], sks_fuzz["Banyak"])))
    # 2. IF IPK Tinggi AND SKS Normal THEN Layak
    rules.append(("Layak", min(ipk_fuzz["Tinggi"], sks_fuzz["Normal"])))
    # 3. IF IPK Tinggi AND SKS Sedikit THEN Layak
    rules.append(("Layak", min(ipk_fuzz["Tinggi"], sks_fuzz["Sedikit"])))
    
    # 4. IF IPK Sedang AND SKS Banyak THEN Dipertimbangkan
    rules.append(("Dipertimbangkan", min(ipk_fuzz["Sedang"], sks_fuzz["Banyak"])))
    # 5. IF IPK Sedang AND SKS Normal THEN Layak
    rules.append(("Layak", min(ipk_fuzz["Sedang"], sks_fuzz["Normal"])))
    # 6. IF IPK Sedang AND SKS Sedikit THEN Layak
    rules.append(("Layak", min(ipk_fuzz["Sedang"], sks_fuzz["Sedikit"])))
    
    # 7. IF IPK Rendah AND SKS Banyak THEN Tidak Layak
    rules.append(("Tidak Layak", min(ipk_fuzz["Rendah"], sks_fuzz["Banyak"])))
    # 8. IF IPK Rendah AND SKS Normal THEN Dipertimbangkan
    rules.append(("Dipertimbangkan", min(ipk_fuzz["Rendah"], sks_fuzz["Normal"])))
    # 9. IF IPK Rendah AND SKS Sedikit THEN Layak
    rules.append(("Layak", min(ipk_fuzz["Rendah"], sks_fuzz["Sedikit"])))

    # Aggregate using MAX (Mamdani)
    aggregated = {"Tidak Layak": 0.0, "Dipertimbangkan": 0.0, "Layak": 0.0}
    for label, val in rules:
        if val > aggregated[label]:
            aggregated[label] = val
            
    return aggregated

def defuzzify(aggregated):
    # Centroid method using sample points 0 - 100
    samples = range(0, 101, 5)
    
    numerator = 0.0
    denominator = 0.0
    
    for x in samples:
        # Tidak Layak: 0 - 40
        if x <= 0: tl_mem = 1.0
        elif x >= 40: tl_mem = 0.0
        else: tl_mem = (40 - x) / 40.0
        
        # Dipertimbangkan: 30 - 70
        dp_mem = triangle(x, 30, 50, 70)
        
        # Layak: 60 - 100
        if x <= 60: ly_mem = 0.0
        elif x >= 100: ly_mem = 1.0
        else: ly_mem = (x - 60) / 40.0
        
        # Clip according to aggregated rule strengths
        val_tl = min(tl_mem, aggregated["Tidak Layak"])
        val_dp = min(dp_mem, aggregated["Dipertimbangkan"])
        val_ly = min(ly_mem, aggregated["Layak"])
        
        # Max aggregate for the point x
        val_x = max(val_tl, val_dp, val_ly)
        
        numerator += x * val_x
        denominator += val_x
        
    if denominator == 0:
        return 0.0
        
    return numerator / denominator

def get_fuzzy_status(ipk, sks):
    ipk_fuzz = fuzzify_ipk(ipk)
    sks_fuzz = fuzzify_sks(sks)
    aggregated = evaluate_rules(ipk_fuzz, sks_fuzz)
    score = defuzzify(aggregated)
    
    # Determine string label based on score limits from document
    # Tidak Layak (0 - 40), Dipertimbangkan (30 - 70), Layak (60 - 100)
    # The centroid will output a crisp value.
    if score < 40:
        label = "Tidak Layak"
    elif score < 70:
        label = "Dipertimbangkan"
    else:
        label = "Layak"
        
    return {
        "score": round(score, 2),
        "label": label
    }
