import { Injectable } from '@nestjs/common';
import { NftModel, NftCategory } from './nfts.model';
import { v4 as uuid } from 'uuid';
import { CreateNftDTO } from './dto/create-nft.dto';

@Injectable()
export class NftsService {
  private NFTS: NftModel[] = [
    {
      id: '1',
      image: 'http://testimage.net',
      title: 'Conor McGregor',
      description: 'MMA Fighter',
      category: NftCategory.SPORTS,
      price: 300,
      owner: 'MMAGuru',
      creator: 'MMAGuru',
      comments: ['comment 1', 'comment 2'],
    },
  ];

  getAllNfts(): NftModel[] {
    return this.NFTS;
  }

  getNftById(id: string): NftModel {
    return this.getAllNfts().find((nft) => nft.id === id);
  }

  createNft(createNftDto: CreateNftDTO): NftModel {
    const { image, title, description, category, price, owner, creator } =
      createNftDto;

    const newNft: NftModel = {
      id: uuid(),
      image,
      title,
      description,
      category,
      price,
      owner,
      creator,
      comments: [],
    };

    this.NFTS.push(newNft);

    return newNft;
  }
}
