const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['superAdmin', 'admin', 'user'], default: 'user' },
  status: { type: String, enum: ['approve', 'pending'], default: 'pending' },
  companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }], // Add this line

});

const User = mongoose.model('User', userSchema);

module.exports = User;
