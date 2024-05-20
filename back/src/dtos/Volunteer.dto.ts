import { IsNotEmpty, IsString } from 'class-validator';
export class VolunteerDto {
  /**
   * @example '["Monday", "Tuesday"]'
   */
  @IsNotEmpty()
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
