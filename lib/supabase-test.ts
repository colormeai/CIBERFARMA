/**
 * Arquivo de teste para verificar se o Supabase está configurado corretamente
 * Você pode deletar este arquivo após testar
 */

// Teste para Client Components
export async function testSupabaseClient() {
  const { createClient } = await import('./supabase')
  const supabase = createClient()
  
  try {
    // Teste simples: verificar conexão
    const { data, error } = await supabase.from('_test').select('count').limit(1)
    
    if (error && error.code !== 'PGRST116') {
      // PGRST116 significa que a tabela não existe, mas a conexão funcionou
      console.error('Erro na conexão:', error)
      return false
    }
    
    console.log('✅ Supabase Client configurado corretamente!')
    return true
  } catch (error) {
    console.error('❌ Erro ao conectar com Supabase:', error)
    return false
  }
}

// Teste para Server Components
export async function testSupabaseServer() {
  const { createClient } = await import('./supabase-server')
  const supabase = await createClient()
  
  try {
    const { data, error } = await supabase.from('_test').select('count').limit(1)
    
    if (error && error.code !== 'PGRST116') {
      console.error('Erro na conexão:', error)
      return false
    }
    
    console.log('✅ Supabase Server configurado corretamente!')
    return true
  } catch (error) {
    console.error('❌ Erro ao conectar com Supabase:', error)
    return false
  }
}

