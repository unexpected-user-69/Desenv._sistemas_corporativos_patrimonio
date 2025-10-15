// Componente de badge de notificações

import React from 'react';
import { Bell } from 'lucide-react';
import { useNotificationsStore } from '../../stores/notificationsStore';

interface NotificationBadgeProps {
  onClick?: () => void;
  className?: string;
  showCount?: boolean;
  maxCount?: number;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  onClick,
  className = '',
  showCount = true,
  maxCount = 99,
}) => {
  const { unreadCount } = useNotificationsStore();

  const displayCount =
    unreadCount > maxCount ? `${maxCount}+` : unreadCount.toString();

  return (
    <button
      onClick={onClick}
      className={`relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors ${className}`}
      aria-label={`${unreadCount} notificações não lidas`}
    >
      <Bell className="h-6 w-6" />
      {showCount && unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {displayCount}
        </span>
      )}
    </button>
  );
};
