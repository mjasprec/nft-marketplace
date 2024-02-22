import { IsOptional, IsString } from 'class-validator';

export class GetUserFilterDTO {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  searchTerm?: string;
}
