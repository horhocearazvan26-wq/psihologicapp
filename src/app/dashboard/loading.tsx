export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="h-36 rounded-3xl skeleton" />
      <div className="grid grid-cols-3 gap-3">
        <div className="h-24 rounded-2xl skeleton" />
        <div className="h-24 rounded-2xl skeleton" />
        <div className="h-24 rounded-2xl skeleton" />
      </div>
      <div className="space-y-3">
        <div className="h-14 rounded-2xl skeleton" />
        <div className="h-14 rounded-2xl skeleton" />
        <div className="h-14 rounded-2xl skeleton" />
      </div>
    </div>
  )
}
