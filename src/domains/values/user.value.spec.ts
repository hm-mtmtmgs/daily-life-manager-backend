import { FirstName, LastName } from '.';

/**
 * 姓
 */
describe('LastName', () => {
  test('_validate', () => {
    // 正常系
    expect(new LastName('田中').value).toBe('田中');
    expect(new LastName('Tanaka').value).toBe('Tanaka');
    // 異常系
    expect(() => new LastName(null)).toThrow('値が不正です');
    expect(() => new LastName(undefined)).toThrow('値が不正です');
    expect(() => new LastName('')).toThrow('値が不正です');
  });
});

/**
 * 名
 */
describe('FirstName', () => {
  test('_validate', () => {
    // 正常系
    expect(new FirstName('太郎').value).toBe('太郎');
    expect(new FirstName('Tarou').value).toBe('Tarou');
    // 異常系
    expect(() => new FirstName(null)).toThrow('値が不正です');
    expect(() => new FirstName(undefined)).toThrow('値が不正です');
    expect(() => new FirstName('')).toThrow('値が不正です');
  });
});
