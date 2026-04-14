import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PsihoPrep',
    short_name: 'PsihoPrep',
    description:
      'Platformă de pregătire pentru probele psihologice MAI, MApN, SRI și ANP.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0f172a',
    theme_color: '#4f46e5',
    icons: [
      {
        src: '/api/app-icons/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/api/app-icons/512',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/api/app-icons/512-maskable',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
