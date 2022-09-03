import { Body, Controller, Post, UseGuards, Request, Get, forwardRef, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { Forbidden } from '../responses/forbidden';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const response = await this.usersService.register(registerDto);
      return response;
    } catch (error) {
      if (error === 'USER_ALREADY_EXISTS') {
        throw new Forbidden('User already exists, please login', 'USER_ALREADY_EXISTS');
      }
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    try {
      console.log('USER req.user', req.user);
      const response = this.authService.login(req.user);
      console.log('USER response', response);
      return response;
    } catch (error) {
      if (error === 'LOGIN_ERROR') {
        throw new Forbidden('User login failed', error);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
