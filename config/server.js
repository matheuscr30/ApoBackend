const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const consign = require('consign');

mongoose.connect('mongodb://localhost:27017/apo');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(expressValidator());
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

consign()
    .include('app/routes')
    .then('app/controllers')
    .into(app);

module.exports = app;