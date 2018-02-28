CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    authid VARCHAR(40),
    name VARCHAR(40)
),

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    upc INT,
    name VARCHAR(40),
    country VARCHAR(40),
    price INT
    
)
