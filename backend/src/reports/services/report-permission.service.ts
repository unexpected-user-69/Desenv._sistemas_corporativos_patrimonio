import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ReportPermission } from '../entities/report-permission.entity';
import { ReportCatalog } from '../entities/report-catalog.entity';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { PermissionResponseDto } from '../dto/permission-response.dto';
import { UserRole } from '../../shared/enums/user-role.enum';

@Injectable()
export class ReportPermissionService {
  private readonly logger = new Logger(ReportPermissionService.name);

  constructor(
    @InjectRepository(ReportPermission)
    private readonly permissionRepository: Repository<ReportPermission>,
    @InjectRepository(ReportCatalog)
    private readonly catalogRepository: Repository<ReportCatalog>,
  ) {}

  /**
   * Cria uma nova permissão
   */
  async create(dto: CreatePermissionDto, userId: string): Promise<PermissionResponseDto> {
    // Verificar se o catálogo existe
    const catalog = await this.catalogRepository.findOne({
      where: { id: dto.catalogId },
    });

    if (!catalog) {
      throw new NotFoundException(`Catálogo ${dto.catalogId} não encontrado`);
    }

    // Validar: deve ter userId OU role, não ambos
    if (!dto.userId && !dto.role) {
      throw new BadRequestException('Deve especificar userId ou role');
    }

    if (dto.userId && dto.role) {
      throw new BadRequestException('Não é possível especificar userId e role ao mesmo tempo');
    }

    // Verificar se já existe permissão duplicada
    const where: any = {
      catalogId: dto.catalogId,
    };

    if (dto.userId) {
      where.userId = dto.userId;
    } else {
      where.userId = IsNull();
    }

    if (dto.role) {
      where.role = dto.role;
    } else {
      where.role = IsNull();
    }

    const existing = await this.permissionRepository.findOne({
      where,
    });

    if (existing) {
      throw new ConflictException('Permissão já existe para este catálogo, usuário e role');
    }

    const permission = this.permissionRepository.create({
      catalogId: dto.catalogId,
      userId: dto.userId,
      role: dto.role,
      canView: dto.canView ?? true,
      canGenerate: dto.canGenerate ?? true,
      canDownload: dto.canDownload ?? true,
      createdById: userId,
    });

    const saved = await this.permissionRepository.save(permission);

    this.logger.log(`Permissão criada: ${saved.id} para catálogo ${dto.catalogId}`);

    return this.toPermissionResponseDto(saved);
  }

  /**
   * Lista todas as permissões de um catálogo
   */
  async findByCatalog(catalogId: string): Promise<PermissionResponseDto[]> {
    const permissions = await this.permissionRepository.find({
      where: { catalogId },
      order: { createdAt: 'DESC' },
    });

    return permissions.map((p) => this.toPermissionResponseDto(p));
  }

  /**
   * Lista todas as permissões de um usuário
   */
  async findByUser(userId: string): Promise<PermissionResponseDto[]> {
    const permissions = await this.permissionRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    return permissions.map((p) => this.toPermissionResponseDto(p));
  }

  /**
   * Lista todas as permissões de um role
   */
  async findByRole(role: UserRole): Promise<PermissionResponseDto[]> {
    const permissions = await this.permissionRepository.find({
      where: { role },
      order: { createdAt: 'DESC' },
    });

    return permissions.map((p) => this.toPermissionResponseDto(p));
  }

  /**
   * Verifica se um usuário tem permissão para um catálogo
   */
  async checkPermission(
    catalogId: string,
    userId: string,
    userRole: UserRole,
    action: 'view' | 'generate' | 'download',
  ): Promise<boolean> {
    // Buscar permissões do catálogo
    const permissions = await this.permissionRepository.find({
      where: { catalogId },
    });

    // Se não há permissões, qualquer um pode acessar (se o catálogo não requer permissão)
    const catalog = await this.catalogRepository.findOne({ where: { id: catalogId } });
    if (!catalog) {
      return false;
    }

    if (!catalog.requiresPermission) {
      return true; // Catálogo não requer permissão especial
    }

    if (permissions.length === 0) {
      return false; // Catálogo requer permissão mas não há nenhuma definida
    }

    // Verificar permissões específicas do usuário primeiro
    const userPermission = permissions.find((p) => p.userId === userId);
    if (userPermission) {
      return this.checkAction(userPermission, action);
    }

    // Verificar permissões do role
    const rolePermission = permissions.find((p) => p.role === userRole && !p.userId);
    if (rolePermission) {
      return this.checkAction(rolePermission, action);
    }

    return false; // Nenhuma permissão encontrada
  }

  /**
   * Verifica se uma permissão permite uma ação específica
   */
  private checkAction(permission: ReportPermission, action: 'view' | 'generate' | 'download'): boolean {
    switch (action) {
      case 'view':
        return permission.canView;
      case 'generate':
        return permission.canGenerate;
      case 'download':
        return permission.canDownload;
      default:
        return false;
    }
  }

  /**
   * Atualiza uma permissão
   */
  async update(
    id: string,
    dto: Partial<CreatePermissionDto>,
  ): Promise<PermissionResponseDto> {
    const permission = await this.permissionRepository.findOne({ where: { id } });

    if (!permission) {
      throw new NotFoundException(`Permissão ${id} não encontrada`);
    }

    Object.assign(permission, dto);

    const saved = await this.permissionRepository.save(permission);

    this.logger.log(`Permissão atualizada: ${saved.id}`);

    return this.toPermissionResponseDto(saved);
  }

  /**
   * Remove uma permissão
   */
  async remove(id: string): Promise<void> {
    const permission = await this.permissionRepository.findOne({ where: { id } });

    if (!permission) {
      throw new NotFoundException(`Permissão ${id} não encontrada`);
    }

    await this.permissionRepository.remove(permission);

    this.logger.log(`Permissão removida: ${id}`);
  }

  /**
   * Converte entity para DTO de resposta
   */
  private toPermissionResponseDto(permission: ReportPermission): PermissionResponseDto {
    return {
      id: permission.id,
      catalogId: permission.catalogId,
      userId: permission.userId,
      role: permission.role,
      canView: permission.canView,
      canGenerate: permission.canGenerate,
      canDownload: permission.canDownload,
      createdById: permission.createdById,
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt,
    };
  }
}

