import { IsNotEmpty } from 'class-validator';

export class PartnerDto {
  @IsNotEmpty()
  email: string;
}
