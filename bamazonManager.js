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
        displayProducts(startInquire);
        break;
      case 'View Low Inventory':
        lowInventory(addInventoryInquire);
        break;
      case 'Add to Inventory':
        displayProducts(makeAddInventory);
        break;
      case 'Add New Product':
        makeNewProduct(startInquire);
        break;
      case 'Quit':
        quittingTime();
        break;
      default:
        quittingTime();
    }
  });
};

var displayProducts = function(callback) {
  var productTable = new Table({
    head: [' ID ' , ' Product ' , ' Quantity ' , ' Price ' , ' Units Sold ' , ' Total Sales '],
  });
  connection.query("SELECT *, product_sales / price AS units_sold FROM products;", 
  function(err, res) {
    if (err) throw err;
    res.forEach(function(element) {
      productTable.push([
        element.item_id, 
        element.product_name, 
        element.stock_quantity,
        `$${element.price}`,
        element.units_sold,
        `$${element.product_sales}`,
      ]);
    });
    console.log(productTable.toString());
    callback();
  });
}

function lowInventory(callback) {
  var lowInvTable = new Table({
    head: [' ID ' , 'Product' , 'Quantity'],
  });
  connection.query(`SELECT * FROM products WHERE stock_quantity < 5;` , 
    function(err, res) {
      if (err) throw err;
      // console.log(res);
      res.forEach(function(element){
        lowInvTable.push([
          element.item_id, 
          element.product_name, 
          element.stock_quantity,
        ]);
      })
      console.log(lowInvTable.toString());
      callback();
    });
  }
  
var addInventoryInquire = function() {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'toAdd',
      message: "Add to inventory?",
      default: true,
    }
  ]).then(function(choice) {
    if(choice.toAdd) {
      displayProducts(makeAddInventory);
    } else {
      startInquire();
    }
  });
};
    
var makeAddInventory = function() {
  inquirer.prompt([
    {
      type: 'number',
      name: 'itemID',
      message: "Enter item ID: ",
    },
    {
      type: 'number',
      name: 'addQty',
      message: "Quantity to add: ",
    },
  ]).then(function(inventoryAdd) {
    connection.query('SELECT * FROM products WHERE item_id=?',
    inventoryAdd.itemID,
    function(error , response) {
      var newQuantity
      if (error) throw error;
      newQuantity = response[0].stock_quantity + inventoryAdd.addQty;
      console.log("Adding inventory...");
      updateInventory(inventoryAdd.itemID , newQuantity);
    });
  });
};

var updateInventory = function(itemID , quantity) {
  // console.log(`updateInventory(${itemID} , ${quantity})`);
  connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?;',
  [quantity , itemID],
  function(error , response) {
    if (error) throw error;
    console.log("...complete!");
    startInquire();
  });
};

var makeNewProduct = function(callback) {
  var deptChoices = [];
  connection.query('SELECT department_name FROM departments;' , function(error , response) {
    if (error) throw error;
    response.forEach(function(element) {
      if (!deptChoices.includes(element.department_name)) {
        deptChoices.push(element.department_name);
      }
    });
    // Build a new product object
    inquirer.prompt([
      // product_name
      {
        type: 'input',
        name: 'product_name',
        message: "Product name: ",
      },
      // department_name
      {
        type: 'list',
        name: 'department_name',
        message: 'Sales department',
        choices: deptChoices,
      },
      // price
      {
        type: 'number',
        name: 'price',
        message: 'Price: ',
      },
      // initial stock_quantity
      {
        type: 'number',
        name: 'stock_quantity',
        message: 'Starting inventory: ',
      },
    ]).then(function(newItem) {
      // console.log(newItem);
      connection.query('INSERT INTO products SET ?',
      newItem,
      function(error , response) {
        if (error) throw error;
        // console.log(response.affectedRows + " product inserted!\n");
        callback();
      });
    });
  });
};

var startInquire = function() {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'back',
      message: "Back to start? (No quits)",
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