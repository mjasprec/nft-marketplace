import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt.payload.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      secretOrKey: 'topSecret99',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { username } = payload;

    const user: UserEntity = await this.authService.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
