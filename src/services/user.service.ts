import { Injectable } from '@nestjs/common';
import { MeResponse } from '../controllers/responses';
import { UserDomainService } from '../domains/domain_services';
import { UserEntity } from '../domains/entities';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(
    private readonly userDomainService: UserDomainService,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * 自分の情報を取得
   */
  async getMe(user: UserEntity): Promise<MeResponse> {
    const res = new MeResponse();
    res.lastName = user.lastName;
    res.firstName = user.firstName;
    res.email = user.email;
    return res;
  }
}
