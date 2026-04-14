'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface DashboardMainProps {
  children: React.ReactNode
}

export function DashboardMain({ children }: DashboardMainProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
        className="dashboard-page-shell"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
