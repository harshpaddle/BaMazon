# BaMazon

Created during Week 12 of Rutgers Coding Bootcamp. The goal was to create an Amazon-like store front using Node.js and MySQL.

## Getting Started(with Node)

- Clone repo.
- Run command in Terminal or Gitbash 'npm install'
- Run command depending which mode you would like to be on:
    * Customer - 'node customerBamazon.js'
    * Manager - 'node managerBamazon.js'
- Run 'ctrl + c' to exit each mode

### What Each JavaScript Does

1. `customerBamazon.js`

    * Prints the products in the store.

    * Prompts customer which product they would like to purchase by ID number.

    * Asks for the quantity.

      * If there is a sufficient amount of the product in stock, it will return the total for that purchase.
      * However, if there is not enough of the product in stock, it will tell the user that there isn't enough of the product.
      * If the purchase goes through, it updates the stock quantity to reflect the purchase.
      * It will also update the product sales in the department table.

-----------------------

2. `managerBamazon.js`

    * Starts with a menu:
        * View Products for Sale
        * View Low Inventory
        * Add to Inventory
        * Add a New Product

    * If the manager selects `View Products for Sale`, it lists all of the products in the store including all of their details.

    * If the manager selects `View Low Inventory`, it'll list all the products with less than five items in its StockQuantity column.

    * If the manager selects `Add to Inventory`, it allows the manager to select a product and add inventory.

    * If the manager selects `Add New Product`, it allows the manager to add a new product to the store.



## Demo Gifs

*Client Side view*

* ![customerBamazon.js](https://media.giphy.com/media/dYd6zggxYZT7n9pnHk/giphy.gif)


*Manager Side View*

1. View products for sale-
* ![managerBamazon.js](https://media.giphy.com/media/5PhoMdmSuhJBw80eXF/giphy.gif)

2. View products with low quantity-
* ![managerBamazon.js](https://media.giphy.com/media/5qFDGN79L58pgaUZUC/giphy.gif)

3. Increase stocks of a product in market-
* ![managerBamazon.js](https://media.giphy.com/media/iNcuWWXiHKFU7f1h4n/giphy.gif)

4. Add a new product
* ![managerBamazon](https://media.giphy.com/media/9zXItJT6jqo875T7o5/giphy.gif)


## Technologies used
- Node.js
- [Inquirer NPM Package](https://www.npmjs.com/package/inquirer)
- [MYSQL NPM Package](https://www.npmjs.com/package/mysql)

### Prerequisites

```
- Node.js - Download the latest version of Node https://nodejs.org/en/
- Create a MYSQL database called 'Bamazon', reference schema.sql
```

## Built With

* MySQL/Workbench
* Terminal
* node

## Author

Harsh Patel
