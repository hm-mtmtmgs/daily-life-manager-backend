import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from '../controllers/responses';
import { UserEntity } from '../domains/entities';
import { UserRepository } from '../repositories';
import { comparePassword, isNull } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
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
   */
  async validateJwt(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (isNull(user)) {
      throw new UnauthorizedException();
    }
    return user;
  }

  /**
   * ログイン
   */
  async login(user: UserEntity): Promise<TokenResponse> {
    const jwt = this.jwtService.sign({ id: user.id });
    const res = new TokenResponse();
    res.token = jwt;
    return res;
  }
}
