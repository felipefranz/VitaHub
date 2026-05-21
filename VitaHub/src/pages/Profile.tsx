import React from "react";
import { useAuth } from "../context/AuthContext";
import { User, Phone, MapPin, Mail, Shield, Settings } from "lucide-react";
import { Button } from "../components/ui/Button";

export function Profile() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-[var(--muted-foreground)] mt-1 text-lg">
          Gerencie suas informações pessoais e configurações da conta.
        </p>
      </div>

      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="px-8 py-8 flex flex-col md:flex-row items-center gap-6 border-b border-[var(--border)] bg-[var(--muted)]/30">
          <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md">
            <User size={48} />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-[var(--muted-foreground)] font-medium">Paciente Registrado</p>
          </div>
          <Button variant="outline" className="shrink-0 flex items-center gap-2">
            <Settings size={18} />
            Editar Perfil
          </Button>
        </div>

        {/* Profile Details */}
        <div className="p-8">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <User size={20} className="text-primary" />
            Informações de Contato
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-[var(--muted-foreground)]">E-mail</label>
              <div className="flex items-center gap-3 py-2 border-b border-[var(--border)]">
                <Mail size={18} className="text-[var(--muted-foreground)]" />
                <span className="font-medium text-[var(--foreground)]">{user?.email}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-[var(--muted-foreground)]">Telefone</label>
              <div className="flex items-center gap-3 py-2 border-b border-[var(--border)]">
                <Phone size={18} className="text-[var(--muted-foreground)]" />
                <span className="font-medium text-[var(--foreground)]">(11) 98765-4321</span>
              </div>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-semibold text-[var(--muted-foreground)]">Endereço</label>
              <div className="flex items-center gap-3 py-2 border-b border-[var(--border)]">
                <MapPin size={18} className="text-[var(--muted-foreground)] shrink-0" />
                <span className="font-medium text-[var(--foreground)]">Rua da Saúde, 123, Apto 45 - São Paulo, SP - 01000-000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="p-8 border-t border-[var(--border)] bg-[var(--muted)]/10">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Shield size={20} className="text-primary" />
            Segurança e Privacidade
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)]">
            <div>
              <p className="font-bold">Senha da Conta</p>
              <p className="text-sm text-[var(--muted-foreground)]">Alterada pela última vez há 3 meses.</p>
            </div>
            <Button variant="outline">Alterar Senha</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
