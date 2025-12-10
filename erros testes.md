
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

  ● Auth (e2e) › GET /v1/auth/me › deve retornar 401 ou 403 para token ausente

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: auth-admin@example.com. Email: auth-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

  ● Auth (e2e) › GET /v1/auth/me › deve retornar 401 ou 403 para token inválido

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: auth-admin@example.com. Email: auth-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

  ● Auth (e2e) › GET /v1/auth/me › deve retornar 401 ou 403 para formato de token incorreto

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: auth-admin@example.com. Email: auth-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

  ● Auth (e2e) › GET /v1/auth/me › deve retornar 401 ou 403 para token expirado (se possível simular)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: auth-admin@example.com. Email: auth-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

  ● Auth (e2e) › POST /v1/auth/refresh › deve renovar tokens com refresh token válido (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: auth-admin@example.com. Email: auth-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

  ● Auth (e2e) › POST /v1/auth/refresh › deve retornar 401 para refresh token inválido

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: auth-admin@example.com. Email: auth-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

  ● Auth (e2e) › POST /v1/auth/refresh › deve retornar 401 para refresh token expirado

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: auth-admin@example.com. Email: auth-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

  ● Auth (e2e) › POST /v1/auth/refresh › deve retornar 400 para dados inválidos (refresh token muito curto)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: auth-admin@example.com. Email: auth-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

  ● Auth (e2e) › POST /v1/auth/refresh › deve retornar 400 para dados faltando (refresh token)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: auth-admin@example.com. Email: auth-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

  ● Auth (e2e) › POST /v1/auth/refresh › deve revogar refresh token antigo após renovação

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: auth-admin@example.com. Email: auth-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

  ● Auth (e2e) › POST /v1/auth/logout › deve fazer logout com refresh token válido (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: auth-admin@example.com. Email: auth-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

  ● Auth (e2e) › POST /v1/auth/logout › deve retornar 200 mesmo com refresh token inválido (idempotente)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: auth-admin@example.com. Email: auth-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

  ● Auth (e2e) › POST /v1/auth/logout › deve retornar 400 para dados inválidos (refresh token muito curto)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: auth-admin@example.com. Email: auth-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

  ● Auth (e2e) › POST /v1/auth/logout › deve revogar refresh token após logout

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: auth-admin@example.com. Email: auth-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

  ● Auth (e2e) › POST /v1/auth/logout › deve permitir logout múltiplo (idempotente)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: auth-admin@example.com. Email: auth-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

  ● Auth (e2e) › Fluxo completo de autenticação › deve permitir login -> me -> refresh -> logout

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: auth-admin@example.com. Email: auth-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (auth/auth.e2e-spec.ts:80:14)

FAIL inventory-mobile/inventory-mobile.e2e-spec.ts (9.44 s)
  ● Inventory Mobile (e2e) › POST /v1/inventory/campaigns › deve criar uma campanha com sucesso (201)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: inventory-mobile-admin@example.com. Email: inventory-mobile-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:64:14)

  ● Inventory Mobile (e2e) › GET /v1/inventory/campaigns/:id/assignments › deve listar assignments de uma campanha (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: inventory-mobile-admin@example.com. Email: inventory-mobile-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:64:14)

  ● Inventory Mobile (e2e) › POST /v1/inventory/campaigns/:id/assignments › deve distribuir assignments com sucesso (201)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: inventory-mobile-admin@example.com. Email: inventory-mobile-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:64:14)

  ● Inventory Mobile (e2e) › POST /v1/inventory/sync/pull › deve retornar dados de sincronização (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: inventory-mobile-admin@example.com. Email: inventory-mobile-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:64:14)

  ● Inventory Mobile (e2e) › POST /v1/inventory/sync/pull › deve suportar sincronização incremental com lastSyncAt

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: inventory-mobile-admin@example.com. Email: inventory-mobile-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:64:14)

  ● Inventory Mobile (e2e) › POST /v1/inventory/sync/push › deve processar itens coletados com sucesso (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: inventory-mobile-admin@example.com. Email: inventory-mobile-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:64:14)

  ● Inventory Mobile (e2e) › POST /v1/inventory/reconcile › deve iniciar conciliação com sucesso (202)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: inventory-mobile-admin@example.com. Email: inventory-mobile-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:64:14)

  ● Inventory Mobile (e2e) › GET /v1/inventory/campaigns/:id/report › deve gerar relatório de campanha (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: inventory-mobile-admin@example.com. Email: inventory-mobile-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:64:14)

  ● Inventory Mobile (e2e) › GET /v1/inventory/campaigns/:id/export/csv › deve exportar divergências para CSV (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: inventory-mobile-admin@example.com. Email: inventory-mobile-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:64:14)

  ● Inventory Mobile (e2e) › GET /v1/inventory/campaigns/:id/export/excel › deve exportar relatório para Excel (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: inventory-mobile-admin@example.com. Email: inventory-mobile-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:64:14)

  ● Inventory Mobile (e2e) › GET /v1/inventory/dashboard › deve retornar dashboard com estatísticas (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: inventory-mobile-admin@example.com. Email: inventory-mobile-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:64:14)

