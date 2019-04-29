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
  console.log("engine starting");
  kickStart();
})

function kickStart() {
  market_db.query("SELECT * FROM products", function (error, response) {
    if (error) throw error;
    // welcome the user to the market;
    console.log("\x1b[5m\x1b[45m\x1b[1m", "Welcome to Bali-baba - your one stop shop", "\x1b[0m");

    // extract and print each product from database response
    response.forEach(product => {
      console.log(
        // product_id
        "\x1b[31m", "Item#: " + product.id, "\x1b[0m", "\n",
        // product_name
        "   Name of the product:   " + "\x1b[1m" + product.product_name + "\x1b[0m", "\n",
        // price
        "Price: " + "\x1b[32m" + "$" + product.price, "\x1b[0m", "\n");
    });
    choose();
  })

}

// WHY CAN'T I ACCES PRODUCT.ID INSIDE OF THE FUNCITON BELOW????????

// function that takes asks the user for id and amount of product they'd like to buy
// function choose() {
//   inquirer.prompt([{
//     name: "product_id",
//     message: "Please enter the Item# of the product you'd like to purchase?",
//     type: "number"
//   },{
//     name: "product_quantity",
//     message: "Please enter how many of amount of quantity for the selected product?",
//     type: "number"
//   }]).then(function(invoice) {
//     console.log(invoice);
//     market_db.query("SELECT * FROM products WHERE products.id = ?", invoice.product_id, function (response) {
//       // console.log(response)
//       // console.log(invoice);
//     })
//   })
// }

function choose() {
  market_db.query("SELECT * FROM products", function (error, result) {

    if (error) throw error;

    
    inquirer.prompt([{
      name: "selected_id",
      message: "Please enter the Item# of the product you'd like to purchase?",
      type: "number",
      validate: function (input) {
        if (!isNaN(input) && (input > 0 && input < result.length)) {
          return true;
        } else {
          return "please enter a valid item #"
        }
      }
    }, {
      name: "selected_quantity",
      message: "Please enter how many of amount of quantity for the selected product?",
      type: "number",
      validate: function (input) {
        if (isNaN(input)) {
          return "please enter a valid amount you would like to purchase"
        } else {
          return true;
        }
      }
    }]).then(function(invoice) {

      const selectedProduct = result.find(product => product.id === invoice.selected_id)
      
      if (selectedProduct.avail_stock >= invoice.selected_quantity) {
        processOrder(selectedProduct, invoice.selected_quantity);
      } else {
        console.log("Sorry, Isufficient quantity");
        // can we direct the user back to the second inquirer question??
        return choose();
      }

      // (selectedProduct.avail_stock >= invoice.product_quantity) ?
        // processOrder(selectedProduct) : (console.log("Sorry, Isufficient quantity"));
    })
  })
}

function processOrder(product, amount) {
  market_db.query("UPDATE products SET avail_stock = ? where id = ?", [(product.avail_stock - amount), product.id], function (error, response) {
    if (error) throw error;
    
    console.log("\x1b[5m\x1b[44m\x1b[1m"
      , "Order Completed --- You purchased " + amount + ' ' + product.product_name + 's', "\x1b[0m");
    console.log("Your confirmation # is - " + (Math.floor(Math.random() * 1000000000)));
    console.log("thank you, please buy more, we hungaryyy");
    
    choose();
  })
}