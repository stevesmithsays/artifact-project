SELECT products.id, products.name, products.image, carts.product_id, carts.unit_price
FROM products JOIN carts ON products.id = carts.product_id
WHERE carts.user_id = $1;

