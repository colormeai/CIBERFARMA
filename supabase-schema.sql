-- Schema SQL para criar a tabela de questionários no Supabase
-- Execute este SQL no SQL Editor do seu projeto Supabase

-- Criar tabela de questionários
CREATE TABLE IF NOT EXISTS questionarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  idade INTEGER NOT NULL,
  altura DECIMAL(5,2) NOT NULL, -- altura em cm
  peso DECIMAL(5,2) NOT NULL, -- peso em kg
  imc DECIMAL(4,2) NOT NULL,
  categoria_imc VARCHAR(50) NOT NULL,
  objetivo TEXT,
  diabetes BOOLEAN NOT NULL DEFAULT false,
  pressao_alta BOOLEAN NOT NULL DEFAULT false,
  pancreas BOOLEAN NOT NULL DEFAULT false,
  cirurgia BOOLEAN NOT NULL DEFAULT false,
  medicamentos BOOLEAN NOT NULL DEFAULT false,
  medicamentos_detalhes TEXT,
  rins_figado BOOLEAN NOT NULL DEFAULT false,
  atividade_fisica VARCHAR(50),
  sono VARCHAR(50),
  alimentacao VARCHAR(50),
  alcool VARCHAR(50),
  fumo VARCHAR(50),
  medicamento_especifico BOOLEAN NOT NULL DEFAULT false,
  medicamento_nome VARCHAR(255),
  exames TEXT,
  whatsapp VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para buscas por data
CREATE INDEX IF NOT EXISTS idx_questionarios_created_at ON questionarios(created_at DESC);

-- Criar índice para buscas por nome (opcional, para busca de pacientes)
CREATE INDEX IF NOT EXISTS idx_questionarios_nome ON questionarios(nome);

-- Criar índice para buscas por email
CREATE INDEX IF NOT EXISTS idx_questionarios_email ON questionarios(email);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_questionarios_updated_at
  BEFORE UPDATE ON questionarios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS) - opcional
-- ALTER TABLE questionarios ENABLE ROW LEVEL SECURITY;

-- Política de exemplo: permitir inserção para todos (ajuste conforme necessário)
-- CREATE POLICY "Permitir inserção de questionários" ON questionarios
--   FOR INSERT
--   TO authenticated, anon
--   WITH CHECK (true);

-- Política de exemplo: permitir leitura apenas para usuários autenticados
-- CREATE POLICY "Permitir leitura de questionários" ON questionarios
--   FOR SELECT
--   TO authenticated
--   USING (true);

-- Comentários nas colunas para documentação
COMMENT ON TABLE questionarios IS 'Armazena os questionários preenchidos pelos pacientes';
COMMENT ON COLUMN questionarios.imc IS 'Índice de Massa Corporal calculado';
COMMENT ON COLUMN questionarios.categoria_imc IS 'Categoria do IMC: Abaixo do peso, Peso normal, Sobrepeso, Obesidade';

