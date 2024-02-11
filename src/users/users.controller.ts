import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Get()
  getAllUsers() {
    const users = this.userServices.getAllUsers();

    console.log(users.length);
    return users;
  }
}
