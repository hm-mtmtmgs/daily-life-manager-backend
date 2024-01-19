import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers';
import { UserDomainService } from '../domains/domain_services';
import { UserEntity } from '../domains/entities';
import { UserService } from '../services';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UserController],
  providers: [UserService, UserDomainService],
})
export class UserModule {}
