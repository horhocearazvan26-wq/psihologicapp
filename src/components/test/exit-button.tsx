'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { X } from 'lucide-react'

export function TestExitButton() {
  const pathname = usePathname()

  let href = '/dashboard/tests'
  if (pathname === '/test/simulare') href = '/dashboard'
  else if (pathname.startsWith('/test/simulare/')) href = '/test/simulare'

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
    >
      <X className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">
        {pathname === '/test/simulare' ? 'Înapoi la dashboard' : 'Ieși din test'}
      </span>
      <span className="sm:hidden">Ieși</span>
    </Link>
  )
}
