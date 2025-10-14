// Página principal de funcionalidades avançadas de produção

import React from 'react';
import { ProductionDashboard } from '../../components/security/ProductionDashboard';

export const ProductionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductionDashboard />
      </div>
    </div>
  );
};
