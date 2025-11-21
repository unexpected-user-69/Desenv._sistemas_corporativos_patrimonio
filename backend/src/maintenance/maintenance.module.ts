import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceController } from './maintenance.controller';
import { WorkflowService } from './services/workflow.service';
import { SchedulerService } from './services/scheduler.service';
import { SlaService } from './services/sla.service';
import { MaintenanceNotificationsService } from './services/notifications.service';
import { MaintenanceDashboardService } from './services/maintenance-dashboard.service';
import { MaintenanceReportsService } from './services/maintenance-reports.service';
import { MaintenanceExportService } from './services/maintenance-export.service';
import { WorkOrder } from './entities/work-order.entity';
import { WorkLog } from './entities/work-log.entity';
import { MaintenancePlan } from './entities/maintenance-plan.entity';
import { Part } from './entities/part.entity';
import { PatrimonioModule } from '../patrimonio/patrimonio.module';

import { HttpClientsModule } from '../http-clients/http-clients.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([WorkOrder, WorkLog, MaintenancePlan, Part]),
    forwardRef(() => PatrimonioModule),
    HttpClientsModule,
  ],
  controllers: [MaintenanceController],
  providers: [
    MaintenanceService,
    WorkflowService,
    SchedulerService,
    SlaService,
    MaintenanceNotificationsService,
    MaintenanceDashboardService,
    MaintenanceReportsService,
    MaintenanceExportService,
  ],
  exports: [
    MaintenanceService,
    WorkflowService,
    SchedulerService,
    SlaService,
    MaintenanceNotificationsService,
  ],
})
export class MaintenanceModule { }

