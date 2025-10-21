import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { SearchAuditLogsDto } from './dto/search-audit-logs.dto';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {}

  async createAuditLog(createAuditLogDto: CreateAuditLogDto): Promise<AuditLog> {
    const auditLog = this.auditLogRepository.create(createAuditLogDto);
    return await this.auditLogRepository.save(auditLog);
  }

  async findAll(searchDto: SearchAuditLogsDto): Promise<{
    data: AuditLog[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page = 1, limit = 10, userId, action, entityType, startDate, endDate } = searchDto;

    const queryBuilder = this.auditLogRepository.createQueryBuilder('auditLog');

    if (userId) {
      queryBuilder.andWhere('auditLog.userId = :userId', { userId });
    }

    if (action) {
      queryBuilder.andWhere('auditLog.action = :action', { action });
    }

    if (entityType) {
      queryBuilder.andWhere('auditLog.entityType = :entityType', { entityType });
    }

    if (startDate && endDate) {
      queryBuilder.andWhere('auditLog.timestamp BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    queryBuilder
      .orderBy('auditLog.timestamp', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<AuditLog> {
    return await this.auditLogRepository.findOne({ where: { id } });
  }

  async findByEntity(entityType: string, entityId: string): Promise<AuditLog[]> {
    return await this.auditLogRepository.find({
      where: { entityType, entityId },
      order: { timestamp: 'DESC' },
    });
  }

  async findByUser(userId: string, limit = 50): Promise<AuditLog[]> {
    return await this.auditLogRepository.find({
      where: { userId },
      order: { timestamp: 'DESC' },
      take: limit,
    });
  }

  async getAuditStats(): Promise<{
    totalLogs: number;
    actionsCount: Record<string, number>;
    entityTypesCount: Record<string, number>;
    recentActivity: AuditLog[];
  }> {
    const totalLogs = await this.auditLogRepository.count();

    const actionsCount = await this.auditLogRepository
      .createQueryBuilder('auditLog')
      .select('auditLog.action', 'action')
      .addSelect('COUNT(*)', 'count')
      .groupBy('auditLog.action')
      .getRawMany();

    const entityTypesCount = await this.auditLogRepository
      .createQueryBuilder('auditLog')
      .select('auditLog.entityType', 'entityType')
      .addSelect('COUNT(*)', 'count')
      .groupBy('auditLog.entityType')
      .getRawMany();

    const recentActivity = await this.auditLogRepository.find({
      order: { timestamp: 'DESC' },
      take: 10,
    });

    return {
      totalLogs,
      actionsCount: actionsCount.reduce((acc, item) => {
        acc[item.action] = parseInt(item.count);
        return acc;
      }, {}),
      entityTypesCount: entityTypesCount.reduce((acc, item) => {
        acc[item.entityType] = parseInt(item.count);
        return acc;
      }, {}),
      recentActivity,
    };
  }
}
