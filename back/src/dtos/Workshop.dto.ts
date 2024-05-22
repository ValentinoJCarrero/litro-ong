import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
   * @example '123456789'
   */
  @IsNotEmpty()
  @IsString()
  teacherPhone: string;

  /**
   * @example 'https://www.example.image.com'
   */
  // @IsNotEmpty()
  // @IsString()
  photo: string;

  /**
   * @example '13:00:00'
   */
  @IsNotEmpty()
  @IsString()
  timeStart: string;

  /**
   * @example '01:30:00'
   */
  @IsNotEmpty()
  @IsString()
  duration: string;

  /**
   * @example '2024-03-03'
   */
  @IsOptional()
  @IsString()
  dateStart: string;

  /**
   * @example '2024-10-10'
   */
  @IsOptional()
  @IsString()
  dateEnd: string;

  /**
   * @example '$700.00'
   */
  @IsNotEmpty()
  @IsString()
  cost: string;

  /**
   * @example '["Monday", "Tuesday", "Wednesday"]'
   */
  @IsNotEmpty()
  @IsArray()
  days: string[];

  /**
   * @example 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
   */
  @IsNotEmpty()
  @IsString()
  description: string;
}
