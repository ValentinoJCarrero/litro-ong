import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityKitchens } from 'src/entities/CommunityKitchens.entity';
import { CommunityKitchensController } from './communityKitchens.controller';
import { CommunityKitchensService } from './communityKitchens.service';
import { CommunityKitchensRepository } from './communityKitchens.repository';
import { StorageService } from '../storage/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommunityKitchens])],
  controllers: [CommunityKitchensController],
  providers: [
    CommunityKitchensService,
    CommunityKitchensRepository,
    StorageService,
  ],
})
export class CommunityKitchensModule {}
