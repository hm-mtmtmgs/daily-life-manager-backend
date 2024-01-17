import { UserEntity } from './user.entity';

export * from './user.entity';

// dataSourceで使用するためにexport
export const entities = [UserEntity];
