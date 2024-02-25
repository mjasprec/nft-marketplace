import { UserEntity } from 'src/auth/user.entity';
import { NftCategory } from '../nfts-props.enum';
import { IsOptional, IsString } from 'class-validator';

export class GetNftFilterDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  category?: NftCategory;

  @IsOptional()
  user?: UserEntity;

  @IsOptional()
  @IsString()
  searchTerm?: string;
}
