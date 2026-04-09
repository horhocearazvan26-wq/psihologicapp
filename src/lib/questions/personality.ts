import type { TestQuestion } from '@/types'

export function generatePersonalityQuestions(institution: string): Omit<TestQuestion, 'id' | 'created_at'>[] {
  const questions: Omit<TestQuestion, 'id' | 'created_at'>[] = []

  // Personality/situational judgment questions
  const situational = [
    {
      q: 'Ești în patrulă și colegul tău comite o abatere disciplinară minoră. Tu:',
      a: 'Îl avertizezi privat și îl sfătuiești să raporteze singur',
      w: ['Ignori situația complet', 'Îl raportezi imediat superiorilor fără a discuta cu el', 'Nu faci nimic, e treaba lui'],
    },
    {
      q: 'Ai terminat sarcina înainte de termen. Ce faci cu timpul rămas?',
      a: 'Oferi ajutor colegilor sau îți perfecționezi abilitățile',
      w: ['Te relaxezi, ai meritat o pauză', 'Pleci mai devreme', 'Navighezi pe internet'],
    },
    {
      q: 'Un cetățean agresiv verbal te jignește în timp ce îți faci datoria. Tu:',
      a: 'Rămâi calm și profesionist, respecți procedurile',
      w: ['Reacționezi agresiv verbal', 'Ignori complet situația', 'Ameninți cu sancțiuni imediate'],
    },
    {
      q: 'Observi că un superior ia o decizie incorectă care poate afecta operațiunea. Tu:',
      a: 'Îți exprimi opinia prin canale ierarhice adecvate',
      w: ['Taci și execuți ordinul fără comentarii', 'Refuzi public să execuți ordinul', 'Discuți cu colegii, nu cu superiorul'],
    },
    {
      q: 'Ești obosit după o tură lungă, dar mai ai de finalizat un raport important. Tu:',
      a: 'Finalizezi raportul corect chiar dacă durează mai mult',
      w: ['Faci raportul rapid, fără să verifici', 'Lași raportul pentru tura următoare', 'Rogi un coleg să îl facă în locul tău'],
    },
    {
      q: 'Un nou coleg face greșeli din neexperiență. Atitudinea ta este:',
      a: 'Îl ghidezi cu răbdare și îl ajuți să se dezvolte',
      w: ['Îl ignori, e treaba lui să se descurce', 'Îl critici față de colegi', 'Raportezi imediat greșelile superiorului'],
    },
    {
      q: 'Primești o critică constructivă de la superiorul tău. Reacția ta:',
      a: 'O asculți atent și cauți să te îmbunătățești',
      w: ['Te simți ofensat și te justifici', 'Ignori critica', 'Discuți critica cu colegii'],
    },
    {
      q: 'Trebuie să iei o decizie rapidă în condiții de stres înalt. Tu:',
      a: 'Aplici procedurile cunoscute și rămâi focusat',
      w: ['Aștepți să treacă stresul', 'Delegi decizia altcuiva', 'Iei prima decizie care îți vine în minte'],
    },
    {
      q: 'Afli că un coleg apropiat a comis o neregulă gravă. Tu:',
      a: 'Raportezi situația conform regulamentului, indiferent de relație',
      w: ['Îl acoperi, e prietenul tău', 'Îl avertizezi și speri că nu se repetă', 'Nu te implici'],
    },
    {
      q: 'Ești în situația de a lucra cu oameni cu valori diferite de ale tale. Atitudinea ta:',
      a: 'Respecți diversitatea și colaborezi profesionist',
      w: ['Eviți colaborarea cu ei', 'Îți impui valorile', 'Te plângi superiorilor'],
    },
  ]

  situational.forEach(({ q, a, w }) => {
    const opts = shuffle([a, ...w])
    questions.push({
      institution: institution as TestQuestion['institution'],
      category: 'personality',
      question_text: q,
      options: opts,
      correct_answer: opts.indexOf(a),
      explanation: `Răspunsul optim este: "${a}". Această atitudine reflectă profesionalism, integritate și respectarea regulamentului.`,
      difficulty: 2,
      metadata: { type: 'situational_judgment' },
      is_active: true,
    })
  })

  // Self-assessment style (best fit for the job)
  const traits = [
    {
      q: 'Care dintre următoarele afirmații te descrie cel mai bine în situații de criză?',
      a: 'Rămân calm și aplici proceduri sistematic',
      w: ['Devin anxios și solicit ajutor imediat', 'Acționez impulsiv pentru a rezolva rapid', 'Prefer să evit situațiile de criză'],
    },
    {
      q: 'În ce situație te simți cel mai eficient?',
      a: 'Când lucrez în echipă cu obiective clare',
      w: ['Când lucrez singur, fără supraveghere', 'Când regulile sunt flexibile', 'Când nu există presiune de timp'],
    },
    {
      q: 'Cum reacționezi când regulile se schimbă frecvent?',
      a: 'Mă adaptez rapid și caut să înțeleg noile proceduri',
      w: ['Sunt dezorientat și productivitatea scade', 'Rezist la schimbare', 'Ignor schimbările până devin obligatorii'],
    },
    {
      q: 'Care este punctul tău forte în munca în echipă?',
      a: 'Comunicarea clară și sprijinul acordat colegilor',
      w: ['Lucrez cel mai bine independent', 'Prefer să conduc, nu să colaborez', 'Evit conflictele ignorând problemele'],
    },
    {
      q: 'Cum gestionezi un volum mare de muncă?',
      a: 'Prioritizez sarcinile și lucrez metodic',
      w: ['Devin stresat și calitatea scade', 'Delege tot ce pot', 'Lucrez haotic, dar termin'],
    },
  ]

  traits.forEach(({ q, a, w }) => {
    const opts = shuffle([a, ...w])
    questions.push({
      institution: institution as TestQuestion['institution'],
      category: 'personality',
      question_text: q,
      options: opts,
      correct_answer: opts.indexOf(a),
      explanation: `Răspunsul care reflectă cel mai bine profilul psihologic dorit este: "${a}".`,
      difficulty: 1,
      metadata: { type: 'self_assessment' },
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
