USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Fabrege Egg", "luxuries", 12500.00, 5, 25000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Paper Towels", "household", 15.00, 1000, 15000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("How I Rose From the Dead In My Spare Time and So Can You", "books", 25.00, 5, 7500);
 
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Emerald Cufflinks", "fashion", 300.00, 5, 3000);
 
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Smartphone", "electronics", 850.00, 100, 18000);
 
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Earbuds", "electronics", 70.00, 200, 970);
 
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("High Heels", "fashion", 250.00, 150, 2500);
 
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("The Grasshopper Lies Heavy", "books", 40.00, 50, 8000);
 
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Window Cleaner", "household", 5.00, 1000, 10000);
 
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Medieval Tapestry", "luxuries", 50500.00, 5, 101000);
 
-- departments

INSERT INTO departments (department_name, over_head_costs)
VALUES ("luxuries", 125000.00);
  
INSERT INTO departments (department_name, over_head_costs)
VALUES ("household", 12000.00);
  
INSERT INTO departments (department_name, over_head_costs)
VALUES ("books", 16000.00);
  
INSERT INTO departments (department_name, over_head_costs)
VALUES ("fashion", 35000.00);
  
INSERT INTO departments (department_name, over_head_costs)
VALUES ("electronics", 25000.00);
  