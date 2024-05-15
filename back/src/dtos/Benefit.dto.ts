import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BenefitDto {
  /**
   * @example 'La Granjita - BAR & ROTICERIA'
   */
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(35, { message: 'El nombre debe tener menos de 35 caracteres' })
  name: string;

  /**
   * @example 'https://www.granjita/logo.com'
   */
  @IsNotEmpty()
  @IsUrl()
  logo: string;

  /**
   * @example 'Av. San Martin 123, Alta Gracia'
   */
  @IsNotEmpty({ message: 'La dirección es requerida' })
  @IsString({ message: 'La dirección debe ser un texto' })
  @MinLength(5, { message: 'La dirección debe tener al menos 10 caracteres' })
  @MaxLength(35, { message: 'La dirección debe tener menos de 40 caracteres' })
  address: string;

  /**
   * @example '10% de descuento en todas las pastas'
   */
  @IsNotEmpty({ message: 'El beneficio es requerido' })
  @IsString({ message: 'El beneficio debe ser un texto' })
  @MinLength(10, { message: 'El beneficio debe tener al menos 10 caracteres' })
  @MaxLength(40, { message: 'El beneficio debe tener menos de 40 caracteres' })
  benefits: string;

  /**
   * @example '2024-10-25'
   */
  @IsOptional()
  @IsDateString()
  benefitEndDate?: string;

  /**
   * @example 'Todos los martes y viernes, solo al mediodía'
   */
  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  @MinLength(10, {
    message: 'La descripción debe tener al menos 10 caracteres',
  })
  @MaxLength(45, {
    message: 'La descripción debe tener menos de 45 caracteres',
  })
  description?: string;
}
