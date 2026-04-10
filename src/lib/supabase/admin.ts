import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _admin: SupabaseClient | null = null;

/**
 * Admin Supabase client using the service_role key.
 * ⚠️  SERVER-ONLY — NEVER import this from client components.
 * Use only in Route Handlers, Server Actions or admin APIs.
 */
export function getAdminClient(): SupabaseClient | null {
  if (typeof window !== "undefined") {
    throw new Error(
      "[kulto3d] admin Supabase client cannot be used in the browser",
    );
  }
  if (_admin) return _admin;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  _admin = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  return _admin;
}
