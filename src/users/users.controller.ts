import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersModel } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Get()
  getAllUsers(): UsersModel[] {
    const users = this.userServices.getAllUsers();

    console.log(users);
    return users;
  }

  @Post()
  createUser(@Body() body): UsersModel {
    return this.userServices.createUser(body);
  }
}
