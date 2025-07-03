import { prisma } from "../prisma";
const getEvents = async () => {
  return prisma.event.findMany();
};
const createEvent = async (data: any) => {
  return prisma.event.create({ data });
};
const deleteEvent = async (id: number) => {
  return prisma.event.delete({ where: { id } });
};

export const eventServices = { getEvents, createEvent, deleteEvent };
