export default function DashboardLoading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="dashboard-loading-panel">
        <div className="dashboard-loading-mark">
          <div className="dashboard-loading-orbit" />
          <div className="dashboard-loading-core" />
        </div>
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
            PsihoPrep
          </p>
          <p className="mt-2 text-sm text-slate-500">Se încarcă următoarea secțiune...</p>
        </div>
      </div>
    </div>
  )
}
