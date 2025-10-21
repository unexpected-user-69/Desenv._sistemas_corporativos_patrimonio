// Store Zustand para gerenciamento de estado do dashboard

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { dashboardService } from '../services/dashboardService';
import {
  DashboardStats,
  UserGrowthData,
  PatrimonioGrowthData,
  SystemMetricsData,
  CacheMetricsData,
  RecentActivity,
  DashboardFilters,
  RealtimeMetrics,
  PerformanceMetrics,
  UserActivityMetrics,
  PatrimonioMetrics,
  DashboardInsight,
} from '../types/dashboard';

interface DashboardState {
  // Estado dos dados
  stats: DashboardStats | null;
  userGrowthData: UserGrowthData[];
  patrimonioGrowthData: PatrimonioGrowthData[];
  systemMetrics: SystemMetricsData[];
  cacheMetrics: CacheMetricsData[];
  recentActivity: RecentActivity[];
  realtimeMetrics: RealtimeMetrics | null;
  performanceMetrics: PerformanceMetrics | null;
  userActivityMetrics: UserActivityMetrics | null;
  patrimonioMetrics: PatrimonioMetrics | null;
  insights: DashboardInsight[];

  // Estado de carregamento
  isLoading: boolean;
  isRefreshing: boolean;
  isExporting: boolean;

  // Estado de erro
  error: string | null;

  // Estado de filtros e configurações
  filters: DashboardFilters;
  autoRefresh: boolean;
  refreshInterval: number;
  lastUpdate: string | null;

  // Ações de dados
  fetchDashboardStats: () => Promise<void>;
  fetchUserGrowthData: (period?: string) => Promise<void>;
  fetchPatrimonioGrowthData: (period?: string) => Promise<void>;
  fetchSystemMetrics: (period?: string) => Promise<void>;
  fetchCacheMetrics: (period?: string) => Promise<void>;
  fetchRecentActivity: (limit?: number) => Promise<void>;
  fetchRealtimeMetrics: () => Promise<void>;
  fetchPerformanceMetrics: () => Promise<void>;
  fetchUserActivityMetrics: (period?: string) => Promise<void>;
  fetchPatrimonioMetrics: () => Promise<void>;
  fetchInsights: () => Promise<void>;

  // Ações de atualização
  refreshAll: () => Promise<void>;
  refreshStats: () => Promise<void>;
  refreshMetrics: () => Promise<void>;

  // Ações de filtros
  setFilters: (filters: Partial<DashboardFilters>) => void;
  setAutoRefresh: (enabled: boolean) => void;
  setRefreshInterval: (interval: number) => void;

  // Ações de insights
  markInsightAsRead: (insightId: string) => Promise<void>;
  markAllInsightsAsRead: () => Promise<void>;

  // Ações de exportação
  exportDashboard: (format: string) => Promise<Blob>;

  // Ações de estado
  clearError: () => void;
  reset: () => void;
}

const defaultFilters: DashboardFilters = {
  dateRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0], // 30 dias atrás
    end: new Date().toISOString().split('T')[0], // Hoje
  },
  period: '30d',
  refreshInterval: 30, // 30 segundos
};

const initialState = {
  stats: null,
  userGrowthData: [],
  patrimonioGrowthData: [],
  systemMetrics: [],
  cacheMetrics: [],
  recentActivity: [],
  realtimeMetrics: null,
  performanceMetrics: null,
  userActivityMetrics: null,
  patrimonioMetrics: null,
  insights: [],
  isLoading: false,
  isRefreshing: false,
  isExporting: false,
  error: null,
  filters: defaultFilters,
  autoRefresh: true,
  refreshInterval: 30,
  lastUpdate: null,
};

