import Link from "next/link"

export function SafetyInfo() {
  return (
    <section className="py-12 bg-white border-t">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Informações de segurança:</strong> Os medicamentos GLP-1 podem ter efeitos colaterais graves, incluindo possíveis tumores da tireoide. Não use se você ou sua família tiverem histórico de um tipo de câncer de tireoide chamado CMT ou NEM 2. Veja mais avisos e informações de segurança importantes{' '}
            <Link href="#" className="text-foreground underline hover:no-underline">
              aqui
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}





