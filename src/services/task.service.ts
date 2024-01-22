import { Injectable } from '@nestjs/common';
import {
  CreateTaskRequest,
  PaginationRequest,
  UpdateTaskRequest,
} from '../controllers/requests';
import {
  TaskDetailResponse,
  TaskListResponse,
  TaskMeResponse,
} from '../controllers/responses';
import { TaskEntity, UserEntity } from '../domains/entities';
import {
  TaskCompletedAt,
  TaskDescription,
  TaskDueAt,
  TaskPriority,
  TaskStatus,
  TaskTitle,
} from '../domains/values';
import { TaskRepository } from '../repositories';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  /**
   * 私のタスクリストを取得
   */
  async getTaskMe(user: UserEntity): Promise<TaskMeResponse> {
    const taskList = await this.taskRepository.findBy({ userId: user.id });
    return new TaskMeResponse(taskList);
  }

  /**
   * タスクリストを取得
   */
  async getTaskList(
    user: UserEntity,
    params: PaginationRequest,
  ): Promise<TaskListResponse> {
    const [taskList, count] =
      await this.taskRepository.findWithPagination(params);
    return new TaskListResponse(taskList, params, count);
  }

  /**
   * タスク詳細を取得
   */
  async getTaskDetail(_: UserEntity, id: number): Promise<TaskDetailResponse> {
    _;
    const task = await this.taskRepository.findOneBy({ id: id });
    return new TaskDetailResponse(task);
  }

  /**
   * タスクを作成
   */
  async createTask(user: UserEntity, params: CreateTaskRequest): Promise<void> {
    const task = TaskEntity.new(
      new TaskTitle(params.title),
      new TaskDescription(params.description),
      new TaskPriority(params.priority),
      new TaskStatus(params.status),
      new TaskDueAt(new Date(params.dueAt)),
      new TaskCompletedAt(null),
      user.id,
    );
    await this.taskRepository.save(task);
  }

  /**
   * タスクを更新
   */
  async updateTask(
    user: UserEntity,
    id: number,
    params: UpdateTaskRequest,
  ): Promise<void> {
    const updateObject = {
      title: params.title ? new TaskTitle(params.title).value : undefined,
      description: params.description
        ? new TaskDescription(params.description).value
        : undefined,
      priority: params.priority
        ? new TaskPriority(params.priority).value
        : undefined,
      status: params.status ? new TaskStatus(params.status).value : undefined,
      dueAt: params.dueAt
        ? new TaskDueAt(new Date(params.dueAt)).value
        : undefined,
      userId: params.userId || undefined,
    };

    this.taskRepository.update({ id: id }, updateObject);
  }

  /**
   * タスクを削除
   */
  async deleteTask(user: UserEntity, id: number): Promise<void> {
    this.taskRepository.softDelete({ id: id });
  }
}
