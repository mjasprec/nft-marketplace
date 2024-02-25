import { UserEntity } from 'src/auth/user.entity';
import { NftCategory } from '../nfts-props.enum';

export class GetNftFilterDTO {
  title?: string;
  description?: string;
  category?: NftCategory;
  user?: UserEntity;
  creator?: string;
  searchTerm?: string;
}
