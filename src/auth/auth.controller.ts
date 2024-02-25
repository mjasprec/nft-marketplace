import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<UserEntity> {
    return this.authService.createUser(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<string> {
    return this.authService.signIn(username, password);
  }
}
