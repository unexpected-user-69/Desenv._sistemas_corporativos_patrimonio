import { ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common';
import { of, throwError, delay } from 'rxjs';
import { TimeoutInterceptor } from '../../../src/common/interceptors/timeout.interceptor';

describe('TimeoutInterceptor (unit)', () => {
  let interceptor: TimeoutInterceptor;
  let mockLogger: any;

  beforeEach(() => {
    interceptor = new TimeoutInterceptor(100); // 100ms timeout for tests
    mockLogger = {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    (interceptor as any).logger = mockLogger;
  });

  function makeContext() {
    const req: any = {
      method: 'GET',
      url: '/test',
    };
    return {
      switchToHttp: () => ({
        getRequest: () => req,
      }),
    } as unknown as ExecutionContext;
  }

  function makeHandler(data: any = { success: true }, delayMs: number = 0) {
    return {
      handle: () => {
        const stream = of(data);
        return delayMs > 0 ? stream.pipe(delay(delayMs)) : stream;
      },
    } as CallHandler;
  }

  it('should allow request that completes within timeout', (done) => {
    const context = makeContext();
    const handler = makeHandler({ success: true }, 50);

    interceptor.intercept(context, handler).subscribe({
      next: (data) => {
        expect(data).toEqual({ success: true });
        done();
      },
    });
  });

  it('should throw RequestTimeoutException when request exceeds timeout', (done) => {
    const context = makeContext();
    const handler = makeHandler({ success: true }, 200); // Exceeds 100ms timeout

    interceptor.intercept(context, handler).subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(RequestTimeoutException);
        expect(mockLogger.warn).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should use custom timeout value', (done) => {
    const customInterceptor = new TimeoutInterceptor(500);
    const mockLoggerCustom = {
      warn: jest.fn(),
    };
    (customInterceptor as any).logger = mockLoggerCustom;

    const context = makeContext();
    const handler = makeHandler({ success: true }, 300); // Within 500ms timeout

    customInterceptor.intercept(context, handler).subscribe({
      next: (data) => {
        expect(data).toEqual({ success: true });
        done();
      },
    });
  });

  it('should not catch non-timeout errors', (done) => {
    const context = makeContext();
    const handler = {
      handle: () => throwError(() => new Error('Other error')),
    } as CallHandler;

    interceptor.intercept(context, handler).subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Other error');
        expect(error).not.toBeInstanceOf(RequestTimeoutException);
        done();
      },
    });
  });
});

