import { IsNotEmpty, IsString } from 'class-validator';

export class BenefitsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  validity: string;

  @IsString()
  description?: string;
}
