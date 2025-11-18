import React from 'react';

export const TestingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 2l6 6M9 22l6-6" stroke="#6366f1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3" y="8" width="18" height="8" rx="2" stroke="#6366f1" strokeWidth="1.2" fill="#eef2ff"/>
  </svg>
);

export default TestingIcon;
