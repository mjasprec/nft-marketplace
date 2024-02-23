export interface NftModel {
  id: string;
  image: string;
  title: string;
  description: string;
  category: NftCategory;
  price: number;
  owner: string;
  creator: string;
  comments?: any[];
  status: NftStatus;
}

export enum NftStatus {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

export enum NftCategory {
  MUSIC = 'MUSIC',
  SPORTS = 'SPORTS',
  POLITICS = 'POLITICS',
  NATURE = 'NATURE',
  SPACE = 'SPACE',
}
