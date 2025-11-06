import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceController } from './maintenance.controller';
import { WorkflowService } from './services/workflow.service';
import { SchedulerService } from './services/scheduler.service';
import { SlaService } from './services/sla.service';
import { MaintenanceNotificationsService } from './services/notifications.service';
import { WorkOrder } from './entities/work-order.entity';
import { WorkLog } from './entities/work-log.entity';
import { MaintenancePlan } from './entities/maintenance-plan.entity';
import { Part } from './entities/part.entity';
import { PatrimonioModule } from '../patrimonio/patrimonio.module';
import { Patrimonio } from '../patrimonio/entities/patrimonio.entity';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([WorkOrder, WorkLog, MaintenancePlan, Part, Patrimonio]),
    forwardRef(() => PatrimonioModule),
    EventsModule,
  ],
  controllers: [MaintenanceController],
  providers: [
    MaintenanceService,
    WorkflowService,
    SchedulerService,
    SlaService,
    MaintenanceNotificationsService,
  ],
  exports: [
    MaintenanceService,
    WorkflowService,
    SchedulerService,
    SlaService,
    MaintenanceNotificationsService,
  ],
})
export class MaintenanceModule {}

