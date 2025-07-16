const mongoose = require('mongoose');
const schema = mongoose.Schema;

const User = new schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true }, 
  cin:      { type: Number, required: true, unique: true }, 
  password: { type: String, required: true },
  phone:    { type: Number, required: true, unique: true },  
  role:     { type: String, enum: ['admin', 'client'], default: 'client' }
});

module.exports = mongoose.model('user', User);
