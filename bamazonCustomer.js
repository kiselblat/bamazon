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
      choices: ["View Catalog" , "Quit"]
    },
  ]).then(function(select){
    console.log(select.start)
    switch(select.start) {
      case 'View Catalog':
        displayProducts();
        break;
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
    head: [' ID ' , ' Product ' , ' Price '],
  });
  connection.query("SELECT * FROM products;", 
  function(err, res) {
    if (err) throw err;
    res.forEach(function(element) {
      productTable.push([element.item_id , element.product_name , `$${element.price}`]);
    });
    console.log(productTable.toString());
    purchaseInquire();
  });
}
      
var purchaseInquire = function() {
  inquirer.prompt([
    {
      name: 'buy',
      type: 'confirm',
      message: "Would you like to make a purchase?",
      default: true,
    },
  ]).then(function(confirm) {
    if (confirm.buy) {
      purchasePrompt();
    } else {
      quittingTime();
    }
  });
};
      
var purchasePrompt = function() {
  inquirer.prompt([
    {
      name: 'productID',
      type: 'number',
      message: "Please enter the product number you would like to buy:",
    },
    {
      name: 'quantity',
      type: 'number',
      message: "Enter purchase quantity:",
    },
  ]).then(function(order){
    connection.query('SELECT * FROM products WHERE item_id = ?' , order.productID , function(error , response) {
      if (error) throw error;
      if (order.quantity > response[0].stock_quantity) {
        console.log("Insufficient quantity, sorry for the inconvenience.");
        anotherInquire();
      } else {
        console.log("We've got that!");
        var newQuantity = parseInt(response[0].stock_quantity) - parseInt(order.quantity);
        makePurchase(order.productID , newQuantity);
      }
    });
  });
};

var makePurchase = function(idNumber , quantity) {
  connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?;', 
  [quantity , idNumber], 
  function(error , response) {
    if (error) throw error;
    // console.log(response);
    console.log("Purchase complete!");
    anotherInquire();
  });
};

var anotherInquire = function() {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'another',
      message: "Would you like to make another purchase?",
      default: true,
    }
  ]).then(function(choice) {
    if (choice.another) {
      displayProducts();
    } else {
      quittingTime();
    }
  });
};

var quittingTime = function() {
  console.log("Goodbye!");
  connection.end();
};