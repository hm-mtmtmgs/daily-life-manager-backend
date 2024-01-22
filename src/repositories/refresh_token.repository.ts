import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RefreshTokenEntity } from '../domains/entities';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  constructor(private dataSource: DataSource) {
    super(RefreshTokenEntity, dataSource.createEntityManager());
  }
}
