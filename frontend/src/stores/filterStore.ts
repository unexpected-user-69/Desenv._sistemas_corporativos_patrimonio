import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import {
  AdvancedFilters,
  FilterGroup,
  FilterPreset,
  FilterValidation,
  FilterPerformance,
  FilterSuggestion,
  FilterAnalytics,
} from '../types/filters';
import { filterService } from '../services/filterService';

interface FilterStoreState {
  // Estado dos dados
  filterGroups: FilterGroup[];
  presets: FilterPreset[];
  analytics: FilterAnalytics | null;
  currentFilters: AdvancedFilters;
  appliedFilters: string[];
  totalResults: number;
  performance: FilterPerformance | null;
  suggestions: FilterSuggestion[];
  validation: FilterValidation | null;

  // Estado da UI
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
  searchQuery: string;
  selectedPreset: string | null;

  // Ações de dados
  fetchFilterGroups: () => Promise<void>;
  fetchPresets: () => Promise<void>;
  fetchAnalytics: () => Promise<void>;
  applyFilters: (filters: AdvancedFilters) => Promise<void>;
  validateFilters: (filters: AdvancedFilters) => Promise<void>;
  getSuggestions: (field: string, query: string) => Promise<void>;
  getPerformance: (filters: AdvancedFilters) => Promise<void>;

  // Ações de presets
  createPreset: (
    preset: Omit<FilterPreset, 'id' | 'createdAt' | 'updatedAt'>,
  ) => Promise<void>;
  updatePreset: (id: string, preset: Partial<FilterPreset>) => Promise<void>;
  deletePreset: (id: string) => Promise<void>;
  loadPreset: (id: string) => Promise<void>;
  saveAsPreset: (name: string, description: string) => Promise<void>;

  // Ações de filtros
  setFilter: (key: keyof AdvancedFilters, value: any) => void;
  removeFilter: (key: keyof AdvancedFilters) => void;
  clearFilters: () => void;
  resetFilters: () => void;
  updateFilters: (filters: Partial<AdvancedFilters>) => void;

  // Ações de paginação e ordenação
  setPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  setSorting: (sortBy: string, sortOrder: 'ASC' | 'DESC') => void;

  // Ações de busca
  setSearchQuery: (query: string) => void;
  search: () => Promise<void>;

  // Ações da UI
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Ações de otimização
  optimizeFilters: () => Promise<void>;
  getRecommendations: () => Promise<void>;

  // Ações de exportação
  exportResults: (format: 'csv' | 'json' | 'xlsx') => Promise<Blob>;

  // Ações de monitoramento
  startMonitoring: () => void;
  stopMonitoring: () => void;
  isMonitoring: boolean;
}

const defaultFilters: AdvancedFilters = {
  page: 1,
  limit: 20,
  sortBy: 'createdAt',
  sortOrder: 'DESC',
};

