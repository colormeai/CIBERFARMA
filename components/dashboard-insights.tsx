'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, Target, Zap, Award, AlertCircle, Heart, Pill, Eye, EyeOff, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Entry {
  date: string
  weight: number
  medication: string
  dosage: string
  wellbeing: string
  notes?: string
}

interface Metrics {
  currentWeight: number
  initialWeight: number
  targetWeight: number
  weightLost: number
  weightToGo: number
  weeksInTreatment: number
  averageWeeklyLoss: number
  currentMedication: string
  currentDosage: string
  currentWellbeing: string
}

interface DashboardInsightsProps {
  entries: Entry[]
  metrics: Metrics
}

const medicationLabels: Record<string, string> = {
  ozempic: 'Ozempic®',
  mounjaro: 'Mounjaro®',
  saxenda: 'Saxenda®',
  wegovy: 'Wegovy®',
}

const wellbeingLabels: Record<string, { label: string; color: string; bgColor: string }> = {
  excelente: { label: 'Excelente', color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-950/20' },
  bom: { label: 'Bom', color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-950/20' },
  regular: { label: 'Regular', color: 'text-yellow-600', bgColor: 'bg-yellow-50 dark:bg-yellow-950/20' },
  ruim: { label: 'Ruim', color: 'text-orange-600', bgColor: 'bg-orange-50 dark:bg-orange-950/20' },
  muito_ruim: { label: 'Muito Ruim', color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-950/20' },
}

export function DashboardInsights({ entries, metrics }: DashboardInsightsProps) {
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set())
  
  const toggleNotes = (entryKey: string) => {
    const newExpanded = new Set(expandedNotes)
    if (newExpanded.has(entryKey)) {
      newExpanded.delete(entryKey)
    } else {
      newExpanded.add(entryKey)
    }
    setExpandedNotes(newExpanded)
  }
  
  // Calcular insights
  const calculateBMI = (weight: number, height: number = 1.75) => {
    return weight / (height * height)
  }

  const currentBMI = calculateBMI(metrics.currentWeight)
  const initialBMI = calculateBMI(metrics.initialWeight)
  const targetBMI = calculateBMI(metrics.targetWeight)

  const bmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Abaixo do peso', color: 'text-blue-600' }
    if (bmi < 25) return { label: 'Peso normal', color: 'text-green-600' }
    if (bmi < 30) return { label: 'Sobrepeso', color: 'text-yellow-600' }
    return { label: 'Obesidade', color: 'text-red-600' }
  }

  // Calcular tendência de peso
  const recentEntries = entries.slice(-3)
  const weightTrend = recentEntries.length >= 2
    ? recentEntries[recentEntries.length - 1].weight - recentEntries[0].weight
    : 0

  // Calcular tendência de bem-estar
  const wellbeingTrend = recentEntries.length >= 2
    ? recentEntries[recentEntries.length - 1].wellbeing !== recentEntries[0].wellbeing
    : false

  // Calcular projeção
  const weeksToGoal = metrics.averageWeeklyLoss > 0
    ? Math.ceil(metrics.weightToGo / metrics.averageWeeklyLoss)
    : 0

  // Análise de bem-estar
  const wellbeingCounts = entries.reduce((acc, entry) => {
    acc[entry.wellbeing] = (acc[entry.wellbeing] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const mostCommonWellbeing = Object.entries(wellbeingCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
  const wellbeing = wellbeingLabels[metrics.currentWellbeing] || wellbeingLabels.regular

  const insights = [
    {
      type: 'success',
      icon: TrendingDown,
      title: 'Progresso Excelente',
      description: `Você já perdeu ${metrics.weightLost.toFixed(1)} kg! Continue mantendo essa consistência.`,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
    {
      type: 'info',
      icon: Target,
      title: 'Meta de Peso',
      description: `Faltam ${metrics.weightToGo.toFixed(1)} kg para alcançar sua meta. Mantendo o ritmo atual, você deve alcançar em aproximadamente ${weeksToGoal} semanas.`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      type: weightTrend > 0 ? 'warning' : 'success',
      icon: weightTrend > 0 ? AlertCircle : TrendingDown,
      title: weightTrend > 0 ? 'Atenção à Tendência' : 'No Caminho Certo',
      description: weightTrend > 0
        ? 'Sua perda de peso desacelerou nas últimas semanas. Considere revisar sua rotina ou conversar com seu médico.'
        : 'Você está no caminho certo! Continue seguindo o tratamento conforme orientado.',
      color: weightTrend > 0 ? 'text-yellow-600' : 'text-green-600',
      bgColor: weightTrend > 0 ? 'bg-yellow-50 dark:bg-yellow-950/20' : 'bg-green-50 dark:bg-green-950/20',
    },
  ]

  const stats = [
    {
      label: 'IMC Atual',
      value: currentBMI.toFixed(1),
      change: (initialBMI - currentBMI).toFixed(1),
      changeLabel: 'Redução',
      category: bmiCategory(currentBMI),
      icon: Target,
    },
    {
      label: 'Velocidade de Perda',
      value: `${metrics.averageWeeklyLoss.toFixed(2)} kg/sem`,
      change: 'Saudável',
      changeLabel: 'ritmo',
      category: { label: 'Ideal', color: 'text-green-600' },
      icon: Zap,
    },
    {
      label: 'Tempo de Tratamento',
      value: `${metrics.weeksInTreatment} semanas`,
      change: `${Math.floor(metrics.weeksInTreatment / 4)} meses`,
      changeLabel: 'aproximadamente',
      category: { label: 'Em andamento', color: 'text-blue-600' },
      icon: Award,
    },
    {
      label: 'Bem-estar Atual',
      value: wellbeing.label,
      change: mostCommonWellbeing === metrics.currentWellbeing ? 'Consistente' : 'Variável',
      changeLabel: 'tendência',
      category: { label: wellbeing.label, color: wellbeing.color },
      icon: Heart,
    },
  ]

  // Emojis de bem-estar (rostos: feliz verde, neutro laranja, triste vermelho)
  const wellbeingEmojis: Record<string, string> = {
    excelente: '😊', // Rosto feliz (verde na imagem)
    bom: '😊', // Rosto feliz (verde na imagem)
    regular: '😐', // Rosto neutro (laranja na imagem)
    ruim: '😞', // Rosto triste (vermelho na imagem)
    muito_ruim: '😞', // Rosto triste (vermelho na imagem)
  }

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">{stat.changeLabel}:</span>
                    <span className={cn('font-medium', stat.category.color)}>
                      {stat.change}
                    </span>
                  </div>
                  <div className={cn('text-xs font-medium', stat.category.color)}>
                    {stat.category.label}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Insights e Recomendações */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon
          return (
            <Card key={index} className={cn('border-l-4', insight.bgColor)} style={{ borderLeftColor: 'currentColor' }}>
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className={cn('p-2 rounded-lg', insight.bgColor)}>
                    <Icon className={cn('h-5 w-5', insight.color)} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className={cn('text-base', insight.color)}>
                      {insight.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {insight.description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Histórico de Tratamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Histórico de Tratamento
          </CardTitle>
          <CardDescription>
            Evolução completa do seu tratamento semana a semana
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...entries].reverse().map((entry, index) => {
              const entryKey = `${entry.date}-${index}`
              const isExpanded = expandedNotes.has(entryKey)
              const hasNotes = entry.notes && entry.notes.trim().length > 0
              
              return (
                <div key={entryKey} className="rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Emoji de bem-estar - círculos coloridos */}
                      <div className="text-4xl leading-none">
                        {wellbeingEmojis[entry.wellbeing] || '🟠'}
                      </div>
                      
                      {/* Informações principais */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="font-semibold text-lg">
                            {medicationLabels[entry.medication] || entry.medication}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {entry.dosage}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString('pt-BR', { 
                            weekday: 'short',
                            day: 'numeric', 
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                      
                      {/* Peso */}
                      <div className="text-right mr-4">
                        <div className="text-xl font-bold text-black dark:text-white">
                          {entry.weight.toFixed(1)} kg
                        </div>
                      </div>
                      
                      {/* Botão de Observações */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleNotes(entryKey)}
                        className="h-8 w-8 p-0"
                        title={isExpanded ? "Ocultar observações" : "Ver observações"}
                      >
                        {isExpanded ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Observações expandidas */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-0 border-t border-muted/50 mt-2">
                      <div className="pt-3">
                        <div className="text-xs font-medium text-muted-foreground mb-2">Observações:</div>
                        <div className="text-sm text-foreground whitespace-pre-wrap bg-background/50 p-3 rounded-md border border-muted">
                          {hasNotes ? entry.notes : '-'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Resumo de Progresso */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo de Progresso</CardTitle>
          <CardDescription>
            Comparação entre o início e o momento atual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground mb-2">Peso Inicial</div>
              <div className="text-3xl font-bold mb-2">{entries[0].weight.toFixed(1)} kg</div>
              <div className="text-xs text-muted-foreground">
                {new Date(entries[0].date).toLocaleDateString('pt-BR')}
              </div>
            </div>
            <div className="text-center p-6 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground mb-2">Peso Atual</div>
              <div className="text-3xl font-bold mb-2 text-chart-1">
                {entries[entries.length - 1].weight.toFixed(1)} kg
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(entries[entries.length - 1].date).toLocaleDateString('pt-BR')}
              </div>
            </div>
            <div className="text-center p-6 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground mb-2">Total Perdido</div>
              <div className={cn(
                'text-3xl font-bold mb-2',
                metrics.weightLost > 0 ? 'text-green-600' : metrics.weightLost < 0 ? 'text-red-600' : 'text-muted-foreground'
              )}>
                {metrics.weightLost > 0 ? '-' : metrics.weightLost < 0 ? '+' : ''}{Math.abs(metrics.weightLost).toFixed(1)} kg
              </div>
              <div className="text-xs text-muted-foreground">
                {((metrics.weightLost / metrics.initialWeight) * 100).toFixed(1)}% do peso inicial
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
