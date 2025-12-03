'use client'

import { Button } from "@/components/ui/button"
import { Check, X, Zap, MessageCircle, Camera, Brain, Settings, Users, FileText, Clock, Bell, Stethoscope, Activity, UtensilsCrossed, Dumbbell } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    id: 'individual',
    name: 'Consulta Individual',
    price: '199',
    currency: 'R$',
    period: '',
    tagline: 'Quem quer iniciar rápido, com baixo custo',
    buttonText: 'Assinar Individual',
    buttonVariant: 'outline' as const,
    isCurrent: false,
    isRecommended: false,
    publico: 'Quem quer iniciar rápido, com baixo custo',
    features: [
      { icon: Stethoscope, text: 'Consulta médica online', subtext: '1 consulta pontual com endocrino/clínico' },
      { icon: Brain, text: 'Avaliação de elegibilidade GLP-1' },
      { icon: FileText, text: 'Receita digital válida em todo o Brasil' },
      { icon: MessageCircle, text: 'Orientações iniciais de uso e segurança' },
      { icon: Clock, text: 'Chat para dúvidas rápidas por 7 dias' },
    ],
    notIncluded: [],
    description: 'Plano ideal para quem quer começar rápido.',
    footer: 'Plano ideal para quem quer começar rápido.',
  },
  {
    id: 'trimestral',
    name: 'Acompanhamento Trimestral',
    price: '399',
    currency: 'R$',
    period: '/3 meses',
    tagline: 'Plano ideal; acompanha as fases naturais do GLP-1',
    buttonText: 'Assinar Trimestral',
    buttonVariant: 'default' as const,
    isCurrent: false,
    isRecommended: false,
    publico: 'Plano ideal; acompanha as fases naturais do GLP-1 (início → titulação → estabilização)',
    features: [
      { icon: Stethoscope, text: 'Consulta médica online', subtext: '1 consulta por mês (3 no total)' },
      { icon: Brain, text: 'Avaliação de elegibilidade GLP-1' },
      { icon: FileText, text: 'Receita digital válida em todo o Brasil' },
      { icon: MessageCircle, text: 'Orientações de uso e segurança' },
      { icon: Clock, text: 'Chat para dúvidas durante os 3 meses' },
      { icon: Settings, text: 'Ajustes de dose conforme evolução' },
      { icon: FileText, text: 'Reemissão de receitas sem custo' },
      { icon: Stethoscope, text: 'Acompanhamento médico sempre que necessário' },
      { icon: Brain, text: 'Avaliação de efeitos colaterais' },
      { icon: Activity, text: 'Monitoramento de evolução mensal' },
    ],
    notIncluded: [],
    description: 'Perfeito para o acompanhamento médico e ciclo natural de 90 dias do GLP-1.',
    footer: 'Perfeito para o ciclo natural de 90 dias do GLP-1.',
  },
  {
    id: 'anual',
    name: 'Acompanhamento Anual',
    price: '1599',
    currency: 'R$',
    period: '/12 meses',
    tagline: 'Pacientes comprometidos com transformação real; plano premium',
    buttonText: 'Assinar Anual',
    buttonVariant: 'default' as const,
    isCurrent: false,
    isRecommended: true,
    publico: 'Pacientes comprometidos com transformação real; plano premium',
    features: [
      { icon: Stethoscope, text: 'Consulta médica online', subtext: 'Consultas ilimitadas' },
      { icon: Brain, text: 'Avaliação de elegibilidade GLP-1' },
      { icon: FileText, text: 'Receita digital válida em todo o Brasil', subtext: 'Ilimitada durante o ano' },
      { icon: MessageCircle, text: 'Orientações de uso e segurança' },
      { icon: Clock, text: 'Chat prioritário durante os 12 meses' },
      { icon: Settings, text: 'Ajustes de dose ilimitados' },
      { icon: FileText, text: 'Reemissão de receitas ilimitada' },
      { icon: Stethoscope, text: 'Acompanhamento médico sempre que necessário' },
      { icon: Brain, text: 'Avaliação de efeitos colaterais sempre que necessário' },
      { icon: Users, text: 'Revisões trimestrais completas' },
      { icon: Clock, text: 'Atendimento prioritário em até 24h úteis' },
      { icon: FileText, text: 'Avaliação de exames incluída sempre que necessário' },
      { icon: UtensilsCrossed, text: 'Nutricionista 100% online' },
      { icon: UtensilsCrossed, text: 'Dieta personalizada' },
      { icon: Dumbbell, text: 'Treino personalizado' },
      { icon: Bell, text: 'Acesso antecipado a novos programas CIBERMED' },
    ],
    notIncluded: [],
    description: 'Plano completo para quem está comprometido com o processo real de emagrecimento.',
    footer: 'Pode parcelar em 12x no checkout.',
    additionalInfo: 'Plano completo para quem está comprometido com o processo real de emagrecimento.',
  },
]

export function PricingPlans() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Escolha o plano ideal para você
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Planos flexíveis que se adaptam às suas necessidades de tratamento
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`relative bg-card rounded-3xl p-8 border-2 transition-all ${
                  plan.isRecommended
                    ? 'border-red-500 shadow-xl md:scale-105'
                    : 'border-border/50 hover:border-red-300/30'
                }`}
              >
                {plan.isRecommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      ⭐ Recomendado
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-4xl md:text-5xl font-bold text-foreground">
                      {plan.currency} {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground text-sm">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  {plan.description && (
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  )}
                </div>

                <Link href="/questionario" className="block mb-6">
                  <Button
                    variant={plan.isCurrent ? 'outline' : plan.buttonVariant}
                    className={`w-full rounded-full py-6 ${
                      plan.isCurrent
                        ? 'border-2 bg-transparent'
                        : plan.isRecommended
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-foreground text-background hover:bg-foreground/90'
                    }`}
                  >
                    {plan.isCurrent ? 'Seu plano atual' : plan.buttonText}
                  </Button>
                </Link>

                <div className="space-y-4 mb-6">
                  <div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => {
                        const Icon = feature.icon
                        return (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <span className="text-sm text-foreground leading-relaxed font-medium">
                                {feature.text}
                              </span>
                              {feature.subtext && (
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                  {feature.subtext}
                                </p>
                              )}
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  {plan.notIncluded.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                        ❌ O que não inclui
                      </p>
                      <ul className="space-y-2">
                        {plan.notIncluded.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <X className="h-4 w-4 text-muted-foreground/50 flex-shrink-0 mt-1" />
                            <span className="text-xs text-muted-foreground leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-border/50">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {plan.footer}
                  </p>
                  {plan.additionalInfo && (
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {plan.additionalInfo}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

