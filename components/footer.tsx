import Link from "next/link"
import Image from "next/image"

const footerLinks = {
  treatments: [
    { name: "Emagrecimento", href: "#" },
    { name: "Medicamentos GLP-1", href: "#" },
    { name: "Controle de Apetite", href: "#" },
    { name: "Saúde Metabólica", href: "#" },
  ],
  company: [
    { name: "Sobre Nós", href: "#" },
    { name: "Como Funciona", href: "#" },
    { name: "Preços", href: "#" },
    { name: "Avaliações", href: "#" },
  ],
  resources: [
    { name: "Blog", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Pesquisa", href: "#" },
    { name: "Calculadora de IMC", href: "#" },
  ],
  legal: [
    { name: "Política de Privacidade", href: "#" },
    { name: "Termos de Serviço", href: "#" },
    { name: "Aviso LGPD", href: "#" },
    { name: "Consentimento de Telemedicina", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="CIBERFARMA"
                width={180}
                height={40}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-sm text-background/60 leading-relaxed max-w-xs">
              Tratamentos de emagrecimento clinicamente comprovados entregues na sua porta.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/80">Tratamentos</h4>
            <ul className="space-y-3">
              {footerLinks.treatments.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/80">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/80">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/80">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">© 2025 CIBERFARMA. Todos os direitos reservados.</p>
          <p className="text-xs text-background/40 max-w-md text-center md:text-right">
            Este site é apenas para fins informativos. Produtos com prescrição requerem uma consulta com um profissional
            licenciado.
          </p>
        </div>
      </div>
    </footer>
  )
}
