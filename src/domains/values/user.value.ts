import { BadRequestException } from '@nestjs/common';
import { Base } from '.';
import { isEmpty } from '../../utils';

/**
 * 姓
 */
export class UserLastName extends Base<string> {
  constructor(protected readonly _value: string) {
    super(_value);
  }
  protected _validate(value: string): void {
    if (isEmpty(value)) throw new BadRequestException('値が不正です');
    if (value.length > 50)
      throw new BadRequestException('姓は50文字以内で入力してください');
  }
}

/**
 * 名
 */
export class UserFirstName extends Base<string> {
  constructor(protected readonly _value: string) {
    super(_value);
  }
  protected _validate(value: string): void {
    if (isEmpty(value)) throw new BadRequestException('値が不正です');
    if (value.length > 50)
      throw new BadRequestException('名は50文字以内で入力してください');
  }
}
