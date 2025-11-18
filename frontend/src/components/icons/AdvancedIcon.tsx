import React from 'react';

export const AdvancedIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.5-1.5M19 19l1.5 1.5M19 5l1.5-1.5M5 19l-1.5 1.5" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="#64748b" strokeWidth="1.2" fill="#f8fafc"/>
  </svg>
);

export default AdvancedIcon;
