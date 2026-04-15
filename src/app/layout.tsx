import type { Metadata, Viewport } from 'next'
import './globals.css'
import { NavigationFeedback } from '@/components/app/navigation-feedback'
import { DeferredObservability } from '@/components/app/observability'

const siteUrl = 'https://psihoprep.ro'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'PsihoPrep — Pregătire Psihologică MAI, MApN, SRI, ANP',
  description:
    'Platformă premium de pregătire pentru probele psihologice la MAI, MApN, SRI și ANP. Teste de atenție, logică, memorie, aptitudini numerice și vocabular.',
  keywords: ['psihoprep', 'psihologic', 'MAI', 'MApN', 'SRI', 'ANP', 'teste', 'pregătire'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PsihoPrep — Pregătire Psihologică MAI, MApN, SRI, ANP',
    description:
      'Platformă premium de pregătire pentru probele psihologice la MAI, MApN, SRI și ANP.',
    url: '/',
    siteName: 'PsihoPrep',
    locale: 'ro_RO',
    type: 'website',
  },
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
  maximumScale: 1,
  userScalable: false,
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
        {children}
        <NavigationFeedback />
        <DeferredObservability />
      </body>
    </html>
  )
}
