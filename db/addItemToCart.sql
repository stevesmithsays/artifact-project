INSERT INTO carts (user_id, product_id, unit_price) VALUES ($1, $2, $3) RETURNING *;

