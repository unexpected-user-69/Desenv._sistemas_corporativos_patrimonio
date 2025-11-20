import { readFileSync } from 'fs';
import * as yaml from 'yaml';
import * as path from 'path';

describe('OpenAPI Contract Structure - Patrimonio Service', () => {
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

  // Health endpoint
  it('should have GET /health defined', () => {
    expect(openApiSpec.paths['/health']).toBeDefined();
    expect(openApiSpec.paths['/health'].get).toBeDefined();
  });

  // Main CRUD endpoints
  it('should have POST /patrimonio defined', () => {
    expect(openApiSpec.paths['/patrimonio']).toBeDefined();
    expect(openApiSpec.paths['/patrimonio'].post).toBeDefined();
  });

  it('should have GET /patrimonio defined', () => {
    expect(openApiSpec.paths['/patrimonio']).toBeDefined();
    expect(openApiSpec.paths['/patrimonio'].get).toBeDefined();
  });

  it('should have GET /patrimonio/{id} defined', () => {
    expect(openApiSpec.paths['/patrimonio/{id}']).toBeDefined();
    expect(openApiSpec.paths['/patrimonio/{id}'].get).toBeDefined();
  });

  it('should have PATCH /patrimonio/{id} defined', () => {
    expect(openApiSpec.paths['/patrimonio/{id}']).toBeDefined();
    expect(openApiSpec.paths['/patrimonio/{id}'].patch).toBeDefined();
  });

  it('should have DELETE /patrimonio/{id} defined', () => {
    expect(openApiSpec.paths['/patrimonio/{id}']).toBeDefined();
    expect(openApiSpec.paths['/patrimonio/{id}'].delete).toBeDefined();
  });

  // Additional endpoints
  it('should have GET /patrimonio/codigo/{codigo} defined', () => {
    expect(openApiSpec.paths['/patrimonio/codigo/{codigo}']).toBeDefined();
    expect(openApiSpec.paths['/patrimonio/codigo/{codigo}'].get).toBeDefined();
  });

  it('should have GET /patrimonio/dashboard defined', () => {
    expect(openApiSpec.paths['/patrimonio/dashboard']).toBeDefined();
    expect(openApiSpec.paths['/patrimonio/dashboard'].get).toBeDefined();
  });

  it('should have POST /patrimonio/bulk defined', () => {
    expect(openApiSpec.paths['/patrimonio/bulk']).toBeDefined();
    expect(openApiSpec.paths['/patrimonio/bulk'].post).toBeDefined();
  });

  it('should have POST /patrimonio/{id}/upload defined', () => {
    expect(openApiSpec.paths['/patrimonio/{id}/upload']).toBeDefined();
    expect(openApiSpec.paths['/patrimonio/{id}/upload'].post).toBeDefined();
  });

  it('should have required schemas', () => {
    expect(openApiSpec.components).toBeDefined();
    expect(openApiSpec.components.schemas).toBeDefined();
    expect(openApiSpec.components.schemas['CreatePatrimonioDto']).toBeDefined();
    expect(openApiSpec.components.schemas['PatrimonioResponseDto']).toBeDefined();
    expect(openApiSpec.components.schemas['PaginatedPatrimonioResponseDto']).toBeDefined();
  });

  it('should have security schemes', () => {
    expect(openApiSpec.components.securitySchemes).toBeDefined();
    expect(openApiSpec.components.securitySchemes['bearerAuth']).toBeDefined();
    expect(openApiSpec.components.securitySchemes['bearerAuth'].type).toBe('http');
    expect(openApiSpec.components.securitySchemes['bearerAuth'].scheme).toBe('bearer');
  });

  it('should reference schemas correctly in POST /patrimonio', () => {
    const postOp = openApiSpec.paths['/patrimonio'].post;
    expect(postOp.requestBody).toBeDefined();
    expect(postOp.requestBody.content['application/json']).toBeDefined();
    expect(postOp.responses['201']).toBeDefined();
  });

  it('should have CreatePatrimonio schema with required fields', () => {
    const schema = openApiSpec.components.schemas['CreatePatrimonioDto'];
    expect(schema).toBeDefined();
    expect(schema.properties).toBeDefined();
    expect(schema.properties.codigo).toBeDefined();
    expect(schema.properties.nome).toBeDefined();
  });

  it('should have PatrimonioResponse schema with correct structure', () => {
    const schema = openApiSpec.components.schemas['PatrimonioResponseDto'];
    expect(schema).toBeDefined();
    expect(schema.properties).toBeDefined();
    expect(schema.properties.id).toBeDefined();
    expect(schema.properties.codigo).toBeDefined();
    expect(schema.properties.nome).toBeDefined();
  });
});