export const useFilterStore = create<FilterStoreState>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // Estado inicial
      filterGroups: [],
      presets: [],
      analytics: null,
      currentFilters: { ...defaultFilters },
      appliedFilters: [],
      totalResults: 0,
      performance: null,
      suggestions: [],
      validation: null,
      isLoading: false,
      error: null,
      currentPage: 1,
      itemsPerPage: 20,
      sortBy: 'createdAt',
      sortOrder: 'DESC',
      searchQuery: '',
      selectedPreset: null,
      isMonitoring: false,

      // Ações de dados
      fetchFilterGroups: async () => {
        set({ isLoading: true, error: null });
        try {
          const filterGroups = await filterService.getFilterOptions();
          set({ filterGroups, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao buscar grupos de filtro',
            isLoading: false,
          });
        }
      },

      fetchPresets: async () => {
        try {
          const presets = await filterService.getFilterPresets();
          set({ presets });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Erro ao buscar presets',
          });
        }
      },

      fetchAnalytics: async () => {
        try {
          const analytics = await filterService.getFilterAnalytics();
          set({ analytics });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao buscar analytics',
          });
        }
      },

      applyFilters: async (filters: AdvancedFilters) => {
        set({ isLoading: true, error: null });
        try {
          const results = await filterService.getAdvancedUsers(filters);
          set({
            currentFilters: filters,
            totalResults: results.total,
            performance: results.performance,
            isLoading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao aplicar filtros',
            isLoading: false,
          });
        }
      },

      validateFilters: async (filters: AdvancedFilters) => {
        try {
          const validation = await filterService.validateFilters(filters);
          set({ validation });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao validar filtros',
          });
        }
      },

      getSuggestions: async (field: string, query: string) => {
        try {
          const suggestions = await filterService.getFilterSuggestions(
            field,
            query,
          );
          set({ suggestions });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao buscar sugestões',
          });
        }
      },

      getPerformance: async (filters: AdvancedFilters) => {
        try {
          const performance = await filterService.getFilterPerformance(filters);
          set({ performance });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao buscar performance',
          });
        }
      },

      // Ações de presets
      createPreset: async (preset) => {
        set({ isLoading: true, error: null });
        try {
          const newPreset = await filterService.createFilterPreset(preset);
          set((state) => ({
            presets: [...state.presets, newPreset],
            isLoading: false,
          }));
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Erro ao criar preset',
            isLoading: false,
          });
        }
      },

      updatePreset: async (id: string, preset: Partial<FilterPreset>) => {
        set({ isLoading: true, error: null });
        try {
          const updatedPreset = await filterService.updateFilterPreset(
            id,
            preset,
          );
          set((state) => ({
            presets: state.presets.map((p) =>
              p.id === id ? updatedPreset : p,
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao atualizar preset',
            isLoading: false,
          });
        }
      },

      deletePreset: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          await filterService.deleteFilterPreset(id);
          set((state) => ({
            presets: state.presets.filter((p) => p.id !== id),
            selectedPreset:
              state.selectedPreset === id ? null : state.selectedPreset,
            isLoading: false,
          }));
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Erro ao deletar preset',
            isLoading: false,
          });
        }
      },

      loadPreset: async (id: string) => {
        const state = get();
        const preset = state.presets.find((p) => p.id === id);
        if (preset) {
          set({
            currentFilters: { ...preset.filters },
            selectedPreset: id,
          });
          await get().applyFilters(preset.filters);
        }
      },

      saveAsPreset: async (name: string, description: string) => {
        const state = get();
        await get().createPreset({
          name,
          description,
          filters: state.currentFilters,
          isDefault: false,
        });
      },

      // Ações de filtros
      setFilter: (key: string, value: unknown) => {
        set((state) => ({
          currentFilters: {
            ...state.currentFilters,
            [key]: value,
          },
        }));
      },

      removeFilter: (key) => {
        set((state) => {
          const newFilters = { ...state.currentFilters };
          delete newFilters[key];
          return { currentFilters: newFilters };
        });
      },

      clearFilters: () => {
        set({
          currentFilters: { ...defaultFilters },
          appliedFilters: [],
          totalResults: 0,
          performance: null,
        });
      },

      resetFilters: () => {
        set({
          currentFilters: { ...defaultFilters },
          appliedFilters: [],
          totalResults: 0,
          performance: null,
          selectedPreset: null,
        });
      },

      updateFilters: (filters) => {
        set((state) => ({
          currentFilters: {
            ...state.currentFilters,
            ...filters,
          },
        }));
      },

      // Ações de paginação e ordenação
      setPage: (page) => {
        set((state) => ({
          currentPage: page,
          currentFilters: {
            ...state.currentFilters,
            page,
          },
        }));
      },

      setItemsPerPage: (items) => {
        set((state) => ({
          itemsPerPage: items,
          currentFilters: {
            ...state.currentFilters,
            limit: items,
            page: 1,
          },
        }));
      },

      setSorting: (sortBy, sortOrder) => {
        set((state) => ({
          sortBy,
          sortOrder,
          currentFilters: {
            ...state.currentFilters,
            sortBy,
            sortOrder,
          },
        }));
      },

      // Ações de busca
      setSearchQuery: (query) => {
        set((state) => ({
          searchQuery: query,
          currentFilters: {
            ...state.currentFilters,
            search: query,
          },
        }));
      },

      search: async () => {
        const state = get();
        await get().applyFilters(state.currentFilters);
      },

      // Ações da UI
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // Ações de otimização
      optimizeFilters: async () => {
        const state = get();
        try {
          const optimized = await filterService.optimizeFilters(
            state.currentFilters,
          );
          set({ currentFilters: optimized });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao otimizar filtros',
          });
        }
      },

      getRecommendations: async () => {
        const state = get();
        try {
          const recommendations = await filterService.getFilterRecommendations(
            state.currentFilters,
          );
          // Aqui você pode implementar a lógica para mostrar as recomendações
          console.log('Recommendations:', recommendations);
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao buscar recomendações',
          });
        }
      },

      // Ações de exportação
      exportResults: async (format) => {
        const state = get();
        try {
          const blob = await filterService.exportFilterResults(
            state.currentFilters,
            format,
          );
          return blob;
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Erro ao exportar resultados',
          });
          throw error;
        }
      },

      // Ações de monitoramento
      startMonitoring: () => {
        const state = get();
        if (state.isMonitoring) return;

        set({ isMonitoring: true });

        // Monitorar analytics
        void filterService.subscribeToFilterStats((analytics) => {
          set({ analytics });
        });
      },

      stopMonitoring: () => {
        set({ isMonitoring: false });
      },
    })),
    {
      name: 'filter-store',
    },
  ),
);
