# Design System Inspired by Vercel

## 1. Visual Theme & Atmosphere

Vercel's website is the visual thesis of developer infrastructure made invisible — a design system so restrained it borders on philosophical. The page is overwhelmingly white (`#ffffff`) with near-black (`#171717`) text, creating a gallery-like emptiness where every element earns its pixel. This isn't minimalism as decoration; it's minimalism as engineering principle. The Geist design system treats the interface like a compiler treats code — every unnecessary token is stripped away until only structure remains.

The custom Geist font family is the crown jewel. Geist Sans uses aggressive negative letter-spacing (-2.4px to -2.88px at display sizes), creating headlines that feel compressed, urgent, and engineered — like code that's been minified for production. At body sizes, the tracking relaxes but the geometric precision persists. Geist Mono completes the system as the monospace companion for code, terminal output, and technical labels. Both fonts enable OpenType `"liga"` (ligatures) globally, adding a layer of typographic sophistication that rewards close reading.

What distinguishes Vercel from other monochrome design systems is its shadow-as-border philosophy. Instead of traditional CSS borders, Vercel uses `box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.08)` — a zero-offset, zero-blur, 1px-spread shadow that creates a border-like line without the box model implications. This technique allows borders to exist in the shadow layer, enabling smoother transitions, rounded corners without clipping, and a subtler visual weight than traditional borders. The entire depth system is built on layered, multi-value shadow stacks where each layer serves a specific purpose: one for the border, one for soft elevation, one for ambient depth.

**Key Characteristics:**
- Geist Sans with extreme negative letter-spacing (-2.4px to -2.88px at display) — text as compressed infrastructure
- Geist Mono for code and technical labels with OpenType `"liga"` globally
- Shadow-as-border technique: `box-shadow 0px 0px 0px 1px` replaces traditional borders throughout
- Multi-layer shadow stacks for nuanced depth (border + elevation + ambient in single declarations)
- Near-pure white canvas with `#171717` text — not quite black, creating micro-contrast softness
- Workflow-specific accent colors: Ship Red (`#ff5b4f`), Preview Pink (`#de1d8d`), Develop Blue (`#0a72ef`)
- Focus ring system using `hsla(212, 100%, 48%, 1)` — a saturated blue for accessibility
- Pill badges (9999px) with tinted backgrounds for status indicators

## 2. Color Palette & Roles

### Primary
- **Vercel Black** (`#171717`): Primary text, headings, dark surface backgrounds. Not pure black — the slight warmth prevents harshness.
- **Pure White** (`#ffffff`): Page background, card surfaces, button text on dark.
- **True Black** (`#000000`): Secondary use, `--geist-console-text-color-default`, used in specific console/code contexts.

### Workflow Accent Colors
- **Ship Red** (`#ff5b4f`): `--ship-text`, the "ship to production" workflow step — warm, urgent coral-red.
- **Preview Pink** (`#de1d8d`): `--preview-text`, the preview deployment workflow — vivid magenta-pink.
- **Develop Blue** (`#0a72ef`): `--develop-text`, the development workflow — bright, focused blue.

### Console / Code Colors
- **Console Blue** (`#0070f3`): `--geist-console-text-color-blue`, syntax highlighting blue.
- **Console Purple** (`#7928ca`): `--geist-console-text-color-purple`, syntax highlighting purple.
- **Console Pink** (`#eb367f`): `--geist-console-text-color-pink`, syntax highlighting pink.

### Interactive
- **Link Blue** (`#0072f5`): Primary link color with underline decoration.
- **Focus Blue** (`hsla(212, 100%, 48%, 1)`): `--ds-focus-color`, focus ring on interactive elements.
- **Ring Blue** (`rgba(147, 197, 253, 0.5)`): `--tw-ring-color`, Tailwind ring utility.

### Neutral Scale
- **Gray 900** (`#171717`): Primary text, headings, nav text.
- **Gray 600** (`#4d4d4d`): Secondary text, description copy.
- **Gray 500** (`#666666`): Tertiary text, muted links.
- **Gray 400** (`#808080`): Placeholder text, disabled states.
- **Gray 100** (`#ebebeb`): Borders, card outlines, dividers.
- **Gray 50** (`#fafafa`): Subtle surface tint, inner shadow highlight.

### Surface & Overlay
- **Overlay Backdrop** (`hsla(0, 0%, 98%, 1)`): `--ds-overlay-backdrop-color`, modal/dialog backdrop.
- **Selection Text** (`hsla(0, 0%, 95%, 1)`): `--geist-selection-text-color`, text selection highlight.
- **Badge Blue Bg** (`#ebf5ff`): Pill badge background, tinted blue surface.
- **Badge Blue Text** (`#0068d6`): Pill badge text, darker blue for readability.

### Shadows & Depth
- **Border Shadow** (`rgba(0, 0, 0, 0.08) 0px 0px 0px 1px`): The signature — replaces traditional borders.
- **Subtle Elevation** (`rgba(0, 0, 0, 0.04) 0px 2px 2px`): Minimal lift for cards.
- **Card Stack** (`rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px, rgba(0,0,0,0.04) 0px 8px 8px -8px, #fafafa 0px 0px 0px 1px`): Full multi-layer card shadow.
- **Ring Border** (`rgb(235, 235, 235) 0px 0px 0px 1px`): Light gray ring-border for tabs and images.

## 3. Typography Rules

