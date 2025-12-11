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
    expect(spec.paths['/users']).toBeDefined();
    expect(spec.paths['/users/{id}']).toBeDefined();
    expect(spec.paths['/users/validate']).toBeDefined();
    expect(spec.paths['/users/email/{email}']).toBeDefined();
    expect(spec.paths['/users/bulk']).toBeDefined();
    expect(spec.paths['/users/advanced/search']).toBeDefined();
    expect(spec.paths['/users/cursor/search']).toBeDefined();
    expect(spec.paths['/users/fuzzy/search']).toBeDefined();
    expect(spec.paths['/users/date-range']).toBeDefined();
    expect(spec.paths['/users/stats/roles']).toBeDefined();
    expect(spec.paths['/users/recent/active']).toBeDefined();
    expect(spec.paths['/health']).toBeDefined();
  });

  it('should have GET /users defined', () => {
    expect(spec.paths['/users'].get).toBeDefined();
    expect(spec.paths['/users'].get.operationId).toBe('listUsers');
    expect(spec.paths['/users'].get.security).toBeDefined();
    expect(spec.paths['/users'].get.responses).toBeDefined();
  });

  it('should have POST /users defined', () => {
    expect(spec.paths['/users'].post).toBeDefined();
    expect(spec.paths['/users'].post.operationId).toBe('createUser');
    expect(spec.paths['/users'].post.requestBody).toBeDefined();
    expect(spec.paths['/users'].post.responses).toBeDefined();
  });

  it('should have GET /users/{id} defined', () => {
    expect(spec.paths['/users/{id}'].get).toBeDefined();
    expect(spec.paths['/users/{id}'].get.operationId).toBe('getUserById');
    expect(spec.paths['/users/{id}'].get.parameters).toBeDefined();
    expect(spec.paths['/users/{id}'].get.responses).toBeDefined();
  });

  it('should have PUT /users/{id} defined', () => {
    expect(spec.paths['/users/{id}'].put).toBeDefined();
    expect(spec.paths['/users/{id}'].put.operationId).toBe('updateUser');
    expect(spec.paths['/users/{id}'].put.requestBody).toBeDefined();
  });

  it('should have DELETE /users/{id} defined', () => {
    expect(spec.paths['/users/{id}'].delete).toBeDefined();
    expect(spec.paths['/users/{id}'].delete.operationId).toBe('deleteUser');
  });

  it('should have POST /users/validate defined', () => {
    expect(spec.paths['/users/validate'].post).toBeDefined();
    expect(spec.paths['/users/validate'].post.operationId).toBe('validateCredentials');
    expect(spec.paths['/users/validate'].post.requestBody).toBeDefined();
    expect(spec.paths['/users/validate'].post.security).toBeUndefined(); // Public endpoint
  });

  it('should have GET /health defined', () => {
    expect(spec.paths['/health'].get).toBeDefined();
    expect(spec.paths['/health'].get.operationId).toBe('health');
    expect(spec.paths['/health'].get.responses).toBeDefined();
  });

  it('should have required schemas', () => {
    expect(spec.components).toBeDefined();
    expect(spec.components.schemas).toBeDefined();
    expect(spec.components.schemas.CreateUser).toBeDefined();
    expect(spec.components.schemas.UpdateUser).toBeDefined();
    expect(spec.components.schemas.User).toBeDefined();
    expect(spec.components.schemas.PaginatedUsersResponse).toBeDefined();
    expect(spec.components.schemas.ValidateUserRequest).toBeDefined();
    expect(spec.components.schemas.HealthResponse).toBeDefined();
    expect(spec.components.schemas.ErrorResponse).toBeDefined();
  });

  it('should have security schemes', () => {
    expect(spec.components.securitySchemes).toBeDefined();
    expect(spec.components.securitySchemes.bearerAuth).toBeDefined();
    expect(spec.components.securitySchemes.bearerAuth.type).toBe('http');
    expect(spec.components.securitySchemes.bearerAuth.scheme).toBe('bearer');
  });

  it('should reference schemas correctly in POST /users', () => {
    const createPost = spec.paths['/users'].post;
    expect(createPost.requestBody).toBeDefined();
    const requestSchema = createPost.requestBody.content['application/json'].schema;
    expect(requestSchema.$ref).toBe('#/components/schemas/CreateUser');
    
    const response201 = createPost.responses['201'];
    expect(response201.content['application/json'].schema.$ref).toBe('#/components/schemas/User');
  });

  it('should reference schemas correctly in POST /users/validate', () => {
    const validatePost = spec.paths['/users/validate'].post;
    expect(validatePost.requestBody).toBeDefined();
    const requestSchema = validatePost.requestBody.content['application/json'].schema;
    expect(requestSchema.$ref).toBe('#/components/schemas/ValidateUserRequest');
  });

  it('should have CreateUser schema with required fields', () => {
    const schema = spec.components.schemas.CreateUser;
    expect(schema.type).toBe('object');
    expect(schema.required).toContain('name');
    expect(schema.required).toContain('email');
    expect(schema.required).toContain('password');
    expect(schema.required).toContain('role');
    expect(schema.properties.email.type).toBe('string');
    expect(schema.properties.email.format).toBe('email');
    expect(schema.properties.password.type).toBe('string');
  });

  it('should have User schema with correct structure', () => {
    const schema = spec.components.schemas.User;
    expect(schema.type).toBe('object');
    expect(schema.properties.id).toBeDefined();
    expect(schema.properties.id.format).toBe('uuid');
    expect(schema.properties.email).toBeDefined();
    expect(schema.properties.name).toBeDefined();
    expect(schema.properties.role).toBeDefined();
    expect(schema.properties.isActive).toBeDefined();
  });

  it('should have PaginatedUsersResponse schema with correct structure', () => {
    const schema = spec.components.schemas.PaginatedUsersResponse;
    expect(schema.type).toBe('object');
    expect(schema.properties.data).toBeDefined();
    expect(schema.properties.data.type).toBe('array');
    expect(schema.properties.meta).toBeDefined();
    expect(schema.properties.meta.properties.page).toBeDefined();
    expect(schema.properties.meta.properties.limit).toBeDefined();
    expect(schema.properties.meta.properties.total).toBeDefined();
  });
});