export const useDashboardStore = create<DashboardState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Ações de dados
      fetchDashboardStats: async () => {
        set({ isLoading: true, error: null });

        try {
          const stats = await dashboardService.getDashboardStats();
          set({
            stats,
            isLoading: false,
            lastUpdate: new Date().toISOString(),
          });
        } catch (error: any) {
          set({
            error: error.message,
            isLoading: false,
          });
        }
      },

      fetchUserGrowthData: async (period = '30d') => {
        try {
          const userGrowthData =
            await dashboardService.getUserGrowthData(period);
          set({ userGrowthData });
        } catch (error: any) {
          set({ error: error.message });
        }
      },

      fetchPatrimonioGrowthData: async (period = '30d') => {
        try {
          const patrimonioGrowthData =
            await dashboardService.getPatrimonioGrowthData(period);
          set({ patrimonioGrowthData });
        } catch (error: any) {
          set({ error: error.message });
        }
      },

      fetchSystemMetrics: async (period = '1h') => {
        try {
          const systemMetrics = await dashboardService.getSystemMetrics(period);
          set({ systemMetrics });
        } catch (error: any) {
          set({ error: error.message });
        }
      },

      fetchCacheMetrics: async (period = '1h') => {
        try {
          const cacheMetrics = await dashboardService.getCacheMetrics(period);
          set({ cacheMetrics });
        } catch (error: any) {
          set({ error: error.message });
        }
      },

      fetchRecentActivity: async (limit = 10) => {
        try {
          const recentActivity =
            await dashboardService.getRecentActivity(limit);
          set({ recentActivity });
        } catch (error: any) {
          set({ error: error.message });
        }
      },

      fetchRealtimeMetrics: async () => {
        try {
          const realtimeMetrics = await dashboardService.getRealtimeMetrics();
          set({ realtimeMetrics });
        } catch (error: any) {
          set({ error: error.message });
        }
      },

      fetchPerformanceMetrics: async () => {
        try {
          const performanceMetrics =
            await dashboardService.getPerformanceMetrics();
          set({ performanceMetrics });
        } catch (error: any) {
          set({ error: error.message });
        }
      },

      fetchUserActivityMetrics: async (period = '7d') => {
        try {
          const userActivityMetrics =
            await dashboardService.getUserActivityMetrics(period);
          set({ userActivityMetrics });
        } catch (error: any) {
          set({ error: error.message });
        }
      },

      fetchPatrimonioMetrics: async () => {
        try {
          const patrimonioMetrics =
            await dashboardService.getPatrimonioMetrics();
          set({ patrimonioMetrics });
        } catch (error: any) {
          set({ error: error.message });
        }
      },

      fetchInsights: async () => {
        try {
          const insights = await dashboardService.getDashboardInsights();
          set({ insights });
        } catch (error: any) {
          set({ error: error.message });
        }
      },

      // Ações de atualização
      refreshAll: async () => {
        set({ isRefreshing: true, error: null });

        try {
          const { filters } = get();
          await Promise.all([
            get().fetchDashboardStats(),
            get().fetchUserGrowthData(filters.period),
            get().fetchPatrimonioGrowthData(filters.period),
            get().fetchSystemMetrics('1h'),
            get().fetchCacheMetrics('1h'),
            get().fetchRecentActivity(),
            get().fetchRealtimeMetrics(),
            get().fetchPerformanceMetrics(),
            get().fetchUserActivityMetrics('7d'),
            get().fetchPatrimonioMetrics(),
            get().fetchInsights(),
          ]);

          set({ isRefreshing: false });
        } catch (error: any) {
          set({
            error: error.message,
            isRefreshing: false,
          });
        }
      },

      refreshStats: async () => {
        set({ isRefreshing: true, error: null });

        try {
          await Promise.all([
            get().fetchDashboardStats(),
            get().fetchRealtimeMetrics(),
            get().fetchPerformanceMetrics(),
          ]);

          set({ isRefreshing: false });
        } catch (error: any) {
          set({
            error: error.message,
            isRefreshing: false,
          });
        }
      },

      refreshMetrics: async () => {
        set({ isRefreshing: true, error: null });

        try {
          await Promise.all([
            get().fetchSystemMetrics('1h'),
            get().fetchCacheMetrics('1h'),
            get().fetchRealtimeMetrics(),
          ]);

          set({ isRefreshing: false });
        } catch (error: any) {
          set({
            error: error.message,
            isRefreshing: false,
          });
        }
      },

      // Ações de filtros
      setFilters: (filters: Partial<DashboardFilters>) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
        }));
      },

      setAutoRefresh: (enabled: boolean) => {
        set({ autoRefresh: enabled });
      },

      setRefreshInterval: (interval: number) => {
        set({ refreshInterval: interval });
      },

      // Ações de insights
      markInsightAsRead: async (insightId: string) => {
        try {
          await dashboardService.markInsightAsRead(insightId);
          set((state) => ({
            insights: state.insights.map((insight) =>
              insight.id === insightId ? { ...insight, isRead: true } : insight,
            ),
          }));
        } catch (error: any) {
          set({ error: error.message });
        }
      },

      markAllInsightsAsRead: async () => {
        try {
          const { insights } = get();
          const unreadInsights = insights.filter((insight) => !insight.isRead);

          await Promise.all(
            unreadInsights.map((insight) =>
              dashboardService.markInsightAsRead(insight.id),
            ),
          );

          set((state) => ({
            insights: state.insights.map((insight) => ({
              ...insight,
              isRead: true,
            })),
          }));
        } catch (error: any) {
          set({ error: error.message });
        }
      },

      // Ações de exportação
      exportDashboard: async (format: string) => {
        set({ isExporting: true, error: null });

        try {
          const { filters } = get();
          const blob = await dashboardService.exportDashboard(format, filters);
          set({ isExporting: false });
          return blob;
        } catch (error: any) {
          set({
            error: error.message,
            isExporting: false,
          });
          throw error;
        }
      },

      // Ações de estado
      clearError: () => {
        set({ error: null });
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'dashboard-store',
    },
  ),
);

