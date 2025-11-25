import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { EventPatrimonio } from './entities/event-patrimonio.entity';
import { HttpClientsModule } from '../http-clients/http-clients.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Event, EventPatrimonio]),
    HttpClientsModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule { }
