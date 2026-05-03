import type { QuestionRow } from './rationament-analitic'
import {
  attachInstitution,
  buildMcqOptions,
  ensureUniqueByText,
  type Difficulty,
  type QuestionDraft,
} from './helpers'

function makeQuestion(
  prompt: string,
  correct: string,
  distractors: string[],
  explanation: string,
  difficulty: Difficulty,
  metadata: Record<string, unknown> = {}
): QuestionDraft {
  const { options, correct_answer } = buildMcqOptions(correct, distractors, prompt)
  return {
    category: 'transfer-analogic',
    question_text: prompt,
    options,
    correct_answer,
    explanation,
    difficulty,
    metadata,
    is_active: true,
  }
}

const directAnalogies: Array<[string, string, string, string, string[]]> = [
  ['CARTE', 'CITIT', 'VIOARĂ', 'CÂNTAT', ['ASCULTAT', 'ACORDAT', 'COMPUS']],
  ['TERMOMETRU', 'TEMPERATURĂ', 'BAROMETRU', 'PRESIUNE ATMOSFERICĂ', ['UMIDITATE', 'VÂNT', 'ALTITUDINE']],
  ['STUP', 'ALBINE', 'MUȘUROI', 'FURNICI', ['TERMITE', 'GÂNDACI', 'VIESPI']],
  ['PLANETĂ', 'STEA', 'SATELIT', 'PLANETĂ', ['GALAXIE', 'COMETĂ', 'ASTEROID']],
  ['LEGE', 'PARLAMENT', 'SENTINȚĂ', 'TRIBUNAL', ['GUVERN', 'POLIȚIE', 'AVOCAT']],
  ['CLOROPLAST', 'FOTOSINTEZĂ', 'MITOCONDRIE', 'RESPIRAȚIE CELULARĂ', ['DIVIZIUNE', 'TRANSCRIPȚIE', 'FERMENTAȚIE']],
  ['ANTICORP', 'ANTIGEN', 'CHEIE', 'LACĂT', ['MÂNER', 'BROASCĂ', 'BALAMA']],
  ['SINTAXĂ', 'LIMBAJ', 'ALGORITM', 'PROGRAMARE', ['LOGICĂ', 'MATEMATICĂ', 'COMPILATOR']],
  ['COROZIUNE', 'METAL', 'PUTREFACȚIE', 'MATERIE ORGANICĂ', ['PLASTIC', 'STICLĂ', 'RĂȘINĂ']],
  ['EPITELIU', 'PROTECȚIE', 'NEURON', 'TRANSMITERE', ['DIVIZIUNE', 'DIGESTIE', 'DILATARE']],
]

const relationalAnalogies: Array<[string, string, string, string, string[], string]> = [
  ['MIEL', 'OAIE', 'PUI', 'GĂINĂ', ['RAȚĂ', 'CURCAN', 'CUȘCĂ'], 'relație de descendent'],
  ['SEMINȚE', 'PLANTĂ', 'OU', 'PASĂRE', ['PENE', 'CUIB', 'COAJĂ'], 'relație de formă incipientă'],
  ['CUVÂNT', 'PROPOZIȚIE', 'NOTĂ', 'MELODIE', ['PORTATIV', 'RITM', 'MUZICIAN'], 'relație parte-întreg compozițional'],
  ['OSMOZĂ', 'MEMBRANĂ', 'DIFUZIE', 'GRADIENT DE CONCENTRAȚIE', ['PRESIUNE', 'TEMPERATURĂ', 'CATALIZATOR'], 'relație proces-condiție'],
  ['EROZIUNE', 'ROCĂ', 'INFLAȚIE', 'PUTERE DE CUMPĂRARE', ['PREȚURI', 'DOBÂNDĂ', 'MONEDĂ'], 'relație proces de diminuare'],
  ['ATROFIE', 'MUȘCHI', 'DEPOPULARE', 'ORAȘ', ['ECONOMIE', 'INFRASTRUCTURĂ', 'CULTURĂ'], 'relație de reducere a masei/numărului'],
  ['PARADOX', 'LOGICĂ', 'DISONANȚĂ', 'MUZICĂ', ['FILOZOFIE', 'FIZICĂ', 'MATEMATICĂ'], 'relație de tensiune față de regulile domeniului'],
  ['SEISM', 'CUTREMUR', 'TSUNAMI', 'UNDĂ SEISMICĂ MARINĂ', ['ERUPȚIE', 'ALUNECARE', 'VÂNT PUTERNIC'], 'relație termen tehnic - fenomen'],
  ['IMPULS', 'NEURON', 'SEMNAL', 'FIBRĂ OPTICĂ', ['EMIȚĂTOR', 'ANTENĂ', 'RECEPTOR'], 'relație propagare prin suport'],
  ['PARADIGMĂ', 'ȘTIINȚĂ', 'DOGMĂ', 'RELIGIE', ['POLITICĂ', 'ARTĂ', 'RETORICĂ'], 'relație cadru de referință al domeniului'],
]

