const express = require("express");
const router = express.Router();
const auth = require("../config/auth");
const userController = require("../controllers/userController");

router.get("/check",function(req,res){
    res.send("hi");
})
router.get("/", auth, userController.userData);
router.post("/create", userController.create);
router.post("/login", userController.login);
router.post("/create/category",auth,userController.createCategory)

module.exports = router;
