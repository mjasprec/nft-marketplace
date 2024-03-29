import {
  IsEmail,
  IsNotEmpty,
  Length,
  MaxLength,
  Min,
  MinLength,
  IsNumber,
  Max,
  // // IsDate,
  IsDateString,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { UserGender, UserRole, UserStatus } from '../user-prop.enum';

export class AuthCredentialsDto {
  @IsString()
  @Length(6, 24)
  username: string;

  @IsString()
  @Length(6, 30)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is weak. Must include 1 lower and upper case letter',
  })
  password: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(255)
  aboutMe: string;

  @IsDateString()
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

  status: UserStatus;
}
