export const validateEventData = (data: any) => {
  if (!data.title || typeof data.title !== "string") return false;
  if (!data.startDate || isNaN(Date.parse(data.startDate))) return false;
  if (!data.endDate || isNaN(Date.parse(data.endDate))) return false;
  if (!data.date || isNaN(Date.parse(data.date))) return false;
  return true;
};
