import { Body, Controller, Get, Post } from '@nestjs/common';
import { NftsService } from './nfts.service';
import { NftModel } from './nfts.model';

@Controller('nfts')
export class NftsController {
  constructor(private NftsServices: NftsService) {}

  @Get()
  getAllNfts(): NftModel[] {
    const NFTS = this.NftsServices.getAllNfts();
    console.log(NFTS);
    return NFTS;
  }

  @Post()
  createNft(@Body() body): NftModel {
    console.log('body', body);
    return this.NftsServices.createNft(body);
  }
}
