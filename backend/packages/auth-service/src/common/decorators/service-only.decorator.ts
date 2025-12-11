import { SetMetadata } from '@nestjs/common';

export const IS_SERVICE_ONLY_KEY = 'isServiceOnly';

/**
 * Decorator para marcar endpoints que devem ser acessíveis apenas via ServiceTokenGuard
 * (comunicação service-to-service)
 */
export const ServiceOnly = () => SetMetadata(IS_SERVICE_ONLY_KEY, true);

