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

// First run menu, currently just gives you the chance to quit
var startMenu = function() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'start',
      message: "Hello! Select below: ",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Quit"
      ]
    },
  ]).then(function(select){
    console.log(select.start)
    switch(select.start) {
      case 'View Products for Sale':
        displayProducts();
        break;
      case 'View Low Inventory':

      case 'Quit':
        quittingTime();
        break;
      default:
        quittingTime();
    }
  });
};

var displayProducts = function() {
  var productTable = new Table({
    head: [' ID ' , ' Product ' , ' Price ' , 'Quantity'],
  });
  connection.query("SELECT * FROM products;", 
  function(err, res) {
    if (err) throw err;
    res.forEach(function(element) {
      productTable.push([
        element.item_id, 
        element.product_name, 
        `$${element.price}`, 
        element.stock_quantity,
      ]);
    });
    console.log(productTable.toString());
    startInquire();
  });
}

var startInquire = function() {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'back',
      message: "Back to start?",
      default: true,
    },
  ]).then(function(choice) {
    if (choice.back) {
      startMenu();
    } else {
      quittingTime();
    }
  })
}

var quittingTime = function() {
  console.log("Goodbye!");
  connection.end();
};