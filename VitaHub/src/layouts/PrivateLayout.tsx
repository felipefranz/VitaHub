import React, { useState } from "react";
import { Navigate, Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeToggle } from "../components/ThemeToggle";
import {
  HeartPulse,
  LayoutDashboard,
  Activity,
  LogOut,
  Calendar,
  FileText,
  User as UserIcon,
} from "lucide-react";

export function PrivateLayout() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navLinks = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Painel" },
    { to: "/my-health", icon: Activity, label: "Minha Saúde" },
    { to: "/appointments", icon: Calendar, label: "Consultas" },
    { to: "/exams", icon: FileText, label: "Exames" },
    { to: "/profile", icon: UserIcon, label: "Perfil" },
  ];

  return (
    <div className="h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      {/* Header Navigation */}
      <header className="h-16 bg-[var(--surface)] border-b border-[var(--border)] px-4 lg:px-8 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center space-x-4 lg:space-x-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <HeartPulse size={20} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
              Vita<span className="text-primary">Hub</span>
            </span>
          </div>
          
          <nav className="hidden lg:flex space-x-8 text-sm font-medium text-[var(--muted-foreground)] h-full items-center">
            {navLinks.map((link) => (
              <NavLink 
                key={link.to} 
                to={link.to} 
                className={({ isActive }) => `h-full flex items-center border-b-2 ${isActive ? "text-primary border-primary" : "border-transparent hover:text-[var(--foreground)]"}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="hidden lg:block text-right mr-2">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-[var(--muted-foreground)] capitalize">
              {user?.role === "doctor" ? "Médico(a)" : "Paciente"}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[var(--muted)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] overflow-hidden">
             {/* Could be an image later */}
            <UserIcon size={20} />
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden lg:flex-row pb-16 lg:pb-0 relative">
        {/* Sidebar Navigation Desktop only. Mobile uses bottom nav */}
        <aside
          className="hidden lg:flex flex-col items-center py-6 space-y-8 shrink-0 relative lg:static left-0 z-30 w-20 h-auto bg-[var(--surface)] border-r border-[var(--border)] transition-transform duration-200 ease-in-out"
        >
          <nav className="flex flex-col w-full items-center space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `p-3 rounded-xl transition-colors flex items-center gap-3 w-auto ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                  }`
                }
                title={link.label}
              >
                <link.icon size={24} className="shrink-0" />
              </NavLink>
            ))}
          </nav>

          <div className="flex-1"></div>
          
          <div className="w-full flex flex-col items-center pb-4">
             <button
               onClick={logout}
               className="p-3 w-auto rounded-xl text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-red-500 transition-colors flex items-center gap-3"
               title="Sair"
             >
               <LogOut size={24} className="shrink-0" />
             </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto overflow-x-hidden bg-[var(--background)]">
          <div className="w-full max-w-7xl mx-auto pb-4">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[var(--surface)] border-t border-[var(--border)] flex flex-row items-center justify-around px-2 z-30 pb-safe">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive
                  ? "text-primary"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`
            }
          >
            <link.icon size={20} className="shrink-0" />
            <span className="text-[10px] font-medium leading-none">{link.label}</span>
          </NavLink>
        ))}

        <button
          type="button"
          onClick={logout}
          className="flex flex-col items-center justify-center w-full h-full space-y-1 text-[var(--muted-foreground)] hover:text-red-500"
          aria-label="Sair"
          title="Sair"
        >
          <LogOut size={20} className="shrink-0" />
          <span className="text-[10px] font-medium leading-none">Sair</span>
        </button>
      </nav>
    </div>
  );
}
