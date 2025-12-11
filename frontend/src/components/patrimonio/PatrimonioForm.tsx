import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Save,
  X,
  Upload,
  Calendar,
  MapPin,
  Tag,
  DollarSign,
  Hash,
  User,
  FileText,
} from 'lucide-react';
import {
  Patrimonio,
  CreatePatrimonioRequest,
  UpdatePatrimonioRequest,
  PatrimonioCategoria,
  PatrimonioStatus,
  CATEGORIA_OPTIONS,
  STATUS_OPTIONS,
} from '../../types/patrimonio';
import { patrimonioService } from '../../services/patrimonioService';

interface PatrimonioFormProps {
  patrimonio?: Patrimonio;
  onSave?: (patrimonio: Patrimonio) => void;
  onCancel?: () => void;
}

export const PatrimonioForm: React.FC<PatrimonioFormProps> = ({
  patrimonio,
  onSave,
  onCancel,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreatePatrimonioRequest>({
    codigo: '',
    nome: '',
    descricao: '',
    categoria: PatrimonioCategoria.OUTROS,
    status: PatrimonioStatus.ATIVO,
    valorAquisicao: '',
    dataAquisicao: '',
    dataGarantia: '',
    numeroSerie: '',
    modelo: '',
    marca: '',
    localizacao: '',
    observacoes: '',
    fotoUrl: '',
    responsavelId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (patrimonio) {
      setFormData({
        codigo: patrimonio.codigo,
        nome: patrimonio.nome,
        descricao: patrimonio.descricao || '',
        categoria: patrimonio.categoria,
        status: patrimonio.status,
        valorAquisicao: patrimonio.valorAquisicao,
        dataAquisicao: patrimonio.dataAquisicao.split('T')[0], // Converte para formato YYYY-MM-DD
        dataGarantia: patrimonio.dataGarantia
          ? patrimonio.dataGarantia.split('T')[0]
          : '',
        numeroSerie: patrimonio.numeroSerie || '',
        modelo: patrimonio.modelo || '',
        marca: patrimonio.marca || '',
        localizacao: patrimonio.localizacao,
        observacoes: patrimonio.observacoes || '',
        fotoUrl: patrimonio.fotoUrl || '',
        responsavelId: patrimonio.responsavelId || '',
      });
    }
  }, [patrimonio]);

  const handleInputChange = (
    field: keyof CreatePatrimonioRequest,
    value: any,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Limpa erro do campo quando usuário começa a digitar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.codigo.trim()) {
      newErrors.codigo = 'Código é obrigatório';
    }

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.localizacao.trim()) {
      newErrors.localizacao = 'Localização é obrigatória';
    }

    if (!formData.valorAquisicao || parseFloat(formData.valorAquisicao) <= 0) {
      newErrors.valorAquisicao = 'Valor de aquisição deve ser maior que zero';
    }

    if (!formData.dataAquisicao) {
      newErrors.dataAquisicao = 'Data de aquisição é obrigatória';
    }

    if (formData.dataGarantia && formData.dataAquisicao) {
      const dataAquisicao = new Date(formData.dataAquisicao);
      const dataGarantia = new Date(formData.dataGarantia);

      if (dataGarantia <= dataAquisicao) {
        newErrors.dataGarantia =
          'Data de garantia deve ser posterior à data de aquisição';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let savedPatrimonio: Patrimonio;

      if (patrimonio) {
        // Atualizar patrimônio existente
        const updateData: UpdatePatrimonioRequest = { ...formData };
        savedPatrimonio = await patrimonioService.updatePatrimonio(
          patrimonio.id,
          updateData,
        );
      } else {
        // Criar novo patrimônio
        savedPatrimonio = await patrimonioService.createPatrimonio(formData);
      }

      if (onSave) {
        onSave(savedPatrimonio);
      } else {
        navigate('/patrimonio');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao salvar patrimônio',
      );
      console.error('Erro ao salvar patrimônio:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/patrimonio');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {patrimonio ? 'Editar Patrimônio' : 'Novo Patrimônio'}
              </h1>
              <p className="text-sm text-gray-600">
                {patrimonio
                  ? 'Atualize as informações do patrimônio'
                  : 'Preencha as informações do novo patrimônio'}
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="text-red-400">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Erro</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Informações Básicas
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Código */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Hash className="h-4 w-4 inline mr-1" />
                    Código *
                  </label>
                  <input
                    type="text"
                    value={formData.codigo}
                    onChange={(e) =>
                      handleInputChange('codigo', e.target.value)
                    }
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      errors.codigo ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Ex: PAT-2024-001"
                  />
                  {errors.codigo && (
                    <p className="mt-1 text-sm text-red-600">{errors.codigo}</p>
                  )}
                </div>

                {/* Nome */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Tag className="h-4 w-4 inline mr-1" />
                    Nome *
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      errors.nome ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Ex: Notebook Dell Inspiron 15"
                  />
                  {errors.nome && (
                    <p className="mt-1 text-sm text-red-600">{errors.nome}</p>
                  )}
                </div>

                {/* Categoria */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria *
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) =>
                      handleInputChange(
                        'categoria',
                        e.target.value as PatrimonioCategoria,
                      )
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {CATEGORIA_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange(
                        'status',
                        e.target.value as PatrimonioStatus,
                      )
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Descrição */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FileText className="h-4 w-4 inline mr-1" />
                    Descrição
                  </label>
                  <textarea
                    value={formData.descricao}
                    onChange={(e) =>
                      handleInputChange('descricao', e.target.value)
                    }
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Descrição detalhada do patrimônio..."
                  />
                </div>
              </div>
            </div>

            {/* Informações Financeiras */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Informações Financeiras
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Valor de Aquisição */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <DollarSign className="h-4 w-4 inline mr-1" />
                    Valor de Aquisição *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.valorAquisicao}
                    onChange={(e) =>
                      handleInputChange('valorAquisicao', e.target.value)
                    }
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      errors.valorAquisicao
                        ? 'border-red-300'
                        : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.valorAquisicao && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.valorAquisicao}
                    </p>
                  )}
                </div>

                {/* Data de Aquisição */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Data de Aquisição *
                  </label>
                  <input
                    type="date"
                    value={formData.dataAquisicao}
                    onChange={(e) =>
                      handleInputChange('dataAquisicao', e.target.value)
                    }
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      errors.dataAquisicao
                        ? 'border-red-300'
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.dataAquisicao && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dataAquisicao}
                    </p>
                  )}
                </div>

                {/* Data de Garantia */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Data de Garantia
                  </label>
                  <input
                    type="date"
                    value={formData.dataGarantia}
                    onChange={(e) =>
                      handleInputChange('dataGarantia', e.target.value)
                    }
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      errors.dataGarantia ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.dataGarantia && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dataGarantia}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Informações Técnicas */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Informações Técnicas
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Número de Série */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Série
                  </label>
                  <input
                    type="text"
                    value={formData.numeroSerie}
                    onChange={(e) =>
                      handleInputChange('numeroSerie', e.target.value)
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: ABC123456789"
                  />
                </div>

                {/* Modelo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Modelo
                  </label>
                  <input
                    type="text"
                    value={formData.modelo}
                    onChange={(e) =>
                      handleInputChange('modelo', e.target.value)
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Inspiron 15 3000"
                  />
                </div>

                {/* Marca */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marca
                  </label>
                  <input
                    type="text"
                    value={formData.marca}
                    onChange={(e) => handleInputChange('marca', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Dell"
                  />
                </div>

                {/* Localização */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Localização *
                  </label>
                  <input
                    type="text"
                    value={formData.localizacao}
                    onChange={(e) =>
                      handleInputChange('localizacao', e.target.value)
                    }
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      errors.localizacao ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Ex: Sala 101, Laboratório de Informática"
                  />
                  {errors.localizacao && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.localizacao}
                    </p>
                  )}
                </div>

                {/* Responsável */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="h-4 w-4 inline mr-1" />
                    ID do Responsável
                  </label>
                  <input
                    type="text"
                    value={formData.responsavelId}
                    onChange={(e) =>
                      handleInputChange('responsavelId', e.target.value)
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ID do usuário responsável"
                  />
                </div>

                {/* URL da Foto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Upload className="h-4 w-4 inline mr-1" />
                    URL da Foto
                  </label>
                  <input
                    type="url"
                    value={formData.fotoUrl}
                    onChange={(e) =>
                      handleInputChange('fotoUrl', e.target.value)
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://exemplo.com/foto.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Observações */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Observações
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observações Adicionais
                </label>
                <textarea
                  value={formData.observacoes}
                  onChange={(e) =>
                    handleInputChange('observacoes', e.target.value)
                  }
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Observações, histórico de manutenção, etc..."
                />
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {patrimonio ? 'Atualizar' : 'Salvar'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
