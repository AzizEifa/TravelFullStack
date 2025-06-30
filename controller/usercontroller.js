const User = require("../model/user");

async function add(req, res) {
  try {
    console.log(req.body);
    const user = new User(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
}

async function showuser(req, res) {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
}

async function showbyid(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
}

async function showusername(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
}

async function showusernames(req, res) {
  try {
    const user = await User.find({ username: req.params.username });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
}

async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("user deleted!!");
  } catch (err) {
    console.log(err);
  }
}
async function updateuser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  add,
  showuser,
  showbyid,
  showusername,
  showusernames,
  deleteUser,
  updateuser,
};