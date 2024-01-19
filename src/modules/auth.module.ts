import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { appConst } from '../consts';
import { AuthController } from '../controllers';
import { JwtStrategy, LocalStrategy } from '../pipelines/guards';
import { AuthService } from '../services';
import { UserModule } from './user.module';
dotenv.config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: appConst.jwtSecret,
      signOptions: { expiresIn: appConst.jwtTokenExpireTime },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [],
})
export class AuthModule {}
