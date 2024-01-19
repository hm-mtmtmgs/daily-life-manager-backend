import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers';
import { UserDomainService } from '../domains/domain_services';
import { UserEntity } from '../domains/entities';
import { UserRepository } from '../repositories';
import { UserService } from '../services';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserDomainService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
