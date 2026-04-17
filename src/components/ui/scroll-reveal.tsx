import type { CSSProperties } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  style?: CSSProperties
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  style,
}: ScrollRevealProps) {
  const mergedStyle: CSSProperties = {
    ...(delay ? { animationDelay: `${delay}ms` } : {}),
    ...style,
  }
  return (
    <div
      className={`perf-reveal perf-reveal-${direction} ${className}`}
      style={Object.keys(mergedStyle).length ? mergedStyle : undefined}
    >
      {children}
    </div>
  )
}
