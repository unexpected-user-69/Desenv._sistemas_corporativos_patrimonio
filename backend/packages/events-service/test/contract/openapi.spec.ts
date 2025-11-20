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
    expect(spec.paths['/events']).toBeDefined();
    expect(spec.paths['/events/{idOrSlug}']).toBeDefined();
    expect(spec.paths['/events/{id}']).toBeDefined();
    expect(spec.paths['/events/{id}/publish']).toBeDefined();
    expect(spec.paths['/health']).toBeDefined();
  });

  it('should have GET /events defined', () => {
    expect(spec.paths['/events'].get).toBeDefined();
    expect(spec.paths['/events'].get.operationId).toBe('listEvents');
    expect(spec.paths['/events'].get.security).toBeDefined();
  });

  it('should have POST /events defined', () => {
    expect(spec.paths['/events'].post).toBeDefined();
    expect(spec.paths['/events'].post.operationId).toBe('createEvent');
    expect(spec.paths['/events'].post.requestBody).toBeDefined();
  });

  it('should have GET /events/{idOrSlug} defined', () => {
    expect(spec.paths['/events/{idOrSlug}'].get).toBeDefined();
    expect(spec.paths['/events/{idOrSlug}'].get.operationId).toBe('getEventByIdOrSlug');
  });

  it('should have PATCH /events/{id} defined', () => {
    expect(spec.paths['/events/{id}'].patch).toBeDefined();
    expect(spec.paths['/events/{id}'].patch.operationId).toBe('updateEvent');
  });

  it('should have POST /events/{id}/publish defined', () => {
    expect(spec.paths['/events/{id}/publish'].post).toBeDefined();
    expect(spec.paths['/events/{id}/publish'].post.operationId).toBe('publishEvent');
  });

  it('should have GET /health defined', () => {
    expect(spec.paths['/health'].get).toBeDefined();
    expect(spec.paths['/health'].get.operationId).toBe('health');
  });

  it('should have required schemas', () => {
    expect(spec.components).toBeDefined();
    expect(spec.components.schemas).toBeDefined();
    expect(spec.components.schemas.CreateEvent).toBeDefined();
    expect(spec.components.schemas.UpdateEvent).toBeDefined();
    expect(spec.components.schemas.Event).toBeDefined();
    expect(spec.components.schemas.PaginatedEventsResponse).toBeDefined();
    expect(spec.components.schemas.HealthResponse).toBeDefined();
    expect(spec.components.schemas.ErrorResponse).toBeDefined();
  });

  it('should have security schemes', () => {
    expect(spec.components.securitySchemes).toBeDefined();
    expect(spec.components.securitySchemes.bearerAuth).toBeDefined();
    expect(spec.components.securitySchemes.bearerAuth.type).toBe('http');
    expect(spec.components.securitySchemes.bearerAuth.scheme).toBe('bearer');
  });

  it('should reference schemas correctly in POST /events', () => {
    const createPost = spec.paths['/events'].post;
    expect(createPost.requestBody).toBeDefined();
    const requestSchema = createPost.requestBody.content['application/json'].schema;
    expect(requestSchema.$ref).toBe('#/components/schemas/CreateEvent');
    
    const response201 = createPost.responses['201'];
    expect(response201.content['application/json'].schema.$ref).toBe('#/components/schemas/Event');
  });

  it('should have CreateEvent schema with required fields', () => {
    const schema = spec.components.schemas.CreateEvent;
    expect(schema.type).toBe('object');
    expect(schema.required).toContain('title');
    expect(schema.required).toContain('startDate');
    expect(schema.required).toContain('eventType');
    expect(schema.properties.title.type).toBe('string');
    expect(schema.properties.eventType.enum).toContain('MANUTENCAO');
  });

  it('should have Event schema with correct structure', () => {
    const schema = spec.components.schemas.Event;
    expect(schema.type).toBe('object');
    expect(schema.properties.id).toBeDefined();
    expect(schema.properties.id.format).toBe('uuid');
    expect(schema.properties.title).toBeDefined();
    expect(schema.properties.slug).toBeDefined();
    expect(schema.properties.eventType).toBeDefined();
    expect(schema.properties.state).toBeDefined();
  });
});





