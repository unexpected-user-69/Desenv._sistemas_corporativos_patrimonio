import { Injectable, Logger } from '@nestjs/common';
import {
  FieldMapping,
  TransformType,
  ValidationRule,
  ValidationType,
} from './field-mapping.interface';

export interface TransformResult {
  value: any;
  errors: string[];
}

@Injectable()
export class FieldTransformerService {
  private readonly logger = new Logger(FieldTransformerService.name);

  /**
   * Transforma um valor de acordo com o tipo de transformação
   */
  transform(value: any, mapping: FieldMapping): TransformResult {
    const errors: string[] = [];

    // Aplicar valor padrão se necessário
    if ((value === null || value === undefined || value === '') && mapping.defaultValue !== undefined) {
      value = mapping.defaultValue;
    }

    // Validar obrigatoriedade
    if (mapping.required && (value === null || value === undefined || value === '')) {
      errors.push(`Campo ${mapping.target} é obrigatório`);
      return { value: null, errors };
    }

    // Se não há valor e não é obrigatório, retornar null
    if (value === null || value === undefined || value === '') {
      return { value: null, errors };
    }

    // Aplicar transformação customizada se existir
    if (mapping.transformFn) {
      try {
        value = mapping.transformFn(value);
      } catch (error: any) {
        errors.push(`Erro na transformação customizada de ${mapping.target}: ${error.message}`);
        return { value: null, errors };
      }
    }

    // Aplicar transformação padrão
    if (mapping.transform && mapping.transform !== TransformType.NONE) {
      try {
        value = this.applyTransform(value, mapping.transform, mapping);
      } catch (error: any) {
        errors.push(`Erro na transformação ${mapping.transform} de ${mapping.target}: ${error.message}`);
        return { value: null, errors };
      }
    }

    // Aplicar validações
    if (mapping.validations && mapping.validations.length > 0) {
      for (const validation of mapping.validations) {
        const validationError = this.validate(value, validation, mapping.target);
        if (validationError) {
          errors.push(validationError);
        }
      }
    }

    return { value, errors };
  }

  /**
   * Aplica uma transformação específica
   */
  private applyTransform(
    value: any,
    transformType: TransformType,
    mapping: FieldMapping,
  ): any {
    switch (transformType) {
      case TransformType.TO_STRING:
        return String(value);
      case TransformType.TO_NUMBER:
        const num = Number(value);
        if (isNaN(num)) {
          throw new Error(`Não é possível converter "${value}" para número`);
        }
        return num;
      case TransformType.TO_DATE:
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          throw new Error(`Não é possível converter "${value}" para data`);
        }
        return date;
      case TransformType.TO_BOOLEAN:
        if (typeof value === 'boolean') return value;
        if (typeof value === 'string') {
          const lower = value.toLowerCase();
          return lower === 'true' || lower === '1' || lower === 'yes' || lower === 'sim';
        }
        return Boolean(value);
      case TransformType.TO_UPPERCASE:
        return String(value).toUpperCase();
      case TransformType.TO_LOWERCASE:
        return String(value).toLowerCase();
      case TransformType.TRIM:
        return String(value).trim();
      case TransformType.FORMAT_CURRENCY:
        return this.formatCurrency(value);
      case TransformType.FORMAT_DATE:
        return this.formatDate(value);
      default:
        return value;
    }
  }

  /**
   * Valida um valor de acordo com uma regra
   */
  private validate(
    value: any,
    rule: ValidationRule,
    fieldName: string,
  ): string | null {
    switch (rule.type) {
      case ValidationType.REQUIRED:
        if (value === null || value === undefined || value === '') {
          return rule.message || `Campo ${fieldName} é obrigatório`;
        }
        break;
      case ValidationType.MIN:
        if (Number(value) < rule.value!) {
          return rule.message || `Campo ${fieldName} deve ser maior ou igual a ${rule.value}`;
        }
        break;
      case ValidationType.MAX:
        if (Number(value) > rule.value!) {
          return rule.message || `Campo ${fieldName} deve ser menor ou igual a ${rule.value}`;
        }
        break;
      case ValidationType.MIN_LENGTH:
        if (String(value).length < rule.value!) {
          return rule.message || `Campo ${fieldName} deve ter no mínimo ${rule.value} caracteres`;
        }
        break;
      case ValidationType.MAX_LENGTH:
        if (String(value).length > rule.value!) {
          return rule.message || `Campo ${fieldName} deve ter no máximo ${rule.value} caracteres`;
        }
        break;
      case ValidationType.PATTERN:
        const regex = new RegExp(rule.value!);
        if (!regex.test(String(value))) {
          return rule.message || `Campo ${fieldName} não corresponde ao padrão esperado`;
        }
        break;
      case ValidationType.ENUM:
        if (!rule.value!.includes(value)) {
          return rule.message || `Campo ${fieldName} deve ser um dos valores: ${rule.value!.join(', ')}`;
        }
        break;
      case ValidationType.EMAIL:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(String(value))) {
          return rule.message || `Campo ${fieldName} deve ser um email válido`;
        }
        break;
      case ValidationType.URL:
        try {
          new URL(String(value));
        } catch {
          return rule.message || `Campo ${fieldName} deve ser uma URL válida`;
        }
        break;
      case ValidationType.DATE:
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return rule.message || `Campo ${fieldName} deve ser uma data válida`;
        }
        break;
      case ValidationType.NUMBER:
        if (isNaN(Number(value))) {
          return rule.message || `Campo ${fieldName} deve ser um número válido`;
        }
        break;
    }
    return null;
  }

  /**
   * Formata valor como moeda
   */
  private formatCurrency(value: any): string {
    const num = Number(value);
    if (isNaN(num)) {
      throw new Error(`Não é possível formatar "${value}" como moeda`);
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(num);
  }

  /**
   * Formata data
   */
  private formatDate(value: any): string {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error(`Não é possível formatar "${value}" como data`);
    }
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }
}

