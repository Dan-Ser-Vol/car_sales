import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BodyTypeEnum } from '../../modules/carPost/enum/body-type.enum';
import { CarBrandsEnum } from '../../modules/carPost/enum/car-brands.enum';
import { CurrencyEnum } from '../../modules/carPost/enum/currensy.enum';
import { StatusCarEnum } from '../../modules/carPost/enum/status.enum';
import { CreateUpdateModel } from './common/create.update.entity';
import { UserEntity } from './user.entity';

@Entity('carPost')
export class CarPostEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the car' })
  id: string;

  @IsString()
  @Column({ type: 'varchar', enum: CarBrandsEnum, default: CarBrandsEnum.Audi })
  @ApiProperty({ example: 'Renault', description: 'The brand of the car' })
  brand: CarBrandsEnum;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: 'Logan', description: 'The model of the car' })
  model: string;

  @Column({ type: 'integer' })
  @ApiProperty({ example: 1963, description: 'The age of the car' })
  @IsNumber()
  year: number;

  @Column({ type: 'varchar', array: true, default: [] })
  @ApiProperty({
    example: 'toyota45w5w.png',
    description: 'The image of the car',
  })
  @IsString()
  image: string[];

  @Column({ type: 'integer', nullable: true, default: 0 })
  @Min(0)
  @ApiProperty({ example: 50000, description: 'The mileage of the car' })
  mileage: number;

  @Column({
    type: 'enum',
    enum: BodyTypeEnum,
    default: BodyTypeEnum.SEDAN,
  })
  @ApiProperty({
    enum: BodyTypeEnum,
    default: BodyTypeEnum.WAGON,
    description: 'The body type of the car',
  })
  bodyType: BodyTypeEnum;

  @Column({
    type: 'enum',
    enum: StatusCarEnum,
    default: StatusCarEnum.USED,
  })
  @ApiProperty({
    enum: StatusCarEnum,
    default: StatusCarEnum.NEW,
    description: 'The status of the car',
  })
  status: StatusCarEnum;

  @Column({ type: 'integer', nullable: true })
  @ApiProperty({ example: 20000, description: 'The price of the car' })
  price: number;

  @Column({
    type: 'enum',
    enum: CurrencyEnum,
    default: CurrencyEnum.UAH,
  })
  @ApiProperty({
    enum: CurrencyEnum,
    default: CurrencyEnum.UAH,
    description: 'The currency of the car price',
  })
  currency: CurrencyEnum;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({ example: false, description: 'Whether the car is sold' })
  sold: boolean;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ example: 'Paris', description: 'The region of the car' })
  region: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    example: 'This Audi A3 is a compact luxury sedan manufactured...',
    description: 'Detailed description of the car',
  })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (entity) => entity.posts)
  @JoinColumn()
  user: UserEntity;
}
