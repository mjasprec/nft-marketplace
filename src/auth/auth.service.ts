import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<UserEntity> {
    const {
      username,
      password,
      email,
      firstName,
      lastName,
      // aboutMe, gender
    } = authCredentialsDto;

    // const wallet = Number(authCredentialsDto.wallet);
    // const birthday = new Date(authCredentialsDto.birthday);

    const newUser = this.create({
      username,
      password,
      email,
      firstName,
      lastName,
      // aboutMe,
      // birthday,
      // wallet,
      // nfts: [],
      // gender,
    });

    await this.save(newUser);

    return newUser;
  }
}
