import {
  // EntityRepository,
  Repository,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';

// @EntityRepository() deprecated
@Injectable()
export class UserRepository extends Repository<UserEntity> {}
