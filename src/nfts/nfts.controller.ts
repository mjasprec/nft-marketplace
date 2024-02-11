import { Controller, Get } from '@nestjs/common';
import { NftsService } from './nfts.service';

@Controller('nfts')
export class NftsController {
  constructor(private NftsServices: NftsService) {}

  @Get()
  getAllNfts() {
    return this.NftsServices.getAllNfts();
  }
}
