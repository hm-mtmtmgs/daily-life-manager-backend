import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDomainService } from '../domains/domain_services';
import { UserEntity } from '../domains/entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [UserDomainService],
  exports: [UserDomainService],
})
export class UserDomainModule {}
