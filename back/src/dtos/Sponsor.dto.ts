import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SponsorDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'El nombre debe tener al menos 10 caracteres' })
  name: string;

  @IsNotEmpty()
  @IsString()
  logo: string;
}
