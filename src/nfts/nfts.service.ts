import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { NftEntity } from './nft.entity';
import { CreateNftDTO } from './dto/create-nft.dto';
import {
  // NftCategory,
  NftStatus,
} from './nfts-props.enum';
import { UserEntity } from 'src/auth/user.entity';
import { GetNftFilterDTO } from './dto/get-nft-filter.dto';

@Injectable()
export class NftsService extends Repository<NftEntity> {
  constructor(private dataSource: DataSource) {
    super(NftEntity, dataSource.createEntityManager());
  }

  async getNfts(
    getNftFilterDTO: GetNftFilterDTO,
    userEntity: UserEntity,
  ): Promise<NftEntity[]> {
    const { title, description, category, user, searchTerm } = getNftFilterDTO;

    console.log('userEntity', userEntity);

    const query = this.createQueryBuilder('nfts');

    if (title) {
      query.where('LOWER(nfts.title) = LOWER(:title)', {
        title,
      });
    }

    if (description) {
      query.where('LOWER(nfts.description) = LOWER(:description)', {
        description: `%${description}%`,
      });
    }

    if (category) {
      query.where('LOWER(nfts.category) = LOWER(:category)', {
        category,
      });
    }

    if (user) {
      query.where('LOWER(nfts.user) = LOWER(:user)', {
        user,
      });
    }

    if (searchTerm) {
      query.where(
        'LOWER(nfts.title) LIKE LOWER(:searchTerm) OR LOWER(nfts.description) LIKE LOWER(:searchTerm) OR LOWER(nfts.category) LIKE LOWER(:searchTerm) OR LOWER(nfts.user) LIKE LOWER(:searchTerm)',
        {
          searchTerm: `%${searchTerm}%`,
        },
      );
    }

    query.andWhere('nfts.status = :status', { status: NftStatus.ENABLED });
    query.andWhere({ user: userEntity });

    const nfts = await query.getMany();

    return nfts;
  }

  async getNftByID(id: string): Promise<NftEntity> {
    const matchedNft = await this.findOne({ where: { id } });

    if (!matchedNft) {
      throw new NotFoundException('No matching NFT found');
    }

    return matchedNft;
  }

  async deleteNftByID(id: string): Promise<NftEntity> {
    const matchedNft = await this.getNftByID(id);

    matchedNft.status = NftStatus.DISABLED;

    await this.softRemove(matchedNft);

    return matchedNft;
  }

  async recoverNft(id: string): Promise<NftEntity> {
    const matchedNft = await this.findOne({
      where: { id: id },
      withDeleted: true,
    });

    await this.recover(matchedNft);

    return matchedNft;
  }

  async createNft(
    createNftDto: CreateNftDTO,
    user: UserEntity,
  ): Promise<NftEntity> {
    const { image, title, description, category, creator } = createNftDto;

    const price = Number(createNftDto.price);

    const newNft = this.create({
      image,
      title,
      description,
      category,
      price,
      user,
      creator,
      comments: [],
    });

    await this.save(newNft);

    console.log('newNft', newNft);

    return newNft;
  }
}
