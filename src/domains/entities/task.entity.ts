import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import {
  TaskCompletedAt,
  TaskDescription,
  TaskDueAt,
  TaskPriority,
  TaskStatus,
  TaskTitle,
} from '../values';
import { Base } from './base.entity';
import { UserEntity } from './user.entity';

export enum TaskPriorityEnum {
  LOW = '低',
  MEDIUM = '中',
  HIGH = '高',
}
export const TaskPriorityArray: string[] = Object.values(TaskPriorityEnum);

export enum TaskStatusEnum {
  NOT_STARTED = '未着手',
  IN_PROGRESS = '進行中',
  DONE = '完了',
  PENDING = '保留',
}
export const TaskStatusArray: string[] = Object.values(TaskStatusEnum);

@Entity({ name: 'tasks' })
export class TaskEntity extends Base {
  /**
   * カラム定義
   */
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'priority' })
  priority: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'due_at' })
  dueAt: Date;

  @Column({ name: 'complete_at', nullable: true })
  completedAt: Date;

  @Column({ name: 'user_id' })
  userId: number;

  /**
   * リレーション定義
   */
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userRow?: UserEntity;

  /**
   * インスタンス生成
   */
  static new(
    title: TaskTitle,
    description: TaskDescription,
    priority: TaskPriority,
    status: TaskStatus,
    dueAt: TaskDueAt,
    completedAt: TaskCompletedAt,
    userId: number,
  ): TaskEntity {
    const task = new TaskEntity();
    task.title = title.value;
    task.description = description?.value || null;
    task.priority = priority.value || TaskPriorityEnum.LOW;
    task.status = status.value || TaskStatusEnum.NOT_STARTED;
    task.dueAt = dueAt?.value || null;
    task.completedAt = completedAt?.value || null;
    task.userId = userId;
    return task;
  }

  static reNew(
    title: TaskTitle,
    description: TaskDescription,
    priority: TaskPriority,
    status: TaskStatus,
    dueAt: TaskDueAt,
    completedAt: TaskCompletedAt,
    userId: number,
  ): TaskEntity {
    const task = new TaskEntity();
    task.title = title.value;
    task.description = description?.value || null;
    task.priority = priority.value;
    task.status = status.value;
    task.dueAt = dueAt?.value || null;
    task.completedAt = completedAt?.value || null;
    task.userId = userId;
    return task;
  }
}
