import { Column, Entity } from 'typeorm';
import { hashPassword } from '../../utils';
import { Email, FirstName, LastName, Password } from '../values';
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

  static new(
    lastName: LastName,
    firstName: FirstName,
    email: Email,
    password: Password,
  ): UserEntity {
    const user = new UserEntity();
    user.lastName = lastName.value;
    user.firstName = firstName.value;
    user.email = email.value;
    user.password = hashPassword(password.value);
    return user;
  }

  static reNew(
    lastName: LastName,
    firstName: FirstName,
    email: Email,
    password: string,
  ): UserEntity {
    const user = new UserEntity();
    user.lastName = lastName.value;
    user.firstName = firstName.value;
    user.email = email.value;
    user.password = password;
    return user;
  }
}
