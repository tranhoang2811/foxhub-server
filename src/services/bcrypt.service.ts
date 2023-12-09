import {inject} from '@loopback/core';
import {compare, genSalt, hash} from 'bcryptjs';
import {HashPasswordService} from '../interfaces/bcrypt';
import {BcryptBindings} from '../keys';

export class BcryptService implements HashPasswordService<string> {
  constructor(
    @inject(BcryptBindings.ROUNDS)
    private readonly rounds: number,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.rounds);
    return hash(password, salt);
  }

  async comparePassword(
    providedPass: string,
    storedPass: string,
  ): Promise<boolean> {
    const isPasswordMatched = await compare(providedPass, storedPass);
    return isPasswordMatched;
  }
}
