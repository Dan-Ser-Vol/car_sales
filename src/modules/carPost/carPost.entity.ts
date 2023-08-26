import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CarPostBodyTypeEnum } from './enum/carPost-bodyType.enum';
import { CurrencyEnum } from './enum/carPost-currency.enum';
import { StatusCarEnum } from './enum/carPost-status.enum';
import { EngineType } from './enum/carPost-engineType.enum';
import { User } from '../users/user.entity';

@Entity()
export class CarPost {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the carPost',
  })
  id: number;

  @IsString()
  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({ example: 'Toyota', description: 'The brand of the carPost' })
  brand: string;

  @IsString()
  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({ example: 'Camry', description: 'The model of the carPost' })
  model: string;

  @IsNumber()
  @Column({ type: 'integer', nullable: false })
  @ApiProperty({ example: 3, description: 'The age of the carPost' })
  age: number;

  @IsString()
  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({ example: 'black', description: 'The color of the carPost' })
  color: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({
    example: EngineType.PETROL,
    description: 'Type of the engine',
    enum: EngineType,
    default: EngineType.PETROL,
  })
  engineType: EngineType;

  @IsNumber()
  @Column({ type: 'integer', nullable: false, default: 0 })
  @Min(0)
  @ApiProperty({ example: 50000, description: 'The mileage of the carPost' })
  mileage: number;

  @Column({
    type: 'enum',
    enum: CarPostBodyTypeEnum,
    default: CarPostBodyTypeEnum.SEDAN,
  })
  @ApiProperty({
    enum: CarPostBodyTypeEnum,
    default: CarPostBodyTypeEnum.SEDAN,
    description: 'The body type of the carPost',
  })
  bodyType: CarPostBodyTypeEnum;

  @Column({
    type: 'enum',
    enum: StatusCarEnum,
    default: StatusCarEnum.NEW,
  })
  @ApiProperty({
    enum: StatusCarEnum,
    default: StatusCarEnum.NEW,
    description: 'The status of the carPost',
  })
  status: StatusCarEnum;

  @IsNumber()
  @Column({ type: 'integer', nullable: false })
  @ApiProperty({ example: 20000, description: 'The price of the carPost' })
  price: number;

  @Column({
    type: 'enum',
    enum: CurrencyEnum,
    default: CurrencyEnum.UAH,
  })
  @ApiProperty({
    enum: CurrencyEnum,
    default: CurrencyEnum.UAH,
    description: 'The currency of the carPost price',
  })
  currency: CurrencyEnum;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({ example: false, description: 'Whether the carPost is sold' })
  sold: boolean;

  @IsString()
  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({ example: 'London', description: 'The region of the carPost' })
  region: string;

  @IsString()
  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({
    example: 'This Audi A3 is a compact luxury sedan manufactured...',
    description: 'Detailed description of the carPost',
  })
  description: string;

  @Column({ type: 'varchar', nullable: true, default: 'not image' })
  @ApiProperty({
    example: 'my_favorite.png',
    description: 'The image of the car',
  })
  @IsString()
  @IsOptional()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
