// Componente de lista de relatórios

import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Download,
  Edit,
  Trash2,
  Calendar,
  User,
  Building2,
  Activity,
  Database,
  Shield,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import {
  Report,
  ReportType,
  ReportStatus,
  ReportFormat,
} from '../../types/reports';

interface ReportListProps {
  reports: Report[];
  isLoading?: boolean;
  onCreateReport: () => void;
  onViewReport: (report: Report) => void;
  onEditReport: (report: Report) => void;
  onDeleteReport: (report: Report) => void;
  onExportReport: (report: Report, format: ReportFormat) => void;
  onRefresh: () => void;
}

export const ReportList: React.FC<ReportListProps> = ({
  reports,
  isLoading = false,
  onCreateReport,
  onViewReport,
  onEditReport,
  onDeleteReport,
  onExportReport,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<ReportType | ''>('');
  const [filterStatus, setFilterStatus] = useState<ReportStatus | ''>('');
  const [showActions, setShowActions] = useState<string | null>(null);

  const getReportIcon = (type: ReportType) => {
    switch (type) {
      case ReportType.USERS:
        return <User className="h-5 w-5" />;
      case ReportType.PATRIMONIOS:
        return <Building2 className="h-5 w-5" />;
      case ReportType.ACTIVITY:
        return <Activity className="h-5 w-5" />;
      case ReportType.SYSTEM:
        return <Database className="h-5 w-5" />;
      case ReportType.CACHE:
        return <Database className="h-5 w-5" />;
      case ReportType.AUDIT:
        return <Shield className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusIcon = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.COMPLETED:
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case ReportStatus.GENERATING:
        return <RefreshCw className="h-4 w-4 text-yellow-600 animate-spin" />;
      case ReportStatus.FAILED:
        return <XCircle className="h-4 w-4 text-red-600" />;
      case ReportStatus.PENDING:
        return <Clock className="h-4 w-4 text-gray-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case ReportStatus.GENERATING:
        return 'bg-yellow-100 text-yellow-800';
      case ReportStatus.FAILED:
        return 'bg-red-100 text-red-800';
      case ReportStatus.PENDING:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: ReportType) => {
    switch (type) {
      case ReportType.USERS:
        return 'Usuários';
      case ReportType.PATRIMONIOS:
        return 'Patrimônios';
      case ReportType.ACTIVITY:
        return 'Atividade';
      case ReportType.SYSTEM:
        return 'Sistema';
      case ReportType.CACHE:
        return 'Cache';
      case ReportType.AUDIT:
        return 'Auditoria';
      default:
        return 'Personalizado';
    }
  };

  const getStatusLabel = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.COMPLETED:
        return 'Concluído';
      case ReportStatus.GENERATING:
        return 'Gerando';
      case ReportStatus.FAILED:
        return 'Falhou';
      case ReportStatus.PENDING:
        return 'Pendente';
      default:
        return 'Desconhecido';
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.config.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesType = !filterType || report.config.type === filterType;
    const matchesStatus = !filterStatus || report.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '-';

    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('pt-BR');
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                  <div>
                    <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-48 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
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
            {filteredReports.length} de {reports.length} relatórios
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onRefresh}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Atualizar lista"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={onCreateReport}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Novo Relatório</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar relatórios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as ReportType | '')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos os tipos</option>
            {Object.values(ReportType).map((type) => (
              <option key={type} value={type}>
                {getTypeLabel(type)}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as ReportStatus | '')
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos os status</option>
            {Object.values(ReportStatus).map((status) => (
              <option key={status} value={status}>
                {getStatusLabel(status)}
              </option>
            ))}
          </select>

          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Mais Filtros</span>
          </button>
        </div>
      </div>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Nenhum relatório encontrado
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterType || filterStatus
              ? 'Tente ajustar os filtros de busca.'
              : 'Comece criando um novo relatório.'}
          </p>
          {!searchTerm && !filterType && !filterStatus && (
            <div className="mt-6">
              <button
                onClick={onCreateReport}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 mx-auto"
              >
                <Plus className="h-4 w-4" />
                <span>Novo Relatório</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {getReportIcon(report.config.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {report.config.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {report.config.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(report.generatedAt)}</span>
                        </span>
                        {report.fileSize && (
                          <span>{formatFileSize(report.fileSize)}</span>
                        )}
                        <span className="flex items-center space-x-1">
                          {getStatusIcon(report.status)}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}
                          >
                            {getStatusLabel(report.status)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewReport(report)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Visualizar relatório"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowActions(
                            showActions === report.id ? null : report.id,
                          )
                        }
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Mais ações"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>

                      {showActions === report.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                onEditReport(report);
                                setShowActions(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </button>
                            <button
                              onClick={() => {
                                onExportReport(report, ReportFormat.PDF);
                                setShowActions(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Exportar PDF
                            </button>
                            <button
                              onClick={() => {
                                onExportReport(report, ReportFormat.EXCEL);
                                setShowActions(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Exportar Excel
                            </button>
                            <button
                              onClick={() => {
                                onExportReport(report, ReportFormat.CSV);
                                setShowActions(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Exportar CSV
                            </button>
                            <hr className="my-1" />
                            <button
                              onClick={() => {
                                onDeleteReport(report);
                                setShowActions(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
