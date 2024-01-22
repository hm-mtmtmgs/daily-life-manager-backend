import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PaginationRequest } from '../controllers/requests';
import { TaskEntity } from '../domains/entities';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  async findWithPagination(
    params: PaginationRequest,
  ): Promise<[TaskEntity[], number]> {
    const [taskList, count] = await this.createQueryBuilder(`main`)
      .limit(params.pageSize)
      .offset(params.page ? (params.page - 1) * params.pageSize : 0)
      .getManyAndCount();
    return [taskList, count];
  }
}
