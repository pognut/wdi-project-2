IF EXISTS trainers DROP TABLE trainers;
IF EXISTS pokemon DROP TABLE pokemon;
IF EXISTS record DROP TABLE record;

CREATE TABLE trainers(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255)
);

CREATE TABLE pokemon(
  id SERIAL PRIMARY KEY,
  moves VARCHAR(255) NOT NULL,
  trainer_id INTEGER REFERENCES trainer(id)
);

CREATE TABLE record(
  id SERIAL PRIMARY KEY,
  wins INTEGER NOT NULL,
  losses INTEGER NOT NULL,
  trainer_id INTEGER REFERENCES trainer(id)
);


