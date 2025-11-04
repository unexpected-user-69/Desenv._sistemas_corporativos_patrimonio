import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { SearchAuditLogsDto } from './dto/search-audit-logs.dto';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {}

  async createAuditLog(createAuditLogDto: CreateAuditLogDto): Promise<AuditLog> {
    try {
      // Preparar dados: apenas campos com valores válidos são incluídos
      const prepareData = (dto: CreateAuditLogDto): Partial<AuditLog> => {
        const data: Partial<AuditLog> = {
          action: dto.action,
          entityType: dto.entityType,
        };

        // Tratar campos UUID - apenas se tiverem valor válido (string não vazia)
        if (dto.userId && typeof dto.userId === 'string' && dto.userId.trim() !== '') {
          data.userId = dto.userId;
        }
        if (dto.entityId && typeof dto.entityId === 'string' && dto.entityId.trim() !== '') {
          data.entityId = dto.entityId;
        }
        if (dto.sessionId && typeof dto.sessionId === 'string' && dto.sessionId.trim() !== '') {
          data.sessionId = dto.sessionId;
        }
        
        // ipAddress é do tipo 'inet' - apenas se tiver valor válido
        if (dto.ipAddress && typeof dto.ipAddress === 'string' && dto.ipAddress.trim() !== '') {
          data.ipAddress = dto.ipAddress;
        }
        
        // Campos de string opcionais - apenas se tiverem valor válido
        if (dto.userAgent && typeof dto.userAgent === 'string' && dto.userAgent.trim() !== '') {
          data.userAgent = dto.userAgent;
        }
        if (dto.service && typeof dto.service === 'string' && dto.service.trim() !== '') {
          data.service = dto.service;
        }
        if (dto.endpoint && typeof dto.endpoint === 'string' && dto.endpoint.trim() !== '') {
          data.endpoint = dto.endpoint;
        }
        if (dto.description && typeof dto.description === 'string' && dto.description.trim() !== '') {
          data.description = dto.description;
        }
        
        // Tratar JSONB: apenas objetos com conteúdo são passados
        // Se undefined/null ou objeto vazio {}, não incluir no data (TypeORM usará null do banco)
        if (dto.oldValues && typeof dto.oldValues === 'object' && !Array.isArray(dto.oldValues)) {
          const keys = Object.keys(dto.oldValues);
          if (keys.length > 0) {
            data.oldValues = dto.oldValues;
          }
          // Objetos vazios {} não são adicionados - deixar que o banco use null
        }
        if (dto.newValues && typeof dto.newValues === 'object' && !Array.isArray(dto.newValues)) {
          const keys = Object.keys(dto.newValues);
          if (keys.length > 0) {
            data.newValues = dto.newValues;
          }
          // Objetos vazios {} não são adicionados - deixar que o banco use null
        }

        return data;
      };

      const dataToSave = prepareData(createAuditLogDto);
      
      // TypeORM funciona melhor quando campos opcionais não são incluídos
      // (eles usarão os valores padrão do banco/null)
      // Não precisamos fazer limpeza adicional - apenas garantir que undefined não seja passado
      
      const auditLog = this.auditLogRepository.create(dataToSave);
      const saved = await this.auditLogRepository.save(auditLog);
      const result = Array.isArray(saved) ? saved[0] : saved;
      
      return result;
    } catch (error) {
      this.logger.error('Erro ao salvar log de auditoria no banco de dados', {
        errorType: error?.constructor?.name,
        message: error?.message,
        stack: error?.stack,
        code: error?.code,
        detail: error?.detail,
        dto: createAuditLogDto,
      });
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
