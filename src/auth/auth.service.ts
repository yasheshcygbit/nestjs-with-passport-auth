import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PasswordHashService } from '../providers/password-hash.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly passwordHashService: PasswordHashService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (user) {
      // compare password
      const isPasswordValid = await this.passwordHashService.validatePassword(password, user.password);
      if (isPasswordValid) {
        return user;
      }
    }
    return null;
  }

  login(user: any) {
    console.log('[LOGIN_JWT user]', user);    
    const payload = { email: user.email, sub: user.id }
    console.log('USER payload', payload);
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
