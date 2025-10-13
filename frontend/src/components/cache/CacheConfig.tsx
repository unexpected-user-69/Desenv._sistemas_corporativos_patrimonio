import React, { useState } from 'react';
import { useCacheStore } from '../../stores/cacheStore';
import { CacheConfig as CacheConfigType } from '../../types/cache';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Database,
  Clock,
  Shield,
  HardDrive
} from 'lucide-react';

interface CacheConfigProps {
  config: CacheConfigType | null;
  isLoading: boolean;
}

export const CacheConfig: React.FC<CacheConfigProps> = ({ config, isLoading }) => {
  const { updateConfig } = useCacheStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedConfig, setEditedConfig] = useState<Partial<CacheConfigType>>({});
  const [saving, setSaving] = useState(false);

  const handleEdit = () => {
    if (config) {
      setEditedConfig({ ...config });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateConfig(editedConfig);
      setIsEditing(false);
      setEditedConfig({});
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedConfig({});
  };

  const handleInputChange = (field: keyof CacheConfigType, value: any) => {
    setEditedConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Configuração do Cache</h3>
        <div className="text-center py-8">
          <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Configuração não disponível</p>
        </div>
      </div>
    );
  }

  const currentConfig = isEditing ? { ...config, ...editedConfig } : config;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Configuração do Cache</h3>
        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="btn-secondary flex items-center"
            >
              <Settings className="h-4 w-4 mr-2" />
              Editar
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="btn-secondary"
                disabled={saving}
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="btn-primary flex items-center"
                disabled={saving}
              >
                {saving ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Salvar
              </button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Configurações de Conexão */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
            <Database className="h-4 w-4 mr-2" />
            Conexão
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Host</label>
              {isEditing ? (
                <input
                  type="text"
                  value={currentConfig.host}
                  onChange={(e) => handleInputChange('host', e.target.value)}
                  className="input"
                />
              ) : (
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{config.host}</p>
              )}
            </div>
            <div>
              <label className="label">Porta</label>
              {isEditing ? (
                <input
                  type="number"
                  value={currentConfig.port}
                  onChange={(e) => handleInputChange('port', parseInt(e.target.value))}
                  className="input"
                />
              ) : (
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{config.port}</p>
              )}
            </div>
            <div>
              <label className="label">Banco de Dados</label>
              {isEditing ? (
                <input
                  type="number"
                  value={currentConfig.db}
                  onChange={(e) => handleInputChange('db', parseInt(e.target.value))}
                  className="input"
                />
              ) : (
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{config.db}</p>
              )}
            </div>
            <div>
              <label className="label">Senha</label>
              {isEditing ? (
                <input
                  type="password"
                  value={currentConfig.password || ''}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="input"
                  placeholder="Deixe vazio para não alterar"
                />
              ) : (
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                  {config.password ? '••••••••' : 'Não definida'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Configurações de Cache */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Cache
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">TTL Padrão (segundos)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={currentConfig.ttl}
                  onChange={(e) => handleInputChange('ttl', parseInt(e.target.value))}
                  className="input"
                />
              ) : (
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{config.ttl}</p>
              )}
            </div>
            <div>
              <label className="label">Memória Máxima</label>
              {isEditing ? (
                <input
                  type="text"
                  value={currentConfig.maxMemory}
                  onChange={(e) => handleInputChange('maxMemory', e.target.value)}
                  className="input"
                  placeholder="ex: 100mb"
                />
              ) : (
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{config.maxMemory}</p>
              )}
            </div>
          </div>
        </div>

        {/* Configurações de Segurança */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Segurança
          </h4>
          <div>
            <label className="label">Política de Evicção</label>
            {isEditing ? (
              <select
                value={currentConfig.evictionPolicy}
                onChange={(e) => handleInputChange('evictionPolicy', e.target.value)}
                className="input"
              >
                <option value="allkeys-lru">allkeys-lru</option>
                <option value="allkeys-lfu">allkeys-lfu</option>
                <option value="volatile-lru">volatile-lru</option>
                <option value="volatile-lfu">volatile-lfu</option>
                <option value="noeviction">noeviction</option>
              </select>
            ) : (
              <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{config.evictionPolicy}</p>
            )}
          </div>
        </div>

        {/* Informações de Memória */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
            <HardDrive className="h-4 w-4 mr-2" />
            Informações de Sistema
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Versão do Redis:</span>
                <span className="ml-2 text-gray-900">6.2.7</span>
              </div>
              <div>
                <span className="text-gray-600">Modo:</span>
                <span className="ml-2 text-gray-900">Standalone</span>
              </div>
              <div>
                <span className="text-gray-600">Arquitetura:</span>
                <span className="ml-2 text-gray-900">x86_64</span>
              </div>
              <div>
                <span className="text-gray-600">Sistema Operacional:</span>
                <span className="ml-2 text-gray-900">Linux</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Aviso sobre mudanças */}
      {isEditing && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Atenção</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Alterações na configuração podem afetar o desempenho e a disponibilidade do cache. 
                Certifique-se de que as mudanças são necessárias antes de salvar.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
