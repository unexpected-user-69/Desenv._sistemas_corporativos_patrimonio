// Hook para ações de notificações
// IA_DesenvolvedorFrontend (IA 3) - Correção de erros de compilação

import { useCallback } from 'react';
import { useNotificationsStore } from '../stores/notificationsStore';

export const useNotificationActions = () => {
  const {
    markAsRead: storeMarkAsRead,
    markAllAsRead: storeMarkAllAsRead,
    archiveNotification: storeArchiveNotification,
    deleteNotification: storeDeleteNotification,
    dismissNotification: storeDismissNotification,
    executeAction: storeExecuteAction,
    batchOperation: storeBatchOperation,
    clearError: storeClearError,
  } = useNotificationsStore();

  const markAsRead = useCallback(
    async (id: string) => {
      try {
        await storeMarkAsRead(id);
      } catch (error) {
        console.error('Erro ao marcar notificação como lida:', error);
        throw error;
      }
    },
    [storeMarkAsRead],
  );

  const markAllAsRead = useCallback(async () => {
    try {
      await storeMarkAllAsRead();
    } catch (error) {
      console.error('Erro ao marcar todas as notificações como lidas:', error);
      throw error;
    }
  }, [storeMarkAllAsRead]);

  const archiveNotification = useCallback(
    async (id: string) => {
      try {
        await storeArchiveNotification(id);
      } catch (error) {
        console.error('Erro ao arquivar notificação:', error);
        throw error;
      }
    },
    [storeArchiveNotification],
  );

  const deleteNotification = useCallback(
    async (id: string) => {
      try {
        await storeDeleteNotification(id);
      } catch (error) {
        console.error('Erro ao deletar notificação:', error);
        throw error;
      }
    },
    [storeDeleteNotification],
  );

  const dismissNotification = useCallback(
    async (id: string) => {
      try {
        await storeDismissNotification(id);
      } catch (error) {
        console.error('Erro ao dispensar notificação:', error);
        throw error;
      }
    },
    [storeDismissNotification],
  );

  const executeAction = useCallback(
    async (notificationId: string, actionId: string) => {
      try {
        await storeExecuteAction(notificationId, actionId);
      } catch (error) {
        console.error('Erro ao executar ação da notificação:', error);
        throw error;
      }
    },
    [storeExecuteAction],
  );

  const batchOperation = useCallback(
    async (
      operation: 'read' | 'archive' | 'delete' | 'dismiss',
      notificationIds: string[],
    ) => {
      try {
        await storeBatchOperation(operation, notificationIds);
      } catch (error) {
        console.error('Erro na operação em lote:', error);
        throw error;
      }
    },
    [storeBatchOperation],
  );

  const clearError = useCallback(() => {
    storeClearError();
  }, [storeClearError]);

  return {
    markAsRead,
    markAllAsRead,
    archiveNotification,
    deleteNotification,
    dismissNotification,
    executeAction,
    batchOperation,
    clearError,
  };
};
