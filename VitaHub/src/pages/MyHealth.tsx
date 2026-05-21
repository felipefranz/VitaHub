import React from "react";
import { Activity, Pill, Stethoscope, FileText, QrCode, Upload, HeartPulse } from "lucide-react";
import { Button } from "../components/ui/Button";
import { mockHealthTimeline } from "../services/mockData";
import { useAuth } from "../context/AuthContext";

export function MyHealth() {
  const { user } = useAuth();
  
  const getEventStyles = (type: string) => {
    switch (type) {
      case "consulta":
        return { icon: Stethoscope, color: "bg-blue-500/10 text-blue-600 border-blue-500/20" };
      case "exame":
        return { icon: FileText, color: "bg-purple-500/10 text-purple-600 border-purple-500/20" };
      case "diagnostico":
        return { icon: Activity, color: "bg-green-500/10 text-green-600 border-green-500/20" };
      default:
        return { icon: HeartPulse, color: "bg-gray-500/10 text-gray-600 border-gray-500/20" };
    }
  };

  const getEventName = (type: string) => {
    switch (type) {
      case "consulta": return "Consulta";
      case "exame": return "Exame";
      case "diagnostico": return "Diagnóstico";
      default: return "Registro";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minha Saúde</h1>
          <p className="text-[var(--muted-foreground)] mt-1 text-lg">
            Acompanhe seu histórico de saúde e compartilhe seu Health ID.
          </p>
        </div>
        <Button className="h-12 px-6 shadow-sm flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto">
          <Upload size={18} />
          Enviar Exame
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Health ID Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-sm text-center flex flex-col items-center">
            <h2 className="font-bold text-lg mb-6">Cartão Health ID</h2>
            <div className="w-48 h-48 bg-white border border-[var(--border)] rounded-2xl flex items-center justify-center p-4 shadow-sm mb-6">
              <QrCode size={160} strokeWidth={1.5} className="text-[var(--foreground)]" />
            </div>
            <h3 className="font-bold text-xl">{user?.name || "Paciente"}</h3>
            <p className="text-[var(--muted-foreground)] mt-1 font-medium">ID: VITA-8472-9104</p>
            <p className="text-sm font-semibold mt-4 bg-[var(--muted)] px-4 py-2 rounded-lg text-[var(--foreground)] border border-[var(--border)]">
              Tipo Sanguíneo: O+
            </p>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Activity className="text-primary" size={24} />
            Linha do Tempo
          </h2>
          
          <div className="bg-[var(--surface)] p-6 sm:p-8 rounded-2xl border border-[var(--border)] shadow-sm">
            <div className="relative border-l-2 border-[var(--border)] ml-4 sm:ml-6 space-y-10 pb-4 pt-4">
              {mockHealthTimeline.map((ev) => {
                const { icon: Icon, color } = getEventStyles(ev.type);
                return (
                  <div key={ev.id} className="relative pl-8 sm:pl-10 text-left">
                    <span className={`absolute -left-6 sm:-left-7 p-2.5 rounded-xl border flex items-center justify-center shadow-sm ${color} ring-4 ring-[var(--surface)] bg-[var(--surface)]`}>
                      <Icon size={20} />
                    </span>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1 sm:gap-2">
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border bg-opacity-30 ${color}`}>
                          {getEventName(ev.type)}
                        </span>
                        <time className="text-xs sm:text-sm font-bold text-[var(--muted-foreground)]">
                          {ev.date}
                        </time>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--muted)]/50 rounded-2xl p-4 sm:p-5 mt-3 border border-[var(--border)]">
                      <h3 className="text-lg font-bold text-[var(--foreground)] leading-tight">{ev.title}</h3>
                      <p className="text-sm font-medium text-primary mt-1 mb-3">{ev.doctor}</p>
                      <p className="text-[var(--foreground)] text-sm sm:text-base leading-relaxed">{ev.summary}</p>
                      
                      {ev.type === 'exame' && (
                        <Button variant="outline" size="sm" className="mt-4 gap-2 text-xs h-8">
                          <FileText size={14} />
                          Ver Resultado
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-center mt-8 pt-4 border-t border-[var(--border)]">
                <Button variant="ghost" className="text-[var(--muted-foreground)] w-full">Carregar Histórico Anterior</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
