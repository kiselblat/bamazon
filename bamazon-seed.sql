USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fabrege Egg", "luxuries", 12500.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Paper Towels", "household", 15.00, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("How I Rose From the Dead In My Spare Time and So Can You", "books", 25.00, 10);
 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Emerald Cufflinks", "fashion", 300.00, 5);
 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Smartphone", "electronics", 849.99, 100);
 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Earbuds", "electronics", 69.99, 200);
 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("High Heels", "fashion", 12500.00, 5);
 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Grasshopper Lies Heavy", "books", 40.00, 50);
 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Window Cleaner", "household", 5.00, 1000);
 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Medieval Tapestry", "luxuries", 50500.00, 5);
 
-- departments

INSERT INTO departments (department_name, over_head_costs)
VALUES ("luxuries", 40000.00);
  
INSERT INTO departments (department_name, over_head_costs)
VALUES ("household", 12000.00);
  
INSERT INTO departments (department_name, over_head_costs)
VALUES ("books", 16000.00);
  
INSERT INTO departments (department_name, over_head_costs)
VALUES ("fashion", 35000.00);
  
INSERT INTO departments (department_name, over_head_costs)
VALUES ("electronics", 25000.00);
  