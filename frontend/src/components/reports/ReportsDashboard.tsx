import React from 'react';
import {
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  Activity,
  Settings,
} from 'lucide-react';
import { Report, ReportStatus, ReportType, ReportFormat } from '../../types/reports';

interface ReportsDashboardProps {
  reports: Report[];
  total: number;
}

const getReportTypeIcon = (type: ReportType) => {
  switch (type) {
    case ReportType.USERS:
      return <Users className="h-4 w-4" />;
    case ReportType.PATRIMONIOS:
      return <Building2 className="h-4 w-4" />;
    case ReportType.ACTIVITY:
      return <Activity className="h-4 w-4" />;
    case ReportType.SYSTEM:
      return <Settings className="h-4 w-4" />;
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
    case ReportType.ACTIVITY:
      return 'text-green-600 bg-green-100';
    case ReportType.SYSTEM:
      return 'text-orange-600 bg-orange-100';
    case ReportType.AUDIT:
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const ReportsDashboard: React.FC<ReportsDashboardProps> = ({
  reports,
  total,
}) => {
  const completed = reports.filter((r) => r.status === ReportStatus.COMPLETED).length;
  const pending = reports.filter((r) => r.status === ReportStatus.PENDING).length;
  const generating = reports.filter((r) => r.status === ReportStatus.GENERATING).length;
  const failed = reports.filter((r) => r.status === ReportStatus.FAILED).length;
  const scheduled = reports.filter((r) => r.config.isScheduled).length;

  const reportsByType = reports.reduce((acc, report) => {
    acc[report.config.type] = (acc[report.config.type] || 0) + 1;
    return acc;
  }, {} as Record<ReportType, number>);

  const reportsByFormat = reports.reduce((acc, report) => {
    acc[report.config.format] = (acc[report.config.format] || 0) + 1;
    return acc;
  }, {} as Record<ReportFormat, number>);

  const recentReports = reports
    .sort((a, b) => {
      const dateA = new Date(a.generatedAt || a.config.createdAt || '').getTime();
      const dateB = new Date(b.generatedAt || b.config.createdAt || '').getTime();
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total</p>
              <p className="text-2xl font-bold text-gray-900">{total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Concluídos</p>
              <p className="text-2xl font-bold text-gray-900">{completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pendentes</p>
              <p className="text-2xl font-bold text-gray-900">{pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Agendados</p>
              <p className="text-2xl font-bold text-gray-900">{scheduled}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Falhas</p>
              <p className="text-2xl font-bold text-gray-900">{failed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos e Estatísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Relatórios por Tipo */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Relatórios por Tipo
          </h3>
          <div className="space-y-3">
            {Object.entries(reportsByType).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${getReportTypeColor(type as ReportType)}`}
                  >
                    {getReportTypeIcon(type as ReportType)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(count / total) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
            {Object.keys(reportsByType).length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                Nenhum relatório ainda
              </p>
            )}
          </div>
        </div>

        {/* Relatórios por Formato */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Relatórios por Formato
          </h3>
          <div className="space-y-3">
            {Object.entries(reportsByFormat).map(([format, count]) => (
              <div key={format} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {format.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${(count / total) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
            {Object.keys(reportsByFormat).length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                Nenhum relatório ainda
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Relatórios Recentes */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Relatórios Recentes
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentReports.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhum relatório gerado ainda</p>
            </div>
          ) : (
            recentReports.map((report) => (
              <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-2 rounded-lg ${getReportTypeColor(report.config.type)}`}
                    >
                      {getReportTypeIcon(report.config.type)}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {report.config.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {report.config.description || 'Sem descrição'}
                      </p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>Gerado em: {formatDate(report.generatedAt)}</span>
                        <span>Formato: {report.config.format.toUpperCase()}</span>
                        {report.config.isScheduled && (
                          <span className="flex items-center text-purple-600">
                            <Calendar className="h-3 w-3 mr-1" />
                            Agendado
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {report.status === ReportStatus.COMPLETED && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        Concluído
                      </span>
                    )}
                    {report.status === ReportStatus.GENERATING && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        Gerando
                      </span>
                    )}
                    {report.status === ReportStatus.FAILED && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                        Falhou
                      </span>
                    )}
                    {report.status === ReportStatus.PENDING && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                        Pendente
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

