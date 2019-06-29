var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table2');

// Define the connection parameters
var connection = mysql.createConnection({
  host: "localhost",
	port: 3306,
  
  user:'root',  
	password:'',
	database:'bamazon'
});

// Make the connection
connection.connect(function(err){
  if(err) throw err;
	// console.log("Connected as id " + connection.threadId);
  // Call to the beginning of the app
	startMenu();
});

// Function menu
var startMenu = function() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'start',
      message: "Hello! Select below: ",
      choices: [
        "View Product Sales By Department",
        "Create New Department",
        "Quit"
      ],
    },
  ]).then(function(select){
    console.log(select.start)
    switch(select.start) {
      case 'View Product Sales By Department':
        displayDepartments(startMenu);
        break;
      case 'Create New Department':
        newDepartment(startMenu);
        break;
      case 'Quit':
        quittingTime();
        break;
      default:
        quittingTime();
    }
  });
};

var displayDepartments = function(callback) {
  var departmentTable = new Table({
    head: [' ID ' , ' Department ' , ' Overhead Costs ' , 'Product Sales' , 'Total Profit'],
  });
  connection.query('SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS revenue, SUM(products.product_sales) - departments.over_head_costs AS profit FROM departments INNER JOIN products ON (departments.department_name = products.department_name) GROUP BY departments.department_name;', 
  function(err, res) {
    if (err) throw err;
    res.forEach(function(element) {
      departmentTable.push([
        element.department_id, 
        element.department_name, 
        element.over_head_costs,
        element.revenue,
        element.profit,
      ]);
    });
    console.log(departmentTable.toString());
    callback();
  });
};

var newDepartment = function(callback) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department_name',
      message: "New department name: ",
    },
    {
      type: 'number',
      name: 'over_head_costs',
      message: "New department operating costs: ",
    }
  ]).then(function(newDept) {
    connection.query('INSERT INTO departments SET ?', 
    newDept, 
    function(error, response) {
      if (error) throw error;
      console.log(response.affectedRows + " department inserted!\n");
      callback();
    });
  });
};

var quittingTime = function() {
  console.log("Goodbye!");
  connection.end();
};