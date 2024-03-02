const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  natureOfWork: { type: String, required: true },
  rateOfTax:  [{ type: String, required: true }],
  underSection: [{ type: String, required: true }],
  ntn: { type: String, required: true, unique: true },
  showToAdmin: { type: Boolean, default: true },
  accessToDeleteLedger: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
