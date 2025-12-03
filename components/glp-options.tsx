'use client'

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const glpProducts = [
  {
    id: "ozempic",
    title: "Ozempic®",
    activeIngredient: "semaglutida",
    stockText: "Tratamento disponível",
    image: "/ozenpic.webp",
  },
  {
    id: "mounjaro",
    title: "Mounjaro®",
    activeIngredient: "tirzepatida",
    stockText: "Tratamento disponível",
    image: "/monjauro.png",
  },
  {
    id: "saxenda",
    title: "Saxenda®",
    activeIngredient: "liraglutida",
    stockText: "Tratamento disponível",
    image: "/Saxenda.png",
  },
  {
    id: "wegovy",
    title: "Wegovy®",
    activeIngredient: "semaglutida",
    stockText: "Tratamento disponível",
    image: "/Wegovy.webp",
  },
]

export function GLPOptions() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-12 text-center md:mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            medicamentos glp-1
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            Encontre a melhor opção para o seu tratamento
          </h2>
        </header>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {glpProducts.map((product) => (
            <Card
              key={product.id}
              className="flex h-full flex-col overflow-hidden border border-slate-200 shadow-sm"
            >
              <div className="relative bg-slate-100">
                <div className="relative aspect-square w-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="scale-110 object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 bg-white p-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-medium text-emerald-800">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  {product.stockText}
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground">{product.title}</h3>
                  <p className="text-sm lowercase text-muted-foreground">{product.activeIngredient}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t bg-white/80 px-6 pb-6 pt-4">
                <div className="flex gap-3">
                  <Link href="/questionario" className="flex-1">
                    <Button className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90">
                      Comece agora
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="flex-1 rounded-full border border-foreground/20 text-foreground hover:bg-muted"
                  >
                    Saber mais
                  </Button>
                </div>
                <button className="text-left text-xs font-semibold text-foreground underline-offset-2 hover:underline">
                  Informações importantes sobre segurança
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
