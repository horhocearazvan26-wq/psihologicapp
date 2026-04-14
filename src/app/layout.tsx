import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'PsihoPrep — Pregătire Psihologică MAI, MApN, SRI, ANP',
  description:
    'Platformă premium de pregătire pentru probele psihologice la MAI, MApN, SRI și ANP. Teste de atenție, logică, memorie, aptitudini numerice și vocabular.',
  keywords: ['psihoprep', 'psihologic', 'MAI', 'MApN', 'SRI', 'ANP', 'teste', 'pregătire'],
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'PsihoPrep',
    statusBarStyle: 'default',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4f46e5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" className="h-full" suppressHydrationWarning>
      <body className="min-h-full antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
