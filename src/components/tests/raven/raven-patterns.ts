// Raven Progressive Matrices — procedural SVG generation

export type Shape = 'circle' | 'square' | 'triangle' | 'diamond' | 'cross' | 'star'
export type Fill = 'empty' | 'filled' | 'striped' | 'dotted'
export type Size = 'small' | 'medium' | 'large'

export interface Cell {
  shape: Shape
  fill: Fill
  size: Size
  count: number   // 1-3 shapes per cell
  rotation: number // 0, 45, 90, 135
}

export interface RavenMatrix {
  id: number
  grid: (Cell | null)[][]   // 3×3, last cell is null (the missing one)
  options: Cell[]           // 6 options
  correctIndex: number
  difficulty: 1 | 2 | 3
  rule: string
}

const SHAPES: Shape[] = ['circle', 'square', 'triangle', 'diamond', 'cross', 'star']
const FILLS: Fill[] = ['empty', 'filled', 'striped', 'dotted']
const SIZES: Size[] = ['small', 'medium', 'large']

function rnd<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Rule 1: Same shape, fill progresses across rows
function makeProgressiveFill(id: number): RavenMatrix {
  const shape = rnd(SHAPES)
  const size = rnd(SIZES)
  const fills: Fill[] = ['empty', 'striped', 'filled']

  const grid: Cell[][] = [
    [
      { shape, fill: fills[0], size, count: 1, rotation: 0 },
      { shape, fill: fills[1], size, count: 1, rotation: 0 },
      { shape, fill: fills[2], size, count: 1, rotation: 0 },
    ],
    [
      { shape, fill: fills[1], size, count: 1, rotation: 0 },
      { shape, fill: fills[2], size, count: 1, rotation: 0 },
      { shape, fill: fills[0], size, count: 1, rotation: 0 },
    ],
    [
      { shape, fill: fills[2], size, count: 1, rotation: 0 },
      { shape, fill: fills[0], size, count: 1, rotation: 0 },
      null as unknown as Cell,
    ],
  ]

  const answer: Cell = { shape, fill: fills[1], size, count: 1, rotation: 0 }
  const distractors = generateDistractors(answer, 5)

  const options = shuffle([answer, ...distractors])
  const correctIndex = options.findIndex(o =>
    o.shape === answer.shape && o.fill === answer.fill && o.size === answer.size
  )

  return { id, grid, options, correctIndex, difficulty: 1, rule: 'Umplerea progresează ciclic pe rând' }
}

// Rule 2: Count increases across row (1, 2, 3)
function makeCountProgression(id: number): RavenMatrix {
  const shape = rnd(SHAPES)
  const fill = rnd(FILLS)
  const size = rnd(SIZES)

  const grid: Cell[][] = [
    [
      { shape, fill, size, count: 1, rotation: 0 },
      { shape, fill, size, count: 2, rotation: 0 },
      { shape, fill, size, count: 3, rotation: 0 },
    ],
    [
      { shape, fill, size, count: 2, rotation: 0 },
      { shape, fill, size, count: 3, rotation: 0 },
      { shape, fill, size, count: 1, rotation: 0 },
    ],
    [
      { shape, fill, size, count: 3, rotation: 0 },
      { shape, fill, size, count: 1, rotation: 0 },
      null as unknown as Cell,
    ],
  ]

  const answer: Cell = { shape, fill, size, count: 2, rotation: 0 }
  const distractors = generateDistractors(answer, 5)
  const options = shuffle([answer, ...distractors])
  const correctIndex = options.findIndex(o =>
    o.shape === answer.shape && o.fill === answer.fill && o.count === answer.count
  )

  return { id, grid, options, correctIndex, difficulty: 1, rule: 'Numărul de forme progresează' }
}

// Rule 3: Shape changes across column, fill constant
function makeShapeRotation(id: number): RavenMatrix {
  const shapes: Shape[] = shuffle([...SHAPES]).slice(0, 3) as [Shape, Shape, Shape]
  const fill = rnd(FILLS)
  const size = rnd(SIZES)

  const grid: Cell[][] = [
    [
      { shape: shapes[0], fill, size, count: 1, rotation: 0 },
      { shape: shapes[1], fill, size, count: 1, rotation: 0 },
      { shape: shapes[2], fill, size, count: 1, rotation: 0 },
    ],
    [
      { shape: shapes[1], fill, size, count: 1, rotation: 0 },
      { shape: shapes[2], fill, size, count: 1, rotation: 0 },
      { shape: shapes[0], fill, size, count: 1, rotation: 0 },
    ],
    [
      { shape: shapes[2], fill, size, count: 1, rotation: 0 },
      { shape: shapes[0], fill, size, count: 1, rotation: 0 },
      null as unknown as Cell,
    ],
  ]

  const answer: Cell = { shape: shapes[1], fill, size, count: 1, rotation: 0 }
  const distractors = generateDistractors(answer, 5)
  const options = shuffle([answer, ...distractors])
  const correctIndex = options.findIndex(o =>
    o.shape === answer.shape && o.fill === answer.fill
  )

  return { id, grid, options, correctIndex, difficulty: 2, rule: 'Formele rotesc ciclic pe coloane' }
}

