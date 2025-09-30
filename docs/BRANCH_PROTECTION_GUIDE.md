# Guia de Branch Protection e CI Required Checks

Este documento explica como configurar e gerenciar as regras de proteção de branch e checks obrigatórios do CI no projeto Patrimônio e Inventário.

## Configurações Implementadas

### 🛡️ **Branch Protection Rules**

#### **Main Branch Protection**
- ✅ **PR obrigatório**: Nenhum push direto permitido
- ✅ **Required checks**: Lint, Build, Test devem passar
- ✅ **Linear history**: Histórico linear obrigatório
- ✅ **Code Owner reviews**: Revisão obrigatória por code owners
- ✅ **Auto-delete branch**: Branches deletadas após merge
- ✅ **No force push**: Force push proibido
- ✅ **No bypass**: Regras aplicadas até para admins

#### **Required Status Checks**
```yaml
required_status_checks:
  strict: true  # Branch deve estar atualizada
  contexts:
    - "lint"    # Verificação de estilo
    - "build"   # Compilação
    - "test"    # Testes automatizados
```

### 🔒 **Security Settings**

#### **Signed Commits**
- ✅ **GPG/SSH required**: Commits devem ser assinados
- ✅ **Verification required**: Verificação obrigatória
- ✅ **No unsigned commits**: Commits não assinados rejeitados

#### **Secret Scanning**
- ✅ **Push protection**: Proteção em tempo real
- ✅ **Custom patterns**: Padrões específicos do projeto
- ✅ **Alert retention**: Alertas mantidos por 30 dias

#### **Dependabot**
- ✅ **Security updates**: Atualizações de segurança automáticas
- ✅ **Version updates**: Atualizações de versão semanais
- ✅ **Schedule**: Execução toda segunda-feira às 09:00

### 🌍 **Environments**

#### **Staging Environment**
- ✅ **Required reviewers**: 1 revisor obrigatório
- ✅ **Custom branch policies**: Apenas branches feat/* e staging
- ✅ **No wait timer**: Deploy imediato após aprovação

#### **Production Environment**
- ✅ **Required reviewers**: 2 revisores obrigatórios
- ✅ **Wait timer**: 5 minutos de delay
- ✅ **Protected branches**: Apenas branch main
- ✅ **Required deployments**: Deploy obrigatório via staging

## Como Usar

### **1. Criando uma Branch**
```bash
# Sempre criar branch a partir da main atualizada
git checkout main
git pull origin main
git checkout -b feat/nova-funcionalidade
```

### **2. Fazendo Push**
```bash
# Push normal (não force push)
git push origin feat/nova-funcionalidade
```

### **3. Abrindo PR**
- PR será criado automaticamente
- CI checks serão executados
- Code owner será notificado para revisão
- Merge só será permitido após aprovação

### **4. Deploy**
```bash
# Staging: Deploy automático após merge
# Production: Deploy manual via GitHub Actions
```

## Troubleshooting

### **❌ PR Rejeitado - "Required checks have not passed"**
**Solução:**
1. Verificar se todos os jobs do CI passaram
2. Atualizar branch com `git pull origin main`
3. Resolver conflitos se houver
4. Fazer novo push

### **❌ PR Rejeitado - "Required review from code owners"**
**Solução:**
1. Aguardar revisão do code owner
2. Resolver comentários da revisão
3. Fazer novos commits se necessário

### **❌ Push Rejeitado - "Unsigned commits"**
**Solução:**
1. Configurar GPG key: `git config --global user.signingkey <key>`
2. Assinar commits: `git commit -S -m "message"`
3. Ou configurar auto-sign: `git config --global commit.gpgsign true`

### **❌ Deploy Falhou - "Environment protection rules"**
**Solução:**
1. Verificar se tem revisores suficientes
2. Aguardar wait timer (se aplicável)
3. Verificar se branch está permitida no ambiente

## Monitoramento

### **Status Checks**
- **Verde**: Todos os checks passaram
- **Amarelo**: Checks em execução
- **Vermelho**: Algum check falhou

### **Security Alerts**
- **Dependabot**: Atualizações de dependências
- **Secret Scanning**: Possíveis vazamentos de segredos
- **Code Scanning**: Vulnerabilidades no código

### **Deployment Status**
- **Staging**: Deploy automático após merge
- **Production**: Deploy manual via interface

## Configuração Manual (GitHub UI)

Se as configurações via arquivos não funcionarem, configure manualmente:

### **Branch Protection**
1. Vá para Settings > Branches
2. Clique em "Add rule"
3. Configure as regras conforme documentado

### **Required Checks**
1. Vá para Settings > Branches
2. Edite a regra da main
3. Marque "Require status checks to pass"
4. Selecione: lint, build, test

### **Security Settings**
1. Vá para Settings > Security
2. Ative "Secret scanning"
3. Ative "Dependabot alerts"
4. Configure "Code scanning"

---

**Última atualização**: 2024-09-30  
**Versão**: 1.0  
**Responsável**: Equipe de Desenvolvimento
