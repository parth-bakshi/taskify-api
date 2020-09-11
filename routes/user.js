const express = require("express");
const router = express.Router();
const auth = require("../config/auth");
const userController = require("../controllers/userController");

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
//return all categories of a user
router.get("/get-category", auth, userController.getCategory);
// delete category
router.delete("/del-category", auth, userController.deleteCategory);

module.exports = router;
