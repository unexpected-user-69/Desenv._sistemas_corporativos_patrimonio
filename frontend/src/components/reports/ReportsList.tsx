import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Copy,
  Calendar,
  Share2,
  Eye,
  BarChart3,
  Users,
  Building2,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { useReportsStore } from '../../stores/reportsStore';
import {
  Report,
  ReportType,
  ReportFormat,
  ReportStatus,
} from '../../types/reports';

interface ReportsListProps {
  onCreateReport: () => void;
  onEditReport: (report: Report) => void;
  onViewReport: (report: Report) => void;
  onDeleteReport: (report: Report) => void;
  onDuplicateReport: (report: Report) => void;
  onShareReport: (report: Report) => void;
  onScheduleReport: (report: Report) => void;
}

export const ReportsList: React.FC<ReportsListProps> = ({
  onCreateReport,
  onEditReport,
  onViewReport,
  onDeleteReport,
  onDuplicateReport,
  onShareReport,
  onScheduleReport,
}) => {
  const {
    reports,
    pagination,
    filters,
    isLoading,
    error,
    fetchReports,
    setFilters,
    clearError,
  } = useReportsStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  useEffect(() => {
    void fetchReports();
  }, [fetchReports]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilters({ query: term });
    void fetchReports({ query: term });
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    void fetchReports(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({});
    setSearchTerm('');
    void fetchReports();
  };

  const getReportTypeIcon = (type: ReportType) => {
    switch (type) {
      case ReportType.USERS:
        return <Users className="h-4 w-4" />;
      case ReportType.PATRIMONIOS:
        return <Building2 className="h-4 w-4" />;
      case ReportType.SYSTEM:
        return <Activity className="h-4 w-4" />;
      case ReportType.AUDIT:
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getReportTypeColor = (type: ReportType) => {
    switch (type) {
      case ReportType.USERS:
        return 'text-blue-600 bg-blue-100';
      case ReportType.PATRIMONIOS:
        return 'text-purple-600 bg-purple-100';
      case ReportType.SYSTEM:
        return 'text-green-600 bg-green-100';
      case ReportType.AUDIT:
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.COMPLETED:
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case ReportStatus.PENDING:
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case ReportStatus.FAILED:
        return <XCircle className="h-4 w-4 text-red-600" />;
      case ReportStatus.GENERATING:
        return <Activity className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.COMPLETED:
        return 'Concluído';
      case ReportStatus.PENDING:
        return 'Pendente';
      case ReportStatus.FAILED:
        return 'Falhou';
      case ReportStatus.GENERATING:
        return 'Gerando';
      default:
        return 'Desconhecido';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSelectReport = (reportId: string) => {
    setSelectedReports((prev) =>
      prev.includes(reportId)
        ? prev.filter((id) => id !== reportId)
        : [...prev, reportId],
    );
  };

  const handleSelectAll = () => {
    if (selectedReports.length === reports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(reports.map((report) => report.id));
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <XCircle className="h-5 w-5 text-red-600 mr-2" />
          <p className="text-red-800">{error}</p>
          <button
            onClick={clearError}
            className="ml-auto text-red-600 hover:text-red-800"
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Relatórios</h2>
          <p className="text-gray-600">
            {pagination.total} relatórios encontrados
          </p>
        </div>
        <button
          onClick={onCreateReport}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Novo Relatório</span>
        </button>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-4">
          {/* Busca */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar relatórios..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filtros */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </button>
        </div>

        {/* Filtros Expandidos */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Tipo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  value={filters.type || ''}
                  onChange={(e) =>
                    handleFilterChange('type', e.target.value || undefined)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todos os tipos</option>
                  <option value={ReportType.USERS}>Usuários</option>
                  <option value={ReportType.PATRIMONIOS}>Patrimônios</option>
                  <option value={ReportType.SYSTEM}>Sistema</option>
                  <option value={ReportType.AUDIT}>Auditoria</option>
                  <option value={ReportType.CUSTOM}>Personalizado</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={filters.status || ''}
                  onChange={(e) =>
                    handleFilterChange('status', e.target.value || undefined)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todos os status</option>
                  <option value={ReportStatus.COMPLETED}>Concluído</option>
                  <option value={ReportStatus.PENDING}>Pendente</option>
                  <option value={ReportStatus.FAILED}>Falhou</option>
                  <option value={ReportStatus.GENERATING}>Gerando</option>
                </select>
              </div>

              {/* Formato */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Formato
                </label>
                <select
                  value={filters.format || ''}
                  onChange={(e) =>
                    handleFilterChange('format', e.target.value || undefined)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todos os formatos</option>
                  <option value={ReportFormat.PDF}>PDF</option>
                  <option value={ReportFormat.EXCEL}>Excel</option>
                  <option value={ReportFormat.CSV}>CSV</option>
                  <option value={ReportFormat.JSON}>JSON</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Limpar filtros
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lista de Relatórios */}
      <div className="bg-white rounded-lg shadow">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Carregando relatórios...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum relatório encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || Object.keys(filters).length > 0
                ? 'Tente ajustar os filtros de busca'
                : 'Crie seu primeiro relatório para começar'}
            </p>
            {!searchTerm && Object.keys(filters).length === 0 && (
              <button
                onClick={onCreateReport}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Criar Relatório
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Seleção em lote */}
            {reports.length > 0 && (
              <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedReports.length === reports.length}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Selecionar todos ({selectedReports.length}/
                      {reports.length})
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Lista */}
            <div className="divide-y divide-gray-200">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedReports.includes(report.id)}
                        onChange={() => handleSelectReport(report.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />

                      {/* Ícone do tipo */}
                      <div
                        className={`p-2 rounded-lg ${getReportTypeColor(report.config.type)}`}
                      >
                        {getReportTypeIcon(report.config.type)}
                      </div>

                      {/* Informações do relatório */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {report.config.name}
                          </h3>
                          {getStatusIcon(report.status)}
                          <span className="text-sm text-gray-500">
                            {getStatusText(report.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {report.config.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>
                            Criado em{' '}
                            {formatDate(report.config.createdAt || '')}
                          </span>
                          {report.generatedAt && (
                            <span>
                              Última geração: {formatDate(report.generatedAt)}
                            </span>
                          )}
                          <span>Formato: {report.config.format}</span>
                          {report.config.isScheduled && (
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Agendado
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onViewReport(report)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="Visualizar"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onEditReport(report)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDuplicateReport(report)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="Duplicar"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onShareReport(report)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="Compartilhar"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onScheduleReport(report)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="Agendar"
                      >
                        <Calendar className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDeleteReport(report)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginação */}
            {pagination.lastPage > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Página {pagination.page} de {pagination.lastPage}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        void fetchReports({ page: pagination.page - 1 })
                      }
                      disabled={pagination.page === 1}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={() =>
                        void fetchReports({ page: pagination.page + 1 })
                      }
                      disabled={pagination.page === pagination.lastPage}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Próxima
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
