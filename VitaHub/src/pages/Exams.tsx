import React from "react";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "../components/ui/Button";

const examsList = [
  {
    id: 1,
    name: "Hemograma Completo",
    date: "10/10/2023",
    laboratory: "Lab Saúde Prime",
    doctor: "Dra. Maria Fernanda",
    status: "Disponível",
  },
  {
    id: 2,
    name: "Ecocardiograma",
    date: "05/09/2023",
    laboratory: "CardioCentro",
    doctor: "Dr. Roberto Silva",
    status: "Disponível",
  },
];

export function Exams() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meus Exames</h1>
        <p className="text-[var(--muted-foreground)] mt-1 text-lg">
          Seus resultados de exames e laudos médicos.
        </p>
      </div>

      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[var(--muted)]/50 text-[var(--muted-foreground)] text-sm font-medium">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Nome do Exame</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Laboratório / Médico</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {examsList.map((exam) => (
                <tr key={exam.id} className="hover:bg-[var(--muted)]/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/10 text-purple-600 flex items-center justify-center rounded-lg">
                        <FileText size={20} />
                      </div>
                      <span className="font-bold text-[var(--foreground)] text-base">{exam.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-[var(--muted-foreground)] font-medium">
                    {exam.date}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-[var(--foreground)] font-medium">{exam.laboratory}</span>
                      <span className="text-sm text-[var(--muted-foreground)]">{exam.doctor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" aria-label="Visualizar">
                        <Eye size={20} className="text-[var(--muted-foreground)] hover:text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Baixar PDF">
                        <Download size={20} className="text-[var(--muted-foreground)] hover:text-primary" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
