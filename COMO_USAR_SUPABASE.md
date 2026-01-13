# 🚀 Como Usar o Supabase - Guia Rápido

## ✅ Configuração Completa

Suas credenciais já estão configuradas no arquivo `.env.local`:
- ✅ URL: `https://nyjmunoobisyuxryrqrn.supabase.co`
- ✅ API Key: Configurada

## 📋 Próximos Passos

### 1. Criar a Tabela no Supabase

1. Acesse o [Dashboard do Supabase](https://app.supabase.com)
2. Selecione seu projeto
3. Vá em **SQL Editor** (no menu lateral)
4. Clique em **New Query**
5. Copie e cole o conteúdo do arquivo `supabase-schema.sql`
6. Clique em **Run** (ou pressione `Ctrl/Cmd + Enter`)

Isso criará a tabela `questionarios` com todas as colunas necessárias.

### 2. Testar a Conexão

Reinicie o servidor de desenvolvimento:
```bash
npm run dev
```

Agora, quando alguém preencher o questionário e clicar em "Finalizar", os dados serão salvos automaticamente no Supabase!

## 🔍 Verificar os Dados Salvos

1. No Dashboard do Supabase, vá em **Table Editor**
2. Selecione a tabela `questionarios`
3. Você verá todos os questionários salvos

## 📊 Estrutura dos Dados

Cada questionário salvo contém:
- **Informações pessoais**: nome, idade, altura, peso, IMC
- **Objetivo**: objetivo do tratamento
- **Histórico médico**: diabetes, pressão alta, problemas no pâncreas, etc.
- **Estilo de vida**: atividade física, sono, alimentação, álcool, fumo
- **Medicamentos**: se usa algum medicamento específico
- **Exames**: informações sobre exames realizados
- **Timestamps**: data de criação e atualização

## 🛠️ Personalizações

### Alterar Políticas de Segurança (RLS)

Por padrão, a tabela permite inserção de qualquer pessoa. Para restringir:

1. Vá em **Authentication** → **Policies** no Supabase
2. Ou use o SQL Editor para criar políticas específicas

Exemplo de política restritiva:
```sql
-- Permitir apenas inserção para usuários autenticados
ALTER TABLE questionarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Apenas usuários autenticados podem inserir" 
ON questionarios
FOR INSERT
TO authenticated
WITH CHECK (true);
```

### Adicionar Mais Campos

Se precisar adicionar mais campos ao questionário:

1. Adicione a coluna no Supabase (via SQL Editor ou Table Editor)
2. Atualize a interface `FormData` em `app/questionario/page.tsx`
3. Atualize a função `salvarQuestionario` em `lib/actions/questionario.ts`

## 📝 Exemplos de Uso

### Buscar Todos os Questionários

```typescript
import { createClient } from '@/lib/supabase-server'

const supabase = await createClient()
const { data, error } = await supabase
  .from('questionarios')
  .select('*')
  .order('created_at', { ascending: false })
```

### Buscar Questionários por IMC

```typescript
const { data } = await supabase
  .from('questionarios')
  .select('*')
  .gte('imc', 30) // IMC >= 30 (obesidade)
```

### Contar Questionários por Dia

```typescript
const { data } = await supabase
  .from('questionarios')
  .select('created_at')
  .gte('created_at', new Date().toISOString().split('T')[0])
```

## 🔐 Segurança

- ✅ As credenciais estão no `.env.local` (não commitado)
- ✅ Usando chave pública (anon key) - segura para o cliente
- ⚠️ Considere habilitar RLS se precisar de mais segurança
- ⚠️ Nunca exponha a `SUPABASE_SERVICE_ROLE_KEY` no cliente

## 🆘 Problemas Comuns

### Erro: "relation 'questionarios' does not exist"
- **Solução**: Execute o SQL do arquivo `supabase-schema.sql` no SQL Editor

### Erro: "new row violates row-level security policy"
- **Solução**: Desabilite RLS temporariamente ou crie uma política que permita inserção

### Dados não estão sendo salvos
- Verifique se o servidor foi reiniciado após configurar `.env.local`
- Verifique o console do navegador para erros
- Verifique os logs do Supabase em **Logs** → **Postgres Logs**

## 📚 Recursos Adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [Guia de RLS (Row Level Security)](https://supabase.com/docs/guides/auth/row-level-security)
- [Referência da API JavaScript](https://supabase.com/docs/reference/javascript/introduction)




