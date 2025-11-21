import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { CreateAuditLogDto } from '../audit/dto/create-audit-log.dto';
import { SearchAuditLogsDto } from '../audit/dto/search-audit-logs.dto';

@Injectable()
export class AuditHttpClient {
    private readonly baseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.baseUrl = this.configService.get<string>('AUDIT_SERVICE_URL', 'http://localhost:3005');
    }

    async createAuditLog(createAuditLogDto: CreateAuditLogDto): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.post(`${this.baseUrl}/audit/logs`, createAuditLogDto)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async findAll(searchDto: SearchAuditLogsDto): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/audit/logs`, { params: searchDto })
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async findOne(id: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/audit/logs/${id}`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async findByEntity(entityType: string, entityId: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/audit/logs/entity/${entityType}/${entityId}`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async findByUser(userId: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/audit/logs/user/${userId}`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getAuditStats(): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/audit/stats`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private handleError(error: any): Error {
        if (error.response) {
            const { data } = error.response;
            throw new InternalServerErrorException(data.message || 'Erro no serviço de auditoria');
        }
        throw new InternalServerErrorException('Erro de comunicação com serviço de auditoria');
    }
}
