DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(60) NULL,
  department_name VARCHAR(60) NULL,
  price DEC(10,2) NULL,
  stock_quantity INT(10) NULL,
  product_sales DEC(10,2) NULL,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(60) NULL,
  over_head_costs DEC(10,2) NULL,
  PRIMARY KEY (department_id)
);