const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskController')
const auth = require("../config/auth");

router.post("/create", auth,taskController.createTask);

module.exports = router;
