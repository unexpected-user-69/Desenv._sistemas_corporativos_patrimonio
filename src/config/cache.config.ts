export const cacheConfig = {
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    ttl: parseInt(process.env.CACHE_TTL || '300'), // 5 minutos
    maxItems: parseInt(process.env.CACHE_MAX_ITEMS || '1000'),
  },
  memory: {
    ttl: parseInt(process.env.CACHE_TTL || '300'), // 5 minutos
    maxItems: parseInt(process.env.CACHE_MAX_ITEMS || '1000'),
  },
};
