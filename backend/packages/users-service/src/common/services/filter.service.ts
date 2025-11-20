import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOptionsWhere, ILike, Between } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../users/enums/user-role.enum';

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

@Injectable()
export class FilterService {
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

    if (role) {
      whereConditions.push({ role });
    }

    if (isActive !== undefined) {
      whereConditions.push({ isActive });
    }

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

    if (searchText) {
      const searchPattern = `%${searchText}%`;
      if (whereConditions.length > 0) {
        const existingConditions = [...whereConditions];
        whereConditions.length = 0;
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
        whereConditions.push(
          { name: ILike(searchPattern) },
          { email: ILike(searchPattern) },
        );
      }
    }

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

  buildCursorFilters(
    options: AdvancedFilterOptions,
    cursor?: string,
  ): FindManyOptions<User> {
    const baseFilters = this.buildAdvancedFilters(options);

    if (cursor) {
      try {
        const decodedCursor = JSON.parse(
          Buffer.from(cursor, 'base64').toString(),
        ) as { id: string; createdAt: string };
        const cursorDate = new Date(decodedCursor.createdAt);

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

  generateCursor(lastItem: User): string {
    const cursorData = {
      id: lastItem.id,
      createdAt: lastItem.createdAt,
    };
    return Buffer.from(JSON.stringify(cursorData)).toString('base64');
  }

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

  generateFuzzyPatterns(searchText: string): string[] {
    if (!searchText || searchText.length < 2) {
      return [];
    }

    const patterns: string[] = [];
    const cleanText = searchText.toLowerCase().trim();

    patterns.push(`%${cleanText}%`);

    if (cleanText.length > 3) {
      for (let i = 0; i < cleanText.length; i++) {
        const fuzzyText = cleanText.slice(0, i) + cleanText.slice(i + 1);
        patterns.push(`%${fuzzyText}%`);
      }
    }

    if (cleanText.length > 2) {
      for (let i = 0; i <= cleanText.length; i++) {
        const fuzzyText = cleanText.slice(0, i) + '_' + cleanText.slice(i);
        patterns.push(`%${fuzzyText}%`);
      }
    }

    return patterns;
  }
}





