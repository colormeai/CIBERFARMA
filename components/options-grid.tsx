import { Scale, Brain, Dna, Activity, ArrowUpRight } from "lucide-react"

const options = [
  {
    icon: Scale,
    title: "Emagrecimento",
    description: "Tratamentos eficazes para resultados sustentáveis",
  },
  {
    icon: Brain,
    title: "Controle de Apetite",
    description: "Regule a fome e os desejos naturalmente",
  },
  {
    icon: Dna,
    title: "Ciência GLP-1",
    description: "Opções de medicamentos aprovados pela ANVISA",
  },
  {
    icon: Activity,
    title: "Análise Corporal",
    description: "Avaliações metabólicas personalizadas",
  },
]

export function OptionsGrid() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Explore Suas Opções</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra a abordagem certa para sua jornada de emagrecimento
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((option, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 cursor-pointer"
            >
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <option.icon className="h-8 w-8 text-caramel" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2">{option.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{option.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
