import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const AuthPage: React.FC = () => {
    const [view, setView] = useState<'login' | 'register'>('login');

    if (view === 'register') {
        return (
            <RegisterForm
                onBackToLogin={() => setView('login')}
                onSuccess={() => {
                    // Registration successful, user is logged in automatically
                    // The ProtectedRoute will detect the auth state change and redirect
                }}
            />
        );
    }

    return <LoginForm onRegisterClick={() => setView('register')} />;
};
