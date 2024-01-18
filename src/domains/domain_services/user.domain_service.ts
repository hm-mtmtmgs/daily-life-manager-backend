import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isNotNull } from '../../utils';
import { UserEntity } from '../entities';

@Injectable()
export class UserDomainService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * ユーザーのメールアドレスが重複しているかどうか
   */
  async isUserEmailDuplication(email: string): Promise<boolean> {
    const user = await this.userRepository
      .createQueryBuilder(`main`)
      .where(`LOWER(main.email) = :email`, { email: email.toLowerCase() })
      .getOne();
    return isNotNull(user);
  }
}
