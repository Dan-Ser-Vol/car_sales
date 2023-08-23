import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PostBaseRequestDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the user creating the post',
  })
  @IsString()
  authorId: string;

  @ApiProperty({ example: 'Title', description: 'The title of the post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Content', description: 'The content of the post' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 'Image-url',
    description: 'The URL of the image associated with the post',
  })
  @IsString()
  @IsOptional()
  image: string;
}
