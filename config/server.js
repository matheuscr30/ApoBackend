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

//Preflight Request
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Max-Age", 3600);
    next();
});

consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;