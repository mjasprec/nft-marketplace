import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersModel } from './users.model';
import { CreateUserDTO } from './dto/create-user.dto';
import { GetUserFilterDTO } from './dto/get-user-filter.dto';

@Controller('users')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Get()
  getUsers(@Query() filterUsersDto: GetUserFilterDTO): UsersModel[] {
    if (Object.keys(filterUsersDto).length > 0) {
      return this.userServices.getUsersWithFilter(filterUsersDto);
    }

    return this.userServices.getUsers();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): UsersModel {
    return this.userServices.getUserById(id);
  }

  @Delete('/:id')
  deleteUserById(@Param('id') id: string): UsersModel[] {
    return this.userServices.deleteUserById(id);
  }

  @Patch('/:id')
  updateUserById(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDTO,
  ): UsersModel {
    return this.userServices.updateUserById(id, createUserDto);
  }

  @Patch('/:id/email')
  updateUserEmail(
    @Param('id') id: string,
    @Body('email') email: string,
  ): UsersModel {
    return this.userServices.updateUserEmail(id, email);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDTO): UsersModel {
    return this.userServices.createUser(createUserDto);
  }
}
