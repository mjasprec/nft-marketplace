import {
  // IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserGender } from '../users-prop.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Length(6, 30)
  password: string;

  @IsOptional()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(255)
  aboutMe: string;

  @IsOptional()
  // @IsDateString()
  @IsNotEmpty()
  birthday: string;

  @IsOptional()
  @IsNotEmpty()
  gender: UserGender;
}
