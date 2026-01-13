/**
 * Exemplos de uso do Supabase no projeto
 * 
 * Este arquivo contém exemplos de como usar o Supabase em diferentes contextos.
 * Você pode deletar este arquivo após entender como usar.
 */

// ============================================
// EXEMPLO 1: Uso em Client Components
// ============================================
/*
'use client'

import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export function ExampleClientComponent() {
  const [data, setData] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('sua_tabela')
        .select('*')
      
      if (error) {
        console.error('Erro ao buscar dados:', error)
      } else {
        setData(data || [])
      }
    }

    fetchData()
  }, [])

  return <div>{/* Renderizar dados */}</div>
}
*/

// ============================================
// EXEMPLO 2: Uso em Server Components
// ============================================
/*
import { createClient } from '@/lib/supabase-server'

export default async function ExampleServerComponent() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('sua_tabela')
    .select('*')

  if (error) {
    console.error('Erro ao buscar dados:', error)
    return <div>Erro ao carregar dados</div>
  }

  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>{item.nome}</div>
      ))}
    </div>
  )
}
*/

// ============================================
// EXEMPLO 3: Uso em Server Actions
// ============================================
/*
'use server'

import { createClient } from '@/lib/supabase-server'

export async function createRecord(formData: FormData) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('sua_tabela')
    .insert({
      nome: formData.get('nome') as string,
      email: formData.get('email') as string,
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}
*/

// ============================================
// EXEMPLO 4: Autenticação de usuário
// ============================================
/*
// Em um Client Component:
'use client'

import { createClient } from '@/lib/supabase'

export function LoginForm() {
  const supabase = createClient()

  async function handleLogin(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Erro no login:', error)
      return
    }

    // Usuário autenticado com sucesso
    console.log('Usuário logado:', data.user)
  }

  async function handleSignUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.error('Erro no cadastro:', error)
      return
    }

    console.log('Usuário cadastrado:', data.user)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  return (
    // Seu formulário de login aqui
  )
}
*/

// ============================================
// EXEMPLO 5: Real-time subscriptions
// ============================================
/*
'use client'

import { createClient } from '@/lib/supabase'
import { useEffect } from 'react'

export function RealtimeComponent() {
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel('sua_tabela_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // 'INSERT', 'UPDATE', 'DELETE'
          schema: 'public',
          table: 'sua_tabela',
        },
        (payload) => {
          console.log('Mudança detectada:', payload)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return <div>Componente com real-time</div>
}
*/




