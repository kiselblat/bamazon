# bamazon
A mySQL/node.js app for manipulating a basic database. It consists of a SQL schema and seed files for initializing and adding to the database, and several node.js files for actually working with it from the command line.

1. [Requirements and Installation](#requirements-and-installation)
1. [How to Use](#how-to-use)
1. [Overview](#overview)
1. [About](#about)

## Requirements and Installation

Bamazon is a [node.js](https://nodejs.org/en/) and [mySQL](https://www.mysql.com/) application. Go to their sites and read their documentation for help installing and configuring these applications.

Once you have mySQL running, use the included `bamazon-schema` and `bamazon-seed` files to create and populate the bamazon database.

In addition to node.js, there are several node packages required by bamazon: `mysql`, `inquirer`, `cli-table2`. The included `package.json` file allows you to install them all at once by simply running `npm install` from the command-line in the bamazon directory.

## How to Use

### Customer Interface

Invoke the customer interface with:
```
node bamazonCustomer.js
```
You will then be presented with a series of prompts.

## Overview



## About

Bamazon is the result of an assignment for the U of M Full Stack Web Development Boot Camp. It was written entirely by me [Tom Christ](https://kiselblat.github.io/).