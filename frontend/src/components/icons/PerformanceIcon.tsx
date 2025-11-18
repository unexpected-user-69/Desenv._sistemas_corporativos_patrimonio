import React from 'react';

export const PerformanceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2v6" stroke="#fb923c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 8c2 4 6 6 7 6s5-2 7-6" stroke="#fb923c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default PerformanceIcon;
