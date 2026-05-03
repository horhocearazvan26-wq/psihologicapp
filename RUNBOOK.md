# RUNBOOK — Echipa de Marketing AI PSIHOLOGICapp

## CAS++ migration and seed

If the CAS++ tests stop starting or `/api/tests/session` returns empty results for the new dashboard categories, the usual cause is a stale Supabase schema or an empty `test_questions` bank.

1. Open Supabase SQL Editor.
2. Run [supabase-casplusplus-migration.sql](/Users/razvanhorhocea/Desktop/PSIHOLOGICapp/supabase-casplusplus-migration.sql).
3. Deploy the app if code changes are pending.
4. Seed the MCQ bank by calling `/api/seed?secret=YOUR_SEED_SECRET&reset=true`.
5. Verify that `test_questions` now contains rows for:
   `rationament-analitic`, `transfer-analogic`, `vocabular`, `intelegere-texte`, `rationament-matematic`, `calcul-matematic`.

Notes:
- The migration keeps `attention` valid in `test_sessions` and `user_progress` because the Toulouse-Pieron flow still uses it.
- The interactive CAS++ tests (`memorie-lucru`, `inhibitie-cognitiva`, `comutare-atentie`) do not seed rows into `test_questions`; they run from in-app datasets.

Ghid complet pentru pornirea, rularea și întreținerea celor 7 agenți AI de marketing.

---

## 1. Cum declanșezi întreaga echipă cu o singură comandă

### Rulare completă zilnică (toți 7 agenți, în secvența corectă)

```bash
# În Claude Code — declanșează secvența completă zilnică
claude "Citește agents/marketing-team/ORCHESTRATOR.md și execută secvența de rulare ZILNICĂ completă pentru data de astăzi. Urmează ordinea și regulile de paralelism din ORCHESTRATOR. Salvează toate output-urile în agents/outputs/{agent-id}/."
```

### Rulare completă săptămânală (Luni dimineață)

```bash
# Declanșează secvența săptămânală + zilnică
claude "Citește agents/marketing-team/ORCHESTRATOR.md și execută secvența de rulare SĂPTĂMÂNALĂ completă. Este începutul săptămânii — toți agenții execută sarcinile săptămânale în ordinea definită în ORCHESTRATOR."
```

### Automatizare completă (recomandat)

Adaugă în crontab sau în scheduler-ul tău:

```bash
# Zilnic la 08:00
0 8 * * * cd /Users/razvanhorhocea/Desktop/PSIHOLOGICapp && claude "Execută secvența zilnică din agents/marketing-team/ORCHESTRATOR.md"

# Săptămânal Luni la 07:30 (înainte de secvența zilnică)
30 7 * * 1 cd /Users/razvanhorhocea/Desktop/PSIHOLOGICapp && claude "Execută secvența săptămânală din agents/marketing-team/ORCHESTRATOR.md"
```

---

## 2. Cum declanșezi un singur agent în mod izolat

### Format general

```bash
claude "Citește agents/skills/product-marketing-context.md, apoi citește agents/marketing-team/{AGENT-ID}/INSTRUCTIONS.md și execută sarcinile [ZILNICE / SĂPTĂMÂNALE] pentru data de astăzi."
```

### Exemple per agent

```bash
# Agent STRATEGY — priorități zilnice
claude "Citește agents/skills/product-marketing-context.md, apoi agents/marketing-team/strategy/INSTRUCTIONS.md și execută sarcinile ZILNICE."

# Agent SEO-CONTENT — audit săptămânal
claude "Citește agents/skills/product-marketing-context.md, apoi agents/marketing-team/seo-content/INSTRUCTIONS.md și execută sarcinile SĂPTĂMÂNALE."

# Agent CONTENT-COPY — produce postări sociale pentru azi
claude "Citește agents/skills/product-marketing-context.md, apoi agents/marketing-team/content-copy/INSTRUCTIONS.md și execută DOAR sarcina de producere postări social media din checklist-ul zilnic."

# Agent CRO — lansează un test A/B nou
claude "Citește agents/skills/product-marketing-context.md, agents/marketing-team/cro/INSTRUCTIONS.md și lansează un test A/B nou conform checklist-ului săptămânal."

# Agent PAID-MEASUREMENT — verifică campaniile
claude "Citește agents/skills/product-marketing-context.md, agents/marketing-team/paid-measurement/INSTRUCTIONS.md și execută verificarea zilnică a campaniilor."

# Agent GROWTH-RETENTION — identifică utilizatori la risc de churn
claude "Citește agents/skills/product-marketing-context.md, agents/marketing-team/growth-retention/INSTRUCTIONS.md și execută monitorizarea zilnică de churn."

# Agent SALES-GM — raport revenue săptămânal
claude "Citește agents/skills/product-marketing-context.md, agents/marketing-team/sales-gm/INSTRUCTIONS.md și produce raportul revenue săptămânal."
```

