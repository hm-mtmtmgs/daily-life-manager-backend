import { Email, Password } from './common.value';

/**
 * パスワード
 */
describe('Password', () => {
  test('_validate', () => {
    // 正常系
    expect(new Password('Password').value).toBe('Password');
    expect(new Password('A1234567890!@#$%^&*()_+[]{}|;:\'",.<>?').value).toBe(
      'A1234567890!@#$%^&*()_+[]{}|;:\'",.<>?',
    );
    // 異常系
    expect(() => new Password(null)).toThrow('値が不正です');
    expect(() => new Password(undefined)).toThrow('値が不正です');
    expect(() => new Password('Aaaaaa?')).toThrow('パスワードは8文字以上です');
    expect(() => new Password('ああああああああ')).toThrow(
      'パスワードは英数か記号で入力してください',
    );
    expect(() => new Password('password')).toThrow(
      'パスワードは大文字を含めてください',
    );
  });
});

/**
 * メールアドレス
 */
describe('Email', () => {
  test('_validate', () => {
    // 正常系
    expect(new Email('aaa@example.com').value).toBe('aaa@example.com');
    expect(new Email('BBB@example.com').value).toBe('BBB@example.com');
    // 異常系
    expect(() => new Email(null)).toThrow('値が不正です');
    expect(() => new Email(undefined)).toThrow('値が不正です');
    expect(() => new Email('aaaexample.com')).toThrow(
      'メールアドレスの形式が不正です',
    );
  });

  test('equals', () => {
    const email1 = new Email('aaa@example.com');
    const email2 = new Email('aAA@example.com');
    const email3 = new Email('bbb@example.com');
    expect(email1.equals(email1)).toBeTruthy();
    expect(email1.equals(email2)).toBeTruthy();
    expect(email1.equals(email3)).toBeFalsy();
  });
});
