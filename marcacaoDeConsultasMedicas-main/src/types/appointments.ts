// src/types/appointments.ts
export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | string;

export type Appointment = {
  id: string | number;
  doctorName: string;
  specialty?: string;
  date?: string;  // ISO ou dd/mm/aaaa
  time?: string;  // HH:mm ou ISO
  status: AppointmentStatus;
};
