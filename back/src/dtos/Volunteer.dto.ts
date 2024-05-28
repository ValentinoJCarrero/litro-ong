import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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

  /**
   * @example 'Una aclaracion sobre mis datos como voluntario ( no tengo movilidad - no soy mayor de 18 - mis dias de disponibilidad pueden cambiar en cualquier momento - los dias feriados mi disponibilidad horaria es mas extensa) '
   */
  @IsOptional()
  @IsString()
  description: string;
}
