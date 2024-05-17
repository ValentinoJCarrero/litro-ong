import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PickType } from '@nestjs/swagger';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  // @IsNotEmpty()
  // @IsString()
  // address: string;
  //
  // @IsNotEmpty()
  // @IsString()
  // phone: string;
  //
  // @IsNotEmpty()
  // @IsString()
  // dni: string;
  //
  // @IsNotEmpty()
  // @IsString()
  // birthDate: Date;

  @IsOptional()
  volunteerData?: any;

  @IsOptional()
  role: any;
}

export class loginUserDto extends PickType(UserDto, ['email', 'password']) {}
