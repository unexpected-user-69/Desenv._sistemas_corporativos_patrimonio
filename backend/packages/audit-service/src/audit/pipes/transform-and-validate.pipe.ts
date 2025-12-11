import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpException, ValidationPipe } from '@nestjs/common';

@Injectable()
export class TransformAndValidatePipe implements PipeTransform {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      if (metadata.type === 'body' && value && typeof value === 'object') {
        const bodyValue = value as Record<string, unknown>;
        // Primeiro: transformar valores "string" e objetos vazios do Swagger para undefined
        const fieldsToTransform = [
          'userId',
          'entityId',
          'sessionId',
          'ipAddress',
          'userAgent',
          'service',
          'endpoint',
          'description',
        ];

        fieldsToTransform.forEach((field) => {
          const fieldValue = bodyValue[field];
          // Verificar se é string vazia, "string", null, ou objeto vazio
          // IMPORTANTE: null tem typeof 'object' em JavaScript, por isso verificamos primeiro
          if (fieldValue === null || 
              fieldValue === undefined ||
              fieldValue === 'string' || 
              fieldValue === '' ||
              (typeof fieldValue === 'object' && fieldValue !== null && !Array.isArray(fieldValue) && Object.keys(fieldValue).length === 0)) {
            // Converter null e valores inválidos para undefined (será removido pelo ValidationPipe)
            bodyValue[field] = undefined;
          }
        });
        
        // Tratar campos JSONB especificamente (oldValues e newValues)
        // Converter null para undefined
        if (bodyValue.oldValues === null || bodyValue.oldValues === undefined) {
          bodyValue.oldValues = undefined;
        } else if (typeof bodyValue.oldValues === 'object' && !Array.isArray(bodyValue.oldValues)) {
          // Se for objeto vazio {}, converter para undefined
          if (Object.keys(bodyValue.oldValues).length === 0) {
            bodyValue.oldValues = undefined;
          }
        }
        
        if (bodyValue.newValues === null || bodyValue.newValues === undefined) {
          bodyValue.newValues = undefined;
        } else if (typeof bodyValue.newValues === 'object' && !Array.isArray(bodyValue.newValues)) {
          // Se for objeto vazio {}, converter para undefined
          if (Object.keys(bodyValue.newValues).length === 0) {
            bodyValue.newValues = undefined;
          }
        }
      }

      // Depois: aplicar validação padrão
      const validationPipe = new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false, // Permitir propriedades extras para não quebrar
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        skipMissingProperties: true, // Pular validação de propriedades faltantes (campos opcionais)
        skipNullProperties: false, // Não pular propriedades null
        skipUndefinedProperties: false, // Não pular propriedades undefined
        exceptionFactory: (errors) => {
          const messages = errors.map((error) => {
            return Object.values(error.constraints || {}).join(', ');
          });
          return new BadRequestException({
            message: 'Dados inválidos',
            errors: messages,
          });
        },
      });

      return await validationPipe.transform(value, metadata);
    } catch (error) {
      // Se já for uma HttpException, apenas re-lançar
      if (error instanceof BadRequestException || error instanceof HttpException) {
        throw error;
      }
      // Caso contrário, converter para BadRequestException
      throw new BadRequestException({
        message: 'Erro na validação dos dados',
        error: error?.message || 'Erro desconhecido',
      });
    }
  }
}

