import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOptionsWhere, ILike, Between } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../users/entities/user.entity';

export interface AdvancedFilterOptions {
  searchText?: string;
  role?: UserRole;
  isActive?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}

export interface FilterResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Service dedicado para filtros avançados e busca full-text
 * Implementa injeção de dependência para facilitar testes e manutenção
 */
@Injectable()
export class FilterService {
  /**
   * Aplica filtros avançados com busca full-text
   * @param options - Opções de filtro
   * @returns FindManyOptions<User> - Opções para o TypeORM
   */
  buildAdvancedFilters(options: AdvancedFilterOptions): FindManyOptions<User> {
    const {
      searchText,
      role,
      isActive,
      dateFrom,
      dateTo,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      page = 1,
      limit = 20,
    } = options;

    const whereConditions: FindOptionsWhere<User>[] = [];
    const skip = (page - 1) * limit;

    // Filtro por role
    if (role) {
      whereConditions.push({ role });
    }

    // Filtro por status ativo
    if (isActive !== undefined) {
      whereConditions.push({ isActive });
    }

    // Filtro por intervalo de datas
    if (dateFrom && dateTo) {
      whereConditions.push({
        createdAt: Between(dateFrom, dateTo),
      });
    } else if (dateFrom) {
      whereConditions.push({
        createdAt: Between(dateFrom, new Date()),
      });
    } else if (dateTo) {
      whereConditions.push({
        createdAt: Between(new Date(0), dateTo),
      });
    }

    // Busca full-text (nome OU email)
    if (searchText) {
      const searchPattern = `%${searchText}%`;
      // Se já temos outras condições, combinamos com OR para busca por nome/email
      if (whereConditions.length > 0) {
        const existingConditions = [...whereConditions];
        whereConditions.length = 0; // Limpa o array
        // Cria condições OR para nome e email combinadas com as existentes
        whereConditions.push(
          ...existingConditions.map((condition) => ({
            ...condition,
            name: ILike(searchPattern),
          })),
          ...existingConditions.map((condition) => ({
            ...condition,
            email: ILike(searchPattern),
          })),
        );
      } else {
        // Se não tem outras condições, apenas adiciona busca por nome ou email
        whereConditions.push(
          { name: ILike(searchPattern) },
          { email: ILike(searchPattern) },
        );
      }
    }

    // Construir opções de busca
    const findOptions: FindManyOptions<User> = {
      where: whereConditions.length > 0 ? whereConditions : undefined,
      skip,
      take: limit,
      order: {
        [sortBy]: sortOrder,
      },
    };

    return findOptions;
  }

  /**
   * Aplica filtros com paginação baseada em cursor
   * @param options - Opções de filtro
   * @param cursor - Cursor para paginação
   * @returns FindManyOptions<User> - Opções para o TypeORM
   */
  buildCursorFilters(
    options: AdvancedFilterOptions,
    cursor?: string,
  ): FindManyOptions<User> {
    const baseFilters = this.buildAdvancedFilters(options);

    if (cursor) {
      // Decodificar cursor (assumindo que é base64 encoded)
      try {
        const decodedCursor = JSON.parse(
          Buffer.from(cursor, 'base64').toString(),
        ) as { id: string; createdAt: string };
        const cursorDate = new Date(decodedCursor.createdAt);

        // Adicionar condição de cursor
        if (baseFilters.where) {
          if (Array.isArray(baseFilters.where)) {
            baseFilters.where.push({
              createdAt:
                options.sortOrder === 'ASC'
                  ? Between(cursorDate, new Date())
                  : Between(new Date(0), cursorDate),
            });
          } else {
            baseFilters.where = [
              baseFilters.where,
              {
                createdAt:
                  options.sortOrder === 'ASC'
                    ? Between(cursorDate, new Date())
                    : Between(new Date(0), cursorDate),
              },
            ];
          }
        } else {
          baseFilters.where = {
            createdAt:
              options.sortOrder === 'ASC'
                ? Between(cursorDate, new Date())
                : Between(new Date(0), cursorDate),
          };
        }
      } catch {
        // Cursor inválido, ignorar
      }
    }

    return baseFilters;
  }

  /**
   * Gera cursor para próxima página
   * @param lastItem - Último item da página atual
   * @returns string - Cursor codificado
   */
  generateCursor(lastItem: User): string {
    const cursorData = {
      id: lastItem.id,
      createdAt: lastItem.createdAt,
    };

    return Buffer.from(JSON.stringify(cursorData)).toString('base64');
  }

  /**
   * Valida opções de ordenação
   * @param sortBy - Campo para ordenação
   * @param sortOrder - Direção da ordenação
   * @returns boolean - True se válido
   */
  isValidSortOption(sortBy: string, sortOrder: string): boolean {
    const validSortFields = [
      'id',
      'name',
      'email',
      'role',
      'isActive',
      'createdAt',
      'updatedAt',
    ];
    const validSortOrders = ['ASC', 'DESC'];

    return (
      validSortFields.includes(sortBy) && validSortOrders.includes(sortOrder)
    );
  }

  /**
   * Aplica filtros de busca fuzzy (aproximada)
   * @param searchText - Texto para busca
   * @returns string[] - Padrões de busca fuzzy
   */
  generateFuzzyPatterns(searchText: string): string[] {
    if (!searchText || searchText.length < 2) {
      return [];
    }

    const patterns: string[] = [];
    const cleanText = searchText.toLowerCase().trim();

    // Padrão exato
    patterns.push(`%${cleanText}%`);

    // Padrões com caracteres faltando
    if (cleanText.length > 3) {
      for (let i = 0; i < cleanText.length; i++) {
        const fuzzyText = cleanText.slice(0, i) + cleanText.slice(i + 1);
        patterns.push(`%${fuzzyText}%`);
      }
    }

    // Padrões com caracteres extras
    if (cleanText.length > 2) {
      for (let i = 0; i <= cleanText.length; i++) {
        const fuzzyText = cleanText.slice(0, i) + '_' + cleanText.slice(i);
        patterns.push(`%${fuzzyText}%`);
      }
    }

    return patterns;
  }
}
