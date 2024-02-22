import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  // Delete,

  // Patch,

  // Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { CreateUserDTO } from './dto/create-user.dto';
// import { CreateUserDTO } from './dto/create-user.dto';
// import { GetUserFilterDTO } from './dto/get-user-filter.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Get()
  getUsers(): Promise<UsersEntity[]> {
    return this.userServices.getUsers();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<UsersEntity> {
    return this.userServices.getUserById(id);
  }

  @Delete('/:id')
  deleteUserById(@Param('id') id: string): Promise<UsersEntity> {
    return this.userServices.deleteUserById(id);
  }

  @Post('/')
  createUser(@Body() createUserDto: CreateUserDTO): Promise<UsersEntity> {
    return this.userServices.createUser(createUserDto);
  }
}
