import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../../domains/entities';
import { AuthService } from '../../services';

/**
 * アクセストークン
 */
export class JwtAccessAuthGuard extends AuthGuard('jwt-access') {}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: any): Promise<UserEntity> {
    return await this.authService.validateJwtAccess(payload.id as number);
  }
}

/**
 * リフレッシュトークン
 */
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
  }

  async validate(payload: any): Promise<UserEntity> {
    return await this.authService.validateJwtRefresh(
      payload.id as number,
      payload.uuid as string,
    );
  }
}
