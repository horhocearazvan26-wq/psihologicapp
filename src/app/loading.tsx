export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          'radial-gradient(circle at top, rgba(79,70,229,0.10), transparent 40%), #f7f8f6',
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-20 h-20 rounded-[22px] flex items-center justify-center animate-pulse"
          style={{
            background:
              'linear-gradient(145deg, #4f46e5 0%, #7c3aed 55%, #312e81 100%)',
            boxShadow: '0 18px 40px -18px rgba(79,70,229,0.45)',
          }}
        >
          <svg
            width="34"
            height="34"
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
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
            PsihoPrep
          </p>
          <p className="text-sm text-slate-500 mt-1">Se pregătește dashboard-ul...</p>
        </div>
      </div>
    </div>
  )
}
