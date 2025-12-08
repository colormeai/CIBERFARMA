# Configuração do Supabase

Este guia explica como configurar e usar o Supabase no projeto CIBERFARMA.

## 📋 Pré-requisitos

1. Uma conta no [Supabase](https://supabase.com)
2. Um projeto criado no Supabase

## 🔧 Configuração Inicial

### 1. Obter credenciais do Supabase

1. Acesse o [Dashboard do Supabase](https://app.supabase.com)
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie as seguintes informações:
   - **Project URL** (URL do projeto)
   - **anon/public key** (Chave pública)

### 2. Configurar variáveis de ambiente

1. Copie o arquivo `env.example` para `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Abra o arquivo `.env.local` e preencha com suas credenciais:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
   ```

### 3. Reiniciar o servidor de desenvolvimento

Após configurar as variáveis de ambiente, reinicie o servidor:
```bash
npm run dev
```

## 📚 Como Usar

### Client Components (Componentes do Cliente)

Use quando precisar de interatividade no navegador:

```typescript
'use client'

import { createClient } from '@/lib/supabase'

export function MeuComponente() {
  const supabase = createClient()
  
  // Exemplo: buscar dados
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('sua_tabela')
      .select('*')
    
    if (error) {
      console.error('Erro:', error)
    } else {
      console.log('Dados:', data)
    }
  }
  
  return <button onClick={fetchData}>Buscar Dados</button>
}
```

### Server Components (Componentes do Servidor)

Use para buscar dados no servidor (melhor para SEO e performance):

```typescript
import { createClient } from '@/lib/supabase-server'

export default async function MeuComponente() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('sua_tabela')
    .select('*')

  if (error) {
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
```

### Server Actions

Use para operações que modificam dados:

```typescript
'use server'

import { createClient } from '@/lib/supabase-server'

export async function criarRegistro(formData: FormData) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('sua_tabela')
    .insert({
      nome: formData.get('nome') as string,
      email: formData.get('email') as string,
    })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}
```

## 🔐 Autenticação

### Login

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'usuario@example.com',
  password: 'senha123'
})
```

### Cadastro

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'usuario@example.com',
  password: 'senha123'
})
```

### Logout

```typescript
await supabase.auth.signOut()
```

### Verificar usuário autenticado

```typescript
const { data: { user } } = await supabase.auth.getUser()
```

## 📊 Operações Comuns

### Inserir dados

```typescript
const { data, error } = await supabase
  .from('sua_tabela')
  .insert([
    { nome: 'João', email: 'joao@example.com' }
  ])
```

### Atualizar dados

```typescript
const { data, error } = await supabase
  .from('sua_tabela')
  .update({ nome: 'João Silva' })
  .eq('id', 1)
```

### Deletar dados

```typescript
const { error } = await supabase
  .from('sua_tabela')
  .delete()
  .eq('id', 1)
```

### Buscar dados com filtros

```typescript
const { data, error } = await supabase
  .from('sua_tabela')
  .select('*')
  .eq('status', 'ativo')
  .order('created_at', { ascending: false })
  .limit(10)
```

## 🔄 Real-time (Tempo Real)

Para receber atualizações em tempo real:

```typescript
useEffect(() => {
  const channel = supabase
    .channel('mudancas')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'sua_tabela',
      },
      (payload) => {
        console.log('Mudança:', payload)
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [])
```

## 📖 Documentação

Para mais informações, consulte:
- [Documentação do Supabase](https://supabase.com/docs)
- [Guia do Supabase para Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Referência da API JavaScript](https://supabase.com/docs/reference/javascript/introduction)

## ⚠️ Importante

- **NUNCA** exponha a `SUPABASE_SERVICE_ROLE_KEY` no cliente
- Use apenas `NEXT_PUBLIC_SUPABASE_ANON_KEY` em Client Components
- O arquivo `.env.local` está no `.gitignore` e não será commitado
- Sempre valide e sanitize dados antes de inserir no banco

## 🆘 Exemplos Completos

Veja o arquivo `lib/supabase-examples.ts` para exemplos mais detalhados de uso.

