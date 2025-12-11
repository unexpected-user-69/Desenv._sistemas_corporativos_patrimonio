#!/bin/bash

# Script para instalar e configurar Redis para desenvolvimento local
# Suporta: Windows (via WSL ou Docker), Linux, macOS

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔧 Configurando Redis para desenvolvimento local...${NC}"

# Detectar sistema operacional
OS="$(uname -s)"
case "${OS}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=macOS;;
    CYGWIN*)    MACHINE=Windows;;
    MINGW*)     MACHINE=Windows;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

echo -e "${YELLOW}📦 Sistema detectado: ${MACHINE}${NC}"

# Verificar se Redis já está instalado
if command -v redis-cli &> /dev/null; then
    echo -e "${GREEN}✅ Redis já está instalado${NC}"
    redis-cli ping > /dev/null 2>&1 && echo -e "${GREEN}✅ Redis está rodando${NC}" || echo -e "${YELLOW}⚠️ Redis não está rodando${NC}"
else
    echo -e "${YELLOW}📥 Redis não encontrado. Instalando...${NC}"
    
    case "${MACHINE}" in
        Linux)
            # Ubuntu/Debian
            if command -v apt-get &> /dev/null; then
                sudo apt-get update
                sudo apt-get install -y redis-server
            # Fedora/RHEL
            elif command -v dnf &> /dev/null; then
                sudo dnf install -y redis
            # Arch Linux
            elif command -v pacman &> /dev/null; then
                sudo pacman -S redis
            else
                echo -e "${RED}❌ Gerenciador de pacotes não suportado. Instale Redis manualmente.${NC}"
                exit 1
            fi
            ;;
        macOS)
            if command -v brew &> /dev/null; then
                brew install redis
                brew services start redis
            else
                echo -e "${RED}❌ Homebrew não encontrado. Instale via: brew install redis${NC}"
                exit 1
            fi
            ;;
        Windows)
            echo -e "${YELLOW}⚠️ Windows detectado. Opções:${NC}"
            echo -e "  1. Use Docker: docker run -d -p 6379:6379 redis:alpine"
            echo -e "  2. Use WSL: wsl --install e depois instale Redis no WSL"
            echo -e "  3. Instale Redis via Chocolatey: choco install redis-64"
            echo -e ""
            echo -e "${YELLOW}💡 Recomendado: Use Docker Compose (já configurado)${NC}"
            echo -e "  Execute: docker-compose up -d redis"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Sistema operacional não suportado: ${MACHINE}${NC}"
            exit 1
            ;;
    esac
fi

# Verificar se Redis está rodando
echo -e "${YELLOW}🔍 Verificando status do Redis...${NC}"

if redis-cli ping > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Redis está rodando e respondendo${NC}"
    redis-cli info server | grep "redis_version" | head -1
else
    echo -e "${YELLOW}⚠️ Redis não está rodando. Tentando iniciar...${NC}"
    
    case "${MACHINE}" in
        Linux)
            sudo systemctl start redis-server || sudo service redis start
            ;;
        macOS)
            brew services start redis || redis-server --daemonize yes
            ;;
        *)
            echo -e "${RED}❌ Não foi possível iniciar Redis automaticamente${NC}"
            echo -e "${YELLOW}💡 Inicie manualmente ou use Docker: docker-compose up -d redis${NC}"
            exit 1
            ;;
    esac
    
    # Verificar novamente
    sleep 2
    if redis-cli ping > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Redis iniciado com sucesso${NC}"
    else
        echo -e "${RED}❌ Falha ao iniciar Redis${NC}"
        exit 1
    fi
fi

# Configurar variáveis de ambiente
echo -e "${YELLOW}🔧 Configurando variáveis de ambiente...${NC}"

ENV_FILE=".env"
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${YELLOW}📝 Criando arquivo .env...${NC}"
    cp .env.example "$ENV_FILE" 2>/dev/null || touch "$ENV_FILE"
fi

# Adicionar configurações do Redis ao .env se não existirem
if ! grep -q "REDIS_HOST" "$ENV_FILE"; then
    echo "" >> "$ENV_FILE"
    echo "# Redis Configuration" >> "$ENV_FILE"
    echo "REDIS_HOST=localhost" >> "$ENV_FILE"
    echo "REDIS_PORT=6379" >> "$ENV_FILE"
    echo "REDIS_DB=0" >> "$ENV_FILE"
    echo "REDIS_PASSWORD=" >> "$ENV_FILE"
    echo -e "${GREEN}✅ Configurações do Redis adicionadas ao .env${NC}"
else
    echo -e "${GREEN}✅ Configurações do Redis já existem no .env${NC}"
fi

# Testar conexão
echo -e "${YELLOW}🧪 Testando conexão com Redis...${NC}"
if redis-cli ping | grep -q "PONG"; then
    echo -e "${GREEN}✅ Conexão com Redis bem-sucedida!${NC}"
    echo -e "${GREEN}🎉 Redis está configurado e pronto para uso${NC}"
else
    echo -e "${RED}❌ Falha ao conectar com Redis${NC}"
    exit 1
fi

echo -e "${GREEN}✨ Configuração do Redis concluída!${NC}"