### Rulare cu context specific

```bash
# Dacă vrei să treci context suplimentar agentului (ex: date noi de admitere)
claude "Context important: MAI a anunțat sesiune de admitere pe 15 Mai 2025. Citește agents/skills/product-marketing-context.md, actualizează calendarul sesiunilor, apoi execută agents/marketing-team/strategy/INSTRUCTIONS.md sarcini zilnice."
```

---

## 3. Cum revizuiești output-urile

### Structura output-urilor

```
agents/outputs/
├── strategy/
│   ├── daily-priorities-YYYY-MM-DD.md      ← citit zilnic de toți agenții
│   ├── weekly-strategy-YYYY-WW.md          ← citit săptămânal de toți agenții
│   ├── competitor-update-YYYY-MM-DD.md
│   ├── ideas-backlog-YYYY-MM-DD.md
│   └── context-changelog.md                ← jurnalul modificărilor la product-marketing-context
│
├── seo-content/
│   ├── daily-report-YYYY-MM-DD.md
│   ├── weekly-audit-YYYY-WW.md
│   ├── programmatic-briefs-YYYY-WW.md      ← brief-uri pentru CONTENT-COPY
│   ├── position-tracker-YYYY-MM.md
│   └── competitor-seo-YYYY-MM-DD.md
│
├── content-copy/
│   ├── social-posts-YYYY-MM-DD.md          ← postări gata de publicat
│   ├── blog-{slug}-YYYY-MM-DD.md           ← articole de blog
│   ├── email-weekly-YYYY-WW.md             ← email săptămânal
│   ├── email-sequence-updates-YYYY-MM-DD.md
│   ├── editorial-plan-YYYY-WW.md
│   └── ad-copy-YYYY-MM-DD.md              ← copy pentru reclame plătite
│
├── cro/
│   ├── daily-report-YYYY-MM-DD.md
│   ├── daily-metrics-YYYY-MM.md
│   ├── weekly-audit-YYYY-WW.md
│   ├── ab-test-{slug}-YYYY-MM-DD.md       ← teste A/B active
│   ├── landing-page-recommendations-YYYY-WW.md
│   └── copy-requests-YYYY-MM-DD.md        ← cereri copy pentru CONTENT-COPY
│
├── paid-measurement/
│   ├── daily-report-YYYY-MM-DD.md         ← SURSA DE ADEVĂR zilnică pentru date
│   ├── weekly-report-YYYY-WW.md           ← SURSA DE ADEVĂR săptămânală pentru date
│   ├── ad-creatives-YYYY-WW.md
│   ├── audience-update-YYYY-MM-DD.md
│   └── tracking-audit-YYYY-WW.md
│
├── growth-retention/
│   ├── daily-report-YYYY-MM-DD.md
│   ├── churn-risk-YYYY-MM.md
│   ├── weekly-retention-YYYY-WW.md
│   ├── referral-report-YYYY-WW.md
│   ├── community-report-YYYY-WW.md
│   ├── lead-magnet-{slug}-YYYY-MM-DD.md
│   └── launch-plan-{institutie}-YYYY-MM.md
│
└── sales-gm/
    ├── daily-report-YYYY-MM-DD.md
    ├── revenue-tracker-YYYY-MM.md          ← MRR/ARR tracking lunar
    ├── weekly-revenue-YYYY-WW.md
    ├── revops-audit-YYYY-WW.md
    ├── pricing-analysis-YYYY-WW.md
    ├── sales-materials-YYYY-WW.md
    └── b2b-outreach-YYYY-WW.md
```

### Comenzi rapide de revizie

```bash
# Vezi toate output-urile de azi
ls agents/outputs/*/daily-report-$(date +%Y-%m-%d).md

# Citește raportul strategic al zilei
cat agents/outputs/strategy/daily-priorities-$(date +%Y-%m-%d).md

# Citește raportul săptămânal de analytics (sursa de adevăr)
ls agents/outputs/paid-measurement/weekly-report-*.md | tail -1 | xargs cat

# Citește postările social media de azi
cat agents/outputs/content-copy/social-posts-$(date +%Y-%m-%d).md

# Verifică dacă toți agenții au finalizat azi
for agent in strategy seo-content content-copy cro paid-measurement growth-retention sales-gm; do
  FILE="agents/outputs/$agent/daily-report-$(date +%Y-%m-%d).md"
  if [ -f "$FILE" ]; then echo "✓ $agent"; else echo "✗ $agent — LIPSĂ"; fi
done

# Citește revenue tracker lunar
cat agents/outputs/sales-gm/revenue-tracker-$(date +%Y-%m).md
```

### Revizie cu Claude

