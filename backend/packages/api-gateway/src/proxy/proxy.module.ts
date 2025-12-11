import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { CircuitBreakerService } from './circuit-breaker.service';

@Module({
  imports: [HttpModule],
  controllers: [ProxyController],
  providers: [ProxyService, CircuitBreakerService],
  exports: [ProxyService],
})
export class ProxyModule {}

