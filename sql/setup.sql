DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS users, profile CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE pets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    profile_id TEXT,
    species TEXT NOT NULL,
    name TEXT,
    image TEXT NOT NULL
);

CREATE TABLE profile (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    user_id BIGINT REFERENCES users(id)
);

INSERT INTO pets (profile_id, species, name, image)
VALUES ('1', 'Mametchi', 'Cutie', 'https://pbs.twimg.com/media/FP-gyhdaAAUvLLN?format=jpg&name=large');