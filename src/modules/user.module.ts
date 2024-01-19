import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers';
import { UserDomainService } from '../domains/domain_services';
import { UserEntity } from '../domains/entities';
import { UserRepository } from '../repositories';
import { UserService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserDomainService, UserRepository],
  exports: [UserDomainService, UserRepository],
})
export class UserModule {}
