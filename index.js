// Express
const express = require("express");
// Express App
const app = express();
// Passport
const passport = require("passport");
//cors
var cors = require('cors');

// .env
require('dotenv').config()

// PORT
const port = process.env.PORT;

// db
const db = require("./config/mongoose");

// enabling cors
let corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

// Parse the request
app.use(express.urlencoded({ extended: true }));
// Parse the request
app.use(express.json());

// importing routes
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is listening on ${port}`);
});
