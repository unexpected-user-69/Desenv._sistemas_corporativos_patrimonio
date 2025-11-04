#!/bin/bash
# Script de inicializaÃ§Ã£o do container
# Baseado em PDF 084 - ContainerizaÃ§Ã£o e ConfiguraÃ§Ã£o

# ConfiguraÃ§Ã£o de seguranÃ§a
set -euo pipefail

echo "ðŸš€ Iniciando aplicaÃ§Ã£o PatrimÃ´nio e InventÃ¡rio..."

# Aguardar banco de dados estar pronto
echo "â³ Aguardando banco de dados..."
until pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER; do
  echo "Banco de dados nÃ£o estÃ¡ pronto - aguardando..."
  sleep 2
done

echo "âœ… Banco de dados estÃ¡ pronto!"

# Iniciar aplicaÃ§Ã£o em modo produÃ§Ã£o
echo "ðŸŽ¯ Iniciando aplicaÃ§Ã£o em modo produÃ§Ã£o..."
node dist/main.js
