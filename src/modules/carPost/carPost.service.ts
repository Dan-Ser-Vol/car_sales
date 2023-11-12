import { Injectable, NotFoundException } from '@nestjs/common';

import { FilesService } from '../files/files.service';
import { UserRepository } from '../user/user.repository';
import { CarPostRepository } from './carPost.repository';
import { CarPostCreateDto } from './dto/request/carPost-create.dto';
import { CarPostDetailsResponseDto } from './dto/response/carPost-details-response.dto';

@Injectable()
export class CarPostService {
  constructor(
    private readonly carPostRepository: CarPostRepository,
    private readonly userRepository: UserRepository,
    private readonly filesService: FilesService,
  ) {}

  async createPost(
    data: CarPostCreateDto,
    userId: string,
  ): Promise<CarPostDetailsResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const newPost = this.carPostRepository.create({
      ...data,
      user: user,
    });

    return await this.carPostRepository.save(newPost);
  }

  // public async addImageToPost(postId: number, image: any): Promise<CarPostEntity> {
  //   try {
  //     const fileName = await this.fileService.createFile(image);
  //
  //     // Отримати існуючий пост за його ідентифікатором
  //     const existingPost = await this.carPostRepository.findOne(postId);
  //
  //     // Перевірити, чи знайдено пост
  //     if (!existingPost) {
  //       // Обробити помилку, якщо пост не знайдено
  //       throw new NotFoundException(`Car post with id ${postId} not found`);
  //     }
  //
  //     // Оновити пост і додати ім'я файлу зображення
  //     existingPost.image = fileName;
  //
  //     // Зберегти оновлений пост
  //     const updatedPost = await this.carPostRepository.save(existingPost);
  //
  //     return updatedPost;
  //   } catch (err) {
  //     // Обробити помилку
  //     throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }

  // public async getCarPostById(carId: string): Promise<CarPostEntity> {
  //   return await this.findCarPostByIdOrException(carId);
  // }
  //
  // public async updateCar(
  //   carId: string,
  //   dto: CarPostUpdateDto,
  // ): Promise<CarPostEntity> {
  //   const entity = await this.findCarPostByIdOrException(carId);
  //   this.carPostRepository.merge(entity, dto);
  //   return await this.carPostRepository.save(entity);
  // }
  //
  //
  //
  // public async deleteCarPost(carId: string): Promise<void> {
  //   const entity = await this.findCarPostByIdOrException(carId);
  //   await this.carPostRepository.remove(entity);
  // }
  //
  // private async findCarPostByIdOrException(
  //   carId: string,
  // ): Promise<CarPostEntity> {
  //   const car = await this.carPostRepository.findOneBy({ id: carId });
  //   if (!car) {
  //     throw new UnprocessableEntityException('Car entity not found');
  //   }
  //   return car;
  // }
}
