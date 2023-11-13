import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserRegisterRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({ example: 'example@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[+0-9\s\-()]*$/, { message: 'Invalid phone number format' })
  @MinLength(3)
  @MaxLength(20)
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, {
    message:
      'Пароль повинен містити принаймні одну цифру, одну маленьку та велику літеру, один спецсимвол і бути не менше 8 символів у довжину.',
  })
  password: string;
}
