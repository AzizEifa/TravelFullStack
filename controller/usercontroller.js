const User = require("../model/user");
const { generateToken } = require("../utils/jwt");
const bcrypt = require("bcryptjs");

async function add(req, res) {
  try {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
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
async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken({ id: user._id, username: user.username });
    res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Login failed");
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
  login,
};