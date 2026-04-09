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
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="font-bold text-slate-800 mb-1">Evoluție scoruri</h3>
          <p className="text-xs text-slate-400 mb-4">Ultimele {chartSessions.length} sesiuni</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartSessions} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.07)', fontSize: 12 }}
                formatter={(value) => [`${value}%`, 'Scor']}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={{ fill: '#2563eb', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Category averages */}
      {categoryAverages.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="font-bold text-slate-800 mb-1">Medie per categorie</h3>
          <p className="text-xs text-slate-400 mb-4">Scor mediu din toate instituțiile</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryAverages} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="icon" tick={{ fontSize: 14 }} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.07)', fontSize: 12 }}
                formatter={(value, _name, props) => [
                  `${value}%`, (props.payload as CategoryAverage).category
                ]}
              />
              <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                {categoryAverages.map((entry, index) => (
                  <Cell key={index} fill={scoreColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
