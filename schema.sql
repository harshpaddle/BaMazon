DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  avail_stock INT NOT NULL,
  PRIMARY KEY (id)
);


INSERT INTO products
  (product_name, department_name, price, avail_stock)
VALUES
  ("Striped Jacket", "Apparel", 79.99, 100),
  ("Leather Jacket", "Apparel", 79.99, 100),
  ("WindbBreaker Jacket", "Apparel", 79.99, 100),
  ("Gillete Razor", "Personal Care", 19.99, 1000),
  ("Body Wash", "Personal Care", 19.99, 1000),
  ("Drill", "Machinery", 120, 30),
  ("Nail gun", "Machinery", 120, 30),
  ("Bicycle","Vehicles", 400, 50),
  ("HD MotoCycle","Vehicles", 40000, 10),
  ("PS4", "Entertainment", 400, 80),
  ("BasketBall", "Entertainment", 49.99, 30)
