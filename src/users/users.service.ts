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
import { UpdateUserDto } from './dto/update-user.dto';

// import { GetUserFilterDTO } from './dto/get-user-filter.dto';

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
        deletedAt: null,
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

    userToRemove.status = UserStatus.DISABLED;

    await this.softRemove(userToRemove);

    return userToRemove;
  }

  async recoverUserById(id: string): Promise<UsersEntity> {
    const matchUser = await this.findOne({
      where: { id: id },
      withDeleted: true,
    });

    await this.recover(matchUser);

    return matchUser;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UsersEntity> {
    const matchedUser = await this.getUserById(id);

    Object.assign(matchedUser, {
      ...updateUserDto,
      birthday: new Date(updateUserDto.birthday),
    });

    await this.save(matchedUser);

    return matchedUser;
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
    });

    await this.save(newUser);

    return newUser;
  }
}
