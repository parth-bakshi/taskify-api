const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://taskifymnr:AGI1i532Ps39w1kP@taskify-mnr.uhcio.mongodb.net/taskify?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error',console.error.bind("error creating db"));

db.once('open',function(err){
    if(err){
        console.log('err opening db');
        return;
    }
    console.log('Connected To Atlas')
});

module.exports = db;