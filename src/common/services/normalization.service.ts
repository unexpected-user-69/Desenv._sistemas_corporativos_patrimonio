import { Injectable } from '@nestjs/common';

/**
 * Service dedicado para normalização de dados
 * Implementa injeção de dependência para facilitar testes e manutenção
 */
@Injectable()
export class NormalizationService {
  /**
   * Normaliza email: trim, lowercase e remove espaços extras
   * @param email - Email para normalizar
   * @returns string - Email normalizado
   */
  normalizeEmail(email: string): string {
    if (!email || typeof email !== 'string') {
      return '';
    }

    return email.trim().toLowerCase();
  }

  /**
   * Normaliza nome: trim e compacta espaços múltiplos
   * @param name - Nome para normalizar
   * @returns string - Nome normalizado
   */
  normalizeName(name: string): string {
    if (!name || typeof name !== 'string') {
      return '';
    }

    return name.trim().replace(/\s+/g, ' ');
  }

  /**
   * Normaliza string genérica: trim e compacta espaços
   * @param text - Texto para normalizar
   * @returns string - Texto normalizado
   */
  normalizeText(text: string): string {
    if (!text || typeof text !== 'string') {
      return '';
    }

    return text.trim().replace(/\s+/g, ' ');
  }

  /**
   * Remove caracteres especiais e normaliza para busca
   * @param text - Texto para limpar
   * @returns string - Texto limpo para busca
   */
  cleanForSearch(text: string): string {
    if (!text || typeof text !== 'string') {
      return '';
    }

    return text
      .trim()
      .toLowerCase()
      .replace(/[^\w\s\u00C0-\u017F]/g, ' ') // Substitui caracteres especiais por espaço para preservar palavras
      .replace(/\s+/g, ' ') // Compacta múltiplos espaços em um só
      .trim(); // Remove espaços no início e fim após substituição
  }

  /**
   * Capitaliza primeira letra de cada palavra
   * @param text - Texto para capitalizar
   * @returns string - Texto capitalizado
   */
  capitalizeWords(text: string): string {
    if (!text || typeof text !== 'string') {
      return '';
    }

    return text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ') // Compacta espaços primeiro
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
