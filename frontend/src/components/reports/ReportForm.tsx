// Componente de formulário para criar/editar relatórios

import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  Calendar,
  Filter,
  Settings,
  FileText,
  Download,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
} from 'lucide-react';
import {
  Report,
  ReportConfig,
  ReportType,
  ReportFormat,
  ReportFrequency,
} from '../../types/reports';

interface ReportFormProps {
  report?: Report;
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (config: ReportConfig) => void;
  onSave?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export const ReportForm: React.FC<ReportFormProps> = ({
  report,
  isOpen = true,
  onClose,
  onSubmit,
  onSave,
  onCancel,
  isLoading = false,
  error,
}) => {
  const [config, setConfig] = useState<ReportConfig>({
    name: '',
    description: '',
    type: ReportType.USERS,
    format: ReportFormat.PDF,
    filters: {},
    isPublic: false,
    recipients: [],
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (report) {
      setConfig(report.config);
    } else {
      setConfig({
        name: '',
        description: '',
        type: ReportType.USERS,
        format: ReportFormat.PDF,
        filters: {},
        schedule: undefined,
        isPublic: false,
        recipients: [],
      });
    }
    setFormErrors({});
  }, [report, isOpen]);

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

  const getFormatLabel = (format: ReportFormat) => {
    switch (format) {
      case ReportFormat.PDF:
        return 'PDF';
      case ReportFormat.EXCEL:
        return 'Excel';
      case ReportFormat.CSV:
        return 'CSV';
      default:
        return 'PDF';
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!config.name.trim()) {
      errors.name = 'Nome do relatório é obrigatório';
    }

    if (!config.description?.trim()) {
      errors.description = 'Descrição é obrigatória';
    }

    if (config.schedule && !config.schedule.frequency) {
      errors.schedule = 'Frequência do agendamento é obrigatória';
    }

    if (config.schedule && !config.schedule.time) {
      errors.schedule = 'Horário de execução é obrigatório para agendamento';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.(config);
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [key]: value,
      },
    }));
  };

  const handleScheduleChange = (key: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      schedule: prev.schedule
        ? {
            ...prev.schedule,
            [key]: value,
          }
        : {
            frequency: ReportFrequency.WEEKLY,
            time: '09:00',
            [key]: value,
          },
    }));
  };

  const addRecipient = () => {
    setConfig((prev) => ({
      ...prev,
      recipients: [...(prev.recipients || []), ''],
    }));
  };

  const removeRecipient = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      recipients: (prev.recipients || []).filter((_, i) => i !== index),
    }));
  };

  const updateRecipient = (index: number, email: string) => {
    setConfig((prev) => ({
      ...prev,
      recipients: (prev.recipients || []).map((recipient, i) =>
        i === index ? email : recipient,
      ),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {report ? 'Editar Relatório' : 'Novo Relatório'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Informações Básicas</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Relatório *
                </label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Relatório de Usuários Mensal"
                  disabled={isLoading}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Relatório *
                </label>
                <select
                  value={config.type}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      type: e.target.value as ReportType,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {Object.values(ReportType).map((type) => (
                    <option key={type} value={type}>
                      {getTypeLabel(type)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição *
              </label>
              <textarea
                value={config.description || ''}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={3}
                placeholder="Descreva o propósito e conteúdo do relatório"
                disabled={isLoading}
              />
              {formErrors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Formato de Saída
                </label>
                <select
                  value={config.format}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      format: e.target.value as ReportFormat,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {Object.values(ReportFormat).map((format) => (
                    <option key={format} value={format}>
                      {getFormatLabel(format)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.isPublic}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        isPublic: e.target.checked,
                      }))
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Relatório Público
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtros</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Inicial
                </label>
                <input
                  type="date"
                  value={''}
                  onChange={(e) =>
                    handleFilterChange('startDate', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Final
                </label>
                <input
                  type="date"
                  value={''}
                  onChange={(e) =>
                    handleFilterChange('endDate', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Limite de Registros
                </label>
                <input
                  type="number"
                  value={''}
                  onChange={(e) =>
                    handleFilterChange(
                      'limit',
                      e.target.value ? parseInt(e.target.value) : undefined,
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1000"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordenar Por
                </label>
                <select
                  value={''}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  <option value="">Padrão</option>
                  <option value="createdAt">Data de Criação</option>
                  <option value="updatedAt">Data de Atualização</option>
                  <option value="name">Nome</option>
                </select>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Agendamento</span>
              </h3>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={!!config.schedule}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      schedule: e.target.checked
                        ? {
                            frequency: ReportFrequency.WEEKLY,
                            time: '09:00',
                          }
                        : undefined,
                    }))
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <span className="text-sm font-medium text-gray-700">
                  Agendar Relatório
                </span>
              </label>
            </div>

            {config.schedule && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequência *
                  </label>
                  <select
                    value={config.schedule.frequency}
                    onChange={(e) =>
                      handleScheduleChange('frequency', e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.schedule ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isLoading}
                  >
                    <option value="daily">Diário</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensal</option>
                  </select>
                  {formErrors.schedule && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.schedule}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Horário de Execução *
                  </label>
                  <input
                    type="time"
                    value={config.schedule?.time || ''}
                    onChange={(e) =>
                      handleScheduleChange('time', e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="09:00"
                    disabled={isLoading}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Recipients */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Destinatários</span>
              </h3>
              <button
                type="button"
                onClick={addRecipient}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                disabled={isLoading}
              >
                + Adicionar Email
              </button>
            </div>

            {(config.recipients || []).length > 0 && (
              <div className="space-y-2">
                {(config.recipients || []).map((email, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => updateRecipient(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="email@exemplo.com"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => removeRecipient(index)}
                      className="text-red-600 hover:text-red-700 p-2"
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>{report ? 'Atualizar' : 'Criar'} Relatório</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
