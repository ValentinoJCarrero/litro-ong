import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PickType } from '@nestjs/swagger';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  dni: string;

  @IsNotEmpty()
  @IsString()
  birthDate: Date;
}

export class LoginUserDto extends PickType(UserDto, ['email', 'password']) {}

export class SignUpGoogle extends PickType(UserDto, ['name', 'email', 'address', 'phone', 'dni', 'birthDate']) {}

export class LoginGoogle extends PickType(UserDto, ['email']) {}