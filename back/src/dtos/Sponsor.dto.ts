import { IsNotEmpty, IsString } from 'class-validator';

export class SponsorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  logo: string;
}
