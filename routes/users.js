const express = require("express");
const router = express.Router();
const UserController = require("../controller/usercontroller");
const ValidateMiddl=require('../middl/validate')



router.get("/show", (req, res) => {
  res.send("hello test");
});


router.post("/add",ValidateMiddl.validateUser,UserController.add);

router.get("/showusers", UserController.showuser);

router.get("/showuser/:id", UserController.showbyid);

router.get("/showbyusername/:username", UserController.showusername);

router.get("/showbyusernames/:username", UserController.showusernames);

router.delete("/deleteuser/:id", UserController.deleteUser);

router.put("/updateuser/:id",ValidateMiddl.validateUser, UserController.updateuser);


module.exports = router;