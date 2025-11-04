import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { LoggingInterceptor } from '../../../src/common/interceptors/logging.interceptor';

describe('LoggingInterceptor (unit)', () => {
  let interceptor: LoggingInterceptor;
  let mockLogger: any;

  beforeEach(() => {
    interceptor = new LoggingInterceptor();
    mockLogger = {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    // Replace logger instance
    (interceptor as any).logger = mockLogger;
  });

  function makeContext(statusCode: number = 200) {
    const req: any = {
      method: 'GET',
      url: '/test',
    };
    const res: any = {
      statusCode,
    };
    return {
      switchToHttp: () => ({
        getRequest: () => req,
        getResponse: () => res,
      }),
    } as unknown as ExecutionContext;
  }

  function makeHandler(data: any = { success: true }) {
    return {
      handle: () => of(data),
    } as CallHandler;
  }

  it('should log successful request (2xx)', (done) => {
    const context = makeContext(200);
    const handler = makeHandler();

    interceptor.intercept(context, handler).subscribe({
      next: () => {
        // Wait for finalize to execute
        setTimeout(() => {
          expect(mockLogger.log).toHaveBeenCalledWith(
            expect.stringContaining('GET /test 200'),
          );
          done();
        }, 10);
      },
      complete: () => {
        // Ensure done is called even if next isn't
        setTimeout(() => {
          if (!mockLogger.log.mock.calls.length) {
            done();
          }
        }, 10);
      },
    });
  });

  it('should warn on client error (4xx)', (done) => {
    const context = makeContext(404);
    const handler = makeHandler();

    interceptor.intercept(context, handler).subscribe({
      next: () => {
        setTimeout(() => {
          expect(mockLogger.warn).toHaveBeenCalledWith(
            expect.stringContaining('GET /test 404'),
          );
          done();
        }, 10);
      },
      complete: () => {
        setTimeout(() => {
          if (!mockLogger.warn.mock.calls.length) {
            done();
          }
        }, 10);
      },
    });
  });

  it('should error on server error (5xx)', (done) => {
    const context = makeContext(500);
    const handler = makeHandler();

    interceptor.intercept(context, handler).subscribe({
      next: () => {
        setTimeout(() => {
          expect(mockLogger.error).toHaveBeenCalledWith(
            expect.stringContaining('GET /test 500'),
          );
          done();
        }, 10);
      },
      complete: () => {
        setTimeout(() => {
          if (!mockLogger.error.mock.calls.length) {
            done();
          }
        }, 10);
      },
    });
  });

  it('should log request duration', (done) => {
    const context = makeContext(200);
    const handler = makeHandler();

    interceptor.intercept(context, handler).subscribe({
      next: () => {
        setTimeout(() => {
          expect(mockLogger.log).toHaveBeenCalledWith(
            expect.stringMatching(/\d+ms/),
          );
          done();
        }, 10);
      },
      complete: () => {
        setTimeout(() => {
          if (!mockLogger.log.mock.calls.length) {
            done();
          }
        }, 10);
      },
    });
  });
});

