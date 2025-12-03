'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"

export function HeroVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: '18/7', minHeight: '380px' }}
      aria-label="Demonstração ilustrativa de aplicação de tratamento injetável para emagrecimento"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center center' }}
        onLoadedData={() => setVideoLoaded(true)}
        aria-hidden="true"
      >
        <source src="/aplicadormonj.mp4" type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>

      {/* Fallback Background (se vídeo não carregar) */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-warm-beige to-cream" />
      )}

      {/* Overlay com gradiente para legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/45 to-black/35 md:from-black/60 md:via-black/50 md:to-black/40" />

      {/* Conteúdo sobreposto */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
              Elimine 20% do seu peso e mantenha-o.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/95 mb-6 md:mb-8 max-w-xl leading-relaxed drop-shadow-md">
              Tratamentos com GLP-1 orientados por médicos, com segurança e acompanhamento contínuo.
            </p>
            <Link href="/questionario">
              <Button className="rounded-lg px-6 py-5 md:px-8 md:py-6 text-sm md:text-base bg-white text-foreground hover:bg-white/90 shadow-xl transition-all duration-200">
                Comece a perder peso
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

