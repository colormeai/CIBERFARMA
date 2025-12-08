import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-balance max-w-2xl">
              <span className="font-light text-foreground">Perder peso custa menos</span>
              <br />
              <span className="font-bold text-foreground">do que você imagina!</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-md leading-relaxed">
              Tratamentos clinicamente comprovados, entregues na sua porta. Planos personalizados desenvolvidos por
              médicos licenciados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/questionario">
                <Button className="rounded-full px-8 py-6 text-lg bg-foreground text-background hover:bg-foreground/90 shadow-lg">
                  Começe a Emagrecer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" className="rounded-full px-8 py-6 text-lg border-2 bg-transparent">
                Ver Opções de Tratamento
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <img
                src="/3canetassites.png"
                alt="Weight loss treatment pen"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
