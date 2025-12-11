#!/bin/bash

# Script para verificar status e saúde do Redis

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 Verificando status do Redis...${NC}"
echo ""

# Verificar se Redis está rodando
if command -v redis-cli &> /dev/null; then
    if redis-cli ping > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Redis está rodando${NC}"
        
        # Informações do servidor
        echo -e "${BLUE}📊 Informações do Servidor:${NC}"
        redis-cli info server | grep -E "redis_version|redis_mode|os|arch_bits" | sed 's/^/   /'
        
        # Uso de memória
        echo -e "${BLUE}💾 Uso de Memória:${NC}"
        redis-cli info memory | grep -E "used_memory_human|used_memory_peak_human|maxmemory_human" | sed 's/^/   /'
        
        # Estatísticas
        echo -e "${BLUE}📈 Estatísticas:${NC}"
        redis-cli info stats | grep -E "total_commands_processed|instantaneous_ops_per_sec|total_connections_received" | sed 's/^/   /'
        
        # Verificar filas Bull
        echo -e "${BLUE}📋 Filas BullMQ:${NC}"
        QUEUES=("notification-queue" "report-queue" "integration-queue")
        for queue in "${QUEUES[@]}"; do
            waiting=$(redis-cli LLEN "bull:${queue}:waiting" 2>/dev/null || echo "0")
            active=$(redis-cli LLEN "bull:${queue}:active" 2>/dev/null || echo "0")
            completed=$(redis-cli LLEN "bull:${queue}:completed" 2>/dev/null || echo "0")
            failed=$(redis-cli LLEN "bull:${queue}:failed" 2>/dev/null || echo "0")
            
            if [ "$waiting" != "0" ] || [ "$active" != "0" ] || [ "$completed" != "0" ] || [ "$failed" != "0" ]; then
                echo -e "   ${queue}:"
                echo -e "      Aguardando: ${waiting}"
                echo -e "      Ativo: ${active}"
                echo -e "      Completo: ${completed}"
                echo -e "      Falhou: ${failed}"
            fi
        done
        
        echo ""
        echo -e "${GREEN}✅ Redis está saudável${NC}"
    else
        echo -e "${RED}❌ Redis não está respondendo${NC}"
        echo -e "${YELLOW}💡 Tente iniciar Redis:${NC}"
        echo "   docker-compose up -d redis"
        echo "   ou"
        echo "   npm run redis:start"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️ redis-cli não encontrado${NC}"
    echo -e "${YELLOW}💡 Verifique se Redis está instalado ou use Docker:${NC}"
    echo "   docker-compose up -d redis"
    exit 1
fi


