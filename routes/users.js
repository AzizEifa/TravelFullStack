const express = require("express");
const router = express.Router();
const UserController = require("../controller/usercontroller");
const ValidateMiddl=require('../middl/validate')




router.get("/show", (req, res) => {
  res.send("hello test");
});


router.post("/add",ValidateMiddl.validateUser,ValidateMiddl.authMiddleware,UserController.add);

router.get("/showusers",ValidateMiddl.authMiddleware, UserController.showuser);

router.get("/showuser/:id", ValidateMiddl.authMiddleware,UserController.showbyid);

router.get("/showbyusername/:username", ValidateMiddl.authMiddleware,UserController.showusername);

router.get("/showbyusernames/:username", ValidateMiddl.authMiddleware,UserController.showusernames);

router.delete("/deleteuser/:id", ValidateMiddl.authMiddleware,UserController.deleteUser);

router.put("/updateuser/:id",ValidateMiddl.validateUser,ValidateMiddl.authMiddleware,UserController.updateuser);


router.post("/login", UserController.login);


module.exports = router;