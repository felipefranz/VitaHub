export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Masculino" | "Feminino" | "Outro";
  lastVisit: string;
  status: "Estável" | "Crítico" | "Em Observação";
}

export interface Metric {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
}

export const mockMetrics: Metric[] = [
  { label: "Total de Pacientes", value: "1.248", change: 12, trend: "up" },
  { label: "Consultas Hoje", value: "24", change: -2, trend: "down" },
  { label: "Alertas Críticos", value: "3", change: 1, trend: "up" },
  { label: "Taxa Recuperação", value: "94%", change: 0, trend: "neutral" },
];

export interface UpcomingAppointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
}

export const mockUpcomingAppointments: UpcomingAppointment[] = [
  {
    id: "1",
    doctor: "Dra. Maria Fernanda",
    specialty: "Cardiologia",
    date: "22 Mai, 2024",
    time: "14:30",
    location: "Clínica Vida, Sl 204",
  },
  {
    id: "2",
    doctor: "Dr. Roberto Silva",
    specialty: "Oftalmologia",
    date: "15 Jun, 2024",
    time: "09:00",
    location: "Hospital Central, Andar 3",
  },
];

export const mockPastAppointments: UpcomingAppointment[] = [
  {
    id: "p1",
    doctor: "Dr. Carlos Mendes",
    specialty: "Clínico Geral",
    date: "10 Mar, 2024",
    time: "10:00",
    location: "Clínica Vida, Sl 101",
  },
  {
    id: "p2",
    doctor: "Dra. Ana Paula",
    specialty: "Dermatologia",
    date: "05 Fev, 2024",
    time: "15:45",
    location: "Centro Integrado, Sl 302",
  }
];

export const mockDoctors = [
  { id: "d1", name: "Dra. Maria Fernanda", specialty: "Cardiologia" },
  { id: "d2", name: "Dr. Roberto Silva", specialty: "Oftalmologia" },
  { id: "d3", name: "Dr. Carlos Mendes", specialty: "Clínico Geral" },
  { id: "d4", name: "Dra. Ana Paula", specialty: "Dermatologia" },
];

export interface RecentExam {
  id: string;
  name: string;
  date: string;
  status: "Disponível" | "Em Análise";
}

export const mockRecentExams: RecentExam[] = [
  {
    id: "1",
    name: "Hemograma Completo",
    date: "10 Out, 2023",
    status: "Disponível",
  },
  {
    id: "2",
    name: "Ressonância Magnética",
    date: "28 Set, 2023",
    status: "Em Análise",
  },
];

export interface HealthTimelineEvent {
  id: string;
  date: string;
  type: "consulta" | "exame" | "diagnostico";
  doctor: string;
  title: string;
  summary: string;
}

export const mockHealthTimeline: HealthTimelineEvent[] = [
  {
    id: "t1",
    date: "15 Out, 2023",
    type: "consulta",
    doctor: "Dra. Maria Fernanda",
    title: "Consulta de Rotina",
    summary: "Pressão arterial 120/80, exames de rotina solicitados. Paciente relata bom estado geral.",
  },
  {
    id: "t2",
    date: "10 Out, 2023",
    type: "exame",
    doctor: "Lab Saúde Prime",
    title: "Hemograma Completo",
    summary: "Níveis de glicose levemente elevados. Restante dos indicadores dentro da normalidade.",
  },
  {
    id: "t3",
    date: "25 Set, 2023",
    type: "diagnostico",
    doctor: "Dr. Roberto Silva",
    title: "Diagnóstico Clínico",
    summary: "Prescrição de Vitamina D 50.000 UI por conta de insuficiência leve constatada.",
  },
];
