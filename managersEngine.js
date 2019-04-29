// require("dotenv").config();

// var keys = require("./keys");

var mysql = require("mysql");

var inquirer = require("inquirer");

var market_db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root1234",
  database: "bamazon_db"
});

market_db.connect(function (error) {
  if (error) throw error;
  console.log("starting engine");
  kickStart();
});

function kickStart() {
  console.log("Please one of the following options")
  inquirer.prompt([{
    type: "list",
    choices: ["View Products for Sale", "View Products with Low Stock", "Increase Stock of a Product", "Add a new Product"],
    name: "firstAct"
  }]).then(function(res) {
    var command = res.firstAct
    switch (command) {
      case "View Products for Sale":
        browse();
        break;
      case "View Products with Low Stock":
        lowStock();
        break;
      case "Increase Stock of a Product":
        addStock();
        break;
      case "Add a new Product":
        newProduct();
        break;
      default:
        console.log("Please choose a valid action")
    }
  })
}

function browse() {
  market_db.query("SELECT * FROM products", function (error, res) {
    if (error) throw error;

    console.log("\x1b[5m\x1b[45m\x1b[1m", "Welcome to Bali-baba - your one stop shop", "\x1b[0m");

    // extract and print each product from database response
    res.forEach(product => {
      console.log(
        // product_id
        "\x1b[31m", "Item#: " + product.id, "\x1b[0m", "\n",
        // product_name
        "   Name of the product:   " + "\x1b[1m" + product.product_name + "\x1b[0m", "\n",
        // price
        "Price: " + "\x1b[32m" + "$" + product.price, "\x1b[0m", '\n',
        "Available Stock: " + "\x1b[34m" + product.avail_stock, "\x1b[0m"
       , "\n");
    });
    kickStart();
  })
}

function lowStock() {
  market_db.query("SELECT * FROM products WHERE avail_stock <= 5", function (error, res) {
    if (error) throw error;
    res.forEach(product => {
      console.log("\x1b[5m\x1b[45m\x1b[1m", "Inventory Running Low", "\x1b[0m");
      console.log("\x1b[31m", "Item#: " + product.id, "\x1b[0m", "\n",
        // product_name
        "   Name of the product:   " + "\x1b[1m" + product.product_name + "\x1b[0m", "\n",
        // price
        "Price: " + "\x1b[32m" + "$" + product.price, "\x1b[0m", '\n',
        "Available Stock: " + "\x1b[34m" + product.avail_stock, "\x1b[0m", "\n");
    })
    kickStart();
  })
}

function addStock() {
  market_db.query("SELECT * FROM products", function (error, result) {
    if (error) throw error;

    // extract and print each product from database response
    result.forEach(product => {
      console.log(
        // product_id
        "\x1b[31m", "Item#: " + product.id, "\x1b[0m", "\n",
        // product_name
        "   Name of the product:   " + "\x1b[1m" + product.product_name + "\x1b[0m", "\n",
        "Available Stock: " + "\x1b[34m" + product.avail_stock, "\x1b[0m", "\n");
    });
    inquirer.prompt([{
      message: "Please enter the item# of the product you'd like to increase the stock of: ",
      name: "item_num",
      type: "number",
      validate: function (input) {
        if (!isNaN(input) && (input > 0 && input < 11)) {
          return true;
        } else {
          return "please enter a valid item #"
        }
      }
    },{
      message: "Please enter the amount you'd like to add to the stock: ",
      name: "increase_amt",
      type: "number",
      validate: function (input) {
        if (isNaN(input)) {
          return "please enter a valid amount to add"
        } else {
          return true;
        }
      }
    }]).then(function (res) {
      const selectedProduct = result.find(product => product.id === (res.item_num));
      console.log(selectedProduct);
      updateStock(selectedProduct, (res.increase_amt));
    })
  })
}

function updateStock(product, amt) {
  market_db.query("UPDATE products SET avail_stock = ? where id = ?", [product.avail_stock + amt, product.id], function (err, res) {
    if (err) throw err;
    console.log("Successfully added " + amt + " " + product.product_name + " to the inventory");
    browse();
  })
}

function newProduct() {
  inquirer.prompt([{
    name: "product_name",
    message: "Enter the name of the new product you're about to add: "
  },{
    name: "department",
    message: "Enter the department the new product belongs to: "
  },{
    name: "price",
    message: "Enter the retail price per new product",
    validate: function (input) {
      if (!isNaN(input)) {
        return true;
      } else {
        return "Please enter a valid price for the new product"
      }
    }
  },{
    name: "avail_stock",
    message: "How many units of the new product do you want available for sale?",
    type: "number",
    validate: function (input) {
      if (!isNaN(input)) {
        return true;
      } else {
        return "Please enter a valid amount"
      }
    }
  }]).then(function (res) {
    market_db.query("INSERT INTO products SET ?", res, function (error, response) {
      if (error) throw error;
      console.log("Product added successfully");
      browse();
    })
  })
}