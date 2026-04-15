export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(79,70,229,0.18) 0%, transparent 55%), #f7f8f6',
      }}
    >
      {/* Logo mark */}
      <div className="flex flex-col items-center gap-6">
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'linear-gradient(145deg, #4f46e5 0%, #7c3aed 55%, #312e81 100%)',
            boxShadow: '0 20px 48px -12px rgba(79,70,229,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse-logo 2s ease-in-out infinite',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
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

        {/* Brand name */}
        <div className="flex flex-col items-center gap-1">
          <span
            style={{
              fontWeight: 700,
              fontSize: '1.25rem',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #312e81 0%, #4f46e5 50%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Psihologic
          </span>
          <span
            style={{
              fontSize: '0.8rem',
              color: '#6b7280',
              letterSpacing: '0.02em',
            }}
          >
            Se pregătește platforma ta...
          </span>
        </div>
      </div>

      {/* Animated progress bar */}
      <div
        style={{
          width: 200,
          height: 3,
          borderRadius: 9999,
          background: 'rgba(79,70,229,0.12)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 9999,
            background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #4f46e5)',
            backgroundSize: '200% 100%',
            animation: 'shimmer-bar 1.6s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes pulse-logo {
          0%, 100% { transform: scale(1); box-shadow: 0 20px 48px -12px rgba(79,70,229,0.55); }
          50% { transform: scale(1.04); box-shadow: 0 24px 56px -8px rgba(79,70,229,0.7); }
        }
        @keyframes shimmer-bar {
          0% { width: 0%; margin-left: 0%; }
          40% { width: 70%; margin-left: 0%; }
          60% { width: 70%; margin-left: 30%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  )
}
