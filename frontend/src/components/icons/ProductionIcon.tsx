import React from 'react';

export const ProductionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3 3v5a3 3 0 11-6 0V5l3-3z" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="#fff0f0"/>
    <path d="M7 12v6a3 3 0 003 3h4a3 3 0 003-3v-6" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export default ProductionIcon;
