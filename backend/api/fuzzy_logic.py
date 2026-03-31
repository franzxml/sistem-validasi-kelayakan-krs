def fuzzify_ipk(x):
    # Rendah (0 – 2.5): fungsi turun linear
    if x <= 0:
        rendah = 1.0
    elif x >= 2.5:
        rendah = 0.0
    else:
        rendah = (2.5 - x) / 2.5

    # Sedang (2.0 – 3.5): fungsi turun linear, puncak di 2.0
    if x < 2.0 or x > 3.5:
        sedang = 0.0
    else:
        sedang = (3.5 - x) / (3.5 - 2.0)

    # Tinggi (3.0 – 4.0): fungsi naik linear
    if x <= 3.0:
        tinggi = 0.0
    elif x >= 4.0:
        tinggi = 1.0
    else:
        tinggi = (x - 3.0) / (4.0 - 3.0)

    return {"Rendah": rendah, "Sedang": sedang, "Tinggi": tinggi}


def fuzzify_sks(x):
    # Sedikit (0 – 12): fungsi turun linear
    if x <= 0:
        sedikit = 1.0
    elif x >= 12:
        sedikit = 0.0
    else:
        sedikit = (12 - x) / 12.0

    # Normal (10 – 20): fungsi segitiga, puncak di 15
    if x <= 10 or x >= 20:
        normal = 0.0
    elif x <= 15:
        normal = (x - 10) / (15 - 10)
    else:
        normal = (20 - x) / (20 - 15)

    # Banyak (18 – 24): fungsi naik linear
    if x <= 18:
        banyak = 0.0
    elif x >= 24:
        banyak = 1.0
    else:
        banyak = (x - 18) / (24 - 18)

    return {"Sedikit": sedikit, "Normal": normal, "Banyak": banyak}


def evaluate_rules(ipk_fuzz, sks_fuzz):
    rules_def = [
        ("R1", "IPK Tinggi", "SKS Banyak", "Layak", "Tinggi", "Banyak"),
        ("R2", "IPK Tinggi", "SKS Normal", "Layak", "Tinggi", "Normal"),
        ("R3", "IPK Tinggi", "SKS Sedikit", "Layak", "Tinggi", "Sedikit"),
        ("R4", "IPK Sedang", "SKS Banyak", "Dipertimbangkan", "Sedang", "Banyak"),
        ("R5", "IPK Sedang", "SKS Normal", "Layak", "Sedang", "Normal"),
        ("R6", "IPK Sedang", "SKS Sedikit", "Layak", "Sedang", "Sedikit"),
        ("R7", "IPK Rendah", "SKS Banyak", "Tidak Layak", "Rendah", "Banyak"),
        ("R8", "IPK Rendah", "SKS Normal", "Dipertimbangkan", "Rendah", "Normal"),
        ("R9", "IPK Rendah", "SKS Sedikit", "Tidak Layak", "Rendah", "Sedikit"),
    ]

    rules_result = []
    aggregated = {"Tidak Layak": 0.0, "Dipertimbangkan": 0.0, "Layak": 0.0}

    for rule_id, ipk_label, sks_label, consequent, ipk_key, sks_key in rules_def:
        ipk_val = ipk_fuzz[ipk_key]
        sks_val = sks_fuzz[sks_key]
        alpha = min(ipk_val, sks_val)

        rules_result.append({
            "rule": rule_id,
            "antecedent": f"IF {ipk_label} AND {sks_label}",
            "consequent": consequent,
            "ipk_value": round(ipk_val, 4),
            "sks_value": round(sks_val, 4),
            "alpha": round(alpha, 4),
        })

        if alpha > aggregated[consequent]:
            aggregated[consequent] = alpha

    return rules_result, aggregated


def defuzzify(aggregated):
    """Defuzzifikasi menggunakan metode Weighted Average."""
    centers = {"Tidak Layak": 20, "Dipertimbangkan": 50, "Layak": 80}

    numerator = 0.0
    denominator = 0.0

    for label, strength in aggregated.items():
        if strength > 0:
            numerator += strength * centers[label]
            denominator += strength

    if denominator == 0:
        return 0.0, centers, 0.0, 0.0

    return numerator / denominator, centers, numerator, denominator


def get_fuzzy_status(ipk, sks):
    ipk_fuzz = fuzzify_ipk(ipk)
    sks_fuzz = fuzzify_sks(sks)

    rules, aggregated = evaluate_rules(ipk_fuzz, sks_fuzz)

    score, centers, numerator, denominator = defuzzify(aggregated)

    if score < 30:
        label = "Tidak Layak"
    elif score <= 70:
        label = "Dipertimbangkan"
    else:
        label = "Layak"

    return {
        "score": round(score, 2),
        "label": label,
        "detail": {
            "fuzzifikasi": {
                "ipk": {k: round(v, 4) for k, v in ipk_fuzz.items()},
                "sks": {k: round(v, 4) for k, v in sks_fuzz.items()},
            },
            "inferensi": rules,
            "aggregasi": {k: round(v, 4) for k, v in aggregated.items()},
            "defuzzifikasi": {
                "metode": "Weighted Average",
                "titik_tengah": centers,
                "pembilang": round(numerator, 4),
                "penyebut": round(denominator, 4),
                "hasil": round(score, 2),
            },
        },
    }
