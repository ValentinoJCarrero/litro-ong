import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength, isNotEmpty, isString } from 'class-validator';
export class NewsDto {
  /**
   * @example 'Logro histórico: Récord de donaciones!'
   */
  @IsNotEmpty({ message: 'El tiúlo es requerido' })
  @IsString({ message: 'El tiúlo debe ser un texto' })
  @MinLength(10, { message: 'El tiúlo debe tener al menos 10 caracteres' })
  @MaxLength(40, { message: 'El tiúlo debe tener menos de 40 caracteres' })
  title: string;

  /**
   * @example 'Unidos por una gran causa!'
   */
  @IsNotEmpty({ message: 'El subtiúlo es requerido' })
  @IsString({ message: 'El subtiúlo debe ser un texto' })
  @MinLength(10, { message: 'El subtiúlo debe tener al menos 10 caracteres' })
  @MaxLength(30, { message: 'El subtiúlo debe tener menos de 30 caracteres' })
  subtitle: string;


/**
* @example https://url-imagen-principaaal.com/imagen.jpg
// */
// @IsNotEmpty({ message: 'La imagen principal es requerida' })
// @IsUrl({}, { message: 'La imagen principal debe ser una URL' })
primaryImage: string;
  
  /**
   * @example https://url-imagen-secundaria.com/imagen.jpg
  */
 @IsOptional()
 @IsUrl()
 secondaryImage?: string;
 
 /**
  * @example https://url-imagen-terciaria.com/imagen.jpg
 */
@IsOptional()
@IsUrl()
  tertiaryImage?: string;
  
  /**
   * @example 'Este mes logramos una cifra récord en donaciones, gracias al apoyo incondicional de nuestra comunidad. ¡Gracias a todos por hacerlo posible!'
   */
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @IsString({ message: 'La descripción debe ser un texto' })
  @MinLength(100, {
    message: 'La descripción debe tener al menos 100 caracteres',
  })
  @MaxLength(800, {
    message: 'La descripción debe tener menos de 800 caracteres',
  })
  description: string;
}
