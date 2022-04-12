


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

CREATE TABLE profiles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    name TEXT NOT NULL
);

CREATE TABLE userPets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    profile_id BIGINT REFERENCES profiles(id),
    pet_id BIGINT REFERENCES pets(id),
    name TEXT,
    hunger TIMESTAMP DEFAULT NOW(),
    play  TIMESTAMP DEFAULT NOW(),
    cleanliness  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pet_scores (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    userPets_id BIGINT REFERENCES userPets(id),
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

INSERT INTO userPets(profile_id, pet_id, name)
VALUES ('1', '1', 'omelette');