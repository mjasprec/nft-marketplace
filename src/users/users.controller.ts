import {
  Controller,
  Get,
  Param,
  // Body,
  // Delete,

  // Patch,
  // Post,
  // Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
// import { CreateUserDTO } from './dto/create-user.dto';
// import { GetUserFilterDTO } from './dto/get-user-filter.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<UsersEntity> {
    console.log('UsersService');
    return this.userServices.getUserById(id);
  }
}
