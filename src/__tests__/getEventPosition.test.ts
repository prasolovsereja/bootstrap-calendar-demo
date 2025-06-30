import { getEventPosition } from '../utils/getEventPosition';
describe('getEventPosition tests', () => {
  const timeSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30'];
  const slotWidth = 50;
  test('Корректно считает позицию для простого случая', () => {
    const result = getEventPosition({
      startTime: '09:00',
      endTime: '10:00',
      slotWidth,
      timeSlots,
    });
    expect(result.startIndex).toBe(3);
    expect(result.span).toBe(2);
    expect(result.left).toBe(150);
    expect(result.width).toBe(100);
  });
  test('Пограничные случаи', () => {
    const result = getEventPosition({
      startTime: '11:00',
      endTime: '11:30',
      slotWidth,
      timeSlots,
    });
    expect(result.startIndex).toBe(timeSlots.length - 1);
    expect(result.span).toBe(1);
    expect(result.left).toBe((timeSlots.length - 1) * 50);
    expect(result.width).toBe(50);
    const result1 = getEventPosition({
      startTime: '7:00',
      endTime: '7:30',
      slotWidth,
      timeSlots,
    });
    expect(result1.startIndex).toBe(1);
    expect(result1.span).toBe(1);
    expect(result1.left).toBe(50);
    expect(result1.width).toBe(50);
  });
});
