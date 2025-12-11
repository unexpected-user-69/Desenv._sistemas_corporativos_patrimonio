// Componente para visualizar relatórios

import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  RefreshCw,
  FileText,
  Calendar,
  User,
  Filter,
  BarChart3,
  PieChart,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { Report, ReportType, ReportFormat } from '../../types/reports';

interface ReportViewerProps {
  report: Report;
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: ReportFormat) => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({
  report,
  isOpen,
  onClose,
  onExport,
  onRefresh,
  isLoading = false,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'data' | 'charts' | 'summary'>(
    'data',
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (isOpen) {
      setActiveTab('data');
      setSearchTerm('');
      setSortField('');
      setSortDirection('asc');
    }
  }, [isOpen, report]);

  const getReportIcon = (type: ReportType) => {
    switch (type) {
      case ReportType.USERS:
        return <User className="h-5 w-5" />;
      case ReportType.PATRIMONIOS:
        return <FileText className="h-5 w-5" />;
      case ReportType.ACTIVITY:
        return <TrendingUp className="h-5 w-5" />;
      case ReportType.SYSTEM:
        return <BarChart3 className="h-5 w-5" />;
      case ReportType.CACHE:
        return <BarChart3 className="h-5 w-5" />;
      case ReportType.AUDIT:
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'generating':
        return <RefreshCw className="h-4 w-4 text-yellow-600 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const getDataColumns = () => {
    // Como a interface Report não tem propriedade data, retornamos array vazio
    return [];
  };

  const getFilteredData = () => {
    // Como a interface Report não tem propriedade data, retornamos array vazio
    return [];
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const renderDataTable = () => {
    const columns = getDataColumns();
    const filteredData = getFilteredData();

    if (columns.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p>Nenhum dado disponível para exibição</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Search and Controls */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar nos dados..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          <div className="text-sm text-gray-600">
            {filteredData.length} de 0 registros
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort(column)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column}</span>
                      {sortField === column && (
                        <span className="text-blue-600">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((row: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderCharts = () => {
    // Como a interface Report não tem propriedade charts, retornamos mensagem
    return (
      <div className="text-center py-8 text-gray-500">
        <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p>Nenhum gráfico disponível para este relatório</p>
      </div>
    );
  };

  const renderSummary = () => {
    // Como a interface Report não tem propriedade summary, retornamos mensagem
    return (
      <div className="text-center py-8 text-gray-500">
        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p>Nenhum resumo disponível para este relatório</p>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${isFullscreen ? 'p-0' : ''}`}
    >
      <div
        className={`bg-white rounded-lg shadow-xl w-full ${isFullscreen ? 'h-full rounded-none' : 'max-w-7xl max-h-[90vh]'} overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              {getReportIcon(report.config.type)}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {report.config.name}
              </h2>
              <p className="text-sm text-gray-600">
                {report.config.description}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
            >
              {isFullscreen ? (
                <Minimize2 className="h-5 w-5" />
              ) : (
                <Maximize2 className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={onRefresh}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Atualizar relatório"
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`}
              />
            </button>

            <div className="relative">
              <button
                onClick={() => onExport(ReportFormat.PDF)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Exportar relatório"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Report Info */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Gerado em:</span>
              <span className="font-medium">
                {formatDate(report.generatedAt || '')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(report.status)}
              <span className="text-gray-600">Status:</span>
              <span className="font-medium capitalize">{report.status}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Registros:</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex items-center space-x-2">
              <Download className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Tamanho:</span>
              <span className="font-medium">
                {formatFileSize(report.fileSize || 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'data', label: 'Dados', icon: FileText },
              { id: 'charts', label: 'Gráficos', icon: BarChart3 },
              { id: 'summary', label: 'Resumo', icon: PieChart },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div
          className={`p-6 ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'max-h-96'} overflow-y-auto`}
        >
          {activeTab === 'data' && renderDataTable()}
          {activeTab === 'charts' && renderCharts()}
          {activeTab === 'summary' && renderSummary()}
        </div>
      </div>
    </div>
  );
};
