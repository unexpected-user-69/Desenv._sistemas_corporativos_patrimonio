import React, { useState } from 'react';
import { PatrimonioList } from '../../components/patrimonio/PatrimonioList';
import { PatrimonioForm } from '../../components/patrimonio/PatrimonioForm';
import { Patrimonio } from '../../types/patrimonio';
import { patrimonioService } from '../../services/patrimonioService';

export const PatrimonioPage: React.FC = () => {
  const [editingPatrimonio, setEditingPatrimonio] = useState<Patrimonio | null>(
    null,
  );
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (patrimonio: Patrimonio) => {
    setEditingPatrimonio(patrimonio);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este patrimônio?')) {
      try {
        await patrimonioService.deletePatrimonio(id);
        // A lista será atualizada automaticamente
      } catch (error) {
        console.error('Erro ao excluir patrimônio:', error);
        alert('Erro ao excluir patrimônio. Tente novamente.');
      }
    }
  };

  const handleView = (patrimonio: Patrimonio) => {
    // Implementar visualização detalhada
    console.log('Visualizar patrimônio:', patrimonio);
  };

  const handleSave = (patrimonio: Patrimonio) => {
    setShowForm(false);
    setEditingPatrimonio(null);
    // A lista será atualizada automaticamente
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPatrimonio(null);
  };

  if (showForm) {
    return (
      <PatrimonioForm
        patrimonio={editingPatrimonio || undefined}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <PatrimonioList
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </div>
    </div>
  );
};
