import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NftCategory, NftStatus } from './nfts-props.enum';
import { UserEntity } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class NftEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  category: NftCategory;

  @Column()
  price: number;

  // @Column()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => UserEntity, (user) => user.nfts, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: UserEntity;

  @Column()
  creator: string;

  @Column('text', { array: true, default: [] })
  comments?: any[];

  @Column({ default: NftStatus.ENABLED })
  status: NftStatus;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  deletedAt: Date | null;
}
