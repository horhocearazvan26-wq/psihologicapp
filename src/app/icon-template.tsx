import { ImageResponse } from 'next/og'

type AppIconVariant = 'regular' | 'maskable'

export function createAppIconResponse(
  size: number,
  variant: AppIconVariant = 'regular'
) {
  const padding = variant === 'maskable' ? Math.round(size * 0.16) : Math.round(size * 0.18)
  const cornerRadius = Math.round(size * (variant === 'maskable' ? 0.26 : 0.22))
  const strokeWidth = Math.max(12, Math.round(size * 0.035))

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.24), transparent 34%), linear-gradient(145deg, #4f46e5 0%, #7c3aed 55%, #312e81 100%)',
        }}
      >
        <div
          style={{
            width: size - padding * 2,
            height: size - padding * 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: cornerRadius,
            background:
              'linear-gradient(160deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 35%, rgba(15,23,42,0.18) 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
          }}
        >
          <svg
            width={Math.round(size * 0.42)}
            height={Math.round(size * 0.42)}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 18V5"
              stroke="white"
              strokeWidth={strokeWidth / 12}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"
              stroke="white"
              strokeWidth={strokeWidth / 12}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"
              stroke="white"
              strokeWidth={strokeWidth / 12}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.997 5.125a4 4 0 0 1 2.526 5.77"
              stroke="white"
              strokeWidth={strokeWidth / 12}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 18a4 4 0 0 0 2-7.464"
              stroke="white"
              strokeWidth={strokeWidth / 12}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"
              stroke="white"
              strokeWidth={strokeWidth / 12}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 18a4 4 0 0 1-2-7.464"
              stroke="white"
              strokeWidth={strokeWidth / 12}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.003 5.125a4 4 0 0 0-2.526 5.77"
              stroke="white"
              strokeWidth={strokeWidth / 12}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
    }
  )
}
