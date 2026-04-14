'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'

const NavigationFeedbackContext = createContext<{ pending: boolean }>({ pending: false })

function isInternalNavigation(anchor: HTMLAnchorElement) {
  if (!anchor.href) return false
  if (anchor.target && anchor.target !== '_self') return false
  if (anchor.hasAttribute('download')) return false

  const url = new URL(anchor.href, window.location.href)

  if (url.origin !== window.location.origin) return false
  if (url.hash && url.pathname === window.location.pathname && url.search === window.location.search) {
    return false
  }

  return `${url.pathname}${url.search}` !== `${window.location.pathname}${window.location.search}`
}

export function NavigationFeedbackProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [pending, setPending] = useState(false)

  useEffect(() => {
    let resetTimer: ReturnType<typeof setTimeout> | undefined

    if (pending) {
      resetTimer = setTimeout(() => setPending(false), 700)
    }

    return () => {
      if (resetTimer) clearTimeout(resetTimer)
    }
  }, [pathname, pending])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest('a')
      if (!(anchor instanceof HTMLAnchorElement)) return
      if (!isInternalNavigation(anchor)) return

      setPending(true)
    }

    window.addEventListener('click', handleClick, true)

    return () => {
      window.removeEventListener('click', handleClick, true)
    }
  }, [])

  const value = useMemo(() => ({ pending }), [pending])

  return (
    <NavigationFeedbackContext.Provider value={value}>
      <div className={`route-feedback ${pending ? 'route-feedback-active' : ''}`} aria-hidden="true">
        <div className="route-feedback-bar" />
      </div>
      {children}
    </NavigationFeedbackContext.Provider>
  )
}

export function useNavigationFeedback() {
  return useContext(NavigationFeedbackContext)
}
