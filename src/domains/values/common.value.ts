import { BadRequestException } from '@nestjs/common';
import { Base } from '.';
import { isEmpty } from '../../utils';

/**
 * パスワード
 */
export class Password extends Base<string> {
  constructor(protected readonly _value: string) {
    super(_value);
  }
  protected _validate(value: string): void {
    if (isEmpty(value)) throw new BadRequestException('値が不正です');
    if (value.length < 8)
      throw new BadRequestException('パスワードは8文字以上です');
    if (!value.match(/^[a-zA-Z0-9!@#$%^&*()_+[\]{}|;:'",.<>?]+$/))
      throw new BadRequestException('パスワードは英数か記号で入力してください');
    if (value === value.toLowerCase())
      throw new BadRequestException('パスワードは大文字を含めてください');
  }
}

/**
 * メールアドレス
 */
export class Email extends Base<string> {
  constructor(protected readonly _value: string) {
    super(_value);
  }
  protected _validate(value: string): void {
    if (isEmpty(value)) throw new BadRequestException('値が不正です');
    if (!value.match(/.+@.+\..+/))
      throw new BadRequestException('メールアドレスの形式が不正です');
  }

  equals(other: Email): boolean {
    // 大文字小文字を区別しない
    return this.value.toLowerCase() === other.value.toLowerCase();
  }
}
