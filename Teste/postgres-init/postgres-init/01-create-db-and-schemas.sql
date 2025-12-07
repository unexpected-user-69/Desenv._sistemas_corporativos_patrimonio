-- Creates the unified database and initial schemas for the course/lab.
-- This script is executed by the official postgres image only the first time the volume is initialized.

-- Note: docker-compose already sets POSTGRES_DB=aurora_db, so the database is created automatically.
-- We connect to it directly (scripts in /docker-entrypoint-initdb.d run against POSTGRES_DB by default).

-- Enable citext extension (required for case-insensitive email)
-- Must be created before schemas so it's available database-wide
CREATE EXTENSION IF NOT EXISTS citext;

-- Create schemas for each microservice
CREATE SCHEMA IF NOT EXISTS events AUTHORIZATION postgres;
CREATE SCHEMA IF NOT EXISTS users AUTHORIZATION postgres;
CREATE SCHEMA IF NOT EXISTS auth AUTHORIZATION postgres;

-- Grant usage on schemas to postgres user (for completeness)
GRANT ALL ON SCHEMA events TO postgres;
GRANT ALL ON SCHEMA users TO postgres;
GRANT ALL ON SCHEMA auth TO postgres;
