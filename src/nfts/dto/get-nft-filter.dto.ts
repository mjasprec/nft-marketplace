import { NftCategory } from '../nfts.model';

export class GetNftFilterDTO {
  title: string;
  description: string;
  category: NftCategory;
  owner: string;
  creator: string;
  searchTerm: string;
}
