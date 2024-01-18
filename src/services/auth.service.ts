import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenResponse } from '../controllers/responses';
import { UserEntity } from '../domains/entities';
import { comparePassword, isNothing } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * ローカル認証
   */
  async validateLocal(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder(`main`)
      .where(`LOWER(main.email) = :email`, { email: email.toLowerCase() })
      .getOne();
    if (isNothing(user)) {
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
  async validateJwt(payload: any): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: payload.id });
    if (isNothing(user)) {
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