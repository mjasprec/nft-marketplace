import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { NftsService } from './nfts.service';
import { CreateNftDTO } from './dto/create-nft.dto';
import { NftEntity } from './nft.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { GetNftFilterDTO } from './dto/get-nft-filter.dto';

@Controller('nfts')
@UseGuards(AuthGuard())
export class NftsController {
  constructor(private nftsServices: NftsService) {}

  @Get('/')
  getNfts(
    @Query() getNftFilterDTO: GetNftFilterDTO,
    @GetUser() user: UserEntity,
  ): Promise<NftEntity[]> {
    return this.nftsServices.getNfts(getNftFilterDTO, user);
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
  createNft(
    @Body() createNftDto: CreateNftDTO,
    @GetUser() user: UserEntity,
  ): Promise<NftEntity> {
    return this.nftsServices.createNft(createNftDto, user);
  }
}
