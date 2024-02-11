import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      name: 'Spencer',
    },
    {
      name: 'Rodney',
    },
    {
      name: 'Drew',
    },
    {
      name: 'Johnson',
    },
    {
      name: 'Albert',
    },
  ];

  getAllUsers() {
    return this.users;
  }
}
