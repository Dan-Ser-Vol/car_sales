import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { EntityManager } from 'typeorm';

import { IList } from '../../common/interface/list.interface';
import { CarPostEntity } from '../../database/entities/carPost.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { AccountTypeEnum } from '../user/enum/account-type.enum';
import { CarPostRepository } from './carPost.repository';
import { CarPostCreateDto } from './dto/request/carPost-create.dto';
import { CarPostUpdateDto } from './dto/request/carPost-update.dto';
import { PostListQueryRequestDto } from './dto/request/post-list-query.request.dto';
import { CarPostDetailsResponseDto } from './dto/response/carPost-details-response.dto';

@Injectable()
export class CarPostService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly carPostRepository: CarPostRepository,
  ) {}

  public async createPost(
    data: CarPostCreateDto,
    userId: string,
  ): Promise<CarPostDetailsResponseDto> {
    return await this.entityManager.transaction(async (em) => {
      const carPostRepository = em.getRepository(CarPostEntity);
      const userRepository = em.getRepository(UserEntity);
      const user = await userRepository.findOne({
        where: { id: userId },
        relations: { posts: true },
      });
      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }
      if (user.posts.length && user.accountType === AccountTypeEnum.BASIC) {
        throw new HttpException(
          'Users with a basic account cannot create more than one post. Please purchase a premium account',
          HttpStatus.FORBIDDEN,
        );
      }
      const newPost = carPostRepository.create({
        ...data,
        user: user,
      });

      return await carPostRepository.save(newPost);
    });
  }

  public async getAll(
    query: PostListQueryRequestDto,
  ): Promise<IList<CarPostEntity>> {
    const posts = await this.carPostRepository.getAll(query);
    if (!posts) {
      throw new HttpException('no posts', HttpStatus.NOT_FOUND);
    }
    return posts;
  }

  public async addImageToPost(
    postId: string,
    files: Express.Multer.File[],
  ): Promise<CarPostDetailsResponseDto> {
    try {
      const findPost = await this.carPostRepository.findOneBy({
        id: postId,
      });

      if (!findPost)
        throw new NotFoundException(`Car post with id ${postId} not found`);

      const fileNames = files.map((file) => file.filename);
      findPost.image = findPost.image.concat(fileNames);

      return await this.carPostRepository.save(findPost);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getCarPostById(
    postId: string,
  ): Promise<CarPostDetailsResponseDto> {
    return await this.findCarPostByIdOrException(postId);
  }

  public async getCarPostByUserId(
    userId: string,
  ): Promise<CarPostDetailsResponseDto[]> {
    const posts = await this.carPostRepository.find({
      where: { user: { id: userId } },
    });
    if (!posts.length) {
      throw new HttpException(
        'This user has no posts yet',
        HttpStatus.NOT_FOUND,
      );
    }
    return posts;
  }

  public async updateCarPost(
    postId: string,
    dto: CarPostUpdateDto,
  ): Promise<CarPostDetailsResponseDto> {
    const entity = await this.findCarPostByIdOrException(postId);
    this.carPostRepository.merge(entity, dto);
    return await this.carPostRepository.save(entity);
  }

  public async deleteImageFromPost(postId: string, image: any): Promise<void> {
    try {
      const filePath = path.resolve(__dirname, '../../', 'static', image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return;
      } else {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteCarPostById(postId: string): Promise<void> {
    const findPost = await this.findCarPostByIdOrException(postId);
    if (!findPost) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await this.carPostRepository.remove(findPost);
  }

  private async findCarPostByIdOrException(
    carId: string,
  ): Promise<CarPostEntity> {
    const car = await this.carPostRepository.findOneBy({ id: carId });
    if (!car) {
      throw new UnprocessableEntityException('Car entity not found');
    }
    return car;
  }
}
