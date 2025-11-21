import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import FormData from 'form-data';
import { CreatePatrimonioDto } from '../patrimonio/dto/create-patrimonio.dto';
import { UpdatePatrimonioDto } from '../patrimonio/dto/update-patrimonio.dto';
import { QueryPatrimonioDto } from '../patrimonio/dto/query-patrimonio.dto';
import { UpdateStatusPatrimonioDto } from '../patrimonio/dto/update-status-patrimonio.dto';
import { TransferirResponsavelDto } from '../patrimonio/dto/transferir-responsavel.dto';
import { DescartePatrimonioDto } from '../patrimonio/dto/descarte-patrimonio.dto';
import { UpdateLocalizacaoPatrimonioDto } from '../patrimonio/dto/update-localizacao-patrimonio.dto';

@Injectable()
export class PatrimonioHttpClient {
    private readonly baseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.baseUrl = this.configService.get<string>('PATRIMONIO_SERVICE_URL', 'http://localhost:3006');
    }

    async create(createPatrimonioDto: CreatePatrimonioDto): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.post(`${this.baseUrl}/patrimonio`, createPatrimonioDto)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async findAllWithFilters(filters: QueryPatrimonioDto): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/patrimonio`, { params: filters })
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async findOne(id: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/patrimonio/${id}`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async findByCodigo(codigo: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/patrimonio/codigo/${codigo}`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async findByCategoria(categoriaId: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/patrimonio/categoria/${categoriaId}`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async findByStatus(status: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/patrimonio/status/${status}`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async findByResponsavel(responsavelId: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/patrimonio/responsavel/${responsavelId}`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getStatsByCategoria(): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/patrimonio/stats/categoria`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getStatsByStatus(): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/patrimonio/stats/status`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getValorTotal(): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/patrimonio/stats/valor-total`)
            );
            return response.data.valorTotal;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getPatrimoniosProximosVencimentoGarantia(dias?: number): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/patrimonio/vencimento-garantia`, { params: { dias } })
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getDashboard(): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/patrimonio/dashboard`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async findByLocalizacao(localizacao: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/patrimonio/localizacao/${localizacao}`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async transferResponsavel(id: string, dto: TransferirResponsavelDto): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.post(`${this.baseUrl}/patrimonio/${id}/transferir-responsavel`, dto)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async marcarDescarte(id: string, dto: DescartePatrimonioDto): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.post(`${this.baseUrl}/patrimonio/${id}/descarte`, dto)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async uploadFoto(id: string, file: Express.Multer.File): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('file', file.buffer, {
                filename: file.originalname,
                contentType: file.mimetype,
            });

            const response = await lastValueFrom(
                this.httpService.post(`${this.baseUrl}/patrimonio/${id}/foto`, formData, {
                    headers: {
                        ...formData.getHeaders(),
                    },
                })
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async removeFoto(id: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.delete(`${this.baseUrl}/patrimonio/${id}/foto`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async updateStatus(id: string, dto: UpdateStatusPatrimonioDto): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.patch(`${this.baseUrl}/patrimonio/${id}/status`, dto)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async ativar(id: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.patch(`${this.baseUrl}/patrimonio/${id}/ativar`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async desativar(id: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.patch(`${this.baseUrl}/patrimonio/${id}/desativar`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async updateLocalizacao(id: string, dto: UpdateLocalizacaoPatrimonioDto, userId?: string): Promise<any> {
        try {
            // Pass userId in headers or body if needed by microservice
            const headers = userId ? { 'x-user-id': userId } : {};
            const response = await lastValueFrom(
                this.httpService.patch(`${this.baseUrl}/patrimonio/${id}/localizacao`, dto, { headers })
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async verificarDisponibilidade(id: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/patrimonio/${id}/disponibilidade`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getHistorico(id: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/patrimonio/${id}/historico`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getHistoricoResponsaveis(id: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/patrimonio/${id}/historico/responsaveis`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getHistoricoLocalizacoes(id: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.baseUrl}/patrimonio/${id}/historico/localizacoes`)
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async update(id: string, updatePatrimonioDto: UpdatePatrimonioDto, userId?: string): Promise<any> {
        try {
            const headers = userId ? { 'x-user-id': userId } : {};
            const response = await lastValueFrom(
                this.httpService.put(`${this.baseUrl}/patrimonio/${id}`, updatePatrimonioDto, { headers })
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await lastValueFrom(
                this.httpService.delete(`${this.baseUrl}/patrimonio/${id}`)
            );
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getStatsLocalizacoes(): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/stats/localizacoes`));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async getStatsFaixaValor(intervalo?: number): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/stats/faixa-valor`, { params: { intervalo } }));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async getStatsAquisicao(periodo?: string): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/stats/aquisicao`, { params: { periodo } }));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async getStatsEvolucao(periodo?: string, ano?: number): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/stats/evolucao`, { params: { periodo, ano } }));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async exportToCsv(query: any, res: any): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/export/csv`, { params: query, responseType: 'stream' }));
            return response.data.pipe(res);
        } catch (error) { throw this.handleError(error); }
    }

    async exportToExcel(query: any, res: any): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/export/excel`, { params: query, responseType: 'stream' }));
            return response.data.pipe(res);
        } catch (error) { throw this.handleError(error); }
    }

    async exportToPdf(res: any, options: any): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.post(`${this.baseUrl}/patrimonio/export/pdf`, options, { responseType: 'stream' }));
            return response.data.pipe(res);
        } catch (error) { throw this.handleError(error); }
    }

    async gerarRelatorioInventario(dto: any, res: any): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.post(`${this.baseUrl}/patrimonio/relatorios/inventario`, dto, { responseType: 'stream' }));
            return response.data.pipe(res);
        } catch (error) { throw this.handleError(error); }
    }

    async findByNumeroSerie(numeroSerie: string): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/numero-serie/${numeroSerie}`));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async findByAquisicaoPeriodo(query: any): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/busca/aquisicao`, { params: query }));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async findByValorRange(query: any): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/busca/valor`, { params: query }));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async findByStatusMultiplos(query: any): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/busca/status-multiplos`, { params: query }));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async findByCategoriasMultiplas(query: any): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/busca/categorias-multiplas`, { params: query }));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async createBulkWithTransaction(dto: any): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.post(`${this.baseUrl}/patrimonio/bulk`, dto));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async updateBulk(dto: any): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.patch(`${this.baseUrl}/patrimonio/bulk`, dto));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async transferResponsavelBulk(dto: any): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.post(`${this.baseUrl}/patrimonio/bulk/transferir-responsavel`, dto));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async validarCodigo(codigo: string): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/validar-codigo/${codigo}`));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async verificarDuplicidade(dto: any): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.post(`${this.baseUrl}/patrimonio/verificar-duplicidade`, dto));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async findGarantiaExpirada(dias: number): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/garantia/expirada`, { params: { dias } }));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async findGarantiaVencendo(dias: number): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/garantia/vencendo`, { params: { dias } }));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async findManutencaoProlongada(dias: number): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/manutencao/prolongada`, { params: { dias } }));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async findSemResponsavel(): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/busca/sem-responsavel`));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async getHistoricoPorResponsavel(responsavelId: string): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/historico/responsavel/${responsavelId}`));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async findAllWithFoto(query: any): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/busca/com-foto`, { params: query }));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async getStatsByResponsavel(responsavelId: string): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/stats/responsavel/${responsavelId}`));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async getStatsByMarcaModelo(): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/stats/marca-modelo`));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async getTopValiosos(query: any): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/stats/top-valiosos`, { params: query }));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async getNovos(query: any): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/patrimonio/stats/novos`, { params: query }));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    async deleteBulk(dto: any): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.post(`${this.baseUrl}/patrimonio/bulk/delete`, dto));
            return response.data;
        } catch (error) { throw this.handleError(error); }
    }

    private handleError(error: any): Error {
        if (error.response) {
            const { data } = error.response;
            throw new InternalServerErrorException(data.message || 'Erro no serviço de patrimônio');
        }
        throw new InternalServerErrorException('Erro de comunicação com serviço de patrimônio');
    }
}
