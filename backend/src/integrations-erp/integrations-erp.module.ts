import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationsErpService } from './integrations-erp.service';
import { IntegrationsErpController } from './integrations-erp.controller';
import { Connector } from './entities/connector.entity';
import { Execution } from './entities/execution.entity';
import { ExecutionLog } from './entities/execution-log.entity';
import { ConnectorFactoryService } from './connectors/connector-factory.service';
import { FieldTransformerService } from './mappings/field-transformer.service';
import { DataMapperService } from './mappings/data-mapper.service';
import { IdempotencyService } from './mappings/idempotency.service';
import { DryRunService } from './mappings/dry-run.service';
import { MappingConfigService } from './mappings/mapping-config.service';
import { QueueModule } from './jobs/queue.module';
import { forwardRef } from '@nestjs/common';
import { IntegrationMetricsService } from './observability/integration-metrics.service';
import { StructuredLoggerService } from './observability/structured-logger.service';
import { TracingService } from './observability/tracing.service';
import { HealthCheckService } from './observability/health-check.service';
import { LoggerModule } from '../common/logger/logger.module';
import { DataSanitizationService } from './security/data-sanitization.service';
import { CircuitBreakerService } from './security/circuit-breaker.service';
import { WebhookService } from './webhooks/webhook.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Connector, Execution, ExecutionLog]),
    forwardRef(() => QueueModule),
    LoggerModule,
  ],
  controllers: [IntegrationsErpController],
  providers: [
    IntegrationsErpService,
    ConnectorFactoryService,
    FieldTransformerService,
    DataMapperService,
    IdempotencyService,
    DryRunService,
    MappingConfigService,
    IntegrationMetricsService,
    StructuredLoggerService,
    TracingService,
    HealthCheckService,
    DataSanitizationService,
    CircuitBreakerService,
    WebhookService,
  ],
  exports: [IntegrationsErpService],
})
export class IntegrationsErpModule {}

