'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingDown, Target, Activity, Pill, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

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

interface DashboardMetricsProps {
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

const medicationImages: Record<string, string> = {
  ozempic: '/ozempic-pen.webp',
  mounjaro: '/monjaurodesh.png',
}

export function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  const weightProgress = ((metrics.weightLost / (metrics.initialWeight - metrics.targetWeight)) * 100)
  const wellbeing = wellbeingLabels[metrics.currentWellbeing] || wellbeingLabels.regular
  
  // Determinar cor do peso atual baseado na comparação com o peso inicial
  const currentWeightColor = metrics.currentWeight < metrics.initialWeight 
    ? 'text-green-600' 
    : metrics.currentWeight > metrics.initialWeight 
    ? 'text-red-600' 
    : 'text-chart-1'
  const currentWeightBgColor = metrics.currentWeight < metrics.initialWeight 
    ? 'bg-green-50 dark:bg-green-950/20' 
    : metrics.currentWeight > metrics.initialWeight 
    ? 'bg-red-50 dark:bg-red-950/20' 
    : 'bg-chart-1/10'

  const metricCards = [
    {
      title: 'Peso Atual',
      value: `${metrics.currentWeight.toFixed(1)} kg`,
      change: `-${metrics.weightLost.toFixed(1)} kg`,
      changeLabel: 'Perdido',
      progress: weightProgress,
      icon: Activity,
      color: currentWeightColor,
      bgColor: currentWeightBgColor,
    },
    {
      title: 'Meta de Peso',
      value: `${metrics.targetWeight.toFixed(1)} kg`,
      change: `${metrics.weightToGo.toFixed(1)} kg`,
      changeLabel: 'Faltam',
      progress: 100 - weightProgress,
      icon: Target,
      color: 'text-chart-2',
      bgColor: 'bg-chart-2/10',
    },
    {
      title: 'Bem-estar',
      value: wellbeing.label,
      change: `${metrics.weeksInTreatment} semanas`,
      changeLabel: 'Em tratamento',
      progress: 0,
      icon: Heart,
      color: wellbeing.color,
      bgColor: wellbeing.bgColor,
    },
    {
      title: 'Medicamento Atual',
      value: medicationLabels[metrics.currentMedication] || metrics.currentMedication,
      change: metrics.currentDosage,
      changeLabel: 'Dosagem',
      progress: 0,
      icon: Pill,
      color: 'text-chart-3',
      bgColor: 'bg-chart-3/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricCards.map((card, index) => {
        const Icon = card.icon
        const isMedicationCard = card.title === 'Medicamento Atual'
        const medicationImage = isMedicationCard ? medicationImages[metrics.currentMedication] : null
        
        return (
          <Card key={index} className="relative overflow-hidden">
            <div className={cn('absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-20', card.bgColor)} />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={cn('p-2 rounded-lg', card.bgColor)}>
                  <Icon className={cn('h-4 w-4', card.color)} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {/* Imagens dos medicamentos - apenas para Ozempic e Mounjaro */}
                {isMedicationCard && medicationImage ? (
                  <div className={cn(
                    "flex justify-center items-center mb-2 min-h-[64px] overflow-hidden",
                    metrics.currentMedication === 'mounjaro' && "-mt-2"
                  )}>
                    <div className="relative w-full h-16 overflow-hidden">
                      <Image
                        src={medicationImage}
                        alt={card.value}
                        fill
                        className={cn(
                          "object-contain",
                          metrics.currentMedication === 'ozempic' ? 'scale-[2]' : 'scale-[2.5]'
                        )}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                ) : isMedicationCard ? (
                  <div className="min-h-[64px] mb-2"></div>
                ) : null}
                <div className="text-3xl font-bold">{card.value}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{card.changeLabel}:</span>
                  <span className={cn('font-semibold', card.color)}>
                    {card.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
