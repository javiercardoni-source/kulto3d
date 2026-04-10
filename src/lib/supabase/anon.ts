import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _anon: SupabaseClient | null = null;

/**
 * Basic Supabase client using the anon key.
 * Works anywhere (server, client, build-time) because it doesn't touch cookies.
 * Use this for public reads (products, categories).
 * For authenticated queries use `getServerClient` / `getBrowserClient`.
 */
export function getAnonClient(): SupabaseClient | null {
  if (_anon) return _anon;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  _anon = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  return _anon;
}
