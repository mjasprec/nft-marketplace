import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserGender, UserRole, UserStatus } from './users.model';

@Entity()
export class UserEntity {
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

  @Column()
  nfts: any[];

  @Column()
  gender: UserGender;

  @Column()
  role: UserRole;

  @Column()
  status: UserStatus;
}
