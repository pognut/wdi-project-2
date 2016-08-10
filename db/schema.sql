DROP TABLE IF EXISTS trainers;
DROP TABLE IF EXISTS pokemon;
DROP TABLE IF EXISTS record;

CREATE TABLE trainers(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255)
);

CREATE TABLE pokemon(
  id SERIAL PRIMARY KEY,
  moves VARCHAR(255) NOT NULL,
  trainers_id INTEGER REFERENCES trainers(id)
);

CREATE TABLE record(
  id SERIAL PRIMARY KEY,
  wins INTEGER NOT NULL,
  losses INTEGER NOT NULL,
  trainers_id INTEGER REFERENCES trainers(id)
);


