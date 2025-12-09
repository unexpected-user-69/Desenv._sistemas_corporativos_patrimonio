import { Router } from 'express';
import { loginHandler, refreshHandler, logoutHandler, meHandler } from '../handlers/auth.handlers';

export const authRoutes = Router();

/**
 * POST /auth/login
 * Endpoint para autenticação de usuário
 */
authRoutes.post('/login', loginHandler);

/**
 * POST /auth/refresh
 * Endpoint para renovar access token usando refresh token
 */
authRoutes.post('/refresh', refreshHandler);

/**
 * POST /auth/logout
 * Endpoint para logout do usuário
 */
authRoutes.post('/logout', logoutHandler);

/**
 * GET /auth/me
 * Endpoint para obter informações do usuário autenticado
 */
authRoutes.get('/me', meHandler);

