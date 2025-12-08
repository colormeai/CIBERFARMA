import { createBrowserClient } from '@supabase/supabase-js'

// Cliente Supabase para uso em Client Components
// Este cliente é seguro para usar no lado do cliente pois usa apenas a chave pública (anon key)
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please check your .env.local file.'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

