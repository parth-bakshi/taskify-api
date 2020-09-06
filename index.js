let express = require("express");
let app = express();
const port = 8000;

let db = require("./config/mongoose");

app.listen(port,function(err){
    if(err){console.log(err);return;}
    console.log(`Server is listening on ${port}`);
})