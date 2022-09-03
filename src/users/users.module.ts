import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PasswordHashService } from '../providers/password-hash.service';
import { CustomResponseService } from '../providers/custom-response.service';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), 
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService, PasswordHashService, CustomResponseService, AuthService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
