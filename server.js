'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var cors = require('cors');
var bodyParser = require('body-parser');
var validUrl = require('valid-url');
var app = express();
var handleUrl = require("./handleURL");

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect('mongodb://enk-test:28popugaev@ds129030.mlab.com:29030/url-shortener-test');

app.use(cors());

/** this project needs to parse POST bodies **/
app.use(bodyParser.urlencoded({'extended': false}));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.post("/api/shorturl/new", handleUrl.check);
app.get("/api/shorturl/:id", handleUrl.open);

app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});