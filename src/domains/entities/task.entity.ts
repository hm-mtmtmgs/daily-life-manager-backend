import { Column, Entity } from 'typeorm';
import {
  TaskCompletedAt,
  TaskDescription,
  TaskDueAt,
  TaskPriority,
  TaskStatus,
  TaskTitle,
} from '../values';
import { Base } from './base.entity';

export enum TaskPriorityEnum {
  LOW = '低',
  MEDIUM = '中',
  HIGH = '高',
}

export enum TaskStatusEnum {
  NOT_STARTED = '未着手',
  IN_PROGRESS = '進行中',
  DONE = '完了',
  PENDING = '保留',
}

@Entity({ name: 'tasks' })
export class TaskEntity extends Base {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'priority' })
  priority: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'due_at' })
  dueAt: Date;

  @Column({ name: 'complete_at' })
  completedAt: Date;

  static new(
    title: TaskTitle,
    description: TaskDescription,
    priority: TaskPriority,
    status: TaskStatus,
    dueAt: TaskDueAt,
    completedAt: TaskCompletedAt,
  ): TaskEntity {
    const task = new TaskEntity();
    task.title = title.value;
    task.description = description.value;
    task.priority = priority.value || TaskPriorityEnum.LOW;
    task.status = status.value || TaskStatusEnum.NOT_STARTED;
    task.dueAt = dueAt.value;
    task.completedAt = completedAt.value;
    return task;
  }

  static reNew(
    title: TaskTitle,
    description: TaskDescription,
    priority: TaskPriority,
    status: TaskStatus,
    dueAt: TaskDueAt,
    completedAt: TaskCompletedAt,
  ): TaskEntity {
    const task = new TaskEntity();
    task.title = title.value;
    task.description = description.value;
    task.priority = priority.value;
    task.status = status.value;
    task.dueAt = dueAt.value;
    task.completedAt = completedAt.value;
    return task;
  }
}
