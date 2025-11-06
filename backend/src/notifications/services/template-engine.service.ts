import { Injectable, Logger } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import { NotificationTemplate } from '../entities/notification-template.entity';

/**
 * Serviço responsável por renderizar templates usando Handlebars
 */
@Injectable()
export class TemplateEngineService {
  private readonly logger = new Logger(TemplateEngineService.name);

  /**
   * Renderiza um template com os dados fornecidos
   */
  renderTemplate(template: NotificationTemplate, data: Record<string, any>): {
    subject?: string;
    body: string;
  } {
    try {
      // Compilar template do body
      const bodyTemplate = Handlebars.compile(template.body);
      const renderedBody = bodyTemplate(data);

      // Renderizar subject se existir
      let renderedSubject: string | undefined;
      if (template.subject) {
        const subjectTemplate = Handlebars.compile(template.subject);
        renderedSubject = subjectTemplate(data);
      }

      return {
        subject: renderedSubject,
        body: renderedBody,
      };
    } catch (error: any) {
      this.logger.error(`Erro ao renderizar template ${template.id}:`, error);
      throw new Error(`Erro ao renderizar template: ${error.message}`);
    }
  }

  /**
   * Valida se um template é válido (compila sem erros)
   */
  validateTemplate(template: string): { valid: boolean; error?: string } {
    try {
      Handlebars.compile(template);
      return { valid: true };
    } catch (error: any) {
      return {
        valid: false,
        error: error.message,
      };
    }
  }

  /**
   * Pré-visualiza um template com dados de exemplo
   */
  previewTemplate(template: NotificationTemplate, sampleData?: Record<string, any>): {
    subject?: string;
    body: string;
  } {
    const data = sampleData || this.getSampleData(template.key);
    return this.renderTemplate(template, data);
  }

  /**
   * Retorna dados de exemplo baseado na chave do template
   */
  private getSampleData(templateKey: string): Record<string, any> {
    // Dados de exemplo baseados no tipo de template
    if (templateKey.includes('patrimonio')) {
      return {
        patrimonio: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          nome: 'Notebook Dell Inspiron',
          codigo: 'PAT-001',
          status: 'ATIVO',
        },
        novoStatus: 'MANUTENCAO',
        usuario: {
          nome: 'João Silva',
          email: 'joao@example.com',
        },
      };
    }

    if (templateKey.includes('maintenance')) {
      return {
        workOrder: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          titulo: 'Manutenção preventiva',
          status: 'EM_ANDAMENTO',
        },
        patrimonio: {
          nome: 'Ar Condicionado',
          codigo: 'PAT-002',
        },
        dataAgendada: new Date().toLocaleDateString('pt-BR'),
      };
    }

    // Dados genéricos
    return {
      evento: 'Evento de teste',
      data: new Date().toLocaleDateString('pt-BR'),
      usuario: {
        nome: 'Usuário Teste',
        email: 'teste@example.com',
      },
    };
  }
}

