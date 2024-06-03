import { ExternalUser } from "src/entities/ExternalUser.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Body, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';

@Injectable()
export class ExternalUsersRepository {
  constructor(
    @InjectRepository(ExternalUser) private usersRepository: Repository<ExternalUser>,
  ) {}

  async createExternalUser(@Body() user): Promise<Partial<ExternalUser>> {
    const newUser = await this.usersRepository.save(user);
    return newUser;
  }

  async getExternalUsers(@Body() email): Promise<ExternalUser> {
    const users = await this.usersRepository.findOne(email);
    return users;
  }
async getAllExternalUsers(): Promise<ExternalUser[]> {
  
  const users = await this.usersRepository.find();
  return users;
}
  async deleteExternalUser(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      await this.usersRepository.remove(user);
      console.log(`External user deleted: ${email}`);
    } else {
      console.log(`External user with email ${email} not found`);
    }
  }
}
