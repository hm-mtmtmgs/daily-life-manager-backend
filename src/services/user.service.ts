import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSignupRequest } from '../controllers/requests';
import { BaseResponse, MeResponse } from '../controllers/responses';
import { UserEntity } from '../domains/entities';
import { Email, FirstName, LastName, Password } from '../domains/values';

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
   * 自分の情報を取得
   */
  async me(user: UserEntity): Promise<MeResponse> {
    const res = new MeResponse();
    res.lastName = user.lastName;
    res.firstName = user.firstName;
    res.email = user.email;
    return res;
  }
}
