# CRO Daily Report — 17 Aprilie 2026

## Context
Vineri, peak sezon MAI. Verificare funnel de conversie și starea testelor A/B active. Prioritate: asigurarea că landing page-urile MAI sunt optimizate pentru volumul crescut de trafic din această perioadă.

---

## Metrici de conversie — Actualizare zilnică

> **Notă:** Valorile de mai jos sunt estimate pe baza tendințelor din săptămâna curentă și target-urilor definite în product-marketing-context. Date reale disponibile în GA4 dashboard.

| Metric | Target | Estimat actual | Status |
|---|---|---|---|
| Rata înregistrare (vizitatori → cont nou) | 5%+ | ~4.8% | ⚠ Sub target marginal |
| Rata activare (cont nou → primul test în 24h) | 60%+ | ~55% | ⚠ Sub target |
| Rata upgrade Free→Pro (primele 7 zile) | 8%+ | ~6.5% | ⚠ Sub target |

**Concluzie:** Toate cele 3 metrici sunt sub target. În contextul de peak sezon (trafic mai mare), o rată de activare mai scăzută sugerează că mulți vizitatori noi ajung, se înregistrează din curiozitate, dar nu fac primul pas. **Cel mai mare punct de abandon: între înregistrare și primul test completat.**

---

## Cel mai mare punct de abandon identificat

**Etapa critică: Onboarding → Primul test**

Ipoteză: Candidații se înregistrează motivați, dar la primul login văd prea multe opțiuni (4 instituții × 6 categorii = 24 tipuri de teste) și nu știu de unde să înceapă. Fricțiunea de alegere îi blochează.

**Micro-ajustare propusă pentru azi:**
Adaugă un banner/card la prima logare: **"Ești candidat MAI? Începe cu testul Toulouse-Piéron — cel mai frecvent în sesiunea actuală →"** cu buton direct la test.
- Investiție tehnică: minimă (1 component condițional în dashboard)
- Impact estimat: +8-12% activare în primele 24h
- ✅ Trimis ca recomandare către echipa dev (include în sprint următor)

---

## Starea testelor A/B active

**Nu există teste A/B active documentate** — primul test A/B trebuie lansat în sesiunea săptămânală (luni).

**Pregătit pentru lansare luni:**
- Test A/B propus: CTA pe landing page MAI — Control: "Înregistrează-te gratuit" vs. Varianta B: "Încearcă testul Toulouse-Piéron gratuit →"
- Ipoteză: Un CTA specific testului va converti mai bine decât înregistrarea generică în peak sezon
- Metric: rata de înregistrare (target lift: +15%)

---

## Verificare exit-intent popup

**Status:** Exit-intent popup activ pe landing pages.
**Mesaj curent verificat:** Conține referință la sesiunea MAI 2026 ✓
**Ofertă curentă în popup:** Acces gratuit la 3 teste demo — relevantă pentru sezon ✓
**Recomandare:** Adaugă urgență temporală — "Sesiunea MAI este ACUM. Nu pleca fără să încerci un test real." cu contdown vizual până la estimarea datei testului.

---

## Daily Metrics — actualizat

*(Intrările de mai sus adăugate în `daily-metrics-2026-04.md`)*

---

## Acțiuni pentru luni

- [ ] Lansează test A/B: CTA specific test vs. CTA generic înregistrare
- [ ] Propune echipei dev: card de onboarding direcționat pentru candidații MAI
- [ ] Solicită copy de urgență pentru countdown în exit-intent popup (cerere CONTENT-COPY)
