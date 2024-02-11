import { NftCategory } from '../nfts.model';

export class CreateNftDTO {
  image: string;
  title: string;
  description: string;
  category: NftCategory;
  price: number;
  owner: string;
  creator: string;
}
