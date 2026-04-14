import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { AppMain } from '@/components/app/app-main'
import { NavigationFeedbackProvider } from '@/components/app/navigation-feedback'

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
    startupImage: [
      {
        url: '/api/startup-images/1170x2532',
        media:
          '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/api/startup-images/1179x2556',
        media:
          '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/api/startup-images/1290x2796',
        media:
          '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f7f8f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" className="h-full" suppressHydrationWarning>
      <body
        className="min-h-full antialiased"
        style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
      >
        <NavigationFeedbackProvider>
          <AppMain>{children}</AppMain>
        </NavigationFeedbackProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
