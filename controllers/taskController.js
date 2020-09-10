const Task = require("../model/task");
const User = require("../model/user");
const moment = require("moment")

// create task
module.exports.createTask = async (req,res) => {
  try {
    // console.log(moment(req.body.date,"DD-MM-YYYY hh:mm")
    const task = new Task({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      category: req.body.category,
      owner: req.user._id,
    });
    await task.save();
    res.send(200,{data: task });
  } catch (e) {
    console.log("Create Task API: ", e);
    res.send(500).send({ message: "Unable to Create Task" });
  }
};

// get tasks
module.exports.getTasks = async (req,res) =>{
  try{
    let task = await User.findById(req.user._id).populate("tasks");
    return res.send(200,{
      data:task.tasks
    });
  }catch (e) {
    console.log("Return Tasks API: ", e);
    res.send(500).send({ message: "Unable to Return all Task" });
  }
};

// delete task
module.exports.deleteTask = async(req,res) => {
  try{
    Task.findByIdAndDelete(req.body.id,function(err){
      if(err){throw (err);}
      return res.send(200,{message:"Task Sucessfully deleted"});
    });
  }catch (e) {
    console.log("deleted Task API: ", e);
    res.send(500).send({ message: "Unable to delete Task" });
  }
}

// delete completed status tasks
module.exports.deleteCompletedTasks = async(req,res) => {
  try{
    Task.deleteMany({completeStatus:true},function(err){
      if(err){throw (err);}
      return res.send(200,{message:"Tasks Sucessfully deleted"});
    });
  }catch (e) {
    console.log("deleted Task API: ", e);
    res.send(500).send({ message: "Unable to delete Task" });
  }
}

// mark task as complete /incomplete
module.exports.toggleStatus = async (req,res) =>{
  try{
    // console.log(req.body.id);
    let task = await Task.findById(req.body.id);
    task.completeStatus = !task.completeStatus;
    await task.save();
    return res.send(200,{message:"task status is successfully toggled"});
  }catch (e) {
    console.log("toggle status Task API: ", e);
    res.send(500).send({ message: "Unable to toggle status of Task" });
  }
}

