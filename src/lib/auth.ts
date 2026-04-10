import { getServerClient } from "@/lib/supabase/server";
import { getAdminClient } from "@/lib/supabase/admin";

export interface AdminUser {
  id: string;
  email: string;
  fullName: string | null;
  role: "admin" | "customer";
}

/**
 * Returns the current authenticated user with their profile,
 * or null if not authenticated.
 */
export async function getCurrentUser(): Promise<AdminUser | null> {
  const sb = await getServerClient();
  if (!sb) return null;

  const {
    data: { user },
  } = await sb.auth.getUser();

  if (!user) return null;

  // Read profile (RLS allows reading own profile)
  const { data: profile } = await sb
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    // Profile may not exist yet (first sign-in race) — create one via admin
    const admin = getAdminClient();
    if (admin) {
      await admin.from("profiles").insert({
        id: user.id,
        email: user.email ?? "",
        full_name: user.user_metadata?.full_name ?? null,
      });
    }
    return {
      id: user.id,
      email: user.email ?? "",
      fullName: null,
      role: "customer",
    };
  }

  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    role: profile.role as "admin" | "customer",
  };
}

export async function requireAdmin(): Promise<AdminUser | null> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return null;
  return user;
}
