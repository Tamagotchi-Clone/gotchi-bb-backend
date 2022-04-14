
DROP TABLE IF EXISTS users, pets, user_pets, pet_scores CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    username TEXT NOT NULL
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
VALUES ('Mametchi', 'https://pbs.twimg.com/media/FP-gyhdaAAUvLLN?format=jpg&name=large');

INSERT INTO users (email, username)
VALUES 
('Ianmami@example.com', 'Conor');

INSERT INTO user_pets (user_id, pet_id, name)
VALUES ('1', '1', 'omelette');

INSERT INTO pet_scores (user_id, hunger, play, cleanliness)
VALUES ('1', 1, 1, 1);