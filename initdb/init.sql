CREATE USER keycloak WITH PASSWORD 'password';
ALTER USER keycloak WITH SUPERUSER;
GRANT ALL PRIVILEGES ON DATABASE instamintdb TO keycloak;
GRANT ALL PRIVILEGES ON DATABASE instamintdb TO keycloak;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO keycloak;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO keycloak;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS nfts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL
);

INSERT INTO users (username, email, bio, password) VALUES
('johndoe', 'john.doe@example.com', 'Just a regular John.', 'hashedpassword1'),
('janedoe', 'jane.doe@example.com', 'A Jane of all trades.', 'hashedpassword2');

INSERT INTO nfts (title, description, image_url, owner_id, price, status) VALUES
('Forest NFT', 'An exclusive digital art piece of a forest.', 'http://example.com/forest.jpg', 1, 100.00, 'available'),
('Ocean NFT', 'A unique digital representation of the ocean.', 'http://example.com/ocean.jpg', 2, 150.00, 'sold');