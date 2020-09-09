const express = require("express");
const router = express.Router();

//check
router.get("/",function(req,res){
    res.send("working");
})

router.use("/user", require("./user"));
router.use("/task",require("./task"))

module.exports = router;
