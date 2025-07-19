const mongoose = require('mongoose');

const Message = new mongoose.Schema({
  from: { type: String, required: true },
  toClientId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', Message);
