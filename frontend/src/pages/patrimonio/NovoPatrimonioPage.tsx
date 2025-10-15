import React from 'react';
import { PatrimonioForm } from '../../components/patrimonio/PatrimonioForm';

export const NovoPatrimonioPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <PatrimonioForm />
      </div>
    </div>
  );
};
