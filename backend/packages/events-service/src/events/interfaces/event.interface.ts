/**
 * Interface para Event - Contrato de Comunicação
 * 
 * Este contrato define a estrutura de dados do Event para comunicação
 * entre serviços em uma arquitetura de microserviços.
 * 
 * @future Preparado para comunicação assíncrona via eventos de domínio
 */
export interface IEvent {
  id: string;
  title: string;
  description?: string;
  slug: string;
  startDate: Date;
  endDate?: Date;
  eventType: string; // MANUTENCAO | TRANSFERENCIA | AUDITORIA | INVENTARIO | OUTROS
  visibility: string; // PUBLIC | PRIVATE | RESTRICTED
  state: string; // DRAFT | PUBLISHED | CANCELLED | COMPLETED
  createdBy: string;
  patrimonioIds?: string[]; // IDs dos patrimônios relacionados
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  version: number;
}

/**
 * Event Domain Event - Para comunicação assíncrona futura
 * 
 * Eventos de domínio que o módulo Events pode publicar para outros serviços
 */
export interface IEventDomainEvent {
  type: 'EVENT_CREATED' | 'EVENT_UPDATED' | 'EVENT_DELETED' | 'EVENT_PUBLISHED' | 'EVENT_CANCELLED' | 'EVENT_COMPLETED';
  payload: IEvent;
  timestamp: Date;
  source: 'events-service';
}

/**
 * Interface de Integração com Patrimônio
 * 
 * Define como o módulo Events se comunica com o módulo Patrimônio
 */
export interface IEventPatrimonioIntegration {
  /**
   * Adiciona patrimônios a um evento
   */
  addPatrimonios(eventId: string, patrimonioIds: string[]): Promise<void>;

  /**
   * Remove patrimônios de um evento
   */
  removePatrimonios(eventId: string, patrimonioIds: string[]): Promise<void>;

  /**
   * Lista patrimônios relacionados a um evento
   */
  getPatrimoniosByEvent(eventId: string): Promise<string[]>;
}
