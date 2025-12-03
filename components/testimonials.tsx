'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ThumbsUp, CheckCircle2, TrendingDown } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Membro",
    role: "Paciente",
    image: "/DEPOIMENTOS/Depoimento 10.jpg",
    weightLoss: "Resultados incríveis",
    quote: "A transformação foi além das minhas expectativas. Me sinto renovado e com muito mais energia para viver."
  },
  {
    name: "Membro",
    role: "Paciente",
    image: "/DEPOIMENTOS/Depoimento 17.jpg",
    weightLoss: "Mudança de vida",
    quote: "Finalmente encontrei um tratamento que realmente funciona. A perda de peso mudou completamente minha vida."
  },
  {
    name: "Membro",
    role: "Paciente",
    image: "/DEPOIMENTOS/Depoimento 19.jpg",
    weightLoss: "Resultados reais",
    quote: "Não acreditei que seria possível, mas os resultados falam por si. Estou muito satisfeito com o tratamento."
  },
  {
    name: "Membro",
    role: "Paciente",
    image: "/DEPOIMENTOS/Depoimento 20.jpg",
    weightLoss: "Transformação completa",
    quote: "O suporte da equipe foi fundamental. Me sinto confiante e feliz com os resultados alcançados."
  },
  {
    name: "Membro",
    role: "Paciente",
    image: "/DEPOIMENTOS/Depoimento 21.jpg",
    weightLoss: "Sucesso garantido",
    quote: "Recomendo para todos que buscam uma solução real e eficaz para perda de peso."
  }
]

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block bg-red-500 px-4 py-2 rounded mb-4">
            <span className="text-sm font-medium text-white">
              Milhares de membros e contando.
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Membros reais, resultados reais de perda de peso.
          </h2>
          
          <p className="text-base text-muted-foreground max-w-3xl">
            Não acredite apenas em nós — nossos membros veem (e sentem) a diferença. Esses membros foram pagos em troca de seus depoimentos.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-start gap-3">
            <ThumbsUp className="w-6 h-6 text-foreground flex-shrink-0 mt-1" />
            <p className="text-base text-foreground">
              <span className="font-semibold">87%</span> obtiveram resultados que mudaram suas vidas*
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-foreground flex-shrink-0 mt-1" />
            <p className="text-base text-foreground">
              <span className="font-semibold">93%</span> concordam que Ro é mais fácil de incorporar em suas vidas*
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <TrendingDown className="w-6 h-6 text-foreground flex-shrink-0 mt-1" />
            <p className="text-base text-foreground">
              <span className="font-semibold">97%</span> relatam ruído reduzido ou silenciado da comida desde que começaram a usar o produto*
            </p>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Before/After Image - Single image showing both */}
                  <div className="relative w-full aspect-[4/3] max-h-64 bg-gray-100 overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={`Depoimento ${index + 1} - Antes e Depois`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  
                  {/* Weight Loss Info */}
                  <div className="px-4 pt-3 pb-2">
                    <div className="bg-foreground text-background text-sm font-medium px-3 py-1.5 rounded-md inline-block">
                      {testimonial.weightLoss}
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <div className="px-4 pb-4">
                    <p className="text-sm text-foreground italic mb-3 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </section>
  )
}



