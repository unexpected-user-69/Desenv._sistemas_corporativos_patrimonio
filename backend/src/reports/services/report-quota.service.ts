import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { ReportQuota } from '../entities/report-quota.entity';
import { User } from '../../shared/entities/user.entity';

@Injectable()
export class ReportQuotaService {
  private readonly logger = new Logger(ReportQuotaService.name);

  constructor(
    @InjectRepository(ReportQuota)
    private readonly quotaRepository: Repository<ReportQuota>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Verifica e incrementa quota de um usuário
   * @throws TooManyRequestsException se a quota foi excedida
   */
  async checkAndIncrementQuota(
    userId: string,
    periodType: 'daily' | 'weekly' | 'monthly' = 'monthly',
  ): Promise<void> {
    // Verificar se o usuário existe
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    const { periodStart, periodEnd } = this.getPeriodDates(periodType);

    // Buscar ou criar quota
    let quota = await this.quotaRepository.findOne({
      where: {
        userId,
        periodStart,
        periodEnd,
        periodType,
      },
    });

    if (!quota) {
      // Criar nova quota com limite padrão
      quota = this.quotaRepository.create({
        userId,
        limit: this.getDefaultLimit(periodType),
        used: 0,
        periodStart,
        periodEnd,
        periodType,
      });
      quota = await this.quotaRepository.save(quota);
    }

    // Verificar se excedeu o limite
    if (quota.used >= quota.limit) {
      throw new HttpException(
        `Quota excedida. Limite: ${quota.limit} solicitações/${periodType}`,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Incrementar quota usada
    quota.used += 1;
    await this.quotaRepository.save(quota);

    this.logger.log(
      `Quota atualizada para usuário ${userId}: ${quota.used}/${quota.limit} (${periodType})`,
    );
  }

  /**
   * Obtém quota atual de um usuário
   */
  async getQuota(
    userId: string,
    periodType: 'daily' | 'weekly' | 'monthly' = 'monthly',
  ): Promise<ReportQuota> {
    // Verificar se o usuário existe
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    const { periodStart, periodEnd } = this.getPeriodDates(periodType);

    let quota = await this.quotaRepository.findOne({
      where: {
        userId,
        periodStart,
        periodEnd,
        periodType,
      },
    });

    if (!quota) {
      // Criar quota padrão se não existir
      quota = this.quotaRepository.create({
        userId,
        limit: this.getDefaultLimit(periodType),
        used: 0,
        periodStart,
        periodEnd,
        periodType,
      });
      quota = await this.quotaRepository.save(quota);
    }

    return quota;
  }

  /**
   * Define limite de quota para um usuário
   */
  async setQuotaLimit(
    userId: string,
    limit: number,
    periodType: 'daily' | 'weekly' | 'monthly' = 'monthly',
  ): Promise<ReportQuota> {
    if (limit < 0) {
      throw new BadRequestException('Limite deve ser maior ou igual a zero');
    }

    // Verificar se o usuário existe
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    const { periodStart, periodEnd } = this.getPeriodDates(periodType);

    let quota = await this.quotaRepository.findOne({
      where: {
        userId,
        periodStart,
        periodEnd,
        periodType,
      },
    });

    if (!quota) {
      quota = this.quotaRepository.create({
        userId,
        limit,
        used: 0,
        periodStart,
        periodEnd,
        periodType,
      });
    } else {
      quota.limit = limit;
    }

    return this.quotaRepository.save(quota);
  }

  /**
   * Reseta quota de um usuário (útil para testes ou ajustes)
   */
  async resetQuota(
    userId: string,
    periodType: 'daily' | 'weekly' | 'monthly' = 'monthly',
  ): Promise<ReportQuota> {
    const { periodStart, periodEnd } = this.getPeriodDates(periodType);

    const quota = await this.quotaRepository.findOne({
      where: {
        userId,
        periodStart,
        periodEnd,
        periodType,
      },
    });

    if (!quota) {
      throw new NotFoundException(
        `Quota não encontrada para usuário ${userId} no período ${periodType}`,
      );
    }

    quota.used = 0;
    return this.quotaRepository.save(quota);
  }

  /**
   * Obtém datas de início e fim do período
   */
  private getPeriodDates(periodType: 'daily' | 'weekly' | 'monthly'): {
    periodStart: Date;
    periodEnd: Date;
  } {
    const now = new Date();
    let periodStart: Date;
    let periodEnd: Date;

    switch (periodType) {
      case 'daily':
        periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        periodEnd = new Date(periodStart);
        periodEnd.setDate(periodEnd.getDate() + 1);
        break;

      case 'weekly':
        const dayOfWeek = now.getDay();
        periodStart = new Date(now);
        periodStart.setDate(now.getDate() - dayOfWeek);
        periodStart.setHours(0, 0, 0, 0);
        periodEnd = new Date(periodStart);
        periodEnd.setDate(periodEnd.getDate() + 7);
        break;

      case 'monthly':
        periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
        periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        break;
    }

    return { periodStart, periodEnd };
  }

  /**
   * Retorna limite padrão baseado no tipo de período
   */
  private getDefaultLimit(periodType: 'daily' | 'weekly' | 'monthly'): number {
    switch (periodType) {
      case 'daily':
        return 10;
      case 'weekly':
        return 50;
      case 'monthly':
        return 100;
      default:
        return 100;
    }
  }
}

