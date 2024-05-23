import { IsArray, IsNotEmpty, IsString } from 'class-validator';
export class VolunteerDto {
  /**
   * @example '["Monday", "Tuesday"]'
   */
  @IsNotEmpty()
  @IsArray({
    message: 'Los dias de la semana deben ser un arreglo',
  })
  availableDays: string[];

  /**
   * @example '09:00 '
   */
  @IsNotEmpty()
  @IsString()
  startHours: string;

  /**
   * @example '12:00'
   */
  @IsNotEmpty()
  @IsString()
  endHours: string;
}
