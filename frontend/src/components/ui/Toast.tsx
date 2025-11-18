import React from 'react';

export type ToastItem = {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'error';
};

type Props = {
  items: ToastItem[];
  onRemove: (id: string) => void;
};

export const Toast: React.FC<Props> = ({ items, onRemove }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {items.map((it) => {
        const base =
          it.type === 'success'
            ? 'bg-green-600 text-white'
            : it.type === 'error'
            ? 'bg-red-600 text-white'
            : 'bg-slate-900 text-white';
        return (
          <div
            key={it.id}
            className={`${base} px-4 py-2 rounded shadow-md flex items-center gap-3 max-w-sm`}
          >
            <div className="flex-1 text-sm">{it.message}</div>
            <button
              onClick={() => onRemove(it.id)}
              className="text-white/80 hover:text-white"
              aria-label="Fechar"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
