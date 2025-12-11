import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ServiceTokenGuard implements CanActivate {
    constructor(private configService: ConfigService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const serviceToken = request.headers['x-service-token'];
        const validToken = this.configService.get<string>('SERVICE_TOKEN');

        if (!validToken || serviceToken !== validToken) {
            throw new UnauthorizedException('Invalid or missing service token');
        }

        return true;
    }
}
