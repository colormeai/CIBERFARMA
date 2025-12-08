'use client'

import { Button } from "@/components/ui/button"
import { Check, X, Sparkles, Zap, MessageCircle, Brain, Settings, FileText, Clock, Stethoscope, Activity, UtensilsCrossed, Dumbbell, Star, ArrowRight, Crown } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const plans = [
  {
    id: 'trimestral',
    name: 'EVO90',
    subtitle: 'Acompanhamento Trimestral',
    price: '399',
    originalPrice: null,
    currency: 'R$',
    period: '/3 meses',
    description: 'Acompanha as fases naturais do GLP-1 (início → titulação → estabilização) em 90 dias. Perfeito para o ciclo natural do tratamento.',
    buttonText: 'Assinar EVO90',
    isPromo: false,
    badge: null,
    features: [
      { icon: Stethoscope, text: 'Consulta médica online', subtext: '1 consulta por mês (3 no total)' },
      { icon: FileText, text: 'Receita digital válida em todo o Brasil' },
      { icon: MessageCircle, text: 'Orientações de uso e segurança' },
      { icon: Clock, text: 'Chat para dúvidas durante os 3 meses' },
      { icon: Settings, text: 'Ajustes de dose conforme evolução' },
      { icon: FileText, text: 'Reemissão de receitas sem custo' },
      { icon: Stethoscope, text: 'Acompanhamento médico sempre que necessário' },
      { icon: Activity, text: 'Monitoramento de evolução semanal' },
    ],
    excludedFeatures: [
      { icon: UtensilsCrossed, text: 'Nutricionista 100% online' },
      { icon: UtensilsCrossed, text: 'Dieta personalizada mensal' },
      { icon: Dumbbell, text: 'Treino personalizado mensal' },
      { icon: Sparkles, text: 'Acesso antecipado a novos programas CIBERMED' },
    ],
    footer: 'Perfeito para o ciclo natural de 90 dias do GLP-1.',
  },
  {
    id: 'anual',
    name: 'EVO360',
    subtitle: 'Acompanhamento Anual',
    price: '1200',
    originalPrice: '1600',
    currency: 'R$',
    period: '/12 meses',
    description: 'Plano completo com nutricionista e treino personalizado. Ideal para transformação completa e resultados duradouros.',
    buttonText: 'Assinar EVO360',
    isPromo: true,
    badge: 'OFERTA ESPECIAL',
    features: [
      { icon: Stethoscope, text: 'Consulta médica online', subtext: 'Consultas ilimitadas' },
      { icon: FileText, text: 'Receita digital válida em todo o Brasil', subtext: 'Ilimitada durante o ano' },
      { icon: MessageCircle, text: 'Orientações de uso e segurança' },
      { icon: Clock, text: 'Chat prioritário durante os 12 meses' },
      { icon: Settings, text: 'Ajustes de dose ilimitados' },
      { icon: FileText, text: 'Reemissão de receitas ilimitada' },
      { icon: Stethoscope, text: 'Acompanhamento médico sempre que necessário' },
      { icon: Activity, text: 'Monitoramento de evolução semanal' },
      { icon: UtensilsCrossed, text: 'Nutricionista 100% online' },
      { icon: UtensilsCrossed, text: 'Dieta personalizada mensal' },
      { icon: Dumbbell, text: 'Treino personalizado mensal' },
      { icon: Sparkles, text: 'Acesso antecipado a novos programas CIBERMED' },
    ],
    excludedFeatures: [],
    footer: 'Pode parcelar em 12x no checkout.',
  },
]

