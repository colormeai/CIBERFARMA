'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Upload, Check, Loader2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { salvarQuestionario } from "@/lib/actions/questionario"
import { toast } from "sonner"

type Block = "block1" | "block2" | "block3" | "block4" | "block5" | "block6" | "block7" | "completed"

interface FormData {
  // Bloco 1
  nome: string
  idade: string
  altura: string
  peso: string
  // Bloco 2
  objetivo: string
  // Bloco 3
  diabetes: string
  pressaoAlta: string
  pancreas: string
  cirurgia: string
  medicamentos: string
  medicamentosDetalhes: string
  rinsFigado: string
  // Bloco 4
  atividadeFisica: string
  sono: string
  alimentacao: string
  alcool: string
  fumo: string
  // Bloco 5
  medicamentoEspecifico: string
  medicamentoNome: string
  // Bloco 6
  exames: string
  // Bloco 7
  whatsapp: string
  email: string
}

export default function QuestionarioPage() {
  const [currentBlock, setCurrentBlock] = useState<Block>("block1")
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    idade: "",
    altura: "",
    peso: "",
    objetivo: "",
    diabetes: "",
    pressaoAlta: "",
    pancreas: "",
    cirurgia: "",
    medicamentos: "",
    medicamentosDetalhes: "",
    rinsFigado: "",
    atividadeFisica: "",
    sono: "",
    alimentacao: "",
    alcool: "",
    fumo: "",
    medicamentoEspecifico: "",
    medicamentoNome: "",
    exames: "",
    whatsapp: "",
    email: "",
  })

  const [bmi, setBmi] = useState<number | null>(null)
  const [bmiCategory, setBmiCategory] = useState<string>("")
  const [isSaving, setIsSaving] = useState(false)

  // Calcular IMC automaticamente
  useEffect(() => {
    const alturaNum = parseFloat(formData.altura.replace(',', '.'))
    const pesoNum = parseFloat(formData.peso.replace(',', '.'))

    if (alturaNum > 0 && pesoNum > 0) {
      const alturaMetros = alturaNum / 100
      const calculatedBmi = pesoNum / (alturaMetros * alturaMetros)
      setBmi(calculatedBmi)

      if (calculatedBmi < 18.5) {
        setBmiCategory("Abaixo do peso")
      } else if (calculatedBmi < 25) {
        setBmiCategory("Peso normal")
      } else if (calculatedBmi < 30) {
        setBmiCategory("Sobrepeso")
      } else {
        setBmiCategory("Obesidade")
      }
    } else {
      setBmi(null)
      setBmiCategory("")
    }
  }, [formData.altura, formData.peso])

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const canProceed = () => {
    switch (currentBlock) {
      case "block1":
        return formData.nome && formData.idade && formData.altura && formData.peso
      case "block2":
        return formData.objetivo !== ""
      case "block3":
        return (
          formData.diabetes !== "" &&
          formData.pressaoAlta !== "" &&
          formData.pancreas !== "" &&
          formData.cirurgia !== "" &&
          formData.medicamentos !== "" &&
          formData.rinsFigado !== ""
        )
      case "block4":
        return (
          formData.atividadeFisica !== "" &&
          formData.sono !== "" &&
          formData.alimentacao !== "" &&
          formData.alcool !== "" &&
          formData.fumo !== ""
        )
      case "block5":
        return formData.medicamentoEspecifico !== ""
      case "block6":
        return true // Opcional
      case "block7":
        // Validar telefone (deve ter pelo menos 10 dígitos: (11) 98765-4321 = 11 dígitos)
        const phoneDigits = formData.whatsapp.replace(/\D/g, '')
        const isValidPhone = phoneDigits.length >= 10 && phoneDigits.length <= 11
        // Validar email básico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isValidEmail = emailRegex.test(formData.email)
        return isValidPhone && isValidEmail
      default:
        return false
    }
  }

  const goToNext = async () => {
    const blockOrder: Block[] = ["block1", "block2", "block3", "block4", "block5", "block6", "block7", "completed"]
    const currentIndex = blockOrder.indexOf(currentBlock)
    
    // Se estiver no último bloco (block7), salvar os dados antes de finalizar
    if (currentBlock === "block7") {
      setIsSaving(true)
      try {
        const result = await salvarQuestionario(formData)
        
        if (result.success) {
          toast.success('Questionário salvo com sucesso!')
          setCurrentBlock("completed")
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          toast.error(`Erro ao salvar: ${result.error}`)
          console.error('Erro ao salvar questionário:', result.error)
        }
      } catch (error) {
        toast.error('Erro inesperado ao salvar o questionário')
        console.error('Erro inesperado:', error)
      } finally {
        setIsSaving(false)
      }
    } else if (currentIndex < blockOrder.length - 1) {
      setCurrentBlock(blockOrder[currentIndex + 1])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToPrevious = () => {
    const blockOrder: Block[] = ["block1", "block2", "block3", "block4", "block5", "block6", "block7", "completed"]
    const currentIndex = blockOrder.indexOf(currentBlock)
    if (currentIndex > 0) {
      setCurrentBlock(blockOrder[currentIndex - 1])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const getBMIColor = () => {
    if (!bmi) return "bg-gray-200"
    if (bmi < 18.5) return "bg-blue-400"
    if (bmi < 25) return "bg-green-400"
    if (bmi < 30) return "bg-yellow-400"
    return "bg-red-400"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="p-6 border-b bg-white">
        <div className="flex justify-center">
        <Link href="/">
          <Image src="/logo.png" alt="CIBERFARMA" width={180} height={40} className="h-8 w-auto" />
        </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto w-full px-6 py-12">
        {/* Bloco 1 - Dados Básicos */}
        {currentBlock === "block1" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BlockContainer>
              <BlockTitle>Dados Básicos</BlockTitle>
            <div className="space-y-6">
                <div>
                  <Label htmlFor="nome" className="text-foreground font-medium mb-2 block">
                    Nome completo
                  </Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => updateFormData("nome", e.target.value)}
                    placeholder="Digite seu nome completo"
                    className="bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="idade" className="text-foreground font-medium mb-2 block">
                    Idade
                  </Label>
                  <Input
                    id="idade"
                    type="number"
                    value={formData.idade}
                    onChange={(e) => updateFormData("idade", e.target.value)}
                    placeholder="Digite sua idade"
                    className="bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="altura" className="text-foreground font-medium mb-2 block">
                      Altura (cm)
                    </Label>
                    <Input
                      id="altura"
                      type="number"
                      value={formData.altura}
                      onChange={(e) => updateFormData("altura", e.target.value)}
                      placeholder="Ex: 175"
                      className="bg-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="peso" className="text-foreground font-medium mb-2 block">
                      Peso (kg)
                    </Label>
                    <Input
                      id="peso"
                      type="number"
                      value={formData.peso}
                      onChange={(e) => updateFormData("peso", e.target.value)}
                      placeholder="Ex: 80"
                      className="bg-white"
                    />
                  </div>
                </div>

                {/* Gráfico de IMC */}
                {bmi && (
                  <div className="mt-6 p-6 bg-white rounded-lg border border-warm-gray/30 shadow-sm">
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">IMC calculado automaticamente</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-4xl font-bold text-foreground">
                          {bmi.toFixed(1)}
                        </p>
                        <p className="text-lg text-muted-foreground">kg/m²</p>
                      </div>
                      <p className="text-base font-semibold text-foreground mt-2">{bmiCategory}</p>
                    </div>

                    {/* Barra de IMC visual */}
                    <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      {/* Zonas de IMC */}
                      <div className="absolute inset-0 flex">
                        <div className="flex-1 bg-blue-200" style={{ width: '15%' }} />
                        <div className="flex-1 bg-green-200" style={{ width: '20%' }} />
                        <div className="flex-1 bg-yellow-200" style={{ width: '15%' }} />
                        <div className="flex-1 bg-red-200" style={{ width: '50%' }} />
                      </div>
                      
                      {/* Indicador de posição */}
                      <div
                        className="absolute top-0 h-full w-1 bg-foreground transition-all duration-500 z-10"
                        style={{
                          left: `${Math.min((bmi / 40) * 100, 100)}%`,
                          transform: 'translateX(-50%)',
                        }}
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-foreground" />
                      </div>
                    </div>

                    {/* Escala e labels */}
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>18.5</span>
                        <span>25</span>
                        <span>30</span>
                        <span>40+</span>
                      </div>
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-blue-600">Abaixo</span>
                        <span className="text-green-600">Normal</span>
                        <span className="text-yellow-600">Sobrepeso</span>
                        <span className="text-red-600">Obesidade</span>
                      </div>
                    </div>
                  </div>
                )}
            </div>
            </BlockContainer>
          </div>
        )}

        {/* Bloco 2 - Objetivo de Perda de Peso */}
        {currentBlock === "block2" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BlockContainer>
              <BlockTitle>Qual é o seu objetivo de perda de peso?</BlockTitle>
              <RadioGroup
                value={formData.objetivo}
                onValueChange={(value) => updateFormData("objetivo", value)}
                className="space-y-3"
              >
                <RadioOption value="1-7" label="Perder de 1 a 7 kg" />
                <RadioOption value="8-20" label="Perder de 8 a 20 kg" />
                <RadioOption value="20+" label="Perder mais de 20 kg" />
                <RadioOption value="nao-sei" label="Não sei ao certo, só preciso emagrecer." />
              </RadioGroup>
            </BlockContainer>
          </div>
        )}

        {/* Bloco 3 - Sua saúde hoje */}
        {currentBlock === "block3" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BlockContainer>
              <BlockTitle>Sua saúde hoje</BlockTitle>
              <div className="space-y-6">
                <QuestionRow
                  question="Tem diabetes?"
                  value={formData.diabetes}
                  onChange={(value) => updateFormData("diabetes", value)}
                />
                <QuestionRow
                  question="Tem pressão alta?"
                  value={formData.pressaoAlta}
                  onChange={(value) => updateFormData("pressaoAlta", value)}
                />
                <QuestionRow
                  question="Já teve problemas no pâncreas?"
                  value={formData.pancreas}
                  onChange={(value) => updateFormData("pancreas", value)}
                />
                <QuestionRow
                  question="Já fez alguma cirurgia importante?"
                  value={formData.cirurgia}
                  onChange={(value) => updateFormData("cirurgia", value)}
                />
                <div>
                  <QuestionRow
                    question="Faz uso de algum medicamento contínuo?"
                    value={formData.medicamentos}
                    onChange={(value) => updateFormData("medicamentos", value)}
                  />
                  {formData.medicamentos === "sim" && (
                    <div className="mt-4">
                      <Label htmlFor="medicamentosDetalhes" className="text-sm text-foreground mb-2 block">
                        Quais medicamentos? (opcional)
                      </Label>
                      <Textarea
                        id="medicamentosDetalhes"
                        value={formData.medicamentosDetalhes}
                        onChange={(e) => updateFormData("medicamentosDetalhes", e.target.value)}
                        placeholder="Digite os medicamentos que você usa"
                        className="bg-white min-h-20"
                      />
                    </div>
                  )}
                </div>
                <QuestionRow
                  question="Já teve problemas nos rins ou no fígado?"
                  value={formData.rinsFigado}
                  onChange={(value) => updateFormData("rinsFigado", value)}
                />
              </div>
            </BlockContainer>
          </div>
        )}

        {/* Bloco 4 - Estilo de vida */}
        {currentBlock === "block4" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BlockContainer>
              <BlockTitle>Estilo de vida</BlockTitle>
              <p className="text-sm text-muted-foreground mb-6">Vamos conhecer seus hábitos do dia a dia:</p>
              <div className="space-y-6">
                <div>
                  <Label className="text-foreground font-medium mb-3 block">
                    Você pratica alguma atividade física?
                  </Label>
                  <RadioGroup
                    value={formData.atividadeFisica}
                    onValueChange={(value) => updateFormData("atividadeFisica", value)}
                    className="space-y-3"
                  >
                    <RadioOption value="regularmente" label="Sim, regularmente" />
                    <RadioOption value="as-vezes" label="Às vezes" />
                    <RadioOption value="nao" label="Não pratico" />
                  </RadioGroup>
                </div>

                <QuestionRow
                  question="Seu sono costuma ser bom?"
                  value={formData.sono}
                  onChange={(value) => updateFormData("sono", value)}
                />

                <QuestionRow
                  question="Você costuma se alimentar bem?"
                  value={formData.alimentacao}
                  onChange={(value) => updateFormData("alimentacao", value)}
                />

                <QuestionRow
                  question="Você bebe álcool com frequência?"
                  value={formData.alcool}
                  onChange={(value) => updateFormData("alcool", value)}
                />

                <QuestionRow
                  question="Você fuma?"
                  value={formData.fumo}
                  onChange={(value) => updateFormData("fumo", value)}
                />
            </div>
            </BlockContainer>
          </div>
        )}

        {/* Bloco 5 - Medicamento específico */}
        {currentBlock === "block5" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BlockContainer>
              <BlockTitle>Você tem algum medicamento específico para emagrecer em mente?</BlockTitle>
              <RadioGroup
                value={formData.medicamentoEspecifico}
                onValueChange={(value) => updateFormData("medicamentoEspecifico", value)}
                className="space-y-3"
              >
                <RadioOption
                  value="nao"
                  label="Ainda não, estou procurando uma recomendação."
                />
                <RadioOption
                  value="sim"
                  label="Sim, já tenho algo em mente. MONJAURO, OZENPIC, TIRZEPATIDA..."
                />
              </RadioGroup>

              {formData.medicamentoEspecifico === "sim" && (
                <div className="mt-6">
                  <Label htmlFor="medicamentoNome" className="text-foreground font-medium mb-2 block">
                    Qual medicamento você tem em mente?
                  </Label>
                  <Input
                    id="medicamentoNome"
                    value={formData.medicamentoNome}
                    onChange={(e) => updateFormData("medicamentoNome", e.target.value)}
                    placeholder="Digite o nome do medicamento"
                    className="bg-white"
                  />
                  </div>
              )}
            </BlockContainer>
          </div>
        )}

        {/* Bloco 6 - Exames */}
        {currentBlock === "block6" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BlockContainer>
              <BlockTitle>Exames médicos (opcional)</BlockTitle>
              <p className="text-sm text-muted-foreground mb-6">Se você tiver exames recentes, pode compartilhar conosco:</p>
              <div className="space-y-4">
                <Label className="text-foreground font-medium mb-3 block">
                  Você tem algum exame recente guardado?
                </Label>
                <RadioGroup
                  value={formData.exames}
                  onValueChange={(value) => updateFormData("exames", value)}
                  className="space-y-3"
                >
                  <RadioOption value="sim" label="Sim (upload)" />
                  <RadioOption value="nao" label="Não tenho" />
                </RadioGroup>

                {formData.exames === "sim" && (
                  <div className="mt-6">
                    <Label className="text-foreground font-medium mb-2 block">
                      Faça upload dos seus exames
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Arraste arquivos aqui ou clique para selecionar
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, JPG ou PNG (máx. 10MB)
                      </p>
                    </div>
                  </div>
                )}
                </div>
            </BlockContainer>
          </div>
        )}

        {/* Bloco 7 - Contato */}
        {currentBlock === "block7" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BlockContainer>
              <BlockTitle>Qual o seu contato?</BlockTitle>
              
              <div className="space-y-6 mt-6">
                {/* WhatsApp */}
                <div>
                  <Label htmlFor="whatsapp" className="text-foreground font-medium mb-3 block">
                    Número de WhatsApp (com DDD)
                  </Label>
                  <div className="flex gap-3">
                    <div className="w-24">
                      <Input
                        id="whatsapp-country"
                        value="BR +55"
                        disabled
                        className="bg-gray-50 text-muted-foreground cursor-not-allowed"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        id="whatsapp"
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => {
                          // Formatar telefone: (11) 98765-4321
                          let value = e.target.value.replace(/\D/g, '')
                          if (value.length <= 11) {
                            if (value.length <= 2) {
                              value = value
                            } else if (value.length <= 6) {
                              value = `(${value.slice(0, 2)}) ${value.slice(2)}`
                            } else if (value.length <= 10) {
                              value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`
                            } else {
                              value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`
                            }
                            updateFormData("whatsapp", value)
                          }
                        }}
                        placeholder="(11) 98765-4321"
                        className="bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-foreground font-medium mb-3 block">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="bg-white"
                  />
                </div>

                {/* Mensagem de privacidade */}
                <div className="flex items-center gap-2 pt-4 border-t border-warm-gray/30">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <p className="text-sm text-muted-foreground">
                    Suas informações são confidenciais e seguras
                  </p>
                </div>
              </div>
            </BlockContainer>
          </div>
        )}

        {/* Completed */}
        {currentBlock === "completed" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BlockContainer>
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
            </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Questionário Concluído!</h2>
                <p className="text-muted-foreground mb-8">
                  Obrigado pelas respostas. Nossos especialistas irão analisar suas informações e preparar as melhores opções de tratamento para você.
            </p>
            <Link href="/">
                  <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-8 py-6">
                Voltar para a página inicial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
              </div>
            </BlockContainer>
          </div>
        )}

      </main>

      {/* Footer Navigation */}
      {currentBlock !== "completed" && (
        <footer className="p-6 bg-white border-t border-warm-gray/30 sticky bottom-0">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            {currentBlock !== "block1" ? (
              <Button variant="ghost" onClick={goToPrevious} className="rounded-lg">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar
            </Button>
          ) : (
            <div />
          )}
          <Button
            onClick={goToNext}
            disabled={!canProceed() || isSaving}
              className="rounded-lg px-6 py-5 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
          >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Salvando...
                </>
              ) : currentBlock === "block7" ? (
                <>
                  Finalizar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              ) : (
                <>
                  Próximo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
          </Button>
          </div>
        </footer>
      )}
    </div>
  )
}

// Componentes auxiliares
function BlockContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-cream rounded-2xl p-8 border border-warm-gray/30 ${className} shadow-sm transition-all duration-300 hover:shadow-md`}>
      {children}
    </div>
  )
}

function BlockTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-foreground mb-6">{children}</h2>
  )
}

function RadioOption({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-warm-gray/40 hover:border-foreground/30 hover:bg-warm-beige transition-all duration-200 cursor-pointer">
      <RadioGroupItem value={value} id={value} />
      <Label htmlFor={value} className="flex-1 cursor-pointer text-foreground font-normal">
        {label}
      </Label>
    </div>
  )
}

function QuestionRow({
  question,
  value,
  onChange,
}: {
  question: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <Label className="text-foreground font-medium mb-3 block">{question}</Label>
      <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
        <RadioOption value="sim" label="Sim" />
        <RadioOption value="nao" label="Não" />
      </RadioGroup>
    </div>
  )
}
