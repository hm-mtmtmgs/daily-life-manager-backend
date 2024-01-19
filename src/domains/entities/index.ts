import { TaskEntity } from './task.entity';
import { UserEntity } from './user.entity';

export * from './task.entity';
export * from './user.entity';

// dataSourceで使用するためにexport
export const entities = [UserEntity, TaskEntity];
