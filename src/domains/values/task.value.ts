import { BadRequestException } from '@nestjs/common';
import { Base } from '.';
import { isEmpty, isNull } from '../../utils';
import { TaskPriorityEnum, TaskStatusEnum } from '../entities';

/**
 * タイトル
 */
export class TaskTitle extends Base<string> {
  constructor(protected readonly _value: string) {
    super(_value);
  }
  protected _validate(value: string): void {
    if (value.length <= 100)
      throw new BadRequestException('タイトルは100文字以内で入力してください');
  }
}

/**
 * 説明
 */
export class TaskDescription extends Base<string> {
  constructor(protected readonly _value: string) {
    super(_value);
  }
  protected _validate(value: string): void {
    if (value.length <= 1000)
      throw new BadRequestException('説明は1000文字以内で入力してください');
  }
}

/**
 * 優先度
 */
export class TaskPriority extends Base<string> {
  constructor(protected readonly _value: string) {
    super(_value);
  }
  protected _validate(value: string): void {
    if (isNull(value)) throw new BadRequestException('値が不正です');
    if (!(value in TaskPriorityEnum))
      throw new BadRequestException('値が不正です');
  }
}

/**
 * ステータス
 */
export class TaskStatus extends Base<string> {
  constructor(protected readonly _value: string) {
    super(_value);
  }
  protected _validate(value: string): void {
    if (isEmpty(value)) throw new BadRequestException('値が不正です');
    if (!(value in TaskStatusEnum))
      throw new BadRequestException('値が不正です');
  }
}

/**
 * 期限日
 */
export class TaskDueAt extends Base<Date> {
  constructor(protected readonly _value: Date) {
    super(_value);
  }
  protected _validate(value: Date): void {
    if (isNull(value)) return;
    if (!(value instanceof Date)) throw new BadRequestException('値が不正です');
  }
}

/**
 * 完了日
 */
export class TaskCompletedAt extends Base<Date> {
  constructor(protected readonly _value: Date) {
    super(_value);
  }
  protected _validate(value: Date): void {
    if (isNull(value)) return;
    if (!(value instanceof Date)) throw new BadRequestException('値が不正です');
  }
}
