import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class EventDto {
  /**
   * @example 'Colecta de Alimentos para Niños'
   */
  @IsNotEmpty({ message: 'El titulo es requerido' })
  @IsString({ message: 'El titulo debe ser un texto' })
  @MinLength(10, { message: 'El titulo debe tener al menos 10 caracteres' })
  @MaxLength(40, { message: 'El titulo debe tener menos de 40 caracteres' })
  title: string;

  /**
   * @example 'Ayuda a los niños con alimentos nutritivos'
   */
  @IsNotEmpty({ message: 'El subtitulo es requerido' })
  @IsString({ message: 'El subtitulo debe ser un texto' })
  @MinLength(10, { message: 'El subtitulo debe tener al menos 10 caracteres' })
  @MaxLength(30, { message: 'El subtitulo debe tener menos de 30 caracteres' })
  subtitle: string;

  /**
   * @example 'Calle Principal 123'
   */
  @IsNotEmpty({ message: 'La dirección es requerida' })
  @IsString({ message: 'La dirección debe ser un texto' })
  @MinLength(5, { message: 'La dirección debe tener al menos 10 caracteres' })
  @MaxLength(30, { message: 'La dirección debe tener menos de 30 caracteres' })
  address: string;

  /**
   * @example '2024-10-19'
   */
  @IsNotEmpty({ message: 'La fecha es requerida' })
  @IsDateString()
  date: string;

  /**
   * @example '10:00'
   */
  @IsNotEmpty({ message: 'La hora de inicio es requerida' })
  @IsMilitaryTime({
    message: 'La hora de inicio debe ser una hora valida, formato HH:MM',
  })
  timeStart: string;

  /**
   * @example '17:00'
   */
  @IsNotEmpty({ message: 'La hora de finalización es requerida' })
  @IsMilitaryTime({
    message: 'La hora de finalización debe ser una hora valida, formato HH:MM',
  })
  timeEnd: string;

  /**
   * @example 'Colecta de alimentos para apoyar a los niños del merendero local. Necesitamos donaciones de alimentos no perecederos y artículos de higiene personal.'
   */
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @IsString({ message: 'La descripción debe ser un texto' })
  @MinLength(100, {
    message: 'La descripción debe tener al menos 100 caracteres',
  })
  @MaxLength(800, {
    message: 'La descripción debe tener menos de 800 caracteres',
  })
  description: string;

  /**
   * @example 'https://example.com/image.jpg'
   * */
  // @IsNotEmpty({ message: 'La imagen es requerida' })
  image: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  volunteers?: string[];
}
