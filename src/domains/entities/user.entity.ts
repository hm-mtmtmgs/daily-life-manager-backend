import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'users' })
export class UserEntity extends Base {
  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;
}
