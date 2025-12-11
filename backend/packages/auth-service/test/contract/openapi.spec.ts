import { readFileSync } from 'fs';
import * as yaml from 'yaml';
import * as path from 'path';

describe('OpenAPI Contract Structure', () => {
  let spec: any;

  beforeAll(() => {
    const specPath = path.join(__dirname, '../../openapi.yaml');
    const specContent = readFileSync(specPath, 'utf-8');
    spec = yaml.parse(specContent);
  });

  it('should have OpenAPI 3.1.0 version', () => {
    expect(spec.openapi).toBe('3.1.0');
  });

  it('should have required paths', () => {
    expect(spec.paths).toBeDefined();
    expect(spec.paths['/auth/login']).toBeDefined();
    expect(spec.paths['/auth/refresh']).toBeDefined();
    expect(spec.paths['/auth/logout']).toBeDefined();
    expect(spec.paths['/auth/me']).toBeDefined();
    expect(spec.paths['/health']).toBeDefined();
  });

  it('should have POST /auth/login defined', () => {
    expect(spec.paths['/auth/login'].post).toBeDefined();
    expect(spec.paths['/auth/login'].post.operationId).toBe('login');
    expect(spec.paths['/auth/login'].post.requestBody).toBeDefined();
    expect(spec.paths['/auth/login'].post.responses).toBeDefined();
    expect(spec.paths['/auth/login'].post.responses['200']).toBeDefined();
    expect(spec.paths['/auth/login'].post.responses['401']).toBeDefined();
  });

  it('should have POST /auth/refresh defined', () => {
    expect(spec.paths['/auth/refresh'].post).toBeDefined();
    expect(spec.paths['/auth/refresh'].post.operationId).toBe('refresh');
    expect(spec.paths['/auth/refresh'].post.requestBody).toBeDefined();
    expect(spec.paths['/auth/refresh'].post.responses).toBeDefined();
  });

  it('should have POST /auth/logout defined', () => {
    expect(spec.paths['/auth/logout'].post).toBeDefined();
    expect(spec.paths['/auth/logout'].post.operationId).toBe('logout');
    expect(spec.paths['/auth/logout'].post.requestBody).toBeDefined();
    expect(spec.paths['/auth/logout'].post.responses).toBeDefined();
  });

  it('should have GET /auth/me defined', () => {
    expect(spec.paths['/auth/me'].get).toBeDefined();
    expect(spec.paths['/auth/me'].get.operationId).toBe('me');
    expect(spec.paths['/auth/me'].get.security).toBeDefined();
    expect(spec.paths['/auth/me'].get.responses).toBeDefined();
  });

  it('should have GET /health defined', () => {
    expect(spec.paths['/health'].get).toBeDefined();
    expect(spec.paths['/health'].get.operationId).toBe('health');
    expect(spec.paths['/health'].get.responses).toBeDefined();
  });

  it('should have required schemas', () => {
    expect(spec.components).toBeDefined();
    expect(spec.components.schemas).toBeDefined();
    expect(spec.components.schemas.LoginRequest).toBeDefined();
    expect(spec.components.schemas.LoginResponse).toBeDefined();
    expect(spec.components.schemas.RefreshRequest).toBeDefined();
    expect(spec.components.schemas.RefreshResponse).toBeDefined();
    expect(spec.components.schemas.LogoutRequest).toBeDefined();
    expect(spec.components.schemas.LogoutResponse).toBeDefined();
    expect(spec.components.schemas.UserInfo).toBeDefined();
    expect(spec.components.schemas.ErrorResponse).toBeDefined();
    expect(spec.components.schemas.HealthResponse).toBeDefined();
  });

  it('should have security schemes', () => {
    expect(spec.components.securitySchemes).toBeDefined();
    expect(spec.components.securitySchemes.bearerAuth).toBeDefined();
    expect(spec.components.securitySchemes.bearerAuth.type).toBe('http');
    expect(spec.components.securitySchemes.bearerAuth.scheme).toBe('bearer');
  });

  it('should reference schemas correctly in POST /auth/login', () => {
    const loginPost = spec.paths['/auth/login'].post;
    expect(loginPost.requestBody).toBeDefined();
    const requestSchema = loginPost.requestBody.content['application/json'].schema;
    expect(requestSchema.$ref).toBe('#/components/schemas/LoginRequest');
    
    const response200 = loginPost.responses['200'];
    expect(response200.content['application/json'].schema.$ref).toBe('#/components/schemas/LoginResponse');
  });

  it('should reference schemas correctly in POST /auth/refresh', () => {
    const refreshPost = spec.paths['/auth/refresh'].post;
    expect(refreshPost.requestBody).toBeDefined();
    const requestSchema = refreshPost.requestBody.content['application/json'].schema;
    expect(requestSchema.$ref).toBe('#/components/schemas/RefreshRequest');
    
    const response200 = refreshPost.responses['200'];
    expect(response200.content['application/json'].schema.$ref).toBe('#/components/schemas/RefreshResponse');
  });

  it('should have LoginRequest schema with required fields', () => {
    const schema = spec.components.schemas.LoginRequest;
    expect(schema.type).toBe('object');
    expect(schema.required).toContain('email');
    expect(schema.required).toContain('password');
    expect(schema.properties.email.type).toBe('string');
    expect(schema.properties.email.format).toBe('email');
    expect(schema.properties.password.type).toBe('string');
  });

  it('should have LoginResponse schema with correct structure', () => {
    const schema = spec.components.schemas.LoginResponse;
    expect(schema.type).toBe('object');
    expect(schema.properties.accessToken).toBeDefined();
    expect(schema.properties.refreshToken).toBeDefined();
    expect(schema.properties.user).toBeDefined();
  });
});

