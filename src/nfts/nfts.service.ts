import { Injectable } from '@nestjs/common';
import { NftModel, NftCategory } from './nfts.model';

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

  getAllNfts() {
    return this.NFTS;
  }
}
