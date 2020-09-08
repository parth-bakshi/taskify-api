const express = require("express");
const router = express.Router();
const auth = require("../config/auth")
const userController = require("../controllers/userController");

router.post("/create", userController.create);
router.post("/login", userController.login);
router.get("/",auth,userController.userData)

module.exports = router;

