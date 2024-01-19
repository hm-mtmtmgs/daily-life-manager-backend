import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from '../controllers';
import { TaskEntity } from '../domains/entities';
import { TaskRepository } from '../repositories/task.repository';
import { TaskService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [],
})
export class TaskModule {}