### Font Family
- **Primary**: `Geist`, with fallbacks: `Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol`
- **Monospace**: `Geist Mono`, with fallbacks: `ui-monospace, SFMono-Regular, Roboto Mono, Menlo, Monaco, Liberation Mono, DejaVu Sans Mono, Courier New`
- **OpenType Features**: `"liga"` enabled globally on all Geist text; `"tnum"` for tabular numbers on specific captions.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display Hero | Geist | 48px (3.00rem) | 600 | 1.00–1.17 (tight) | -2.4px to -2.88px | Maximum compression, billboard impact |
| Section Heading | Geist | 40px (2.50rem) | 600 | 1.20 (tight) | -2.4px | Feature section titles |
| Sub-heading Large | Geist | 32px (2.00rem) | 600 | 1.25 (tight) | -1.28px | Card headings, sub-sections |
| Sub-heading | Geist | 32px (2.00rem) | 400 | 1.50 | -1.28px | Lighter sub-headings |
| Card Title | Geist | 24px (1.50rem) | 600 | 1.33 | -0.96px | Feature cards |
| Card Title Light | Geist | 24px (1.50rem) | 500 | 1.33 | -0.96px | Secondary card headings |
| Body Large | Geist | 20px (1.25rem) | 400 | 1.80 (relaxed) | normal | Introductions, feature descriptions |
| Body | Geist | 18px (1.13rem) | 400 | 1.56 | normal | Standard reading text |
| Body Small | Geist | 16px (1.00rem) | 400 | 1.50 | normal | Standard UI text |
| Body Medium | Geist | 16px (1.00rem) | 500 | 1.50 | normal | Navigation, emphasized text |
| Body Semibold | Geist | 16px (1.00rem) | 600 | 1.50 | -0.32px | Strong labels, active states |
| Button / Link | Geist | 14px (0.88rem) | 500 | 1.43 | normal | Buttons, links, captions |
| Button Small | Geist | 14px (0.88rem) | 400 | 1.00 (tight) | normal | Compact buttons |
| Caption | Geist | 12px (0.75rem) | 400–500 | 1.33 | normal | Metadata, tags |
| Mono Body | Geist Mono | 16px (1.00rem) | 400 | 1.50 | normal | Code blocks |
| Mono Caption | Geist Mono | 13px (0.81rem) | 500 | 1.54 | normal | Code labels |
| Mono Small | Geist Mono | 12px (0.75rem) | 500 | 1.00 (tight) | normal | `text-transform: uppercase`, technical labels |
| Micro Badge | Geist | 7px (0.44rem) | 700 | 1.00 (tight) | normal | `text-transform: uppercase`, tiny badges |

### Principles
- **Compression as identity**: Geist Sans at display sizes uses -2.4px to -2.88px letter-spacing — the most aggressive negative tracking of any major design system. This creates text that feels _minified_, like code optimized for production. The tracking progressively relaxes as size decreases: -1.28px at 32px, -0.96px at 24px, -0.32px at 16px, and normal at 14px.
- **Ligatures everywhere**: Every Geist text element enables OpenType `"liga"`. Ligatures aren't decorative — they're structural, creating tighter, more efficient glyph combinations.
- **Three weights, strict roles**: 400 (body/reading), 500 (UI/interactive), 600 (headings/emphasis). No bold (700) except for tiny micro-badges. This narrow weight range creates hierarchy through size and tracking, not weight.
- **Mono for identity**: Geist Mono in uppercase with `"tnum"` or `"liga"` serves as the "developer console" voice — compact technical labels that connect the marketing site to the product.

## 4. Component Stylings

### Buttons

**Primary White (Shadow-bordered)**
- Background: `#ffffff`
- Text: `#171717`
- Padding: 0px 6px (minimal — content-driven width)
- Radius: 6px (subtly rounded)
- Shadow: `rgb(235, 235, 235) 0px 0px 0px 1px` (ring-border)
- Hover: background shifts to `var(--ds-gray-1000)` (dark)
- Focus: `2px solid var(--ds-focus-color)` outline + `var(--ds-focus-ring)` shadow
- Use: Standard secondary button

**Primary Dark (Inferred from Geist system)**
- Background: `#171717`
- Text: `#ffffff`
- Padding: 8px 16px
- Radius: 6px
- Use: Primary CTA ("Start Deploying", "Get Started")

**Pill Button / Badge**
- Background: `#ebf5ff` (tinted blue)
- Text: `#0068d6`
- Padding: 0px 10px
- Radius: 9999px (full pill)
- Font: 12px weight 500
- Use: Status badges, tags, feature labels

**Large Pill (Navigation)**
- Background: transparent or `#171717`
- Radius: 64px–100px
- Use: Tab navigation, section selectors

### Cards & Containers
- Background: `#ffffff`
- Border: via shadow — `rgba(0, 0, 0, 0.08) 0px 0px 0px 1px`
- Radius: 8px (standard), 12px (featured/image cards)
- Shadow stack: `rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px, #fafafa 0px 0px 0px 1px`
- Image cards: `1px solid #ebebeb` with 12px top radius
- Hover: subtle shadow intensification

### Inputs & Forms
- Radio: standard styling with focus `var(--ds-gray-200)` background
- Focus shadow: `1px 0 0 0 var(--ds-gray-alpha-600)`
- Focus outline: `2px solid var(--ds-focus-color)` — consistent blue focus ring
- Border: via shadow technique, not traditional border

### Navigation
- Clean horizontal nav on white, sticky
- Vercel logotype left-aligned, 262x52px
- Links: Geist 14px weight 500, `#171717` text
- Active: weight 600 or underline
- CTA: dark pill buttons ("Start Deploying", "Contact Sales")
- Mobile: hamburger menu collapse
- Product dropdowns with multi-level menus

