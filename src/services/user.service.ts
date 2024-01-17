import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginRequest, UserSignupRequest } from '../controllers/requests';
import {
  BaseResponse,
  MeResponse,
  TokenResponse,
} from '../controllers/responses';
import { UserEntity } from '../domains/entities';
import { Email, FirstName, LastName, Password } from '../domains/values';
import { isEmpty } from '../utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * サインアップ
   */
  async signup(params: UserSignupRequest): Promise<BaseResponse> {
    const user = UserEntity.new(
      new LastName(params.lastName),
      new FirstName(params.firstName),
      new Email(params.email),
      new Password(params.password),
    );

    await this.userRepository.insert(user);
    return new BaseResponse();
  }

  /**
   * ログイン
   */
  async login(params: UserLoginRequest): Promise<TokenResponse> {
    // TODO
    console.log(params);
    const res = new TokenResponse();
    res.token = '';
    return res;
  }

  /**
   * 自分の情報を取得
   */
  async me(): Promise<MeResponse> {
    // TODO
    const user = await this.userRepository.findOneBy({ id: 1 });
    if (isEmpty(user)) {
      throw new BadRequestException();
    }

    const res = new MeResponse();
    res.lastName = user.lastName;
    res.firstName = user.firstName;
    res.email = user.email;
    return res;
  }
}
