import { Module } from '@nestjs/common';
import { VolunteerController } from './volunteer.controller';
import { VolunteerService } from './volunteer.service';
import { Volunteer } from 'src/entities/Volunteer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolunteerRepository } from './volunteer.repository';
import { Role } from 'src/entities/Role.entity';
import { User } from 'src/entities/User.entity';
import { Event } from 'src/entities/Event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Volunteer, User, Role, Event])],
  controllers: [VolunteerController],
  providers: [VolunteerService, VolunteerRepository],
})
export class VolunteerModule {}
