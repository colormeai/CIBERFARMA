import { ClipboardCheck, Stethoscope, Package } from "lucide-react"

const steps = [
  {
    icon: ClipboardCheck,
    step: "01",
    title: "Complete Seu Perfil",
    description: "Responda algumas perguntas sobre seu histórico de saúde e objetivos de emagrecimento.",
  },
  {
    icon: Stethoscope,
    step: "02",
    title: "Avaliação Médica",
    description: "Um médico licenciado revisa suas informações e cria um plano personalizado.",
  },
  {
    icon: Package,
    step: "03",
    title: "Tratamento Entregue",
    description: "Seu medicamento chega discretamente na sua porta com suporte contínuo.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-caramel uppercase tracking-widest mb-4">Processo Simples</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Como Funciona</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comece sua transformação em três passos simples
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-border" />
              )}

              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-background shadow-lg mb-8">
                <step.icon className="h-10 w-10 text-foreground" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-caramel text-background text-xs font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
