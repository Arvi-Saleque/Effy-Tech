import { getCurrentProfile } from "@/lib/admin/auth";
import { redirect } from "next/navigation";
import { 
  LayoutDashboard, 
  UsersRound, 
  FolderKanban,
  CheckSquare, 
  BarChart3 
} from "lucide-react";
import NavLink from "./NavLink";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }) {
  const profile = await getCurrentProfile();
  
  if (!profile) {
    redirect("/admin/login");
  }

  const isAdmin = profile.role === "admin";

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Clients", href: "/admin/clients", icon: UsersRound },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "My Work", href: "/admin/my-work", icon: CheckSquare },
    { name: "Reports", href: "/admin/reports", icon: BarChart3 },
  ];

  return (
    <div className="admin-shell min-h-screen bg-[#020617] text-neutral-100 flex flex-col font-sans">
      {/* Background Mesh/Blur Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/3 blur-[200px]" />
        <div className="absolute bottom-0 right-1/3 h-[500px] w-[500px] rounded-full bg-primary/3 blur-[180px]" />
      </div>

      {/* Header */}
      <header className="border-b border-neutral-800/80 bg-neutral-900/40 backdrop-blur-xl sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <span className="text-emerald-400 font-bold text-lg">E</span>
            </div>
            <div>
              <span className="font-bold text-neutral-100 text-lg tracking-tight block leading-none">
                EffyOps
              </span>
              <span className="text-[10px] text-neutral-400 font-medium tracking-wider uppercase">
                Effy Tech Team Panel
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navigation.map((item) => (
              isAdmin || item.name !== "Dashboard" && item.name !== "Clients" && item.name !== "Projects" && item.name !== "Reports" ? (
                <NavLink key={item.name} href={item.href}>
                  {item.name}
                </NavLink>
              ) : null
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-semibold text-neutral-200">{profile.name}</span>
              <span className="text-[10px] text-neutral-400 capitalize">{profile.role}</span>
            </div>
            
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Mobile Navigation bar */}
      <div className="md:hidden border-b border-neutral-800/60 bg-neutral-900/20 py-2 px-4 flex justify-center gap-3 relative z-40">
        {navigation.map((item) => (
          isAdmin || item.name !== "Dashboard" && item.name !== "Clients" && item.name !== "Projects" && item.name !== "Reports" ? (
            <NavLink key={item.name} href={item.href}>
              {item.name}
            </NavLink>
          ) : null
        ))}
      </div>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900/60 py-6 bg-neutral-950/40 text-center text-xs text-neutral-500 relative z-10">
        &copy; {new Date().getFullYear()} Effy Tech. All rights reserved.
      </footer>
    </div>
  );
}
