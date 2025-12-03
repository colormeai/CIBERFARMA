import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HowItWorksHero } from "@/components/how-it-works-hero"
import { GLPOptions } from "@/components/glp-options"
import { WeightLossStats } from "@/components/weight-loss-stats"
import { Testimonials } from "@/components/testimonials"
import { SafetyInfo } from "@/components/safety-info"

export default function ComoFuncionaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HowItWorksHero />
      <GLPOptions />
      <WeightLossStats />
      <Testimonials />
      <SafetyInfo />
      <Footer />
    </main>
  )
}



