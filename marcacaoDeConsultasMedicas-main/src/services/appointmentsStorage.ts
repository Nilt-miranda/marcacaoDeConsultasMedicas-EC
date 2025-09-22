// src/services/appointmentsStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'appointments';

export async function getAppointmentsRaw(): Promise<any[]> {
  try {
    const stored = await AsyncStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('[appointmentsStorage] getAppointmentsRaw error', e);
    return [];
  }
}

export async function setAppointmentsRaw(list: any[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(list ?? []));
  } catch (e) {
    console.error('[appointmentsStorage] setAppointmentsRaw error', e);
  }
}
