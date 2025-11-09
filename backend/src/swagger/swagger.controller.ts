import { Controller, Get, Res, Header } from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Controller para servir scripts customizados do Swagger
 * Apenas em desenvolvimento
 */
@Controller('swagger')
export class SwaggerController {
  @Get('auto-auth.js')
  @Header('Content-Type', 'application/javascript')
  @Header('Cache-Control', 'no-cache, no-store, must-revalidate')
  getAutoAuthScript(@Res() res: Response) {
    // Apenas em desenvolvimento
    if (process.env.NODE_ENV === 'production') {
      return res.status(404).send('// Not found in production');
    }

    try {
      // Ler o arquivo JavaScript
      const scriptPath = join(process.cwd(), 'public', 'swagger-auto-auth.js');
      const script = readFileSync(scriptPath, 'utf-8');
      
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.send(script);
    } catch (error) {
      // Se o arquivo não existir, retorna script inline básico
      const fallbackScript = `
// Script de autenticação automática (fallback)
(function() {
  console.log('%c🔐 Script de autenticação automática carregado (fallback)', 'color: blue');
  
  function setupAutoAuth() {
    if (typeof window.ui === 'undefined') {
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
        console.log('%c✅ Token obtido!', 'color: green');
        if (window.ui.preauthorizeApiKey) {
          window.ui.preauthorizeApiKey('bearer', data.accessToken);
          console.log('%c✅ Autenticação configurada!', 'color: green; font-weight: bold');
        }
      }
    })
    .catch(err => console.warn('⚠️ Erro:', err));
  }
  
  setTimeout(setupAutoAuth, 2000);
})();
`;
      res.setHeader('Content-Type', 'application/javascript');
      res.send(fallbackScript);
    }
  }
}