```bash
# Rezumat executiv al tuturor output-urilor de azi
claude "Citește toate fișierele daily-report din agents/outputs/*/daily-report-$(date +%Y-%m-%d).md și produce un rezumat executiv de 1 pagină: ce s-a realizat azi, ce probleme există, ce necesită atenția mea."

# Verificare sănătate echipă
claude "Verifică agents/outputs/ și spune-mi: care agenți au livrat azi, care nu, și dacă există vreo condiție de escaladare care necesită atenția mea."
```

---

## 4. Cum actualizezi contextul de product marketing

`agents/skills/product-marketing-context.md` este **sursa unică de adevăr** pe care toți cei 7 agenți o citesc la fiecare rulare.

### Actualizare manuală (recomandată pentru schimbări majore)

```bash
# 1. Deschide și editează direct
# Modifică agents/skills/product-marketing-context.md

# 2. Notifică toți agenții — adaugă o linie în changelog
echo "$(date +%Y-%m-%d): [Descriere modificare]" >> agents/outputs/strategy/context-changelog.md

# 3. Declanșează o re-rulare a agentului STRATEGY pentru a propaga contexul
claude "product-marketing-context.md a fost actualizat. Citește agents/skills/product-marketing-context.md și agents/marketing-team/strategy/INSTRUCTIONS.md, actualizează weekly-strategy cu noile informații și notifică ceilalți agenți prin daily-priorities."
```

### Actualizare prin agentul STRATEGY (recomandată pentru schimbări minore)

```bash
# Lasă STRATEGY să detecteze și să actualizeze
claude "Citește agents/skills/product-marketing-context.md. [SCHIMBARE NOUĂ: descrie ce s-a schimbat]. Dacă schimbarea necesită actualizarea product-marketing-context, fă-o acum și notifică toți ceilalți agenți prin agents/outputs/strategy/context-changelog.md"
```

### Tipuri de schimbări și cum le gestionezi

| Ce s-a schimbat | Cine actualizează | Impact pe agenți |
|----------------|-------------------|-----------------|
| Date noi sesiune admitere | STRATEGY sau manual | Toți — GROWTH-RETENTION activează launch-plan |
| Prețuri noi | Manual (după aprobare) | CRO, SALES-GM — ajustează copy și strategia |
| Competitor nou | STRATEGY (detectează autonom) | SEO-CONTENT, PAID-MEASUREMENT — ajustează targeting |
| Feature nou în platformă | Manual | CONTENT-COPY, CRO — actualizează copy și onboarding |
| KPI-uri revizuite | Manual | Toți — recalibrează targetele |
| Ton of voice schimbat | Manual | CONTENT-COPY — aplică imediat |

### Verifică că schimbarea s-a propagat

```bash
# Toți agenții trebuie să citească context-ul actualizat la next run
cat agents/outputs/strategy/context-changelog.md

# Forțează o re-rulare completă cu contextul nou
claude "product-marketing-context.md a fost modificat. Citește ORCHESTRATOR.md și execută secvența zilnică completă — toți agenții trebuie să citească contextul actualizat."
```

---

## 5. Troubleshooting rapid

### Un agent nu a produs output-ul așteptat

```bash
# Re-rulează agentul specific cu debug
claude "Citește agents/skills/product-marketing-context.md și agents/marketing-team/{AGENT-ID}/INSTRUCTIONS.md. Execută sarcinile zilnice. Dacă există un output lipsă față de condiția DONE definită în INSTRUCTIONS.md, identifică problema și rezolv-o."
```

### Output-uri contradictorii între agenți

```bash
# Cere STRATEGY să arbitreze
claude "Există o contradicție între outputs/seo-content/ și outputs/content-copy/. Citește ambele rapoarte și agents/marketing-team/strategy/INSTRUCTIONS.md. Clarifică prioritatea și actualizează daily-priorities."
```

### Resetare completă săptămână nouă

```bash
# La începutul unei săptămâni noi, asigură-te că rulezi în ordine:
# 1. Mai întâi secvența săptămânală
# 2. Apoi secvența zilnică
claude "Execută secvența SĂPTĂMÂNALĂ completă din ORCHESTRATOR.md (este Luni), urmată de secvența zilnică."
```

---

## Referințe rapide

| Fișier | Scop |
|--------|------|
| `agents/skills/product-marketing-context.md` | Sursa de adevăr — context produs, audiență, KPI-uri |
| `agents/marketing-team/ORCHESTRATOR.md` | Ordinea de rulare, dependențe, condiții DONE |
| `agents/marketing-team/{agent}/INSTRUCTIONS.md` | Instrucțiuni complete per agent |
| `agents/outputs/strategy/daily-priorities-{DATA}.md` | Priorități zilnice — citit de toți agenții |
| `agents/outputs/paid-measurement/weekly-report-{YYYY-WW}.md` | Sursa de adevăr date — citit de toți agenții |
| `agents/outputs/strategy/context-changelog.md` | Jurnalul modificărilor la product-marketing-context |
