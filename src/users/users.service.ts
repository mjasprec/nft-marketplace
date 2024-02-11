import { Injectable } from '@nestjs/common';
import { UsersModel, UserRole, UserGender } from './users.model';

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

  getAllUsers() {
    return this.users;
  }
}
