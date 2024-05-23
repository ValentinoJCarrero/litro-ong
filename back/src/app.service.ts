import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import { Event } from './entities/Event.entity';
import { News } from './entities/News.entity';
import { Role } from './entities/Role.entity';
import { Sponsor } from './entities/Sponsor';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Event) private EventRepository: Repository<Event>,
    @InjectRepository(News) private newsRepository: Repository<News>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
    @InjectRepository(Sponsor) private sponsorRepository: Repository<Sponsor>,
  ) {
    this.seeder();
  }

  async seeder(): Promise<string> {
    const users = await this.usersRepository.find();
    if (!(users.length === 0)) return;

    await this.usersRepository.save({
      fullName: 'Admin',
      email: 'admin@admin.com',
      password: 'admin',
      fullAddress: 'admin',
      phone: '123123123',
      dni: '123123123',
      birthDate: '2005-02-17',
    });

    await this.EventRepository.save({
      title: 'Evento - 1 Litro de Leche',
      subtitle: 'Evento para recaudar fondos y leche.',
      address: 'Calle 123',
      date: '2022-02-17',
      timeStart: '10:00',
      timeEnd: '11:00',
      description:
        'Este es un evento para precargar. Este es un evento para precargar. Este es un evento para precargar. Este es un evento para precargar.',
      primaryImage: 'https://imgur.com/JGZlS8b',
      secondaryImage: 'https://imgur.com/JGZlS8b',
    });

    await this.newsRepository.save({
      title: 'Noticia - 1 Litro de Leche',
      subtitle: 'Recaudar fondos y leche.',
      primaryImage: 'https://imgur.com/JGZlS8b',
      description:
        'Esta es una noticia para precargar. Esta es una noticia para precargar. Esta es una noticia para precargar.',
      date: '2022-02-17',
    });

    await this.rolesRepository.save({ role: 'Admin' });
    await this.rolesRepository.save({ role: 'Volunteer' });
    await this.rolesRepository.save({ role: 'Partner' });

    await this.sponsorRepository.save({
      name: 'Evi Desarrollos',
      email: 'evi@evi.com',
      logo: 'https://imgur.com/mjxdHSb',
    });
    await this.sponsorRepository.save({
      name: 'COSAG',
      email: 'cosag@cosag.com',
      logo: 'https://imgur.com/f1pZvo5',
    });
    await this.sponsorRepository.save({
      name: 'Supermercados Becerra',
      email: 'becerra@becerra.com',
      logo: 'https://imgur.com/I98eGGV',
    });
    await this.sponsorRepository.save({
      name: 'Jalisco Heladería',
      email: 'jalisco@jalisco.com',
      logo: 'https://imgur.com/SmOJSAs',
    });
    await this.sponsorRepository.save({
      name: 'Alsina Farmacia',
      email: 'alsina@alsina.com',
      logo: 'https://imgur.com/x8RBvh3',
    });

    return 'Precarga completada.';
  }
}
