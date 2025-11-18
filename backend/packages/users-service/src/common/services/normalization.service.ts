import { Injectable } from '@nestjs/common';

@Injectable()
export class NormalizationService {
  normalizeEmail(email: string): string {
    if (!email || typeof email !== 'string') {
      return '';
    }
    return email.trim().toLowerCase();
  }

  normalizeName(name: string): string {
    if (!name || typeof name !== 'string') {
      return '';
    }
    return name.trim().replace(/\s+/g, ' ');
  }

  normalizeText(text: string): string {
    if (!text || typeof text !== 'string') {
      return '';
    }
    return text.trim().replace(/\s+/g, ' ');
  }

  cleanForSearch(text: string): string {
    if (!text || typeof text !== 'string') {
      return '';
    }
    return text
      .trim()
      .toLowerCase()
      .replace(/[^\w\s\u00C0-\u017F]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  capitalizeWords(text: string): string {
    if (!text || typeof text !== 'string') {
      return '';
    }
    return text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

