'use strict';

// module
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");                   // << 환경변수 저장모듈
const morgan = require('morgan');

const app = express();
dotenv.config();    

// routing
const home = require("./src/routes/home");     
// const accessLogStream = require("./src/config/log");             << morgan 

// app setting
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
/* URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결 */
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(morgan('dev'));
// app.use(morgan('common', { stream : accessLogStream }));

// middle ware
app.use("/", home);

module.exports = app;