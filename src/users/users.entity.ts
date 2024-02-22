import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserGender, UserRole, UserStatus } from './users-prop.enum';

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  aboutMe: string;

  @Column()
  birthday: Date;

  @Column()
  wallet: number;

  @Column('text', { array: true, default: [] })
  nfts: string[];

  @Column()
  gender: UserGender;

  @Column()
  role: UserRole;

  @Column()
  status: UserStatus;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  deletedAt: Date | null;

  @DeleteDateColumn({
    name: 'is_deleted_at',
    type: 'boolean',
    default: false,
    nullable: true,
  })
  isDeleted: boolean | null;
}
