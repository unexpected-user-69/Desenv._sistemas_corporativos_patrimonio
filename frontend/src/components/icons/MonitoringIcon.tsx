import React from 'react';

export const MonitoringIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#0ea5e9" strokeWidth="1.4" fill="none" />
    <path d="M8 13l2-3 2 4 4-6" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export default MonitoringIcon;
