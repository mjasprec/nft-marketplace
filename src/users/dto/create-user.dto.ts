import { UserGender, UserRole } from '../users.model';

export class CreateUserDTO {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  aboutMe: string;
  birthday: string;
  wallet: number;
  nfts: [];
  gender: UserGender;
  role: UserRole;
}