export function PricingPlans() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Planos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para sua jornada de transformação
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const isPromo = plan.isPromo
            
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative bg-card rounded-3xl p-8 md:p-10 border-2 transition-all duration-300 overflow-hidden",
                  isPromo
                    ? "border-foreground/20 shadow-2xl md:scale-105 z-10 bg-gradient-to-br from-warm-beige/30 via-card to-cream/20"
                    : "border-border/50 hover:border-foreground/20 hover:shadow-lg"
                )}
              >
                {/* Badge de Promoção - Design Elegante */}
                {isPromo && plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-foreground text-background px-6 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 border border-foreground/10">
                      <Crown className="h-3.5 w-3.5" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Efeito de brilho sutil no topo */}
                {isPromo && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-foreground/30 via-foreground/50 to-foreground/30" />
                )}

                {/* Header do Plano */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className={cn(
                      "text-3xl md:text-4xl font-bold",
                      isPromo ? "text-foreground" : "text-foreground"
                    )}>
                      {plan.name}
                    </h3>
                    {isPromo && (
                      <div className="relative">
                        <Star className="h-6 w-6 text-yellow-500 fill-yellow-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm font-medium text-muted-foreground mb-4">
                    {plan.subtitle}
                  </p>

                  {/* Preço */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      {plan.originalPrice && (
                        <span className="text-xl text-muted-foreground line-through">
                          {plan.currency} {plan.originalPrice}
                        </span>
                      )}
                      <div className="flex items-baseline gap-2">
                        <span className={cn(
                          "text-5xl md:text-6xl font-bold",
                          isPromo ? "text-foreground" : "text-foreground"
                        )}>
                          {plan.currency} {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-lg text-muted-foreground">
                            {plan.period}
                          </span>
                        )}
                      </div>
                    </div>
                    {isPromo && plan.originalPrice && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-muted-foreground">
                          ou <span className="font-semibold text-foreground">12x de {plan.currency} {Math.round(parseInt(plan.price) / 12)}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {plan.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>
                  )}
                </div>

                {/* Botão CTA */}
                <Link href="/questionario" className="block mb-8">
                  <Button
                    className={cn(
                      "w-full rounded-full py-7 text-lg font-semibold transition-all duration-300 group relative overflow-hidden",
                      isPromo
                        ? "bg-foreground text-background hover:bg-foreground/90 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                        : "bg-foreground text-background hover:bg-foreground/90"
                    )}
                  >
                    {isPromo && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {plan.buttonText}
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Check className="h-5 w-5 text-emerald-500" />
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
                      O que está incluído
                    </h4>
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => {
                      const Icon = feature.icon
                      return (
                        <li key={idx} className="flex items-start gap-3 group">
                          <div className="p-1.5 rounded-lg mt-0.5 transition-colors bg-emerald-100 dark:bg-emerald-950/30 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-950/50">
                            <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Icon className={cn(
                                "h-4 w-4 flex-shrink-0",
                                isPromo ? "text-foreground/70" : "text-muted-foreground"
                              )} />
                              <span className="text-sm text-foreground leading-relaxed font-medium">
                                {feature.text}
                              </span>
                            </div>
                            {feature.subtext && (
                              <p className="text-xs text-muted-foreground mt-1 ml-6 leading-relaxed">
                                {feature.subtext}
                              </p>
                            )}
                          </div>
                        </li>
                      )
                    })}
                    {/* Features excluídas para EVO90 */}
                    {!isPromo && plan.excludedFeatures && plan.excludedFeatures.map((feature, idx) => {
                      const Icon = feature.icon
                      return (
                        <li key={`excluded-${idx}`} className="flex items-start gap-3 group opacity-60">
                          <div className="p-1.5 rounded-lg mt-0.5 transition-colors bg-red-100 dark:bg-red-950/30 group-hover:bg-red-200 dark:group-hover:bg-red-950/50">
                            <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground leading-relaxed font-medium line-through">
                                {feature.text}
                              </span>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-border/50">
                  <p className="text-xs text-muted-foreground leading-relaxed text-center">
                    {plan.footer}
                  </p>
                </div>

                {/* Decoração de fundo elegante para plano promocional */}
                {isPromo && (
                  <>
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-foreground/5 rounded-full blur-3xl -z-10" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-foreground/5 rounded-full blur-3xl -z-10" />
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Nota adicional */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Todos os planos incluem suporte completo e acompanhamento médico especializado
          </p>
        </div>
      </div>
    </section>
  )
}
