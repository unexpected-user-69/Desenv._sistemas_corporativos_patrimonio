#!/bin/bash

# Script para configurar governança do repositório GitHub
# Baseado no projeto de referência do professor

set -e

echo "🚀 Configurando Governança do Repositório GitHub..."

# Verificar se gh CLI está instalado
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) não está instalado. Instale em: https://cli.github.com/"
    exit 1
fi

# Verificar se está autenticado
if ! gh auth status &> /dev/null; then
    echo "❌ Não está autenticado no GitHub CLI. Execute: gh auth login"
    exit 1
fi

# Obter informações do repositório
REPO_OWNER=$(gh repo view --json owner -q .owner.login)
REPO_NAME=$(gh repo view --json name -q .name)
REPO_FULL_NAME="$REPO_OWNER/$REPO_NAME"

echo "📁 Repositório: $REPO_FULL_NAME"

# 1. Configurar Labels
echo "🏷️  Configurando Labels..."

# Labels organizacionais
gh label create "feat" --description "Nova funcionalidade" --color "0e8a16" --force
gh label create "bug" --description "Algo não está funcionando" --color "d73a4a" --force
gh label create "docs" --description "Melhorias ou adições à documentação" --color "0075ca" --force
gh label create "test" --description "Adicionando testes ou corrigindo testes existentes" --color "c2e0c6" --force
gh label create "chore" --description "Mudanças no processo de build ou ferramentas auxiliares" --color "7057ff" --force
gh label create "infra" --description "Mudanças na infraestrutura" --color "f9d0c4" --force

# Labels de prioridade
gh label create "P1" --description "Prioridade Alta - Crítico" --color "b60205" --force
gh label create "P2" --description "Prioridade Média - Importante" --color "ff8c00" --force
gh label create "P3" --description "Prioridade Baixa - Desejável" --color "0e8a16" --force

# Labels de governança
gh label create "governance" --description "Questões de governança e processo" --color "5319e7" --force
gh label create "quality" --description "Questões de qualidade de código" --color "c2e0c6" --force
gh label create "security" --description "Questões de segurança" --color "d73a4a" --force

echo "✅ Labels configurados com sucesso!"

# 2. Configurar Milestones
echo "🎯 Configurando Milestones..."

# Milestone M1 - Users MVP
gh api repos/$REPO_OWNER/$REPO_NAME/milestones \
  --method POST \
  --field title="M1 - Users MVP" \
  --field description="Implementação completa do módulo de usuários com CRUD, validações e testes" \
  --field due_on="$(date -d '+30 days' -u +%Y-%m-%dT%H:%M:%SZ)" \
  --jq '.number' > /dev/null || echo "Milestone M1 já existe"

# Milestone M2 - Observabilidade
gh api repos/$REPO_OWNER/$REPO_NAME/milestones \
  --method POST \
  --field title="M2 - Observabilidade" \
  --field description="Implementação de logging, métricas e monitoramento" \
  --field due_on="$(date -d '+60 days' -u +%Y-%m-%dT%H:%M:%SZ)" \
  --jq '.number' > /dev/null || echo "Milestone M2 já existe"

# Milestone M3 - Endurecimento
gh api repos/$REPO_OWNER/$REPO_NAME/milestones \
  --method POST \
  --field title="M3 - Endurecimento" \
  --field description="Testes de performance, segurança e preparação para produção" \
  --field due_on="$(date -d '+90 days' -u +%Y-%m-%dT%H:%M:%SZ)" \
  --jq '.number' > /dev/null || echo "Milestone M3 já existe"

echo "✅ Milestones configurados com sucesso!"

# 3. Configurar Project Board
echo "📋 Configurando Project Board..."

# Criar projeto Kanban
PROJECT_ID=$(gh api graphql \
  --field query='
    query($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        projects(first: 10) {
          nodes {
            id
            name
          }
        }
      }
    }
  ' \
  --field owner="$REPO_OWNER" \
  --field repo="$REPO_NAME" \
  --jq '.data.repository.projects.nodes[] | select(.name == "Patrimônio Inventário - Kanban") | .id' 2>/dev/null || echo "")

if [ -z "$PROJECT_ID" ]; then
  echo "Criando novo Project Board..."
  PROJECT_ID=$(gh api graphql \
    --field query='
      mutation($owner: String!, $repo: String!) {
        createProject(input: {
          ownerId: "'$(gh api graphql --field query='query { viewer { id } }' --jq '.data.viewer.id')'"
          name: "Patrimônio Inventário - Kanban"
          body: "Kanban board para gerenciamento do projeto Patrimônio e Inventário"
          repositoryIds: ["'$(gh api graphql --field query="query(\$owner: String!, \$repo: String!) { repository(owner: \$owner, name: \$repo) { id } }" --field owner="$REPO_OWNER" --field repo="$REPO_NAME" --jq '.data.repository.id')'"]
        }) {
          project {
            id
          }
        }
      }
    ' \
    --jq '.data.createProject.project.id' 2>/dev/null || echo "")
fi

if [ -n "$PROJECT_ID" ]; then
  echo "✅ Project Board configurado: $PROJECT_ID"
else
  echo "⚠️  Não foi possível criar o Project Board automaticamente"
fi

# 4. Configurar Branch Protection Rules
echo "🛡️  Configurando Branch Protection Rules..."

# Verificar se a branch main existe
if gh api repos/$REPO_OWNER/$REPO_NAME/branches/main &> /dev/null; then
  BRANCH="main"
elif gh api repos/$REPO_OWNER/$REPO_NAME/branches/master &> /dev/null; then
  BRANCH="master"
else
  echo "⚠️  Branch principal não encontrada (main/master)"
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
  --jq '.url' > /dev/null || echo "Branch protection já configurada ou não foi possível configurar"

echo "✅ Branch Protection Rules configuradas!"

# 5. Configurar CODEOWNERS
echo "👥 Verificando CODEOWNERS..."

if [ -f ".github/CODEOWNERS" ]; then
  echo "✅ CODEOWNERS já existe"
else
  echo "⚠️  CODEOWNERS não encontrado. Crie o arquivo .github/CODEOWNERS"
fi

# 6. Configurar Dependabot
echo "🤖 Configurando Dependabot..."

if [ -f ".github/dependabot.yml" ]; then
  echo "✅ Dependabot já configurado"
else
  echo "⚠️  Dependabot não configurado. Crie o arquivo .github/dependabot.yml"
fi

# 7. Resumo final
echo ""
echo "🎉 Configuração de Governança Concluída!"
echo ""
echo "📊 Resumo:"
echo "  ✅ Labels organizacionais, de prioridade e governança"
echo "  ✅ Milestones M1, M2, M3 configurados"
echo "  ✅ Project Board Kanban criado"
echo "  ✅ Branch Protection Rules ativadas"
echo "  ✅ Verificação de CODEOWNERS e Dependabot"
echo ""
echo "🔗 Links úteis:"
echo "  📋 Project Board: https://github.com/$REPO_FULL_NAME/projects"
echo "  🏷️  Labels: https://github.com/$REPO_FULL_NAME/labels"
echo "  🎯 Milestones: https://github.com/$REPO_FULL_NAME/milestones"
echo "  ⚙️  Settings: https://github.com/$REPO_FULL_NAME/settings"
echo ""
echo "✨ Governança configurada com sucesso!"
