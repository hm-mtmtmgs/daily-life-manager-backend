import { UserFirstName, UserLastName } from '.';
import { genRandomStr } from '../../utils';

/**
 * 姓
 */
describe('UserLastName', () => {
  test('_validate', () => {
    // 正常系
    expect(new UserLastName('田中').value).toBe('田中');
    expect(new UserLastName('Tanaka').value).toBe('Tanaka');
    // 異常系
    expect(() => new UserLastName(null)).toThrow('値が不正です');
    expect(() => new UserLastName(undefined)).toThrow('値が不正です');
    expect(() => new UserLastName('')).toThrow('値が不正です');
    expect(() => new UserLastName(genRandomStr(51))).toThrow(
      '姓は50文字以内で入力してください',
    );
  });
});

/**
 * 名
 */
describe('UserFirstName', () => {
  test('_validate', () => {
    // 正常系
    expect(new UserFirstName('太郎').value).toBe('太郎');
    expect(new UserFirstName('Tarou').value).toBe('Tarou');
    // 異常系
    expect(() => new UserFirstName(null)).toThrow('値が不正です');
    expect(() => new UserFirstName(undefined)).toThrow('値が不正です');
    expect(() => new UserFirstName('')).toThrow('値が不正です');
    expect(() => new UserFirstName(genRandomStr(51))).toThrow(
      '名は50文字以内で入力してください',
    );
  });
});
