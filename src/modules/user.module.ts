import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers';
import { UserEntity } from '../domains/entities';
import { UserService } from '../services';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule {}
