import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { ProtectedRouteProps } from '../../types/auth';
import { UserRole } from '../../types/user';
import { LoginForm } from './LoginForm';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
  fallback,
}) => {
  const { isAuthenticated, user, hasAnyRole } = useAuthStore();

  // Se não estiver autenticado, mostrar formulário de login
  if (!isAuthenticated) {
    return fallback || <LoginForm />;
  }

  // Se roles específicas são necessárias, verificar permissões
  if (requiredRoles && requiredRoles.length > 0) {
    if (!user || !hasAnyRole(requiredRoles)) {
      return (
        fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 text-center">
              <div>
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Acesso Negado
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Você não tem permissão para acessar esta página.
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Roles necessárias: {requiredRoles.join(', ')}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Sua role atual: {user?.role}
                </p>
              </div>
            </div>
          </div>
        )
      );
    }
  }

  // Se chegou até aqui, o usuário tem acesso
  return <>{children}</>;
};

// Componente específico para rotas de admin
export const AdminRoute: React.FC<
  Omit<ProtectedRouteProps, 'requiredRoles'>
> = ({ children, fallback }) => {
  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN]} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
};

// Componente específico para rotas de teacher
export const TeacherRoute: React.FC<
  Omit<ProtectedRouteProps, 'requiredRoles'>
> = ({ children, fallback }) => {
  return (
    <ProtectedRoute
      requiredRoles={[UserRole.TEACHER, UserRole.ADMIN]}
      fallback={fallback}
    >
      {children}
    </ProtectedRoute>
  );
};

// Componente específico para rotas de student
export const StudentRoute: React.FC<
  Omit<ProtectedRouteProps, 'requiredRoles'>
> = ({ children, fallback }) => {
  return (
    <ProtectedRoute
      requiredRoles={[UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN]}
      fallback={fallback}
    >
      {children}
    </ProtectedRoute>
  );
};

export default ProtectedRoute;
