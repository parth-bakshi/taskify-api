const express = require("express");
const router = express.Router();
const auth = require("../config/auth");
const userController = require("../controllers/userController");

router.get("/check", function (req, res) {
  res.send("hi");
});
// get user
router.get("/", auth, userController.userData);
// create user
router.post("/create", userController.create);
// login
router.post("/login", userController.login);
// logout
router.post("/logout", auth, userController.logout);
// create category
router.post("/create/category", auth, userController.createCategory);

module.exports = router;
