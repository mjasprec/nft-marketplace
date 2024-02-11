import { Body, Controller, Get, Post } from '@nestjs/common';
import { NftsService } from './nfts.service';
import { NftModel } from './nfts.model';
import { CreateNftDTO } from './dto/create-nft.dto';

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
  createNft(@Body() createNftDto: CreateNftDTO): NftModel {
    return this.NftsServices.createNft(createNftDto);
  }
}
