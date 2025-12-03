import { TrendingDown, Heart, Zap, Moon, Utensils, BarChart3 } from "lucide-react"

const benefits = [
  {
    icon: TrendingDown,
    title: "Emagrecimento Sustentável",
    description:
      "Alcance resultados duradouros com tratamentos baseados em ciência que trabalham com os processos naturais do seu corpo.",
  },
  {
    icon: Heart,
    title: "Saúde Cardíaca Melhorada",
    description:
      "Reduza riscos cardiovasculares e melhore a saúde metabólica geral através do controle de peso supervisionado por médicos.",
  },
  {
    icon: Zap,
    title: "Mais Energia",
    description: "Experimente níveis mais altos de energia e vitalidade melhorada ao atingir seu peso ideal.",
  },
  {
    icon: Moon,
    title: "Sono Melhor",
    description: "Muitos pacientes relatam melhoria na qualidade do sono e redução dos sintomas de apneia do sono.",
  },
  {
    icon: Utensils,
    title: "Menos Desejos",
    description: "Tratamentos GLP-1 reduzem naturalmente o apetite e os desejos por comida para melhor adesão.",
  },
  {
    icon: BarChart3,
    title: "Acompanhamento de Progresso",
    description: "Monitore sua jornada com análises detalhadas e check-ins regulares com sua equipe de cuidados.",
  },
]

export function Benefits() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-caramel uppercase tracking-widest mb-4">Por Que Nos Escolher</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Benefícios do Tratamento</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experimente melhorias abrangentes em sua saúde e bem-estar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-5 bg-background rounded-3xl p-8 shadow-sm border border-border/30">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-warm-beige flex items-center justify-center">
                <benefit.icon className="h-7 w-7 text-caramel" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
