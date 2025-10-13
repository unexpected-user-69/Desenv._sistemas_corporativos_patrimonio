import React, { useState } from 'react';
import { useCacheStore } from '../../stores/cacheStore';
import { 
  Search, 
  Key, 
  Database, 
  Trash2, 
  Plus,
  Download
} from 'lucide-react';

export const CacheKeys: React.FC = () => {
  const {
    keys,
    searchQuery,
    searchPattern,
    selectedKeys,
    isLoading,
    setSearchQuery,
    setSearchPattern,
    setSelectedKeys,
    searchKeys,
    deleteKeys,
    clearSelection
  } = useCacheStore();

  const [showAddKey, setShowAddKey] = useState(false);
  const [newKey, setNewKey] = useState({ key: '', value: '', ttl: 3600 });

  const handleSearch = () => {
    searchKeys(searchQuery, searchPattern);
  };

  const handleKeySelect = (key: string) => {
    setSelectedKeys(
      selectedKeys.includes(key)
        ? selectedKeys.filter(k => k !== key)
        : [...selectedKeys, key]
    );
  };

  const handleSelectAll = () => {
    if (selectedKeys.length === keys.length) {
      clearSelection();
    } else {
      setSelectedKeys(keys.map(k => k.key));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedKeys.length > 0) {
      await deleteKeys(selectedKeys);
    }
  };

  const handleAddKey = async () => {
    if (newKey.key && newKey.value) {
      // Implementar adição de chave
      setShowAddKey(false);
      setNewKey({ key: '', value: '', ttl: 3600 });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'string':
        return <Database className="h-4 w-4 text-blue-500" />;
      case 'hash':
        return <Key className="h-4 w-4 text-green-500" />;
      case 'list':
        return <Database className="h-4 w-4 text-purple-500" />;
      case 'set':
        return <Database className="h-4 w-4 text-orange-500" />;
      case 'zset':
        return <Database className="h-4 w-4 text-red-500" />;
      default:
        return <Database className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTtl = (ttl: number) => {
    if (ttl === -1) return 'Permanente';
    if (ttl < 60) return `${ttl}s`;
    if (ttl < 3600) return `${Math.floor(ttl / 60)}m`;
    return `${Math.floor(ttl / 3600)}h`;
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Chaves do Cache</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddKey(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </button>
          <button className="btn-secondary flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </button>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar chaves..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <div className="w-48">
            <input
              type="text"
              placeholder="Padrão (ex: user:*"
              value={searchPattern}
              onChange={(e) => setSearchPattern(e.target.value)}
              className="input"
            />
          </div>
          <button
            onClick={handleSearch}
            className="btn-primary flex items-center"
          >
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </button>
        </div>

        {/* Ações em lote */}
        {selectedKeys.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="text-sm text-blue-800">
              {selectedKeys.length} chave(s) selecionada(s)
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDeleteSelected}
                className="btn-secondary text-red-600 border-red-300 hover:bg-red-50 flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Deletar Selecionadas
              </button>
              <button
                onClick={clearSelection}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal para adicionar chave */}
      {showAddKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Adicionar Nova Chave</h4>
            <div className="space-y-4">
              <div>
                <label className="label">Chave</label>
                <input
                  type="text"
                  value={newKey.key}
                  onChange={(e) => setNewKey({ ...newKey, key: e.target.value })}
                  className="input"
                  placeholder="ex: user:123"
                />
              </div>
              <div>
                <label className="label">Valor</label>
                <textarea
                  value={newKey.value}
                  onChange={(e) => setNewKey({ ...newKey, value: e.target.value })}
                  className="input"
                  rows={3}
                  placeholder="Valor da chave"
                />
              </div>
              <div>
                <label className="label">TTL (segundos)</label>
                <input
                  type="number"
                  value={newKey.ttl}
                  onChange={(e) => setNewKey({ ...newKey, ttl: parseInt(e.target.value) })}
                  className="input"
                  min="1"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddKey(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddKey}
                className="btn-primary"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de chaves */}
      <div className="overflow-hidden">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        ) : keys.length === 0 ? (
          <div className="text-center py-8">
            <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma chave encontrada</p>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Header */}
            <div className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="w-8">
                <input
                  type="checkbox"
                  checked={selectedKeys.length === keys.length && keys.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300"
                />
              </div>
              <div className="flex-1 text-sm font-medium text-gray-700">Chave</div>
              <div className="w-20 text-sm font-medium text-gray-700">Tipo</div>
              <div className="w-20 text-sm font-medium text-gray-700">Tamanho</div>
              <div className="w-24 text-sm font-medium text-gray-700">TTL</div>
              <div className="w-32 text-sm font-medium text-gray-700">Último Acesso</div>
            </div>

            {/* Chaves */}
            {keys.map((key) => (
              <div
                key={key.key}
                className={`flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 ${
                  selectedKeys.includes(key.key) ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="w-8">
                  <input
                    type="checkbox"
                    checked={selectedKeys.includes(key.key)}
                    onChange={() => handleKeySelect(key.key)}
                    className="rounded border-gray-300"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    {getTypeIcon(key.type)}
                    <span className="ml-2 text-sm font-medium text-gray-900 truncate">
                      {key.key}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {key.value.length > 100 ? `${key.value.substring(0, 100)}...` : key.value}
                  </p>
                </div>
                <div className="w-20 text-sm text-gray-600">
                  {key.type.toUpperCase()}
                </div>
                <div className="w-20 text-sm text-gray-600">
                  {formatSize(key.size)}
                </div>
                <div className="w-24 text-sm text-gray-600">
                  {formatTtl(key.ttl)}
                </div>
                <div className="w-32 text-sm text-gray-600">
                  {new Date(key.lastAccessed).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
