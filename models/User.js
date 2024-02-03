const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['superAdmin', 'admin', 'user'], default: 'user' },
  status: { type: String, enum: ['approve', 'pending'], default: 'pending' },
  accountStatus: { type: String, default: 'active' }, 
  companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
  cheques: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cheque' }],
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
