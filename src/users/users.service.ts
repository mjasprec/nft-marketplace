import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './user.repository';
// import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
// import { UserRole, UserGender, UserStatus } from './users-prop.enum';
// import { CreateUserDTO } from './dto/create-user.dto';
// import { GetUserFilterDTO } from './dto/get-user-filter.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(id: string): Promise<UsersEntity> {
    const isMatchedUser = await this.usersRepository.getUserById(id);

    console.log('UsersService');

    if (!isMatchedUser) {
      throw new NotFoundException('User not found/User does not exist');
    }

    return isMatchedUser;
  }
}
