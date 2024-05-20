import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from 'src/entities/User.entity';

export class DonationDto {
  /**
   * @example 'Homero Simpson'
   */
  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'El nombre debe tener al menos 5 caracteres' })
  @MaxLength(35, { message: 'el nombre debe tener menos de 50 caracteres' })
  fullName: string;

  /**
   * @example 'HomeroSimpson@gmail.com'
   */
  @IsOptional({
    message:
      'El correo electrónico es opcional si la donacion es de un usuario registrado',
  })
  @IsEmail()
  email: string;

  /**
   *@example '$5000'
   */
  @IsNotEmpty()
  @IsString()
  amount: string;

  @IsOptional()
  @IsUUID()
  userId: string;

  @IsOptional({
    message:
      'El usuario es opcional si la donacion es de un usuario registrado',
  })
  user: User;
}
