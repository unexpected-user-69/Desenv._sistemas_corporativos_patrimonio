import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { ReportModel } from '../entities/report-request.entity';
import { DataSource } from 'typeorm';
import { Patrimonio } from '../../patrimonio/entities/patrimonio.entity';
import { WorkOrder } from '../../maintenance/entities/work-order.entity';
import { Campaign } from '../../inventory-mobile/entities/campaign.entity';

@Injectable()
export class PdfGeneratorService {
  private readonly logger = new Logger(PdfGeneratorService.name);

  constructor(private readonly dataSource: DataSource) {}

  /**
   * Gera PDF para um modelo específico
   */
  async generatePdf(
    model: ReportModel,
    filters?: Record<string, any>,
  ): Promise<Buffer> {
    this.logger.log(`Gerando PDF para modelo: ${model}`);

    const html = await this.generateHtml(model, filters);

    // Gerar PDF usando Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm',
        },
      });

      return Buffer.from(pdf);
    } finally {
      await browser.close();
    }
  }

  /**
   * Gera HTML para o relatório
   */
  private async generateHtml(
    model: ReportModel,
    filters?: Record<string, any>,
  ): Promise<string> {
    let title: string;
    let content: string;

    switch (model) {
      case ReportModel.PATRIMONIO:
        ({ title, content } = await this.generatePatrimonioHtml(filters));
        break;
      case ReportModel.MANUTENCAO:
        ({ title, content } = await this.generateManutencaoHtml(filters));
        break;
      case ReportModel.INVENTARIO:
        ({ title, content } = await this.generateInventarioHtml(filters));
        break;
      case ReportModel.USO:
        ({ title, content } = await this.generateUsoHtml(filters));
        break;
      default:
        throw new Error(`Modelo ${model} não suportado`);
    }

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 12px;
      margin: 0;
      padding: 20px;
    }
    h1 {
      color: #333;
      border-bottom: 2px solid #333;
      padding-bottom: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      font-size: 10px;
      color: #666;
    }
  </style>
</head>
<body>
  <h1>${title}</h1>
  ${content}
  <div class="footer">
    <p>Gerado em ${new Date().toLocaleString('pt-BR')}</p>
  </div>
</body>
</html>
    `.trim();
  }

  /**
   * Gera HTML de patrimônios
   */
  private async generatePatrimonioHtml(
    filters?: Record<string, any>,
  ): Promise<{ title: string; content: string }> {
    const patrimonioRepo = this.dataSource.getRepository(Patrimonio);
    const queryBuilder = patrimonioRepo
      .createQueryBuilder('patrimonio')
      .leftJoinAndSelect('patrimonio.categoria', 'categoria')
      .leftJoinAndSelect('patrimonio.responsavel', 'responsavel');

    if (filters?.status) {
      queryBuilder.andWhere('patrimonio.status = :status', { status: filters.status });
    }
    if (filters?.categoriaId) {
      queryBuilder.andWhere('patrimonio.categoriaId = :categoriaId', {
        categoriaId: filters.categoriaId,
      });
    }

    const patrimonios = await queryBuilder.limit(100).getMany();

    const rows = patrimonios
      .map(
        (p) => `
    <tr>
      <td>${p.codigo || ''}</td>
      <td>${p.nome || ''}</td>
      <td>${p.categoria?.nome || ''}</td>
      <td>${p.status || ''}</td>
      <td>${p.valorAquisicao?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || ''}</td>
      <td>${p.responsavel?.name || ''}</td>
    </tr>
    `,
      )
      .join('');

    const content = `
  <table>
    <thead>
      <tr>
        <th>Código</th>
        <th>Nome</th>
        <th>Categoria</th>
        <th>Status</th>
        <th>Valor</th>
        <th>Responsável</th>
      </tr>
    </thead>
    <tbody>
      ${rows || '<tr><td colspan="6">Nenhum patrimônio encontrado</td></tr>'}
    </tbody>
  </table>
    `;

    return { title: 'Relatório de Patrimônios', content };
  }

  /**
   * Gera HTML de manutenção
   */
  private async generateManutencaoHtml(
    filters?: Record<string, any>,
  ): Promise<{ title: string; content: string }> {
    const workOrderRepo = this.dataSource.getRepository(WorkOrder);
    const queryBuilder = workOrderRepo
      .createQueryBuilder('workOrder')
      .leftJoinAndSelect('workOrder.patrimonio', 'patrimonio')
      .leftJoinAndSelect('workOrder.owner', 'owner');

    if (filters?.status) {
      queryBuilder.andWhere('workOrder.status = :status', { status: filters.status });
    }

    const workOrders = await queryBuilder.limit(100).getMany();

    const rows = workOrders
      .map(
        (wo) => `
    <tr>
      <td>${wo.titulo || ''}</td>
      <td>${wo.status || ''}</td>
      <td>${wo.prioridade || ''}</td>
      <td>${wo.patrimonio?.nome || ''}</td>
      <td>${wo.owner?.name || ''}</td>
      <td>${wo.openedAt ? new Date(wo.openedAt).toLocaleDateString('pt-BR') : ''}</td>
    </tr>
    `,
      )
      .join('');

    const content = `
  <table>
    <thead>
      <tr>
        <th>Título</th>
        <th>Status</th>
        <th>Prioridade</th>
        <th>Patrimônio</th>
        <th>Responsável</th>
        <th>Data de Abertura</th>
      </tr>
    </thead>
    <tbody>
      ${rows || '<tr><td colspan="6">Nenhuma ordem de serviço encontrada</td></tr>'}
    </tbody>
  </table>
    `;

    return { title: 'Relatório de Manutenção', content };
  }

  /**
   * Gera HTML de inventário
   */
  private async generateInventarioHtml(
    filters?: Record<string, any>,
  ): Promise<{ title: string; content: string }> {
    const campaignRepo = this.dataSource.getRepository(Campaign);
    const queryBuilder = campaignRepo.createQueryBuilder('campaign');

    if (filters?.status) {
      queryBuilder.andWhere('campaign.status = :status', { status: filters.status });
    }

    const campaigns = await queryBuilder.limit(100).getMany();

    const rows = campaigns
      .map(
        (c) => `
    <tr>
      <td>${c.nome || ''}</td>
      <td>${c.local || ''}</td>
      <td>${c.periodoInicio ? new Date(c.periodoInicio).toLocaleDateString('pt-BR') : ''}</td>
      <td>${c.periodoFim ? new Date(c.periodoFim).toLocaleDateString('pt-BR') : ''}</td>
      <td>${c.status || ''}</td>
    </tr>
    `,
      )
      .join('');

    const content = `
  <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Local</th>
        <th>Período Início</th>
        <th>Período Fim</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${rows || '<tr><td colspan="5">Nenhuma campanha encontrada</td></tr>'}
    </tbody>
  </table>
    `;

    return { title: 'Relatório de Inventário', content };
  }

  /**
   * Gera HTML de uso (placeholder)
   */
  private async generateUsoHtml(
    filters?: Record<string, any>,
  ): Promise<{ title: string; content: string }> {
    const content = `
  <table>
    <thead>
      <tr>
        <th>Descrição</th>
        <th>Data</th>
      </tr>
    </thead>
    <tbody>
      <tr><td colspan="2">Relatório de uso ainda não implementado</td></tr>
    </tbody>
  </table>
    `;

    return { title: 'Relatório de Uso', content };
  }
}

