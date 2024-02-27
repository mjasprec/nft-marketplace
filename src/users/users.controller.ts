import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Patch,
  Query,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserFilterDTO } from './dto/get-user-filter.dto';

@Controller('users')
export class UsersController {
  private logger = new Logger('UsersController');
  constructor(private userServices: UsersService) {}

  @Get()
  getUsers(
    @Query() getUserFilterDTO: GetUserFilterDTO,
  ): Promise<UsersEntity[]> {
    return this.userServices.getUsers(getUserFilterDTO);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<UsersEntity> {
    return this.userServices.getUserById(id);
  }

  @Delete('/:id')
  deleteUserById(@Param('id') id: string): Promise<UsersEntity> {
    return this.userServices.deleteUserById(id);
  }

  @Post('/:id')
  recoverUserById(@Param('id') id: string): Promise<UsersEntity> {
    return this.userServices.recoverUserById(id);
  }

  @Patch('/:id')
  updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UsersEntity> {
    return this.userServices.updateUser(id, updateUserDto);
  }
}
