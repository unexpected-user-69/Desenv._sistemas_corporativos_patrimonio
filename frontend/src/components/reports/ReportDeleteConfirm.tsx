// Componente de confirmação de exclusão de relatório

import React from 'react';
import {
  X,
  AlertTriangle,
  Trash2,
  FileText,
  Calendar,
  User,
} from 'lucide-react';
import { Report } from '../../types/reports';

interface ReportDeleteConfirmProps {
  report: Report;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const ReportDeleteConfirm: React.FC<ReportDeleteConfirmProps> = ({
  report,
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  if (!isOpen || !report) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'users':
        return <User className="h-5 w-5" />;
      case 'patrimonios':
        return <FileText className="h-5 w-5" />;
      case 'activity':
        return <FileText className="h-5 w-5" />;
      case 'system':
        return <FileText className="h-5 w-5" />;
      case 'cache':
        return <FileText className="h-5 w-5" />;
      case 'audit':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Confirmar Exclusão
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-700 mb-4">
              Tem certeza que deseja excluir este relatório? Esta ação não pode
              ser desfeita.
            </p>

            {/* Report Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {getReportIcon(report.config.type)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {report.config.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {report.config.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Criado em:</span>
                  <span className="font-medium">
                    {formatDate(report.generatedAt || '')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Registros:</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Atenção</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Todos os dados e arquivos associados a este relatório serão
                  permanentemente removidos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Excluindo...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                <span>Excluir Relatório</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
