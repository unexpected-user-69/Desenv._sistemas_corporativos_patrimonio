# How to Execute the Project

To execute this project, you have several options depending on whether you want to run the full microservices architecture, the local development environment, or the specific PoC.

## Prerequisites
- **Node.js** (v18+)
- **Docker** & **Docker Compose** (for the full system)
- **PostgreSQL** (if running locally without Docker)

---

## 1. Quick Start (Recommended for Dev)
The project includes scripts to automate the setup.

```bash
# Setup environment (install dependencies, etc.)
./scripts/setup-dev.sh

# Start development environment
./scripts/start-dev.sh
```

## 2. Manual Local Development
If you prefer to run services manually:

### Backend (NestJS Monolith)
```bash
cd backend
npm install
npm run start:dev
# Runs on http://localhost:3101
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Database (Docker)
```bash
docker-compose up db redis -d
```

## 3. Full Microservices (Docker)
To run the entire system as microservices:

```bash
docker-compose up --build -d
```

This will start:
- **Auth Service**: Port 3001
- **Users Service**: Port 3002
- **Events Service**: Port 3003
- **Audit Service**: Port 3004
- **Categorias Service**: Port 3005
- **Patrimonio Service**: Port 3006
- **Frontend**: Port 5173
- **Database & Redis**

## 4. Running the PoC (Proof of Concept)
To run the specific "Minimum Provider" PoC:

```bash
cd poc-express-users
npm install
node index.js
# Runs on http://localhost:3000
```

## Configuration
Ensure your `.env` file in the root is configured. You can copy the example:

```bash
cp .env.example .env
```

Default credentials are usually `postgres` / `postgres` for the database.
