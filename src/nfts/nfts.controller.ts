import { Controller, Get } from '@nestjs/common';
import { NftsService } from './nfts.service';

@Controller('nfts')
export class NftsController {
  constructor(private NftsServices: NftsService) {}

  @Get()
  getAllNfts() {
    const NFTS = this.NftsServices.getAllNfts();
    console.log(NFTS);
    return NFTS;
  }
}
