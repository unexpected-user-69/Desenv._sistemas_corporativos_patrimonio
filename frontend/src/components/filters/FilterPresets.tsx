import React, { useState } from 'react';
import { useFilterStore } from '../../stores/filterStore';
import { FilterPreset } from '../../types/filters';
import { 
  Bookmark, 
  Plus, 
  Edit, 
  Trash2, 
  Star,
  MoreHorizontal
} from 'lucide-react';

export const FilterPresets: React.FC = () => {
  const {
    presets,
    selectedPreset,
    createPreset,
    updatePreset,
    deletePreset,
    loadPreset,
    saveAsPreset,
    currentFilters
  } = useFilterStore();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [editingPreset, setEditingPreset] = useState<FilterPreset | null>(null);
  const [newPreset, setNewPreset] = useState({ name: '', description: '' });

  const handleCreatePreset = async () => {
    if (newPreset.name.trim()) {
      await createPreset({
        name: newPreset.name,
        description: newPreset.description,
        filters: currentFilters,
        isDefault: false
      });
      setNewPreset({ name: '', description: '' });
      setShowCreateModal(false);
    }
  };

  const handleSaveAsPreset = async () => {
    if (newPreset.name.trim()) {
      await saveAsPreset(newPreset.name, newPreset.description);
      setNewPreset({ name: '', description: '' });
      setShowSaveModal(false);
    }
  };

  const handleLoadPreset = async (preset: FilterPreset) => {
    await loadPreset(preset.id);
  };

  const handleDeletePreset = async (presetId: string) => {
    if (window.confirm('Tem certeza que deseja deletar este preset?')) {
      await deletePreset(presetId);
    }
  };

  const handleEditPreset = (preset: FilterPreset) => {
    setEditingPreset(preset);
    setNewPreset({ name: preset.name, description: preset.description });
    setShowCreateModal(true);
  };

  const handleUpdatePreset = async () => {
    if (editingPreset && newPreset.name.trim()) {
      await updatePreset(editingPreset.id, {
        name: newPreset.name,
        description: newPreset.description
      });
      setEditingPreset(null);
      setNewPreset({ name: '', description: '' });
      setShowCreateModal(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Presets de Filtros</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSaveModal(true)}
            className="btn-secondary flex items-center"
          >
            <Star className="h-4 w-4 mr-2" />
            Salvar Atual
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo
          </button>
        </div>
      </div>

      {presets.length === 0 ? (
        <div className="text-center py-8">
          <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum preset salvo</p>
          <p className="text-sm text-gray-400 mt-1">
            Crie presets para salvar combinações de filtros comuns
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {presets.map((preset) => (
            <div
              key={preset.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedPreset === preset.id
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => handleLoadPreset(preset)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {preset.name}
                    </h4>
                    {preset.isDefault && (
                      <Star className="h-4 w-4 text-yellow-500 ml-2" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {preset.description}
                  </p>
                  <div className="mt-2 flex items-center text-xs text-gray-400">
                    <span>Criado em {new Date(preset.createdAt).toLocaleDateString()}</span>
                    {preset.updatedAt !== preset.createdAt && (
                      <>
                        <span className="mx-2">•</span>
                        <span>Atualizado em {new Date(preset.updatedAt).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditPreset(preset);
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePreset(preset.id);
                    }}
                    className="text-gray-400 hover:text-red-600 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para criar/editar preset */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              {editingPreset ? 'Editar Preset' : 'Criar Novo Preset'}
            </h4>
            <div className="space-y-4">
              <div>
                <label className="label">Nome</label>
                <input
                  type="text"
                  value={newPreset.name}
                  onChange={(e) => setNewPreset({ ...newPreset, name: e.target.value })}
                  className="input"
                  placeholder="Nome do preset"
                />
              </div>
              <div>
                <label className="label">Descrição</label>
                <textarea
                  value={newPreset.description}
                  onChange={(e) => setNewPreset({ ...newPreset, description: e.target.value })}
                  className="input"
                  rows={3}
                  placeholder="Descrição do preset"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingPreset(null);
                  setNewPreset({ name: '', description: '' });
                }}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={editingPreset ? handleUpdatePreset : handleCreatePreset}
                className="btn-primary"
              >
                {editingPreset ? 'Atualizar' : 'Criar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para salvar como preset */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Salvar Filtros Atuais</h4>
            <div className="space-y-4">
              <div>
                <label className="label">Nome</label>
                <input
                  type="text"
                  value={newPreset.name}
                  onChange={(e) => setNewPreset({ ...newPreset, name: e.target.value })}
                  className="input"
                  placeholder="Nome do preset"
                />
              </div>
              <div>
                <label className="label">Descrição</label>
                <textarea
                  value={newPreset.description}
                  onChange={(e) => setNewPreset({ ...newPreset, description: e.target.value })}
                  className="input"
                  rows={3}
                  placeholder="Descrição do preset"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowSaveModal(false);
                  setNewPreset({ name: '', description: '' });
                }}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveAsPreset}
                className="btn-primary"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
