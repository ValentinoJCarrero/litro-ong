import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import { Event } from './entities/Event.entity';
import { News } from './entities/News.entity';
import { Role } from './entities/Role.entity';
import { Sponsor } from './entities/Sponsor';
import * as bcrypt from 'bcrypt';
import { preloadData } from './helpers/data.preload';
import { Workshop } from './entities/Workshop.entity';
import { Volunteer } from './entities/Volunteer.entity';
import { Benefit } from './entities/Benefit.entity';
import { CommunityKitchens } from './entities/CommunityKitchens.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(News) private newsRepository: Repository<News>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
    @InjectRepository(Sponsor) private sponsorRepository: Repository<Sponsor>,
    @InjectRepository(Workshop)
    private workshopRepository: Repository<Workshop>,
    @InjectRepository(Volunteer)
    private volunteerRepository: Repository<Volunteer>,
    @InjectRepository(Benefit)
    private benefitRepository: Repository<Benefit>,
    @InjectRepository(CommunityKitchens)
    private communityKitchensRepository: Repository<CommunityKitchens>,
  ) {
    this.seeder();
  }

  async seeder(): Promise<string> {
    const users = await this.usersRepository.find();
    if (!(users.length === 0)) return;

    for (const role of preloadData.roles) {
      await this.rolesRepository.save(role);
    }

    for (const user of preloadData.users) {
      user.password = await bcrypt.hash(user.password, 10);
      user.role = [
        await this.rolesRepository.findOne({
          where: { role: user.fullName },
        }),
      ];
      const newUser = await this.usersRepository.save(user);

      if (user.fullName === 'Volunteer') {
        const neWvolunteer = this.volunteerRepository.create({
          ...preloadData.VolunteerData,
          user: newUser,
        });

        await this.volunteerRepository.save(neWvolunteer);
        user.volunteerData = neWvolunteer;

        await this.usersRepository.save(user);
      }
    }

    for (const workshop of preloadData.Workshops) {
      await this.workshopRepository.save(workshop);
    }

    for (const event of preloadData.events) {
      await this.eventRepository.save(event);
    }

    for (const news of preloadData.news) {
      await this.newsRepository.save(news);
    }

    for (const sponsor of preloadData.sponsors) {
      await this.sponsorRepository.save(sponsor);
    }

    for (const benefit of preloadData.benefits) {
      await this.benefitRepository.save(benefit);
    }

    for (const communityKitchen of preloadData.communityKitchens) {
      await this.communityKitchensRepository.save(communityKitchen);
    }

    return 'Precarga completada.';
  }
}
