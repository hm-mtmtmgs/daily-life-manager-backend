import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../domains/entities';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.createQueryBuilder(`main`)
      .where(`LOWER(main.email) = :email`, { email: email.toLowerCase() })
      .getOne();
    return user;
  }
}
