
DROP TABLE IF EXISTS users, pets, profiles, userPets, pet_scores CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    username TEXT NOT NULL
);

CREATE TABLE pets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    species TEXT NOT NULL,
    image TEXT NOT NULL,
    hunger TIMESTAMP DEFAULT NOW()
);

CREATE TABLE profiles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    name TEXT NOT NULL
);

CREATE TABLE user_pets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    profile_id BIGINT REFERENCES profiles(id),
    pet_id BIGINT REFERENCES pets(id),
    name TEXT,
    hunger TIMESTAMP,
    play  TIMESTAMP,
    cleanliness  TIMESTAMP
);

CREATE TABLE pet_scores (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_pets_id BIGINT REFERENCES user_pets(id),
    hunger INT NOT NULL,
    play INT NOT NULL,
    cleanliness INT NOT NULL
);

INSERT INTO pets (species, image)
VALUES ('Mametchi', 'https://pbs.twimg.com/media/FP-gyhdaAAUvLLN?format=jpg&name=large');

INSERT INTO users (email, username)
VALUES 
('Ianmami@example.com', 'Conor');

INSERT INTO profiles (user_id, name)
VALUES ('1', 'omelette');
