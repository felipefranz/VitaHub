import React from "react";

export function HealthData() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meus Registros</h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          Visualize análises detalhadas e registros de saúde.
        </p>
      </div>

      <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-sm p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
        <div className="h-16 w-16 bg-[var(--muted)] rounded-full flex items-center justify-center mb-4 text-[var(--muted-foreground)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-[var(--foreground)]">Espaço para o Painel de Análises</h3>
        <p className="max-w-sm mt-2 text-sm text-[var(--muted-foreground)]">
          Esta seção normalmente conteria gráficos avançados, visualização de dados históricos e registros eletrônicos de saúde abrangentes.
        </p>
      </div>
    </div>
  );
}
