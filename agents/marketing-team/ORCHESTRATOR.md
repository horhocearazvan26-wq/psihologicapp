# ORCHESTRATOR — Echipa de Marketing AI PSIHOLOGICapp
**Versiune:** 1.0  
**Actualizat:** verifică git log  
**Responsabil:** Agentul STRATEGY

---

## Cei 7 Agenți & Specialitățile Lor

| # | ID | Specialitate | Folder instrucțiuni |
|---|----|--------------|--------------------|
| 1 | `strategy` | Director Strategie & Revenue | `agents/marketing-team/strategy/` |
| 2 | `seo-content` | Expert SEO & Vizibilitate Organică | `agents/marketing-team/seo-content/` |
| 3 | `content-copy` | Strateg Conținut & Copywriter | `agents/marketing-team/content-copy/` |
| 4 | `cro` | Specialist Conversii & Optimizare | `agents/marketing-team/cro/` |
| 5 | `paid-measurement` | Manager Paid Ads & Analytics | `agents/marketing-team/paid-measurement/` |
| 6 | `growth-retention` | Specialist Creștere & Retenție | `agents/marketing-team/growth-retention/` |
| 7 | `sales-gm` | Manager Vânzări & Revenue Ops | `agents/marketing-team/sales-gm/` |

---

## Regula de Aur

**Toți agenții citesc `agents/skills/product-marketing-context.md` PRIMUL.**  
Dacă fișierul a fost modificat (verifică `agents/outputs/strategy/context-changelog.md`), toți agenții îl recitesc înainte de a executa orice sarcină.

---

## Secvența de Rulare Zilnică

```
START (în fiecare zi)
│
├─► [1] STRATEGY ──── produce daily-priorities ────────────────────────────┐
│         DONE când: agents/outputs/strategy/daily-priorities-{DATA}.md există
│                                                                            │
│   ┌────────────────────────────────────────────────────────────────────── ▼
│   │  Rulează în PARALEL (nu au dependențe între ele, ambele citesc doar outputs/strategy):
│   │
│   ├─► [2] SEO-CONTENT ── produce daily-report SEO
│   │         DONE când: agents/outputs/seo-content/daily-report-{DATA}.md există
│   │
│   └─► [3] CONTENT-COPY ── produce social-posts
│             DONE când: agents/outputs/content-copy/social-posts-{DATA}.md există
│
│   ┌─── Așteaptă DONE de la [2] și [3] ────────────────────────────────────
│   │
│   ├─► [4] CRO ── verifică metrici, actualizează teste A/B
│   │         PRIMEȘTE: outputs/content-copy/ (copy) + outputs/paid-measurement/ (date)
│   │         DONE când: agents/outputs/cro/daily-report-{DATA}.md există
│   │
│   └─► [5] PAID-MEASUREMENT ── verifică campanii, produce daily-report
│             PRIMEȘTE: outputs/cro/ (conversii per landing page)
│             DONE când: agents/outputs/paid-measurement/daily-report-{DATA}.md există
│
│   ┌─── Așteaptă DONE de la [4] și [5] ────────────────────────────────────
│   │
│   ├─► [6] GROWTH-RETENTION ── monitorizează churn, activează reactivări
│   │         PRIMEȘTE: outputs/paid-measurement/ (segmente utilizatori)
│   │         DONE când: agents/outputs/growth-retention/daily-report-{DATA}.md există
│   │
│   └─► [7] SALES-GM ── verifică pipeline revenue, actualizează tracker
│             PRIMEȘTE: outputs/growth-retention/ + outputs/paid-measurement/
│             DONE când: agents/outputs/sales-gm/daily-report-{DATA}.md există
│
END (toți agenții au daily-report scris)
```

### Vizualizare paralelism zilnic

```
STRATEGY ──────────────────────────────────────────────────────────► [DONE]
    │
    ├── SEO-CONTENT ─────────────────────────────────────────────────► [DONE]
    └── CONTENT-COPY ────────────────────────────────────────────────► [DONE]
                              │                          │
                              ▼                          ▼
                    CRO ─────────────────────────────────► [DONE]
                    PAID-MEASUREMENT ────────────────────► [DONE]
                              │                          │
                              ▼                          ▼
                    GROWTH-RETENTION ────────────────────► [DONE]
                    SALES-GM ────────────────────────────► [DONE]
```

**Timp estimat de rulare zilnică completă:** ~45-60 minute (cu paralelism)

---

## Secvența de Rulare Săptămânală

Se execută **în fiecare Luni dimineață**, înainte de secvența zilnică:

