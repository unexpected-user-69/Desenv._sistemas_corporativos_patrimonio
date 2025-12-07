# User Registration Feature Documentation

This document consolidates the Implementation Plan and Walkthrough for the User Registration feature.

---

## Part 1: Implementation Plan

### Goal Description
The user needs a way to create credentials (Sign Up). Currently, the system only supports Login, and user creation is restricted to Admins.

### User Review Required
> [!IMPORTANT]
> This change will allow public user registration. The default role for new users will be `OPERATOR`.

### Proposed Changes

#### Backend

##### [MODIFY] [auth.controller.ts](file:///c:/Users/janet/.gemini/antigravity/scratch/Desenv_sistemas_corporativos_patrimonio/backend/src/auth/auth.controller.ts)
- Add `@Post('register')` endpoint.
- This endpoint will be public (`@Public()`).
- It will accept `CreateUserDto` (or a subset) and call `AuthService.register`.

##### [MODIFY] [auth.service.ts](file:///c:/Users/janet/.gemini/antigravity/scratch/Desenv_sistemas_corporativos_patrimonio/backend/src/auth/auth.service.ts)
- Add `register` method.
- It will call `UsersService.create` with `UserRole.OPERATOR`.

#### Frontend

##### [NEW] [RegisterForm.tsx](file:///c:/Users/janet/.gemini/antigravity/scratch/Desenv_sistemas_corporativos_patrimonio/frontend/src/components/auth/RegisterForm.tsx)
- Create a registration form with Name, Email, Password.
- Use `react-hook-form` and `zod` for validation.
- On success, auto-login or switch to login view.

##### [NEW] [AuthPage.tsx](file:///c:/Users/janet/.gemini/antigravity/scratch/Desenv_sistemas_corporativos_patrimonio/frontend/src/components/auth/AuthPage.tsx)
- A wrapper component that manages state `view: 'login' | 'register'`.
- Renders `LoginForm` or `RegisterForm`.

##### [MODIFY] [LoginForm.tsx](file:///c:/Users/janet/.gemini/antigravity/scratch/Desenv_sistemas_corporativos_patrimonio/frontend/src/components/auth/LoginForm.tsx)
- Add a "Don't have an account? Sign up" button/link.
- Accept a prop `onRegisterClick` to switch views.

##### [MODIFY] [ProtectedRoute.tsx](file:///c:/Users/janet/.gemini/antigravity/scratch/Desenv_sistemas_corporativos_patrimonio/frontend/src/components/auth/ProtectedRoute.tsx)
- Replace `<LoginForm />` with `<AuthPage />`.

##### [MODIFY] [authService.ts](file:///c:/Users/janet/.gemini/antigravity/scratch/Desenv_sistemas_corporativos_patrimonio/frontend/src/services/authService.ts)
- Add `register` method calling `/auth/register`.

### Verification Plan

#### Manual Verification
1.  **Run Migrations**: Ensure database tables exist.
2.  **Backend**: Restart backend.
3.  **Frontend**:
    - Open the app.
    - Verify "Sign Up" link appears on Login page.
    - Click "Sign Up" and verify Registration form appears.
    - Register a new user.
    - Verify successful login after registration.

---

## Part 2: Walkthrough

### Overview
This walkthrough documents the implementation of the user registration feature, allowing new users to create accounts.

### Changes Made

#### Backend
- **New DTO**: Created `RegisterDto` for validating registration requests.
- **Users Service**: Added `createUser` method to `UsersHttpClient` to communicate with the Users Service.
- **Auth Service**: Implemented `register` method to handle user creation, default role assignment (`OPERATOR`), and auto-login.
- **Auth Controller**: Added public `POST /auth/register` endpoint.

#### Frontend
- **Auth Service**: Added `register` method to handle API calls and token storage.
- **Register Form**: Created `RegisterForm` component with validation (Zod) and UI.
- **Auth Page**: Created `AuthPage` to toggle between Login and Register forms.
- **Login Form**: Added "Sign up" link to switch to registration view.
- **Protected Route**: Updated to use `AuthPage` for unauthenticated users.

### Verification Steps

#### 1. Prerequisites
- Ensure backend is running: `npm run start:dev` (in `backend` directory).
- Ensure frontend is running: `npm run dev` (in `frontend` directory).

#### 2. Manual Verification
1.  Open the application in your browser (e.g., `http://localhost:5173`).
2.  If not logged in, you should see the Login form.
3.  Click on the **"Cadastre-se"** link at the bottom.
4.  Fill in the registration form:
    -   **Name**: Your name
    -   **Email**: A unique email address
    -   **Password**: Strong password (min 6 chars)
    -   **Confirm Password**: Same as password
5.  Click **"Criar conta"**.
6.  **Success**: You should be automatically logged in and redirected to the dashboard.
7.  **Error Handling**: Try registering with an existing email to verify the error message.

### Next Steps
-   Implement email verification (optional).
-   Add more robust error handling for network issues.
