import React from 'react';

export const CacheIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="5" rx="8" ry="3" fill="url(#g)"/>
    <path d="M4 5v6c0 1.656 3.582 3 8 3s8-1.344 8-3V5" stroke="#0ea5e9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
  </svg>
);

export default CacheIcon;
