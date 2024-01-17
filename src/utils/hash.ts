import { compareSync, hashSync } from 'bcrypt';

export function hashPassword(password: string, saltRounds = 10): string {
  return hashSync(password, saltRounds);
}

export function comparePassword(
  password: string,
  hashedPassword: string,
): boolean {
  return compareSync(password, hashedPassword);
}
