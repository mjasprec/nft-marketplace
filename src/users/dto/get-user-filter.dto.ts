import { IsOptional, IsString } from 'class-validator';
import { UserGender } from '../users-prop.enum';

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

  @IsOptional()
  @IsString()
  gender: UserGender;
}
