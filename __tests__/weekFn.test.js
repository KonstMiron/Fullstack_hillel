const { weekFn } = require('../main');

describe('weekFn()', () => {
  test('returns correct weekday for numbers 1–7', () => {
    expect(weekFn(1)).toBe('Понеділок');
    expect(weekFn(2)).toBe('Вівторок');
    expect(weekFn(3)).toBe('Середа');
    expect(weekFn(4)).toBe('Четвер');
    expect(weekFn(5)).toBe('П\'ятниця');
    expect(weekFn(6)).toBe('Субота');
    expect(weekFn(7)).toBe('Неділя');
  });

  test('returns null for invalid values', () => {
    expect(weekFn(9)).toBe(null);
    expect(weekFn(1.5)).toBe(null);
    expect(weekFn('2')).toBe(null);
    expect(weekFn(0)).toBe(null);
    expect(weekFn(undefined)).toBe(null);
  });
});