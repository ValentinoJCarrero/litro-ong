import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DonationDto {
  /**
   * @example 'Homero Simpson'
   */
  @IsOptional()
  @IsString()
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
