import { Module, forwardRef } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { IntegrationProcessor } from './integration.processor';
import { ReconciliationService } from './reconciliation.service';
import { JobIdempotencyService } from './job-idempotency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Execution } from '../entities/execution.entity';
import { ExecutionLog } from '../entities/execution-log.entity';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD,
        db: parseInt(process.env.REDIS_DB || '0', 10),
      },
    }),
    BullModule.registerQueue({
      name: 'integration-queue',
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: {
          age: 24 * 3600, // 24 horas
          count: 1000,
        },
        removeOnFail: {
          age: 7 * 24 * 3600, // 7 dias
        },
      },
    }),
    TypeOrmModule.forFeature([Execution, ExecutionLog]),
  ],
  providers: [
    IntegrationProcessor,
    ReconciliationService,
    JobIdempotencyService,
  ],
  exports: [BullModule, ReconciliationService, JobIdempotencyService, IntegrationProcessor],
})
export class QueueModule {}

