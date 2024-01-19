import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthSignupRequest } from '../controllers/requests';
import { TokenResponse } from '../controllers/responses';
import { UserDomainService } from '../domains/domain_services';
import { UserEntity } from '../domains/entities';
import {
  Email,
  Password,
  UserFirstName,
  UserLastName,
} from '../domains/values';
import { UserRepository } from '../repositories';
import { comparePassword, isNull } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDomainService: UserDomainService,
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
  async login(user: UserEntity): Promise<TokenResponse> {
    const jwt = this.jwtService.sign({ id: user.id });
    const res = new TokenResponse();
    res.token = jwt;
    return res;
  }
}
