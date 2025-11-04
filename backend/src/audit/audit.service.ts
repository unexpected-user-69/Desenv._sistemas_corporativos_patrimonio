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
    try {
      // Preparar dados: converter objetos vazios para null e undefined para null
      const prepareData = (dto: CreateAuditLogDto): any => {
        const data: any = {
          action: dto.action,
          entityType: dto.entityType,
        };

        // Tratar campos opcionais - não passar null, apenas undefined ou valores válidos
        if (dto.userId !== undefined && dto.userId !== null) data.userId = dto.userId;
        if (dto.entityId !== undefined && dto.entityId !== null) data.entityId = dto.entityId;
        if (dto.sessionId !== undefined && dto.sessionId !== null) data.sessionId = dto.sessionId;
        // ipAddress é do tipo 'inet' - não passar null, deixar undefined se vazio
        if (dto.ipAddress !== undefined && dto.ipAddress !== null && dto.ipAddress !== '') {
          data.ipAddress = dto.ipAddress;
        }
        if (dto.userAgent !== undefined && dto.userAgent !== null && dto.userAgent !== '') {
          data.userAgent = dto.userAgent;
        }
        if (dto.service !== undefined && dto.service !== null && dto.service !== '') {
          data.service = dto.service;
        }
        if (dto.endpoint !== undefined && dto.endpoint !== null && dto.endpoint !== '') {
          data.endpoint = dto.endpoint;
        }
        if (dto.description !== undefined && dto.description !== null && dto.description !== '') {
          data.description = dto.description;
        }
        
        // Tratar JSONB: objetos vazios não são passados (undefined)
        if (dto.oldValues !== undefined && dto.oldValues !== null) {
          if (typeof dto.oldValues === 'object' && Object.keys(dto.oldValues).length > 0) {
            data.oldValues = dto.oldValues;
          }
          // Se for objeto vazio ou null, não adicionar ao data (fica undefined)
        }
        if (dto.newValues !== undefined && dto.newValues !== null) {
          if (typeof dto.newValues === 'object' && Object.keys(dto.newValues).length > 0) {
            data.newValues = dto.newValues;
          }
          // Se for objeto vazio ou null, não adicionar ao data (fica undefined)
        }

        return data;
      };

      const dataToSave = prepareData(createAuditLogDto);
      const auditLog = this.auditLogRepository.create(dataToSave);
      const saved = await this.auditLogRepository.save(auditLog);
      
      return Array.isArray(saved) ? saved[0] : saved;
    } catch (error) {
      console.error('Erro ao salvar log de auditoria no banco de dados:', error);
      throw error;
    }
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

  async findOne(id: string): Promise<AuditLog | null> {
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
