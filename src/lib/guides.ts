import type { Institution } from '@/types'

export type GuideProductId =
  | 'pdf_mai'
  | 'pdf_mapn'
  | 'pdf_sri'
  | 'pdf_anp'
  | 'pdf_bundle_all'

export interface GuideProduct {
  id: GuideProductId
  slug: string
  title: string
  shortTitle: string
  institution: Institution | 'BUNDLE'
  priceLabel: string
  badge?: string
  description: string
  audience: string
  format: string
  pages: string
  accent: string
  glow: string
  image: string
  cta: string
  commonModules: string[]
  specificModules: string[]
  outcomes: string[]
  includes: GuideProductId[]
}

export const GUIDE_PRODUCTS: GuideProduct[] = [
  {
    id: 'pdf_mai',
    slug: 'mai',
    title: 'Ghid PDF MAI',
    shortTitle: 'MAI',
    institution: 'MAI',
    priceLabel: 'Preț configurabil',
    description:
      'Pentru candidații la Poliție, Jandarmerie și structurile MAI care vor să înțeleagă formatul probelor psihologice și ritmul de lucru cerut la evaluare.',
    audience: 'Poliție · Jandarmerie · IGSU',
    format: 'PDF digital',
    pages: '45+ pagini',
    accent: '#2563eb',
    glow: 'rgba(37,99,235,0.18)',
    image: '/images/emblems/mai.png',
    cta: 'Cumpără ghidul MAI',
    commonModules: [
      'Structură de pregătire pe 14 zile',
      'Tipuri de probe și cum le abordezi sub timp',
      'Greșeli frecvente care scad scorul',
    ],
    specificModules: [
      'Ce urmărește evaluarea psihologică în context MAI',
      'Cum îți organizezi antrenamentul pentru ritm, atenție și consecvență',
      'Plan de recapitulare înainte de ziua testului',
    ],
    outcomes: ['Mai mult control sub presiune', 'Ritm mai bun', 'Mai puține erori de neatenție'],
    includes: ['pdf_mai'],
  },
  {
    id: 'pdf_mapn',
    slug: 'mapn',
    title: 'Ghid PDF MApN',
    shortTitle: 'MApN',
    institution: 'MApN',
    priceLabel: 'Preț configurabil',
    description:
      'Ghid dedicat candidaților din zona militară, cu accent pe disciplină, rezistență cognitivă și claritate în condiții de presiune.',
    audience: 'Armata Română · Academii militare',
    format: 'PDF digital',
    pages: '45+ pagini',
    accent: '#059669',
    glow: 'rgba(5,150,105,0.18)',
    image: '/images/emblems/mapn.png',
    cta: 'Cumpără ghidul MApN',
    commonModules: [
      'Structură de pregătire pe 14 zile',
      'Tipuri de probe și cum le abordezi sub timp',
      'Greșeli frecvente care scad scorul',
    ],
    specificModules: [
      'Cum te pregătești pentru probe cu ritm susținut și concentrare prelungită',
      'Mod de lucru pentru autocontrol și acuratețe',
      'Checklist final înainte de evaluare',
    ],
    outcomes: ['Mai multă disciplină în antrenament', 'Execuție mai constantă', 'Mai puțin blocaj sub timp'],
    includes: ['pdf_mapn'],
  },
  {
    id: 'pdf_sri',
    slug: 'sri',
    title: 'Ghid PDF SRI',
    shortTitle: 'SRI',
    institution: 'SRI',
    priceLabel: 'Preț configurabil',
    description:
      'Material pentru candidații care vor un cadru clar de pregătire pentru evaluări unde contează foarte mult consecvența, atenția și controlul deciziei.',
    audience: 'Informații · Contrainformații',
    format: 'PDF digital',
    pages: '45+ pagini',
    accent: '#dc2626',
    glow: 'rgba(220,38,38,0.18)',
    image: '/images/emblems/sri.png',
    cta: 'Cumpără ghidul SRI',
    commonModules: [
      'Structură de pregătire pe 14 zile',
      'Tipuri de probe și cum le abordezi sub timp',
      'Greșeli frecvente care scad scorul',
    ],
    specificModules: [
      'Antrenament pentru atenție fină și consecvență',
      'Cum reduci răspunsurile impulsive și erorile mici',
      'Plan de antrenament pentru claritate cognitivă',
    ],
    outcomes: ['Mai multă precizie', 'Mai puține impulsuri greșite', 'Mai bună stabilitate mentală'],
    includes: ['pdf_sri'],
  },
  {
    id: 'pdf_anp',
    slug: 'anp',
    title: 'Ghid PDF ANP',
    shortTitle: 'ANP',
    institution: 'ANP',
    priceLabel: 'Preț configurabil',
    description:
      'Ghid orientat spre candidații ANP și SNPAP, cu explicații practice pentru evaluarea psihologică, ritm și greșelile care apar cel mai des la test.',
    audience: 'ANP · SNPAP Târgu Ocna',
    format: 'PDF digital',
    pages: '45+ pagini',
    accent: '#7c3aed',
    glow: 'rgba(124,58,237,0.18)',
    image: '/images/emblems/anp.png',
    cta: 'Cumpără ghidul ANP',
    commonModules: [
      'Structură de pregătire pe 14 zile',
      'Tipuri de probe și cum le abordezi sub timp',
      'Greșeli frecvente care scad scorul',
    ],
    specificModules: [
      'Cum te organizezi în jurul ritmului de examen ANP',
      'Exemple de capcane care apar la atenție și logică',
      'Plan de simulare înainte de ziua evaluării',
    ],
    outcomes: ['Mai multă familiaritate cu testul', 'Mai puțină panică', 'Mai multă claritate la evaluare'],
    includes: ['pdf_anp'],
  },
  {
    id: 'pdf_bundle_all',
    slug: 'bundle',
    title: 'Bundle PDF Toate Instituțiile',
    shortTitle: 'Bundle',
    institution: 'BUNDLE',
    priceLabel: 'Best value',
    badge: 'Cea mai bună alegere',
    description:
      'Pachetul complet pentru candidații care vor acces la toate cele 4 ghiduri și o acoperire maximă pentru mai multe instituții sau opțiuni de carieră.',
    audience: 'MAI · MApN · SRI · ANP',
    format: '4 PDF-uri',
    pages: '180+ pagini total',
    accent: '#f97316',
    glow: 'rgba(249,115,22,0.2)',
    image: '/images/anp.png',
    cta: 'Cumpără bundle-ul complet',
    commonModules: [
      'Nucleu comun pentru toate instituțiile',
      'Plan de pregătire modular, reutilizabil',
      'Structură clară pentru comparația cerințelor',
    ],
    specificModules: [
      'Ghid dedicat MAI',
      'Ghid dedicat MApN',
      'Ghid dedicat SRI',
      'Ghid dedicat ANP',
    ],
    outcomes: ['Acoperire completă', 'Flexibilitate maximă', 'Cea mai bună valoare per ghid'],
    includes: ['pdf_mai', 'pdf_mapn', 'pdf_sri', 'pdf_anp'],
  },
]

export function getGuideProduct(productId: GuideProductId) {
  return GUIDE_PRODUCTS.find((product) => product.id === productId) ?? null
}
