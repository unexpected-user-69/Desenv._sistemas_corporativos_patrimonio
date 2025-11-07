import { Injectable, Logger } from '@nestjs/common';
import { stringify } from 'csv-stringify/sync';
import { ReportModel } from '../entities/report-request.entity';
import { DataSource, Repository } from 'typeorm';
import { Patrimonio } from '../../patrimonio/entities/patrimonio.entity';
import { WorkOrder } from '../../maintenance/entities/work-order.entity';
import { Campaign } from '../../inventory-mobile/entities/campaign.entity';

@Injectable()
export class CsvGeneratorService {
  private readonly logger = new Logger(CsvGeneratorService.name);

  constructor(private readonly dataSource: DataSource) {}

  /**
   * Gera CSV para um modelo específico
   */
  async generateCsv(
    model: ReportModel,
    filters?: Record<string, any>,
  ): Promise<Buffer> {
    this.logger.log(`Gerando CSV para modelo: ${model}`);

    let data: any[];
    let headers: string[];

    switch (model) {
      case ReportModel.PATRIMONIO:
        ({ data, headers } = await this.generatePatrimonioCsv(filters));
        break;
      case ReportModel.MANUTENCAO:
        ({ data, headers } = await this.generateManutencaoCsv(filters));
        break;
      case ReportModel.INVENTARIO:
        ({ data, headers } = await this.generateInventarioCsv(filters));
        break;
      case ReportModel.USO:
        ({ data, headers } = await this.generateUsoCsv(filters));
        break;
      default:
        throw new Error(`Modelo ${model} não suportado`);
    }

    // Gerar CSV
    const csvData = stringify([headers, ...data], {
      header: true,
      bom: true, // UTF-8 BOM para Excel
    });

    return Buffer.from(csvData, 'utf-8');
  }

  /**
   * Gera CSV de patrimônios
   */
  private async generatePatrimonioCsv(
    filters?: Record<string, any>,
  ): Promise<{ data: any[]; headers: string[] }> {
    const patrimonioRepo = this.dataSource.getRepository(Patrimonio);
    const queryBuilder = patrimonioRepo
      .createQueryBuilder('patrimonio')
      .leftJoinAndSelect('patrimonio.categoria', 'categoria')
      .leftJoinAndSelect('patrimonio.responsavel', 'responsavel');

    // Aplicar filtros
    if (filters?.status) {
      queryBuilder.andWhere('patrimonio.status = :status', { status: filters.status });
    }
    if (filters?.categoriaId) {
      queryBuilder.andWhere('patrimonio.categoriaId = :categoriaId', {
        categoriaId: filters.categoriaId,
      });
    }
    if (filters?.responsavelId) {
      queryBuilder.andWhere('patrimonio.responsavelId = :responsavelId', {
        responsavelId: filters.responsavelId,
      });
    }

    const patrimonios = await queryBuilder.getMany();

    const headers = [
      'Código',
      'Nome',
      'Descrição',
      'Categoria',
      'Status',
      'Valor de Aquisição',
      'Data de Aquisição',
      'Data de Garantia',
      'Número de Série',
      'Modelo',
      'Marca',
      'Localização',
      'Responsável',
      'Observações',
    ];

    const data = patrimonios.map((patrimonio) => [
      patrimonio.codigo || '',
      patrimonio.nome || '',
      patrimonio.descricao || '',
      patrimonio.categoria?.nome || '',
      patrimonio.status || '',
      patrimonio.valorAquisicao?.toString() || '',
      patrimonio.dataAquisicao
        ? new Date(patrimonio.dataAquisicao).toISOString().split('T')[0]
        : '',
      patrimonio.dataGarantia
        ? new Date(patrimonio.dataGarantia).toISOString().split('T')[0]
        : '',
      patrimonio.numeroSerie || '',
      patrimonio.modelo || '',
      patrimonio.marca || '',
      patrimonio.localizacao || '',
      patrimonio.responsavel?.name || '',
      patrimonio.observacoes || '',
    ]);

    return { data, headers };
  }

  /**
   * Gera CSV de manutenção
   */
  private async generateManutencaoCsv(
    filters?: Record<string, any>,
  ): Promise<{ data: any[]; headers: string[] }> {
    const workOrderRepo = this.dataSource.getRepository(WorkOrder);
    const queryBuilder = workOrderRepo
      .createQueryBuilder('workOrder')
      .leftJoinAndSelect('workOrder.patrimonio', 'patrimonio')
      .leftJoinAndSelect('workOrder.owner', 'owner');

    // Aplicar filtros
    if (filters?.status) {
      queryBuilder.andWhere('workOrder.status = :status', { status: filters.status });
    }
    if (filters?.patrimonioId) {
      queryBuilder.andWhere('workOrder.patrimonioId = :patrimonioId', {
        patrimonioId: filters.patrimonioId,
      });
    }

    const workOrders = await queryBuilder.getMany();

    const headers = [
      'ID',
      'Título',
      'Descrição',
      'Status',
      'Prioridade',
      'Patrimônio',
      'Responsável',
      'Data de Abertura',
      'Data de Conclusão',
      'Descrição Completa',
    ];

    const data = workOrders.map((wo) => [
      wo.id || '',
      wo.titulo || '',
      wo.descricao || '',
      wo.status || '',
      wo.prioridade || '',
      wo.patrimonio?.nome || '',
      wo.owner?.name || '',
      wo.openedAt ? new Date(wo.openedAt).toISOString().split('T')[0] : '',
      wo.closedAt ? new Date(wo.closedAt).toISOString().split('T')[0] : '',
      wo.descricao || '',
    ]);

    return { data, headers };
  }

  /**
   * Gera CSV de inventário
   */
  private async generateInventarioCsv(
    filters?: Record<string, any>,
  ): Promise<{ data: any[]; headers: string[] }> {
    const campaignRepo = this.dataSource.getRepository(Campaign);
    const queryBuilder = campaignRepo.createQueryBuilder('campaign');

    // Aplicar filtros
    if (filters?.status) {
      queryBuilder.andWhere('campaign.status = :status', { status: filters.status });
    }

    const campaigns = await queryBuilder.getMany();

    const headers = [
      'ID',
      'Nome',
      'Local',
      'Período Início',
      'Período Fim',
      'Status',
      'Data de Criação',
    ];

    const data = campaigns.map((campaign) => [
      campaign.id || '',
      campaign.nome || '',
      campaign.local || '',
      campaign.periodoInicio
        ? new Date(campaign.periodoInicio).toISOString().split('T')[0]
        : '',
      campaign.periodoFim
        ? new Date(campaign.periodoFim).toISOString().split('T')[0]
        : '',
      campaign.status || '',
      campaign.createdAt ? new Date(campaign.createdAt).toISOString().split('T')[0] : '',
    ]);

    return { data, headers };
  }

  /**
   * Gera CSV de uso (placeholder - implementar conforme necessário)
   */
  private async generateUsoCsv(
    filters?: Record<string, any>,
  ): Promise<{ data: any[]; headers: string[] }> {
    // Placeholder - implementar conforme necessário
    const headers = ['ID', 'Descrição', 'Data'];
    const data: any[] = [];

    return { data, headers };
  }
}

