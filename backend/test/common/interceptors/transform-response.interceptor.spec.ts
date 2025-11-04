import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { TransformResponseInterceptor } from '../../../src/common/interceptors/transform-response.interceptor';

describe('TransformResponseInterceptor (unit)', () => {
  let interceptor: TransformResponseInterceptor;

  beforeEach(() => {
    interceptor = new TransformResponseInterceptor();
  });

  function makeContext() {
    return {} as ExecutionContext;
  }

  function makeHandler(data: any) {
    return {
      handle: () => of(data),
    } as CallHandler;
  }

  it('should wrap response in data object', (done) => {
    const context = makeContext();
    const handler = makeHandler({ id: 1, name: 'Test' });

    interceptor.intercept(context, handler).subscribe({
      next: (result) => {
        expect(result).toEqual({
          data: { id: 1, name: 'Test' },
        });
        done();
      },
    });
  });

  it('should handle null response', (done) => {
    const context = makeContext();
    const handler = makeHandler(null);

    interceptor.intercept(context, handler).subscribe({
      next: (result) => {
        expect(result).toEqual({ data: null });
        done();
      },
    });
  });

  it('should handle array response', (done) => {
    const context = makeContext();
    const handler = makeHandler([1, 2, 3]);

    interceptor.intercept(context, handler).subscribe({
      next: (result) => {
        expect(result).toEqual({ data: [1, 2, 3] });
        done();
      },
    });
  });
});

