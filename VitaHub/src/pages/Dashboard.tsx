import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockUpcomingAppointments, mockRecentExams } from "../services/mockData";
import { Calendar, FileText, Upload, Clock, MapPin, Activity, Stethoscope } from "lucide-react";
import { Button } from "../components/ui/Button";

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Bem-vindo(a), {user?.name}</h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            Aqui está o resumo da sua saúde e próximos compromissos.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Activity size={20} className="text-primary" />
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/appointments" className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-md transition-all hover:border-primary/30 group flex flex-col items-center text-center gap-3 cursor-pointer">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar size={24} />
            </div>
            <span className="font-semibold text-[var(--foreground)]">Agendar Consulta</span>
          </Link>
          <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-md transition-all hover:border-secondary/30 group flex flex-col items-center text-center gap-3 cursor-pointer">
            <div className="w-12 h-12 bg-secondary/10 text-secondary border border-secondary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload size={24} />
            </div>
            <span className="font-semibold text-[var(--foreground)]">Enviar Exame</span>
          </div>
          <Link to="/my-health" className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-md transition-all hover:border-purple-500/30 group flex flex-col items-center text-center gap-3 cursor-pointer">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
            <span className="font-semibold text-[var(--foreground)]">Ver Histórico</span>
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Upcoming Appointments */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Stethoscope size={20} className="text-primary" />
              Próximas Consultas
            </h2>
            <Link to="/appointments" className="text-sm font-medium text-primary hover:underline">Ver todas</Link>
          </div>
          
          <div className="space-y-4">
            {mockUpcomingAppointments.length > 0 ? (
              mockUpcomingAppointments.map((app) => (
                <div key={app.id} className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--muted)] text-[var(--muted-foreground)] rounded-xl flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-bold uppercase">{app.date.split(' ')[1]?.replace(',', '')}</span>
                    <span className="text-lg font-bold text-[var(--foreground)] leading-none">{app.date.split(' ')[0]}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[var(--foreground)]">{app.doctor}</h3>
                    <p className="text-sm text-primary font-medium">{app.specialty}</p>
                    <div className="mt-2 text-sm text-[var(--muted-foreground)] flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1"><Clock size={14} /> {app.time}</div>
                      <div className="flex items-center gap-1"><MapPin size={14} /> {app.location}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-sm text-center">
                <p className="text-[var(--muted-foreground)]">Nenhuma consulta agendada.</p>
              </div>
            )}
          </div>
        </section>

        {/* Recent Exams */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FileText size={20} className="text-primary" />
              Exames Recentes
            </h2>
            <Link to="/exams" className="text-sm font-medium text-primary hover:underline">Ver todos</Link>
          </div>
          
          <div className="space-y-4">
            {mockRecentExams.length > 0 ? (
              mockRecentExams.map((exam) => (
                <div key={exam.id} className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--foreground)]">{exam.name}</h3>
                      <p className="text-sm text-[var(--muted-foreground)] mt-1">{exam.date}</p>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                      exam.status === "Disponível" 
                      ? "bg-secondary/10 text-secondary" 
                      : "bg-orange-500/10 text-orange-500"
                    }`}>
                      {exam.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-sm text-center">
                <p className="text-[var(--muted-foreground)]">Nenhum exame recente.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
