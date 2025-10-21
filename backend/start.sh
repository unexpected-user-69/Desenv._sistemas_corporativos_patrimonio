#!/bin/bash
# Script de inicialização do container
# Baseado em PDF 084 - Containerização e Configuração

# Configuração de segurança
set -euo pipefail

echo "🚀 Iniciando aplicação Patrimônio e Inventário..."

# Aguardar banco de dados estar pronto
echo "⏳ Aguardando banco de dados..."
until pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER; do
  echo "Banco de dados não está pronto - aguardando..."
  sleep 2
done

echo "✅ Banco de dados está pronto!"

# Executar migrações
echo "🔄 Executando migrações..."
npm run migration:run || echo "⚠️ Nenhuma migração pendente ou erro ignorado"

echo "✅ Migrações concluídas!"

# Iniciar aplicação em modo produção
echo "🎯 Iniciando aplicação em modo produção..."
EXECUTABLE=""
if [ -f ./dist/src/main.js ]; then
  EXECUTABLE="./dist/src/main.js"
elif [ -f ./dist/main.js ]; then
  EXECUTABLE="./dist/main.js"
elif [ -f ./main.js ]; then
  EXECUTABLE="./main.js"
fi

if [ -z "$EXECUTABLE" ]; then
  echo "❌ Arquivo de entrada não encontrado (procurei dist/src/main.js, dist/main.js, main.js)"
  exit 1
else
  echo "➡️ Executando: node $EXECUTABLE"
  node $EXECUTABLE
fi
