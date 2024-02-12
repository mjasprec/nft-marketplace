import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NftsService } from './nfts.service';
import { NftModel } from './nfts.model';
import { CreateNftDTO } from './dto/create-nft.dto';
import { GetNftFilterDTO } from './dto/get-nft-filter.dto';

@Controller('nfts')
export class NftsController {
  constructor(private NftsServices: NftsService) {}

  @Get()
  getAllNfts(@Param() getNftFilterDTO: GetNftFilterDTO): NftModel[] {
    if (Object.keys(getNftFilterDTO).length > 0) {
      return this.NftsServices.getNftsWithFilter(getNftFilterDTO);
    } else {
      return this.NftsServices.getNfts();
    }
  }

  @Get('/:id')
  getNftById(@Param('id') id: string): NftModel {
    return this.NftsServices.getNftById(id);
  }

  @Delete('/:id')
  deleteNftById(@Param('id') id: string): NftModel[] {
    return this.NftsServices.deleteNftById(id);
  }

  @Post()
  createNft(@Body() createNftDto: CreateNftDTO): NftModel {
    return this.NftsServices.createNft(createNftDto);
  }
}
