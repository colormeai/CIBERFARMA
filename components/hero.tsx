import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance max-w-2xl">
              <span className="font-light text-foreground">Perder peso custa menos</span>
              <br />
              <span className="font-bold text-foreground">do que você imagina!</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed">
              Tratamentos clinicamente comprovados, entregues na sua porta. Planos personalizados desenvolvidos por
              médicos licenciados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/questionario">
                <Button className="rounded-full px-8 py-6 text-base bg-foreground text-background hover:bg-foreground/90 shadow-lg">
                  Começe a Emagrecer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" className="rounded-full px-8 py-6 text-base border-2 bg-transparent">
                Ver Opções de Tratamento
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-warm-beige to-cream rounded-[3rem] shadow-2xl" />
              <img
                src="/modern-sleek-weight-loss-injection-pen-medical-dev.jpg"
                alt="Weight loss treatment pen"
                className="relative z-10 w-full h-full object-contain p-8"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
