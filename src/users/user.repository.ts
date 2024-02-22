import { DataSource, Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
  constructor(private dataSource: DataSource) {
    super(UsersEntity, dataSource.createEntityManager());
  }

  async getUserById(id: string) {
    const isMatchedUser = await this.findOne({ where: { id } });

    if (!isMatchedUser) {
      throw new NotFoundException('User not found');
    }

    return isMatchedUser;
  }
}
