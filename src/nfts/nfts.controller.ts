import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
  Logger,
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
  private logger = new Logger('NftsController');
  constructor(private nftsServices: NftsService) {}

  @Get('/')
  getNfts(
    @Query() getNftFilterDTO: GetNftFilterDTO,
    @GetUser() user: UserEntity,
  ): Promise<NftEntity[]> {
    this.logger.verbose(
      `User: ${user.firstName} retrieving all NFTs.. filtered by: ${JSON.stringify(getNftFilterDTO)}`,
    );
    return this.nftsServices.getNfts(getNftFilterDTO, user);
  }

  @Get('/:id')
  getNftById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<NftEntity> {
    this.logger.verbose(`User: ${user.firstName} retrieving NFT ID: ${id}`);
    return this.nftsServices.getNftByID(id, user);
  }

  @Delete('/:id')
  deleteNftById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<NftEntity> {
    this.logger.verbose(`User: ${user.firstName} deleting NFT ID: ${id}`);
    return this.nftsServices.deleteNftByID(id, user);
  }

  @Post('/:id')
  recoverNft(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<NftEntity> {
    this.logger.verbose(`User: ${user.firstName} recovering NFT ID: ${id}`);
    return this.nftsServices.recoverNft(id, user);
  }

  @Post('/')
  createNft(
    @Body() createNftDto: CreateNftDTO,
    @GetUser() user: UserEntity,
  ): Promise<NftEntity> {
    this.logger.verbose(
      `User: ${user.firstName} creating a new NFT: ${JSON.stringify(createNftDto)}`,
    );
    return this.nftsServices.createNft(createNftDto, user);
  }
}
