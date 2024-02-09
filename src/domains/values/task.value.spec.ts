import {
  TaskCompletedAt,
  TaskDescription,
  TaskDueAt,
  TaskPriority,
  TaskStatus,
  TaskTitle,
} from '.';
import { genRandomStr } from '../../utils';
import { TaskPriorityEnum, TaskStatusEnum } from '../entities';

/**
 * タイトル
 */
describe('TaskTitle', () => {
  test('_validate', () => {
    // 正常系
    expect(new TaskTitle('タイトル').value).toBe('タイトル');
    // 異常系
    expect(() => new TaskTitle(null)).toThrow('タイトルを入力してください');
    expect(() => new TaskTitle(undefined)).toThrow(
      'タイトルを入力してください',
    );
    expect(() => new TaskTitle('')).toThrow('タイトルを入力してください');
    expect(() => new TaskTitle(genRandomStr(101))).toThrow(
      'タイトルは100文字以内で入力してください',
    );
  });
});

/**
 * 説明
 */
describe('TaskDescription', () => {
  test('_validate', () => {
    // 正常系
    expect(new TaskDescription('説明').value).toBe('説明');
    // 異常系
    expect(() => new TaskDescription(genRandomStr(1001))).toThrow(
      '説明は1000文字以内で入力してください',
    );
  });
});

/**
 * 優先度
 */
describe('TaskPriority', () => {
  test('_validate', () => {
    // 正常系
    expect(new TaskPriority(TaskPriorityEnum.LOW).value).toBe(
      TaskPriorityEnum.LOW,
    );
    // 異常系
    expect(() => new TaskPriority('aaa')).toThrow('値が不正です');
  });
});

/**
 * ステータス
 */
describe('TaskStatus', () => {
  test('_validate', () => {
    // 正常系
    expect(new TaskStatus(TaskStatusEnum.DONE).value).toBe(TaskStatusEnum.DONE);
    // 異常系
    expect(() => new TaskStatus('aaa')).toThrow('値が不正です');
  });
});

/**
 * 期限日
 */
describe('TaskDueAt', () => {
  test('_validate', () => {
    // 正常系
    const date = new Date();
    expect(new TaskDueAt(date).value).toBe(date);
  });
});

/**
 * 完了日
 */
describe('TaskCompletedAt', () => {
  test('_validate', () => {
    // 正常系
    const date = new Date();
    expect(new TaskCompletedAt(date).value).toBe(date);
  });
});
