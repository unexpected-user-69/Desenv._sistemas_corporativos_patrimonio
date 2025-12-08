import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // LOG PARA DEBUG
    console.error('🔴 HttpExceptionFilter capturou exceção:', exception);
    if (exception instanceof Error) {
      console.error('   Stack:', exception.stack);
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const raw =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';
    const message =
      typeof raw === 'string' ? raw : (raw as Record<string, unknown>);

    response.status(status).json({
      ok: false,
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}








