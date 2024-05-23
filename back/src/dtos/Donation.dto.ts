import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

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
  @IsOptional({ message: 'El correo electrónico es opcional' })
  @IsEmail()
  email: string;

  /**
   *@example 5000
   */
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
