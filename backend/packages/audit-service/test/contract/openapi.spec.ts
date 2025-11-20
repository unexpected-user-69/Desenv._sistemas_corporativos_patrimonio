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
    expect(spec.paths['/audit/logs']).toBeDefined();
    expect(spec.paths['/audit/logs/{id}']).toBeDefined();
    expect(spec.paths['/audit/logs/entity/{entityType}/{entityId}']).toBeDefined();
    expect(spec.paths['/audit/logs/user/{userId}']).toBeDefined();
    expect(spec.paths['/audit/stats']).toBeDefined();
    expect(spec.paths['/health']).toBeDefined();
  });

  it('should have POST /audit/logs defined', () => {
    expect(spec.paths['/audit/logs'].post).toBeDefined();
    expect(spec.paths['/audit/logs'].post.operationId).toBe('createAuditLog');
    expect(spec.paths['/audit/logs'].post.requestBody).toBeDefined();
    expect(spec.paths['/audit/logs'].post.responses).toBeDefined();
    expect(spec.paths['/audit/logs'].post.responses['201']).toBeDefined();
    expect(spec.paths['/audit/logs'].post.responses['400']).toBeDefined();
  });

  it('should have GET /audit/logs defined', () => {
    expect(spec.paths['/audit/logs'].get).toBeDefined();
    expect(spec.paths['/audit/logs'].get.operationId).toBe('searchAuditLogs');
    expect(spec.paths['/audit/logs'].get.security).toBeDefined();
    expect(spec.paths['/audit/logs'].get.responses).toBeDefined();
    expect(spec.paths['/audit/logs'].get.responses['200']).toBeDefined();
    expect(spec.paths['/audit/logs'].get.responses['401']).toBeDefined();
    expect(spec.paths['/audit/logs'].get.responses['403']).toBeDefined();
  });

  it('should have GET /audit/logs/{id} defined', () => {
    expect(spec.paths['/audit/logs/{id}'].get).toBeDefined();
    expect(spec.paths['/audit/logs/{id}'].get.operationId).toBe('findOne');
    expect(spec.paths['/audit/logs/{id}'].get.parameters).toBeDefined();
    expect(spec.paths['/audit/logs/{id}'].get.security).toBeDefined();
    expect(spec.paths['/audit/logs/{id}'].get.responses).toBeDefined();
    expect(spec.paths['/audit/logs/{id}'].get.responses['200']).toBeDefined();
    expect(spec.paths['/audit/logs/{id}'].get.responses['404']).toBeDefined();
  });

  it('should have GET /audit/stats defined', () => {
    expect(spec.paths['/audit/stats'].get).toBeDefined();
    expect(spec.paths['/audit/stats'].get.operationId).toBe('getAuditStats');
    expect(spec.paths['/audit/stats'].get.security).toBeDefined();
    expect(spec.paths['/audit/stats'].get.responses).toBeDefined();
    expect(spec.paths['/audit/stats'].get.responses['200']).toBeDefined();
  });

  it('should have GET /health defined', () => {
    expect(spec.paths['/health'].get).toBeDefined();
    expect(spec.paths['/health'].get.operationId).toBe('health');
    expect(spec.paths['/health'].get.responses).toBeDefined();
  });

  it('should have required schemas', () => {
    expect(spec.components).toBeDefined();
    expect(spec.components.schemas).toBeDefined();
    expect(spec.components.schemas.CreateAuditLogDto).toBeDefined();
    expect(spec.components.schemas.AuditLog).toBeDefined();
    expect(spec.components.schemas.ErrorResponse).toBeDefined();
    expect(spec.components.schemas.HealthResponse).toBeDefined();
  });

  it('should have security schemes', () => {
    expect(spec.components.securitySchemes).toBeDefined();
    expect(spec.components.securitySchemes.bearerAuth).toBeDefined();
    expect(spec.components.securitySchemes.bearerAuth.type).toBe('http');
    expect(spec.components.securitySchemes.bearerAuth.scheme).toBe('bearer');
  });

  it('should reference schemas correctly in POST /audit/logs', () => {
    const logsPost = spec.paths['/audit/logs'].post;
    expect(logsPost.requestBody).toBeDefined();
    const requestSchema = logsPost.requestBody.content['application/json'].schema;
    expect(requestSchema.$ref).toBe('#/components/schemas/CreateAuditLogDto');
    
    const response201 = logsPost.responses['201'];
    expect(response201.content['application/json'].schema.$ref).toBe('#/components/schemas/AuditLog');
  });
});



