-- Script para adicionar as colunas de contato à tabela questionarios existente
-- Execute este SQL apenas se você já criou a tabela anteriormente sem essas colunas

-- Adicionar colunas de contato se não existirem
DO $$ 
BEGIN
  -- Adicionar coluna whatsapp se não existir
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'questionarios' AND column_name = 'whatsapp'
  ) THEN
    ALTER TABLE questionarios ADD COLUMN whatsapp VARCHAR(20) NOT NULL DEFAULT '';
  END IF;

  -- Adicionar coluna email se não existir
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'questionarios' AND column_name = 'email'
  ) THEN
    ALTER TABLE questionarios ADD COLUMN email VARCHAR(255) NOT NULL DEFAULT '';
  END IF;
END $$;

-- Remover DEFAULT após adicionar (para que sejam obrigatórios em novos registros)
ALTER TABLE questionarios 
  ALTER COLUMN whatsapp DROP DEFAULT,
  ALTER COLUMN email DROP DEFAULT;

-- Criar índice para buscas por email se não existir
CREATE INDEX IF NOT EXISTS idx_questionarios_email ON questionarios(email);

-- Comentários nas colunas
COMMENT ON COLUMN questionarios.whatsapp IS 'Número de WhatsApp do paciente com DDD';
COMMENT ON COLUMN questionarios.email IS 'Email do paciente para envio do plano personalizado';




