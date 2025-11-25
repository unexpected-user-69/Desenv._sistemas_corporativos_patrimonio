import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import { randomUUID } from 'crypto';

export interface FileUploadResult {
  filename: string;
  path: string;
  url: string;
  mimetype: string;
  size: number;
}

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly uploadDir: string;
  private readonly maxFileSize: number = 5 * 1024 * 1024; // 5MB
  private readonly allowedMimeTypes: string[] = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ];

  constructor(private readonly configService: ConfigService) {
    // Diretório de upload: ./uploads/patrimonio ou configurado via env
    this.uploadDir = this.configService.get<string>('UPLOAD_DIR') || 
      path.join(process.cwd(), 'uploads', 'patrimonio');
    
    this.ensureUploadDirExists();
  }

  /**
   * Garante que o diretório de upload existe
   */
  private async ensureUploadDirExists(): Promise<void> {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
      this.logger.log(`Diretório de upload configurado: ${this.uploadDir}`);
    } catch (error) {
      this.logger.error('Erro ao criar diretório de upload', error);
      throw error;
    }
  }

  /**
   * Valida o arquivo de upload
   */
  validateFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('Arquivo não fornecido');
    }

    // Validar tipo MIME
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Tipo de arquivo não permitido. Tipos permitidos: ${this.allowedMimeTypes.join(', ')}`,
      );
    }

    // Validar tamanho
    if (file.size > this.maxFileSize) {
      throw new BadRequestException(
        `Arquivo muito grande. Tamanho máximo: ${this.maxFileSize / 1024 / 1024}MB`,
      );
    }
  }

  /**
   * Salva arquivo e retorna informações
   */
  async saveFile(file: Express.Multer.File, patrimonioId: string): Promise<FileUploadResult> {
    this.validateFile(file);

    try {
      // Gerar nome único para o arquivo
      const fileExtension = path.extname(file.originalname);
      const uniqueFilename = `${patrimonioId}-${randomUUID()}${fileExtension}`;
      const filePath = path.join(this.uploadDir, uniqueFilename);

      // Salvar arquivo
      await fs.writeFile(filePath, file.buffer);

      // Gerar URL relativa (pode ser ajustado para URL absoluta se necessário)
      const fileUrl = `/uploads/patrimonio/${uniqueFilename}`;

      this.logger.log(`Arquivo salvo: ${filePath}`);

      return {
        filename: uniqueFilename,
        path: filePath,
        url: fileUrl,
        mimetype: file.mimetype,
        size: file.size,
      };
    } catch (error) {
      this.logger.error('Erro ao salvar arquivo', error);
      throw new BadRequestException('Erro ao salvar arquivo');
    }
  }

  /**
   * Remove arquivo do storage
   */
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Extrair nome do arquivo da URL
      const filename = path.basename(fileUrl);
      const filePath = path.join(this.uploadDir, filename);

      // Verificar se arquivo existe
      try {
        await fs.access(filePath);
      } catch {
        // Arquivo não existe, não é erro crítico
        this.logger.warn(`Arquivo não encontrado para remoção: ${filePath}`);
        return;
      }

      // Remover arquivo
      await fs.unlink(filePath);
      this.logger.log(`Arquivo removido: ${filePath}`);
    } catch (error) {
      this.logger.error('Erro ao remover arquivo', error);
      // Não lançar erro para não quebrar o fluxo se o arquivo não existir
    }
  }

  /**
   * Verifica se arquivo existe
   */
  async fileExists(fileUrl: string): Promise<boolean> {
    try {
      const filename = path.basename(fileUrl);
      const filePath = path.join(this.uploadDir, filename);
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}




