// Página principal de utilitários de teste

import React from 'react';
import { TestingDashboard } from '../../components/testing/TestingDashboard';

export const TestingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TestingDashboard />
      </div>
    </div>
  );
};
