import {
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { Response } from 'express';
import { stringify } from 'csv-stringify/sync';
import * as ExcelJS from 'exceljs';
import { Campaign } from './entities/campaign.entity';
import { Assignment, AssignmentStatus } from './entities/assignment.entity';
import { CollectedItem } from './entities/collected-item.entity';
import { Reconciliation, ReconciliationStatus } from './entities/reconciliation.entity';
import { CampaignReportDto, CampaignStatsDto } from './dto/campaign-report.dto';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    @InjectRepository(CollectedItem)
    private readonly collectedItemRepository: Repository<CollectedItem>,
    @InjectRepository(Reconciliation)
    private readonly reconciliationRepository: Repository<Reconciliation>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Gera relatório completo de uma campanha
   */
  async generateCampaignReport(campaignId: string): Promise<CampaignReportDto> {
    const campaign = await this.campaignRepository.findOne({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException(`Campanha ${campaignId} não encontrada`);
    }

    // Buscar assignments
    const assignments = await this.assignmentRepository.find({
      where: { campaignId },
    });

    // Buscar itens coletados
    const assignmentIds = assignments.map((a) => a.id);
    const collectedItems = assignmentIds.length > 0
      ? await this.collectedItemRepository.find({
          where: { assignmentId: In(assignmentIds) },
        })
      : [];

    // Buscar reconciliações
    const reconciliations = await this.reconciliationRepository.find({
      where: {
        campaignId,
        status: ReconciliationStatus.COMPLETED,
      },
      order: { executedAt: 'DESC' },
    });

    // Calcular estatísticas
    const stats: CampaignStatsDto = {
      totalAssignments: assignments.length,
      pendingAssignments: assignments.filter((a) => a.status === AssignmentStatus.PENDING).length,
      inProgressAssignments: assignments.filter((a) => a.status === AssignmentStatus.IN_PROGRESS).length,
      completedAssignments: assignments.filter((a) => a.status === AssignmentStatus.COMPLETED).length,
      totalCollectedItems: collectedItems.length,
      totalDivergences: reconciliations.reduce(
        (sum, rec) => sum + rec.divergenciasJson.length,
        0,
      ),
      completionRate:
        assignments.length > 0
          ? (assignments.filter((a) => a.status === AssignmentStatus.COMPLETED).length /
              assignments.length) *
            100
          : 0,
    };

    return {
      campaignId: campaign.id,
      campaignName: campaign.nome,
      location: campaign.local,
      periodStart: campaign.periodoInicio,
      periodEnd: campaign.periodoFim,
      status: campaign.status,
      stats,
      generatedAt: new Date(),
    };
  }

  /**
   * Exporta divergências para CSV
   */
  async exportDivergencesToCsv(
    campaignId: string,
    res: Response,
  ): Promise<void> {
    const campaign = await this.campaignRepository.findOne({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException(`Campanha ${campaignId} não encontrada`);
    }

    const reconciliations = await this.reconciliationRepository.find({
      where: {
        campaignId,
        status: ReconciliationStatus.COMPLETED,
      },
      order: { executedAt: 'DESC' },
    });

    // Preparar dados para CSV
    const rows: any[] = [];
    reconciliations.forEach((rec) => {
      rec.divergenciasJson.forEach((div) => {
        rows.push({
          'Reconciliação ID': rec.id,
          'Data Execução': rec.executedAt?.toISOString() || '',
          'Patrimônio ID': div.patrimonioId,
          'Código Lido': div.codigoLido,
          'Tipo Divergência': div.tipo,
          'Detalhes': JSON.stringify(div.detalhes),
        });
      });
    });

    if (rows.length === 0) {
      rows.push({
        'Reconciliação ID': '',
        'Data Execução': '',
        'Patrimônio ID': '',
        'Código Lido': '',
        'Tipo Divergência': 'Nenhuma divergência encontrada',
        'Detalhes': '',
      });
    }

    const csv = stringify(rows, {
      header: true,
      columns: [
        'Reconciliação ID',
        'Data Execução',
        'Patrimônio ID',
        'Código Lido',
        'Tipo Divergência',
        'Detalhes',
      ],
    });

    const filename = `divergencias-campanha-${campaignId}-${Date.now()}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${filename}"`,
    );
    res.send(csv);
  }

  /**
   * Exporta relatório de campanha para Excel
   */
  async exportCampaignToExcel(
    campaignId: string,
    res: Response,
  ): Promise<void> {
    const campaign = await this.campaignRepository.findOne({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException(`Campanha ${campaignId} não encontrada`);
    }

    const report = await this.generateCampaignReport(campaignId);

    // Buscar dados detalhados
    const assignments = await this.assignmentRepository.find({
      where: { campaignId },
      relations: ['coletor'],
    });

    const assignmentIds = assignments.map((a) => a.id);
    const collectedItems = assignmentIds.length > 0
      ? await this.collectedItemRepository
          .createQueryBuilder('item')
          .where('item.assignmentId IN (:...ids)', { ids: assignmentIds })
          .orderBy('item.coletadoEm', 'ASC')
          .getMany()
      : [];

    // Criar workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Relatório de Campanha');

    // Adicionar informações da campanha
    worksheet.addRow(['Relatório de Campanha de Inventário']);
    worksheet.addRow([]);
    worksheet.addRow(['Nome:', report.campaignName]);
    worksheet.addRow(['Local:', report.location]);
    worksheet.addRow(['Período:', `${report.periodStart.toLocaleDateString()} - ${report.periodEnd.toLocaleDateString()}`]);
    worksheet.addRow(['Status:', report.status]);
    worksheet.addRow([]);

    // Adicionar estatísticas
    worksheet.addRow(['Estatísticas']);
    worksheet.addRow(['Total de Assignments:', report.stats.totalAssignments]);
    worksheet.addRow(['Pendentes:', report.stats.pendingAssignments]);
    worksheet.addRow(['Em Progresso:', report.stats.inProgressAssignments]);
    worksheet.addRow(['Completados:', report.stats.completedAssignments]);
    worksheet.addRow(['Total de Itens Coletados:', report.stats.totalCollectedItems]);
    worksheet.addRow(['Total de Divergências:', report.stats.totalDivergences]);
    worksheet.addRow(['Taxa de Conclusão:', `${report.stats.completionRate.toFixed(2)}%`]);
    worksheet.addRow([]);

    // Adicionar assignments
    worksheet.addRow(['Assignments']);
    worksheet.addRow(['ID', 'Coletor ID', 'Status', 'Criado em']);
    assignments.forEach((assignment) => {
      worksheet.addRow([
        assignment.id,
        assignment.coletorId,
        assignment.status,
        assignment.createdAt.toISOString(),
      ]);
    });
    worksheet.addRow([]);

    // Adicionar itens coletados
    worksheet.addRow(['Itens Coletados']);
    worksheet.addRow(['ID', 'Assignment ID', 'Código Lido', 'Tipo Leitura', 'Coletado em']);
    collectedItems.forEach((item) => {
      worksheet.addRow([
        item.id,
        item.assignmentId,
        item.codigoLido,
        item.tipoLeitura,
        item.coletadoEm.toISOString(),
      ]);
    });

    // Estilizar
    worksheet.getRow(1).font = { bold: true, size: 14 };
    worksheet.getRow(9).font = { bold: true };
    worksheet.getRow(18).font = { bold: true };
    worksheet.getRow(18 + assignments.length + 1).font = { bold: true };

    // Gerar buffer
    const buffer = await workbook.xlsx.writeBuffer();

    const filename = `relatorio-campanha-${campaignId}-${Date.now()}.xlsx`;

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${filename}"`,
    );
    res.send(buffer);
  }

  /**
   * Obtém dashboard de estatísticas de campanhas
   */
  async getCampaignsDashboard(): Promise<{
    totalCampaigns: number;
    activeCampaigns: number;
    completedCampaigns: number;
    totalCollectedItems: number;
    totalDivergences: number;
    campaigns: Array<{
      id: string;
      nome: string;
      status: string;
      completionRate: number;
    }>;
  }> {
    const campaigns = await this.campaignRepository.find({
      order: { createdAt: 'DESC' },
    });

    const campaignIds = campaigns.map((c) => c.id);

    // Buscar assignments
    const assignments = campaignIds.length > 0
      ? await this.assignmentRepository.find({
          where: { campaignId: In(campaignIds) },
        })
      : [];

    // Buscar itens coletados
    const assignmentIds = assignments.map((a) => a.id);
    const collectedItems = assignmentIds.length > 0
      ? await this.collectedItemRepository.find({
          where: { assignmentId: In(assignmentIds) },
        })
      : [];

    // Buscar divergências
    const reconciliations = campaignIds.length > 0
      ? await this.reconciliationRepository
          .createQueryBuilder('rec')
          .where('rec.campaignId IN (:...ids)', { ids: campaignIds })
          .getMany()
      : [];

    const totalDivergences = reconciliations.reduce(
      (sum, rec) => sum + rec.divergenciasJson.length,
      0,
    );

    // Calcular taxa de conclusão por campanha
    const campaignsWithStats = campaigns.map((campaign) => {
      const campAssignments = assignments.filter(
        (a) => a.campaignId === campaign.id,
      );
      const completed = campAssignments.filter(
        (a) => a.status === AssignmentStatus.COMPLETED,
      ).length;
      const completionRate =
        campAssignments.length > 0
          ? (completed / campAssignments.length) * 100
          : 0;

      return {
        id: campaign.id,
        nome: campaign.nome,
        status: campaign.status,
        completionRate: Math.round(completionRate * 100) / 100,
      };
    });

    return {
      totalCampaigns: campaigns.length,
      activeCampaigns: campaigns.filter((c) => c.status === 'active').length,
      completedCampaigns: campaigns.filter((c) => c.status === 'completed').length,
      totalCollectedItems: collectedItems.length,
      totalDivergences,
      campaigns: campaignsWithStats,
    };
  }
}