const functionalAnalogies: Array<[string, string, string, string, string[]]> = [
  ['SCALPEL', 'INCIZIE', 'DALTĂ', 'CIOPLIRE', ['POLIZARE', 'MĂSURARE', 'FIXARE']],
  ['FILTRU', 'PURIFICARE', 'PARATRĂSNET', 'PROTECȚIE', ['ACCELERARE', 'DILATARE', 'CONSERVARE']],
  ['CATALIZATOR', 'ACCELERAREA REACȚIEI', 'STIMULENT', 'ACCELERAREA ACTIVITĂȚII', ['DIZOLVAREA', 'NEUTRALIZAREA', 'IZOLAREA']],
  ['ARHIVĂ', 'STOCARE', 'ANTENĂ', 'RECEPȚIE', ['COMPRESIE', 'DECODARE', 'EMISIE']],
  ['CONSTITUȚIE', 'ORGANIZAREA STATULUI', 'GENOM', 'ORGANIZAREA ORGANISMULUI', ['EREDITATEA', 'MUTAȚIA', 'ADAPTAREA']],
  ['BUSOLĂ', 'ORIENTARE', 'TERMOSTAT', 'REGLARE', ['AMPLIFICARE', 'COMPRESIE', 'PROIECȚIE']],
]

const items: QuestionDraft[] = ensureUniqueByText([
  ...directAnalogies.map(([a, b, c, correct, distractors]) =>
    makeQuestion(
      `${a} este pentru ${b} ceea ce ${c} este pentru ___`,
      correct,
      distractors,
      `Relația dintre primele două elemente este păstrată și în a doua pereche; varianta corectă este ${correct.toLowerCase()}.`,
      1,
      { family: 'direct' }
    )
  ),
  ...relationalAnalogies.map(([a, b, c, correct, distractors, relation], index) =>
    makeQuestion(
      `${a} este pentru ${b} ceea ce ${c} este pentru ___`,
      correct,
      distractors,
      `Analogia se bazează pe ${relation}. Relația A:B este replicată de C:${correct}.`,
      index < 5 ? 2 : 3,
      { family: 'relational', relation }
    )
  ),
  ...functionalAnalogies.map(([a, b, c, correct, distractors], index) =>
    makeQuestion(
      `${a} este pentru ${b} ceea ce ${c} este pentru ___`,
      correct,
      distractors,
      `În ambele perechi vorbim despre funcția principală a obiectului sau sistemului. ${a} servește pentru ${b.toLowerCase()}, iar ${c} pentru ${correct.toLowerCase()}.`,
      index < 3 ? 2 : 3,
      { family: 'functional' }
    )
  ),
])

export function generateTransferAnalogic(institution: string): QuestionRow[] {
  return attachInstitution(items, institution)
}
