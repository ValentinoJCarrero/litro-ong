import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CommunityKitchensDto {
  /**
   * @example 'Caritas felices'
   */
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(35, { message: 'El nombre debe tener menos de 35 caracteres' })
  name: string;

  /**
   * Av. San Martin 123, Alta Gracia
   */
  @IsNotEmpty({ message: 'La dirección es requerida' })
  @IsString({ message: 'La dirección debe ser un texto' })
  @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres' })
  @MaxLength(35, { message: 'La dirección debe tener menos de 35 caracteres' })
  address: string;

  /**
   * @example 'Cristian'
   */
  @IsNotEmpty({ message: 'El nombre del dueño es requerido' })
  @IsString({ message: 'El nombre del dueño debe ser un texto' })
  @MinLength(3, {
    message: 'El nombre del dueño debe tener al menos 3 caracteres',
  })
  @MaxLength(35, {
    message: 'El nombre del dueño debe tener menos de 35 caracteres',
  })
  holder: string;

  /**
   * @example '123456'
   */
  @IsNotEmpty({ message: 'El número de integrantes es requerido' })
  kidsNumber: string;

  /**
   * @example '["Monday", "Tuesday", "Wednesday"]'
   */
  @IsNotEmpty({ message: 'Los días de atención son requeridos' })
  @IsArray({ message: 'Los día de la semana deben ser un arreglo' })
  days: string[];

  /**
   * @example '10:00'
   */
  @IsNotEmpty({ message: 'El horario de inicio es requerido' })
  @IsString({ message: 'El horario de inicio debe ser un texto' })
  time: string;

  /**
   * @example 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
   */
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  photo: string;
}
