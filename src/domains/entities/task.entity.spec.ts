import { TaskEntity, TaskPriorityEnum, TaskStatusEnum, UserEntity } from '.';
import {
  Email,
  Password,
  TaskDescription,
  TaskPriority,
  TaskStatus,
  TaskTitle,
  UserFirstName,
  UserLastName,
} from '../values';
import { TaskCompletedAt, TaskDueAt } from './../values/task.value';

describe('TaskEntity', () => {
  let task: TaskEntity;
  let user: UserEntity;

  let taskTitle: TaskTitle;
  let taskDescription: TaskDescription;
  let taskPriority: TaskPriority;
  let taskStatus: TaskStatus;
  let taskDueAt: TaskDueAt;
  let taskCompletedAt: TaskCompletedAt;

  beforeEach(() => {
    const pass = 'Password123';
    const lastName = new UserLastName('田中');
    const firstName = new UserFirstName('太郎');
    const email = new Email('aaa@example.com');
    const password = new Password(pass);
    user = UserEntity.new(lastName, firstName, email, password);

    taskTitle = new TaskTitle('タイトルタイトル');
    taskDescription = new TaskDescription('あいうえお');
    taskPriority = new TaskPriority(TaskPriorityEnum.LOW);
    taskStatus = new TaskStatus(TaskStatusEnum.NOT_STARTED);
    taskDueAt = new TaskDueAt(new Date());
    taskCompletedAt = new TaskCompletedAt(null);
  });

  it('インタンス新規作成', () => {
    task = TaskEntity.new(
      taskTitle,
      taskDescription,
      taskPriority,
      taskStatus,
      taskDueAt,
      taskCompletedAt,
      user,
    );

    expect(task).toBeInstanceOf(TaskEntity);
    expect(task.title).toEqual(taskTitle.value);
    expect(task.description).toEqual(taskDescription.value);
    expect(task.priority).toEqual(taskPriority.value);
    expect(task.status).toEqual(taskStatus.value);
    expect(task.dueAt).toEqual(taskDueAt.value);
    expect(task.completedAt).toBeNull();
    expect(task.userRow).toEqual(user);
  });

  it('インスタンス再構築', () => {
    task = TaskEntity.reNew(
      taskTitle,
      taskDescription,
      taskPriority,
      taskStatus,
      taskDueAt,
      taskCompletedAt,
      user,
    );

    expect(task).toBeInstanceOf(TaskEntity);
    expect(task.title).toEqual(taskTitle.value);
    expect(task.description).toEqual(taskDescription.value);
    expect(task.priority).toEqual(taskPriority.value);
    expect(task.status).toEqual(taskStatus.value);
    expect(task.dueAt).toEqual(taskDueAt.value);
    expect(task.completedAt).toBeNull();
    expect(task.userRow).toEqual(user);
  });
});
