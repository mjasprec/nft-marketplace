import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserGender, UserRole, UserStatus } from './user-prop.enum';
import { NftEntity } from 'src/nfts/nft.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
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

  // @Column('text', { array: true, default: [] })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((_type) => NftEntity, (nfts) => nfts.user, { eager: true })
  nfts: NftEntity[];

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
