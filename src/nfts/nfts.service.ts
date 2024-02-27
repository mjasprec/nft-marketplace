import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { NftEntity } from './nft.entity';
import { CreateNftDTO } from './dto/create-nft.dto';
import { NftStatus } from './nfts-props.enum';
import { UserEntity } from 'src/auth/user.entity';
import { GetNftFilterDTO } from './dto/get-nft-filter.dto';

@Injectable()
export class NftsService extends Repository<NftEntity> {
  private logger = new Logger('NftsController');

  constructor(private dataSource: DataSource) {
    super(NftEntity, dataSource.createEntityManager());
  }

  async getNfts(
    getNftFilterDTO: GetNftFilterDTO,
    userEntity: UserEntity,
  ): Promise<NftEntity[]> {
    this.logger.verbose(
      `User: ${userEntity.firstName} retrieving all NFTs.. filtered by: ${JSON.stringify(getNftFilterDTO)}`,
    );
    try {
      const { title, description, category, user, searchTerm } =
        getNftFilterDTO;

      const query = this.createQueryBuilder('nfts');

      if (title) {
        query.where('LOWER(nfts.title) LIKE LOWER(:title)', {
          title,
        });
      }

      if (description) {
        query.where('LOWER(nfts.description) LIKE LOWER(:description)', {
          description: `%${description}%`,
        });
      }

      if (category) {
        query.where('LOWER(nfts.category) = LOWER(:category)', {
          category,
        });
      }

      if (user) {
        query.where('LOWER(nfts.user) LIKE LOWER(:user)', {
          user,
        });
      }

      // ? find nfts by user

      if (searchTerm) {
        query.where(
          'LOWER(nfts.title) LIKE LOWER(:searchTerm) OR LOWER(nfts.description) LIKE LOWER(:searchTerm) OR LOWER(nfts.category) LIKE LOWER(:searchTerm)',
          {
            searchTerm: `%${searchTerm}%`,
          },
        );
      }

      query.andWhere('nfts.status = :status', { status: NftStatus.ENABLED });
      query.andWhere({ user: userEntity });

      const nfts = await query.getMany();

      return nfts;
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException('No matching NFT found');
    }
  }

  async getNftByID(id: string, user: UserEntity): Promise<NftEntity> {
    this.logger.verbose(`User: ${user.firstName} retrieving NFT ID: ${id}`);
    try {
      const matchedNft = await this.findOne({ where: { id, user } });

      if (!matchedNft) {
        throw new NotFoundException('No matching NFT found');
      }

      this.logger.verbose(`Matching NFT: ${matchedNft.id}`);

      return matchedNft;
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException('No matching id/Invalid id');
    }
  }

  async deleteNftByID(id: string, user: UserEntity): Promise<NftEntity> {
    this.logger.verbose(`User: ${user.firstName} deleting NFT ID: ${id}`);
    try {
      const matchedNft = await this.getNftByID(id, user);

      matchedNft.status = NftStatus.DISABLED;

      await this.softRemove(matchedNft);

      this.logger.verbose(`Successfully deleted NFT with the id ${id}`);

      return matchedNft;
    } catch (error) {
      this.logger.error(`Failed to delete: ${error.message}`);
      throw new NotFoundException('No matching NFT found');
    }
  }

  async recoverNft(id: string, user: UserEntity): Promise<NftEntity> {
    try {
      const matchedNft = await this.findOne({
        where: { id, user },
        withDeleted: true,
      });

      this.logger.verbose(`Successfully recovered NFT`);

      await this.recover(matchedNft);

      return matchedNft;
    } catch (error) {
      this.logger.error(`Failed to recover: ${error.message}`);
      throw new InternalServerErrorException();
    }
  }

  async createNft(
    createNftDto: CreateNftDTO,
    user: UserEntity,
  ): Promise<NftEntity> {
    this.logger.verbose(`User: ${user.firstName} creating a new NFT`);

    try {
      const { image, title, description, category, creator } = createNftDto;

      const price = Number(createNftDto.price);

      const newNft = this.create({
        image,
        title,
        description,
        category,
        price,
        user,
        creator,
        comments: [],
      });

      await this.save(newNft);

      this.logger.verbose(`created new NFT: ${JSON.stringify(newNft)}`);

      return newNft;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
