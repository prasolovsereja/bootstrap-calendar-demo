export const getTimeSlots = (
  startHour = 8,
  endHour = 18,
): string[] => {
  const slots: string[] = [];
  for (let h = startHour; h < endHour; h += 1) {
    slots.push(`${h.toString().padStart(2, '0')}:00`);
    slots.push(`${h.toString().padStart(2, '0')}:30`);
  }
  slots.push(`${endHour}:00`);
  return slots;
};