'use client'

import { memo, useEffect, useRef } from 'react'
import { drawSymbol, isTarget, type ToulouseSymbol } from './symbols'

interface ToulouseCanvasProps {
  grid: ToulouseSymbol[][]
  targets: ToulouseSymbol[]
  selected: Set<string>
  onToggle: (key: string) => void
  showResult?: boolean
  cellSize?: number
}

// memo: during the test the parent re-renders every second (timer tick).
// None of the canvas props change on timer ticks, so React skips the
// entire canvas subtree — no React reconciliation, no canvas redraw.
// The canvas only re-renders when the user actually clicks a cell.
export const ToulouseCanvas = memo(function ToulouseCanvas({
  grid,
  targets,
  selected,
  onToggle,
  showResult = false,
  cellSize = 36,
}: ToulouseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const rows = grid.length
  const cols = grid[0]?.length ?? 0
  const width = cols * cellSize
  const height = rows * cellSize

  // Draw directly in the effect — no intermediate useCallback needed.
  // The closure captures the latest grid/selected/targets from the render
  // that scheduled this effect, which is always the correct version.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(0, 0, width, height)

    // Grid lines
    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 0.5
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath(); ctx.moveTo(0, r * cellSize); ctx.lineTo(width, r * cellSize); ctx.stroke()
    }
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath(); ctx.moveTo(c * cellSize, 0); ctx.lineTo(c * cellSize, height); ctx.stroke()
    }

    // Symbols
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const sym = grid[r][c]
        const key = `${r}-${c}`
        drawSymbol(ctx, sym, c * cellSize, r * cellSize, cellSize, selected.has(key), isTarget(sym, targets), showResult)
      }
    }
  }, [grid, targets, selected, showResult, rows, cols, width, height, cellSize])

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    if (showResult) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY
    const col = Math.floor(x / cellSize)
    const row = Math.floor(y / cellSize)
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      onToggle(`${row}-${col}`)
    }
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick}
      className="cursor-pointer border border-slate-200 rounded-xl max-w-full"
      style={{ touchAction: 'none' }}
    />
  )
})
