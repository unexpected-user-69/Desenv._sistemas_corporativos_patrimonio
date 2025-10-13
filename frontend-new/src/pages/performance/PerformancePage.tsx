// Página de testes de performance (M3)

import React from 'react';
import { PerformanceDashboard } from '../../components/performance/PerformanceDashboard';

export const PerformancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PerformanceDashboard />
      </div>
    </div>
  );
};
