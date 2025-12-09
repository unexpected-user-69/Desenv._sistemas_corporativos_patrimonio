import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';

/**
 * Helper para criar providers de teste do PatrimonioController
 */
export function createPatrimonioControllerTestProviders(service: Partial<PatrimonioService> = {}) {
  return [
    { provide: PatrimonioService, useValue: service },
    {
      provide: PatrimonioPdfExportService,
      useValue: {
        generatePdf: jest.fn(),
      },
    },
  ];
}

