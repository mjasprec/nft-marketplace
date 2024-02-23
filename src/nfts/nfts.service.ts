import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { NftEntity } from './nft.entity';
import { CreateNftDTO } from './dto/create-nft.dto';
import {
  // NftCategory,
  NftStatus,
} from './nfts.model';
// import { v4 as uuid } from 'uuid';
// import { CreateNftDTO } from './dto/create-nft.dto';
// import { GetNftFilterDTO } from './dto/get-nft-filter.dto';

@Injectable()
export class NftsService extends Repository<NftEntity> {
  constructor(private dataSource: DataSource) {
    super(NftEntity, dataSource.createEntityManager());
  }

  async getNfts(): Promise<NftEntity[]> {
    return await this.find({
      where: {
        status: NftStatus.ENABLED,
        deletedAt: null,
      },
    });
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

    const nftAfterRemoval = await this.softRemove(matchedNft);

    console.log('nftAfterRemoval', nftAfterRemoval);
    console.log('matchedNft', matchedNft);

    return matchedNft;
  }

  async createNft(createNftDto: CreateNftDTO): Promise<NftEntity> {
    const { image, title, description, category, owner, creator } =
      createNftDto;

    const price = Number(createNftDto.price);

    const newNft = this.create({
      image,
      title,
      description,
      category,
      price,
      owner,
      creator,
      comments: [],
      status: NftStatus.ENABLED,
    });

    await this.save(newNft);

    console.log('newNft', newNft);

    return newNft;
  }
}
