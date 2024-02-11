import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { NftsModule } from './nfts/nfts.module';

@Module({
  imports: [UsersModule, NftsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
