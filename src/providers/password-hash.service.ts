import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';


@Injectable()
export class PasswordHashService {
  private readonly saltOrRounds = 10;

  async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, this.saltOrRounds);
    return hash;
  }

  async validatePassword(password: string, hashedPassword: string) {
    const hash = await bcrypt.compare(password, hashedPassword);
    return hash;
  }

}