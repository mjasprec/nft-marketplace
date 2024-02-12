import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { UserGender, UserRole } from '../users.model';

export class CreateUserDTO {
  @Length(6, 30)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 30)
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  aboutMe: string;

  @IsDate()
  birthday: Date;

  @IsInt()
  @Min(0)
  @Max(1000000)
  wallet: number;

  nfts: [];

  @IsNotEmpty()
  gender: UserGender;
  role: UserRole;
}
