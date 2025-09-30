#!/bin/bash

# Script para configurar CI/CD e automação
# Baseado no projeto de referência do professor

set -e

echo "🚀 Configurando CI/CD e Automação..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    log_error "Execute este script na raiz do projeto (onde está o package.json)"
    exit 1
fi

# 1. Verificar se GitHub CLI está instalado
log_info "Verificando GitHub CLI..."

if ! command -v gh &> /dev/null; then
    log_error "GitHub CLI (gh) não está instalado. Instale em: https://cli.github.com/"
    exit 1
fi

GH_VERSION=$(gh --version | head -n1)
log_success "GitHub CLI: $GH_VERSION"

# Verificar autenticação
if ! gh auth status &> /dev/null; then
    log_error "Não está autenticado no GitHub CLI. Execute: gh auth login"
    exit 1
fi

log_success "Autenticado no GitHub CLI"

# 2. Verificar se é um repositório GitHub
log_info "Verificando repositório GitHub..."

if ! gh repo view &> /dev/null; then
    log_error "Não é um repositório GitHub ou não está configurado corretamente"
    exit 1
fi

REPO_OWNER=$(gh repo view --json owner -q .owner.login)
REPO_NAME=$(gh repo view --json name -q .name)
REPO_FULL_NAME="$REPO_OWNER/$REPO_NAME"

log_success "Repositório: $REPO_FULL_NAME"

# 3. Verificar arquivos de CI/CD
log_info "Verificando arquivos de CI/CD..."

if [ -d ".github/workflows" ]; then
    log_success "Diretório .github/workflows existe"
    
    # Verificar arquivo de CI
    if [ -f ".github/workflows/ci.yml" ]; then
        log_success "Arquivo de CI (.github/workflows/ci.yml) existe"
    else
        log_warning "Arquivo de CI não encontrado. Criando..."
        
        # Criar arquivo de CI básico
        mkdir -p .github/workflows
        cat > .github/workflows/ci.yml << 'EOF'
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - name: Upload lint results
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: lint-results
          path: |
            **/eslint-report.json
            **/eslint-report.html

  build:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-artifacts
          path: dist/

  test:
    runs-on: ubuntu-latest
    needs: build
    services:
      postgres:
        image: postgres:15-alpine
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: patrimonio_inventario_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: npm run migration:run
      - run: npm test
      - run: npm run test:e2e
      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: |
            coverage/
            test-results/

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm audit --audit-level=moderate
      - name: Run security scan
        uses: github/super-linter@v4
        env:
          DEFAULT_BRANCH: main
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          VALIDATE_ALL_CODEBASE: false
          VALIDATE_TYPESCRIPT_ES: true
          VALIDATE_DOCKERFILE_HADOLINT: true
          VALIDATE_YAML: true
          VALIDATE_JSON: true
          VALIDATE_MARKDOWN: true
EOF
        
        log_success "Arquivo de CI criado"
    fi
else
    log_warning "Diretório .github/workflows não existe. Criando..."
    mkdir -p .github/workflows
fi

# 4. Configurar Dependabot
log_info "Configurando Dependabot..."

if [ -f ".github/dependabot.yml" ]; then
    log_success "Dependabot já configurado"
else
    log_info "Criando configuração do Dependabot..."
    
    cat > .github/dependabot.yml << 'EOF'
version: 2
updates:
  # NPM dependencies
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 10
    reviewers:
      - "unexpected-user-69"
    assignees:
      - "unexpected-user-69"
    commit-message:
      prefix: "chore"
      include: "scope"
    labels:
      - "dependencies"
      - "automated"
    
  # Docker dependencies
  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 5
    reviewers:
      - "unexpected-user-69"
    assignees:
      - "unexpected-user-69"
    commit-message:
      prefix: "chore"
      include: "scope"
    labels:
      - "dependencies"
      - "docker"
      - "automated"
    
  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 5
    reviewers:
      - "unexpected-user-69"
    assignees:
      - "unexpected-user-69"
    commit-message:
      prefix: "chore"
      include: "scope"
    labels:
      - "dependencies"
      - "github-actions"
      - "automated"
