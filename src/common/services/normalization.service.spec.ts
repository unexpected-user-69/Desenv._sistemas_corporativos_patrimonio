import { Test, TestingModule } from '@nestjs/testing';
import { NormalizationService } from './normalization.service';

describe('NormalizationService', () => {
  let service: NormalizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NormalizationService],
    }).compile();

    service = module.get<NormalizationService>(NormalizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('normalizeEmail', () => {
    it('should normalize email to lowercase and trim', () => {
      // Arrange
      const email = '  TEST@EXAMPLE.COM  ';

      // Act
      const result = service.normalizeEmail(email);

      // Assert
      expect(result).toBe('test@example.com');
    });

    it('should handle empty string', () => {
      // Arrange
      const email = '';

      // Act
      const result = service.normalizeEmail(email);

      // Assert
      expect(result).toBe('');
    });

    it('should handle null/undefined', () => {
      // Arrange
      const email = null as any;

      // Act
      const result = service.normalizeEmail(email);

      // Assert
      expect(result).toBe('');
    });

    it('should handle already normalized email', () => {
      // Arrange
      const email = 'test@example.com';

      // Act
      const result = service.normalizeEmail(email);

      // Assert
      expect(result).toBe('test@example.com');
    });
  });

  describe('normalizeName', () => {
    it('should normalize name by trimming and compacting spaces', () => {
      // Arrange
      const name = '  João   Silva   Santos  ';

      // Act
      const result = service.normalizeName(name);

      // Assert
      expect(result).toBe('João Silva Santos');
    });

    it('should handle multiple spaces between words', () => {
      // Arrange
      const name = 'João    Silva     Santos';

      // Act
      const result = service.normalizeName(name);

      // Assert
      expect(result).toBe('João Silva Santos');
    });

    it('should handle empty string', () => {
      // Arrange
      const name = '';

      // Act
      const result = service.normalizeName(name);

      // Assert
      expect(result).toBe('');
    });

    it('should handle null/undefined', () => {
      // Arrange
      const name = null as any;

      // Act
      const result = service.normalizeName(name);

      // Assert
      expect(result).toBe('');
    });

    it('should handle already normalized name', () => {
      // Arrange
      const name = 'João Silva Santos';

      // Act
      const result = service.normalizeName(name);

      // Assert
      expect(result).toBe('João Silva Santos');
    });
  });

  describe('normalizeText', () => {
    it('should normalize text by trimming and compacting spaces', () => {
      // Arrange
      const text = '  This   is   a   test   text  ';

      // Act
      const result = service.normalizeText(text);

      // Assert
      expect(result).toBe('This is a test text');
    });

    it('should handle empty string', () => {
      // Arrange
      const text = '';

      // Act
      const result = service.normalizeText(text);

      // Assert
      expect(result).toBe('');
    });
  });

  describe('cleanForSearch', () => {
    it('should clean text for search by removing special characters', () => {
      // Arrange
      const text = 'João Silva-Santos (Test)';

      // Act
      const result = service.cleanForSearch(text);

      // Assert
      expect(result).toBe('joão silva santos test');
    });

    it('should handle text with numbers and special characters', () => {
      // Arrange
      const text = 'User123@#$%Test';

      // Act
      const result = service.cleanForSearch(text);

      // Assert
      expect(result).toBe('user123 test');
    });

    it('should handle empty string', () => {
      // Arrange
      const text = '';

      // Act
      const result = service.cleanForSearch(text);

      // Assert
      expect(result).toBe('');
    });

    it('should compact multiple spaces', () => {
      // Arrange
      const text = 'João    Silva     Santos';

      // Act
      const result = service.cleanForSearch(text);

      // Assert
      expect(result).toBe('joão silva santos');
    });
  });

  describe('capitalizeWords', () => {
    it('should capitalize first letter of each word', () => {
      // Arrange
      const text = 'joão silva santos';

      // Act
      const result = service.capitalizeWords(text);

      // Assert
      expect(result).toBe('João Silva Santos');
    });

    it('should handle mixed case text', () => {
      // Arrange
      const text = 'jOÃO sILVA sANTOS';

      // Act
      const result = service.capitalizeWords(text);

      // Assert
      expect(result).toBe('João Silva Santos');
    });

    it('should handle empty string', () => {
      // Arrange
      const text = '';

      // Act
      const result = service.capitalizeWords(text);

      // Assert
      expect(result).toBe('');
    });

    it('should handle text with extra spaces', () => {
      // Arrange
      const text = '  joão   silva   santos  ';

      // Act
      const result = service.capitalizeWords(text);

      // Assert
      expect(result).toBe('João Silva Santos');
    });

    it('should handle single word', () => {
      // Arrange
      const text = 'joão';

      // Act
      const result = service.capitalizeWords(text);

      // Assert
      expect(result).toBe('João');
    });
  });
});
