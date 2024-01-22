import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { appConst } from '../consts';
import { AuthSignupRequest } from '../controllers/requests';
import { AccessTokenResponse } from '../controllers/responses';
import { UserDomainService } from '../domains/domain_services';
import { RefreshTokenEntity, UserEntity } from '../domains/entities';
import {
  Email,
  Password,
  UserFirstName,
  UserLastName,
} from '../domains/values';
import { RefreshTokenRepository, UserRepository } from '../repositories';
import { comparePassword, isNull } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    @Inject('JWT_ACCESS_SERVICE') private readonly jwtAccessService: JwtService,
    @Inject('JWT_REFRESH_SERVICE')
    private readonly jwtRefreshService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userDomainService: UserDomainService,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * ローカル認証
   */
  async validateLocal(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneByEmail(email);
    if (isNull(user)) {
      throw new UnauthorizedException();
    }
    if (!comparePassword(password, user.password)) {
      throw new UnauthorizedException();
    }
    return user;
  }

  /**
   * JWT認証
   * アクセストークン
   */
  async validateJwtAccess(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (isNull(user)) {
      throw new UnauthorizedException();
    }
    return user;
  }

  /**
   * JWT認証
   * リフレッシュトークン
   */
  async validateJwtRefresh(id: number, uuid: string): Promise<UserEntity> {
    const now = new Date();
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: {
        userId: id,
        tokenNo: uuid,
        issuedAt: LessThanOrEqual(now),
        expiredAt: MoreThanOrEqual(now),
      },
      relations: { userRow: true },
    });
    if (isNull(refreshToken)) {
      throw new UnauthorizedException();
    }
    if (isNull(refreshToken?.userRow)) {
      throw new UnauthorizedException();
    }
    await this.refreshTokenRepository.softDelete({ id: refreshToken.id });
    return refreshToken.userRow;
  }

  /**
   * サインアップ
   */
  async signup(params: AuthSignupRequest): Promise<void> {
    const user = UserEntity.new(
      new UserLastName(params.lastName),
      new UserFirstName(params.firstName),
      new Email(params.email),
      new Password(params.password),
    );
    const isDuplicate = await this.userDomainService.isEmailDuplication(
      user.email,
    );
    if (isDuplicate) {
      throw new BadRequestException('メールアドレスは既に使用されています');
    }

    await this.userRepository.insert(user);
  }

  /**
   * ログイン
   */
  async login(user: UserEntity): Promise<AccessTokenResponse> {
    const uuid = uuidv4();
    const jwtAccess = this.jwtAccessService.sign({ id: user.id });
    const jwtRefresh = this.jwtRefreshService.sign({ id: user.id, uuid: uuid });

    // リフレッシュトークンをDBに保存
    const issuedAt = new Date();
    const expiredAt = new Date(
      issuedAt.getTime() + appConst.jwtRefreshTokenExpireTime * 1000,
    );
    const refreshToken = RefreshTokenEntity.new(
      uuid,
      user.id,
      issuedAt,
      expiredAt,
      appConst.jwtRefreshTokenExpireTime,
    );
    await this.refreshTokenRepository.insert(refreshToken);

    const res = new AccessTokenResponse();
    res.accessToken = jwtAccess;
    res.accessTokenExpiresIn = appConst.jwtAccessTokenExpireTime;
    res.refreshToken = jwtRefresh;
    return res;
  }
}
