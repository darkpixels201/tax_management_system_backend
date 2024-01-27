const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  createdBy: { type: String, required: true },
  companyName: { type: String, required: true },
  bankName: { type: String, required: true },
  chequeNo: { type: String, required: true },
  chequeAmount: { type: Number, required: true },
  taxDeductionRate: { type: String, required: true },
  underSection: { type: String, required: true },
  taxAmount: { type: Number, required: true },
  accessToDeleteLedger: { type: Boolean, default: false }, 
});

const Ledger = mongoose.model('Ledger', ledgerSchema);

module.exports = Ledger;
