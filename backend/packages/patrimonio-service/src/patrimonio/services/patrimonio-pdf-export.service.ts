import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, Between, LessThanOrEqual, MoreThanOrEqual, In } from 'typeorm';
import * as puppeteer from 'puppeteer';
import { Patrimonio } from '../entities/patrimonio.entity';
import { QueryPatrimonioDto } from '../dto/query-patrimonio.dto';

@Injectable()
export class PatrimonioPdfExportService {
  private readonly logger = new Logger(PatrimonioPdfExportService.name);

  constructor(
    @InjectRepository(Patrimonio)
    private readonly patrimonioRepository: Repository<Patrimonio>,
  ) {}

  /**
   * Gera PDF de patrimônios com filtros
   */
  async generatePdf(query: QueryPatrimonioDto): Promise<Buffer> {
    this.logger.log('Gerando PDF de patrimônios');

    let browser;
    try {
      // Buscar patrimônios com os mesmos filtros do findAll
      const patrimonios = await this.findPatrimonios(query);
      this.logger.log(`Encontrados ${patrimonios.length} patrimônios para exportar`);

      // Gerar HTML
      const html = this.generateHtml(patrimonios, query);

      // Gerar PDF usando Puppeteer
      this.logger.log('Iniciando Puppeteer...');
      
      // Configurações do Puppeteer para Windows
      const launchOptions: any = {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
          '--disable-software-rasterizer',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
        ],
        timeout: 60000, // 60 segundos timeout
      };

      // Se estiver no Windows, pode precisar de configurações adicionais
      if (process.platform === 'win32') {
        // O Puppeteer deve encontrar o Chrome automaticamente
        // Mas podemos especificar o executável se necessário
        this.logger.log('Sistema operacional: Windows');
      }

      browser = await puppeteer.launch(launchOptions);

      this.logger.log('Puppeteer iniciado, criando página...');
      const page = await browser.newPage();
      
      // Configurar timeout para carregamento da página (60 segundos)
      page.setDefaultTimeout(60000);
      
      this.logger.log('Carregando HTML na página...');
      await page.setContent(html, { 
        waitUntil: 'domcontentloaded', // Mudado de networkidle0 para domcontentloaded (mais rápido)
        timeout: 60000,
      });

      this.logger.log('Gerando PDF...');
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm',
        },
        timeout: 60000,
      });

      this.logger.log(`PDF gerado com sucesso: ${pdf.length} bytes`);
      return Buffer.from(pdf);
    } catch (error) {
      this.logger.error('Erro ao gerar PDF:', error);
      
      // Se for erro do Puppeteer, fornecer mensagem mais útil
      if (error instanceof Error) {
        if (error.message.includes('Browser closed') || error.message.includes('Target closed')) {
          throw new Error('Erro ao iniciar o navegador. Verifique se o Puppeteer está instalado corretamente.');
        }
        if (error.message.includes('timeout')) {
          throw new Error('Timeout ao gerar PDF. Tente novamente ou reduza a quantidade de patrimônios.');
        }
        if (error.message.includes('Protocol error') || error.message.includes('Navigation failed')) {
          throw new Error('Erro de comunicação com o navegador. Verifique a instalação do Puppeteer.');
        }
      }
      
      throw error;
    } finally {
      if (browser) {
        try {
          await browser.close();
          this.logger.log('Navegador fechado');
        } catch (closeError) {
          this.logger.warn('Erro ao fechar navegador:', closeError);
        }
      }
    }
  }

  /**
   * Busca patrimônios usando os mesmos filtros do service
   */
  private async findPatrimonios(query: QueryPatrimonioDto): Promise<Patrimonio[]> {
    const queryBuilder = this.patrimonioRepository
      .createQueryBuilder('patrimonio');

    // Aplicar filtros
    if (query.q) {
      queryBuilder.andWhere(
        '(patrimonio.codigo ILIKE :q OR patrimonio.nome ILIKE :q OR patrimonio.descricao ILIKE :q)',
        { q: `%${query.q}%` },
      );
    }

    if (query.categoriaId) {
      queryBuilder.andWhere('patrimonio.categoriaId = :categoriaId', {
        categoriaId: query.categoriaId,
      });
    }

    if (query.status) {
      queryBuilder.andWhere('patrimonio.status = :status', { status: query.status });
    }

    if (query.marca) {
      queryBuilder.andWhere('patrimonio.marca ILIKE :marca', { marca: `%${query.marca}%` });
    }

    if (query.modelo) {
      queryBuilder.andWhere('patrimonio.modelo ILIKE :modelo', { modelo: `%${query.modelo}%` });
    }

    if (query.localizacao) {
      queryBuilder.andWhere('patrimonio.localizacao ILIKE :localizacao', {
        localizacao: `%${query.localizacao}%`,
      });
    }

    if (query.responsavelId) {
      queryBuilder.andWhere('patrimonio.responsavelId = :responsavelId', {
        responsavelId: query.responsavelId,
      });
    }

    if (query.valorMinimo !== undefined) {
      queryBuilder.andWhere('patrimonio.valorAquisicao >= :valorMinimo', {
        valorMinimo: query.valorMinimo,
      });
    }

    if (query.valorMaximo !== undefined) {
      queryBuilder.andWhere('patrimonio.valorAquisicao <= :valorMaximo', {
        valorMaximo: query.valorMaximo,
      });
    }

    if (query.dataInicial) {
      const dataInicial = new Date(query.dataInicial);
      dataInicial.setHours(0, 0, 0, 0);
      queryBuilder.andWhere('patrimonio.dataAquisicao >= :dataInicial', { dataInicial });
    }

    if (query.dataFinal) {
      const dataFinal = new Date(query.dataFinal);
      dataFinal.setHours(23, 59, 59, 999);
      queryBuilder.andWhere('patrimonio.dataAquisicao <= :dataFinal', { dataFinal });
    }

    // Ordenação
    const sortBy = query.sortBy || 'nome';
    const sortOrder = query.sortOrder || 'ASC';
    queryBuilder.orderBy(`patrimonio.${sortBy}`, sortOrder);

    // Limitar a 1000 patrimônios para PDF (para não gerar PDFs muito grandes)
    queryBuilder.take(1000);

    return queryBuilder.getMany();
  }

  /**
   * Gera HTML do relatório
   */
  private generateHtml(patrimonios: Patrimonio[], query: QueryPatrimonioDto): string {
    const dataEmissao = new Date().toLocaleString('pt-BR');
    const total = patrimonios.length;

    const rows = patrimonios
      .map(
        (p) => `
    <tr>
      <td>${p.codigo || ''}</td>
      <td>${p.nome || ''}</td>
      <td>${p.categoriaId || '-'}</td>
      <td>${p.status || ''}</td>
      <td>${p.valorAquisicao ? p.valorAquisicao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-'}</td>
      <td>${p.dataAquisicao ? new Date(p.dataAquisicao).toLocaleDateString('pt-BR') : '-'}</td>
      <td>${p.responsavelId || '-'}</td>
      <td>${p.localizacao || '-'}</td>
    </tr>
    `,
      )
      .join('');

    const valorTotal = patrimonios.reduce((sum, p) => sum + (Number(p.valorAquisicao) || 0), 0);

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 10pt;
      margin: 0;
      padding: 0;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 2px solid #333;
      padding-bottom: 10px;
    }
    .header h1 {
      margin: 0;
      font-size: 18pt;
      color: #333;
    }
    .header p {
      margin: 5px 0;
      color: #666;
      font-size: 9pt;
    }
    .info {
      margin-bottom: 15px;
      padding: 10px;
      background-color: #f5f5f5;
      border-radius: 5px;
    }
    .info p {
      margin: 3px 0;
      font-size: 9pt;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    th {
      background-color: #333;
      color: white;
      padding: 8px;
      text-align: left;
      font-size: 9pt;
      font-weight: bold;
    }
    td {
      padding: 6px;
      border-bottom: 1px solid #ddd;
      font-size: 8pt;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    .footer {
      margin-top: 20px;
      padding-top: 10px;
      border-top: 1px solid #ddd;
      text-align: center;
      font-size: 8pt;
      color: #666;
    }
    .total {
      margin-top: 15px;
      padding: 10px;
      background-color: #e8f4f8;
      border-radius: 5px;
      text-align: right;
    }
    .total strong {
      font-size: 11pt;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Relatório de Patrimônios</h1>
    <p>Data de emissão: ${dataEmissao}</p>
  </div>

  <div class="info">
    <p><strong>Total de patrimônios:</strong> ${total}</p>
    ${query.q ? `<p><strong>Busca:</strong> ${query.q}</p>` : ''}
    ${query.status ? `<p><strong>Status:</strong> ${query.status}</p>` : ''}
    ${query.categoriaId ? `<p><strong>Categoria ID:</strong> ${query.categoriaId}</p>` : ''}
  </div>

  <table>
    <thead>
      <tr>
        <th>Código</th>
        <th>Nome</th>
        <th>Categoria</th>
        <th>Status</th>
        <th>Valor</th>
        <th>Data Aquisição</th>
        <th>Responsável</th>
        <th>Localização</th>
      </tr>
    </thead>
    <tbody>
      ${rows || '<tr><td colspan="8">Nenhum patrimônio encontrado</td></tr>'}
    </tbody>
  </table>

  ${valorTotal > 0 ? `
  <div class="total">
    <strong>Valor Total: ${valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
  </div>
  ` : ''}

  <div class="footer">
    <p>Relatório gerado pelo Sistema de Patrimônio</p>
  </div>
</body>
</html>
    `.trim();
  }
}


