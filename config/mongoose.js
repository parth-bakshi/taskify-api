const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
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