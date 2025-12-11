import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Download,
  Copy,
  Star,
  Tag,
  Users,
  Building2,
  Activity,
  BarChart3,
  Settings,
  Eye,
  Clock,
} from 'lucide-react';
import { ReportTemplate, ReportType, ReportFormat } from '../../types/reports';

interface ReportTemplatesProps {
  onUseTemplate?: (template: ReportTemplate) => void;
  onCreateFromTemplate?: (template: ReportTemplate) => void;
}

// Templates padrão do sistema
const defaultTemplates: ReportTemplate[] = [
  {
    id: '1',
    name: 'Relatório de Usuários Completo',
    description:
      'Relatório detalhado de todos os usuários do sistema com informações de perfil, roles e atividade',
    type: ReportType.USERS,
    config: {
      type: ReportType.USERS,
      format: ReportFormat.PDF,
      includeCharts: true,
      includeSummary: true,
      includeDetails: true,
      filters: {},
    },
    isDefault: true,
    isPublic: true,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    usageCount: 45,
    tags: ['usuários', 'padrão', 'completo'],
  },
  {
    id: '2',
    name: 'Inventário de Patrimônios',
    description:
      'Lista completa de patrimônios com valores, categorias e responsáveis',
    type: ReportType.PATRIMONIOS,
    config: {
      type: ReportType.PATRIMONIOS,
      format: ReportFormat.EXCEL,
      includeSummary: true,
      includeDetails: true,
      filters: {},
    },
    isDefault: true,
    isPublic: true,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    usageCount: 32,
    tags: ['patrimônios', 'inventário', 'valores'],
  },
  {
    id: '3',
    name: 'Auditoria de Sistema',
    description: 'Relatório de auditoria com logs de ações e eventos do sistema',
    type: ReportType.AUDIT,
    config: {
      type: ReportType.AUDIT,
      format: ReportFormat.PDF,
      includeCharts: true,
      includeSummary: true,
      filters: {
        period: 'last_30_days',
      },
    },
    isDefault: true,
    isPublic: true,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    usageCount: 18,
    tags: ['auditoria', 'logs', 'segurança'],
  },
  {
    id: '4',
    name: 'Atividade de Usuários',
    description: 'Relatório de atividade dos usuários no sistema',
    type: ReportType.ACTIVITY,
    config: {
      type: ReportType.ACTIVITY,
      format: ReportFormat.CSV,
      includeCharts: true,
      filters: {
        period: 'last_7_days',
      },
    },
    isDefault: true,
    isPublic: true,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    usageCount: 28,
    tags: ['atividade', 'usuários'],
  },
  {
    id: '5',
    name: 'Performance do Sistema',
    description: 'Métricas de performance e utilização do sistema',
    type: ReportType.SYSTEM,
    config: {
      type: ReportType.SYSTEM,
      format: ReportFormat.PDF,
      includeCharts: true,
      includeSummary: true,
      filters: {
        period: 'last_24_hours',
      },
    },
    isDefault: true,
    isPublic: true,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    usageCount: 12,
    tags: ['sistema', 'performance', 'métricas'],
  },
  {
    id: '6',
    name: 'Estatísticas de Cache',
    description: 'Relatório de uso e performance do cache Redis',
    type: ReportType.CACHE,
    config: {
      type: ReportType.CACHE,
      format: ReportFormat.JSON,
      includeCharts: true,
      filters: {},
    },
    isDefault: true,
    isPublic: true,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    usageCount: 8,
    tags: ['cache', 'redis', 'performance'],
  },
];

const getReportTypeIcon = (type: ReportType) => {
  switch (type) {
    case ReportType.USERS:
      return <Users className="h-5 w-5" />;
    case ReportType.PATRIMONIOS:
      return <Building2 className="h-5 w-5" />;
    case ReportType.ACTIVITY:
      return <Activity className="h-5 w-5" />;
    case ReportType.SYSTEM:
      return <Settings className="h-5 w-5" />;
    case ReportType.CACHE:
      return <BarChart3 className="h-5 w-5" />;
    case ReportType.AUDIT:
      return <BarChart3 className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const getReportTypeColor = (type: ReportType) => {
  switch (type) {
    case ReportType.USERS:
      return 'bg-blue-100 text-blue-600';
    case ReportType.PATRIMONIOS:
      return 'bg-purple-100 text-purple-600';
    case ReportType.ACTIVITY:
      return 'bg-green-100 text-green-600';
    case ReportType.SYSTEM:
      return 'bg-orange-100 text-orange-600';
    case ReportType.CACHE:
      return 'bg-indigo-100 text-indigo-600';
    case ReportType.AUDIT:
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const getFormatLabel = (format: ReportFormat) => {
  switch (format) {
    case ReportFormat.PDF:
      return 'PDF';
    case ReportFormat.EXCEL:
      return 'Excel';
    case ReportFormat.CSV:
      return 'CSV';
    case ReportFormat.JSON:
      return 'JSON';
    default:
      return format;
  }
};

export const ReportTemplates: React.FC<ReportTemplatesProps> = ({
  onUseTemplate,
  onCreateFromTemplate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ReportType | ''>('');
  const [templates] = useState<ReportTemplate[]>(defaultTemplates);

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesType = !selectedType || template.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleUseTemplate = (template: ReportTemplate) => {
    if (onUseTemplate) {
      onUseTemplate(template);
    }
  };

  const handleCreateFromTemplate = (template: ReportTemplate) => {
    if (onCreateFromTemplate) {
      onCreateFromTemplate(template);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Templates</h2>
          <p className="text-gray-600 mt-1">
            Use templates pré-configurados para criar relatórios rapidamente
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="w-full md:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ReportType | '')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos os tipos</option>
              <option value={ReportType.USERS}>Usuários</option>
              <option value={ReportType.PATRIMONIOS}>Patrimônios</option>
              <option value={ReportType.ACTIVITY}>Atividade</option>
              <option value={ReportType.SYSTEM}>Sistema</option>
              <option value={ReportType.CACHE}>Cache</option>
              <option value={ReportType.AUDIT}>Auditoria</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Templates */}
      {filteredTemplates.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum template encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros de busca
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
            >
              {/* Header do Card */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${getReportTypeColor(template.type)}`}>
                  {getReportTypeIcon(template.type)}
                </div>
                <div className="flex items-center space-x-2">
                  {template.isDefault && (
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  )}
                  {template.isPublic && (
                    <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      Público
                    </div>
                  )}
                </div>
              </div>

              {/* Conteúdo */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>

                {/* Tags */}
                {template.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {template.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Info */}
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {template.usageCount} usos
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-3 w-3 mr-1" />
                    {getFormatLabel(template.config.format || ReportFormat.PDF)}
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleUseTemplate(template)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 text-sm"
                >
                  <Eye className="h-4 w-4" />
                  <span>Visualizar</span>
                </button>
                <button
                  onClick={() => handleCreateFromTemplate(template)}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2 text-sm"
                >
                  <Copy className="h-4 w-4" />
                  <span>Usar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

