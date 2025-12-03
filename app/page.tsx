import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HeroVideoSection } from "@/components/hero-video-section"
import { GLPOptions } from "@/components/glp-options"
import { HowItWorks } from "@/components/how-it-works"
import { PricingPlans } from "@/components/pricing-plans"
import { Benefits } from "@/components/benefits"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <GLPOptions />
      <HeroVideoSection />
      <HowItWorks />
      <PricingPlans />
      <Benefits />
      <FAQ />
      <Footer />
    </main>
  )
}
