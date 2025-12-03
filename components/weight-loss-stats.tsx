'use client'

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import Image from "next/image"

export function WeightLossStats() {
  const [weight, setWeight] = useState(114) // peso em kg (aproximadamente 252 libras)
  
  // Calculate potential weight loss (15-20% average)
  const averageLoss = 0.175 // 17.5% average
  const potentialLoss = Math.round(weight * averageLoss)

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Left Section - Large 20% */}
          <div className="lg:col-span-1">
            <div className="text-center lg:text-left">
              <div className="text-8xl md:text-9xl font-bold text-foreground mb-4 leading-none">
                20%
              </div>
              <p className="text-lg md:text-xl text-foreground max-w-md">
                Em média, pessoas que usam Monjauro ou Ozempic perdem *15–20% do seu peso em um ano.
              </p>
            </div>
          </div>

          {/* Center Section - Weight Transformation Visual */}
          <div className="lg:col-span-1 relative flex justify-center items-center">
            <div className="relative w-full max-w-2xl">
              <div className="flex items-center justify-center gap-4 md:gap-8">
                {/* Before - Real image */}
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-48 md:w-40 md:h-60 overflow-hidden rounded-2xl shadow-lg border-2 border-border/50">
                    <Image
                      src="/man-before-weight-loss-casual.jpg"
                      alt="Antes da perda de peso"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 128px, 160px"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-3 font-medium">Antes</span>
                </div>

                {/* Arrow/Transition */}
                <div className="flex flex-col items-center justify-center">
                  <svg
                    width="80"
                    height="120"
                    viewBox="0 0 80 120"
                    className="text-caramel"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    {/* Curved arrow */}
                    <path
                      d="M 10 20 Q 40 60 70 100"
                      strokeLinecap="round"
                      fill="none"
                    />
                    {/* Arrowhead */}
                    <path
                      d="M 60 85 L 70 100 L 55 90 Z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="text-3xl md:text-4xl font-bold text-caramel mt-2">20%</div>
                </div>

                {/* After - Real image */}
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-48 md:w-40 md:h-60 overflow-hidden rounded-2xl shadow-lg border-2 border-border/50">
                    <Image
                      src="/man-after-weight-loss-casual-fit.jpg"
                      alt="Depois da perda de peso"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 128px, 160px"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-3 font-medium">Depois</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Calculator */}
          <div className="lg:col-span-1">
            <Card className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Selecione seu peso atual
              </h3>
              
              <div className="mb-6">
                <div className="text-4xl font-bold text-foreground mb-1">
                  {weight}
                </div>
                <div className="text-sm text-muted-foreground">kg</div>
              </div>

              <div className="mb-6">
                <Slider
                  value={[weight]}
                  onValueChange={(value) => setWeight(value[0])}
                  min={45}
                  max={250}
                  step={1}
                  className="[&_[data-slot=slider-range]]:bg-red-600 [&_[data-slot=slider-thumb]]:border-red-600"
                />
              </div>

              <div className="pt-6 border-t">
                <p className="text-sm text-foreground mb-2">
                  Peso que você poderia perder (em kg):
                </p>
                <div className="text-4xl font-bold text-foreground mb-1">
                  {potentialLoss}
                </div>
                <div className="text-sm text-muted-foreground">kg</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Disclaimer and CTA */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 items-end">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              *Em ensaios randomizados de 68 a 72 semanas com adultos obesos ou com sobrepeso (sem diabetes), a tirzepatida resultou em uma perda média de cerca de 20,2% do peso corporal, enquanto a semaglutida levou a reduções médias entre 14,9% e 17,4%. Isso reflete a combinação do medicamento com dieta e exercícios — superior aos 2-3% de perda com apenas dieta e exercício.
            </p>
          </div>
          
          <div className="flex justify-end">
            <Link href="/questionario">
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-8 py-6 text-base">
                Comece agora
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Card({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={`bg-white border rounded-lg p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

