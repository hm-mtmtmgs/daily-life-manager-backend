import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { appConst } from '../consts';
import { UserEntity } from '../domains/entities';
import { JwtStrategy, LocalStrategy } from '../pipelines/guards';
import { AuthService } from '../services';
import { UserModule } from './user.module';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: appConst.jwtSecret,
      signOptions: { expiresIn: appConst.jwtTokenExpireTime },
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
