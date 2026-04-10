import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

/**
 * Browser Supabase client (singleton).
 * Returns `null` if env vars are missing — callers must handle this
 * gracefully and fall back to static data.
 */
export function getBrowserClient(): SupabaseClient | null {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    if (typeof window !== "undefined") {
      console.warn(
        "[kulto3d] Supabase no configurado — usando fallback local.",
      );
    }
    return null;
  }

  _client = createBrowserClient(url, key);
  return _client;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
