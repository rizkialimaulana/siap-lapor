import { ReactNode } from "react";
import {
  Fish,
  LayoutDashboard,
  ClipboardEdit,
  CheckSquare,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";

interface LayoutProps {
  children: ReactNode;
  currentView: "dashboard" | "input" | "validation" | "users";
  onNavigate: (view: "dashboard" | "input" | "validation" | "users") => void;
}

export function Layout({ children, currentView, onNavigate }: LayoutProps) {
  const navItems = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "input" as const, label: "Input Data Lapangan", icon: ClipboardEdit },
    {
      id: "validation" as const,
      label: "Validasi & Verifikasi",
      icon: CheckSquare,
    },
    { id: "users" as const, label: "Manajemen Pengguna", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-700 to-teal-600 text-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg">
                <Fish className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-xl">SIAP LAPOR</h1>
                <p className="text-sm text-cyan-100">
                  Sistem Informasi dan Aplikasi Pelaporan Perikanan
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm">Dinas Kelautan dan Perikanan</p>
              <p className="text-sm text-cyan-100">Kabupaten Kebumen</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => onNavigate(item.id)}
                  className={isActive ? "bg-cyan-600 hover:bg-cyan-700" : ""}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-sm text-slate-600">
            © 2025 Dinas Kelautan dan Perikanan Kabupaten Kebumen. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
