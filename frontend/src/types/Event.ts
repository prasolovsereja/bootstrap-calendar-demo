export interface Event {
  id?: number;
  title: string;
  description?: string;
  start: string;
  end: string;
  date: string;
  createdAt?: string;
}
export interface EventDto {
  id?: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  date: string;
  createdAt?: string;
}
export type PositionedEvent = {
  event: Event;
  style: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
};
