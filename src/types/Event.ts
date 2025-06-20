export interface Event {
  id: string,
  title: string,
  description?: string,
  start: string,
  end: string,
  date: string,
}
export type PositionedEvent = {
  event: Event,
  style: {
    top: string,
    left: number,
    width: number,
    height: string,
  }
};