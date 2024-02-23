import { Transform } from 'class-transformer';
import { NftCategory, NftStatus } from '../nfts.model';

import { IsNotEmpty, Length, Min, Max, IsNumber } from 'class-validator';

export class CreateNftDTO {
  @IsNotEmpty()
  image: string;

  @Length(4, 65)
  title: string;

  @Length(0, 255)
  description: string;

  @IsNotEmpty()
  category: NftCategory;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @Transform(({ value }) => Number(value))
  price: number;

  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  creator: string;

  status: NftStatus;
}
