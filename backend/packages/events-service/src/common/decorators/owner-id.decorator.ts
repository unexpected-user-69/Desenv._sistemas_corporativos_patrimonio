import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface User {
  sub: string;
}

export const OwnerId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const user = (request as { user?: User }).user;
    return user?.sub ?? '';
  },
);

