import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<UserEntity> {
    console.log('signUp', authCredentialsDto);
    return this.authService.createUser(authCredentialsDto);
  }
}
