import { Injectable, Logger } from '@nestjs/common';
import { MaintenanceReport } from './maintenance-reports.service';
import { stringify } from 'csv-stringify/sync';
import * as ExcelJS from 'exceljs';

@Injectable()
export class MaintenanceExportService {
  private readonly logger = new Logger(MaintenanceExportService.name);

  /**
   * Exporta relatório para CSV
   */
  async exportToCsv(report: MaintenanceReport): Promise<string> {
    try {
      // Cabeçalho do CSV
      // Converter valores numéricos para garantir que são números
      const totalCost = typeof report.summary.totalCost === 'string' 
        ? parseFloat(report.summary.totalCost) || 0 
        : report.summary.totalCost || 0;
      const totalLaborHours = typeof report.summary.totalLaborHours === 'string'
        ? parseFloat(report.summary.totalLaborHours) || 0
        : report.summary.totalLaborHours || 0;
      const totalPartsCost = typeof report.summary.totalPartsCost === 'string'
        ? parseFloat(report.summary.totalPartsCost) || 0
        : report.summary.totalPartsCost || 0;
      
      const csvData: any[] = [
        ['Relatório de Manutenção'],
        [`Período: ${report.period.from.toISOString().split('T')[0]} a ${report.period.to.toISOString().split('T')[0]}`],
        [],
        ['Resumo'],
        ['Total de OS', report.summary.totalOs],
        ['Custo Total', `R$ ${totalCost.toFixed(2)}`],
        ['Total de Horas Trabalhadas', totalLaborHours.toFixed(2)],
        ['Custo Total de Peças', `R$ ${totalPartsCost.toFixed(2)}`],
        [],
        ['OS por Status'],
        ...Object.entries(report.summary.osByStatus).map(([status, count]) => [status, count]),
        [],
        ['Ordens de Serviço'],
        [
          'ID',
          'Título',
          'Patrimônio',
          'Status',
          'Data Abertura',
          'Data Fechamento',
          'Custo Total',
          'Horas Trabalhadas',
          'Custo Peças',
          'Quantidade Peças',
        ],
        ...report.workOrders.map((wo) => {
          const woTotalCost = typeof wo.totalCost === 'string' ? parseFloat(wo.totalCost) || 0 : wo.totalCost || 0;
          const woLaborHours = typeof wo.laborHours === 'string' ? parseFloat(wo.laborHours) || 0 : wo.laborHours || 0;
          const woPartsCost = typeof wo.partsCost === 'string' ? parseFloat(wo.partsCost) || 0 : wo.partsCost || 0;
          
          return [
            wo.id,
            wo.titulo,
            wo.patrimonioId,
            wo.status,
            wo.openedAt.toISOString().split('T')[0],
            wo.closedAt ? wo.closedAt.toISOString().split('T')[0] : '',
            `R$ ${woTotalCost.toFixed(2)}`,
            woLaborHours.toFixed(2),
            `R$ ${woPartsCost.toFixed(2)}`,
            wo.partsCount,
          ];
        }),
      ];

      return stringify(csvData, {
        delimiter: ';',
        quoted: true,
      });
    } catch (error) {
      this.logger.error('Erro ao exportar CSV', error);
      throw error;
    }
  }

  /**
   * Exporta relatório para Excel
   */
  async exportToExcel(report: MaintenanceReport): Promise<Buffer> {
    try {
      const workbook = new ExcelJS.Workbook();
      
      // Aba de Resumo
      const summarySheet = workbook.addWorksheet('Resumo');
      
      summarySheet.addRow(['Relatório de Manutenção']);
      summarySheet.addRow([`Período: ${report.period.from.toISOString().split('T')[0]} a ${report.period.to.toISOString().split('T')[0]}`]);
      summarySheet.addRow([]);
      
      summarySheet.addRow(['Resumo']);
      summarySheet.addRow(['Total de OS', report.summary.totalOs]);
      summarySheet.addRow(['Custo Total', report.summary.totalCost]);
      summarySheet.addRow(['Total de Horas Trabalhadas', report.summary.totalLaborHours]);
      summarySheet.addRow(['Custo Total de Peças', report.summary.totalPartsCost]);
      summarySheet.addRow([]);
      
      summarySheet.addRow(['OS por Status']);
      summarySheet.addRow(['Status', 'Quantidade']);
      Object.entries(report.summary.osByStatus).forEach(([status, count]) => {
        summarySheet.addRow([status, count]);
      });

      // Formatação da aba de resumo
      summarySheet.getColumn(1).width = 30;
      summarySheet.getColumn(2).width = 20;
      summarySheet.getRow(1).font = { bold: true, size: 14 };
      summarySheet.getRow(4).font = { bold: true };
      summarySheet.getRow(11).font = { bold: true };

      // Aba de Ordens de Serviço
      const workOrdersSheet = workbook.addWorksheet('Ordens de Serviço');
      
      workOrdersSheet.addRow([
        'ID',
        'Título',
        'Patrimônio',
        'Status',
        'Data Abertura',
        'Data Fechamento',
        'Custo Total',
        'Horas Trabalhadas',
        'Custo Peças',
        'Quantidade Peças',
      ]);

      // Formatação do cabeçalho
      workOrdersSheet.getRow(1).font = { bold: true };
      workOrdersSheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' },
      };

      // Adicionar dados
      report.workOrders.forEach((wo) => {
        workOrdersSheet.addRow([
          wo.id,
          wo.titulo,
          wo.patrimonioId,
          wo.status,
          wo.openedAt,
          wo.closedAt || '',
          wo.totalCost,
          wo.laborHours,
          wo.partsCost,
          wo.partsCount,
        ]);
      });

      // Ajustar larguras das colunas
      workOrdersSheet.getColumn(1).width = 36; // ID
      workOrdersSheet.getColumn(2).width = 30; // Título
      workOrdersSheet.getColumn(3).width = 36; // Patrimônio
      workOrdersSheet.getColumn(4).width = 15; // Status
      workOrdersSheet.getColumn(5).width = 18; // Data Abertura
      workOrdersSheet.getColumn(6).width = 18; // Data Fechamento
      workOrdersSheet.getColumn(7).width = 15; // Custo Total
      workOrdersSheet.getColumn(8).width = 18; // Horas Trabalhadas
      workOrdersSheet.getColumn(9).width = 15; // Custo Peças
      workOrdersSheet.getColumn(10).width = 18; // Quantidade Peças

      // Formatação de valores monetários
      workOrdersSheet.getColumn(7).numFmt = 'R$ #,##0.00';
      workOrdersSheet.getColumn(9).numFmt = 'R$ #,##0.00';
      workOrdersSheet.getColumn(8).numFmt = '#,##0.00';

      // Formatação de datas
      workOrdersSheet.getColumn(5).numFmt = 'dd/mm/yyyy';
      workOrdersSheet.getColumn(6).numFmt = 'dd/mm/yyyy';

      // Gerar buffer
      const buffer = await workbook.xlsx.writeBuffer();
      return Buffer.from(buffer);
    } catch (error) {
      this.logger.error('Erro ao exportar Excel', error);
      throw error;
    }
  }
}

