import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: "User's name" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: "User's email" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'MyP@ssw0rd!', description: "User's password" })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  // @ApiProperty({ example: 'MyP@ssw0rd!', description: 'User\'s password confirmation' })
  // @IsNotEmpty()
  // @IsString()
  // @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, { message: 'Password too weak' })
  // confirmPassword: string;
}

export class CreateLoginDto {
  @ApiProperty({ example: 'john@example.com', description: "User's email" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'token', description: 'Access token' })
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
