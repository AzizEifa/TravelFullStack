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
     if (err.code === 11000) {
    
    const duplicateKey = Object.keys(err.keyPattern)[0];
    return res.status(400).json({ message: `${duplicateKey} already exists` });
  }
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
    res.status(200).json({ message: 'user deleted!!' });
  } catch (err) {
    console.log(err);
  }
}
async function updateuser(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.findByIdAndUpdate(req.params.id, { ...req.body, password: hashedPassword }, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken({ id: user._id, email: user.email, role: user.role , username: user.username });
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