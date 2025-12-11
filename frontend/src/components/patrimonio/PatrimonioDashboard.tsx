import React, { useState, useEffect } from 'react';
import {
  Building2,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Calendar,
  MapPin,
  Tag,
  BarChart3,
} from 'lucide-react';
import {
  PatrimonioStats,
  PatrimonioCategoria,
  PatrimonioStatus,
  getCategoriaLabel,
  getStatusLabel,
  getCategoriaColor,
  getStatusColor,
} from '../../types/patrimonio';
import { patrimonioService } from '../../services/patrimonioService';

export const PatrimonioDashboard: React.FC = () => {
  const [stats, setStats] = useState<PatrimonioStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriaStats, statusStats, valorTotal, vencimentoGarantia] =
        await Promise.all([
          patrimonioService.getPatrimonioStats(),
          patrimonioService.getPatrimonioStatsByStatus(),
          patrimonioService.getValorTotal(),
          patrimonioService.getPatrimoniosVencimentoGarantia(),
        ]);

      setStats({
        total: categoriaStats.total,
        porCategoria: categoriaStats.porCategoria,
        porStatus: statusStats,
        valorTotal: valorTotal.valorTotal,
        valorMedio: valorTotal.valorTotal / categoriaStats.total,
        vencimentoGarantia: vencimentoGarantia,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar estatísticas',
      );
      console.error('Erro ao buscar estatísticas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-red-600">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Erro ao carregar estatísticas
            </h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <button
              onClick={fetchStats}
              className="mt-2 text-sm text-red-600 hover:text-red-500"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard de Patrimônios
          </h1>
          <p className="text-sm text-gray-600">
            Visão geral do patrimônio da instituição
          </p>
        </div>
        <button
          onClick={fetchStats}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Atualizar
        </button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total de Patrimônios */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total de Patrimônios
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.total.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Valor Total */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Valor Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(stats.valorTotal)}
              </p>
            </div>
          </div>
        </div>

        {/* Valor Médio */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Valor Médio</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(stats.valorMedio)}
              </p>
            </div>
          </div>
        </div>

        {/* Garantias Vencendo */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Garantias Vencendo
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.vencimentoGarantia.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos e Estatísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patrimônios por Categoria */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Patrimônios por Categoria
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.porCategoria).map(([categoria, count]) => (
              <div
                key={categoria}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoriaColor(categoria as PatrimonioCategoria)}`}
                  >
                    {getCategoriaLabel(categoria as PatrimonioCategoria)}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">
                    {count}
                  </span>
                  <div className="ml-2 w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patrimônios por Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Patrimônios por Status
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.porStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status as PatrimonioStatus)}`}
                  >
                    {getStatusLabel(status as PatrimonioStatus)}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">
                    {count}
                  </span>
                  <div className="ml-2 w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patrimônios com Garantia Vencendo */}
      {stats.vencimentoGarantia.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              Patrimônios com Garantia Vencendo
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {stats.vencimentoGarantia.map((patrimonio) => (
              <div key={patrimonio.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <Tag className="h-5 w-5 text-red-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {patrimonio.codigo} - {patrimonio.nome}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {patrimonio.localizacao}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Garantia: {formatDate(patrimonio.dataGarantia!)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoriaColor(patrimonio.categoria)}`}
                  >
                    {getCategoriaLabel(patrimonio.categoria)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
