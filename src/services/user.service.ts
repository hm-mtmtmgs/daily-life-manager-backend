import { BadRequestException, Injectable } from '@nestjs/common';
import { UserSignupRequest } from '../controllers/requests';
import { BaseResponse, MeResponse } from '../controllers/responses';
import { UserDomainService } from '../domains/domain_services';
import { UserEntity } from '../domains/entities';
import { Email, FirstName, LastName, Password } from '../domains/values';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(
    private readonly userDomainService: UserDomainService,
    private readonly userRepository: UserRepository,
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
    const isDuplicate = await this.userDomainService.isEmailDuplication(
      user.email,
    );
    if (isDuplicate) {
      throw new BadRequestException('メールアドレスは既に使用されています');
    }

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
