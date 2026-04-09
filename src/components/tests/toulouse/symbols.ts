// Toulouse-Piéron symbols: each symbol is a combination of a base shape + mark position
// Base shapes: square, circle, diamond, triangle
// Mark positions: top, bottom, left, right, top-left, top-right, bottom-left, bottom-right, center, none

export type SymbolShape = 'square' | 'circle' | 'diamond' | 'triangle'
export type MarkPosition = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'none'

export interface ToulouseSymbol {
  shape: SymbolShape
  mark: MarkPosition
}

export const SHAPES: SymbolShape[] = ['square', 'circle', 'diamond', 'triangle']
export const MARKS: MarkPosition[] = ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right']

// All possible symbol combinations (32 total)
export const ALL_SYMBOLS: ToulouseSymbol[] = SHAPES.flatMap(shape =>
  MARKS.map(mark => ({ shape, mark }))
)

// Pick 2 target symbols for the test
export function pickTargetSymbols(): [ToulouseSymbol, ToulouseSymbol] {
  const shuffled = [...ALL_SYMBOLS].sort(() => Math.random() - 0.5)
  return [shuffled[0], shuffled[1]]
}

export function symbolsEqual(a: ToulouseSymbol, b: ToulouseSymbol): boolean {
  return a.shape === b.shape && a.mark === b.mark
}

export function isTarget(sym: ToulouseSymbol, targets: ToulouseSymbol[]): boolean {
  return targets.some(t => symbolsEqual(sym, t))
}

// Generate a grid of random symbols
export function generateGrid(rows: number, cols: number, targets: ToulouseSymbol[]): ToulouseSymbol[][] {
  const grid: ToulouseSymbol[][] = []
  const targetRate = 0.2 // ~20% targets

  for (let r = 0; r < rows; r++) {
    const row: ToulouseSymbol[] = []
    for (let c = 0; c < cols; c++) {
      if (Math.random() < targetRate) {
        row.push(targets[Math.floor(Math.random() * targets.length)])
      } else {
        // Non-target symbol
        let sym: ToulouseSymbol
        do {
          sym = ALL_SYMBOLS[Math.floor(Math.random() * ALL_SYMBOLS.length)]
        } while (isTarget(sym, targets))
        row.push(sym)
      }
    }
    grid.push(row)
  }
  return grid
}

// Draw a single Toulouse-Piéron symbol on canvas
export function drawSymbol(
  ctx: CanvasRenderingContext2D,
  sym: ToulouseSymbol,
  x: number,
  y: number,
  size: number,
  selected: boolean,
  isTarget: boolean,
  showResult: boolean
) {
  const padding = 3
  const inner = size - padding * 2
  const cx = x + size / 2
  const cy = y + size / 2
  const dotR = 2.5

  // Background
  if (showResult && selected) {
    ctx.fillStyle = isTarget ? '#dcfce7' : '#fee2e2'
    ctx.fillRect(x, y, size, size)
  } else if (selected) {
    ctx.fillStyle = '#dbeafe'
    ctx.fillRect(x, y, size, size)
  }

  ctx.strokeStyle = showResult && selected ? (isTarget ? '#16a34a' : '#dc2626') : selected ? '#2563eb' : '#374151'
  ctx.lineWidth = selected ? 2 : 1
  ctx.fillStyle = ctx.strokeStyle

  const sx = x + padding
  const sy = y + padding

  // Draw base shape
  ctx.beginPath()
  if (sym.shape === 'square') {
    ctx.strokeRect(sx, sy, inner, inner)
  } else if (sym.shape === 'circle') {
    ctx.arc(cx, cy, inner / 2, 0, Math.PI * 2)
    ctx.stroke()
  } else if (sym.shape === 'diamond') {
    ctx.moveTo(cx, sy)
    ctx.lineTo(sx + inner, cy)
    ctx.lineTo(cx, sy + inner)
    ctx.lineTo(sx, cy)
    ctx.closePath()
    ctx.stroke()
  } else if (sym.shape === 'triangle') {
    ctx.moveTo(cx, sy)
    ctx.lineTo(sx + inner, sy + inner)
    ctx.lineTo(sx, sy + inner)
    ctx.closePath()
    ctx.stroke()
  }

  // Draw mark dot
  const markOffset = inner * 0.28
  const positions: Record<MarkPosition, [number, number]> = {
    'top': [cx, sy + 2],
    'bottom': [cx, sy + inner - 2],
    'left': [sx + 2, cy],
    'right': [sx + inner - 2, cy],
    'top-left': [sx + markOffset, sy + markOffset],
    'top-right': [sx + inner - markOffset, sy + markOffset],
    'bottom-left': [sx + markOffset, sy + inner - markOffset],
    'bottom-right': [sx + inner - markOffset, sy + inner - markOffset],
    'center': [cx, cy],
    'none': [-999, -999],
  }

  if (sym.mark !== 'none') {
    const [mx, my] = positions[sym.mark]
    ctx.beginPath()
    ctx.arc(mx, my, dotR, 0, Math.PI * 2)
    ctx.fill()
  }
}
