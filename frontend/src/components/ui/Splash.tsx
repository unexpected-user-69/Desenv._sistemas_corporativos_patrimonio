import React from 'react';

export const Splash: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  React.useEffect(() => {
    const t = setTimeout(() => {
      onFinish && onFinish();
    }, 1400);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div className="splash-overlay">
      <div className="splash-card">
        <div className="splash-float">
          <svg width="76" height="76" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <rect width="24" height="24" rx="6" fill="url(#g)" />
            <path d="M6 15V9a2 2 0 012-2h8a2 2 0 012 2v6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 11h8" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Patrimônio Inventário</h1>
          <p className="text-sm text-slate-600">Monitoramento • Performance • Cache</p>
        </div>
      </div>
    </div>
  );
};

export default Splash;
