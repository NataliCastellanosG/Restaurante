const express = require('express');
const mongoose = require("mongoose");
const app = require("./app");

var port = process.env.PORT || 3000;

const dbConfig = require('./config/database.config');
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,dbConfig.options)
.then(() => {
  console.log("Connect to database: success!");
  app.listen(port, () => {
    console.log("Server is listening on port " + port);
   });
}).catch(err => {
  console.log('Connect to database: failure!: ' + err);
  process.exit();
});
