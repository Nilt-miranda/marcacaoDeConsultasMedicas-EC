// src/screens/HomeScreen/hooks/useHomeScreen.ts
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getAppointmentsRaw } from '../../../services/appointmentsStorage';
import type { Appointment as NormalizedAppointment } from '../../../types/appointments';

type RawAppointment = {
  id: string | number;
  doctorName?: string;
  doctor_name?: string;
  specialty?: string;
  especialidade?: string;
  date?: string;
  data?: string;
  time?: string;
  hora?: string;
  status?: string;
  [k: string]: any;
};

function normalize(a: RawAppointment): NormalizedAppointment {
  return {
    id: a.id ?? String(Math.random()).slice(2),
    doctorName: a.doctorName ?? a.doctor_name ?? 'Médico',
    specialty: a.specialty ?? a.especialidade,
    date: a.date ?? a.data,
    time: a.time ?? a.hora,
    status: (a.status as any) ?? 'pending',
  };
}

type Params = { navigation?: any };

export const useHomeScreen = ({ navigation }: Params = {}) => {
  const [appointments, setAppointments] = useState<NormalizedAppointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const raw = await getAppointmentsRaw();
      setAppointments(raw.map(normalize));
    } catch (e) {
      console.error('[Home] load error', e);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await load();
    } finally {
      setRefreshing(false);
    }
  }, [load]);

  const onCreatePress = useCallback(() => {
    navigation?.navigate?.('CreateAppointment') ?? navigation?.navigate?.('CreateAppointmentScreen');
  }, [navigation]);

  const onAppointmentPress = useCallback((appointment: NormalizedAppointment) => {
    navigation?.navigate?.('AppointmentDetails', { appointment });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  useEffect(() => {
    load();
  }, [load]);

  return {
    appointments,
    loading,
    refreshing,
    onRefresh,
    onCreatePress,
    onAppointmentPress,
  };
};

export type Appointment = NormalizedAppointment;
export default useHomeScreen;
