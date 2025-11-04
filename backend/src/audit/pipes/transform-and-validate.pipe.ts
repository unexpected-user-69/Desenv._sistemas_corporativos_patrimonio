import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class TransformAndValidatePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (metadata.type === 'body' && value) {
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
          const fieldValue = value[field];
          // Verificar se é string vazia, "string", null, ou objeto vazio
          if (fieldValue === 'string' || 
              fieldValue === '' || 
              fieldValue === null ||
              (typeof fieldValue === 'object' && fieldValue !== null && !Array.isArray(fieldValue) && Object.keys(fieldValue).length === 0)) {
            // Converter null e valores inválidos para undefined (será removido pelo ValidationPipe)
            value[field] = undefined;
          }
        });
        
        // Tratar campos JSONB especificamente (oldValues e newValues)
        if (value.oldValues !== undefined && 
            typeof value.oldValues === 'object' && 
            value.oldValues !== null && 
            Object.keys(value.oldValues).length === 0) {
          value.oldValues = undefined;
        }
        if (value.newValues !== undefined && 
            typeof value.newValues === 'object' && 
            value.newValues !== null && 
            Object.keys(value.newValues).length === 0) {
          value.newValues = undefined;
        }
      }

      // Depois: aplicar validação padrão
      const validationPipe = new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        skipMissingProperties: false,
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