### Image Treatment
- Product screenshots with `1px solid #ebebeb` border
- Top-rounded images: `12px 12px 0px 0px` radius
- Dashboard/code preview screenshots dominate feature sections
- Soft gradient backgrounds behind hero images (pastel multi-color)

### Distinctive Components

**Workflow Pipeline**
- Three-step horizontal pipeline: Develop → Preview → Ship
- Each step has its own accent color: Blue → Pink → Red
- Connected with lines/arrows
- The visual metaphor for Vercel's core value proposition

**Trust Bar / Logo Grid**
- Company logos (Perplexity, ChatGPT, Cursor, etc.) in grayscale
- Horizontal scroll or grid layout
- Subtle `#ebebeb` border separation

**Metric Cards**
- Large number display (e.g., "10x faster")
- Geist 48px weight 600 for the metric
- Description below in gray body text
- Shadow-bordered card container

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 1px, 2px, 3px, 4px, 5px, 6px, 8px, 10px, 12px, 14px, 16px, 32px, 36px, 40px
- Notable gap: jumps from 16px to 32px — no 20px or 24px in primary scale

### Grid & Container
- Max content width: approximately 1200px
- Hero: centered single-column with generous top padding
- Feature sections: 2–3 column grids for cards
- Full-width dividers using `border-bottom: 1px solid #171717`
- Code/dashboard screenshots as full-width or contained with border

### Whitespace Philosophy
- **Gallery emptiness**: Massive vertical padding between sections (80px–120px+). The white space IS the design — it communicates that Vercel has nothing to prove and nothing to hide.
- **Compressed text, expanded space**: The aggressive negative letter-spacing on headlines is counterbalanced by generous surrounding whitespace. The text is dense; the space around it is vast.
- **Section rhythm**: White sections alternate with white sections — there's no color variation between sections. Separation comes from borders (shadow-borders) and spacing alone.

### Border Radius Scale
- Micro (2px): Inline code snippets, small spans
- Subtle (4px): Small containers
- Standard (6px): Buttons, links, functional elements
- Comfortable (8px): Cards, list items
- Image (12px): Featured cards, image containers (top-rounded)
- Large (64px): Tab navigation pills
- XL (100px): Large navigation links
- Full Pill (9999px): Badges, status pills, tags
- Circle (50%): Menu toggle, avatar containers

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow | Page background, text blocks |
| Ring (Level 1) | `rgba(0,0,0,0.08) 0px 0px 0px 1px` | Shadow-as-border for most elements |
| Light Ring (Level 1b) | `rgb(235,235,235) 0px 0px 0px 1px` | Lighter ring for tabs, images |
| Subtle Card (Level 2) | Ring + `rgba(0,0,0,0.04) 0px 2px 2px` | Standard cards with minimal lift |
| Full Card (Level 3) | Ring + Subtle + `rgba(0,0,0,0.04) 0px 8px 8px -8px` + inner `#fafafa` ring | Featured cards, highlighted panels |
| Focus (Accessibility) | `2px solid hsla(212, 100%, 48%, 1)` outline | Keyboard focus on all interactive elements |

**Shadow Philosophy**: Vercel has arguably the most sophisticated shadow system in modern web design. Rather than using shadows for elevation in the traditional Material Design sense, Vercel uses multi-value shadow stacks where each layer has a distinct architectural purpose: one creates the "border" (0px spread, 1px), another adds ambient softness (2px blur), another handles depth at distance (8px blur with negative spread), and an inner ring (`#fafafa`) creates the subtle highlight that makes the card "glow" from within. This layered approach means cards feel built, not floating.

### Decorative Depth
- Hero gradient: soft, pastel multi-color gradient wash behind hero content (barely visible, atmospheric)
- Section borders: `1px solid #171717` (full dark line) between major sections
- No background color variation — depth comes entirely from shadow layering and border contrast

## 7. Do's and Don'ts

### Do
- Use Geist Sans with aggressive negative letter-spacing at display sizes (-2.4px to -2.88px at 48px)
- Use shadow-as-border (`0px 0px 0px 1px rgba(0,0,0,0.08)`) instead of traditional CSS borders
- Enable `"liga"` on all Geist text — ligatures are structural, not optional
- Use the three-weight system: 400 (body), 500 (UI), 600 (headings)
- Apply workflow accent colors (Red/Pink/Blue) only in their workflow context
- Use multi-layer shadow stacks for cards (border + elevation + ambient + inner highlight)
- Keep the color palette achromatic — grays from `#171717` to `#ffffff` are the system
- Use `#171717` instead of `#000000` for primary text — the micro-warmth matters

### Don't
- Don't use positive letter-spacing on Geist Sans — it's always negative or zero
- Don't use weight 700 (bold) on body text — 600 is the maximum, used only for headings
- Don't use traditional CSS `border` on cards — use the shadow-border technique
- Don't introduce warm colors (oranges, yellows, greens) into the UI chrome
- Don't apply the workflow accent colors (Ship Red, Preview Pink, Develop Blue) decoratively
- Don't use heavy shadows (> 0.1 opacity) — the shadow system is whisper-level
- Don't increase body text letter-spacing — Geist is designed to run tight
- Don't use pill radius (9999px) on primary action buttons — pills are for badges/tags only
- Don't skip the inner `#fafafa` ring in card shadows — it's the glow that makes the system work

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile Small | <400px | Tight single column, minimal padding |
| Mobile | 400–600px | Standard mobile, stacked layout |
| Tablet Small | 600–768px | 2-column grids begin |
| Tablet | 768–1024px | Full card grids, expanded padding |
| Desktop Small | 1024–1200px | Standard desktop layout |
| Desktop | 1200–1400px | Full layout, maximum content width |
| Large Desktop | >1400px | Centered, generous margins |

