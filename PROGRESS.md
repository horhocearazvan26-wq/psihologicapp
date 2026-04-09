# PsihologicApp — Progres Dezvoltare

## Stack tehnic
- Next.js 15 + TypeScript + Tailwind CSS (App Router)
- Supabase (auth + PostgreSQL + RLS)
- Stripe (plăți one-time) — de integrat
- Vercel (hosting) — de deploiat

---

## CE S-A CONSTRUIT

### PASUL 1 — Setup + Auth + Dashboard

**Fișiere cheie:**
- `src/middleware.ts` — protecție rute, redirect la login dacă neautentificat
- `src/lib/supabase/client.ts` — client Supabase pentru browser
- `src/lib/supabase/server.ts` — client Supabase pentru Server Components
- `src/types/index.ts` — toate tipurile TypeScript (Institution, TestCategory, UserProfile, TestQuestion etc.)
- `src/lib/utils.ts` — cn(), formatTime(), INSTITUTION_LABELS, CATEGORY_LABELS etc.
- `supabase-schema.sql` — schema completă cu tabele, RLS, triggere

**Tabele Supabase create:**
- `profiles` — extinde auth.users, are subscription_plan, subscribed_institution, stripe_customer_id
- `test_questions` — banca de întrebări (institution, category, options JSONB, correct_answer, difficulty)
- `test_sessions` — sesiuni de test per user (completed, score, answers JSONB)
- `user_progress` — progres agregat per user/institution/category (actualizat automat prin trigger)
- `orders` — comenzi Stripe

**Auth:**
- `src/app/auth/actions.ts` — Server Actions: signInWithEmail, signUpWithEmail, signInWithGoogle, resetPassword, signOut
- `src/app/auth/callback/route.ts` — handler OAuth callback
- `src/app/auth/login/page.tsx`
- `src/app/auth/register/page.tsx`
- `src/app/auth/forgot-password/page.tsx`
- `src/components/auth/auth-form.tsx` — formular unificat login/register/forgot

**Dashboard:**
- `src/app/dashboard/layout.tsx` — layout cu sidebar, preia profil din Supabase
- `src/app/dashboard/page.tsx` — homepage: statistici, instituții, categorii, activitate recentă, CTA upgrade
- `src/app/dashboard/tests/page.tsx` — grila de teste per instituție + categorie, arată progres
- `src/app/dashboard/progress/page.tsx` — statistici detaliate, progress bars, istoric sesiuni
- `src/app/dashboard/pricing/page.tsx` — pagina prețuri (Gratuit / 69 lei / 119 lei)
- `src/components/dashboard/sidebar.tsx` — navigare cu 5 link-uri + user info + logout

**Landing page:**
- `src/app/page.tsx` — pagina publică cu hero, instituții, categorii, prețuri, CTA

**Componente UI:**
- `src/components/ui/button.tsx` — Button cu variante: primary, secondary, outline, ghost, danger
- `src/components/ui/input.tsx` — Input cu label, error, hint
- `src/components/ui/card.tsx` — Card, CardHeader, CardContent, CardFooter

---

### PASUL 2 — Motor de Teste + Bancă de Întrebări

**API:**
- `src/app/api/tests/session/route.ts`
  - POST — pornește sesiune, preia întrebări random din DB, respectă limita free(15)/paid(30)
  - PATCH — primește răspunsuri, calculează scor, salvează în DB, trigger actualizează user_progress
- `src/app/api/seed/route.ts`
  - POST — seeduiește toate întrebările pentru cele 4 instituții în Supabase
  - GET — returnează numărul total de întrebări din DB

**Banca de întrebări (generate procedural/static):**
- `src/lib/questions/logic.ts` — serii numerice, analogii verbale, silogisme (~38 întrebări × 4 inst.)
- `src/lib/questions/numerical.ts` — aritmetică, procente, probleme text (~40 întrebări × 4 inst.)
- `src/lib/questions/vocabulary.ts` — sinonime, antonime, definiții (~53 întrebări × 4 inst.)
- `src/lib/questions/memory.ts` — liste, pattern-uri, memorie de lucru (~26 întrebări × 4 inst.)
- `src/lib/questions/personality.ts` — judecată situațională, auto-evaluare (~15 întrebări × 4 inst.)

