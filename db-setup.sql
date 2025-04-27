-- db-setup.sql

-- 1. Create the database
CREATE DATABASE flashcards;

-- 2. Create a dedicated role/user (change password as you see fit)
CREATE ROLE flashcards WITH LOGIN PASSWORD 'pbm';

-- 3. Grant ownership and privileges
ALTER DATABASE flashcards OWNER TO flashcards;
GRANT ALL PRIVILEGES ON DATABASE flashcards TO flashcards;

-- 4. Connect into the new database
\c flashcards

-- 5. Create the cards table
CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  front TEXT NOT NULL,
  back  TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Grant privileges on the cards table
ALTER TABLE cards OWNER TO flashcards;