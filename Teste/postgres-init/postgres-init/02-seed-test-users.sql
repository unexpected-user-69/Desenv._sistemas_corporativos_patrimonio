-- Seed script for PostgreSQL initialization (placeholder)
-- This script runs after 01-create-db-and-schemas.sql
-- 
-- NOTE: The citext extension is created in 01-create-db-and-schemas.sql
-- The test users are seeded by users-service onModuleInit hook automatically:
--   - test.user@example.com (student) / StrongP@ssw0rd
--   - admin.user@example.com (admin) / AdminP@ss1

-- Nothing else to do here - TypeORM migrations handle table creation
DO $$
BEGIN
    RAISE NOTICE 'PostgreSQL initialization complete. Services will create their own tables via migrations.';
END$$;
