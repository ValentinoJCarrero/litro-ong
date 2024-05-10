import { IsNotEmpty, IsString } from 'class-validator';

export class WorkshopDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  teacher: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  horarios: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
