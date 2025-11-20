import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { LoggerModule } from '../common/logger/logger.module';
import { ReportsController } from './reports.controller';
import { ReportCatalogController } from './report-catalog.controller';
import { ReportsMetricsController } from './reports-metrics.controller';
import { ReportsService } from './reports.service';
import { ReportRequest } from './entities/report-request.entity';
import { ReportArtifact } from './entities/report-artifact.entity';
import { ReportCatalog } from './entities/report-catalog.entity';
import { ReportCatalogVersion } from './entities/report-catalog-version.entity';
import { ReportPermission } from './entities/report-permission.entity';
import { CsvGeneratorService } from './services/csv-generator.service';
import { PdfGeneratorService } from './services/pdf-generator.service';
import { ReportQueueService } from './services/report-queue.service';
import { ReportSchedulerService } from './services/report-scheduler.service';
import { ReportCatalogService } from './services/report-catalog.service';
import { ReportPermissionService } from './services/report-permission.service';
import { ReportQuotaService } from './services/report-quota.service';
import { ReportMetricsService } from './services/report-metrics.service';
import { ReportStructuredLoggerService } from './services/report-structured-logger.service';
import { ReportProcessor } from './processors/report.processor';
import { ReportQuota } from './entities/report-quota.entity';
import { User } from '../shared/entities/user.entity';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      ReportRequest,
      ReportArtifact,
      ReportCatalog,
      ReportCatalogVersion,
      ReportPermission,
      ReportQuota,
      User, // Necessário para relações ManyToOne nas entidades de reports
    ]),
    BullModule.registerQueue({
      name: 'report-queue',
      defaultJobOptions: {
        attempts: 3,
        timeout: 120000, // 120 segundos (2 minutos) timeout padrão para jobs
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
        removeOnComplete: {
          age: 7 * 24 * 3600, // 7 dias
          count: 1000,
        },
        removeOnFail: {
          age: 30 * 24 * 3600, // 30 dias (DLQ)
        },
      },
    }),
  ],
  controllers: [ReportsController, ReportCatalogController, ReportsMetricsController],
  providers: [
    ReportsService,
    CsvGeneratorService,
    PdfGeneratorService,
    ReportQueueService,
    ReportSchedulerService,
    ReportCatalogService,
    ReportPermissionService,
    ReportQuotaService,
    ReportMetricsService,
    ReportStructuredLoggerService,
    ReportProcessor,
  ],
  exports: [
    ReportsService,
    ReportQueueService,
    ReportCatalogService,
    ReportPermissionService,
    ReportQuotaService,
    ReportMetricsService,
  ],
})
export class ReportsModule {}

