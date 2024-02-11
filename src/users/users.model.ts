export interface Users {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  aboutMe: string;
  birthday: Date;
  wallet: number;
  nfts: any[];
  gender: UserGender;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum UserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
