// Store Zustand para gerenciamento de estado do cache Redis

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import {
  CacheStats,
  CacheKey,
  CacheConfig,
  CacheOperation,
  CacheMetrics,
  CacheAlert,
  CacheHealth,
  CachePattern,
  CacheFlushOptions,
  CacheSearchOptions,
  CacheSearchResult,
} from '../types/cache';
import { cacheService } from '../services/cacheService';

interface CacheState {
  // Estado dos dados
  stats: CacheStats | null;
  keys: CacheKey[];
  config: CacheConfig | null;
  operations: CacheOperation[];
  metrics: CacheMetrics | null;
  alerts: CacheAlert[];
  health: CacheHealth | null;
  patterns: CachePattern[];
  searchResult: CacheSearchResult | null;

  // Estado de carregamento
  isLoading: boolean;
  error: string | null;

  // Estado de busca e filtros
  searchQuery: string;
  searchPattern: string;
  selectedKeys: string[];

  // Ações para buscar dados
  fetchStats: () => Promise<void>;
  fetchKeys: (pattern?: string, limit?: number) => Promise<void>;
  fetchConfig: () => Promise<void>;
  fetchOperations: (limit?: number) => Promise<void>;
  fetchMetrics: () => Promise<void>;
  fetchAlerts: () => Promise<void>;
  fetchHealth: () => Promise<void>;
  fetchPatterns: () => Promise<void>;

  // Ações para gerenciar chaves
  getKey: (key: string) => Promise<any>;
  setKey: (key: string, value: any, ttl?: number) => Promise<void>;
  deleteKey: (key: string) => Promise<void>;
  deleteKeys: (keys: string[]) => Promise<void>;

  // Ações para configuração
  updateConfig: (config: Partial<CacheConfig>) => Promise<void>;

  // Ações para operações
  flushCache: (options?: CacheFlushOptions) => Promise<void>;
  resolveAlert: (alertId: string) => Promise<void>;

  // Ações para busca
  searchKeys: (options: CacheSearchOptions) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSearchPattern: (pattern: string) => void;
  setSelectedKeys: (keys: string[]) => void;
  clearSelection: () => void;

  // Ações para adicionar dados (para simulação)
  addKey: (key: CacheKey) => void;
  addOperation: (operation: CacheOperation) => void;
  addAlert: (alert: CacheAlert) => void;
  clearOperations: () => void;
  clearAlerts: () => void;

  // Ações para definir dados diretamente (para testes)
  setCacheStats: (stats: CacheStats) => void;
  setCacheHealth: (health: CacheHealth) => void;
  setCacheKeys: (keys: CacheKey[]) => void;
  setCacheOperations: (operations: CacheOperation[]) => void;
  setCacheAlerts: (alerts: CacheAlert[]) => void;
  setCachePatterns: (patterns: CachePattern[]) => void;
  setCacheMetrics: (metrics: CacheMetrics) => void;
  setCacheFlushOptions: (options: CacheFlushOptions) => void;
  setCacheSearchOptions: (options: CacheSearchOptions) => void;
  setCacheSearchResult: (result: CacheSearchResult) => void;
}

