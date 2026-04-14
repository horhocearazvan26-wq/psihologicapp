import { ImageResponse } from 'next/og'

export function createStartupImageResponse(width: number, height: number) {
  const logoSize = Math.round(Math.min(width, height) * 0.16)
  const cardSize = Math.round(logoSize * 1.65)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background:
            'radial-gradient(circle at 50% 18%, rgba(79,70,229,0.18), transparent 28%), radial-gradient(circle at 12% 88%, rgba(124,58,237,0.12), transparent 24%), radial-gradient(circle at 88% 82%, rgba(99,102,241,0.10), transparent 22%), #f7f8f6',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.34) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.34) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            opacity: 0.75,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: cardSize,
              height: cardSize,
              borderRadius: Math.round(cardSize * 0.28),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'linear-gradient(145deg, #4f46e5 0%, #7c3aed 55%, #312e81 100%)',
              boxShadow: '0 28px 70px -28px rgba(79,70,229,0.48)',
            }}
          >
            <svg
              width={logoSize}
              height={logoSize}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 18V5" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 18a4 4 0 0 0 2-7.464" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 18a4 4 0 0 1-2-7.464" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div
            style={{
              marginTop: Math.round(height * 0.034),
              fontSize: Math.round(Math.min(width, height) * 0.044),
              fontWeight: 700,
              color: '#101923',
              letterSpacing: '-0.04em',
            }}
          >
            PsihoPrep
          </div>

          <div
            style={{
              marginTop: Math.round(height * 0.008),
              fontSize: Math.round(Math.min(width, height) * 0.018),
              color: '#6f8193',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            Pregatire psihologica
          </div>
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  )
}
