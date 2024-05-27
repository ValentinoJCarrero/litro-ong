import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import { Event } from './entities/Event.entity';
import { News } from './entities/News.entity';
import { Role } from './entities/Role.entity';
import { Sponsor } from './entities/Sponsor';
import * as bcrypt from 'bcrypt';

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
      password: await bcrypt.hash('Administrador1', 10),
      fullAddress: 'admin',
      phone: '23123123',
      dni: '123123123',
      birthDate: '2005-02-17',
      isSubscribed: true,
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
      primaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716702280/preload%20litro/ni%C3%B1oFeliz_e4usfj.jpg ',
      secondaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716702273/preload%20litro/serVoluntariaPage_pruyjm.jpg ',
    });

    await this.newsRepository.save({
      title: 'Noticia - 1 Litro de Leche',
      subtitle: 'Recaudar fondos y leche.',
      primaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716702245/preload%20litro/noticia_ycmctu.jpg ',
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
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701938/preload%20litro/evi_twk6uk.png ',
    });
    await this.sponsorRepository.save({
      name: 'COSAG',
      email: 'cosag@cosag.com',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701938/preload%20litro/COSAG_cvlfgc.png ',
    });
    await this.sponsorRepository.save({
      name: 'Supermercados Becerra',
      email: 'becerra@becerra.com',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701926/preload%20litro/becerra_zzkhoh.png ',
    });
    await this.sponsorRepository.save({
      name: 'Jalisco Heladería',
      email: 'jalisco@jalisco.com',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701937/preload%20litro/JALISCO_jbmx3x.png ',
    });
    await this.sponsorRepository.save({
      name: 'Alsina Farmacia',
      email: 'alsina@alsina.com',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701938/preload%20litro/farmacia_rdvpq1.png ',
    });

    return 'Precarga completada.';
  }
}
