import { Injectable } from '@nestjs/common';
import { NftModel, NftCategory } from './nfts.model';
import { v4 as uuid } from 'uuid';
import { CreateNftDTO } from './dto/create-nft.dto';
import { GetNftFilterDTO } from './dto/get-nft-filter.dto';

@Injectable()
export class NftsService {
  private NFTS: NftModel[] = [
    {
      id: '1',
      image: 'http://testimage.net',
      title: 'Conor McGregor',
      description: 'MMA Fighter',
      category: NftCategory.SPORTS,
      price: 300,
      owner: 'MMAGuru',
      creator: 'MMAGuru',
      comments: ['comment 1', 'comment 2'],
    },
  ];

  getNfts(): NftModel[] {
    return this.NFTS;
  }

  getNftsWithFilter(getNftsWithFilter: GetNftFilterDTO): NftModel[] {
    const { title, description, category, owner, creator, searchTerm } =
      getNftsWithFilter;

    let allNfts = this.getNfts();

    if (title) {
      allNfts = allNfts.filter(
        (nft) => nft.title.toLowerCase() === title.toLowerCase(),
      );
    }

    if (description) {
      allNfts = allNfts.filter(
        (nft) => nft.description.toLowerCase() === description.toLowerCase(),
      );
    }

    if (category) {
      allNfts = allNfts.filter(
        (nft) => nft.category === category.toUpperCase(),
      );
    }

    if (owner) {
      allNfts = allNfts.filter(
        (nft) => nft.owner.toLowerCase() === owner.toLowerCase(),
      );
    }

    if (creator) {
      allNfts = allNfts.filter(
        (nft) => nft.creator.toLowerCase() === creator.toLowerCase(),
      );
    }

    if (searchTerm) {
      allNfts = allNfts.filter((nft) => {
        if (
          nft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          nft.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          nft.category.includes(searchTerm.toUpperCase()) ||
          nft.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
          nft.creator.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true;
        }

        return false;
      });
    }

    return allNfts;
  }

  getNftById(id: string): NftModel {
    return this.getNfts().find((nft) => nft.id === id);
  }

  deleteNftById(id: string): NftModel[] {
    const updatedNfts = this.getNfts().filter((nft) => nft.id !== id);

    return this.NFTS.splice(0, this.NFTS.length, ...updatedNfts);
  }

  createNft(createNftDto: CreateNftDTO): NftModel {
    const { image, title, description, category, price, owner, creator } =
      createNftDto;

    const newNft: NftModel = {
      id: uuid(),
      image,
      title,
      description,
      category,
      price,
      owner,
      creator,
      comments: [],
    };

    this.NFTS.push(newNft);

    return newNft;
  }
}