export const useCacheStore = create<CacheState>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // Estado inicial
      stats: null,
      keys: [],
      config: null,
      operations: [],
      metrics: null,
      alerts: [],
      health: null,
      patterns: [],
      searchResult: null,
      isLoading: false,
      error: null,
      searchQuery: '',
      searchPattern: '*',
      selectedKeys: [],

      // Ações para buscar dados
      fetchStats: async () => {
        set({ isLoading: true, error: null });
        try {
          const stats = await cacheService.getStats();
          set({ stats, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao buscar estatísticas',
            isLoading: false,
          });
        }
      },

      fetchKeys: async (pattern = '*', limit = 100) => {
        set({ isLoading: true, error: null });
        try {
          const keys = await cacheService.getKeys(pattern, limit);
          set({ keys, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Erro ao buscar chaves',
            isLoading: false,
          });
        }
      },

      fetchConfig: async () => {
        set({ isLoading: true, error: null });
        try {
          const config = await cacheService.getConfig();
          set({ config, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao buscar configuração',
            isLoading: false,
          });
        }
      },

      fetchOperations: async (limit = 50) => {
        set({ isLoading: true, error: null });
        try {
          const operations = await cacheService.getOperations(limit);
          set({ operations, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao buscar operações',
            isLoading: false,
          });
        }
      },

      fetchMetrics: async () => {
        set({ isLoading: true, error: null });
        try {
          const metrics = await cacheService.getMetrics();
          set({ metrics, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao buscar métricas',
            isLoading: false,
          });
        }
      },

      fetchAlerts: async () => {
        set({ isLoading: true, error: null });
        try {
          const alerts = await cacheService.getAlerts();
          set({ alerts, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Erro ao buscar alertas',
            isLoading: false,
          });
        }
      },

      fetchHealth: async () => {
        set({ isLoading: true, error: null });
        try {
          const health = await cacheService.getHealth();
          set({ health, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao buscar saúde do cache',
            isLoading: false,
          });
        }
      },

      fetchPatterns: async () => {
        set({ isLoading: true, error: null });
        try {
          const patterns = await cacheService.getPatterns();
          set({ patterns, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Erro ao buscar padrões',
            isLoading: false,
          });
        }
      },

      // Ações para gerenciar chaves
      getKey: async (key: string): Promise<unknown> => {
        try {
          return (await cacheService.getKey(key)) as unknown;
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Erro ao buscar chave',
          });
          throw error;
        }
      },

      setKey: async (key: string, value: any, ttl?: number) => {
        try {
          await cacheService.setKey(key, value, ttl);
          // Atualizar lista de chaves
          void get().fetchKeys();
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Erro ao definir chave',
          });
          throw error;
        }
      },

      deleteKey: async (key: string) => {
        try {
          await cacheService.deleteKey(key);
          // Atualizar lista de chaves
          void get().fetchKeys();
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Erro ao deletar chave',
          });
          throw error;
        }
      },

      deleteKeys: async (keys: string[]) => {
        try {
          await Promise.all(keys.map((key) => cacheService.deleteKey(key)));
          // Atualizar lista de chaves
          void get().fetchKeys();
          set({ selectedKeys: [] });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Erro ao deletar chaves',
          });
          throw error;
        }
      },

      // Ações para configuração
      updateConfig: async (config: Partial<CacheConfig>) => {
        try {
          const updatedConfig = await cacheService.updateConfig(config);
          set({ config: updatedConfig });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao atualizar configuração',
          });
          throw error;
        }
      },

      // Ações para operações
      flushCache: async (options?: CacheFlushOptions) => {
        try {
          await cacheService.flushCache(options);
          // Atualizar dados após limpeza
          void get().fetchStats();
          void get().fetchKeys();
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Erro ao limpar cache',
          });
          throw error;
        }
      },

      resolveAlert: async (alertId: string) => {
        try {
          await cacheService.resolveAlert(alertId);
          // Atualizar lista de alertas
          void get().fetchAlerts();
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao resolver alerta',
          });
          throw error;
        }
      },

      // Ações para busca
      searchKeys: async (options: CacheSearchOptions) => {
        set({ isLoading: true, error: null });
        try {
          const result = await cacheService.searchKeys(options);
          set({ searchResult: result, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Erro ao buscar chaves',
            isLoading: false,
          });
        }
      },

      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setSearchPattern: (pattern: string) => set({ searchPattern: pattern }),
      setSelectedKeys: (keys: string[]) => set({ selectedKeys: keys }),
      clearSelection: () => set({ selectedKeys: [] }),

      // Ações para adicionar dados (para simulação)
      addKey: (key: CacheKey) =>
        set((state) => ({ keys: [key, ...state.keys] })),
      addOperation: (operation: CacheOperation) =>
        set((state) => ({
          operations: [operation, ...state.operations.slice(0, 49)],
        })),
      addAlert: (alert: CacheAlert) =>
        set((state) => ({ alerts: [alert, ...state.alerts] })),
      clearOperations: () => set({ operations: [] }),
      clearAlerts: () => set({ alerts: [] }),

      // Ações para definir dados diretamente (para testes)
      setCacheStats: (stats: CacheStats) => set({ stats }),
      setCacheHealth: (health: CacheHealth) => set({ health }),
      setCacheKeys: (keys: CacheKey[]) => set({ keys }),
      setCacheOperations: (operations: CacheOperation[]) => set({ operations }),
      setCacheAlerts: (alerts: CacheAlert[]) => set({ alerts }),
      setCachePatterns: (patterns: CachePattern[]) => set({ patterns }),
      setCacheMetrics: (metrics: CacheMetrics) => set({ metrics }),
      setCacheFlushOptions: () => set({}),
      setCacheSearchOptions: () => set({}),
      setCacheSearchResult: (result: CacheSearchResult) =>
        set({ searchResult: result }),
    })),
    {
      name: 'cache-store',
    },
  ),
);
