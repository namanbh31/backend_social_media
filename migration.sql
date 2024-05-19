
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

-- Create the Followers table
CREATE TABLE Followers (
    id SERIAL PRIMARY KEY,
    user_id INT,
    follower_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (follower_id) REFERENCES users(id)
);

-- Create the Post table
CREATE TABLE Post (
    id SERIAL PRIMARY KEY,
    created_by INT,
    type VARCHAR(50),
    media_url VARCHAR(255),
    media_text VARCHAR(255),
    total_likes INT,
    comments_enabled BOOLEAN,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Create the Likes table
CREATE TABLE Likes (
    id SERIAL PRIMARY KEY,
    post_id INT,
    user_id INT,
    FOREIGN KEY (post_id) REFERENCES Post(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create the Comments table
CREATE TABLE Comments (
    id SERIAL PRIMARY KEY,
    post_id INT,
    user_id INT,
    comment VARCHAR(255),
    FOREIGN KEY (post_id) REFERENCES Post(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
ALTER TABLE likes ADD COLUMN is_liked BOOLEAN;
ALTER TABLE likes ADD CONSTRAINT likes_unique UNIQUE (post_id, user_id);
