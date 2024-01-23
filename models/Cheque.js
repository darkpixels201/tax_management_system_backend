const mongoose = require('mongoose');

const chequeSchema = new mongoose.Schema({
  bankName: { type: String, required: true },
  checkNo: { type: String, required: true, unique: true },
  checkAmount: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Cheque = mongoose.model('Cheque', chequeSchema);

module.exports = Cheque;
