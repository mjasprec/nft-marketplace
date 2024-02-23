import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column()
  comments?: any[];

  @Column()
  status: NftStatus;
}
