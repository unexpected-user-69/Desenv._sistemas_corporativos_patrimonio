import React from 'react';

export const AnalyticsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="10" width="3" height="8" rx="1" fill="#a78bfa" />
    <rect x="9" y="6" width="3" height="12" rx="1" fill="#c084fc" />
    <rect x="15" y="3" width="3" height="15" rx="1" fill="#7c3aed" />
  </svg>
);

export default AnalyticsIcon;
