// src/utils/date.ts
export function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString();
}

export function formatTime(timeStr?: string) {
  if (!timeStr) return '';
  if (/^\d{2}:\d{2}$/.test(timeStr)) return timeStr;
  const d = new Date(timeStr);
  if (isNaN(d.getTime())) return timeStr;
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
