import { NftCategory } from '../nfts-props.enum';

export class GetNftFilterDTO {
  title?: string;
  description?: string;
  category?: NftCategory;
  user?: string;
  creator?: string;
  searchTerm?: string;
}
