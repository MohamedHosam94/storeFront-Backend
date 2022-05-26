/* Replace with your SQL commands */
CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  quantity INT,
  order_id bigint REFERENCES orders(id),
  product_id bigint REFERENCES products(id)
);