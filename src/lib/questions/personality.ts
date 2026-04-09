import type { TestQuestion } from '@/types'

type Q = Omit<TestQuestion, 'id' | 'created_at'>

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function sj(
  institution: string,
  q: string,
  correct: string,
  wrong: [string, string, string],
  explanation?: string
): Q {
  const opts = shuffle([correct, ...wrong])
  return {
    institution: institution as Q['institution'],
    category: 'personality',
    question_text: q,
    options: opts,
    correct_answer: opts.indexOf(correct),
    explanation: explanation ?? `Răspunsul optim reflectă profesionalism, integritate și respectarea regulamentului.`,
    difficulty: 2,
    metadata: { type: 'situational_judgment' },
    is_active: true,
  }
}

export function generatePersonalityQuestions(institution: string): Q[] {
  const questions: Q[] = []

  // ── JUDECATĂ SITUAȚIONALĂ ─────────────────────────────────────────────────
  const situational: [string, string, [string, string, string]][] = [
    [
      'Ești în patrulă și colegul tău comite o abatere disciplinară minoră. Tu:',
      'Îl avertizezi privat și îl sfătuiești să raporteze singur',
      ['Ignori situația complet', 'Îl raportezi imediat fără a discuta cu el', 'Nu faci nimic, e treaba lui'],
    ],
    [
      'Ai terminat sarcina înainte de termen. Ce faci cu timpul rămas?',
      'Oferi ajutor colegilor sau îți perfecționezi abilitățile',
      ['Te relaxezi complet', 'Pleci mai devreme fără a anunța', 'Navighezi pe internet'],
    ],
    [
      'Un cetățean agresiv verbal te jignește în timp ce îți faci datoria. Tu:',
      'Rămâi calm și profesionist, respecți procedurile',
      ['Reacționezi agresiv verbal', 'Ignori complet situația', 'Ameninți cu sancțiuni imediate'],
    ],
    [
      'Observi că un superior ia o decizie incorectă care poate afecta operațiunea. Tu:',
      'Îți exprimi opinia prin canale ierarhice adecvate',
      ['Taci și execuți ordinul fără comentarii', 'Refuzi public să execuți ordinul', 'Discuți cu colegii, nu cu superiorul'],
    ],
    [
      'Ești obosit după o tură lungă, dar mai ai de finalizat un raport important. Tu:',
      'Finalizezi raportul corect chiar dacă durează mai mult',
      ['Faci raportul rapid, fără să verifici', 'Lași raportul pentru tura următoare', 'Rogi un coleg să îl facă în locul tău'],
    ],
    [
      'Un nou coleg face greșeli din neexperiență. Atitudinea ta este:',
      'Îl ghidezi cu răbdare și îl ajuți să se dezvolte',
      ['Îl ignori, e treaba lui să se descurce', 'Îl critici față de colegi', 'Raportezi imediat greșelile superiorului'],
    ],
    [
      'Primești o critică constructivă de la superiorul tău. Reacția ta:',
      'O asculți atent și cauți să te îmbunătățești',
      ['Te simți ofensat și te justifici', 'Ignori critica', 'Discuți critica cu colegii'],
    ],
    [
      'Trebuie să iei o decizie rapidă în condiții de stres înalt. Tu:',
      'Aplici procedurile cunoscute și rămâi focusat',
      ['Aștepți să treacă stresul', 'Delegi decizia altcuiva', 'Iei prima decizie care îți vine în minte'],
    ],
    [
      'Afli că un coleg apropiat a comis o neregulă gravă. Tu:',
      'Raportezi situația conform regulamentului, indiferent de relație',
      ['Îl acoperi, e prietenul tău', 'Îl avertizezi și speri că nu se repetă', 'Nu te implici'],
    ],
    [
      'Ești în situația de a lucra cu oameni cu valori diferite de ale tale. Atitudinea ta:',
      'Respecți diversitatea și colaborezi profesionist',
      ['Eviți colaborarea cu ei', 'Îți impui valorile', 'Te plângi superiorilor'],
    ],
    [
      'Primești un ordin pe care îl consideri ineficient, dar legal. Tu:',
      'Execuți ordinul și oferi feedback prin canale adecvate după',
      ['Refuzi să execuți ordinul', 'Execuți parțial, cum consideri tu', 'Convingi colegii să refuze împreună'],
    ],
    [
      'În timpul unei misiuni, planul inițial nu mai funcționează. Tu:',
      'Evaluezi rapid situația și propui o alternativă superiorului',
      ['Continui planul inițial cu orice preț', 'Abandonezi misiunea', 'Acționezi individual fără a consulta echipa'],
    ],
    [
      'Descoperi că un coleg a falsificat un document oficial. Tu:',
      'Raportezi imediat situația conform procedurilor',
      ['Îl confrunți direct și îi ceri să corecteze', 'Aștepți să vezi dacă cineva altcineva observă', 'Nu te implici, nu e responsabilitatea ta'],
    ],
    [
      'Ți se oferă un avantaj material în schimbul unui favor ilegal minor. Tu:',
      'Refuzi categoric și raportezi tentativa de corupție',
      ['Refuzi, dar nu raportezi', 'Accepti, dacă nimeni nu vede', 'Ceri timp de gândire'],
    ],
    [
      'Ești în conflict cu un coleg pe o temă profesională. Cum procedezi?',
      'Abordezi calm situația și cauți o soluție bazată pe fapte',
      ['Eviți colegul până trece conflictul', 'Implici superiorul fără a încerca să rezolvi direct', 'Te raportezi la mai mulți colegi pentru sprijin'],
    ],
    [
      'Misiunea ta este clară, dar regulamentul pare depășit pentru situație. Tu:',
      'Urmezi regulamentul și documentezi situația pentru revizuire ulterioară',
      ['Improvizezi, regulamentul e doar o recomandare', 'Aplici regulamentul selectiv', 'Ceri opinia colegilor înainte de a acționa'],
    ],
    [
      'Ești singurul martor al unui incident între un coleg și un cetățean. Tu:',
      'Raportezi obiectiv ce ai văzut, indiferent de consecințe',
      ['Raportezi în favoarea colegului tău', 'Eviti să fii implicat ca martor', 'Aștepți să vezi ce spune colegul mai întâi'],
    ],
    [
      'Un cetățean solicită ajutor pentru o problemă care nu e în competența ta directă. Tu:',
      'Îl îndrumi către serviciul/persoana competentă și te asiguri că a înțeles',
      ['Îi spui că nu e treaba ta și pleci', 'Încerci să rezolvi singur, chiar dacă nu ești competent', 'Îl ignori'],
    ],
    [
      'Ești supus la un test de integritate neștiind că e un test. Ce faci?',
      'Acționezi exact cum ai acționa în orice situație reală',
      ['Acționezi cu mai multă atenție decât de obicei', 'Refuzi să te implici', 'Verifici dacă cineva te observă'],
    ],
    [
      'Ai o problemă personală importantă în ziua unei misiuni critice. Tu:',
      'Îți gestionezi emoțiile și rămâi profesionist pe durata misiunii',
      ['Ceri să fii înlocuit', 'Lucrezi, dar ești distras și mai puțin eficient', 'Discuți problema cu colegii în timp ce lucrezi'],
    ],
  ]

  for (const [q, correct, wrong] of situational) {
    questions.push(sj(institution, q, correct, wrong))
  }

  // ── AUTOEVALUARE ─────────────────────────────────────────────────────────
  const selfAssessment: [string, string, [string, string, string]][] = [
    [
      'Care dintre următoarele afirmații te descrie cel mai bine în situații de criză?',
      'Rămân calm și aplic proceduri sistematic',
      ['Devin anxios și solicit ajutor imediat', 'Acționez impulsiv pentru a rezolva rapid', 'Prefer să evit situațiile de criză'],
    ],
    [
      'În ce situație te simți cel mai eficient?',
      'Când lucrez în echipă cu obiective clare',
      ['Când lucrez singur, fără supraveghere', 'Când regulile sunt flexibile', 'Când nu există presiune de timp'],
    ],
    [
      'Cum reacționezi când regulile se schimbă frecvent?',
      'Mă adaptez rapid și caut să înțeleg noile proceduri',
      ['Sunt dezorientat și productivitatea scade', 'Rezist la schimbare', 'Ignor schimbările până devin obligatorii'],
    ],
    [
      'Care este punctul tău forte în munca în echipă?',
      'Comunicarea clară și sprijinul acordat colegilor',
      ['Lucrez cel mai bine independent', 'Prefer să conduc, nu să colaborez', 'Evit conflictele ignorând problemele'],
    ],
    [
      'Cum gestionezi un volum mare de muncă?',
      'Prioritizez sarcinile și lucrez metodic',
      ['Devin stresat și calitatea scade', 'Deleg tot ce pot', 'Lucrez haotic, dar termin'],
    ],
    [
      'Cum descrii relația ta cu autoritatea?',
      'Respect autoritatea și urmez regulile, exprimând dezacordul prin canale adecvate',
      ['Urmez ordinele orbește, fără să gândesc', 'Contestez autoritatea ori de câte ori nu sunt de acord', 'Urmez regulile doar când sunt verificat'],
    ],
    [
      'Cum reacționezi când ești sub presiune extremă?',
      'Îmi mențin luciditatea și iau decizii raționale',
      ['Devin agresiv sau retras', 'Evit să iau decizii sub presiune', 'Devin excesiv de precaut și lent'],
    ],
    [
      'Ce te motivează cel mai mult la locul de muncă?',
      'Sentimentul că contribui la siguranța și binele comunității',
      ['Remunerația și beneficiile materiale', 'Recunoașterea publică', 'Avansarea rapidă în grad'],
    ],
    [
      'Cum îți gestionezi erorile profesionale?',
      'Le recunosc, analizez cauza și iau măsuri pentru a nu se repeta',
      ['Încerc să le ascund dacă nu a observat nimeni', 'Le pun pe seama circumstanțelor externe', 'Mă autocritici exagerat'],
    ],
    [
      'Cum te raportezi la regulamentele instituției?',
      'Le consider esențiale pentru ordinea și siguranța operațiunilor',
      ['Le urmez formal, dar le consider depășite', 'Le aplic selectiv, după judecata proprie', 'Le văd ca obstacole birocratice'],
    ],
  ]

  for (const [q, correct, wrong] of selfAssessment) {
    const opts = shuffle([correct, ...wrong])
    questions.push({
      institution: institution as Q['institution'],
      category: 'personality',
      question_text: q,
      options: opts,
      correct_answer: opts.indexOf(correct),
      explanation: `Răspunsul care reflectă cel mai bine profilul psihologic dorit este: "${correct}".`,
      difficulty: 1,
      metadata: { type: 'self_assessment' },
      is_active: true,
    })
  }

  // ── STIL FPI — ITEMI DA/NU ADAPTAȚI ──────────────────────────────────────
  // FPI (Freiburg Personality Inventory) items adapted for multiple choice.
  // For law enforcement, the socially desirable answer is marked as correct.
  const fpiItems: [string, string, string][] = [
    ['Îmi place să lucrez în echipă mai mult decât singur.', 'DA — prefer munca în echipă', 'NU — prefer să lucrez singur'],
    ['Mă simt neliniștit în situații noi și necunoscute.', 'NU — mă adaptez ușor la situații noi', 'DA — simt neliniște în situații noi'],
    ['Pot lua decizii rapide și eficiente în situații de criză.', 'DA — pot decide rapid și eficient', 'NU — am nevoie de timp să gândesc'],
    ['Îmi controlez emoțiile chiar și în situații tensionate.', 'DA — îmi controlez bine emoțiile', 'NU — emoțiile mă copleșesc uneori'],
    ['Respect regulile chiar și atunci când nimeni nu mă verifică.', 'DA — respect regulile întotdeauna', 'NU — depinde de context'],
    ['Mă simt confortabil să îmi exprim dezacordul față de superiori.', 'DA — îmi exprim dezacordul respectuos', 'NU — prefer să tac'],
    ['Îmi place să am responsabilități importante.', 'DA — îmi asum responsabilități cu plăcere', 'NU — prefer să evit responsabilitățile mari'],
    ['Pot face față bine situațiilor de stres prelungit.', 'DA — gestionez bine stresul prelungit', 'NU — stresul prelungit mă afectează'],
    ['Am tendința să mă preocup mult de problemele altora.', 'DA — mă interesează bunăstarea celor din jur', 'NU — mă concentrez pe propria persoană'],
    ['Îmi este greu să spun NU când cineva îmi cere un favor.', 'NU — pot refuza respectuos când e necesar', 'DA — îmi este greu să refuz'],
    ['Mă simt bine în situații care implică multă activitate fizică.', 'DA — activitatea fizică îmi place', 'NU — prefer munca sedentară'],
    ['Reacționez cu ușurință la provocările emoționale ale altora.', 'NU — rămân calm și obiectiv', 'DA — mă afectează emoțional'],
    ['Îmi place să fiu în centrul atenției.', 'NU — prefer să acționez discret și eficient', 'DA — îmi place atenția'],
    ['Sunt persistent în atingerea obiectivelor, chiar și cu obstacole.', 'DA — perseverez indiferent de obstacole', 'NU — renunț când apar dificultăți majore'],
    ['Îmi este greu să accept că am greșit.', 'NU — accept greșelile cu maturitate', 'DA — îmi este greu să recunosc greșelile'],
  ]

  for (const [question_text, correct, wrong] of fpiItems) {
    const opts = [correct, wrong]
    // keep order deterministic for DA/NU style (no shuffle needed for 2 options)
    questions.push({
      institution: institution as Q['institution'],
      category: 'personality',
      question_text,
      options: opts,
      correct_answer: 0, // correct is always first before display
      explanation: `Răspunsul dezirabil pentru profilul MAI/MApN/SRI/ANP este: "${correct}".`,
      difficulty: 1,
      metadata: { type: 'fpi_style' },
      is_active: true,
    })
  }

  // ── SCENARII ETICE ────────────────────────────────────────────────────────
  const ethics: [string, string, [string, string, string]][] = [
    [
      'Ești martorul unui accident rutier implicând un coleg de serviciu care a consumat alcool. Tu:',
      'Anunți autoritățile și asiguri ajutor victimelor, raportezi colegul',
      ['Ajuți victimele, dar nu menționezi colegul', 'Pleci rapid să nu fii implicat', 'Acoperi colegul, e un prieten bun'],
    ],
    [
      'Un superior îți cere să falsifici date dintr-un raport oficial. Tu:',
      'Refuzi ferm și sesizezi eșalonul ierarhic superior',
      ['Execuți ordinul, el e responsabil', 'Refuzi, dar nu raportezi', 'Ceri timp să te gândești'],
    ],
    [
      'Afli că un coleg discriminează cetățenii pe criterii etnice. Tu:',
      'Raportezi comportamentul prin canalele oficiale',
      ['Îl sfătuiești privat să se abțină', 'Nu te implici, nu e treaba ta', 'Discuți cu alți colegi dacă e adevărat'],
    ],
    [
      'Ți se oferă informații confidențiale despre un dosar în schimbul unui favor. Tu:',
      'Refuzi și raportezi tentativa de corupție',
      ['Refuzi, dar nu raportezi', 'Evaluezi dacă favorul e "minor"', 'Ignori, nu ești implicat direct'],
    ],
    [
      'Realizezi că un raport anterior pe care l-ai semnat conține o eroare. Tu:',
      'Raportezi imediat eroarea și inițiezi procedura de corectare',
      ['Speri că nimeni nu va observa', 'Corectezi discret fără a anunța', 'Arunci vina pe colegul cu care ai lucrat'],
    ],
  ]

  for (const [q, correct, wrong] of ethics) {
    questions.push(sj(
      institution, q, correct, wrong,
      `Integritatea și respectarea normelor etice sunt fundamentale în structurile MAI/MApN/SRI/ANP.`
    ))
  }

  return questions
}
