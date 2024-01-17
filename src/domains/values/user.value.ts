import { BadRequestException } from '@nestjs/common';
import { Base } from '.';
import { isEmpty } from '../../utils';

/**
 * 姓
 */
export class LastName extends Base<string> {
  constructor(protected readonly _value: string) {
    super(_value);
  }
  protected _validate(value: string): void {
    if (isEmpty(value)) throw new BadRequestException('値が不正です');
  }
}

/**
 * 名
 */
export class FirstName extends Base<string> {
  constructor(protected readonly _value: string) {
    super(_value);
  }
  protected _validate(value: string): void {
    if (isEmpty(value)) throw new BadRequestException('値が不正です');
  }
}
