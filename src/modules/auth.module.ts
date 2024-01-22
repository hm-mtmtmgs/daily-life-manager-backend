import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { appConst } from '../consts';
import { AuthController } from '../controllers';
import {
  JwtAccessStrategy,
  JwtRefreshStrategy,
  LocalStrategy,
} from '../pipelines/guards';
import { RefreshTokenRepository } from '../repositories';
import { AuthService } from '../services';
import { UserModule } from './user.module';
dotenv.config();

@Module({
  imports: [
    PassportModule,
    JwtModule,
    // JwtModule.register({
    //   secret: appConst.jwtSecret,
    //   signOptions: { expiresIn: appConst.jwtTokenExpireTime },
    // }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    RefreshTokenRepository,
    {
      provide: 'JWT_ACCESS_SERVICE',
      useFactory: () => {
        return new JwtService({
          secret: appConst.jwtAccessTokenSecret,
          signOptions: { expiresIn: appConst.jwtAccessTokenExpireTime },
        });
      },
    },
    {
      provide: 'JWT_REFRESH_SERVICE',
      useFactory: () => {
        return new JwtService({
          secret: appConst.jwtRefreshTokenSecret,
          signOptions: { expiresIn: appConst.jwtRefreshTokenExpireTime },
        });
      },
    },
  ],
  exports: [],
})
export class AuthModule {}
