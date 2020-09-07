const mongoose = require('mongoose');
const db = require('../config/mongoose');
const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    completeStatus:{
        type:Boolean,
        required:true
    },
    date:{
        type:Date,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    owner:{
        type :mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }

},{
    timestamps:true
});

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;