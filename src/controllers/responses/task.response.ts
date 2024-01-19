import { ApiProperty } from '@nestjs/swagger';
import { TaskEntity } from '../../domains/entities';

export class TaskItem {
  @ApiProperty({ type: String })
  title: string;
  @ApiProperty({ type: String })
  description: string;
  @ApiProperty({ type: String })
  priority: string;
  @ApiProperty({ type: Date })
  dueAt: Date;
  @ApiProperty({ type: Date })
  completedAt: Date;
  @ApiProperty({ type: Number })
  userId: number;

  constructor(task: TaskEntity) {
    this.title = task?.title || null;
    this.description = task?.description || null;
    this.priority = task?.priority || null;
    this.dueAt = task?.dueAt || null;
    this.completedAt = task?.completedAt || null;
    this.userId = task?.userId || null;
  }
}

/**
 * 私のタスクリストを取得
 */
export class TaskMeResponse {
  @ApiProperty({ type: [TaskItem] })
  items: TaskItem[];

  constructor(taskList: TaskEntity[]) {
    this.items = taskList.map((task) => new TaskItem(task));
  }
}

/**
 * タスクリストを取得
 */
export class TaskListResponse {
  @ApiProperty({ type: [TaskItem] })
  items: TaskItem[];

  constructor(taskList: TaskEntity[]) {
    this.items = taskList.map((task) => new TaskItem(task));
  }
}

/**
 * タスク詳細を取得
 */
export class TaskDetailResponse extends TaskItem {
  constructor(task: TaskEntity) {
    super(task);
  }
}
