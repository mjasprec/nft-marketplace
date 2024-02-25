import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { NftEntity } from './nft.entity';
import { CreateNftDTO } from './dto/create-nft.dto';
import { NftStatus } from './nfts-props.enum';
import { UserEntity } from 'src/auth/user.entity';

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
