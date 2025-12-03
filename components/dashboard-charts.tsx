'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts'
import { format } from 'date-fns'

interface Entry {
  date: string
  weight: number
  medication: string
  dosage: string
  wellbeing: string
  notes?: string
}

interface DashboardChartsProps {
  entries: Entry[]
}

const chartConfig = {
  weight: {
    label: 'Peso (kg)',
    color: 'oklch(0.646 0.222 41.116)',
  },
  wellbeing: {
    label: 'Bem-estar',
    color: 'oklch(0.6 0.118 184.704)',
  },
}

const wellbeingScore: Record<string, number> = {
  excelente: 5,
  bom: 4,
  regular: 3,
  ruim: 2,
  muito_ruim: 1,
}

export function DashboardCharts({ entries }: DashboardChartsProps) {
  const chartData = entries.map((entry) => ({
    ...entry,
    date: format(new Date(entry.date), 'dd/MM'),
    dateFull: entry.date,
    wellbeingScore: wellbeingScore[entry.wellbeing] || 3,
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Peso */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução do Peso</CardTitle>
          <CardDescription>
            Acompanhamento semanal do seu peso corporal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-weight)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-weight)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs"
                  domain={['dataMin - 2', 'dataMax + 2']}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value: number) => [`${value.toFixed(1)} kg`, 'Peso']}
                />
                <Area
                  type="monotone"
                  dataKey="weight"
                  stroke="var(--color-weight)"
                  fill="url(#colorWeight)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Bem-estar */}
      <Card>
        <CardHeader>
          <CardTitle>Bem-estar ao Longo do Tratamento</CardTitle>
          <CardDescription>
            Como você está se sentindo semana a semana
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs"
                  domain={[0, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tickFormatter={(value) => {
                    const labels: Record<number, string> = {
                      1: 'Muito Ruim',
                      2: 'Ruim',
                      3: 'Regular',
                      4: 'Bom',
                      5: 'Excelente',
                    }
                    return labels[value] || ''
                  }}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value: number) => {
                    const labels: Record<number, string> = {
                      1: 'Muito Ruim',
                      2: 'Ruim',
                      3: 'Regular',
                      4: 'Bom',
                      5: 'Excelente',
                    }
                    return [labels[value] || '', 'Bem-estar']
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="wellbeingScore"
                  stroke="var(--color-wellbeing)"
                  strokeWidth={2}
                  dot={{ r: 5, fill: 'var(--color-wellbeing)' }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
