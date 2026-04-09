import type { Cell, Shape, Fill } from './raven-patterns'

interface CellSVGProps {
  cell: Cell | null
  size?: number
  selected?: boolean
  isCorrect?: boolean
  isWrong?: boolean
}

const SIZE_MAP = { small: 0.35, medium: 0.55, large: 0.75 }

function ShapePath({ shape, cx, cy, r }: { shape: Shape; cx: number; cy: number; r: number }) {
  switch (shape) {
    case 'circle':
      return <circle cx={cx} cy={cy} r={r} />
    case 'square':
      return <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} />
    case 'triangle':
      return <polygon points={`${cx},${cy - r} ${cx + r},${cy + r} ${cx - r},${cy + r}`} />
    case 'diamond':
      return <polygon points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`} />
    case 'cross':
      return (
        <g>
          <rect x={cx - r * 0.3} y={cy - r} width={r * 0.6} height={r * 2} />
          <rect x={cx - r} y={cy - r * 0.3} width={r * 2} height={r * 0.6} />
        </g>
      )
    case 'star':
      const pts = Array.from({ length: 10 }, (_, i) => {
        const angle = (i * Math.PI) / 5 - Math.PI / 2
        const rad = i % 2 === 0 ? r : r * 0.4
        return `${cx + rad * Math.cos(angle)},${cy + rad * Math.sin(angle)}`
      }).join(' ')
      return <polygon points={pts} />
  }
}

function CellShape({ cell, viewSize }: { cell: Cell; viewSize: number }) {
  const r = (viewSize / 2) * SIZE_MAP[cell.size]
  const id = `pattern-${cell.shape}-${cell.fill}-${Math.random().toString(36).slice(2, 7)}`

  const fillAttr = cell.fill === 'filled' ? '#374151'
    : cell.fill === 'empty' ? 'white'
    : `url(#${id})`

  const positions: [number, number][] =
    cell.count === 1 ? [[viewSize / 2, viewSize / 2]]
    : cell.count === 2 ? [[viewSize / 3, viewSize / 2], [(viewSize * 2) / 3, viewSize / 2]]
    : [[viewSize / 4, viewSize / 3], [(viewSize * 3) / 4, viewSize / 3], [viewSize / 2, (viewSize * 2) / 3]]

  return (
    <>
      {(cell.fill === 'striped' || cell.fill === 'dotted') && (
        <defs>
          <pattern id={id} patternUnits="userSpaceOnUse" width={cell.fill === 'striped' ? 4 : 6} height={cell.fill === 'striped' ? 4 : 6}>
            {cell.fill === 'striped' ? (
              <line x1="0" y1="4" x2="4" y2="0" stroke="#374151" strokeWidth="1" />
            ) : (
              <circle cx="3" cy="3" r="1" fill="#374151" />
            )}
          </pattern>
        </defs>
      )}
      {positions.map(([cx, cy], i) => (
        <g key={i} fill={fillAttr} stroke="#374151" strokeWidth="1.5">
          <ShapePath shape={cell.shape} cx={cx} cy={cy} r={r} />
        </g>
      ))}
    </>
  )
}

export function CellSVG({ cell, size = 80, selected, isCorrect, isWrong }: CellSVGProps) {
  const bg = isCorrect ? '#dcfce7' : isWrong ? '#fee2e2' : selected ? '#dbeafe' : '#f8fafc'
  const border = isCorrect ? '#16a34a' : isWrong ? '#dc2626' : selected ? '#2563eb' : '#cbd5e1'
  const borderWidth = selected || isCorrect || isWrong ? 2 : 1

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="rounded-lg"
      style={{ background: bg, border: `${borderWidth}px solid ${border}` }}
    >
      {cell ? (
        <CellShape cell={cell} viewSize={size} />
      ) : (
        <>
          <line x1="10" y1="10" x2={size - 10} y2={size - 10} stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
          <line x1={size - 10} y1="10" x2="10" y2={size - 10} stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
        </>
      )}
    </svg>
  )
}
