export interface Nfts {
  id: string;
  image: string;
  title: string;
  description: string;
  category: NftCategory;
  price: number;
  owner: string;
  creator: string;
  comments: any[];
}

export enum NftCategory {
  MUSIC = 'MUSIC',
  SPORTS = 'SPORTS',
  POLITICS = 'POLITICS',
  NATURE = 'NATURE',
  SPACE = 'SPACE',
}
