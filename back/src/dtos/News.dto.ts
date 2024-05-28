import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class NewsDto {
  /**
   * @example 'Logro histórico: Récord de donaciones!'
   */
  @IsNotEmpty({ message: 'El titulo es requerido' })
  @IsString({ message: 'El titulo debe ser un texto' })
  @MinLength(10, { message: 'El titulo debe tener al menos 10 caracteres' })
  @MaxLength(80, { message: 'El titulo debe tener menos de 80 caracteres' })
  title: string;

  /**
   * @example 'Unidos por una gran causa!'
   */
  @IsNotEmpty({ message: 'El subtitulo es requerido' })
  @IsString({ message: 'El subtitulo debe ser un texto' })
  @MinLength(10, { message: 'El subtitulo debe tener al menos 10 caracteres' })
  @MaxLength(60, { message: 'El subtitulo debe tener menos de 70 caracteres' })
  subtitle: string;

  /**
* @example https://url-imagen-principaaal.com/imagen.jpg
// */
  primaryImage: string;

  /**
   * @example https://url-imagen-secundaria.com/imagen.jpg
   */
  secondaryImage?: string;

  /**
   * @example https://url-imagen-terciaria.com/imagen.jpg
   */
  tertiaryImage?: string;

  /**
   * @example 'Este mes logramos una cifra récord en donaciones, gracias al apoyo incondicional de nuestra comunidad. ¡Gracias a todos por hacerlo posible!'
   */
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @IsString({ message: 'La descripción debe ser un texto' })
  @MinLength(100, {
    message: 'La descripción debe tener al menos 100 caracteres',
  })
  @MaxLength(1500, {
    message: 'La descripción debe tener menos de 1500 caracteres',
  })
  description: string;
}
