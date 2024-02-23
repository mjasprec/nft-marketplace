import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NftCategory, NftStatus } from './nfts.model';

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

  @Column()
  owner: string;

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
