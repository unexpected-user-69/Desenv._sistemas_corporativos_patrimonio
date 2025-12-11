export const createCacheServiceMock = () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  reset: jest.fn(),
  generateKey: jest.fn(),
  getOrSet: jest.fn(),
  invalidatePattern: jest.fn(),
});
