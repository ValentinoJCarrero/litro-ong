import { Module } from '@nestjs/common';
import { VolunteerController } from './volunteer.controller';
import { VolunteerService } from './volunteer.service';
import { Volunteer } from 'src/entities/Volunteer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolunteerRepository } from './volunteer.repository';
import { Role } from 'src/entities/Role.entity';
import { User } from 'src/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Volunteer, User, Role])],
  controllers: [VolunteerController],
  providers: [VolunteerService, VolunteerRepository],
})
export class VolunteerModule {}
