
DROP TABLE IF EXISTS users, pets, user_pets, pet_scores CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

CREATE TABLE pets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    species TEXT NOT NULL,
    image TEXT NOT NULL
);


CREATE TABLE user_pets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    pet_id BIGINT REFERENCES pets(id),
    name TEXT,
    hunger TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    play  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    cleanliness  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pet_scores (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    hunger INT,
    play INT,
    cleanliness INT
);

INSERT INTO pets (species, image)
VALUES ('Mametchi', '../assets/pet4.png');

INSERT INTO users (username, password_hash)
VALUES 
('violet', 'gotchi is cool');

INSERT INTO user_pets (user_id, pet_id, name)
VALUES ('1', '1', 'omelette');

INSERT INTO pet_scores (user_id, hunger, play, cleanliness)
VALUES ('1', 1, 1, 1);