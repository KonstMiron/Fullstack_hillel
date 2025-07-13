const { ageClassification } = require('../main');

describe('ageClassification()', () => {
  test('returns null for negative or >122', () => {
    expect(ageClassification(-1)).toBe(null);
    expect(ageClassification(122.01)).toBe(null);
    expect(ageClassification(150)).toBe(null);
  });

  test('classifies correctly for valid age ranges', () => {
    expect(ageClassification(0)).toBe('Дитинство');
    expect(ageClassification(1)).toBe('Дитинство');
    expect(ageClassification(24)).toBe('Дитинство');
    expect(ageClassification(24.01)).toBe('Молодість');
    expect(ageClassification(44)).toBe('Молодість');
    expect(ageClassification(44.01)).toBe('Зрілість');
    expect(ageClassification(65)).toBe('Зрілість');
    expect(ageClassification(65.1)).toBe('Старість');
    expect(ageClassification(75)).toBe('Старість');
    expect(ageClassification(75.01)).toBe('Довголіття');
    expect(ageClassification(90)).toBe('Довголіття');
    expect(ageClassification(90.01)).toBe('Рекорд');
    expect(ageClassification(122)).toBe('Рекорд');
  });
});