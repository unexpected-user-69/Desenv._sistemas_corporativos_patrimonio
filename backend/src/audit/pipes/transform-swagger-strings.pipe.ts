import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TransformSwaggerStringsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' && value) {
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
        if (value[field] === 'string' || value[field] === '') {
          value[field] = undefined;
        }
      });
    }
    return value;
  }
}


