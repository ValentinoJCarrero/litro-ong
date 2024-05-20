import { IsNotEmpty, IsString } from 'class-validator';

export class WorkshopDto {
  /**
   * @example 'Computacion'
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * @example 'Nicolas Addamo'
   */
  @IsNotEmpty()
  @IsString()
  teacher: string;

  /**
   * @example 'https://www.example.image.com'
   */
  @IsNotEmpty()
  @IsString()
  image: string;

  /**
   * @example '2022-01-01'
   */
  @IsNotEmpty()
  @IsString()
  date: string;

  /**
   * @example '09:00 - 12:00'
   */
  @IsNotEmpty()
  @IsString()
  horarios: string;

  /**
   * @example 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
   */
  @IsNotEmpty()
  @IsString()
  description: string;
}