FAIL notifications/notifications.e2e-spec.ts (9.469 s)
  ● Notifications (e2e) › POST /v1/notifications/templates › deve criar um template com sucesso (201)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: notifications-admin@example.com. Email: notifications-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (notifications/notifications.e2e-spec.ts:70:14)

  ● Notifications (e2e) › GET /v1/notifications/templates › deve listar templates (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: notifications-admin@example.com. Email: notifications-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (notifications/notifications.e2e-spec.ts:70:14)

  ● Notifications (e2e) › GET /v1/notifications/templates/:id › deve buscar template por ID (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: notifications-admin@example.com. Email: notifications-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (notifications/notifications.e2e-spec.ts:70:14)

  ● Notifications (e2e) › PUT /v1/notifications/templates/:id › deve atualizar template com sucesso (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: notifications-admin@example.com. Email: notifications-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (notifications/notifications.e2e-spec.ts:70:14)

  ● Notifications (e2e) › DELETE /v1/notifications/templates/:id › deve remover template com sucesso (204)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: notifications-admin@example.com. Email: notifications-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (notifications/notifications.e2e-spec.ts:70:14)

  ● Notifications (e2e) › POST /v1/notifications/policies › deve criar uma política com sucesso (201)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: notifications-admin@example.com. Email: notifications-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (notifications/notifications.e2e-spec.ts:70:14)

  ● Notifications (e2e) › GET /v1/notifications/policies › deve listar políticas ativas (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: notifications-admin@example.com. Email: notifications-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (notifications/notifications.e2e-spec.ts:70:14)

  ● Notifications (e2e) › POST /v1/notifications/webhooks › deve criar um webhook com sucesso (201)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: notifications-admin@example.com. Email: notifications-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (notifications/notifications.e2e-spec.ts:70:14)

  ● Notifications (e2e) › GET /v1/notifications/webhooks › deve listar webhooks (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: notifications-admin@example.com. Email: notifications-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (notifications/notifications.e2e-spec.ts:70:14)

  ● Notifications (e2e) › POST /v1/notifications/test › deve enviar notificação de teste com sucesso (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: notifications-admin@example.com. Email: notifications-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (notifications/notifications.e2e-spec.ts:70:14)

  ● Notifications (e2e) › GET /v1/notifications/queue/stats › deve retornar estatísticas da fila (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: notifications-admin@example.com. Email: notifications-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (notifications/notifications.e2e-spec.ts:70:14)

  ● Notifications (e2e) › GET /v1/notifications/metrics › deve retornar métricas de notificações (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: notifications-admin@example.com. Email: notifications-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (notifications/notifications.e2e-spec.ts:70:14)

  ● Notifications (e2e) › GET /v1/notifications/metrics › deve filtrar métricas por período (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: notifications-admin@example.com. Email: notifications-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (notifications/notifications.e2e-spec.ts:70:14)

  ● Notifications (e2e) › GET /v1/notifications/metrics › deve filtrar métricas por eventKey (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: notifications-admin@example.com. Email: notifications-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (notifications/notifications.e2e-spec.ts:70:14)

  ● Notifications (e2e) › GET /v1/notifications/metrics › deve filtrar métricas por channel (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: notifications-admin@example.com. Email: notifications-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (notifications/notifications.e2e-spec.ts:70:14)

  ● Notifications (e2e) › GET /v1/notifications/metrics/summary › deve retornar métricas resumidas (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: notifications-admin@example.com. Email: notifications-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (notifications/notifications.e2e-spec.ts:70:14)

FAIL integrations-erp/integrations-erp.e2e-spec.ts (9.918 s)
  ● Integrations ERP (e2e) › POST /v1/integrations/run › should create and queue an integration execution

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › POST /v1/integrations/run › should create export execution

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › POST /v1/integrations/run › should create execution for different entities

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › GET /v1/integrations/executions › should return paginated executions

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › GET /v1/integrations/executions › should filter executions by connectorKey

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › GET /v1/integrations/executions › should filter executions by status

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › GET /v1/integrations/executions › should filter executions by type

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › GET /v1/integrations/executions › should handle pagination correctly

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › GET /v1/integrations/executions › should combine multiple filters

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › GET /v1/integrations/executions/:id › should return execution details with logs

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › GET /v1/integrations/executions/:id/reconciliation › should return reconciliation summary

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › GET /v1/integrations/executions/:id/reconciliation › should handle execution without logs

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › GET /v1/integrations/metrics › should return metrics for all connectors

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › GET /v1/integrations/metrics › should return metrics for specific connector

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › GET /v1/integrations/metrics › should return metrics with date filters

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › GET /v1/integrations/health › should return health check for all integrations

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › GET /v1/integrations/health › should return health check for specific connector

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

  ● Integrations ERP (e2e) › GET /v1/integrations/health › should return health with all required fields

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: integrations-erp-admin@example.com. Email: integrations-erp-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (integrations-erp/integrations-erp.e2e-spec.ts:156:14)

FAIL reports-catalog/reports-catalog.e2e-spec.ts (9.293 s)
  ● Reports Catalog (e2e) › POST /v1/reports/catalog › deve criar catálogo de relatório com sucesso (201) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › POST /v1/reports/catalog › deve criar segundo catálogo com sucesso (201) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › GET /v1/reports/catalog › deve listar catálogos com sucesso (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › GET /v1/reports/catalog › deve listar catálogos com sucesso (200) - MANAGER

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › GET /v1/reports/catalog › deve filtrar apenas catálogos ativos (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › GET /v1/reports/catalog/:id › deve buscar catálogo por ID com sucesso (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › GET /v1/reports/catalog/:id › deve buscar catálogo por ID com sucesso (200) - MANAGER

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › GET /v1/reports/catalog/key/:key › deve buscar catálogo por chave com sucesso (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › GET /v1/reports/catalog/key/:key › deve buscar catálogo por chave com sucesso (200) - MANAGER

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › PUT /v1/reports/catalog/:id › deve atualizar catálogo com sucesso (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › POST /v1/reports/catalog/:id/versions › deve criar versão de catálogo com sucesso (201) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › PUT /v1/reports/catalog/:id/versions/:version/current › deve definir versão como atual com sucesso (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › POST /v1/reports/catalog/permissions › deve criar permissão de catálogo com sucesso (201) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › POST /v1/reports/catalog/permissions › deve criar permissão por role com sucesso (201) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › GET /v1/reports/catalog/permissions/catalog/:catalogId › deve listar permissões do catálogo com sucesso (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › GET /v1/reports/catalog/permissions/user/:userId › deve listar permissões do usuário com sucesso (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › DELETE /v1/reports/catalog/permissions/:id › deve deletar permissão com sucesso (204) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

  ● Reports Catalog (e2e) › DELETE /v1/reports/catalog/:id › deve deletar catálogo com sucesso (204) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-catalog-test-admin@example.com. Email: reports-catalog-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:86:14)

FAIL ./patrimonio.e2e-spec.ts (9.348 s)
  ● PatrimonioController (e2e) › POST /v1/patrimonio › should create a new patrimonio (201)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › POST /v1/patrimonio › should return 409 when codigo already exists

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › POST /v1/patrimonio › should return 400 when required fields are missing

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › GET /v1/patrimonio › should return paginated patrimonios list (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › GET /v1/patrimonio › should filter patrimonios by categoriaId (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › GET /v1/patrimonio › should filter patrimonios by status (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › GET /v1/patrimonio › should search patrimonios by text query (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › GET /v1/patrimonio › should filter patrimonios by valor range (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › GET /v1/patrimonio › should sort patrimonios by nome ASC (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › GET /v1/patrimonio/:id › should return a patrimonio by id (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › GET /v1/patrimonio/:id › should return 404 when patrimonio not found

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › GET /v1/patrimonio/codigo/:codigo › should return a patrimonio by codigo (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › GET /v1/patrimonio/codigo/:codigo › should return 404 when patrimonio not found by codigo

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › GET /v1/patrimonio/stats/categoria › should return stats by categoria (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › GET /v1/patrimonio/stats/status › should return stats by status (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › PATCH /v1/patrimonio/:id › should update a patrimonio (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › PATCH /v1/patrimonio/:id › should return 404 when updating non-existent patrimonio

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › POST /v1/patrimonio/bulk › should create multiple patrimonios (201)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › POST /v1/patrimonio/bulk › should return 400 or 409 when empty array provided

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › POST /v1/patrimonio/bulk › should handle duplicate codigos in request (201)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › DELETE /v1/patrimonio/:id › should soft delete a patrimonio (200 or 204)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

  ● PatrimonioController (e2e) › DELETE /v1/patrimonio/:id › should return 404 when deleting non-existent patrimonio

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: patrimonio-basic-admin@example.com. Email: patrimonio-basic-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (patrimonio.e2e-spec.ts:47:14)

FAIL events/events.e2e-spec.ts (9.448 s)
  ● Events (e2e) › POST /v1/events › deve criar evento com sucesso (201) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: events-test-admin@example.com. Email: events-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (events/events.e2e-spec.ts:80:14)

  ● Events (e2e) › POST /v1/events › deve criar evento com sucesso (201) - MANAGER

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: events-test-admin@example.com. Email: events-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (events/events.e2e-spec.ts:80:14)

  ● Events (e2e) › GET /v1/events › deve listar eventos com paginação (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: events-test-admin@example.com. Email: events-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (events/events.e2e-spec.ts:80:14)

  ● Events (e2e) › GET /v1/events › deve filtrar eventos por eventType (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: events-test-admin@example.com. Email: events-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (events/events.e2e-spec.ts:80:14)

  ● Events (e2e) › GET /v1/events › deve filtrar eventos por state (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: events-test-admin@example.com. Email: events-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (events/events.e2e-spec.ts:80:14)

  ● Events (e2e) › GET /v1/events › deve filtrar eventos por visibility (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: events-test-admin@example.com. Email: events-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (events/events.e2e-spec.ts:80:14)

  ● Events (e2e) › GET /v1/events › deve buscar eventos por texto (q) (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: events-test-admin@example.com. Email: events-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (events/events.e2e-spec.ts:80:14)

  ● Events (e2e) › GET /v1/events › deve filtrar eventos por intervalo de datas (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: events-test-admin@example.com. Email: events-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (events/events.e2e-spec.ts:80:14)

  ● Events (e2e) › GET /v1/events/:idOrSlug › deve buscar evento por ID (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: events-test-admin@example.com. Email: events-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (events/events.e2e-spec.ts:80:14)

  ● Events (e2e) › GET /v1/events/:idOrSlug › deve buscar evento por slug (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: events-test-admin@example.com. Email: events-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (events/events.e2e-spec.ts:80:14)

  ● Events (e2e) › PATCH /v1/events/:id › deve atualizar evento com sucesso (200) - ADMIN (proprietário)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: events-test-admin@example.com. Email: events-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (events/events.e2e-spec.ts:80:14)

  ● Events (e2e) › PATCH /v1/events/:id › deve atualizar evento com sucesso (200) - MANAGER (proprietário)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: events-test-admin@example.com. Email: events-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (events/events.e2e-spec.ts:80:14)

  ● Events (e2e) › POST /v1/events/:id/publish › deve publicar evento com sucesso (200) - ADMIN (proprietário)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: events-test-admin@example.com. Email: events-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (events/events.e2e-spec.ts:80:14)

  ● Events (e2e) › POST /v1/events/:id/publish › deve publicar evento com sucesso (200) - MANAGER (proprietário)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: events-test-admin@example.com. Email: events-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (events/events.e2e-spec.ts:80:14)

FAIL ./users.e2e-spec.ts (9.958 s)
  ● Users (e2e) › POST /v1/users › should create a new user

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › POST /v1/users › should return 409 when email already exists

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › POST /v1/users › should return 400 for invalid data

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › GET /v1/users › should return all users

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › GET /v1/users/:id › should return a specific user

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › GET /v1/users/:id › should return 404 for non-existent user

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › GET /v1/users/:id › should return 400 for invalid UUID

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › PUT /v1/users/:id › should update a user

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › PUT /v1/users/:id › should return 404 for non-existent user

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › DELETE /v1/users/:id › should soft delete a user

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › DELETE /v1/users/:id › should return 404 for non-existent user

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › GET /v1/users/email/:email › should return user by email

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › GET /v1/users/email/:email › should return 404 for non-existent email

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › GET /v1/users/email/:email › should handle case-insensitive email search

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › POST /v1/users/bulk › should create multiple users

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › POST /v1/users/bulk › should return 409 for empty array

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › POST /v1/users/bulk › should return 409 for duplicate emails in request

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › POST /v1/users/bulk › should return 409 for too many users

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

  ● Users (e2e) › Health Check › should return health status

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: users-e2e-admin@example.com. Email: users-e2e-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (users.e2e-spec.ts:35:14)

FAIL reports/reports.e2e-spec.ts (9.925 s)
  ● Reports (e2e) › POST /v1/reports/export › deve criar uma solicitação de relatório CSV com sucesso (202) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-test-admin@example.com. Email: reports-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports/reports.e2e-spec.ts:72:14)

  ● Reports (e2e) › POST /v1/reports/export › deve criar uma solicitação de relatório PDF com sucesso (202) - MANAGER

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-test-admin@example.com. Email: reports-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports/reports.e2e-spec.ts:72:14)

  ● Reports (e2e) › GET /v1/reports/requests › deve listar solicitações com sucesso (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-test-admin@example.com. Email: reports-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports/reports.e2e-spec.ts:72:14)

  ● Reports (e2e) › GET /v1/reports/requests › deve listar solicitações com sucesso (200) - MANAGER

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-test-admin@example.com. Email: reports-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports/reports.e2e-spec.ts:72:14)

  ● Reports (e2e) › GET /v1/reports/requests › deve filtrar solicitações por status (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-test-admin@example.com. Email: reports-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports/reports.e2e-spec.ts:72:14)

  ● Reports (e2e) › GET /v1/reports/requests › deve filtrar solicitações por tipo (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-test-admin@example.com. Email: reports-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports/reports.e2e-spec.ts:72:14)

  ● Reports (e2e) › GET /v1/reports/requests › deve filtrar solicitações por modelo (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-test-admin@example.com. Email: reports-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports/reports.e2e-spec.ts:72:14)

  ● Reports (e2e) › GET /v1/reports/requests/:id › deve buscar solicitação por ID com sucesso (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-test-admin@example.com. Email: reports-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports/reports.e2e-spec.ts:72:14)

  ● Reports (e2e) › GET /v1/reports/requests/:id › deve buscar solicitação por ID com sucesso (200) - MANAGER

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-test-admin@example.com. Email: reports-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports/reports.e2e-spec.ts:72:14)

  ● Reports (e2e) › GET /v1/reports/:id/download › deve processar e baixar relatório CSV (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-test-admin@example.com. Email: reports-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports/reports.e2e-spec.ts:72:14)

  ● Reports (e2e) › GET /v1/reports/:id/download › deve processar e baixar relatório PDF (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-test-admin@example.com. Email: reports-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports/reports.e2e-spec.ts:72:14)

FAIL reports-metrics/reports-metrics.e2e-spec.ts (9.519 s)
  ● Reports Metrics (e2e) › GET /v1/reports/metrics › deve obter métricas de relatórios com sucesso (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

  ● Reports Metrics (e2e) › GET /v1/reports/metrics › deve obter métricas de relatórios com sucesso (200) - MANAGER

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

  ● Reports Metrics (e2e) › GET /v1/reports/metrics › deve filtrar métricas por período (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

  ● Reports Metrics (e2e) › GET /v1/reports/metrics › deve filtrar métricas por modelo (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

  ● Reports Metrics (e2e) › GET /v1/reports/metrics › deve filtrar métricas por usuário (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

  ● Reports Metrics (e2e) › GET /v1/reports/metrics/summary › deve obter métricas resumidas com sucesso (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

  ● Reports Metrics (e2e) › GET /v1/reports/metrics/summary › deve obter métricas resumidas com sucesso (200) - MANAGER

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

  ● Reports Metrics (e2e) › GET /v1/reports/metrics/model/:model › deve obter métricas por modelo com sucesso (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

  ● Reports Metrics (e2e) › GET /v1/reports/metrics/model/:model › deve obter métricas por modelo com sucesso (200) - MANAGER

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

  ● Reports Metrics (e2e) › GET /v1/reports/metrics/model/:model › deve filtrar métricas por modelo e período (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

  ● Reports Metrics (e2e) › GET /v1/reports/metrics/quota › deve obter quota atual do usuário com sucesso (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

  ● Reports Metrics (e2e) › GET /v1/reports/metrics/quota › deve obter quota atual do usuário com sucesso (200) - MANAGER

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

  ● Reports Metrics (e2e) › GET /v1/reports/metrics/quota › deve filtrar quota por período (daily) (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

  ● Reports Metrics (e2e) › GET /v1/reports/metrics/quota › deve filtrar quota por período (weekly) (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

  ● Reports Metrics (e2e) › GET /v1/reports/metrics/quota › deve filtrar quota por período (monthly) (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

  ● Reports Metrics (e2e) › GET /v1/reports/metrics/quota/:userId › deve obter quota de usuário com sucesso (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

  ● Reports Metrics (e2e) › GET /v1/reports/metrics/quota/:userId › deve filtrar quota por período (daily) (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: reports-metrics-test-admin@example.com. Email: reports-metrics-test-admin@example.com

      534 |     }
      535 |     
    > 536 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      537 |   }
      538 |
      539 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:536:11)
      at Object.<anonymous> (reports-metrics/reports-metrics.e2e-spec.ts:58:14)

FAIL categorias/categorias.e2e-spec.ts (14.747 s)
  ● Categorias (e2e) › GET /v1/categorias › deve listar categorias com paginação (200)

    expected 200 "OK", got 404 "Not Found"

      103 |         .get('/v1/categorias')
      104 |         .query({ page: 1, limit: 10 })
    > 105 |         .expect(200);
          |          ^
      106 |
      107 |       expect(response.body).toHaveProperty('data');
      108 |       expect(response.body).toHaveProperty('total');

      at Object.<anonymous> (categorias/categorias.e2e-spec.ts:105:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Categorias (e2e) › GET /v1/categorias › deve filtrar categorias por ativo (200)

    expected 200 "OK", got 404 "Not Found"

      117 |         .get('/v1/categorias')
      118 |         .query({ ativo: true, page: 1, limit: 10 })
    > 119 |         .expect(200);
          |          ^
      120 |
      121 |       expect(response.body.data).toBeDefined();
      122 |       if (response.body.data.length > 0) {

      at Object.<anonymous> (categorias/categorias.e2e-spec.ts:119:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Categorias (e2e) › GET /v1/categorias › deve buscar categorias por texto (q) (200)

    expected 200 "OK", got 404 "Not Found"

      131 |         .get('/v1/categorias')
      132 |         .query({ q: 'Equipamento', page: 1, limit: 10 })
    > 133 |         .expect(200);
          |          ^
      134 |
      135 |       expect(response.body.data).toBeDefined();
      136 |     });

      at Object.<anonymous> (categorias/categorias.e2e-spec.ts:133:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Categorias (e2e) › GET /v1/categorias › deve funcionar sem autenticação (endpoint público)

    expect(received).toBe(expected) // Object.is equality

    Expected: 200
    Received: 404

      142 |       
      143 |       // Endpoint público, deve retornar 200
    > 144 |       expect(response.status).toBe(200);
          |                               ^
      145 |     });
      146 |   });
      147 |

      at Object.<anonymous> (categorias/categorias.e2e-spec.ts:144:31)

  ● Categorias (e2e) › POST /v1/categorias › deve criar categoria com sucesso (201) - ADMIN

    expected 201 "Created", got 404 "Not Found"

      166 |       )
      167 |         .send(createCategoriaDto)
    > 168 |         .expect(201);
          |          ^
      169 |
      170 |       expect(response.body).toHaveProperty('id');
      171 |       expect(response.body).toHaveProperty('codigo', categoriaCodigo1);

      at Object.<anonymous> (categorias/categorias.e2e-spec.ts:168:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Categorias (e2e) › POST /v1/categorias › deve criar categoria com sucesso (201) - MANAGER

    expected 201 "Created", got 404 "Not Found"

      198 |       )
      199 |         .send(createCategoriaDto)
    > 200 |         .expect(201);
          |          ^
      201 |
      202 |       expect(response.body).toHaveProperty('id');
      203 |       expect(response.body).toHaveProperty('codigo', categoriaCodigo2);

      at Object.<anonymous> (categorias/categorias.e2e-spec.ts:200:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Categorias (e2e) › GET /v1/categorias/:id › deve buscar categoria por ID (200)

    expected 200 "OK", got 404 "Not Found"

      212 |       const response = await request(httpServer)
      213 |         .get(`/v1/categorias/${categoriaId1}`)
    > 214 |         .expect(200);
          |          ^
      215 |
      216 |       expect(response.body).toHaveProperty('id', categoriaId1);
      217 |       expect(response.body).toHaveProperty('codigo', categoriaCodigo1);

      at Object.<anonymous> (categorias/categorias.e2e-spec.ts:214:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Categorias (e2e) › GET /v1/categorias/codigo/:codigo › deve buscar categoria por código (200)

    expected 200 "OK", got 404 "Not Found"

      225 |       const response = await request(httpServer)
      226 |         .get(`/v1/categorias/codigo/${categoriaCodigo1}`)
    > 227 |         .expect(200);
          |          ^
      228 |
      229 |       expect(response.body).toHaveProperty('id', categoriaId1);
      230 |       expect(response.body).toHaveProperty('codigo', categoriaCodigo1);

      at Object.<anonymous> (categorias/categorias.e2e-spec.ts:227:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Categorias (e2e) › PUT /v1/categorias/:id › deve atualizar categoria com sucesso (200) - ADMIN

    Expected 200 or 201, got 404

      249 |       )
      250 |         .send(updateDto)
    > 251 |         .expect((res) => {
          |          ^
      252 |           // PUT pode retornar 200 ou 201
      253 |           if (res.status !== 200 && res.status !== 201) {
      254 |             throw new Error(`Expected 200 or 201, got ${res.status}`);

      at Object.<anonymous> (categorias/categorias.e2e-spec.ts:251:10)
      ----
      at categorias/categorias.e2e-spec.ts:254:19
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Categorias (e2e) › PUT /v1/categorias/:id › deve atualizar categoria com sucesso (200) - MANAGER

    Expected 200 or 201, got 404

      276 |       )
      277 |         .send(updateDto)
    > 278 |         .expect((res) => {
          |          ^
      279 |           if (res.status !== 200 && res.status !== 201) {
      280 |             throw new Error(`Expected 200 or 201, got ${res.status}`);
      281 |           }

      at Object.<anonymous> (categorias/categorias.e2e-spec.ts:278:10)
      ----
      at categorias/categorias.e2e-spec.ts:280:19
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Categorias (e2e) › PATCH /v1/categorias/:id/ativar › deve ativar categoria com sucesso (204) - ADMIN

    expected 204 "No Content", got 404 "Not Found"

      296 |         tokens,
      297 |         UserRole.ADMIN, // PATCH /categorias/:id/desativar requer ADMIN ou MANAGER
    > 298 |       ).expect(204);
          |         ^
      299 |
      300 |       // Agora ativar
      301 |       await authenticatedRequest(

      at Object.<anonymous> (categorias/categorias.e2e-spec.ts:298:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Categorias (e2e) › PATCH /v1/categorias/:id/desativar › deve desativar categoria com sucesso (204) - ADMIN

    expected 204 "No Content", got 404 "Not Found"

      324 |         tokens,
      325 |         UserRole.ADMIN, // PATCH /categorias/:id/desativar requer ADMIN ou MANAGER
    > 326 |       ).expect(204);
          |         ^
      327 |
      328 |       // Verificar que está desativada
      329 |       const response = await request(httpServer)

      at Object.<anonymous> (categorias/categorias.e2e-spec.ts:326:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Categorias (e2e) › DELETE /v1/categorias/:id › deve deletar categoria com sucesso (204) - ADMIN

    expected 201 "Created", got 404 "Not Found"

      347 |       )
      348 |         .send({ codigo: tempCodigo, nome: 'Temp Categoria', ativo: true })
    > 349 |         .expect(201);
          |          ^
      350 |
      351 |       const tempCategoriaId = createResponse.body.id;
      352 |

      at Object.<anonymous> (categorias/categorias.e2e-spec.ts:349:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

FAIL audit/audit.e2e-spec.ts (14.65 s)
  ● Audit (e2e) › POST /v1/audit/logs › deve criar log de auditoria com sucesso (201) - público

    expected 201 "Created", got 404 "Not Found"

      118 |         .post('/v1/audit/logs')
      119 |         .send(createAuditLogDto)
    > 120 |         .expect(201);
          |          ^
      121 |
      122 |       expect(response.body).toHaveProperty('id');
      123 |       expect(response.body).toHaveProperty('action', createAuditLogDto.action);

      at Object.<anonymous> (audit/audit.e2e-spec.ts:120:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Audit (e2e) › POST /v1/audit/logs › deve criar log de auditoria com valores old/new (201)

    expected 201 "Created", got 404 "Not Found"

      143 |         .post('/v1/audit/logs')
      144 |         .send(createAuditLogDto)
    > 145 |         .expect(201);
          |          ^
      146 |
      147 |       expect(response.body).toHaveProperty('id');
      148 |       expect(response.body).toHaveProperty('action', createAuditLogDto.action);

      at Object.<anonymous> (audit/audit.e2e-spec.ts:145:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Audit (e2e) › POST /v1/audit/logs › deve criar log de auditoria sem userId (201)

    expected 201 "Created", got 404 "Not Found"

      164 |         .post('/v1/audit/logs')
      165 |         .send(createAuditLogDto)
    > 166 |         .expect(201);
          |          ^
      167 |
      168 |       expect(response.body).toHaveProperty('id');
      169 |       expect(response.body).toHaveProperty('action', createAuditLogDto.action);

      at Object.<anonymous> (audit/audit.e2e-spec.ts:166:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Audit (e2e) › GET /v1/audit/logs › deve listar logs de auditoria (200) - ADMIN

    expected 200 "OK", got 404 "Not Found"

      179 |         tokens,
      180 |         UserRole.ADMIN, // GET /audit/logs requer ADMIN ou MANAGER
    > 181 |       ).expect(200);
          |         ^
      182 |
      183 |       expect(response.body).toBeDefined();
      184 |       // Pode retornar array ou objeto com paginação

      at Object.<anonymous> (audit/audit.e2e-spec.ts:181:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Audit (e2e) › GET /v1/audit/logs › deve listar logs de auditoria (200) - MANAGER

    expected 200 "OK", got 404 "Not Found"

      198 |         tokens,
      199 |         UserRole.MANAGER, // GET /audit/logs requer ADMIN ou MANAGER
    > 200 |       ).expect(200);
          |         ^
      201 |
      202 |       expect(response.body).toBeDefined();
      203 |     });

      at Object.<anonymous> (audit/audit.e2e-spec.ts:200:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Audit (e2e) › GET /v1/audit/logs › deve filtrar logs por action (200) - ADMIN

    expected 200 "OK", got 404 "Not Found"

      212 |       )
      213 |         .query({ action: 'CREATE' })
    > 214 |         .expect(200);
          |          ^
      215 |
      216 |       expect(response.body).toBeDefined();
      217 |     });

      at Object.<anonymous> (audit/audit.e2e-spec.ts:214:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Audit (e2e) › GET /v1/audit/logs › deve filtrar logs por entityType (200) - ADMIN

    expected 200 "OK", got 404 "Not Found"

      226 |       )
      227 |         .query({ entityType: 'Patrimonio' })
    > 228 |         .expect(200);
          |          ^
      229 |
      230 |       expect(response.body).toBeDefined();
      231 |     });

      at Object.<anonymous> (audit/audit.e2e-spec.ts:228:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Audit (e2e) › GET /v1/audit/logs/:id › deve buscar log por ID (200) - ADMIN

    expected 200 "OK", got 404 "Not Found"

      240 |         tokens,
      241 |         UserRole.ADMIN, // GET /audit/logs/:id requer ADMIN ou MANAGER
    > 242 |       ).expect(200);
          |         ^
      243 |
      244 |       expect(response.body).toHaveProperty('id', auditLogId1);
      245 |       expect(response.body).toHaveProperty('action');

      at Object.<anonymous> (audit/audit.e2e-spec.ts:242:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Audit (e2e) › GET /v1/audit/logs/:id › deve buscar log por ID (200) - MANAGER

    expected 200 "OK", got 404 "Not Found"

      255 |         tokens,
      256 |         UserRole.MANAGER, // GET /audit/logs/:id requer ADMIN ou MANAGER
    > 257 |       ).expect(200);
          |         ^
      258 |
      259 |       expect(response.body).toHaveProperty('id', auditLogId2);
      260 |     });

      at Object.<anonymous> (audit/audit.e2e-spec.ts:257:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Audit (e2e) › GET /v1/audit/logs/entity/:entityType/:entityId › deve buscar logs por entidade (200) - ADMIN

    expected 200 "OK", got 404 "Not Found"

      269 |         tokens,
      270 |         UserRole.ADMIN, // GET /audit/logs/entity/:entityType/:entityId requer ADMIN ou MANAGER
    > 271 |       ).expect(200);
          |         ^
      272 |
      273 |       expect(response.body).toBeDefined();
      274 |       // Pode retornar array ou objeto

      at Object.<anonymous> (audit/audit.e2e-spec.ts:271:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Audit (e2e) › GET /v1/audit/logs/entity/:entityType/:entityId › deve buscar logs por entidade (200) - MANAGER

    expected 200 "OK", got 404 "Not Found"

      287 |         tokens,
      288 |         UserRole.MANAGER, // GET /audit/logs/entity/:entityType/:entityId requer ADMIN ou MANAGER
    > 289 |       ).expect(200);
          |         ^
      290 |
      291 |       expect(response.body).toBeDefined();
      292 |     });

      at Object.<anonymous> (audit/audit.e2e-spec.ts:289:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Audit (e2e) › GET /v1/audit/logs/user/:userId › deve buscar logs por usuário (200) - ADMIN

    expected 200 "OK", got 404 "Not Found"

      301 |         tokens,
      302 |         UserRole.ADMIN, // GET /audit/logs/user/:userId requer ADMIN ou MANAGER
    > 303 |       ).expect(200);
          |         ^
      304 |
      305 |       expect(response.body).toBeDefined();
      306 |       // Pode retornar array ou objeto

      at Object.<anonymous> (audit/audit.e2e-spec.ts:303:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Audit (e2e) › GET /v1/audit/logs/user/:userId › deve buscar logs por usuário (200) - MANAGER

    expected 200 "OK", got 404 "Not Found"

      319 |         tokens,
      320 |         UserRole.MANAGER, // GET /audit/logs/user/:userId requer ADMIN ou MANAGER
    > 321 |       ).expect(200);
          |         ^
      322 |
      323 |       expect(response.body).toBeDefined();
      324 |     });

      at Object.<anonymous> (audit/audit.e2e-spec.ts:321:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Audit (e2e) › GET /v1/audit/stats › deve retornar estatísticas de auditoria (200) - ADMIN

    expected 200 "OK", got 404 "Not Found"

      333 |         tokens,
      334 |         UserRole.ADMIN, // GET /audit/stats requer apenas ADMIN
    > 335 |       ).expect(200);
          |         ^
      336 |
      337 |       expect(response.body).toBeDefined();
      338 |       // Verificar estrutura básica (pode variar conforme implementação)

      at Object.<anonymous> (audit/audit.e2e-spec.ts:335:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)


Test Suites: 16 failed, 5 passed, 21 total
Tests:       335 failed, 119 passed, 454 total
Snapshots:   0 total
Time:        95.287 s
Ran all test suites.
Error: Process completed with exit code 1.