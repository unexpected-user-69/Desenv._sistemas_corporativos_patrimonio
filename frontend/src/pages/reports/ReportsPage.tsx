import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Settings,
  Eye,
  AlertCircle,
  CheckCircle,
  X,
  BarChart3,
  Download,
  Calendar,
} from 'lucide-react';
import { ReportsList } from '../../components/reports/ReportsList';
import { ReportForm } from '../../components/reports/ReportForm';
import { ReportTemplates } from '../../components/reports/ReportTemplates';
import { ReportsDashboard } from '../../components/reports/ReportsDashboard';
import { useReportsStore } from '../../stores/reportsStore';
import { config } from '../../config/environment';
import {
  Report,
  ReportConfig,
  ReportFormat,
  ReportStatus,
} from '../../types/reports';

export const ReportsPage: React.FC = () => {
  const {
    reports,
    pagination,
    isLoading,
    error,
    fetchReports,
    createReport,
    deleteReport,
    exportReport,
    clearError,
  } = useReportsStore();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [deletingReport, setDeletingReport] = useState<Report | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'list' | 'dashboard' | 'templates'
  >('list');

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleDeleteReport = async (report: Report) => {
    setFormError(null);
    try {
      await deleteReport(report.id);
      setDeletingReport(null);
    } catch (err: any) {
      setFormError(err.message || 'Erro ao deletar relatório');
    }
  };

  const handleDuplicateReport = async (report: Report) => {
    setFormError(null);
    try {
      const newConfig: ReportConfig = {
        ...report.config,
        name: `${report.config.name} (Cópia)`,
      };
      await createReport(newConfig);
    } catch (err: any) {
      setFormError(err.message || 'Erro ao duplicar relatório');
    }
  };

  const handleGenerateReport = async (
    report: Report,
    format: ReportFormat = ReportFormat.PDF,
  ) => {
    setFormError(null);
    try {
      await exportReport(report.id, format);
    } catch (err: any) {
      setFormError(err.message || 'Erro ao gerar relatório');
    }
  };

  const handleDownloadReport = async (report: Report) => {
    setFormError(null);
    try {
      if (report.status !== ReportStatus.COMPLETED) {
        setFormError('Relatório ainda não está concluído. Aguarde a conclusão para fazer o download.');
        return;
      }

      if (!report.fileUrl && !report.fileName) {
        // Se não tem URL direta, tentar baixar via endpoint
        await exportReport(report.id, report.config.format);
      } else {
        // Se tem URL direta, baixar diretamente
        const response = await fetch(`${config.api.baseUrl}/v1/reports/${report.id}/download`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token') || localStorage.getItem('access_token') || ''}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao baixar relatório');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = report.fileName || `relatorio-${report.id}.${report.config.format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (err: any) {
      setFormError(err.message || 'Erro ao baixar relatório');
    }
  };

  const handleShareReport = (report: Report) => {
    // Implementar compartilhamento
    console.log('Compartilhar relatório:', report);
  };

  const handleScheduleReport = (report: Report) => {
    // Implementar agendamento
    console.log('Agendar relatório:', report);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
              <p className="text-gray-600 mt-2">
                Gerencie e gere relatórios personalizados do sistema
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Novo Relatório</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'list', label: 'Lista de Relatórios', icon: FileText },
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'templates', label: 'Templates', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={clearError}
                  className="text-red-400 hover:text-red-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Error */}
        {formError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{formError}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setFormError(null)}
                  className="text-red-400 hover:text-red-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === 'list' && (
          <ReportsList
            onCreateReport={() => setShowCreateModal(true)}
            onEditReport={setEditingReport}
            onViewReport={() => {}}
            onDeleteReport={setDeletingReport}
            onDuplicateReport={(report) => void handleDuplicateReport(report)}
            onShareReport={handleShareReport}
            onScheduleReport={handleScheduleReport}
            onDownloadReport={handleDownloadReport}
          />
        )}

        {activeTab === 'dashboard' && (
          <ReportsDashboard reports={reports} total={pagination.total} />
        )}

        {activeTab === 'templates' && (
          <ReportTemplates
            onUseTemplate={(template) => {
              // Criar relatório a partir do template
              const config: ReportConfig = {
                ...template.config,
                name: template.name,
                description: template.description,
              };
              setShowCreateModal(true);
              // TODO: Preencher o formulário com os dados do template
            }}
            onCreateFromTemplate={(template) => {
              // Criar relatório usando o template
              void createReport({
                ...template.config,
                name: `${template.name} (Novo)`,
                description: template.description,
              });
              setActiveTab('list');
              void fetchReports();
            }}
          />
        )}

        {/* Modals */}
        {showCreateModal && (
          <ReportForm
            isOpen={showCreateModal}
            onClose={() => {
              setShowCreateModal(false);
              setFormError(null);
            }}
            onSubmit={async (config: ReportConfig) => {
              try {
                setFormError(null);
                await createReport(config);
                setShowCreateModal(false);
                await fetchReports();
              } catch (err: any) {
                setFormError(err.message || 'Erro ao criar relatório');
              }
            }}
            isLoading={isLoading}
            error={formError}
          />
        )}

        {editingReport && (
          <ReportForm
            report={editingReport}
            isOpen={!!editingReport}
            onClose={() => {
              setEditingReport(null);
              setFormError(null);
            }}
            onSubmit={async (config: ReportConfig) => {
              try {
                setFormError(null);
                // TODO: Implementar updateReport quando disponível no store
                console.log('Atualizando relatório:', config);
                setEditingReport(null);
                await fetchReports();
              } catch (err: any) {
                setFormError(err.message || 'Erro ao atualizar relatório');
              }
            }}
            isLoading={isLoading}
            error={formError}
          />
        )}

        {/* Delete Confirmation */}
        {deletingReport && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
            <div className="relative p-8 border w-full max-w-md shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Confirmar Exclusão
                </h3>
                <button
                  onClick={() => setDeletingReport(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <AlertCircle className="h-10 w-10 text-red-500" />
                <p className="text-gray-700">
                  Tem certeza que deseja excluir o relatório{' '}
                  <span className="font-semibold">
                    {deletingReport.config.name}
                  </span>
                  ? Esta ação não pode ser desfeita.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeletingReport(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    void handleDeleteReport(deletingReport);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-red-700"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