### Touch Targets
- Buttons use comfortable padding (8px–16px vertical)
- Navigation links at 14px with adequate spacing
- Pill badges have 10px horizontal padding for tap targets
- Mobile menu toggle uses 50% radius circular button

### Collapsing Strategy
- Hero: display 48px → scales down, maintains negative tracking proportionally
- Navigation: horizontal links + CTAs → hamburger menu
- Feature cards: 3-column → 2-column → single column stacked
- Code screenshots: maintain aspect ratio, may horizontally scroll
- Trust bar logos: grid → horizontal scroll
- Footer: multi-column → stacked single column
- Section spacing: 80px+ → 48px on mobile

### Image Behavior
- Dashboard screenshots maintain border treatment at all sizes
- Hero gradient softens/simplifies on mobile
- Product screenshots use responsive images with consistent border radius
- Full-width sections maintain edge-to-edge treatment

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: Vercel Black (`#171717`)
- Background: Pure White (`#ffffff`)
- Heading text: Vercel Black (`#171717`)
- Body text: Gray 600 (`#4d4d4d`)
- Border (shadow): `rgba(0, 0, 0, 0.08) 0px 0px 0px 1px`
- Link: Link Blue (`#0072f5`)
- Focus ring: Focus Blue (`hsla(212, 100%, 48%, 1)`)

### Example Component Prompts
- "Create a hero section on white background. Headline at 48px Geist weight 600, line-height 1.00, letter-spacing -2.4px, color #171717. Subtitle at 20px Geist weight 400, line-height 1.80, color #4d4d4d. Dark CTA button (#171717, 6px radius, 8px 16px padding) and ghost button (white, shadow-border rgba(0,0,0,0.08) 0px 0px 0px 1px, 6px radius)."
- "Design a card: white background, no CSS border. Use shadow stack: rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px, #fafafa 0px 0px 0px 1px. Radius 8px. Title at 24px Geist weight 600, letter-spacing -0.96px. Body at 16px weight 400, #4d4d4d."
- "Build a pill badge: #ebf5ff background, #0068d6 text, 9999px radius, 0px 10px padding, 12px Geist weight 500."
- "Create navigation: white sticky header. Geist 14px weight 500 for links, #171717 text. Dark pill CTA 'Start Deploying' right-aligned. Shadow-border on bottom: rgba(0,0,0,0.08) 0px 0px 0px 1px."
- "Design a workflow section showing three steps: Develop (text color #0a72ef), Preview (#de1d8d), Ship (#ff5b4f). Each step: 14px Geist Mono uppercase label + 24px Geist weight 600 title + 16px weight 400 description in #4d4d4d."

### Iteration Guide
1. Always use shadow-as-border instead of CSS border — `0px 0px 0px 1px rgba(0,0,0,0.08)` is the foundation
2. Letter-spacing scales with font size: -2.4px at 48px, -1.28px at 32px, -0.96px at 24px, normal at 14px
3. Three weights only: 400 (read), 500 (interact), 600 (announce)
4. Color is functional, never decorative — workflow colors (Red/Pink/Blue) mark pipeline stages only
5. The inner `#fafafa` ring in card shadows is what gives Vercel cards their subtle inner glow
6. Geist Mono uppercase for technical labels, Geist Sans for everything else

---

# PsihoPrep — Product Design Document

> Design system: Vercel (see above). Everything below defines *product logic* — screens, flows, hierarchy, states — built on top of that visual foundation.

---

## 10. User Flows

### 10.1 New User Flow

```
Landing page
  └─ CTA "Începe gratuit"
       └─ Auth screen (email / Google OAuth)
            └─ Onboarding Step 1: Alege instituția
                 │  Cards: MAI / MApN / SRI / ANP
                 │  Each card: gradient bg (institution color), icon, full name, description
                 └─ Onboarding Step 2: Setează data examenului (optional, skip available)
                      └─ Dashboard — empty state
                           │  Banner: "Primul tău test te așteaptă"
                           │  CTA primară: "Începe un test rapid"
                           └─ (user starts first test) → Test Engine → Results → Dashboard
```

**Principii onboarding:**
- Maximum 2 pași după auth. Nu cere card bancar, nu cere permisiuni.
- Instituția aleasă colorează întreaga experiență de la acel moment.
- Data examenului alimentează contorul de zile — motivație intrinsecă.
- Empty state-ul nu e gol — are o acțiune clară și zero ambiguitate.

---

### 10.2 Returning User Flow

```
App load → auth check
  ├─ Token valid → Dashboard (< 300ms, SSR)
  │     │  Dacă instituția nu e setată → InstitutionPicker overlay
  │     └─ Dacă instituția e setată → Dashboard cu date live
  └─ Token invalid / expirat → Login screen (redirect după auth)
```

**Dashboard returning user — ierarhie de conținut:**
1. Greeting + scor mediu + streak curent
2. "Continuă de unde ai rămas" (ultima sesiune incompletă, dacă există)
3. Contorul de zile până la examen
4. Categorie slabă (cea cu cel mai mic scor mediu)
5. Quick actions: Test rapid / Simulare / Flashcards
6. Grafic progres ultimele 7 zile

---

## 11. Structura Ecranelor Principale

### 11.1 Dashboard (`/dashboard`)

**Layout:** sidebar fix (desktop) / bottom nav (mobile) + main content area

