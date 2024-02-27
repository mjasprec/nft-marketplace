import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { NftsModule } from './nfts/nfts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

console.log('PROCESS ENV', process.env.STAGE);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`env.${process.env.STAGE}`],
    }),
    UsersModule,
    NftsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nft-marketplace',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
