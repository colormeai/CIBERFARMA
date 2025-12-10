'use client'

import { Button } from "@/components/ui/button"
import { Pencil, Flag, FileText, Heart, MessageCircle, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function HowItWorksHero() {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
          <div className="relative w-full rounded-lg aspect-[3/4] overflow-hidden flex items-center justify-center bg-white min-h-[500px]">
            <Image
              src="/fotocomofunciona.png"
              alt="Como funciona"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Bottom Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 pt-16 border-t">
          <div className="bg-white rounded-xl border border-border/50 shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mb-6 bg-cream rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              Escuta de verdade
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Você conta sua história, nós escutamos. Nenhuma recomendação acontece antes de <strong className="text-foreground font-semibold">entender você por completo</strong>. Usamos seus exames, histórico e avaliação detalhada para orientar cada decisão médica.
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-border/50 shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mb-6 bg-cream rounded-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              Acompanhamento real
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Sua equipe médica te acompanha pelo app e responde no WhatsApp sempre que precisar. Ajustamos seu protocolo em tempo real conforme sua evolução, <strong className="text-foreground font-semibold">sem esperar a próxima consulta formal</strong>.
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-border/50 shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mb-6 bg-cream rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              Resultados potencializados
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Da assistente nutricional disponível 24h ao <strong className="text-foreground font-semibold">acompanhamento especializado com medicamentos</strong>, você tem suporte completo e insights personalizados em tempo real para maximizar seus resultados.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

