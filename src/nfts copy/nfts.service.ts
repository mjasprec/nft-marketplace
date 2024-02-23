import { Injectable, NotFoundException } from '@nestjs/common';
import { NftModel, NftCategory, NftStatus } from './nfts.model';
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
      status: NftStatus.ENABLED,
    },
  ];

  getNfts(): NftModel[] {
    return this.NFTS;
  }

  getNftsWithFilter(getNftsWithFilter: GetNftFilterDTO): NftModel[] {
    const { title, description, category, owner, creator, searchTerm } =
      getNftsWithFilter;

    let allNfts = this.getNfts();
    let isMatch = false;

    if (title) {
      allNfts = allNfts.filter(
        (nft) => nft.title.toLowerCase() === title.toLowerCase(),
      );

      isMatch = Boolean(allNfts.length);
    }

    if (description) {
      allNfts = allNfts.filter(
        (nft) => nft.description.toLowerCase() === description.toLowerCase(),
      );
      isMatch = Boolean(allNfts.length);
    }

    if (category) {
      allNfts = allNfts.filter(
        (nft) => nft.category === category.toUpperCase(),
      );
      isMatch = Boolean(allNfts.length);
    }

    if (owner) {
      allNfts = allNfts.filter(
        (nft) => nft.owner.toLowerCase() === owner.toLowerCase(),
      );
      isMatch = Boolean(allNfts.length);
    }

    if (creator) {
      allNfts = allNfts.filter(
        (nft) => nft.creator.toLowerCase() === creator.toLowerCase(),
      );
      isMatch = Boolean(allNfts.length);
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
          isMatch = true;
          return true;
        }

        isMatch = true;
        return false;
      });
    }

    return isMatch ? allNfts : [];
  }

  getNftById(id: string): NftModel {
    const matchedNft = this.getNfts().find((nft) => nft.id === id);

    if (!matchedNft) {
      throw new NotFoundException('NFT not found/does not exist.');
    }

    return matchedNft;
  }

  deleteNftById(id: string): NftModel[] {
    // const updatedNfts = this.getNfts().filter((nft) => nft.id !== id);

    // return this.NFTS.splice(0, this.NFTS.length, ...updatedNfts);

    const isMatchedNft = this.getNftById(id);

    return this.NFTS.filter((nft) => nft.id !== isMatchedNft.id);
  }

  createNft(createNftDto: CreateNftDTO): NftModel {
    const { image, title, description, category, owner, creator } =
      createNftDto;

    const price = Number(createNftDto.price);

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
      status: NftStatus.ENABLED,
    };

    this.NFTS.push(newNft);

    return newNft;
  }
}
