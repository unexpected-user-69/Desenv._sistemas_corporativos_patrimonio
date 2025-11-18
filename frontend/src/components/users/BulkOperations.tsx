import React, { useState } from 'react';
import {
  Upload,
  Download,
  Trash2,
  Users,
  AlertCircle,
  CheckCircle,
  X,
} from 'lucide-react';
import { useUserStore } from '../../stores/userStore';
import { CreateUserRequest, UserRole } from '../../types/user';

interface BulkOperationsProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface BulkCreateResult {
  created: number;
  errors: number;
  details: Array<{
    index: number;
    name: string;
    email: string;
    status: 'success' | 'error';
    message: string;
  }>;
}

export const BulkOperations: React.FC<BulkOperationsProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { createUsersBulk, isCreating, error, clearError } = useUserStore();
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvContent, setCsvContent] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<BulkCreateResult | null>(null);
  const [showTemplate, setShowTemplate] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCsvContent(content);
      };
      reader.readAsText(file);
    } else {
      alert('Por favor, selecione um arquivo CSV válido.');
    }
  };

  const parseCSV = (content: string): CreateUserRequest[] => {
    const lines = content.split('\n').filter((line) => line.trim());
    const users: CreateUserRequest[] = [];

    // Pular o cabeçalho se existir
    const dataLines = lines[0].toLowerCase().includes('nome')
      ? lines.slice(1)
      : lines;

    for (let i = 0; i < dataLines.length; i++) {
      const line = dataLines[i].trim();
      if (!line) continue;

      const columns = line
        .split(',')
        .map((col) => col.trim().replace(/"/g, ''));

      if (columns.length < 3) {
        throw new Error(
          `Linha ${i + 2}: Formato inválido. Esperado: nome,email,senha,role(opcional),ativo(opcional)`,
        );
      }

      const [name, email, password, roleStr, activeStr] = columns;

      // Validar email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error(`Linha ${i + 2}: Email inválido: ${email}`);
      }

      // Validar senha
      if (password.length < 6) {
        throw new Error(
          `Linha ${i + 2}: Senha deve ter pelo menos 6 caracteres`,
        );
      }

      // Validar role
      let role = UserRole.OPERATOR;
      if (roleStr) {
        const roleUpper = roleStr.toUpperCase();
        if (
          roleUpper === 'ADMIN' ||
          roleUpper === 'MANAGER' ||
          roleUpper === 'OPERATOR'
        ) {
          role = roleUpper as UserRole;
        } else {
          throw new Error(
            `Linha ${i + 2}: Role inválido: ${roleStr}. Use: ADMIN, MANAGER ou OPERATOR`,
          );
        }
      }

      // Validar status ativo
      let isActive = true;
      if (activeStr) {
        const activeLower = activeStr.toLowerCase();
        if (
          activeLower === 'false' ||
          activeLower === '0' ||
          activeLower === 'não' ||
          activeLower === 'nao'
        ) {
          isActive = false;
        }
      }

      users.push({
        name,
        email,
        password,
        role,
        isActive,
      });
    }

    return users;
  };

  const handleBulkCreate = async () => {
    if (!csvContent) {
      alert('Por favor, faça upload de um arquivo CSV primeiro.');
      return;
    }

    setIsProcessing(true);
    clearError();

    try {
      const users = parseCSV(csvContent);

      if (users.length === 0) {
        alert('Nenhum usuário válido encontrado no arquivo CSV.');
        setIsProcessing(false);
        return;
      }

      const response = await createUsersBulk({ users });

      const result: BulkCreateResult = {
        created: response.created.length,
        errors: response.errors.length,
        details: [
          ...response.created.map((user) => ({
            index: 0,
            name: user.name,
            email: user.email,
            status: 'success' as const,
            message: 'Criado com sucesso',
          })),
          ...response.errors.map((error) => ({
            index: error.index,
            name: error.data.name,
            email: error.data.email,
            status: 'error' as const,
            message: error.error,
          })),
        ],
      };

      setResult(result);
      onSuccess?.();
    } catch (error: any) {
      console.error('Erro ao processar CSV:', error);
      alert(`Erro ao processar arquivo CSV: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTemplate = () => {
    const template =
      'Nome,Email,Senha,Role,Ativo\nJoão Silva,joao@email.com,123456,OPERATOR,true\nMaria Santos,maria@email.com,123456,MANAGER,true\nPedro Costa,pedro@email.com,123456,ADMIN,false';
    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'template_usuarios.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setCsvFile(null);
    setCsvContent('');
    setResult(null);
    clearError();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Operações em Lote
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Fechar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Template Download */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-blue-800">
                  Modelo CSV
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  Baixe o modelo CSV para criar usuários em lote
                </p>
              </div>
              <button
                onClick={downloadTemplate}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Baixar Modelo</span>
              </button>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload do Arquivo CSV
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {csvFile && (
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {csvFile.name}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Formato: Nome,Email,Senha,Role(opcional),Ativo(opcional)
            </p>
          </div>

          {/* CSV Preview */}
          {csvContent && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pré-visualização do CSV
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-40 overflow-y-auto">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {csvContent.split('\n').slice(0, 10).join('\n')}
                  {csvContent.split('\n').length > 10 && '\n...'}
                </pre>
              </div>
            </div>
          )}

          {/* Process Button */}
          {csvContent && !result && (
            <div className="flex justify-end">
              <button
                onClick={() => void handleBulkCreate()}
                disabled={isProcessing || isCreating}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isProcessing || isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processando...</span>
                  </>
                ) : (
                  <>
                    <Users className="h-4 w-4" />
                    <span>Processar Usuários</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Resultado da Operação
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>{result.created} usuários criados</span>
                  </div>
                  <div className="flex items-center text-red-600">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{result.errors} erros</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="max-h-60 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Nome
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Email
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Mensagem
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {result.details.map((detail, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {detail.name}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          {detail.email}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              detail.status === 'success'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {detail.status === 'success' ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Sucesso
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Erro
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          {detail.message}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={resetForm}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Limpar
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOperations;
