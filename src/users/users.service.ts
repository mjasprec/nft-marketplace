import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { UserRole, UserStatus } from './users-prop.enum';
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
      query.where('LOWER(users.username) = LOWER(:username)', {
        username,
      });
    }

    if (firstName) {
      query.where('LOWER(users.firstName) = LOWER(:firstName)', {
        firstName,
      });
    }

    if (lastName) {
      query.where('LOWER(users.lastName) = LOWER(:lastName)', {
        lastName,
      });
    }

    if (gender) {
      query.where('users.gender = UPPER(:gender)', { gender });
    }

    if (searchTerm) {
      query.where(
        '(LOWER(users.username) LIKE LOWER(:searchTerm) OR LOWER(users.firstName) LIKE LOWER(:searchTerm) OR LOWER(users.lastName) LIKE LOWER(:searchTerm))',
        {
          searchTerm: `%${searchTerm}%`,
        },
      );
    }

    query
      .andWhere('users.status = :status', { status: UserStatus.ACTIVE })
      .andWhere('users.role = :role', { role: UserRole.USER });

    const users = await query.getMany();

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
}
