import { NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const redirect = url.searchParams.get("redirect") ?? "/admin";

  if (code) {
    const sb = await getServerClient();
    if (sb) {
      const { error } = await sb.auth.exchangeCodeForSession(code);
      if (error) {
        console.error("[auth/callback] exchange error", error);
        return NextResponse.redirect(
          new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url),
        );
      }
    }
  }

  return NextResponse.redirect(new URL(redirect, request.url));
}
