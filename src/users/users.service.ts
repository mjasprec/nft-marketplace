import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
// import { UsersRepository } from './user.repository';
// import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import {
  // UserRole,
  // UserGender,
  UserStatus,
} from './users-prop.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserFilterDTO } from './dto/get-user-filter.dto';

@Injectable()
export class UsersService extends Repository<UsersEntity> {
  constructor(private dataSource: DataSource) {
    super(UsersEntity, dataSource.createEntityManager());
  }

  async getUsers(getUserFilterDTO: GetUserFilterDTO): Promise<UsersEntity[]> {
    const { username, firstName, lastName, gender, searchTerm } =
      getUserFilterDTO;

    const query = this.createQueryBuilder('users');

    if (username) {
      query.where('LOWER(users.username) = LOWER(:username)', { username });
    }

    if (firstName) {
      query.where('LOWER(users.firstName) = LOWER(:firstName)', { firstName });
    }

    if (lastName) {
      query.where('LOWER(users.lastName) = LOWER(:lastName)', { lastName });
    }

    if (gender) {
      query.where('users.gender = UPPER(:gender)', { gender });
    }

    if (searchTerm) {
      query.where(
        'LOWER(users.username) LIKE LOWER(:searchTerm) OR LOWER(users.firstName) LIKE LOWER(:searchTerm) OR LOWER(users.lastName) LIKE LOWER(:searchTerm)',
        {
          searchTerm: `%${searchTerm}%`,
        },
      );
    }

    const users = await query.getMany();

    // const allUsers = await this.find({
    //   where: {
    //     role: UserRole.USER,
    //     status: UserStatus.ACTIVE,
    //     deletedAt: null,
    //   },
    // });

    return users;
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
