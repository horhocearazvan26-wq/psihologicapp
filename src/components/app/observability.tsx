'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Analytics = dynamic(
  () => import('@vercel/analytics/next').then(mod => mod.Analytics),
  { ssr: false }
)

const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then(mod => mod.SpeedInsights),
  { ssr: false }
)

export function DeferredObservability() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
      cancelIdleCallback?: (handle: number) => void
    }

    if (win.requestIdleCallback) {
      const handle = win.requestIdleCallback(() => setEnabled(true), { timeout: 3500 })
      return () => win.cancelIdleCallback?.(handle)
    }

    const timer = window.setTimeout(() => setEnabled(true), 2500)
    return () => window.clearTimeout(timer)
  }, [])

  if (!enabled) return null

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