**Zone principale:**
```
┌─────────────────────────────────────────────────┐
│  [Institution badge]  Bună ziua, [Nume]          │  ← Header row
│  [Streak: 5 zile] [Scor mediu: 72%] [Zile: 18]  │  ← Stats row (3 pills)
├─────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────┐ │
│  │  CONTINUĂ  — Psihologie Organizațională      │ │  ← Resume card (dacă există)
│  │  Rămas: 12 întrebări · Scor curent: 68%     │ │
│  └─────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────┤
│  [Test rapid]  [Simulare]  [Flashcards]          │  ← Quick actions (3 butoane egale)
├─────────────────────────────────────────────────┤
│  Punct slab: Vocabular (54% medie)               │  ← Weak spot nudge
│  [Antrenează acum →]                             │
├─────────────────────────────────────────────────┤
│  Progres săptămânal ▓▓▓▓▓░░  (bar chart simplu) │
├─────────────────────────────────────────────────┤
│  Sesiuni recente (list, max 5)                   │
└─────────────────────────────────────────────────┘
```

**Prioritizare acțiuni:**
- P0 (mereu vizibil): Resume card dacă există sesiune activă
- P1: Quick actions (Test rapid, Simulare, Flashcards)
- P2: Weak spot nudge — direcționare spre categoria cu scor cel mai slab
- P3: Grafic + sesiuni recente — context și motivație retrospectivă

---

### 11.2 Exersează pe Categorii (`/dashboard/test`)

**Flow:**
```
Category grid (6 categorii pentru instituția aleasă)
  └─ Click categorie → Config modal
       │  Nr. întrebări: 10 / 20 / 30
       │  Dificultate: Toate / Ușor / Mediu / Greu
       └─ [Începe]
            └─ Test Engine
                 └─ Results
```

**Category grid layout:**
- 2 coloane (mobile) / 3 coloane (desktop)
- Fiecare card: icon categorie, nume, progres bar (% mediu), nr. întrebări disponibile
- Card stare locked (plan free): overlay semi-transparent, lock icon, "Upgrade"

**Categorii standard per instituție:**
- MAI/ANP: Vocabular, Sinonime/Antonime, Logică, Psihologie, Matematică Aplicată, Atenție
- MApN: Vocabular, Logică, Matematică, Atenție, Figuri Raven, Psihologie
- SRI: Vocabular, Logică, Figuri Raven, Atenție, Psihologie, Raționament Analitic

---

### 11.3 Simulare Examen (`/dashboard/simulate`)

**Flow:**
```
Simulate page
  │  Stat cards: 6 probe · ~90 min · 180 întrebări
  │  Best score banner (dacă există)
  │  Warning box: "Nu poți întrerupe simularea"
  │  Institution selector (dacă plan permite)
  └─ [Pornește simularea]
       └─ SimulationRunner
            │  Progress bar pe probe (Proba 1/6: Vocabular)
            │  Timer global + timer per probă
            │  Întrebare cu opțiuni (fără feedback imediat)
            │  Nav: prev/next + indicator "X/30 răspunse"
            └─ [Finalizează]
                 └─ Results detaliate
```

**Regulă UX critică:** În simulare nu există feedback vizual la răspuns (corect/greșit). Exact ca examenul real. Orice indicator de corectitudine rupe imersiunea și invalidează valoarea simulării.

---

### 11.4 Test Engine (folosit în exersare, nu simulare)

**Layout întrebare:**
```
┌────────────────────────────────────────────────┐
│  [← Înapoi]  Vocabular  Progres: ▓▓▓▓░░  3/10 │  ← Header
├────────────────────────────────────────────────┤
│                                                │
│  [Imagine dacă există — max 60% din înălțime]  │
│                                                │
│  Care este sinonimul cuvântului "arid"?        │  ← Întrebare
│                                                │
│  ○  A. uscat                                   │  ← Opțiuni
│  ○  B. umed                                    │
│  ○  C. fertil                                  │
│  ○  D. mlăștinos                               │
│                                                │
│  [Răspunde →]  (disabled până la selecție)     │
└────────────────────────────────────────────────┘
```

**States opțiuni:**
- Default: border ring `rgba(0,0,0,0.08)`, background `#ffffff`
- Hover: ring `#171717`, cursor pointer
- Selected: ring `#171717` solid 2px, background `#fafafa`
- After submit — Correct: ring + bg verde `#dcfce7`, check icon
- After submit — Wrong: ring + bg roșu `#fee2e2`, X icon
- After submit — Correct answer highlight: verde pe opțiunea corectă

**Feedback post-răspuns:**
- Scurt (1.5s auto-advance) sau manual cu "Următoarea →"
- Dacă greșit: afișează explicație (dacă există în DB)

---

### 11.5 Results (`/dashboard/results` sau inline după test)

**Structură results screen:**
```
┌────────────────────────────────────────────────┐
│  Scor final: 76%                               │  ← Mare, color-coded
│  Corect: 23/30 · Timp: 8m 42s                 │
├────────────────────────────────────────────────┤
│  ████████░░  Vocabular: 80%                    │  ← Progress bars per categorie
│  ██████░░░░  Logică: 60%                       │     (doar pentru simulare sau teste mixte)
├────────────────────────────────────────────────┤
│  Comparație cu media ta: ↑ +4% față de media   │
├────────────────────────────────────────────────┤
│  [Revizuiește greșelile]  [Test nou]           │
└────────────────────────────────────────────────┘
```

**Color coding scor:**
- ≥ 80%: verde `#16a34a` / `bg-green-50`
- 60–79%: amber `#d97706` / `bg-amber-50`
- < 60%: roșu `#dc2626` / `bg-red-50`

---

