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
    price DECIMAL(10,5)
    
)

CREATE TABLE carts (
    user_id SERIAL PRIMARY KEY,
    product_id INT,
    quantity INT,
    unit_price FLOAT,
    total_price FLOAT
    
)



