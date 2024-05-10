import { IsNotEmpty, IsString } from 'class-validator';

export class AssociateDto {
  @IsNotEmpty()
  @IsString()
  dni: string;
}
