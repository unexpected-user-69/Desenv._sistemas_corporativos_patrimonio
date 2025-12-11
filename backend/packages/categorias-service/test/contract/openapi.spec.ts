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

  it('should have POST /categorias defined', () => {
    expect(openApiSpec.paths['/categorias']).toBeDefined();
    expect(openApiSpec.paths['/categorias'].post).toBeDefined();
  });

  it('should have GET /categorias defined', () => {
    expect(openApiSpec.paths['/categorias']).toBeDefined();
    expect(openApiSpec.paths['/categorias'].get).toBeDefined();
  });

  it('should have GET /categorias/{id} defined', () => {
    expect(openApiSpec.paths['/categorias/{id}']).toBeDefined();
    expect(openApiSpec.paths['/categorias/{id}'].get).toBeDefined();
  });

  it('should have GET /categorias/codigo/{codigo} defined', () => {
    expect(openApiSpec.paths['/categorias/codigo/{codigo}']).toBeDefined();
    expect(openApiSpec.paths['/categorias/codigo/{codigo}'].get).toBeDefined();
  });

  it('should have PUT /categorias/{id} defined', () => {
    expect(openApiSpec.paths['/categorias/{id}']).toBeDefined();
    expect(openApiSpec.paths['/categorias/{id}'].put).toBeDefined();
  });

  it('should have PATCH /categorias/{id}/desativar defined', () => {
    expect(openApiSpec.paths['/categorias/{id}/desativar']).toBeDefined();
    expect(openApiSpec.paths['/categorias/{id}/desativar'].patch).toBeDefined();
  });

  it('should have PATCH /categorias/{id}/ativar defined', () => {
    expect(openApiSpec.paths['/categorias/{id}/ativar']).toBeDefined();
    expect(openApiSpec.paths['/categorias/{id}/ativar'].patch).toBeDefined();
  });

  it('should have DELETE /categorias/{id} defined', () => {
    expect(openApiSpec.paths['/categorias/{id}']).toBeDefined();
    expect(openApiSpec.paths['/categorias/{id}'].delete).toBeDefined();
  });

  it('should have GET /health defined', () => {
    expect(openApiSpec.paths['/health']).toBeDefined();
    expect(openApiSpec.paths['/health'].get).toBeDefined();
  });

  it('should have required schemas', () => {
    expect(openApiSpec.components).toBeDefined();
    expect(openApiSpec.components.schemas).toBeDefined();
    expect(openApiSpec.components.schemas['CreateCategoriaDto']).toBeDefined();
    expect(openApiSpec.components.schemas['CategoriaResponseDto']).toBeDefined();
    expect(openApiSpec.components.schemas['PaginatedCategoriaResponseDto']).toBeDefined();
  });

  it('should have security schemes', () => {
    expect(openApiSpec.components.securitySchemes).toBeDefined();
    expect(openApiSpec.components.securitySchemes['bearerAuth']).toBeDefined();
    expect(openApiSpec.components.securitySchemes['bearerAuth'].type).toBe('http');
    expect(openApiSpec.components.securitySchemes['bearerAuth'].scheme).toBe('bearer');
  });

  it('should reference schemas correctly in POST /categorias', () => {
    const postOp = openApiSpec.paths['/categorias'].post;
    expect(postOp.requestBody).toBeDefined();
    expect(postOp.requestBody.content['application/json']).toBeDefined();
    expect(postOp.responses['201']).toBeDefined();
  });

  it('should have CreateCategoria schema with required fields', () => {
    const schema = openApiSpec.components.schemas['CreateCategoriaDto'];
    expect(schema).toBeDefined();
    expect(schema.properties).toBeDefined();
    expect(schema.properties.codigo).toBeDefined();
    expect(schema.properties.nome).toBeDefined();
  });

  it('should have CategoriaResponse schema with correct structure', () => {
    const schema = openApiSpec.components.schemas['CategoriaResponseDto'];
    expect(schema).toBeDefined();
    expect(schema.properties).toBeDefined();
    expect(schema.properties.id).toBeDefined();
    expect(schema.properties.codigo).toBeDefined();
    expect(schema.properties.nome).toBeDefined();
  });
});

