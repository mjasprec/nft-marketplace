import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserGender } from '../users.model';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @Length(6, 30)
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @MinLength(2)
  @MaxLength(255)
  aboutMe: string;

  @IsDateString()
  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  gender: UserGender;
}
