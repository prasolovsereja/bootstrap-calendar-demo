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
    top: number,
    left: number,
    width: number,
    height: number,
  }
};