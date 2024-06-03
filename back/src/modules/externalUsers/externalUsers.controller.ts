import { Body, Controller, Get, Post } from "@nestjs/common";
import { ExternalUsersRepository } from "./externalUsers.repository";
interface ExternalUser {
    id: string;
    email: string;
  }
@Controller('externalUsers')
export class ExternalUsersController {
    constructor(private readonly externalUsersRepository: ExternalUsersRepository) {}
    @Post()
    async createExternalUser(@Body() email:string): Promise<string> {
        console.log(email)
        await this.externalUsersRepository.createExternalUser(email);
    
        return "added"
    }

    @Get()
    async getExternalUsers(@Body() email): Promise<ExternalUser> {
        return this.externalUsersRepository.getExternalUsers(email);
    }
}