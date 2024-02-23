import { Module } from '@nestjs/common';
import { NftsService } from './nfts.service';
import { NftsController } from './nfts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftEntity } from './nft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NftEntity])],
  providers: [NftsService],
  controllers: [NftsController],
})
export class NftsModule {}
