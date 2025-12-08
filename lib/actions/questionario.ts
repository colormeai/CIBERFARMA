'use server'

import { createClient } from '@/lib/supabase-server'

export interface QuestionarioData {
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

export async function salvarQuestionario(data: QuestionarioData) {
  try {
    const supabase = await createClient()

    // Calcular IMC
    const alturaNum = parseFloat(data.altura.replace(',', '.'))
    const pesoNum = parseFloat(data.peso.replace(',', '.'))
    const alturaMetros = alturaNum / 100
    const imc = pesoNum / (alturaMetros * alturaMetros)

    // Determinar categoria do IMC
    let categoriaIMC = ''
    if (imc < 18.5) {
      categoriaIMC = 'Abaixo do peso'
    } else if (imc < 25) {
      categoriaIMC = 'Peso normal'
    } else if (imc < 30) {
      categoriaIMC = 'Sobrepeso'
    } else {
      categoriaIMC = 'Obesidade'
    }

    // Inserir dados no Supabase
    const { data: insertedData, error } = await supabase
      .from('questionarios')
      .insert({
        nome: data.nome,
        idade: parseInt(data.idade),
        altura: alturaNum,
        peso: pesoNum,
        imc: parseFloat(imc.toFixed(2)),
        categoria_imc: categoriaIMC,
        objetivo: data.objetivo,
        diabetes: data.diabetes === 'sim',
        pressao_alta: data.pressaoAlta === 'sim',
        pancreas: data.pancreas === 'sim',
        cirurgia: data.cirurgia === 'sim',
        medicamentos: data.medicamentos === 'sim',
        medicamentos_detalhes: data.medicamentosDetalhes || null,
        rins_figado: data.rinsFigado === 'sim',
        atividade_fisica: data.atividadeFisica,
        sono: data.sono,
        alimentacao: data.alimentacao,
        alcool: data.alcool,
        fumo: data.fumo,
        medicamento_especifico: data.medicamentoEspecifico === 'sim',
        medicamento_nome: data.medicamentoNome || null,
        exames: data.exames || null,
        whatsapp: data.whatsapp,
        email: data.email,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Erro ao salvar questionário:', error)
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      data: insertedData,
    }
  } catch (error) {
    console.error('Erro inesperado ao salvar questionário:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }
  }
}

