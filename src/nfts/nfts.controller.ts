import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NftsService } from './nfts.service';
import { CreateNftDTO } from './dto/create-nft.dto';
import { NftEntity } from './nft.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('nfts')
@UseGuards(AuthGuard())
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

  @Delete('/:id')
  deleteNftById(@Param('id') id: string): Promise<NftEntity> {
    return this.nftsServices.deleteNftByID(id);
  }

  @Post('/:id')
  recoverNft(@Param('id') id: string): Promise<NftEntity> {
    return this.nftsServices.recoverNft(id);
  }

  @Post('/')
  createNft(@Body() createNftDto: CreateNftDTO): Promise<NftEntity> {
    return this.nftsServices.createNft(createNftDto);
  }
}
