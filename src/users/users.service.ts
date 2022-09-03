import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Forbidden } from '../responses/forbidden';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from './user.entity';
import { LoginDto } from './dto/login.dto';
import { PasswordHashService } from '../providers/password-hash.service';
import { CustomResponseService } from '../providers/custom-response.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    
    private readonly passwordHashService: PasswordHashService,
    private readonly customResponseService: CustomResponseService
  ) {}

  async register(data: RegisterDto) {
    // first check if the user with that email alrady exist or not
    try {
      const responseFind = await this.userRepository.findOne({ 
        where: [
          { email: data.email }
        ]
      })
      console.log('[USER_FIND responseFind]', responseFind);
      if (responseFind) {
        throw 'USER_ALREADY_EXISTS';
      } else {
        const hashedPassword = await this.passwordHashService.hashPassword(data.password);
        const responseCreate = this.userRepository.create({ email: data.email, password: hashedPassword });
        const respUser = await this.userRepository.save(responseCreate)
        return this.customResponseService.customResponse(200, 'User registered', respUser);
      }
    } catch (error) {
      if (error === 'USER_ALREADY_EXISTS') {
        throw 'USER_ALREADY_EXISTS';
      }
    }
  }

  async login(data: LoginDto) {
    try {
      const responseFind = await this.userRepository.findOne({
        where: [
          { 
            email: data.email
          }
        ]
      })
      if (responseFind) {
        const isPasswordValid = await this.passwordHashService.validatePassword(data.password, responseFind.password);
        if (isPasswordValid) {
          // generate token and send response
          return this.customResponseService.customResponse(200, 'Logged in successfully', responseFind);
        } else {
          throw 'LOGIN_ERROR';
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async findOne(email: string) {
    try {
      const response = await this.userRepository.findOne({
        where: [
          { email }
        ]
      })
      if (response) {
        return response;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
}
