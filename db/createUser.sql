INSERT INTO users (authid, name) VALUES ($1, $2) RETURNING*;
