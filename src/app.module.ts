import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './auth/constants';
import { CoreModule } from './core/core.module';
import { CustomResponseService } from './providers/custom-response.service';
import { PasswordHashService } from './providers/password-hash.service';
import { UserEntity } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_DB_HOST,
      port: parseInt(<string>process.env.POSTGRES_DB_PORT),
      username: process.env.POSTGRES_DB_USERNAME,
      password: process.env.POSTGRES_DB_PASSWORD,
      database: process.env.POSTGRES_DB_NAME,
      entities: [UserEntity],
      synchronize: true
    }),
    AuthModule,
    UsersModule,
    CoreModule
  ],
  controllers: [AppController],
  providers: [AppService, PasswordHashService, CustomResponseService],
})
export class AppModule {}
