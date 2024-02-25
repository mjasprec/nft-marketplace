import {
  Column,
  // DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { UserGender, UserRole, UserStatus } from './user-prop.enum';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
