import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirect=/admin");
  }

  if (user.role !== "admin") {
    redirect("/?error=admin_required");
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar email={user.email} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
