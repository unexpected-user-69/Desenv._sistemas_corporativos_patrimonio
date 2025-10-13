// Página de monitoramento

import React from 'react';
import { MonitoringDashboard } from '../../components/monitoring/MonitoringDashboard';

export const MonitoringPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MonitoringDashboard />
      </div>
    </div>
  );
};