### 11.6 Review Greșeli (`/dashboard/review`)

**Layout:**
```
Filter bar: [Toate] [Vocabular] [Logică] [Matematică] ...
  └─ List de întrebări greșite
       │  Fiecare item: întrebare truncată, categorie badge, data greșelii
       └─ Click → expandează în-place
            │  Întrebarea completă
            │  Răspunsul tău (roșu) vs. răspunsul corect (verde)
            │  Explicație (dacă există)
            └─ [Marchează ca știut] → dispare din review list
```

**Motivație UX:** Numărul de greșeli nesoluționate apare ca badge pe nav item. Zero greșeli = stare de satisfacție completă (empty state cu mesaj pozitiv).

---

### 11.7 Flashcards (`/dashboard/flashcards`)

**Flow:**
```
Choose deck (per categorie) → Flashcard session
  │  Card față: termen / întrebare
  │  [Întoarce]
  │  Card spate: definiție / răspuns
  │  [Știu ✓]  [Nu știu ✗]
  └─ Progres deck → Stats (știute / rămase)
```

**Animație card flip:** rotație 3D pe axa Y, 300ms, ease-in-out. Card față și spate sunt same-size container — back face hidden.

**Algoritm spaced repetition simplu:**
- "Nu știu" → reapare în același deck mai devreme
- "Știu" → eliminat din sesiunea curentă, revine după N sesiuni

---

### 11.8 Profil & Setări (`/dashboard/profile`)

**Secțiuni:**
1. Info cont: nume, email, avatar (inițiale fallback)
2. Instituție activă: badge colorat + buton "Schimbă"
3. Data examenului: date picker + contorul de zile
4. Plan curent: badge plan + CTA upgrade dacă e free
5. Statistici lifetime: total teste, medie globală, best score
6. Acțiuni: Schimbă parola, Deconectare

---

### 11.9 Pricing (`/dashboard/pricing`)

**Layout:**
- 3 planuri: Free / O Instituție / Toate Instituțiile
- Tabel comparativ feature-by-feature
- CTA principal pe planul recomandat (One Institution)
- Stripe checkout la click

**Free limits clar afișate:** "3 teste/zi · Fără simulare · Fără flashcards"

---

## 12. Design System — PsihoPrep specific

> Fondul vizual: Vercel (§1–9). Adăugările de mai jos acoperă tot ce e specific acestei aplicații.

### 12.1 Paleta de Culori

**Base (light mode):**
| Token | Valoare | Rol |
|-------|---------|-----|
| `--bg-base` | `#ffffff` | Fundal pagină |
| `--bg-surface` | `#fafafa` | Card, sidebar, input |
| `--bg-muted` | `#f4f4f5` | Hover state, disabled bg |
| `--text-primary` | `#171717` | Heading, label |
| `--text-secondary` | `#4d4d4d` | Body text |
| `--text-muted` | `#808080` | Placeholder, timestamp |
| `--border` | `rgba(0,0,0,0.08)` | Ring border (shadow technique) |
| `--border-strong` | `#e5e5e5` | Divider, input border |

**Base (dark mode):**
| Token | Valoare | Rol |
|-------|---------|-----|
| `--bg-base` | `#09090b` | Fundal pagină |
| `--bg-surface` | `#111113` | Card, sidebar |
| `--bg-muted` | `#1a1a1e` | Hover, subtle |
| `--text-primary` | `#f0f2f8` | Heading |
| `--text-secondary` | `#a1a1aa` | Body |
| `--text-muted` | `#71717a` | Muted |
| `--border` | `rgba(255,255,255,0.08)` | Ring border dark |
| `--border-strong` | `rgba(255,255,255,0.12)` | Divider dark |

**Institution accent colors (invariante light/dark):**
| Instituție | Primary | Gradient start | Gradient end | Soft bg (light) | Soft bg (dark) |
|-----------|---------|----------------|--------------|-----------------|----------------|
| MAI | `#1d4ed8` | `#1e3a8a` | `#1d4ed8` | `#eff6ff` | `#172554` at 40% |
| MApN | `#047857` | `#064e3b` | `#059669` | `#ecfdf5` | `#052e16` at 40% |
| SRI | `#b91c1c` | `#7f1d1d` | `#b91c1c` | `#fef2f2` | `#450a0a` at 40% |
| ANP | `#6d28d9` | `#4c1d95` | `#7c3aed` | `#f5f3ff` | `#2e1065` at 40% |

**Semantic colors:**
| Rol | Light | Dark |
|-----|-------|------|
| Success | `#16a34a` | `#4ade80` |
| Warning | `#d97706` | `#fbbf24` |
| Error | `#dc2626` | `#f87171` |
| Info | `#0072f5` | `#60a5fa` |

---

### 12.2 Tipografie

Folosește Geist (§3) cu aceste mapări specifice aplicației:

| Element UI | Size | Weight | Tracking | Note |
|-----------|------|--------|----------|------|
| Page title (H1) | 24px | 700 | -0.96px | Dashboard heading |
| Section title (H2) | 16px | 600 | -0.32px | Card header |
| Label | 14px | 500 | normal | Form label, nav item |
| Body | 14px | 400 | normal | Descrieri |
| Caption | 12px | 400 | normal | Timestamp, metadata |
| Score display | 32px | 700 | -1.28px | Scor mare în results |
| Stat number | 20px | 700 | -0.8px | Numere în stats cards |
| Question text | 16px | 400 | normal | Textul întrebării |
| Option text | 15px | 400 | normal | Variantele de răspuns |
| Timer | 13px Geist Mono | 600 | normal | Cronometru simulare |
| Progress label | 11px Geist Mono | 500 | 0.5px + uppercase | "PROBA 2/6" |

