import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  // Delete,
} from '@nestjs/common';
import { NftsService } from './nfts.service';
import { CreateNftDTO } from './dto/create-nft.dto';
import { NftEntity } from './nft.entity';

// import { GetNftFilterDTO } from './dto/get-nft-filter.dto';

@Controller('nfts')
export class NftsController {
  constructor(private nftsServices: NftsService) {}

  @Get('/')
  getNfts(): Promise<NftEntity[]> {
    return this.nftsServices.getNfts();
  }

  @Get('/:id')
  getNftById(@Param('id') id: string): Promise<NftEntity> {
    return this.nftsServices.getNftByID(id);
  }

  @Post('/')
  createNft(@Body() createNftDto: CreateNftDTO): Promise<NftEntity> {
    return this.nftsServices.createNft(createNftDto);
  }
}
