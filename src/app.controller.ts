import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Hello world endpoint' })
  @ApiOkResponse({ description: 'Hello world response' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOperation({ summary: 'Verifica a saúde da aplicação' })
  @ApiOkResponse({
    description: 'Aplicação saudável'
  })
  health(): string {
    return 'OK';
  }
}
