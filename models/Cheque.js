const mongoose = require('mongoose');

const chequeSchema = new mongoose.Schema({
  bankName: { type: String, required: true },
  checkNo: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },

});

const Cheque = mongoose.model('Cheque', chequeSchema);

module.exports = Cheque;
