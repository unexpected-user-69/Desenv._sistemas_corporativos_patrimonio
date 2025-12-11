import { Controller, Get, UseGuards } from '@nestjs/common';
import { ServiceTokenGuard } from './common/guards/service-token.guard';

@Controller('test-token')
@UseGuards(ServiceTokenGuard)
export class TestTokenController {
    @Get()
    check() {
        return { status: 'ok', message: 'Token is valid' };
    }
}
