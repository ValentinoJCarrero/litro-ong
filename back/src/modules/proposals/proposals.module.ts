import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposals } from 'src/entities/Proposals.entity';

import { ProposalsService } from './proposals.service';
import { ProposalsController } from './proposals.controller';
import { ProposalsRepository } from './proposals.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Proposals])],
  controllers: [ProposalsController],
  providers: [ProposalsService, ProposalsRepository],
})
export class ProposalsModule {}
