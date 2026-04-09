import type { TestQuestion } from '@/types'

type Q = Omit<TestQuestion, 'id' | 'created_at'>

/**
 * Raven Progressive Matrices — Testul Raven SPM
 * Fiecare item prezintă o matrice cu o piesă lipsă.
 * Răspunsul corect este indexul (0-based) din opțiunile ["1","2","3","4","5","6"].
 *
 * Standard answer key for SPM (1-indexed → converted to 0-indexed below):
 *   Set A (items 1-12): 4,5,1,2,6,3,6,2,1,3,4,5
 *   Set B (items 1-12): 2,6,1,2,1,3,5,6,4,3,4,5
 *   Set C (items 1-12): 8,2,3,8,7,4,5,1,7,6,1,2  (8 options → modeled as 6 below)
 */

// page numbers mapped to set/item and correct answer (1-indexed answer → -1 for 0-indexed)
const ravenItems: { page: string; set: string; item: number; answer1: number }[] = [
  // Set A — pages 4-15
  { page: 'page_004.png', set: 'A', item: 1,  answer1: 4 },
  { page: 'page_005.png', set: 'A', item: 2,  answer1: 5 },
  { page: 'page_006.png', set: 'A', item: 3,  answer1: 1 },
  { page: 'page_007.png', set: 'A', item: 4,  answer1: 2 },
  { page: 'page_008.png', set: 'A', item: 5,  answer1: 6 },
  { page: 'page_009.png', set: 'A', item: 6,  answer1: 3 },
  { page: 'page_010.png', set: 'A', item: 7,  answer1: 6 },
  { page: 'page_011.png', set: 'A', item: 8,  answer1: 2 },
  { page: 'page_012.png', set: 'A', item: 9,  answer1: 1 },
  { page: 'page_013.png', set: 'A', item: 10, answer1: 3 },
  { page: 'page_014.png', set: 'A', item: 11, answer1: 4 },
  { page: 'page_015.png', set: 'A', item: 12, answer1: 5 },
  // Set B — pages 16-27
  { page: 'page_016.png', set: 'B', item: 1,  answer1: 2 },
  { page: 'page_017.png', set: 'B', item: 2,  answer1: 6 },
  { page: 'page_018.png', set: 'B', item: 3,  answer1: 1 },
  { page: 'page_019.png', set: 'B', item: 4,  answer1: 2 },
  { page: 'page_020.png', set: 'B', item: 5,  answer1: 1 },
  { page: 'page_021.png', set: 'B', item: 6,  answer1: 3 },
  { page: 'page_022.png', set: 'B', item: 7,  answer1: 5 },
  { page: 'page_023.png', set: 'B', item: 8,  answer1: 6 },
  { page: 'page_024.png', set: 'B', item: 9,  answer1: 4 },
  { page: 'page_025.png', set: 'B', item: 10, answer1: 3 },
  { page: 'page_026.png', set: 'B', item: 11, answer1: 4 },
  { page: 'page_027.png', set: 'B', item: 12, answer1: 5 },
  // Set C — pages 28-37 (only 10 items shown here, 8 options reduced to 6)
  { page: 'page_028.png', set: 'C', item: 1,  answer1: 8 },
  { page: 'page_029.png', set: 'C', item: 2,  answer1: 2 },
  { page: 'page_030.png', set: 'C', item: 3,  answer1: 3 },
  { page: 'page_031.png', set: 'C', item: 4,  answer1: 8 },
  { page: 'page_032.png', set: 'C', item: 5,  answer1: 7 },
  { page: 'page_033.png', set: 'C', item: 6,  answer1: 4 },
  { page: 'page_034.png', set: 'C', item: 7,  answer1: 5 },
  { page: 'page_035.png', set: 'C', item: 8,  answer1: 1 },
  { page: 'page_036.png', set: 'C', item: 9,  answer1: 7 },
  { page: 'page_037.png', set: 'C', item: 10, answer1: 6 },
]

export function generateRavenQuestions(institution: string): Q[] {
  return ravenItems.map(({ page, set, item, answer1 }) => {
    // Sets A and B: 6 options (1-6). Set C has 8 but we cap at 6 for UI consistency.
    const optionCount = set === 'A' || set === 'B' ? 6 : 8
    const options = Array.from({ length: Math.min(optionCount, 8) }, (_, i) => String(i + 1))
    // answer1 is 1-indexed; clamp to available options
    const correctIdx = Math.min(answer1 - 1, options.length - 1)

    return {
      institution: institution as Q['institution'],
      category: 'logic',
      question_text: `Testul Raven — Setul ${set}, Item ${item}: Identificați piesa lipsă din matrice.`,
      options,
      correct_answer: correctIdx,
      explanation: `Răspunsul corect pentru Setul ${set}, Item ${item} este varianta ${answer1}.`,
      difficulty: set === 'A' ? 1 : set === 'B' ? 2 : 3,
      metadata: {
        type: 'raven_matrix',
        image_url: `/test-images/raven/${page}`,
        set,
        item,
      },
      is_active: true,
    }
  })
}
