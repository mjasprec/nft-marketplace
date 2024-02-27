import { Module } from '@nestjs/common';
import { NftsService } from './nfts.service';
import { NftsController } from './nfts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftEntity } from './nft.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([NftEntity]), AuthModule],
  providers: [NftsService],
  controllers: [NftsController],
})
export class NftsModule {}