// Rule 4: Size progresses small → medium → large
function makeSizeProgression(id: number): RavenMatrix {
  const shape = rnd(SHAPES)
  const fill = rnd(FILLS)
  const sizes: Size[] = ['small', 'medium', 'large']

  const grid: Cell[][] = [
    [
      { shape, fill, size: sizes[0], count: 1, rotation: 0 },
      { shape, fill, size: sizes[1], count: 1, rotation: 0 },
      { shape, fill, size: sizes[2], count: 1, rotation: 0 },
    ],
    [
      { shape, fill, size: sizes[1], count: 1, rotation: 0 },
      { shape, fill, size: sizes[2], count: 1, rotation: 0 },
      { shape, fill, size: sizes[0], count: 1, rotation: 0 },
    ],
    [
      { shape, fill, size: sizes[2], count: 1, rotation: 0 },
      { shape, fill, size: sizes[0], count: 1, rotation: 0 },
      null as unknown as Cell,
    ],
  ]

  const answer: Cell = { shape, fill, size: sizes[1], count: 1, rotation: 0 }
  const distractors = generateDistractors(answer, 5)
  const options = shuffle([answer, ...distractors])
  const correctIndex = options.findIndex(o =>
    o.shape === answer.shape && o.fill === answer.fill && o.size === answer.size
  )

  return { id, grid, options, correctIndex, difficulty: 2, rule: 'Dimensiunea progresează ciclic' }
}

// Rule 5: Combination — shape + fill + size all change
function makeCombination(id: number): RavenMatrix {
  const shapes = shuffle([...SHAPES]).slice(0, 3) as Shape[]
  const fills = shuffle([...FILLS]).slice(0, 3) as Fill[]
  const sizes = shuffle([...SIZES]) as Size[]

  const grid: Cell[][] = [
    [
      { shape: shapes[0], fill: fills[0], size: sizes[0], count: 1, rotation: 0 },
      { shape: shapes[1], fill: fills[1], size: sizes[1], count: 1, rotation: 0 },
      { shape: shapes[2], fill: fills[2], size: sizes[2], count: 1, rotation: 0 },
    ],
    [
      { shape: shapes[1], fill: fills[2], size: sizes[2], count: 1, rotation: 0 },
      { shape: shapes[2], fill: fills[0], size: sizes[0], count: 1, rotation: 0 },
      { shape: shapes[0], fill: fills[1], size: sizes[1], count: 1, rotation: 0 },
    ],
    [
      { shape: shapes[2], fill: fills[1], size: sizes[1], count: 1, rotation: 0 },
      { shape: shapes[0], fill: fills[2], size: sizes[2], count: 1, rotation: 0 },
      null as unknown as Cell,
    ],
  ]

  const answer: Cell = { shape: shapes[1], fill: fills[0], size: sizes[0], count: 1, rotation: 0 }
  const distractors = generateDistractors(answer, 5)
  const options = shuffle([answer, ...distractors])
  const correctIndex = options.findIndex(o =>
    o.shape === answer.shape && o.fill === answer.fill && o.size === answer.size
  )

  return { id, grid, options, correctIndex, difficulty: 3, rule: 'Combinație de forme, umplere și dimensiune' }
}

function generateDistractors(answer: Cell, count: number): Cell[] {
  const distractors: Cell[] = []
  const usedKeys = new Set([`${answer.shape}-${answer.fill}-${answer.size}-${answer.count}`])

  while (distractors.length < count) {
    const d: Cell = {
      shape: Math.random() > 0.5 ? rnd(SHAPES) : answer.shape,
      fill: Math.random() > 0.5 ? rnd(FILLS) : answer.fill,
      size: Math.random() > 0.5 ? rnd(SIZES) : answer.size,
      count: Math.random() > 0.7 ? randInt(1, 3) : answer.count,
      rotation: 0,
    }
    const key = `${d.shape}-${d.fill}-${d.size}-${d.count}`
    if (!usedKeys.has(key)) {
      usedKeys.add(key)
      distractors.push(d)
    }
  }
  return distractors
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const GENERATORS = [makeProgressiveFill, makeCountProgression, makeShapeRotation, makeSizeProgression, makeCombination]

export function generateMatrices(count: number): RavenMatrix[] {
  const matrices: RavenMatrix[] = []
  for (let i = 0; i < count; i++) {
    const gen = GENERATORS[i % GENERATORS.length]
    matrices.push(gen(i))
  }
  return shuffle(matrices).map((m, i) => ({ ...m, id: i }))
}
