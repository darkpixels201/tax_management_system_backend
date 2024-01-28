const mongoose = require('mongoose');

const rateOfTaxSchema = new mongoose.Schema({
  taxDeductionRate: { type: String, required: true },
  created_at: { type: Date, default: Date.now },

});

const RateOfTax = mongoose.model('RateOfTax', rateOfTaxSchema);

module.exports = RateOfTax;
