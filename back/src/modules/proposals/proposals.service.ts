import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProposalsRepository } from './proposals.repository';
import { Proposals } from 'src/entities/Proposals.entity';
import { ProposalsDto } from 'src/dtos/Proposals.dto';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class ProposalsService {
  constructor(private readonly proposalsRepository: ProposalsRepository,
    private readonly mailerService: MailerService
  ) {}

  async getAllProposals(
    limit: number,
    page: number,
    filter?: string,
  ): Promise<{ data: Proposals[]; total: number }> {
    if (filter && !['APPROVED', 'REJECTED', 'PENDING'].includes(filter)) {
      throw new BadRequestException(
        'El filtro debe ser APPROVED, REJECTED o PENDING',
      );
    }

    const allProposals = await this.proposalsRepository.getAllProposals(
      limit,
      page,
      filter,
    );
    if (allProposals.data.length === 0) {
      throw new NotFoundException(
        'No se encontraron propuestas en esta pagina',
      );
    } else {
      return allProposals;
    }
  }

  async getProposals(id: string): Promise<Proposals> {
    const proposalsById: Proposals | null =
      await this.proposalsRepository.getProposals(id);
    if (!proposalsById) {
      throw new NotFoundException('No se encontro la propuesta');
    }
    return proposalsById;
  }

  async createProposals(
    id: string,
    proposals: ProposalsDto,
  ): Promise<Proposals> {
    return await this.proposalsRepository.createProposals(id, proposals);
  }

  async updateProposals(id: string, newStatus: string) {
    if (newStatus !== 'APPROVED' && newStatus !== 'REJECTED') {
      throw new BadRequestException(
        'El estado de la propuesta debe ser APPROVED o REJECTED',
      );
    }
    const proposalsUpdated = await this.proposalsRepository.updateProposals(
      id,
      newStatus,
    );
    if (proposalsUpdated.affected === 0) {
      throw new NotFoundException(
        'No se encontró la propuesta que intentabas editar',
      );
    } else {
      const proposal = await this.getProposals(id);

      //enviar email
      proposal.user.email;
      //cre que deberias hacer una constante, que la respuesta del repositorio y antes de mandarla al controlador, llama al servicio de email y mandale el propotsal.user.id.
      /**
       * algo asi se me ocurre, para mandar el email. pero nose, vos sabras
       * const response = await this.proposalsRepository.createProposals(id, proposals);
       *  await this.emailService.sendEmail(response.user.id);
       * return response;
       */
      const proposals = await this.getProposals(id)
      
      this.mailerService.sendProposalMail(proposals);
      return proposalsUpdated;
    }
  }

  async deleteProposals(id: string) {
    const proposalsDeleted = await this.proposalsRepository.getProposals(id);
    if (!proposalsDeleted) {
      throw new NotFoundException(
        'La propuesta que intentabas eliminar no se encontró en la base de datos',
      );
    }
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    if (proposalsDeleted.date > oneMonthAgo) {
      throw new BadRequestException(
        'No se puede eliminar una propuesta con antigüedad menor a un mes',
      );
    } else if (proposalsDeleted.status === 'PENDING') {
      throw new BadRequestException(
        'No se puede eliminar una propuesta pendiente de confirmación',
      );
    } else {
      return this.proposalsRepository.deleteProposals(id);
    }
  }

  deleteAllProposals() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return this.proposalsRepository.deleteAllProposals(oneMonthAgo);
  }
}
