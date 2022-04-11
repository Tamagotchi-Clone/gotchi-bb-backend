DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS users, profiles, userPets, profile_pets CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE pets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    species TEXT NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE profiles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    user_id BIGINT REFERENCES users(id)
);

CREATE TABLE userPets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    profile_id BIGINT REFERENCES profiles(id),
    pet_id BIGINT REFERENCES pets(id),
    species TEXT NOT NULL,
    image TEXT NOT NULL,
    name TEXT
);

INSERT INTO pets (species, image)
VALUES ('Mametchi', 'https://pbs.twimg.com/media/FP-gyhdaAAUvLLN?format=jpg&name=large');

INSERT INTO users (email, password)
VALUES 
('Ianmami@example.com', 'Conor');