import { Injectable } from '@nestjs/common';
import { UsersModel, UserRole, UserGender } from './users.model';
import { v4 as uuid } from 'uuid';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: UsersModel[] = [
    {
      id: '1',
      username: 'string',
      email: 'nfthunter@test.com',
      password: 'nfthunter',
      firstName: 'Donald',
      lastName: 'Trump',
      aboutMe: 'NFT Collector',
      birthday: '04/04/1989',
      wallet: 1000,
      nfts: ['NFT 1', 'NFT 2'],
      gender: UserGender.MALE,
      role: UserRole.USER,
    },
  ];

  getAllUsers(): UsersModel[] {
    return this.users;
  }

  getUserById(id: string): UsersModel {
    const users = this.getAllUsers();
    return users.find((user) => user.id === id);
  }

  deleteUserById(id: string): UsersModel[] {
    const updatedUsers = this.getAllUsers().filter((user) => user.id !== id);

    return this.users.splice(0, this.users.length, ...updatedUsers);
  }

  createUser(createUserDto: CreateUserDTO): UsersModel {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      aboutMe,
      birthday,
      wallet,
      gender,
    } = createUserDto;

    const newUser = {
      id: uuid(),
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
    };

    this.users.push(newUser);

    return newUser;
  }
}
