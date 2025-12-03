"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Como os medicamentos GLP-1 funcionam para emagrecimento?",
    answer:
      "Os medicamentos GLP-1 funcionam imitando um hormônio natural que regula o apetite e o açúcar no sangue. Eles ajudam você a se sentir satisfeito por mais tempo, reduzem os desejos e retardam o esvaziamento gástrico. Isso leva à redução da ingestão calórica e perda de peso sustentável quando combinado com modificações no estilo de vida.",
  },
  {
    question: "Quem é elegível para o tratamento de emagrecimento?",
    answer:
      "Adultos com IMC de 30 ou mais, ou aqueles com IMC de 27+ com condições de saúde relacionadas ao peso, podem ser elegíveis. Nossos médicos licenciados revisarão seu histórico de saúde completo para determinar a melhor abordagem de tratamento para sua situação específica.",
  },
  {
    question: "Quais resultados posso esperar?",
    answer:
      "Estudos clínicos mostram que os pacientes podem perder 15-20% do peso corporal em 12-18 meses. Os resultados individuais variam com base na adesão ao tratamento, fatores de estilo de vida e peso inicial. A maioria dos pacientes começa a ver resultados nas primeiras 4-6 semanas.",
  },
  {
    question: "Os medicamentos são seguros?",
    answer:
      "Todos os medicamentos que prescrevemos são aprovados pela ANVISA e foram extensivamente estudados. Os efeitos colaterais comuns são tipicamente leves e temporários. Seu médico monitorará seu progresso e ajustará o tratamento conforme necessário para garantir segurança e eficácia.",
  },
  {
    question: "Como o medicamento é entregue?",
    answer:
      "Seu medicamento é entregue diretamente na sua porta em embalagem discreta e com temperatura controlada. Fornecemos todos os suprimentos necessários, incluindo canetas de injeção, agulhas e instruções detalhadas. O frete grátis está incluído em todos os planos de tratamento.",
  },
  {
    question: "Qual suporte contínuo é fornecido?",
    answer:
      "Você terá mensagens ilimitadas com sua equipe de cuidados, check-ins regulares com seu médico e acesso aos nossos recursos de nutrição e fitness. Estamos aqui para apoiá-lo durante toda a sua jornada de emagrecimento.",
  },
]

export function FAQ() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Perguntas Frequentes</h2>
          <p className="text-lg text-muted-foreground">
            Tudo o que você precisa saber sobre nosso programa de emagrecimento
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-2xl border border-border/50 px-6 data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
