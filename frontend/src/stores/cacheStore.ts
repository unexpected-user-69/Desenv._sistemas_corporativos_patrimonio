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
  CacheSearchResult
} from '../types/cache';
import { cacheService } from '../services/cacheService';

interface CacheState {
  // Estado dos dados
  stats: CacheStats | null;
  metrics: CacheMetrics | null;
  health: CacheHealth | null;
  config: CacheConfig | null;
  keys: CacheKey[];
  operations: CacheOperation[];
  alerts: CacheAlert[];
  patterns: CachePattern[];
  searchResults: CacheSearchResult | null;

  // Estado da UI
  isLoading: boolean;
  error: string | null;
  selectedKeys: string[];
  searchQuery: string;
  searchPattern: string;
  currentPage: number;
  itemsPerPage: number;

  // Ações de dados
  fetchStats: () => Promise<void>;
  fetchMetrics: () => Promise<void>;
  fetchHealth: () => Promise<void>;
  fetchConfig: () => Promise<void>;
  fetchKeys: (pattern?: string, limit?: number) => Promise<void>;
  fetchOperations: (limit?: number) => Promise<void>;
  fetchAlerts: () => Promise<void>;
  fetchPatterns: () => Promise<void>;
  searchKeys: (query: string, pattern?: string) => Promise<void>;

  // Ações de chaves
  getKey: (key: string) => Promise<CacheKey | null>;
  setKey: (key: string, value: string, ttl?: number) => Promise<void>;
  deleteKey: (key: string) => Promise<void>;
  deleteKeys: (keys: string[]) => Promise<void>;
  flushCache: (options?: any) => Promise<void>;

  // Ações de configuração
  updateConfig: (config: Partial<CacheConfig>) => Promise<void>;

  // Ações de alertas
  resolveAlert: (alertId: string) => Promise<void>;

  // Ações da UI
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedKeys: (keys: string[]) => void;
  setSearchQuery: (query: string) => void;
  setSearchPattern: (pattern: string) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  clearError: () => void;
  clearSelection: () => void;

  // Ações de monitoramento
  startMonitoring: () => void;
  stopMonitoring: () => void;
  isMonitoring: boolean;
}

export const useCacheStore = create<CacheState>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // Estado inicial
      stats: null,
      metrics: null,
      health: null,
      config: null,
      keys: [],
      operations: [],
      alerts: [],
      patterns: [],
      searchResults: null,
      isLoading: false,
      error: null,
      selectedKeys: [],
      searchQuery: '',
      searchPattern: '*',
      currentPage: 1,
      itemsPerPage: 20,
      isMonitoring: false,

      // Ações de dados
      fetchStats: async () => {
        set({ isLoading: true, error: null });
        try {
          const stats = await cacheService.getStats();
          set({ stats, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao buscar estatísticas',
            isLoading: false 
          });
        }
      },

      fetchMetrics: async () => {
        try {
          const metrics = await cacheService.getMetrics();
          set({ metrics });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao buscar métricas'
          });
        }
      },

      fetchHealth: async () => {
        try {
          const health = await cacheService.getHealth();
          set({ health });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao buscar saúde do cache'
          });
        }
      },

      fetchConfig: async () => {
        try {
          const config = await cacheService.getConfig();
          set({ config });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao buscar configuração'
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
            error: error instanceof Error ? error.message : 'Erro ao buscar chaves',
            isLoading: false 
          });
        }
      },

      fetchOperations: async (limit = 50) => {
        try {
          const operations = await cacheService.getOperations(limit);
          set({ operations });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao buscar operações'
          });
        }
      },

      fetchAlerts: async () => {
        try {
          const alerts = await cacheService.getAlerts();
          set({ alerts });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao buscar alertas'
          });
        }
      },

      fetchPatterns: async () => {
        try {
          const patterns = await cacheService.getPatterns();
          set({ patterns });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao buscar padrões'
          });
        }
      },

      searchKeys: async (query: string, pattern = '*') => {
        set({ isLoading: true, error: null });
        try {
          const results = await cacheService.searchKeys({
            pattern: pattern,
            limit: get().itemsPerPage,
            offset: (get().currentPage - 1) * get().itemsPerPage,
            includeValues: true,
            includeTtl: true
          });
          set({ searchResults: results, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao buscar chaves',
            isLoading: false 
          });
        }
      },

      // Ações de chaves
      getKey: async (key: string) => {
        try {
          const keyData = await cacheService.getKey(key);
          return keyData;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao buscar chave'
          });
          return null;
        }
      },

      setKey: async (key: string, value: string, ttl?: number) => {
        set({ isLoading: true, error: null });
        try {
          await cacheService.setKey(key, value, ttl);
          // Recarregar as chaves após adicionar uma nova
          await get().fetchKeys(get().searchPattern);
          set({ isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao definir chave',
            isLoading: false 
          });
        }
      },

      deleteKey: async (key: string) => {
        set({ isLoading: true, error: null });
        try {
          await cacheService.deleteKey(key);
          // Remover a chave da lista local
          set(state => ({
            keys: state.keys.filter(k => k.key !== key),
            selectedKeys: state.selectedKeys.filter(k => k !== key),
            isLoading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao deletar chave',
            isLoading: false 
          });
        }
      },

      deleteKeys: async (keys: string[]) => {
        set({ isLoading: true, error: null });
        try {
          await cacheService.deleteKeys(keys);
          // Remover as chaves da lista local
          set(state => ({
            keys: state.keys.filter(k => !keys.includes(k.key)),
            selectedKeys: [],
            isLoading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao deletar chaves',
            isLoading: false 
          });
        }
      },

      flushCache: async (options = { confirm: true }) => {
        set({ isLoading: true, error: null });
        try {
          await cacheService.flushCache(options);
          // Limpar todas as chaves locais
          set({ 
            keys: [],
            selectedKeys: [],
            searchResults: null,
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao limpar cache',
            isLoading: false 
          });
        }
      },

      // Ações de configuração
      updateConfig: async (config: Partial<CacheConfig>) => {
        set({ isLoading: true, error: null });
        try {
          const updatedConfig = await cacheService.updateConfig(config);
          set({ config: updatedConfig, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao atualizar configuração',
            isLoading: false 
          });
        }
      },

      // Ações de alertas
      resolveAlert: async (alertId: string) => {
        try {
          await cacheService.resolveAlert(alertId);
          // Remover o alerta da lista local
          set(state => ({
            alerts: state.alerts.filter(a => a.id !== alertId)
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao resolver alerta'
          });
        }
      },

      // Ações da UI
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
      setSelectedKeys: (keys: string[]) => set({ selectedKeys: keys }),
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setSearchPattern: (pattern: string) => set({ searchPattern: pattern }),
      setCurrentPage: (page: number) => set({ currentPage: page }),
      setItemsPerPage: (items: number) => set({ itemsPerPage: items }),
      clearError: () => set({ error: null }),
      clearSelection: () => set({ selectedKeys: [] }),

      // Ações de monitoramento
      startMonitoring: () => {
        const state = get();
        if (state.isMonitoring) return;

        set({ isMonitoring: true });

        // Monitorar estatísticas
        cacheService.subscribeToStats((stats) => {
          set({ stats });
        });

        // Monitorar operações
        cacheService.subscribeToOperations((operation) => {
          set(state => ({
            operations: [operation, ...state.operations.slice(0, 49)]
          }));
        });
      },

      stopMonitoring: () => {
        set({ isMonitoring: false });
        // Aqui você pode adicionar lógica para parar as subscrições
      },
    })),
    {
      name: 'cache-store',
    }
  )
);
