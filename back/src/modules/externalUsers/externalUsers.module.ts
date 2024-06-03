import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExternalUser } from "src/entities/ExternalUser.entity";
import { ExternalUsersController } from "./externalUsers.controller";
import { ExternalUsersRepository } from "./externalUsers.repository";

@Module({
    imports: [TypeOrmModule.forFeature([ExternalUser])],
    controllers: [ExternalUsersController],
    providers: [ExternalUsersRepository],
    exports: [ExternalUsersRepository]  
})
export class ExternalUsersModule {}
