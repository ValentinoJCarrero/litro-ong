import { IsNotEmpty, IsString } from 'class-validator';
export class VolunteerDto {
  @IsNotEmpty()
  availableDays: string[];

  @IsNotEmpty()
  @IsString()
  startHours: string;

  @IsNotEmpty()
  @IsString()
  endHours: string;
}
