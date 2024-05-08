import { IsNotEmpty, IsString } from 'class-validator';

export class CollaboratingCompany {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  logo: string;
}
