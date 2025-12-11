// Hook para filtros de notificações
// IA_DesenvolvedorFrontend (IA 3) - Correção de erros de compilação

import { useCallback } from 'react';
import { useNotificationsStore } from '../stores/notificationsStore';
import { NotificationFilters } from '../types/notifications';

export const useNotificationFilters = () => {
  const {
    filters,
    setFilters,
    clearFilters,
    search,
    pagination,
    setPage,
    nextPage,
    prevPage,
  } = useNotificationsStore();

  const updateFilters = useCallback(
    (newFilters: Partial<NotificationFilters>) => {
      setFilters({ ...filters, ...newFilters });
    },
    [filters, setFilters],
  );

  const resetFilters = useCallback(() => {
    clearFilters();
  }, [clearFilters]);

  const performSearch = useCallback(
    (term: string) => {
      search(term);
    },
    [search],
  );

  const goToPage = useCallback(
    (page: number) => {
      setPage(page);
    },
    [setPage],
  );

  const goToNextPage = useCallback(() => {
    nextPage();
  }, [nextPage]);

  const goToPrevPage = useCallback(() => {
    prevPage();
  }, [prevPage]);

  return {
    filters,
    setFilters: updateFilters,
    clearFilters: resetFilters,
    search: performSearch,
    pagination,
    setPage: goToPage,
    nextPage: goToNextPage,
    prevPage: goToPrevPage,
  };
};
