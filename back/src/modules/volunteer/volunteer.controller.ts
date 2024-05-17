import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerDto } from 'src/dtos/Volunteer.dto';

@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Get()
  getAllVolunteers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return this.volunteerService.getAllVolunteers(Number(limit), Number(page));
  }

  @Post('convert')
  convertToVolunteer(
    @Param('userId') userId: string,
    @Body() volunteerData: VolunteerDto,
  ) {
    return this.volunteerService.convertToVolunteer(userId, volunteerData);
  }
  //eliminar voluntario
  //buscar voluntario por id
}
