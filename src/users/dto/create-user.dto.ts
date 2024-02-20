import {
  IsEmail,
  IsNotEmpty,
  Length,
  MaxLength,
  Min,
  MinLength,
  IsNumber,
  Max,
  IsDate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { UserGender, UserRole } from '../users.model';

export class CreateUserDTO {
  @Length(6, 24)
  username: string;

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

  @IsDate()
  @IsNotEmpty()
  birthday: Date;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @Transform(({ value }) => Number(value))
  wallet: number;

  nfts: [];

  @IsNotEmpty()
  gender: UserGender;

  role: UserRole;
}
