import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload.interface';

@Injectable()
export class AuthService extends Repository<UserEntity> {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<UserEntity> {
    const { username, email, firstName, lastName, aboutMe, gender } =
      authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(authCredentialsDto.password, salt);
    const wallet = Number(authCredentialsDto.wallet);
    const birthday = new Date(authCredentialsDto.birthday);

    const newUser = this.create({
      username,
      password,
      email,
      firstName,
      lastName,
      aboutMe,
      birthday,
      wallet,
      nfts: [],
      gender,
    });

    try {
      await this.save(newUser);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username/Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return newUser;
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
