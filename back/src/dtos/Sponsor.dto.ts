import {
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SponsorDto {
  /**
   * @example 'Supermercados Becerra'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'El nombre debe tener al menos 5 caracteres' })
  @MaxLength(35, { message: 'La dirección debe tener menos de 35 caracteres' })
  name: string;

  /**
   * @example 'https://www.becerra/logo.com'
   */
  @IsNotEmpty()
  @IsUrl()
  logo: string;
}
