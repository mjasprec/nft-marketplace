import { Injectable } from '@nestjs/common';
import { UsersModel, UserRole, UserGender } from './users.model';
import { v4 as uuid } from 'uuid';
import { CreateUserDTO } from './dto/create-user.dto';
import { GetUserFilterDTO } from './dto/get-user-filter.dto';

@Injectable()
export class UsersService {
  private users: UsersModel[] = [
    {
      id: '1',
      username: 'theHunter',
      email: 'nfthunter@test.com',
      password: 'nfthunter',
      firstName: 'Donald',
      lastName: 'Trump',
      aboutMe: 'NFT Collector',
      birthday: new Date('2014-12-12'),
      wallet: 1000,
      nfts: ['NFT 1', 'NFT 2'],
      gender: UserGender.MALE,
      role: UserRole.USER,
    },
  ];

  getUsers(): UsersModel[] {
    return this.users;
  }

  getUsersWithFilter(filterUsersDto: GetUserFilterDTO): UsersModel[] {
    const { username, firstName, lastName, searchTerm } = filterUsersDto;
    let filteredUsers = this.getUsers();
    let isMatch = false;

    if (username) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.username.toLocaleLowerCase() === username.toLocaleLowerCase(),
      );

      isMatch = Boolean(filteredUsers.length);
    }

    if (firstName) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.firstName.toLocaleLowerCase() === firstName.toLocaleLowerCase(),
      );

      isMatch = Boolean(filteredUsers.length);
    }

    if (lastName) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.lastName.toLocaleLowerCase() === lastName.toLocaleLowerCase(),
      );

      isMatch = Boolean(filteredUsers.length);
    }

    if (searchTerm) {
      filteredUsers.filter((user) => {
        if (
          user.username
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()) ||
          user.lastName
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()) ||
          user.firstName
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase())
        ) {
          isMatch = true;
          return true;
        }
        isMatch = false;
        return false;
      });
    }

    return isMatch ? filteredUsers : [];
  }

  getUserById(id: string): UsersModel {
    const users = this.getUsers();
    return users.find((user) => user.id === id);
  }

  deleteUserById(id: string): UsersModel[] {
    const updatedUsers = this.getUsers().filter((user) => user.id !== id);

    return this.users.splice(0, this.users.length, ...updatedUsers);
  }

  updateUserById(id: string, createUserDto: CreateUserDTO): UsersModel {
    const userToUpdate = this.getUserById(id);

    Object.assign(userToUpdate, createUserDto);

    // Object.entries(createUserDto).reduce((accumulator, [key, value]) => {
    //   userToUpdate[key] = value;
    //   return accumulator;
    // }, {});

    return userToUpdate;
  }

  updateUserEmail(id: string, email: string): UsersModel {
    const emailToUpdate = this.getUserById(id);
    emailToUpdate.email = email;

    return emailToUpdate;
  }

  createUser(createUserDto: CreateUserDTO): UsersModel {
    const { username, email, password, firstName, lastName, aboutMe, gender } =
      createUserDto;

    const wallet = Number(createUserDto.wallet);
    const birthday = new Date(createUserDto.birthday);

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
