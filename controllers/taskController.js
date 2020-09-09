const Task = require("../model/task");

// create task
module.exports.createTask = async () => {
  try {
    const task = new Task({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      category: req.body.category,
      owner: req.user._id,
    });
    await task.save();
    res.send({ task });
  } catch (e) {
    console.log("Create Task API: ", e);
    res.send(400).send({ message: "Unable to Create Task" });
  }
};

// get tasks

// delete tasks
