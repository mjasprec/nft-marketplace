import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
// import { UsersRepository } from './user.repository';
// import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import {
  UserRole,
  // UserGender,
  UserStatus,
} from './users-prop.enum';

// import { GetUserFilterDTO } from './dto/get-user-filter.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService extends Repository<UsersEntity> {
  constructor(private dataSource: DataSource) {
    super(UsersEntity, dataSource.createEntityManager());
  }

  async getUsers(): Promise<UsersEntity[]> {
    const allUsers = await this.find({
      where: {
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
      },
    });

    return allUsers;
  }

  async getUserById(id: string): Promise<UsersEntity> {
    const isMatchedUser = await this.findOne({ where: { id } });

    if (!isMatchedUser) {
      throw new NotFoundException('User not found/User does not exist');
    }

    return isMatchedUser;
  }

  async deleteUserById(id: string): Promise<UsersEntity> {
    const userToRemove = await this.getUserById(id);

    userToRemove.isDeleted = true;
    userToRemove.status = UserStatus.DISABLED;
    console.log('userToRemove', userToRemove);
    const userAfterRemoval = await this.softRemove(userToRemove);
    console.log('userAfterRemoval', userAfterRemoval);

    return userToRemove;
  }

  async createUser(createUserDto: CreateUserDTO): Promise<UsersEntity> {
    const { username, email, password, firstName, lastName, aboutMe, gender } =
      createUserDto;

    const wallet = Number(createUserDto.wallet);
    const birthday = new Date(createUserDto.birthday);

    const newUser = this.create({
      username,
      email,
      password,
      firstName,
      lastName,
      aboutMe,
      birthday,
      wallet,
      nfts: [],
      gender,
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
    });

    await this.save(newUser);

    return newUser;
  }
}
