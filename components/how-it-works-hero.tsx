'use client'

import { Button } from "@/components/ui/button"
import { Pencil, Flag, FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function HowItWorksHero() {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Tenha acesso a medicamentos para perda de peso com receita médica online.
            </h1>
            
            <Link href="/questionario">
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-8 py-6 text-base font-medium">
                Comece agora
              </Button>
            </Link>

            {/* Key Information Points */}
            <div className="space-y-4 pt-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <Pencil className="w-6 h-6 text-foreground" />
                </div>
                <p className="text-base text-foreground">
                  Veja se você se qualifica para o Ozempic, Wegovy ou Zepbound. Veja as informações de segurança abaixo.
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <Flag className="w-6 h-6 text-foreground" />
                </div>
                <p className="text-base text-foreground">
                  Perca em média 20% do seu peso corporal com Zepbound*
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <FileText className="w-6 h-6 text-foreground" />
                </div>
                <p className="text-base text-foreground">
                  Saiba o que seu seguro cobre para ajudar com os custos.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full rounded-lg aspect-[3/4] overflow-hidden">
            <Image
              src="/como.webp"
              alt="Como funciona"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bottom Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 pt-16 border-t">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-cream rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-base text-foreground">
              Treinamento e suporte sob demanda para provedores
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-cream rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <p className="text-base text-foreground">
              Mais opções de GLP-1 para atender às suas necessidades.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-cream rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-base text-foreground">
              Ajuda você a se sentir saciado mais rápido e por mais tempo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

