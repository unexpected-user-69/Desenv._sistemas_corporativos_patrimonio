import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { CreateCategoriaDto } from '../categorias/dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../categorias/dto/update-categoria.dto';
import { QueryCategoriaDto } from '../categorias/dto/query-categoria.dto';
import { CategoriaResponseDto, PaginatedCategoriaResponseDto } from '../categorias/dto/categoria-response.dto';

@Injectable()
export class CategoriasHttpClient {
    private readonly baseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.baseUrl = this.configService.get<string>('CATEGORIAS_SERVICE_URL', 'http://localhost:3004');
    }

    async create(createCategoriaDto: CreateCategoriaDto): Promise<CategoriaResponseDto> {
        try {
            const response = await lastValueFrom(
                this.httpService.post(`${this.baseUrl}/categorias`, createCategoriaDto)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async findAll(query: QueryCategoriaDto): Promise<PaginatedCategoriaResponseDto> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/categorias`, { params: query })
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async findOne(id: string): Promise<CategoriaResponseDto> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/categorias/${id}`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async findByCodigo(codigo: string): Promise<CategoriaResponseDto> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/categorias/codigo/${codigo}`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async update(id: string, updateCategoriaDto: UpdateCategoriaDto): Promise<CategoriaResponseDto> {
        try {
            const response = await lastValueFrom(
                this.httpService.put(`${this.baseUrl}/categorias/${id}`, updateCategoriaDto)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async deactivate(id: string): Promise<void> {
        try {
            await lastValueFrom(
                this.httpService.patch(`${this.baseUrl}/categorias/${id}/desativar`)
            );
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async activate(id: string): Promise<void> {
        try {
            await lastValueFrom(
                this.httpService.patch(`${this.baseUrl}/categorias/${id}/ativar`)
            );
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await lastValueFrom(
                this.httpService.delete(`${this.baseUrl}/categorias/${id}`)
            );
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private handleError(error: any): Error {
        if (error.response) {
            // Repassa o erro do microsserviço com o mesmo status e mensagem
            const { status, data } = error.response;
            // Aqui poderíamos mapear para HttpException do NestJS se necessário,
            // mas lançar o erro original muitas vezes funciona se o filtro de exceção global tratar.
            // Para garantir, vamos lançar uma exceção genérica com os dados ou deixar o Nest tratar.
            // O ideal é ter um ErrorHandler centralizado.
            // Vou simplificar lançando o erro response data.
            throw new InternalServerErrorException(data.message || 'Erro no serviço de categorias');
        }
        throw new InternalServerErrorException('Erro de comunicação com serviço de categorias');
    }
}
