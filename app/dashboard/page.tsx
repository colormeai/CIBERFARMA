'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { DashboardMetrics } from '@/components/dashboard-metrics'
import { DashboardCharts } from '@/components/dashboard-charts'
import { WeeklyEntryForm } from '@/components/weekly-entry-form'
import { DashboardInsights } from '@/components/dashboard-insights'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

// Mock data - em produção viria de uma API
const mockData = {
  currentWeight: 85.5,
  initialWeight: 95.0,
  targetWeight: 75.0,
  weeklyEntries: [
    { date: '2025-01-01', weight: 95.0, medication: 'ozempic', dosage: '0.25mg', wellbeing: 'bom', notes: 'Primeira semana, sem efeitos colaterais' },
    { date: '2025-01-08', weight: 93.5, medication: 'ozempic', dosage: '0.25mg', wellbeing: 'bom', notes: 'Sentindo menos fome' },
    { date: '2025-01-15', weight: 92.0, medication: 'ozempic', dosage: '0.5mg', wellbeing: 'regular', notes: 'Aumentei a dose, leve náusea' },
    { date: '2025-01-22', weight: 90.5, medication: 'ozempic', dosage: '0.5mg', wellbeing: 'bom', notes: 'Náusea passou' },
    { date: '2025-01-29', weight: 89.0, medication: 'ozempic', dosage: '0.5mg', wellbeing: 'excelente', notes: 'Me sinto muito bem' },
    { date: '2025-02-05', weight: 87.5, medication: 'ozempic', dosage: '1.0mg', wellbeing: 'bom', notes: 'Dose aumentada conforme orientação' },
    { date: '2025-02-12', weight: 86.0, medication: 'ozempic', dosage: '1.0mg', wellbeing: 'bom', notes: '' },
    { date: '2025-02-19', weight: 85.5, medication: 'ozempic', dosage: '1.0mg', wellbeing: 'excelente', notes: 'Progresso constante' },
  ],
}

export default function DashboardPage() {
  const [showEntryForm, setShowEntryForm] = useState(false)
  const [entries, setEntries] = useState(mockData.weeklyEntries)

  const handleNewEntry = (newEntry: typeof mockData.weeklyEntries[0]) => {
    setEntries([...entries, newEntry].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    ))
    setShowEntryForm(false)
  }

  const latestEntry = entries[entries.length - 1]
  const firstEntry = entries[0]

  const metrics = {
    currentWeight: latestEntry.weight,
    initialWeight: firstEntry.weight,
    targetWeight: mockData.targetWeight,
    weightLost: firstEntry.weight - latestEntry.weight,
    weightToGo: latestEntry.weight - mockData.targetWeight,
    weeksInTreatment: entries.length,
    averageWeeklyLoss: (firstEntry.weight - latestEntry.weight) / entries.length,
    currentMedication: latestEntry.medication,
    currentDosage: latestEntry.dosage,
    currentWellbeing: latestEntry.wellbeing,
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header do Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Meu Acompanhamento</h1>
            <p className="text-muted-foreground">
              Acompanhe sua evolução e mantenha-se no caminho certo
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowEntryForm(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Novo Check-in
            </Button>
          </div>
        </div>

        {/* Métricas Principais */}
        <DashboardMetrics metrics={metrics} />

        {/* Gráficos */}
        <div className="mt-8">
          <DashboardCharts entries={entries} />
        </div>

        {/* Insights */}
        <div className="mt-8">
          <DashboardInsights entries={entries} metrics={metrics} />
        </div>
      </div>

      {/* Formulário de Nova Entrada */}
      {showEntryForm && (
        <WeeklyEntryForm
          onClose={() => setShowEntryForm(false)}
          onSubmit={handleNewEntry}
          lastEntry={latestEntry}
        />
      )}
    </main>
  )
}
