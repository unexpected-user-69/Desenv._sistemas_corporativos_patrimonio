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
import { useReportsStore } from '../../stores/reportsStore';
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
          />
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Total de Relatórios
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {pagination.total}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Concluídos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {
                        reports.filter(
                          (r) => r.status === ReportStatus.COMPLETED,
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Agendados
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {reports.filter((r) => r.config.isScheduled).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Download className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Em Processamento
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {
                        reports.filter(
                          (r) => r.status === ReportStatus.GENERATING,
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Relatórios Recentes
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {reports.slice(0, 5).map((report) => (
                  <div key={report.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            {report.config.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {report.config.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            void handleGenerateReport(report, ReportFormat.PDF)
                          }
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Gerar PDF"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {}}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Visualizar"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Templates de Relatórios
            </h3>
            <p className="text-gray-600">
              A funcionalidade de templates será implementada em breve.
            </p>
          </div>
        )}

        {/* Modals */}
        {showCreateModal && (
          <ReportForm
            onSave={() => {
              // Implementar salvamento
              console.log('Salvando novo relatório');
            }}
            onCancel={() => {
              setShowCreateModal(false);
              setFormError(null);
            }}
            isLoading={isLoading}
            error={formError}
          />
        )}

        {editingReport && (
          <ReportForm
            report={editingReport}
            onSave={() => {
              // Implementar salvamento
              console.log('Salvando relatório editado');
            }}
            onCancel={() => {
              setEditingReport(null);
              setFormError(null);
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
