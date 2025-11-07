import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
  Request,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { ReportsService } from './reports.service';
import { CreateReportRequestDto } from './dto/create-report-request.dto';
import { ReportRequestResponseDto } from './dto/report-request-response.dto';
import { ListReportsQueryDto } from './dto/list-reports-query.dto';

@ApiTags('reports')
@ApiBearerAuth()
@Controller('v1/reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('export')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Solicitar geração de relatório',
    description: 'Cria uma solicitação de geração de relatório (CSV ou PDF)',
  })
  @ApiResponse({
    status: 202,
    description: 'Solicitação aceita e enfileirada',
    type: ReportRequestResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  @ApiTooManyRequestsResponse({ description: 'Limite de solicitações excedido' })
  async requestExport(
    @Body() dto: CreateReportRequestDto,
    @Request() req: any,
  ): Promise<ReportRequestResponseDto> {
    const userId = req.user?.id || req.user?.sub;
    return this.reportsService.createRequest(dto, userId);
  }

  @Get('requests')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar solicitações de relatório',
    description: 'Lista todas as solicitações de relatório com filtros opcionais',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de solicitações',
    type: [ReportRequestResponseDto],
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async listRequests(
    @Query() query: ListReportsQueryDto,
    @Request() req: any,
  ): Promise<ReportRequestResponseDto[]> {
    // Se não for admin, filtrar apenas solicitações do próprio usuário
    const userId = req.user?.role === UserRole.ADMIN ? undefined : req.user?.id || req.user?.sub;
    return this.reportsService.findAllRequests(query, userId);
  }

  @Get('requests/:id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Buscar solicitação por ID',
    description: 'Retorna detalhes de uma solicitação de relatório',
  })
  @ApiResponse({
    status: 200,
    description: 'Solicitação encontrada',
    type: ReportRequestResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Solicitação não encontrada' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getRequest(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ReportRequestResponseDto> {
    return this.reportsService.findRequestById(id);
  }

  @Get(':id/download')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Baixar artefato de relatório',
    description: 'Baixa o arquivo gerado (CSV ou PDF) se estiver pronto',
  })
  @ApiResponse({
    status: 200,
    description: 'Arquivo baixado com sucesso',
  })
  @ApiNotFoundResponse({ description: 'Solicitação não encontrada ou artefato não disponível' })
  @ApiBadRequestResponse({ description: 'Artefato expirado ou não disponível' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async downloadArtifact(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ): Promise<void> {
    const request = await this.reportsService.findRequestById(id);

    // Se não estiver completo, tentar processar agora (modo síncrono para testes)
    if (request.status !== 'completed') {
      if (request.status === 'pending' || request.status === 'processing') {
        try {
          const { buffer, mime } = await this.reportsService.processRequest(id);

          // Criar artefato em memória (sem S3 por enquanto)
          const filename = `relatorio-${request.model}-${Date.now()}.${request.type}`;
          
          res.setHeader('Content-Type', mime);
          res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
          res.setHeader('Content-Length', buffer.length.toString());
          res.send(buffer);
          return;
        } catch (error: any) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: `Erro ao processar relatório: ${error.message}`,
          });
          return;
        }
      }

      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Relatório está com status: ${request.status}`,
      });
      return;
    }

    // Se já tem artefato, usar ele (quando S3 estiver implementado)
    if (request.artifact) {
      // Verificar se expirou
      if (request.artifact.expiresAt && new Date(request.artifact.expiresAt) < new Date()) {
        res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Artefato expirado',
        });
        return;
      }

      // TODO: Implementar download do S3/MinIO
      res.status(HttpStatus.NOT_IMPLEMENTED).json({
        statusCode: HttpStatus.NOT_IMPLEMENTED,
        message: 'Download de artefatos do storage ainda não implementado (aguardando integração S3/MinIO)',
        artifact: {
          storageKey: request.artifact.storageKey,
          mime: request.artifact.mime,
          sizeBytes: request.artifact.sizeBytes,
        },
      });
      return;
    }

    // Se está completo mas não tem artefato, processar novamente
    try {
      const { buffer, mime } = await this.reportsService.processRequest(id);
      const filename = `relatorio-${request.model}-${Date.now()}.${request.type}`;
      
      res.setHeader('Content-Type', mime);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Length', buffer.length.toString());
      res.send(buffer);
    } catch (error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao processar relatório: ${error.message}`,
      });
    }
  }
}