---

### 12.3 Spacing & Layout

Sistem bazat pe 8px (Vercel §5), cu excepții la 4px și 6px pentru micro-elemente.

**Container widths:**
- Sidebar: 240px (desktop) / full-width drawer (mobile)
- Main content: max 720px (centrat în area rămasă)
- Card max-width în grids: auto (fit la grid column)

**Padding intern pagini:** 24px (mobile) / 32px (desktop)

**Gap între secțiuni majore:** 32px
**Gap între carduri în grid:** 16px
**Gap între elemente într-un card:** 12px

---

### 12.4 Carduri

**Card standard:**
```css
background: var(--bg-surface);
border-radius: 12px;
box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px,
            rgba(0,0,0,0.04) 0px 2px 4px;
padding: 20px;
```

**Card interactiv (hover):**
```css
box-shadow: rgba(0,0,0,0.12) 0px 0px 0px 1px,
            rgba(0,0,0,0.08) 0px 4px 8px;
transform: translateY(-1px);
transition: all 150ms ease;
```

**Card selected/active:**
```css
box-shadow: 0 0 0 2px var(--institution-primary);
background: var(--institution-soft-bg);
```

**Card locked:**
```css
opacity: 0.55;
cursor: not-allowed;
/* overlay: absolute inset-0 bg-[var(--bg-surface)]/60 */
```

---

### 12.5 Butoane

**Primary (CTA principal):**
```css
background: #171717;          /* light */
background: #f4f4f5;          /* dark */
color: #ffffff / #171717;
padding: 10px 20px;
border-radius: 8px;
font: 14px/1 Geist weight 500;
box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px;
```

**Primary Institution (CTA cu culoare instituție):**
```css
background: linear-gradient(to right, var(--inst-gradient-start), var(--inst-gradient-end));
color: #ffffff;
padding: 12px 24px;
border-radius: 10px;
font: 15px/1 Geist weight 600;
box-shadow: 0 4px 12px var(--institution-primary)/25%;
```
Hover: `translateY(-1px)`, shadow mai intens.
Disabled: `opacity: 0.4`, `cursor: not-allowed`.

**Secondary / Ghost:**
```css
background: transparent;
border: none;
box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px;  /* ring border */
padding: 10px 16px;
border-radius: 8px;
```

**Danger:**
```css
background: #fee2e2;
color: #dc2626;
box-shadow: rgba(220,38,38,0.15) 0px 0px 0px 1px;
```

**Icon button:**
```css
width: 36px; height: 36px;
border-radius: 8px;
background: var(--bg-muted);
/* icon centered */
```

---

### 12.6 Opțiuni Răspuns (Test Engine)

State machine completă:

```
DEFAULT
  box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px
  bg: var(--bg-surface)
  cursor: pointer

HOVER
  box-shadow: rgba(0,0,0,0.20) 0px 0px 0px 1px
  bg: var(--bg-muted)
  transition: 100ms

SELECTED (pre-submit)
  box-shadow: #171717 0px 0px 0px 2px
  bg: var(--bg-muted)

CORRECT (post-submit)
  box-shadow: #16a34a 0px 0px 0px 2px
  bg: #f0fdf4 (light) / #052e16 (dark)
  icon: ✓ verde

WRONG (post-submit — răspunsul utilizatorului)
  box-shadow: #dc2626 0px 0px 0px 2px
  bg: #fef2f2 (light) / #450a0a (dark)
  icon: ✗ roșu

CORRECT_ANSWER (post-submit — opțiunea corectă când user a greșit)
  box-shadow: #16a34a 0px 0px 0px 1px dashed
  bg: #f0fdf4 / #052e16

DISABLED (alte opțiuni după submit)
  opacity: 0.5
  pointer-events: none
```

---

### 12.7 Progress & Stats

**Progress bar:**
```css
height: 6px;
border-radius: 9999px;
background: var(--bg-muted);
/* fill */
background: linear-gradient(to right, var(--inst-gradient-start), var(--inst-gradient-end));
```

**Streak badge:**
```css
background: #fff7ed;
color: #ea580c;
border-radius: 9999px;
padding: 2px 10px;
font: 12px Geist weight 600;
/* icon: 🔥 sau Flame lucide */
```

**Score pill:**
- Verde dacă ≥ 80%, amber dacă 60-79%, roșu dacă < 60%
- `border-radius: 9999px`, padding `3px 12px`, font Geist Mono 13px weight 600

---

### 12.8 Navigation

**Sidebar items:**
```
[Icon]  Label                    ← default: text-secondary
[Icon]  Label          (active)  ← text-primary + 3px left bar (institution color) + bg-muted
```

**Active left bar:**
```css
position: absolute; left: 0; top: 4px; bottom: 4px;
width: 3px; border-radius: 0 2px 2px 0;
background: var(--institution-primary);
```

**Bottom nav (mobile):**
- 5 items: Home, Test, Simulare, Review, Profil
- Icon + label (10px)
- Active: institution color icon + label
- `border-top: 1px solid var(--border)`

---

## 13. Wireframe Logic per Ecran

### 13.1 Dashboard

```
MOBILE (375px)                    DESKTOP (1280px)
──────────────────                ──────────────────────────────────────
[Header: logo + avatar]           [Sidebar 240px] | [Main content 720px]
[Inst badge + greeting]
[3 stat pills: streak/avg/days]   Sidebar:
[Resume card — if exists]           Logo
[Quick actions: 3 full-width]       Nav items (cu active indicator)
[Weak spot card]                    Upgrade banner jos
[Progress chart]
[Recent sessions]                 Main:
[Bottom nav]                        Greeting row
                                    3 stat cards (grid 3 col)
                                    Resume card (full width)
                                    Quick actions (grid 3 col)
                                    Weak spot + progress (grid 2 col)
                                    Recent sessions (full width)
```

