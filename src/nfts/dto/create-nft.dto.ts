import { NftCategory } from '../nfts.model';

import { IsNotEmpty, Length, IsInt, Min, Max } from 'class-validator';

export class CreateNftDTO {
  @IsNotEmpty()
  image: string;

  @Length(4, 65)
  title: string;

  @Length(0, 255)
  description: string;
  category: NftCategory;

  @IsInt()
  @Min(0)
  @Max(500)
  price: number;

  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  creator: string;
}
