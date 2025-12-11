import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Response } from 'express';

/**
 * Interceptor para injetar script de autenticação automática no Swagger UI
 * Apenas em desenvolvimento
 */
@Injectable()
export class SwaggerScriptInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    const request = context.switchToHttp().getRequest();

    // Apenas em desenvolvimento e apenas para a rota do Swagger
    if (
      process.env.NODE_ENV === 'production' ||
      !request.url?.includes('/docs')
    ) {
      return next.handle();
    }

    // Interceptar a resposta HTML do Swagger
    return next.handle().pipe(
      tap(() => {
        // Se a resposta for HTML, injetar o script
        const originalSend = response.send.bind(response);
        response.send = function (body: any) {
          if (typeof body === 'string' && body.includes('swagger-ui')) {
            // Injetar script de autenticação automática antes do </body>
            const scriptTag = `
<script>
(function() {
  'use strict';
  console.log('%c🔐 Script de autenticação automática carregado!', 'color: blue; font-weight: bold');
  
  function setupAutoAuth() {
    if (typeof window.ui === 'undefined' || !window.ui) {
      setTimeout(setupAutoAuth, 500);
      return;
    }
    
    fetch(window.location.origin + '/v1/auth/dev-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(r => r.json())
    .then(data => {
      if (data && data.accessToken) {
        console.log('%c✅ Token obtido!', 'color: green; font-weight: bold');
        
        // Tentar múltiplos métodos
        try {
          if (window.ui.preauthorizeApiKey) {
            window.ui.preauthorizeApiKey('bearer', data.accessToken);
            console.log('%c✅ Autenticação automática configurada!', 'color: green; font-weight: bold');
          } else if (window.ui.authActions && window.ui.authActions.authorize) {
            window.ui.authActions.authorize({
              bearer: { name: 'bearer', schema: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, value: data.accessToken }
            });
            console.log('%c✅ Autenticação automática configurada!', 'color: green; font-weight: bold');
          } else {
            // Fallback: simular clique no botão
            setTimeout(() => {
              var btn = document.querySelector('.btn.authorize, button.authorize');
              if (btn) {
                btn.click();
                setTimeout(() => {
                  var input = document.querySelector('input[type="text"]');
                  if (input) {
                    input.value = data.accessToken;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    var doneBtn = document.querySelector('.btn-done, button[aria-label*="authorize" i]');
                    if (doneBtn) doneBtn.click();
                    console.log('%c✅ Autenticação automática configurada!', 'color: green; font-weight: bold');
                  }
                }, 300);
              }
            }, 1000);
          }
        } catch(e) {
          console.warn('⚠️ Erro:', e);
        }
      }
    })
    .catch(err => console.warn('⚠️ Erro ao obter token:', err));
  }
  
  // Aguardar Swagger UI carregar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(setupAutoAuth, 2000));
  } else {
    setTimeout(setupAutoAuth, 2000);
  }
  
  window.addEventListener('load', () => setTimeout(setupAutoAuth, 3000));
})();
</script>
`;
            
            // Injetar antes do </body> ou no final do HTML
            if (body.includes('</body>')) {
              body = body.replace('</body>', scriptTag + '</body>');
            } else {
              body = body + scriptTag;
            }
          }
          return originalSend(body);
        };
      }),
    );
  }
}

