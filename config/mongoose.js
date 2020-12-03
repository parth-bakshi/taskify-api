const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://parth:qwertyuioP1!@taskify.ib9cl.mongodb.net/taskify?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect("mongodb://localhost/todo-mckinley");
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