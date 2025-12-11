// Store Zustand para gerenciamento de relatórios

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { reportsService } from '../services/reportsService';
import {
  Report,
  ReportConfig,
  ReportFormat,
  ReportSearchOptions,
  ReportSchedule,
} from '../types/reports';

interface ReportsState {
  reports: Report[];
  schedules: ReportSchedule[];
  selectedReport: Report | null;
  isLoading: boolean;
  error: string | null;
  filters: ReportSearchOptions;
  pagination: {
    page: number;
    limit: number;
    total: number;
    lastPage: number;
  };
}

interface ReportsActions {
  // Reports CRUD
  fetchReports: (filters?: ReportSearchOptions) => Promise<void>;
  fetchReportById: (id: string) => Promise<void>;
  createReport: (config: ReportConfig) => Promise<Report | undefined>;
  updateReport: (
    id: string,
    config: ReportConfig,
  ) => Promise<Report | undefined>;
  deleteReport: (id: string) => Promise<void>;

  // Export and Download
  exportReport: (id: string, format: ReportFormat) => Promise<void>;
  downloadReport: (id: string, format: ReportFormat) => Promise<void>;

  // Schedules
  fetchSchedules: () => Promise<void>;
  createSchedule: (
    schedule: Omit<ReportSchedule, 'id'>,
  ) => Promise<ReportSchedule | undefined>;
  updateSchedule: (
    id: string,
    schedule: Partial<ReportSchedule>,
  ) => Promise<ReportSchedule | undefined>;
  deleteSchedule: (id: string) => Promise<void>;

  // Filters and Pagination
  setFilters: (filters: ReportSearchOptions) => void;
  setPagination: (pagination: Partial<ReportsState['pagination']>) => void;

  // State Management
  setSelectedReport: (report: Report | null) => void;
  clearError: () => void;
  clearSelectedReport: () => void;
}

export const useReportsStore = create<ReportsState & ReportsActions>()(
  devtools(
    (set, get) => ({
      // Initial State
      reports: [],
      schedules: [],
      selectedReport: null,
      isLoading: false,
      error: null,
      filters: {},
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        lastPage: 1,
      },

      // Reports CRUD
      fetchReports: async (filters = get().filters) => {
        set({ isLoading: true, error: null });
        try {
          const data = await reportsService.getReports(filters);
          set({
            reports: data.reports,
            pagination: {
              page: data.page,
              limit: data.limit,
              total: data.total,
              lastPage: data.totalPages,
            },
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao buscar relatórios',
            isLoading: false,
          });
        }
      },

      fetchReportById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          const report = await reportsService.getReportById(id);
          set({ selectedReport: report, isLoading: false });
        } catch (error: any) {
          set({
            error: error.message || `Erro ao buscar relatório ${id}`,
            isLoading: false,
          });
        }
      },

      createReport: async (config: ReportConfig) => {
        set({ isLoading: true, error: null });
        try {
          const newReport = await reportsService.createReport(config);
          set((state) => ({
            reports: [newReport, ...state.reports],
            pagination: {
              ...state.pagination,
              total: state.pagination.total + 1,
            },
            isLoading: false,
          }));
          return newReport;
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao criar relatório',
            isLoading: false,
          });
        }
      },

      updateReport: async (id: string, config: ReportConfig) => {
        set({ isLoading: true, error: null });
        try {
          const updatedReport = await reportsService.updateReport(id, config);
          set((state) => ({
            reports: state.reports.map((report) =>
              report.id === id ? updatedReport : report,
            ),
            selectedReport:
              state.selectedReport?.id === id
                ? updatedReport
                : state.selectedReport,
            isLoading: false,
          }));
          return updatedReport;
        } catch (error: any) {
          set({
            error: error.message || `Erro ao atualizar relatório ${id}`,
            isLoading: false,
          });
        }
      },

      deleteReport: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          await reportsService.deleteReport(id);
          set((state) => ({
            reports: state.reports.filter((report) => report.id !== id),
            selectedReport:
              state.selectedReport?.id === id ? null : state.selectedReport,
            pagination: {
              ...state.pagination,
              total: state.pagination.total - 1,
            },
            isLoading: false,
          }));
        } catch (error: any) {
          set({
            error: error.message || `Erro ao excluir relatório ${id}`,
            isLoading: false,
          });
        }
      },

      // Export and Download
      exportReport: async (id: string, format: ReportFormat) => {
        set({ isLoading: true, error: null });
        try {
          await reportsService.exportReport(id, format);
          set({ isLoading: false });
        } catch (error: any) {
          set({
            error: error.message || `Erro ao exportar relatório ${id}`,
            isLoading: false,
          });
        }
      },

      downloadReport: async (id: string, format: ReportFormat) => {
        set({ isLoading: true, error: null });
        try {
          await reportsService.downloadReport(id, format);
          set({ isLoading: false });
        } catch (error: any) {
          set({
            error: error.message || `Erro ao baixar relatório ${id}`,
            isLoading: false,
          });
        }
      },

      // Schedules
      fetchSchedules: async () => {
        set({ isLoading: true, error: null });
        try {
          const schedules = await reportsService.getReportSchedules();
          set({ schedules, isLoading: false });
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao buscar agendamentos',
            isLoading: false,
          });
        }
      },

      createSchedule: async (schedule: Omit<ReportSchedule, 'id'>) => {
        set({ isLoading: true, error: null });
        try {
          const newSchedule =
            await reportsService.createReportSchedule(schedule);
          set((state) => ({
            schedules: [newSchedule, ...state.schedules],
            isLoading: false,
          }));
          return newSchedule;
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao criar agendamento',
            isLoading: false,
          });
        }
      },

      updateSchedule: async (id: string, schedule: Partial<ReportSchedule>) => {
        set({ isLoading: true, error: null });
        try {
          const updatedSchedule = await reportsService.updateReportSchedule(
            id,
            schedule,
          );
          set((state) => ({
            schedules: state.schedules.map((s) =>
              s.id === id ? updatedSchedule : s,
            ),
            isLoading: false,
          }));
          return updatedSchedule;
        } catch (error: any) {
          set({
            error: error.message || `Erro ao atualizar agendamento ${id}`,
            isLoading: false,
          });
        }
      },

      deleteSchedule: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          await reportsService.deleteReportSchedule(id);
          set((state) => ({
            schedules: state.schedules.filter((s) => s.id !== id),
            isLoading: false,
          }));
        } catch (error: any) {
          set({
            error: error.message || `Erro ao excluir agendamento ${id}`,
            isLoading: false,
          });
        }
      },

      // Filters and Pagination
      setFilters: (filters: ReportSearchOptions) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
          pagination: { ...state.pagination, page: 1 },
        }));
      },

      setPagination: (pagination: Partial<ReportsState['pagination']>) => {
        set((state) => ({
          pagination: { ...state.pagination, ...pagination },
        }));
      },

      // State Management
      setSelectedReport: (report: Report | null) => {
        set({ selectedReport: report });
      },

      clearError: () => {
        set({ error: null });
      },

      clearSelectedReport: () => {
        set({ selectedReport: null });
      },
    }),
    {
      name: 'reports-store',
    },
  ),
);
