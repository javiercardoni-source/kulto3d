import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/brand/Logo";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Ingresar",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <section className="flex min-h-[calc(100vh-200px)] items-center bg-zinc-950 py-16">
      <Container className="max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <div className="mb-8 flex flex-col items-center text-center text-white">
            <Logo />
            <h1 className="mt-6 text-2xl font-bold">Panel de administración</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Te enviamos un link mágico al mail para ingresar.
            </p>
          </div>

          <Suspense fallback={<div className="h-32 animate-pulse rounded-xl bg-white/[0.03]" />}>
            <LoginForm />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
