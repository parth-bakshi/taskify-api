// Express
const express = require("express");
// Express App
const app = express();
// Passport
const passport = require("passport")

// PORT
const port = process.env.PORT||8000;

const db = require("./config/mongoose");

// Parse from request
app.use(express.urlencoded({ extended: true }));


app.listen(port,function(err){
    if(err){console.log(err);return;}
    console.log(`Server is listening on ${port}`);
})