import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Lock, Mail } from "lucide-react";

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    try {
      await login(email);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Bem-vindo de volta</h2>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          Insira suas credenciais para acessar sua conta
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-[var(--muted)]/50 p-3 rounded-lg border border-primary/20 mb-4 text-sm text-[var(--muted-foreground)]">
          <p className="font-semibold text-[var(--foreground)] mb-1">Logins de Teste:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li><strong>Médico:</strong> medico@vitahub.com</li>
            <li><strong>Paciente:</strong> paciente@vitahub.com</li>
          </ul>
          <p className="text-xs mt-2 opacity-80">(Qualquer senha funciona)</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="email">
            Endereço de e-mail
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" />
            <Input
              id="email"
              type="email"
              placeholder="medico@vitahub.com.br"
              className="pl-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium leading-none" htmlFor="password">
              Senha
            </label>
            <a href="#" className="text-sm text-primary hover:underline">
              Esqueceu a senha?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--surface)] border-t-transparent" />
          ) : (
            "Entrar"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-[var(--muted-foreground)]">Não tem uma conta? </span>
        <a href="#" className="text-primary hover:underline font-medium">
          Cadastre-se
        </a>
      </div>
    </div>
  );
}
