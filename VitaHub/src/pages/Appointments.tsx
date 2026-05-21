import React, { useState } from "react";
import { Calendar, Clock, MapPin, ChevronLeft, CheckCircle2, User, Stethoscope } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { mockUpcomingAppointments, mockPastAppointments, mockDoctors, UpcomingAppointment } from "../services/mockData";

export function Appointments() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [upcomingList, setUpcomingList] = useState(mockUpcomingAppointments);
  const [pastList] = useState(mockPastAppointments);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const resetModal = () => {
    setIsModalOpen(false);
    setBookingStep(1);
    setSelectedDoctor(null);
    setSelectedDate("");
    setSelectedTime("");
  };

  const handleConfirm = () => {
    // Add to local mock list to simulate success
    const newAppointment: UpcomingAppointment = {
      id: `new-${Date.now()}`,
      doctor: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: new Date(selectedDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: selectedTime,
      location: "Consultório Principal",
    };
    setUpcomingList([...upcomingList, newAppointment]);
    setIsModalOpen(false);
    resetModal();
  };

  const displayedList = activeTab === "upcoming" ? upcomingList : pastList;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minhas Consultas</h1>
          <p className="text-[var(--muted-foreground)] mt-1 text-lg">
            Acompanhe seus próximos agendamentos médicos.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="h-12 px-6 text-base shadow-sm shrink-0">
          Agendar Consulta
        </Button>
      </div>

      <div className="flex bg-[var(--muted)]/50 p-1 rounded-xl w-full max-w-sm mb-6">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "upcoming" ? "bg-[var(--surface)] text-[var(--foreground)] shadow-sm" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          }`}
        >
          Próximas
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "past" ? "bg-[var(--surface)] text-[var(--foreground)] shadow-sm" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          }`}
        >
          Histórico
        </button>
      </div>

      <div className="grid gap-4">
        {displayedList.length > 0 ? (
          displayedList.map((app) => (
            <div key={app.id} className={`bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-sm flex flex-col md:flex-row gap-6 md:items-center justify-between transition-all hover:shadow-md ${activeTab === 'past' ? 'opacity-80 grayscale-[20%]' : ''}`}>
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${activeTab === 'upcoming' ? 'bg-primary/10 text-primary' : 'bg-[var(--muted)] text-[var(--muted-foreground)]'}`}>
                  <Calendar size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)]">{app.doctor}</h3>
                  <p className={activeTab === 'upcoming' ? "text-primary font-medium" : "text-[var(--muted-foreground)] font-medium"}>{app.specialty}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-[var(--muted-foreground)] text-sm">
                    <div className="flex items-center gap-1.5 bg-[var(--muted)] px-3 py-1.5 rounded-md">
                      <Calendar size={16} />
                      <span>{app.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[var(--muted)] px-3 py-1.5 rounded-md">
                      <Clock size={16} />
                      <span>{app.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} />
                      <span>{app.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-3 border-t md:border-t-0 md:border-l border-[var(--border)] pt-4 md:pt-0 md:pl-6">
                 {activeTab === "upcoming" ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary border border-secondary/20">
                      Confirmada
                    </span>
                 ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)]">
                      Realizada
                    </span>
                 )}
                <Button variant="outline" className="w-full md:w-auto h-10">{activeTab === 'upcoming' ? 'Ver Detalhes' : 'Ver Resumo'}</Button>
              </div>
            </div>
          ))
        ) : (
           <div className="text-center py-12 bg-[var(--surface)] rounded-2xl border border-[var(--border)]">
              <Calendar className="mx-auto h-12 w-12 text-[var(--muted-foreground)] opacity-50" />
              <h3 className="mt-4 text-lg font-semibold">Nenhuma consulta {activeTab === "upcoming" ? "agendada" : "no histórico"}</h3>
              <p className="text-[var(--muted-foreground)] mt-2">Você não tem registros para exibir nesta aba.</p>
           </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={resetModal}
        title={
          <div className="flex items-center gap-3">
            {bookingStep > 1 && (
              <button onClick={() => setBookingStep(bookingStep - 1)} className="p-1 rounded-md hover:bg-[var(--muted)]">
                <ChevronLeft size={20} />
              </button>
            )}
            <span className="text-lg font-bold">Nova Consulta</span>
          </div> as any
        }
      >
        <div className="space-y-4">
          {bookingStep === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right-4">
              <h3 className="font-semibold text-[var(--muted-foreground)] mb-4">1. Selecione o Médico</h3>
              <div className="grid gap-3 max-h-[60vh] overflow-y-auto pr-2 pb-4">
                {mockDoctors.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoctor(doc)}
                    className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                      selectedDoctor?.id === doc.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                        : "border-[var(--border)] hover:border-primary/50"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedDoctor?.id === doc.id ? 'bg-primary text-primary-foreground' : 'bg-[var(--muted)] text-[var(--muted-foreground)]'}`}>
                      <User size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--foreground)]">{doc.name}</h4>
                      <div className="flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] mt-0.5">
                        <Stethoscope size={14} />
                        <span>{doc.specialty}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <Button 
                className="w-full mt-4 h-12" 
                disabled={!selectedDoctor}
                onClick={() => setBookingStep(2)}
              >
                Continuar
              </Button>
            </div>
          )}

          {bookingStep === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <h3 className="font-semibold text-[var(--muted-foreground)]">2. Escolha Data e Hora</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Data da Consulta</label>
                <Input 
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full h-12"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Horário Disponível</label>
                <div className="grid grid-cols-3 gap-2">
                  {["09:00", "10:30", "14:00", "15:45", "16:30"].map((time) => (
                    <button
                      key={time}
                      disabled={!selectedDate}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                        !selectedDate ? "opacity-40 cursor-not-allowed" :
                        selectedTime === time 
                          ? "bg-primary text-primary-foreground border-primary" 
                          : "border-[var(--border)] hover:border-primary text-[var(--foreground)]"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full mt-4 h-12" 
                disabled={!selectedDate || !selectedTime}
                onClick={() => setBookingStep(3)}
              >
                Resumo do Agendamento
              </Button>
            </div>
          )}

          {bookingStep === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
               <div className="bg-[var(--muted)]/50 p-6 rounded-xl border border-[var(--border)] text-center space-y-4">
                  <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold">Confirme seu agendamento</h3>
                  
                  <div className="space-y-2 text-sm max-w-[240px] mx-auto text-left">
                     <div className="flex justify-between border-b border-[var(--border)] pb-2">
                       <span className="text-[var(--muted-foreground)]">Médico</span>
                       <span className="font-semibold text-right">{selectedDoctor?.name}</span>
                     </div>
                     <div className="flex justify-between border-b border-[var(--border)] pb-2 pt-1">
                       <span className="text-[var(--muted-foreground)]">Especialidade</span>
                       <span className="font-semibold text-right">{selectedDoctor?.specialty}</span>
                     </div>
                     <div className="flex justify-between border-b border-[var(--border)] pb-2 pt-1">
                       <span className="text-[var(--muted-foreground)]">Data e Hora</span>
                       <span className="font-semibold text-right text-primary">
                         {new Date(selectedDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric'})} às {selectedTime}
                       </span>
                     </div>
                  </div>
               </div>

               <Button className="w-full h-12 text-base" onClick={handleConfirm}>
                 Confirmar Consulta
               </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
