const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedback = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
      status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved', 'rejected'], // allowed statuses
    default: 'pending'
  }

});

module.exports = mongoose.model('feedback', feedback);
