'use strict';

// module
const express = require('express');
const app = express();

// routing
const home = require("./src/routes/home");     

// set view
app.set("views", "./src/views");
app.set("view engine", "ejs");

// middle ware
app.use("/", home);

module.exports = app;