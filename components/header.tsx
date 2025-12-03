import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="CIBERFARMA" width={180} height={40} className="h-8 w-auto" priority />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Emagrecimento
          </Link>
          <Link href="/como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Como Funciona
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Preços
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Ciência
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:inline-flex text-sm font-medium">
            Entrar
          </Button>
          <Button className="rounded-full px-6 bg-foreground text-background hover:bg-foreground/90">
            Começar Agora
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
