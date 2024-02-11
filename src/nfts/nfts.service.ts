import { Injectable } from '@nestjs/common';

@Injectable()
export class NftsService {
  private NFTS = [
    {
      title: 'Dragon',
    },
    {
      title: 'Lizard',
    },
    {
      title: 'Eagle',
    },
    {
      title: 'Elephant',
    },
    {
      title: 'Wolf',
    },
  ];

  getAllNfts() {
    return this.NFTS;
  }
}
