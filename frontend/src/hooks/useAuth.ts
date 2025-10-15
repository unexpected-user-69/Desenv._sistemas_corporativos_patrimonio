import { useAuthStore } from '../stores/authStore';
import { UserRole } from '../types/user';

export const useAuth = () => {
  const store = useAuthStore();

  return {
    // State
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,

    // Actions
    login: store.login,
    logout: store.logout,
    refreshToken: store.refreshToken,
    updateUser: store.updateUser,
    clearError: store.clearError,

    // Role checks
    isAdmin: store.isAdmin,
    isTeacher: store.isTeacher,
    isStudent: store.isStudent,
    hasRole: store.hasRole,
    hasAnyRole: store.hasAnyRole,

    // Convenience methods
    canAccess: (requiredRoles: UserRole[]) => {
      if (!store.isAuthenticated || !store.user) return false;
      return requiredRoles.includes(store.user.role);
    },

    canManageUsers: () => {
      return store.hasAnyRole([UserRole.ADMIN, UserRole.TEACHER]);
    },

    canManagePatrimonios: () => {
      return store.hasAnyRole([UserRole.ADMIN, UserRole.TEACHER]);
    },

    canViewReports: () => {
      return store.hasAnyRole([UserRole.ADMIN, UserRole.TEACHER]);
    },

    canAccessAdmin: () => {
      return store.hasRole(UserRole.ADMIN);
    },
  };
};

export default useAuth;
