import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersHttpClient } from '../http-clients/users-http-client';
import { PatrimonioHttpClient } from '../http-clients/patrimonio-http-client';
import { User } from '../shared/entities/user.entity';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersHttpClient: UsersHttpClient,
    private readonly patrimonioService: PatrimonioHttpClient,
  ) { }

  /**
   * Obtém estatísticas gerais do dashboard
   */
  async getDashboardStats() {
    try {
      // Obter estatísticas de usuários
      const userStats = await this.usersHttpClient.getUserStatsByRole();
      const totalUsers = Object.values(userStats).reduce((a, b) => a + b, 0);
      const activeUsers = await this.usersHttpClient.findRecentActiveUsers(30, 1000);
      const activeUsersCount = activeUsers.length;

      // Obter estatísticas de patrimônios
      const patrimonioDashboard = await this.patrimonioService.getDashboard();

      // Calcular crescimento (simulado - pode ser melhorado com histórico)
      const usersGrowth = 0; // TODO: implementar cálculo de crescimento
      const patrimoniosGrowth = 0; // TODO: implementar cálculo de crescimento

      return {
        users: {
          total: totalUsers,
          active: activeUsersCount,
          growth: usersGrowth,
        },
        patrimonios: {
          total: patrimonioDashboard.total,
          valorTotal: patrimonioDashboard.valorTotal,
          growth: patrimoniosGrowth,
        },
        system: {
          uptime: process.uptime(),
          responseTime: 0, // TODO: implementar métrica de tempo de resposta
          cpuUsage: 0, // TODO: implementar métrica de CPU
          memoryUsage: 0, // TODO: implementar métrica de memória
          diskUsage: 0, // TODO: implementar métrica de disco
        },
        cache: {
          hitRate: 0, // TODO: implementar métrica de cache
          totalKeys: 0, // TODO: implementar métrica de cache
        },
      };
    } catch (error) {
      this.logger.error('Erro ao obter estatísticas do dashboard', error);
      throw error;
    }
  }

  /**
   * Obtém dados de crescimento de usuários
   */
  async getUserGrowthData(period: string) {
    try {
      const days = this.parsePeriod(period);
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Buscar usuários criados no período
      const users = await this.userRepository
        .createQueryBuilder('user')
        .select("DATE_TRUNC('day', user.createdAt)", 'date')
        .addSelect('COUNT(*)', 'count')
        .where('user.createdAt >= :startDate', { startDate })
        .andWhere('user.createdAt <= :endDate', { endDate })
        .groupBy("DATE_TRUNC('day', user.createdAt)")
        .orderBy("DATE_TRUNC('day', user.createdAt)", 'ASC')
        .getRawMany();

      // Criar mapa de datas para preencher lacunas
      const dateMap = new Map<string, number>();
      for (let i = 0; i < days; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        dateMap.set(dateStr, 0);
      }

      // Preencher com dados reais
      users.forEach((item) => {
        const dateStr = new Date(item.date).toISOString().split('T')[0];
        dateMap.set(dateStr, parseInt(item.count, 10));
      });

      // Converter para array
      return Array.from(dateMap.entries()).map(([date, count]) => ({
        date,
        count,
      }));
    } catch (error) {
      this.logger.error('Erro ao obter dados de crescimento de usuários', error);
      // Retornar dados vazios em caso de erro
      return [];
    }
  }

  /**
   * Obtém dados de crescimento de patrimônios
   */
  async getPatrimonioGrowthData(_period: string) {
    // TODO: Implementar endpoint no microserviço para obter dados de crescimento
    // Por enquanto retorna dados vazios para não quebrar o dashboard
    return [];
  }

  /**
   * Obtém métricas do sistema
   */
  async getSystemMetrics(_period: string) {
    try {
      const memUsage = process.memoryUsage();

      // Calcular uso de memória em MB
      const memoryUsageMB = Math.round(memUsage.heapUsed / 1024 / 1024);

      // Node.js não fornece CPU usage diretamente de forma confiável
      // Para uma implementação real, seria necessário usar biblioteca como 'systeminformation'
      // Por enquanto, usamos uma estimativa baseada no uso de memória
      // (quanto mais memória, mais processamento pode estar ocorrendo)
      const cpuUsagePercent = Math.min(100, Math.max(5, (memoryUsageMB / 100) * 10));

      // Retornar métricas atuais (para gráfico de tempo real, seria necessário histórico)
      return [
        {
          timestamp: new Date().toISOString(),
          cpu: cpuUsagePercent,
          cpuUsage: cpuUsagePercent,
          memory: memoryUsageMB,
          memoryUsage: memoryUsageMB,
          diskUsage: 0, // Requer biblioteca externa
        },
      ];
    } catch (error) {
      this.logger.error('Erro ao obter métricas do sistema', error);
      return [
        {
          timestamp: new Date().toISOString(),
          cpu: 0,
          cpuUsage: 0,
          memory: 0,
          memoryUsage: 0,
          diskUsage: 0,
        },
      ];
    }
  }

  /**
   * Obtém métricas do cache
   */
  async getCacheMetrics(_period: string) {
    try {
      // Em produção, isso seria obtido do Redis ou do cache manager
      // Por enquanto, retornamos métricas simuladas baseadas em estatísticas
      // que podem ser obtidas do CacheController

      // Nota: Para métricas reais, seria necessário:
      // 1. Injetar CacheService ou Redis client
      // 2. Obter estatísticas do Redis (INFO stats)
      // 3. Calcular hit rate baseado em hits/misses

      return [
        {
          timestamp: new Date().toISOString(),
          hitRate: 85.7, // Valor padrão do CacheController
          hit_rate: 85.7,
          totalKeys: 0,
          missRate: 14.3,
        },
      ];
    } catch (error) {
      this.logger.error('Erro ao obter métricas do cache', error);
      return [
        {
          timestamp: new Date().toISOString(),
          hitRate: 0,
          hit_rate: 0,
          totalKeys: 0,
          missRate: 0,
        },
      ];
    }
  }

  /**
   * Obtém atividade recente
   */
  async getRecentActivity(_limit: number) {
    // TODO: implementar busca de atividade recente do audit log
    return [];
  }

  /**
   * Obtém métricas em tempo real
   */
  async getRealtimeMetrics() {
    return {
      timestamp: new Date().toISOString(),
      activeUsers: 0,
      requestsPerSecond: 0,
      averageResponseTime: 0,
    };
  }

  /**
   * Obtém métricas de performance
   */
  async getPerformanceMetrics() {
    return {
      averageResponseTime: 0,
      p95ResponseTime: 0,
      p99ResponseTime: 0,
      requestsPerSecond: 0,
      errorRate: 0,
    };
  }

  /**
   * Obtém métricas de atividade de usuários
   */
  async getUserActivityMetrics(_period: string) {
    // TODO: implementar métricas de atividade de usuários
    return {
      totalLogins: 0,
      activeUsers: 0,
      newUsers: 0,
    };
  }

  /**
   * Converte período string para número de dias
   */
  private parsePeriod(period: string): number {
    if (period.endsWith('d')) {
      return parseInt(period.slice(0, -1), 10);
    }
    if (period.endsWith('h')) {
      return Math.ceil(parseInt(period.slice(0, -1), 10) / 24);
    }
    return 30; // padrão 30 dias
  }
}

