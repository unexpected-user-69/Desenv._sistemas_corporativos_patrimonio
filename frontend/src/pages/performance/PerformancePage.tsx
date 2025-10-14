// Página de testes de performance

import React from 'react';
import { PerformanceTesting } from '../../components/performance/PerformanceTesting';

export const PerformancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PerformanceTesting />
      </div>
    </div>
  );
};
