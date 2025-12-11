/**
 * Script de autenticação automática para Swagger UI
 * Este script faz login automático quando o Swagger UI é carregado
 */
(function() {
  'use strict';
  
  var tokenSet = false;
  var maxAttempts = 20;
  var attemptCount = 0;
  
  function setupAutoAuth() {
    attemptCount++;
    
    // Limitar tentativas para evitar loop infinito
    if (attemptCount > maxAttempts) {
      console.warn('⚠️ Número máximo de tentativas de autenticação automática atingido.');
      return;
    }
    
    // Verificar se já foi configurado
    if (tokenSet) {
      return;
    }
    
    // Verificar se o Swagger UI está disponível
    if (typeof window.ui === 'undefined' || !window.ui) {
      setTimeout(setupAutoAuth, 500);
      return;
    }
    
    console.log('%c🔐 Iniciando autenticação automática...', 'color: blue; font-weight: bold');
    
    // Obter token de desenvolvimento
    fetch(window.location.origin + '/v1/auth/dev-token', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('HTTP ' + response.status + ': ' + response.statusText);
      }
      return response.json();
    })
    .then(function(data) {
      if (data && data.accessToken) {
        var token = data.accessToken;
        console.log('%c✅ Token obtido com sucesso!', 'color: green; font-weight: bold');
        console.log('%cToken: ' + token.substring(0, 30) + '...', 'color: gray; font-size: 10px');
        
        // Tentar múltiplos métodos de autenticação
        var authSuccess = false;
        
        // Método 1: preauthorizeApiKey (Swagger UI 4.x+)
        try {
          if (typeof window.ui.preauthorizeApiKey === 'function') {
            window.ui.preauthorizeApiKey('bearer', token);
            console.log('%c✅ Método 1: preauthorizeApiKey executado', 'color: green');
            authSuccess = true;
            tokenSet = true;
          }
        } catch(e) {
          console.warn('⚠️ Método 1 falhou:', e.message);
        }
        
        // Método 2: authActions.authorize
        if (!authSuccess) {
          try {
            if (window.ui.authActions && typeof window.ui.authActions.authorize === 'function') {
              window.ui.authActions.authorize({
                bearer: {
                  name: 'bearer',
                  schema: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                  },
                  value: token
                }
              });
              console.log('%c✅ Método 2: authActions.authorize executado', 'color: green');
              authSuccess = true;
              tokenSet = true;
            }
          } catch(e) {
            console.warn('⚠️ Método 2 falhou:', e.message);
          }
        }
        
        // Método 3: Usar setAuthorization (método direto do Swagger UI)
        if (!authSuccess) {
          try {
            if (typeof window.ui.setAuthorization === 'function') {
              window.ui.setAuthorization({
                bearer: token
              });
              console.log('%c✅ Método 3: setAuthorization executado', 'color: green');
              authSuccess = true;
              tokenSet = true;
            }
          } catch(e) {
            console.warn('⚠️ Método 3 falhou:', e.message);
          }
        }
        
        // Método 4: Configurar diretamente no sistema de autorização
        if (!authSuccess) {
          try {
            // Tentar acessar o sistema de autorização interno
            if (window.ui.getSystem && window.ui.getSystem().authActions) {
              window.ui.getSystem().authActions.authorize({
                bearer: {
                  name: 'bearer',
                  value: token
                }
              });
              console.log('%c✅ Método 4: getSystem().authActions.executado', 'color: green');
              authSuccess = true;
              tokenSet = true;
            }
          } catch(e) {
            console.warn('⚠️ Método 4 falhou:', e.message);
          }
        }
        
        // Método 5: Fallback - simular interação com o botão Authorize
        if (!authSuccess) {
          console.log('%c🔄 Tentando método 5: Interação com botão Authorize...', 'color: orange');
          
          setTimeout(function() {
            try {
              // Procurar botão de autorização
              var authBtn = document.querySelector('.btn.authorize, button.authorize, [class*="authorize"], [aria-label*="Authorize" i]');
              
              if (authBtn) {
                console.log('%c🔘 Botão Authorize encontrado, clicando...', 'color: blue');
                authBtn.click();
                
                // Aguardar modal abrir
                setTimeout(function() {
                  // Procurar input do token
                  var inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
                  var tokenInput = null;
                  
                  for (var i = 0; i < inputs.length; i++) {
                    var input = inputs[i];
                    var placeholder = (input.placeholder || '').toLowerCase();
                    var name = (input.name || '').toLowerCase();
                    
                    if (placeholder.includes('token') || placeholder.includes('bearer') || 
                        name.includes('token') || name.includes('bearer') ||
                        input.value === '' || input.value === null) {
                      tokenInput = input;
                      break;
                    }
                  }
                  
                  if (tokenInput) {
                    console.log('%c📝 Input de token encontrado, preenchendo...', 'color: blue');
                    tokenInput.value = token;
                    tokenInput.focus();
                    
                    // Disparar eventos
                    ['input', 'change', 'keyup', 'blur'].forEach(function(eventType) {
                      var event = new Event(eventType, { bubbles: true, cancelable: true });
                      tokenInput.dispatchEvent(event);
                    });
                    
                    // Procurar botão de autorizar
                    setTimeout(function() {
                      var authorizeBtns = document.querySelectorAll('button, [role="button"]');
                      for (var j = 0; j < authorizeBtns.length; j++) {
                        var btn = authorizeBtns[j];
                        var text = (btn.textContent || btn.innerText || '').toLowerCase();
                        var ariaLabel = (btn.getAttribute('aria-label') || '').toLowerCase();
                        
                        if (text.includes('authorize') || text.includes('login') || 
                            ariaLabel.includes('authorize') ||
                            btn.classList.contains('btn-done') ||
                            btn.classList.contains('authorize')) {
                          console.log('%c✅ Botão de autorizar encontrado, clicando...', 'color: green');
                          btn.click();
                          tokenSet = true;
                          console.log('%c✅ Autenticação automática configurada no Swagger!', 'color: green; font-weight: bold');
                          return;
                        }
                      }
                      
                      // Se não encontrou botão específico, tentar qualquer botão no modal
                      var modal = document.querySelector('.modal-ux, .dialog-ux, [role="dialog"]');
                      if (modal) {
                        var modalBtn = modal.querySelector('button[type="button"], button:not([type="reset"])');
                        if (modalBtn) {
                          console.log('%c🔄 Clicando em botão genérico do modal...', 'color: orange');
                          modalBtn.click();
                          tokenSet = true;
                        }
                      }
                    }, 500);
                  } else {
                    console.warn('⚠️ Input de token não encontrado');
                  }
                }, 500);
              } else {
                console.warn('⚠️ Botão Authorize não encontrado');
              }
            } catch(e) {
              console.error('❌ Erro no método 5:', e);
            }
          }, 1000);
        }
        
        if (authSuccess) {
          console.log('%c✅ Autenticação automática configurada no Swagger!', 'color: green; font-weight: bold; font-size: 14px');
          console.log('%c💡 Você pode testar os endpoints protegidos agora.', 'color: blue; font-size: 12px');
        } else {
          console.warn('⚠️ Nenhum método de autenticação funcionou automaticamente.');
          console.log('%c💡 Token obtido: ' + token.substring(0, 50) + '...', 'color: gray; font-size: 10px');
          console.log('%c💡 Cole manualmente no botão "Authorize" do Swagger.', 'color: yellow; font-size: 12px');
        }
      } else {
        console.warn('⚠️ Token não encontrado na resposta');
      }
    })
    .catch(function(error) {
      console.error('❌ Erro ao obter token:', error.message || error);
      console.log('%c💡 Certifique-se de que o servidor está rodando e o endpoint /v1/auth/dev-token está acessível.', 'color: yellow');
      console.log('%c💡 Você pode fazer login manualmente usando o endpoint /v1/auth/login', 'color: blue');
    });
  }
  
  // Função para verificar se já está autenticado
  function checkIfAlreadyAuthorized() {
    try {
      if (window.ui && window.ui.getState) {
        var state = window.ui.getState();
        if (state && state.auth && state.auth.authorized && state.auth.authorized.bearer) {
          console.log('%c✅ Swagger já está autenticado!', 'color: green; font-weight: bold');
          tokenSet = true;
          return true;
        }
      }
    } catch(e) {
      // Ignorar erros de verificação
    }
    return false;
  }
  
  // Iniciar autenticação quando o Swagger UI estiver pronto
  function init() {
    // Verificar se já está autenticado
    if (checkIfAlreadyAuthorized()) {
      return;
    }
    
    // Aguardar Swagger UI estar pronto
    if (typeof window.ui !== 'undefined' && window.ui) {
      // Aguardar um pouco mais para o Swagger UI estar completamente carregado
      setTimeout(function() {
        if (!tokenSet && !checkIfAlreadyAuthorized()) {
          setupAutoAuth();
        }
      }, 2000);
    } else {
      // Tentar novamente
      setTimeout(init, 500);
    }
  }
  
  // Aguardar DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(init, 1500);
    });
  } else {
    setTimeout(init, 1500);
  }
  
  // Tentar quando a página estiver completamente carregada
  window.addEventListener('load', function() {
    setTimeout(function() {
      if (!tokenSet && !checkIfAlreadyAuthorized()) {
        init();
      }
    }, 3000);
  });
  
  // Observar mudanças no DOM para detectar quando o Swagger UI é renderizado
  if (document.body) {
    var observer = new MutationObserver(function() {
      if (document.querySelector('#swagger-ui, .swagger-ui') && typeof window.ui !== 'undefined') {
        if (!tokenSet && !checkIfAlreadyAuthorized()) {
          setTimeout(init, 1000);
        }
      }
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    // Limpar observer após 30 segundos para evitar consumo excessivo
    setTimeout(function() {
      observer.disconnect();
    }, 30000);
  }
})();

