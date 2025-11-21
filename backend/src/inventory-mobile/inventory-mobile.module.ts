import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryMobileService } from './inventory-mobile.service';
import { InventoryMobileController } from './inventory-mobile.controller';
import { SyncService } from './sync.service';
import { ReconciliationService } from './reconciliation.service';
import { ReportsService } from './reports.service';
import { NotificationsService } from './notifications.service';
import { Campaign } from './entities/campaign.entity';
import { Assignment } from './entities/assignment.entity';
import { CollectedItem } from './entities/collected-item.entity';
import { Reconciliation } from './entities/reconciliation.entity';
import { PatrimonioModule } from '../patrimonio/patrimonio.module';

import { AppCacheModule } from '../common/cache/cache.module';
import { HttpClientsModule } from '../http-clients/http-clients.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Campaign, Assignment, CollectedItem, Reconciliation]),
    forwardRef(() => PatrimonioModule),
    AppCacheModule,
    HttpClientsModule,
  ],
  controllers: [InventoryMobileController],
  providers: [
    InventoryMobileService,
    SyncService,
    ReconciliationService,
    ReportsService,
    NotificationsService,
  ],
  exports: [
    InventoryMobileService,
    SyncService,
    ReconciliationService,
    ReportsService,
    NotificationsService,
  ],
})
export class InventoryMobileModule { }

