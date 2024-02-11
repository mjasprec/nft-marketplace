import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersModel } from './users.model';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Get()
  getAllUsers(): UsersModel[] {
    const users = this.userServices.getAllUsers();
    return users;
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): UsersModel {
    return this.userServices.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDTO): UsersModel {
    return this.userServices.createUser(createUserDto);
  }
}
