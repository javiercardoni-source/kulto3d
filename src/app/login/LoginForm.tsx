"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { getBrowserClient } from "@/lib/supabase/client";

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/admin";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("loading");

    const sb = getBrowserClient();
    if (!sb) {
      setError("Supabase no está configurado.");
      setStatus("error");
      return;
    }

    const origin = window.location.origin;
    const { error: authError } = await sb.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`,
      },
    });

    if (authError) {
      setError(authError.message);
      setStatus("error");
      return;
    }

    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[color:var(--brand)]/30 bg-[color:var(--brand)]/10">
          <CheckCircle2 className="h-6 w-6 text-[color:var(--brand)]" />
        </div>
        <h2 className="text-lg font-semibold text-white">Revisá tu mail</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Te mandamos un link mágico a <strong className="text-white">{email}</strong>.
          Clickealo para ingresar al panel.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setEmail("");
          }}
          className="mt-6 text-xs text-zinc-500 underline transition-colors hover:text-white"
        >
          Usar otro mail
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-zinc-400">Email</span>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            disabled={status === "loading"}
            className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:border-[color:var(--brand)] focus:outline-none disabled:opacity-50"
          />
        </div>
      </label>

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !email}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold text-black transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar link mágico"
        )}
      </button>

      <p className="text-center text-xs text-zinc-500">
        Solo socios con permisos de admin pueden ingresar.
      </p>
    </form>
  );
}
