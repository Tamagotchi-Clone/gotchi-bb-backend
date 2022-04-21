
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
    user_id BIGINT REFERENCES users(id) NOT NULL,
    pet_id BIGINT REFERENCES pets(id) NOT NULL,
    name TEXT,
    hunger TIMESTAMP WITH TIME ZONE DEFAULT '2022-03-20 16:36:51.075791-07',
    play  TIMESTAMP WITH TIME ZONE DEFAULT '2022-03-20 16:36:51.075791-07',
    cleanliness  TIMESTAMP WITH TIME ZONE DEFAULT '2022-03-20 16:36:51.075791-07'
);

CREATE TABLE pet_scores (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    hunger INT,
    play INT,
    cleanliness INT
);

INSERT INTO pets (species, image)

VALUES ('Chikcy', 'https://i.postimg.cc/1f3txb9Q/pet1.png'),
('Seahorse', 'https://i.postimg.cc/21qSyvb9/pet2.png'),
('Dino', 'https://i.postimg.cc/bGkYHhRQ/pet3.png'),
('lil guy', 'https://i.postimg.cc/QFRxTtc8/pet4.png'),
('Snail', 'https://i.postimg.cc/N9tsdzNZ/pet5.png'),
('Doggo', 'https://i.postimg.cc/cgcs2B2C/pet6.png'),
('Sheepy', 'https://i.postimg.cc/V0LY8bPR/pet7.png'),
('Turtle', 'https://i.postimg.cc/z30zkpTP/pet8.png'),
('Piggy', 'https://i.postimg.cc/jCsqNBn7/pet9.png'),
('Sleepy Cat', 'https://i.postimg.cc/XpqV1F8N/pet10.png'),
('Bunny', 'https://i.postimg.cc/9DqcChKv/pet11.png'),
('Giraffe', 'https://i.postimg.cc/xkDndZSq/pet12.png');


INSERT INTO users (username, password_hash)
VALUES 
('violet', 'gotchi is cool');

INSERT INTO user_pets (user_id, pet_id, name)
VALUES ('1', '1', 'omelette');

INSERT INTO pet_scores (user_id, hunger, play, cleanliness)
VALUES ('1', 1, 1, 1);