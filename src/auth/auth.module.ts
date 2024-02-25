import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersService])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