// Hooks de conveniência
export const useDashboardStats = () =>
  useDashboardStore((state) => state.stats);
export const useUserGrowthData = () =>
  useDashboardStore((state) => state.userGrowthData);
export const usePatrimonioGrowthData = () =>
  useDashboardStore((state) => state.patrimonioGrowthData);
export const useSystemMetrics = () =>
  useDashboardStore((state) => state.systemMetrics);
export const useCacheMetrics = () =>
  useDashboardStore((state) => state.cacheMetrics);
export const useRecentActivity = () =>
  useDashboardStore((state) => state.recentActivity);
export const useRealtimeMetrics = () =>
  useDashboardStore((state) => state.realtimeMetrics);
export const usePerformanceMetrics = () =>
  useDashboardStore((state) => state.performanceMetrics);
export const useUserActivityMetrics = () =>
  useDashboardStore((state) => state.userActivityMetrics);
export const usePatrimonioMetrics = () =>
  useDashboardStore((state) => state.patrimonioMetrics);
export const useDashboardInsights = () =>
  useDashboardStore((state) => state.insights);
export const useDashboardLoading = () =>
  useDashboardStore((state) => state.isLoading);
export const useDashboardRefreshing = () =>
  useDashboardStore((state) => state.isRefreshing);
export const useDashboardExporting = () =>
  useDashboardStore((state) => state.isExporting);
export const useDashboardError = () =>
  useDashboardStore((state) => state.error);
export const useDashboardFilters = () =>
  useDashboardStore((state) => state.filters);
export const useDashboardAutoRefresh = () =>
  useDashboardStore((state) => state.autoRefresh);
export const useDashboardRefreshInterval = () =>
  useDashboardStore((state) => state.refreshInterval);
export const useDashboardLastUpdate = () =>
  useDashboardStore((state) => state.lastUpdate);
