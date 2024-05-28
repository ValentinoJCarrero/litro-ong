import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CardService } from './card.service';
import { Card } from 'src/entities/Card.entity';
@ApiTags('Tarjetas')
@Controller('Card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las tarjetas',
    description:
      'Esta ruta devuelve un objeto con data y total. Donde data es un arreglo de tarjetas y total es la cantidad de tarjetas registradas en la base de datos',
  })
  getAllCards(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: Card[]; total: number }> {
    return this.cardService.getAllCards(Number(limit), Number(page));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un tarjeta por ID',
    description:
      'Esta ruta devuelve una tarjeta registrada por un id de tipo uuid enviado por parámetro',
  })
  getOneCard(@Param('id', ParseUUIDPipe) id: string): Promise<Card> {
    return this.cardService.getOneCard(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva tarjeta (solo para administradores)',
    description:
      'Esta ruta crea una nueva tarjeta con los datos enviados por body',
  })
  async createCard(@Body() card): Promise<Card> {
    return this.cardService.createCard(card);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una tarjeta (solo para administradores)',
    description:
      'Esta ruta elimina una tarjeta por un id de tipo uuid enviado por parámetro',
  })
  deleteCard(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardService.deleteCard(id);
  }
}
