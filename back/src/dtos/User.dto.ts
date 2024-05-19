import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { PickType } from '@nestjs/swagger';
import { Volunteer } from 'src/entities/Volunteer.entity';
import { Role } from 'src/entities/Role.entity';
import { Partner } from 'src/entities/Partner.entity';

export class UserDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(2, 50, {
    message: 'El nombre debe tener entre 2 y 50 caracteres',
  })
  fullName: string;

  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @IsOptional()
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  fullAddress: string;

  @IsNotEmpty({ message: 'El número de teléfono es requerido' })
  phone: string;

  @IsNotEmpty({ message: 'El número de documento es requerido' })
  dni: string;

  @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
  @IsDateString({}, { message: 'Ingrese una fecha válida (AAAA-MM-DD)' })
  birthDate: string;

  @IsOptional()
  volunteerData?: Volunteer;

  @IsOptional()
  partnerData?: Partner;

  @IsOptional()
  role: Role[];
}

export class LoginUserDto extends PickType(UserDto, ['email', 'password']) {}

export class SignUpGoogle extends PickType(UserDto, [
  'name',
  'email',
  'address',
  'phone',
  'dni',
  'birthDate',
]) {}

export class LoginGoogle extends PickType(UserDto, ['email']) {}
