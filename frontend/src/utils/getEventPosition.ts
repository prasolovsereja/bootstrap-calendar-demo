type GetEventPositionArgs = {
  startTime: string;
  endTime: string;
  slotWidth: number;
  timeSlots: string[];
};

const getTimeIndex = (time: string, timeSlots: string[]): number => {
  const [timeH, timeM] = time.split(':').map(Number);
  const timeMinutes = timeH * 60 + timeM;
  const timeIndex = timeSlots.findIndex(timeSlot => {
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const slotMinutes = hours * 60 + minutes;
    return slotMinutes >= timeMinutes;
  });
  return timeIndex === -1 ? timeSlots.length - 1 : Math.max(1, timeIndex + 1);
};

export const getEventPosition = ({
  startTime,
  endTime,
  slotWidth,
  timeSlots,
}: GetEventPositionArgs) => {
  const startIndex = getTimeIndex(startTime, timeSlots);
  const endIndex = getTimeIndex(endTime, timeSlots);
  const span = Math.max(1, endIndex - startIndex);
  return {
    span,
    startIndex,
    left: slotWidth * startIndex,
    width: span * slotWidth,
  };
};
