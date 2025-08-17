BEGIN;


DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS foods CASCADE;

CREATE TABLE  users(
    id SERIAL PRIMARY KEY, 
    username VARCHAR(70) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);


-- CREATE TABLE  sessions (
--     id SERIAL PRIMARY KEY, 
--     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, 
--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
--     updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );

CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  image_url TEXT,
  calories INT,
  created_at TIMESTAMP DEFAULT NOW(),
  user_id INT REFERENCES users(id)
);

COMMIT;