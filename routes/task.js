const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../config/auth");

// create task
router.post("/create", auth, taskController.createTask);

//return all tasks
router.get("/get-all-tasks", auth, taskController.getTasks);

module.exports = router;
