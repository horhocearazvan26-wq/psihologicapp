'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts'

interface ChartSession {
  label: string
  score: number
  date: string
}

interface CategoryAverage {
  category: string
  score: number
  icon: string
}

interface ProgressChartsProps {
  chartSessions: ChartSession[]
  categoryAverages: CategoryAverage[]
}

function scoreColor(score: number) {
  if (score >= 80) return '#16a34a'
  if (score >= 60) return '#d97706'
  return '#dc2626'
}

export function ProgressCharts({ chartSessions, categoryAverages }: ProgressChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Score evolution */}
      {chartSessions.length >= 2 && (
        <div className="dash-card rounded-2xl p-5" style={{ background: 'var(--bg-surface)' }}>
          <h3 className="font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>Evoluție scoruri</h3>
          <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Ultimele {chartSessions.length} sesiuni</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartSessions} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#3b566e' }} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#3b566e' }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #0f1e33', background: '#071121', color: '#edf3fc', boxShadow: '0 8px 24px -8px rgba(0,0,0,0.6)', fontSize: 12 }}
                formatter={(value) => [`${value}%`, 'Scor']}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#4f9fff"
                strokeWidth={2.5}
                dot={{ fill: '#4f9fff', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#60b0ff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Category averages */}
      {categoryAverages.length > 0 && (
        <div className="dash-card rounded-2xl p-5" style={{ background: 'var(--bg-surface)' }}>
          <h3 className="font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>Medie per categorie</h3>
          <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Scor mediu din toate instituțiile</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryAverages} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="icon" tick={{ fontSize: 14 }} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#3b566e' }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #0f1e33', background: '#071121', color: '#edf3fc', boxShadow: '0 8px 24px -8px rgba(0,0,0,0.6)', fontSize: 12 }}
                formatter={(value, _name, props) => [
                  `${value}%`, (props.payload as CategoryAverage).category
                ]}
              />
              <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                {categoryAverages.map((entry, index) => (
                  <Cell key={index} fill={scoreColor(entry.score)} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
