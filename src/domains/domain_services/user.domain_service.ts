import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories';
import { isNotNull } from '../../utils';

@Injectable()
export class UserDomainService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * ユーザーのメールアドレスが重複しているかどうか
   */
  async isEmailDuplication(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneByEmail(email);
    return isNotNull(user);
  }
}