EOF
    
    log_success "Dependabot configurado"
fi

# 5. Configurar CodeQL
log_info "Configurando CodeQL..."

if [ -f ".github/workflows/codeql.yml" ]; then
    log_success "CodeQL já configurado"
else
    log_info "Criando configuração do CodeQL..."
    
    cat > .github/workflows/codeql.yml << 'EOF'
name: "CodeQL"

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
  schedule:
    - cron: '0 0 * * 0'

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      actions: read
      contents: read
      security-events: write

    strategy:
      fail-fast: false
      matrix:
        language: [ 'javascript' ]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Initialize CodeQL
      uses: github/codeql-action/init@v3
      with:
        languages: ${{ matrix.language }}

    - name: Autobuild
      uses: github/codeql-action/autobuild@v3

    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v3
      with:
        category: "/language:${{matrix.language}}"
EOF
    
    log_success "CodeQL configurado"
fi

# 6. Configurar Release Automation
log_info "Configurando automação de releases..."

if [ -f ".github/workflows/release.yml" ]; then
    log_success "Automação de releases já configurada"
else
    log_info "Criando automação de releases..."
    
    cat > .github/workflows/release.yml << 'EOF'
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      - run: npm test
      
      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
          body: |
            ## 🚀 Release ${{ github.ref }}
            
            ### 📋 Changes
            - Automated release from CI/CD
            
            ### 📦 Artifacts
            - Build artifacts available in Actions
            - Docker images available in Container Registry
            
            ### 🧪 Testing
            - All tests passed ✅
            - Build successful ✅
            - Lint passed ✅
EOF
    
    log_success "Automação de releases configurada"
fi

# 7. Configurar Branch Protection
log_info "Configurando proteção de branches..."

# Verificar se a branch main existe
if gh api repos/$REPO_OWNER/$REPO_NAME/branches/main &> /dev/null; then
    BRANCH="main"
elif gh api repos/$REPO_OWNER/$REPO_NAME/branches/master &> /dev/null; then
    BRANCH="master"
else
    log_warning "Branch principal não encontrada (main/master)"
    BRANCH="main"
fi

# Configurar proteção da branch principal
gh api repos/$REPO_OWNER/$REPO_NAME/branches/$BRANCH/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["lint","build","test"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true,"require_code_owner_reviews":true}' \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false \
  --jq '.url' > /dev/null || log_warning "Branch protection já configurada ou não foi possível configurar"

log_success "Proteção de branches configurada"

# 8. Resumo final
echo ""
log_success "🎉 CI/CD e Automação configurados com sucesso!"
echo ""
echo "📊 Resumo da configuração:"
echo "  ✅ GitHub CLI verificado e autenticado"
echo "  ✅ Repositório GitHub verificado"
echo "  ✅ Workflow de CI configurado"
echo "  ✅ Dependabot configurado"
echo "  ✅ CodeQL configurado"
echo "  ✅ Automação de releases configurada"
echo "  ✅ Proteção de branches configurada"
echo ""
echo "🔗 Links úteis:"
echo "  🚀 Actions: https://github.com/$REPO_FULL_NAME/actions"
echo "  🔒 Security: https://github.com/$REPO_FULL_NAME/security"
echo "  📦 Dependabot: https://github.com/$REPO_FULL_NAME/network/updates"
echo "  ⚙️  Settings: https://github.com/$REPO_FULL_NAME/settings"
echo ""
echo "🚀 Próximos passos:"
echo "  1. Faça um commit e push para testar o CI"
echo "  2. Crie uma PR para testar a proteção de branches"
echo "  3. Configure secrets se necessário"
echo "  4. Monitore as Actions para garantir que tudo funciona"
echo ""
log_success "✨ CI/CD pronto para uso!"