```
START SĂPTĂMÂNAL (Luni)
│
├─► [1] STRATEGY ── produce weekly-strategy + actualizează product-marketing-context dacă e necesar
│         DONE când: agents/outputs/strategy/weekly-strategy-{YYYY-WW}.md există
│
│   ┌─── Rulează în PARALEL după STRATEGY ──────────────────────────────────
│   │
│   ├─► [2] SEO-CONTENT ── audit SEO + generează brief-uri programatice
│   │         DONE când: agents/outputs/seo-content/weekly-audit-{YYYY-WW}.md
│   │                  + agents/outputs/seo-content/programmatic-briefs-{YYYY-WW}.md
│   │
│   └─► [5] PAID-MEASUREMENT ── produce weekly-report unificat
│             DONE când: agents/outputs/paid-measurement/weekly-report-{YYYY-WW}.md
│             ⚠ ACEST RAPORT este citit de TOȚI agenții în săptămâna curentă
│
│   ┌─── Rulează în PARALEL după SEO-CONTENT ────────────────────────────────
│   │
│   └─► [3] CONTENT-COPY ── scrie articol blog + email săptămânal + plan editorial
│             PRIMEȘTE: programmatic-briefs de la SEO-CONTENT
│             DONE când: agents/outputs/content-copy/blog-{slug}.md
│                      + agents/outputs/content-copy/email-weekly-{YYYY-WW}.md
│                      + agents/outputs/content-copy/editorial-plan-{YYYY-WW}.md
│
│   ┌─── Rulează în PARALEL după CONTENT-COPY ───────────────────────────────
│   │
│   ├─► [4] CRO ── audit funnel + lansează test A/B + recomandări landing page
│   │         PRIMEȘTE: copy nou de la CONTENT-COPY
│   │         DONE când: agents/outputs/cro/weekly-audit-{YYYY-WW}.md
│   │                  + agents/outputs/cro/ab-test-*.md (test nou)
│   │
│   └─► [5] PAID-MEASUREMENT ── ad creatives noi + optimizare audiențe
│             DONE când: agents/outputs/paid-measurement/ad-creatives-{YYYY-WW}.md
│
│   ┌─── Rulează în PARALEL după CRO și PAID-MEASUREMENT ───────────────────
│   │
│   ├─► [6] GROWTH-RETENTION ── retention report + referral + comunitate
│   │         DONE când: agents/outputs/growth-retention/weekly-retention-{YYYY-WW}.md
│   │
│   └─► [7] SALES-GM ── revenue audit + pricing + b2b outreach
│             DONE când: agents/outputs/sales-gm/weekly-revenue-{YYYY-WW}.md
│
END SĂPTĂMÂNAL (toți agenții au livrat rapoartele săptămânale)
```

---

## Condiții de DONE per Agent

| Agent | Condiție DONE Zilnic | Condiție DONE Săptămânal |
|-------|---------------------|--------------------------|
| strategy | `outputs/strategy/daily-priorities-{DATA}.md` există | `outputs/strategy/weekly-strategy-{YYYY-WW}.md` există |
| seo-content | `outputs/seo-content/daily-report-{DATA}.md` există | `outputs/seo-content/weekly-audit-{YYYY-WW}.md` + `programmatic-briefs-{YYYY-WW}.md` există |
| content-copy | `outputs/content-copy/social-posts-{DATA}.md` există | `outputs/content-copy/blog-*.md` + `email-weekly-{YYYY-WW}.md` + `editorial-plan-{YYYY-WW}.md` există |
| cro | `outputs/cro/daily-report-{DATA}.md` există | `outputs/cro/weekly-audit-{YYYY-WW}.md` + `ab-test-*.md` (nou) există |
| paid-measurement | `outputs/paid-measurement/daily-report-{DATA}.md` există | `outputs/paid-measurement/weekly-report-{YYYY-WW}.md` + `ad-creatives-{YYYY-WW}.md` există |
| growth-retention | `outputs/growth-retention/daily-report-{DATA}.md` există | `outputs/growth-retention/weekly-retention-{YYYY-WW}.md` există |
| sales-gm | `outputs/sales-gm/daily-report-{DATA}.md` există | `outputs/sales-gm/weekly-revenue-{YYYY-WW}.md` există |

---

## Reguli de Paralelism

### Pot rula în PARALEL (fără dependențe între ele):
- `seo-content` și `content-copy` (ambele depind doar de `strategy`)
- `cro` și `paid-measurement` (ambele procesează output-uri din pasul anterior)
- `growth-retention` și `sales-gm` (ambele procesează output-uri finale)

### Trebuie să ruleze SECVENȚIAL:
- `strategy` ÎNAINTE de orice alt agent
- `seo-content` ÎNAINTE de `content-copy` (săptămânal — brief-urile programatice)
- `content-copy` ÎNAINTE de `cro` (copy-ul e necesar pentru teste A/B și landing pages)
- `paid-measurement` ÎNAINTE de `growth-retention` (segmentele de utilizatori)

---

## Condiții de Escaladare la Utilizator (Orice Agent)

Oprește execuția autonomă și notifică utilizatorul dacă:

1. **Budget** — orice ajustare de paid ads >200 RON/zi sau total >500 RON/lună
2. **Prețuri** — orice schimbare permanentă a planurilor de prețuri
3. **Conversii în cădere** — rata Free→Pro < 4% pe 2 săptămâni consecutive
4. **Retenție critică** — rata de retenție < 55% pe 2 săptămâni consecutive
5. **Tracking broken** — evenimentele de analytics lipsesc >24 ore
6. **Competitor major** — competitor lansează ofertă care ne subprețuiește >30%
7. **Date admitere** — sesiune de admitere MAI/MApN/SRI/ANP anunțată sau modificată
8. **Parteneriate** — orice parteneriat B2B cu valoare >1000 RON/an
9. **Criză PR** — feedback negativ viral în comunitate sau presă

---

## Structura Completă de Fișiere

```
agents/
├── skills/
│   └── product-marketing-context.md        ← SURSA DE ADEVĂR (editată doar de STRATEGY)
│
├── marketing-team/
│   ├── ORCHESTRATOR.md                     ← acest fișier
│   ├── strategy/
│   │   └── INSTRUCTIONS.md
│   ├── seo-content/
│   │   └── INSTRUCTIONS.md
│   ├── content-copy/
│   │   └── INSTRUCTIONS.md
│   ├── cro/
│   │   └── INSTRUCTIONS.md
│   ├── paid-measurement/
│   │   └── INSTRUCTIONS.md
│   ├── growth-retention/
│   │   └── INSTRUCTIONS.md
│   └── sales-gm/
│       └── INSTRUCTIONS.md
│
└── outputs/
    ├── strategy/
    ├── seo-content/
    ├── content-copy/
    ├── cro/
    ├── paid-measurement/
    ├── growth-retention/
    └── sales-gm/
```
