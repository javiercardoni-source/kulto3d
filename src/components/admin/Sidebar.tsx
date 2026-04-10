"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { getBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingBag },
];

interface SidebarProps {
  email: string;
}

export function Sidebar({ email }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    const sb = getBrowserClient();
    if (sb) {
      await sb.auth.signOut();
    }
    window.location.href = "/login";
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-black px-4 py-6">
      <div className="px-2 text-white">
        <Link href="/admin">
          <Logo />
        </Link>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          Panel admin
        </p>
      </div>

      <nav className="mt-10 flex flex-col gap-1">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-zinc-500 transition-colors hover:text-white"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Ver sitio público
        </Link>
        <div className="rounded-xl bg-white/[0.03] p-3">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500">
            Logueado como
          </p>
          <p className="mt-0.5 truncate text-xs text-white">{email}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400 transition-colors hover:text-red-400"
          >
            <LogOut className="h-3 w-3" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </aside>
  );
}
