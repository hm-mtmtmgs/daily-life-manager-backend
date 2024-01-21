import { randomBytes } from 'crypto';

export function genRandomStr(length: number): string {
  return randomBytes(length).toString('hex').substring(0, length);
}
