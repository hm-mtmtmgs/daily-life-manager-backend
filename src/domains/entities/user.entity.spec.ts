import { UserEntity } from '.';
import { comparePassword } from '../../utils';
import { Email, Password, UserFirstName, UserLastName } from '../values';

describe('UserEntity', () => {
  it('インタンス新規作成', () => {
    const pass = 'Password123';

    const lastName = new UserLastName('田中');
    const firstName = new UserFirstName('太郎');
    const email = new Email('aaa@example.com');
    const password = new Password(pass);

    const user = UserEntity.new(lastName, firstName, email, password);

    expect(user).toBeInstanceOf(UserEntity);
    expect(user.lastName).toEqual(lastName.value);
    expect(user.firstName).toEqual(firstName.value);
    expect(user.email).toEqual(email.value);
    expect(comparePassword(pass, user.password)).toBeTruthy();
  });

  it('インスタンス再構築', () => {
    const lastName = new UserLastName('田中');
    const firstName = new UserFirstName('太郎');
    const email = new Email('aaa@example.com');
    const password = 'Password123';

    const user = UserEntity.reNew(lastName, firstName, email, password);

    expect(user).toBeInstanceOf(UserEntity);
    expect(user.lastName).toEqual(lastName.value);
    expect(user.firstName).toEqual(firstName.value);
    expect(user.email).toEqual(email.value);
    expect(user.password).toEqual(password);
  });
});
