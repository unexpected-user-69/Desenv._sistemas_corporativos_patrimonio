import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TransformSwaggerStringsPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' && value && typeof value === 'object') {
      const bodyValue = value as Record<string, unknown>;
      // Transformar valores "string" do Swagger para undefined
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
        if (bodyValue[field] === 'string' || bodyValue[field] === '') {
          bodyValue[field] = undefined;
        }
      });
    }
    return value;
  }
}



