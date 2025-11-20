import { readFileSync } from 'fs';
import * as yaml from 'yaml';
import * as path from 'path';

describe('OpenAPI Contract Structure', () => {
  let openApiSpec: any;

  beforeAll(() => {
    const openApiPath = path.join(__dirname, '../../openapi.yaml');
    const fileContent = readFileSync(openApiPath, 'utf-8');
    openApiSpec = yaml.parse(fileContent);
  });

  it('should have OpenAPI 3.1.0 version', () => {
    expect(openApiSpec.openapi).toBe('3.1.0');
  });

  it('should have required paths', () => {
    expect(openApiSpec.paths).toBeDefined();
    expect(typeof openApiSpec.paths).toBe('object');
  });

  it('should have POST /audit/logs defined', () => {
    expect(openApiSpec.paths['/audit/logs']).toBeDefined();
    expect(openApiSpec.paths['/audit/logs'].post).toBeDefined();
  });

  it('should have GET /audit/logs defined', () => {
    expect(openApiSpec.paths['/audit/logs']).toBeDefined();
    expect(openApiSpec.paths['/audit/logs'].get).toBeDefined();
  });

  it('should have GET /audit/logs/{id} defined', () => {
    expect(openApiSpec.paths['/audit/logs/{id}']).toBeDefined();
    expect(openApiSpec.paths['/audit/logs/{id}'].get).toBeDefined();
  });

  it('should have GET /audit/logs/entity/{entityType}/{entityId} defined', () => {
    expect(openApiSpec.paths['/audit/logs/entity/{entityType}/{entityId}']).toBeDefined();
    expect(openApiSpec.paths['/audit/logs/entity/{entityType}/{entityId}'].get).toBeDefined();
  });

  it('should have GET /audit/logs/user/{userId} defined', () => {
    expect(openApiSpec.paths['/audit/logs/user/{userId}']).toBeDefined();
    expect(openApiSpec.paths['/audit/logs/user/{userId}'].get).toBeDefined();
  });

  it('should have GET /audit/stats defined', () => {
    expect(openApiSpec.paths['/audit/stats']).toBeDefined();
    expect(openApiSpec.paths['/audit/stats'].get).toBeDefined();
  });

  it('should have GET /health defined', () => {
    expect(openApiSpec.paths['/health']).toBeDefined();
    expect(openApiSpec.paths['/health'].get).toBeDefined();
  });

  it('should have required schemas', () => {
    expect(openApiSpec.components).toBeDefined();
    expect(openApiSpec.components.schemas).toBeDefined();
    expect(openApiSpec.components.schemas['CreateAuditLogDto']).toBeDefined();
    expect(openApiSpec.components.schemas['AuditLogResponseDto']).toBeDefined();
    expect(openApiSpec.components.schemas['PaginatedAuditLogResponseDto']).toBeDefined();
    expect(openApiSpec.components.schemas['AuditStatsResponseDto']).toBeDefined();
  });

  it('should have security schemes', () => {
    expect(openApiSpec.components.securitySchemes).toBeDefined();
    expect(openApiSpec.components.securitySchemes['bearerAuth']).toBeDefined();
    expect(openApiSpec.components.securitySchemes['bearerAuth'].type).toBe('http');
    expect(openApiSpec.components.securitySchemes['bearerAuth'].scheme).toBe('bearer');
  });

  it('should reference schemas correctly in POST /audit/logs', () => {
    const postOp = openApiSpec.paths['/audit/logs'].post;
    expect(postOp.requestBody).toBeDefined();
    expect(postOp.requestBody.content['application/json']).toBeDefined();
    expect(postOp.responses['201']).toBeDefined();
  });

  it('should have CreateAuditLog schema with required fields', () => {
    const schema = openApiSpec.components.schemas['CreateAuditLogDto'];
    expect(schema).toBeDefined();
    expect(schema.properties).toBeDefined();
    expect(schema.properties.action).toBeDefined();
    expect(schema.properties.entityType).toBeDefined();
  });

  it('should have AuditLogResponse schema with correct structure', () => {
    const schema = openApiSpec.components.schemas['AuditLogResponseDto'];
    expect(schema).toBeDefined();
    expect(schema.properties).toBeDefined();
    expect(schema.properties.id).toBeDefined();
    expect(schema.properties.action).toBeDefined();
    expect(schema.properties.entityType).toBeDefined();
    expect(schema.properties.timestamp).toBeDefined();
  });
});