---

### 13.2 Test Engine

```
FULL SCREEN OVERLAY (sau /dashboard/test/[sessionId])
──────────────────────────────────────────────────────
[← Back]   [Categorie]   [Progres: ▓▓▓░░░  3/10]   [Timer dacă simulare]

─────────────────────────────────────────────

         [Imagine — max 280px înălțime, centered]

    Care este sinonimul cuvântului "perspicace"?

    ┌──────────────────────────────────────────┐
    │  ○  A. inteligent                        │
    └──────────────────────────────────────────┘
    ┌──────────────────────────────────────────┐
    │  ○  B. leneș                             │
    └──────────────────────────────────────────┘
    ┌──────────────────────────────────────────┐
    │  ○  C. curajos                           │
    └──────────────────────────────────────────┘
    ┌──────────────────────────────────────────┐
    │  ○  D. tăcut                             │
    └──────────────────────────────────────────┘

              [Răspunde →]  (full width, disabled until selected)
```

---

### 13.3 Results Screen

```
──────────────────────────────────────────────────────
                     76%
              Corect: 23 din 30
              Timp: 8m 42s  ·  +4% față de media ta

──────────────────────────────────────────────────────

  Detalii per categorie (dacă test mixt / simulare):
  Vocabular      ████████░░  80%   20/25
  Logică         ██████░░░░  60%   3/5

──────────────────────────────────────────────────────

  [Revizuiește greșelile]      [Test nou — aceeași categorie]

──────────────────────────────────────────────────────
```

---

### 13.4 Simulate — Running

```
──────────────────────────────────────────────────────
  PROBA 2 / 6  ·  SINONIME ȘI ANTONIME         01:24:38
  ──────────────────────────────────────────────
  Progres probă: ▓▓▓▓▓▓░░░░░░░░░  8 / 30

──────────────────────────────────────────────────────

         [întrebare + opțiuni — fără feedback]

──────────────────────────────────────────────────────

  [← Anterior]                    [Următoarea →]

  [Finalizează proba]  (disponibil doar la ultima întrebare)
```

---

### 13.5 Flashcards

```
──────────────────────────────────────────────────────
  Vocabular  ·  12 rămase din 30       [× Închide]

  ┌──────────────────────────────────────────────┐
  │                                              │
  │              perspicace                      │  ← față (cuvânt)
  │                                              │
  │          [Întoarce cardul]                   │
  └──────────────────────────────────────────────┘

      [✗ Nu știu]              [✓ Știu]
```

```
  ┌──────────────────────────────────────────────┐
  │                                              │
  │   Care percepe rapid și clar; ager la minte; │  ← spate (definiție)
  │   inteligent, isteț                          │
  │                                              │
  └──────────────────────────────────────────────┘
```

---

## 14. States & Empty States

### Empty states (nu lăsa nicio pagină goală)

| Pagină | Empty state |
|--------|-------------|
| Dashboard — fără teste | "Primul test îți ia 3 minute. Hai să vedem unde ești." + CTA |
| Review greșeli — fără greșeli | "Zero greșeli nesoluționate. Bravo!" + icon check verde |
| Flashcards — deck terminat | "Ai parcurs toate cardurile din acest deck." + [Repetă] |
| Progress — fără date | "Completează primul test pentru a vedea statistici." |
| Sesiuni recente — fără sesiuni | "Nu ai sesiuni finalizate. Pornește primul test." |

---

## 15. Motion & Transitions

**Principii:**
- Mișcare funcțională, nu decorativă
- Durată: 150ms pentru hover/focus, 250ms pentru mount/unmount, 300ms pentru flip card
- Easing: `ease-out` pentru intrare, `ease-in` pentru ieșire

**Animații definite:**
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* aplicat pe page sections: animation: fadeUp 300ms ease-out */

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}
/* aplicat pe modals, overlays */
```

**Card flip (flashcards):**
```css
.card-inner {
  transform-style: preserve-3d;
  transition: transform 300ms ease-in-out;
}
.card-inner.flipped { transform: rotateY(180deg); }
.card-front, .card-back { backface-visibility: hidden; }
.card-back { transform: rotateY(180deg); }
```

---

## 16. Accessibility

- Toate butoanele interactive: `focus-visible:outline: 2px solid hsla(212, 100%, 48%, 1)` (Vercel focus ring)
- Contrast minimum 4.5:1 pentru text body, 3:1 pentru text large
- `aria-label` pe icon buttons
- Opțiuni răspuns: `role="radio"`, group cu `role="radiogroup"`
- Timer în simulare: `aria-live="polite"` pentru anunț sub 5 minute
- Reducere mișcare: `@media (prefers-reduced-motion)` dezactivează toate animațiile non-esențiale

---

## 17. Mobile-First Checklist

- [ ] Bottom nav cu 5 items, height 64px, safe area inset bottom
- [ ] Test engine: font întrebare ≥ 16px (iOS zoom prevention)
- [ ] Opțiuni răspuns: height min 52px (touch target)
- [ ] Sidebar: drawer cu swipe-to-close, backdrop blur
- [ ] Timer simulare: sticky top pe mobile
- [ ] Card flip flashcards: tap pe card (nu buton separat pe mobile)
- [ ] Score display: centrat, font mare, vizibil imediat fără scroll
