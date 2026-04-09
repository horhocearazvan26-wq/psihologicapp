import type { TestQuestion } from '@/types'

export function generateVocabularyQuestions(institution: string): Omit<TestQuestion, 'id' | 'created_at'>[] {
  const questions: Omit<TestQuestion, 'id' | 'created_at'>[] = []

  // Synonyms
  const synonyms = [
    { word: 'abil', syn: 'priceput', w: ['leneș', 'trist', 'zgomotos'] },
    { word: 'acerb', syn: 'aspru', w: ['blând', 'vesel', 'moale'] },
    { word: 'afabil', syn: 'prietenos', w: ['ursuz', 'distant', 'sever'] },
    { word: 'anost', syn: 'plictisitor', w: ['interesant', 'amuzant', 'viu'] },
    { word: 'aprig', syn: 'înfocat', w: ['calm', 'pasiv', 'rece'] },
    { word: 'ardoare', syn: 'entuziasm', w: ['lene', 'indiferență', 'tristețe'] },
    { word: 'asiduu', syn: 'perseverent', w: ['neglijent', 'distrat', 'leneș'] },
    { word: 'auster', syn: 'sobru', w: ['vesel', 'colorat', 'luxos'] },
    { word: 'avar', syn: 'zgârcit', w: ['generos', 'darnic', 'cheltuitor'] },
    { word: 'candid', syn: 'naiv', w: ['viclean', 'calculat', 'inteligent'] },
    { word: 'chibzuit', syn: 'prudent', w: ['nechibzuit', 'impulsiv', 'neglijent'] },
    { word: 'cinstit', syn: 'onest', w: ['mincinos', 'corupt', 'perfid'] },
    { word: 'clarvăzător', syn: 'perspicace', w: ['naiv', 'orb', 'distrat'] },
    { word: 'concis', syn: 'succint', w: ['verbose', 'lung', 'detaliat'] },
    { word: 'credul', syn: 'naiv', w: ['suspicios', 'sceptic', 'prudent'] },
    { word: 'dificil', syn: 'complicat', w: ['ușor', 'simplu', 'clar'] },
    { word: 'diligent', syn: 'harnic', w: ['leneș', 'neglijent', 'pasiv'] },
    { word: 'discret', syn: 'rezervat', w: ['zgomotos', 'indiscret', 'evident'] },
    { word: 'eficient', syn: 'productiv', w: ['ineficient', 'leneș', 'pasiv'] },
    { word: 'eminent', syn: 'ilustru', w: ['obscur', 'mediocru', 'necunoscut'] },
    { word: 'enigmatic', syn: 'misterios', w: ['clar', 'evident', 'simplu'] },
    { word: 'elocvent', syn: 'convingător', w: ['mut', 'neclar', 'nesigur'] },
    { word: 'fastidios', syn: 'pretențios', w: ['modest', 'simplu', 'mulțumit'] },
    { word: 'feroce', syn: 'sălbatic', w: ['blând', 'domestic', 'calm'] },
    { word: 'fidel', syn: 'loial', w: ['trădător', 'infidel', 'nesigur'] },
    { word: 'frivol', syn: 'superficial', w: ['serios', 'profund', 'matur'] },
    { word: 'generos', syn: 'darnic', w: ['zgârcit', 'avar', 'meschin'] },
    { word: 'habotnic', syn: 'fanatic', w: ['tolerant', 'moderat', 'deschis'] },
    { word: 'imparțial', syn: 'neutru', w: ['părtinitor', 'subiectiv', 'interesat'] },
    { word: 'insolent', syn: 'impertinent', w: ['politicos', 'respectuos', 'modest'] },
  ]

  synonyms.forEach(({ word, syn, w }) => {
    const opts = shuffle([syn, ...w])
    questions.push({
      institution: institution as TestQuestion['institution'],
      category: 'vocabulary',
      question_text: `Care este sinonimul cuvântului "${word}"?`,
      options: opts,
      correct_answer: opts.indexOf(syn),
      explanation: `Sinonimul lui "${word}" este "${syn}".`,
      difficulty: 2,
      metadata: { type: 'synonym', word },
      is_active: true,
    })
  })

  // Antonyms
  const antonyms = [
    { word: 'optimist', ant: 'pesimist', w: ['realist', 'neutru', 'pasiv'] },
    { word: 'victorie', ant: 'înfrângere', w: ['luptă', 'meci', 'concurs'] },
    { word: 'curaj', ant: 'lașitate', w: ['forță', 'putere', 'energie'] },
    { word: 'abundență', ant: 'lipsă', w: ['bogăție', 'surplus', 'exces'] },
    { word: 'adevăr', ant: 'minciună', w: ['realitate', 'fapt', 'dovadă'] },
    { word: 'a accepta', ant: 'a refuza', w: ['a lua', 'a primi', 'a cere'] },
    { word: 'zel', ant: 'nepăsare', w: ['entuziasm', 'dorință', 'motivație'] },
    { word: 'a avansa', ant: 'a regresa', w: ['a merge', 'a rămâne', 'a pleca'] },
    { word: 'limpede', ant: 'tulbure', w: ['curat', 'pur', 'cristal'] },
    { word: 'a întări', ant: 'a slăbi', w: ['a pune', 'a plasa', 'a adăuga'] },
    { word: 'spontan', ant: 'premeditat', w: ['natural', 'direct', 'imediat'] },
    { word: 'a înflori', ant: 'a se ofili', w: ['a crește', 'a apărea', 'a trăi'] },
    { word: 'vanitate', ant: 'modestie', w: ['aroganță', 'mândrie', 'orgoliu'] },
    { word: 'a construi', ant: 'a demola', w: ['a ridica', 'a fabrica', 'a produce'] },
    { word: 'inocent', ant: 'vinovat', w: ['curat', 'pur', 'nevinovat'] },
  ]

  antonyms.forEach(({ word, ant, w }) => {
    const opts = shuffle([ant, ...w])
    questions.push({
      institution: institution as TestQuestion['institution'],
      category: 'vocabulary',
      question_text: `Care este antonimul cuvântului "${word}"?`,
      options: opts,
      correct_answer: opts.indexOf(ant),
      explanation: `Antonimul lui "${word}" este "${ant}".`,
      difficulty: 2,
      metadata: { type: 'antonym', word },
      is_active: true,
    })
  })

  // Word meaning
  const meanings = [
    { word: 'ostilitate', def: 'atitudine dușmănoasă', w: ['prietenie caldă', 'indiferență totală', 'admirație profundă'] },
    { word: 'empatia', def: 'capacitatea de a înțelege sentimentele altora', w: ['incapacitatea de a comunica', 'dorința de a domina', 'frica de necunoscut'] },
    { word: 'reziliența', def: 'capacitatea de a te redresa după dificultăți', w: ['tendința de a evita problemele', 'incapacitatea de adaptare', 'refuzul de a lupta'] },
    { word: 'altruism', def: 'preocupare dezinteresată pentru binele altora', w: ['grija exclusivă pentru sine', 'indiferența față de ceilalți', 'dorința de a acumula'] },
    { word: 'pragmatism', def: 'orientare spre soluții practice', w: ['ignorarea realității', 'gândire abstractă excesivă', 'refuzul compromisului'] },
    { word: 'integritate', def: 'calitatea de a fi onest și cu principii morale solide', w: ['tendința de a minți', 'lipsa de principii', 'indiferența morală'] },
    { word: 'coerență', def: 'concordanță logică între idei sau acțiuni', w: ['contradicție permanentă', 'haos total', 'improvizație constantă'] },
    { word: 'tenacitate', def: 'perseverență în atingerea unui scop', w: ['renunțare la primul obstacol', 'schimbarea constantă a obiectivelor', 'lipsa de ambiție'] },
  ]

  meanings.forEach(({ word, def, w }) => {
    const opts = shuffle([def, ...w])
    questions.push({
      institution: institution as TestQuestion['institution'],
      category: 'vocabulary',
      question_text: `Ce înseamnă cuvântul "${word}"?`,
      options: opts,
      correct_answer: opts.indexOf(def),
      explanation: `"${word}" înseamnă: ${def}.`,
      difficulty: 3,
      metadata: { type: 'definition', word },
      is_active: true,
    })
  })

  return questions
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
