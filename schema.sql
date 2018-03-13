CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    authid VARCHAR(40),
    name VARCHAR(40)
),

CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(40),
    country VARCHAR(40),
    price FLOAT,
    image VARCHAR(200),
    productinfo VARCHAR(500)

    
)

CREATE TABLE carts (
    order_id SERIAL PRIMARY KEY,
    user_id INT,
    product_id INT,
    unit_price FLOAT,
    CONSTRAINT fk_users
    FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_products
    FOREIGN KEY (product_id) REFERENCES products(id)
)


