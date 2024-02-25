import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserGender, UserRole, UserStatus } from './user-prop.enum';

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

  @Column({ default: UserRole.USER })
  role: UserRole;

  @Column({ default: UserStatus.ACTIVE })
  status: UserStatus;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  deletedAt: Date | null;
}
