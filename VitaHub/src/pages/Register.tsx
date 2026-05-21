import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Lock, Mail, User } from "lucide-react";

export function Register() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return;
    
    setIsLoading(true);
    try {
      // Usando login mockado para simular registro
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
        <h2 className="text-2xl font-bold tracking-tight">Criar nova conta</h2>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          Preencha seus dados para começar a usar o VitaHub
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="name">
            Nome completo
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" />
            <Input
              id="name"
              type="text"
              placeholder="João da Silva"
              className="pl-9"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              placeholder="joao@exemplo.com.br"
              className="pl-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="password">
            Senha
          </label>
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

        <Button type="submit" className="w-full mt-6 h-12 text-base" disabled={isLoading}>
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--surface)] border-t-transparent" />
          ) : (
            "Cadastrar"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-[var(--muted-foreground)]">Já tem uma conta? </span>
        <Link to="/login" className="text-primary hover:underline font-medium">
          Fazer login
        </Link>
      </div>
    </div>
  );
}