**UI Test Engine:**
- `src/components/tests/test-engine.tsx` — motor complet cu:
  - Ecran intro (info test, limită free/paid)
  - Cronometru vizual cu 2 bare colorate (progres + timp)
  - Navigare liberă între întrebări
  - Grilă de navigare rapidă (dots colorate: albastru=curent, verde=răspuns, gri=neatins)
  - Ecran rezultate cu scor + review detaliat (răspuns corect/greșit + explicație per întrebare)
- `src/app/dashboard/tests/[institution]/[category]/page.tsx` — pagina de test pentru fiecare combinație

**Cum se seeduiesc întrebările:**
```
POST http://localhost:3000/api/seed
```
(sau din Postman/Thunder Client)

---

### PASUL 3 — Toulouse-Piéron (Canvas) + Matrici Raven (SVG)

**Toulouse-Piéron:**
- `src/components/tests/toulouse/symbols.ts` — 32 simboluri unice (4 forme × 8 poziții punct), generare grilă, funcție drawSymbol pe Canvas
- `src/components/tests/toulouse/toulouse-canvas.tsx` — Canvas interactiv: click pentru marcare celule, re-render la schimbare stare
- `src/components/tests/toulouse/toulouse-test.tsx` — test complet:
  - Grilă 20×25 = 500 simboluri
  - 2 simboluri-țintă afișate în header
  - Cronometru 10 minute strict
  - Scor = hits − false alarms
  - Ecran rezultate: hits, misses, false alarms, scor net

**Matrici Raven:**
- `src/components/tests/raven/raven-patterns.ts` — generare procedurală matrici 3×3 cu 5 reguli:
  1. Progresie umplere (empty → striped → filled)
  2. Progresie număr de forme (1 → 2 → 3)
  3. Rotație forme pe coloane
  4. Progresie dimensiune (small → medium → large)
  5. Combinație (formă + umplere + dimensiune)
- `src/components/tests/raven/cell-svg.tsx` — randare SVG per celulă: cerc, pătrat, triunghi, romb, cruce, stea × empty/filled/striped/dotted × small/medium/large
- `src/components/tests/raven/raven-test.tsx` — 20 matrici, 6 opțiuni, navigare liberă, review la final

**Integrare atenție:**
- `src/components/tests/attention-selector.tsx` — selector între Toulouse-Piéron și Matrici Raven
- `src/app/dashboard/tests/[institution]/attention/page.tsx` — ruta dedicată pentru categoria attention

---

## CE URMEAZĂ (neimplementat)

### PASUL 4 — Simulare Examen Complet
- Pagina `/dashboard/simulate`
- Selectezi instituția → pornește simulare cu toate categoriile în ordine
- Cronometru global pentru simulare
- Raport final complet per categorie

### PASUL 5 — Integrare Stripe
- `src/app/api/stripe/checkout/route.ts` — creează sesiune Stripe Checkout
- `src/app/api/stripe/webhook/route.ts` — webhook: la plată reușită, actualizează profiles.subscription_plan
- Completare `.env.local` cu cheile Stripe

### PASUL 6 — Deploy Vercel
- Creare cont Vercel, import repo GitHub
- Configurare variabile de mediu în Vercel
- Configurare domeniu custom (ex: psihologicapp.ro)

---

## VARIABILE DE MEDIU (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://lwkphgxatgngitczqwep.supabase.co   ✅
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...   ✅
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...   ✅
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=   ❌ de adăugat
STRIPE_SECRET_KEY=   ❌ de adăugat
STRIPE_WEBHOOK_SECRET=   ❌ de adăugat
STRIPE_PRICE_ONE_INSTITUTION=   ❌ de adăugat
STRIPE_PRICE_ALL_INSTITUTIONS=   ❌ de adăugat
NEXT_PUBLIC_APP_URL=http://localhost:3000   ✅ (de schimbat la deploy)
```

---

## PREȚURI

| Plan | Preț | Acces |
|------|------|-------|
| Gratuit | 0 lei | 15 întrebări demo per categorie |
| O Instituție | 69 lei | Acces complet 1 instituție (MAI / MApN / SRI / ANP) |
| Toate Instituțiile | 119 lei | Acces complet toate 4 instituțiile |

Plată unică via Stripe, fără abonament.

---

## PORNIRE LOCALĂ

```bash
cd /Users/razvanhorhocea/Desktop/PSIHOLOGICapp
npm run dev
# Aplicația rulează pe http://localhost:3000
```

**Prima dată:** Rulează `supabase-schema.sql` în Supabase SQL Editor, apoi seeduiește întrebările:
```
POST http://localhost:3000/api/seed
```
